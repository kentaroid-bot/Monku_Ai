export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === "/api/contact") {
      return handleContact(request, env, ctx);
    }

    if (url.pathname === "/proposal/iceage") {
      url.pathname = "/proposal/iceage/index.html";
      return env.ASSETS.fetch(new Request(url, request));
    }

    return env.ASSETS.fetch(request);
  }
};

async function handleContact(request, env, ctx) {
  if (request.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid request" }, 400);
  }

  const name = cleanText(payload.name, 120);
  const email = cleanText(payload.email, 160);
  const message = cleanText(payload.message, 5000);
  const website = cleanText(payload.website, 200);

  if (website) {
    return jsonResponse({ ok: true });
  }

  if (!message) {
    return jsonResponse({ error: "Message is required" }, 400);
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return jsonResponse({ error: "Invalid email address" }, 400);
  }

  if (!env.RESEND_API_KEY) {
    return jsonResponse({ error: "Email service is not configured" }, 503);
  }

  const to = env.CONTACT_TO || "renraku@monku.ai";
  const from = env.CONTACT_FROM || "MonkuAi <renraku@monku.ai>";
  const subjectName = name || "Anonymous";
  const text = [
    `Name: ${subjectName}`,
    email ? `Reply: ${email}` : "Reply: not provided",
    "",
    message
  ].join("\n");

  const result = await sendEmailWithResend(env.RESEND_API_KEY, {
    from,
    to,
    reply_to: email || undefined,
    subject: `MonkuAi contact: ${subjectName}`,
    text
  });

  if (!result.ok) {
    return jsonResponse({ error: result.error || "Failed to send message" }, 502);
  }

  if (email) {
    const confirmation = sendConfirmationEmail(env.RESEND_API_KEY, {
      from,
      to: email,
      replyTo: to,
      name,
      message
    });

    if (ctx) {
      ctx.waitUntil(confirmation);
    } else {
      await confirmation;
    }
  }

  return jsonResponse({ ok: true });
}

async function sendConfirmationEmail(apiKey, { from, to, replyTo, name, message }) {
  const greeting = name ? `${name},` : "Hello,";
  const result = await sendEmailWithResend(apiKey, {
    from,
    to,
    reply_to: replyTo,
    subject: "MonkuAi received your message",
    text: [
      greeting,
      "",
      "Thank you for contacting MonkuAi. Your message below has been received.",
      "お問い合わせありがとうございます。以下のメッセージを受け付けました。",
      "",
      "---",
      "",
      "Your message:",
      "",
      message,
      "",
      "MonkuAi"
    ].join("\n")
  });

  if (!result.ok) {
    throw new Error(result.error || "Failed to send confirmation email");
  }
}

async function sendEmailWithResend(apiKey, email) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(email)
  });

  if (response.ok) {
    return { ok: true };
  }

  let error = "Failed to send message";
  try {
    const body = await response.json();
    error = body.message || body.error || error;
  } catch {
    error = await response.text();
  }

  return { ok: false, error };
}

function cleanText(value, maxLength) {
  return String(value || "").replace(/\r/g, "").trim().slice(0, maxLength);
}

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
}
