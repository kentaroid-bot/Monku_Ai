export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === "/api/contact") {
      return handleContact(request, env, ctx);
    }

    if (url.pathname === "/roadmap" || url.pathname === "/roadmap/") {
      return handleRoadmap("ja");
    }

    if (url.pathname === "/roadmap/en" || url.pathname === "/roadmap/en/") {
      return handleRoadmap("en");
    }

    if (url.pathname === "/statement" || url.pathname === "/statement/") {
      return handleStatement();
    }

    if (url.pathname === "/proposal/iceage") {
      url.pathname = "/proposal/iceage/index.html";
      return env.ASSETS.fetch(new Request(url, request));
    }

    return env.ASSETS.fetch(request);
  }
};

const ROADMAPS = {
  ja: {
    lang: "ja",
    pageTitle: "概念ロードマップ",
    eyebrow: "Conceptual Roadmap",
    sourceLabel: "GitHubで原本を見る",
    switchLabel: "Read in English",
    switchHref: "/roadmap/en/",
    rawUrl: "https://raw.githubusercontent.com/kentaroid-bot/Monku_Ai/main/docs/conceptual-roadmap-zero-sum-cage-infinite-opening-ja.md",
    sourceUrl: "https://github.com/kentaroid-bot/Monku_Ai/blob/main/docs/conceptual-roadmap-zero-sum-cage-infinite-opening-ja.md"
  },
  en: {
    lang: "en",
    pageTitle: "Conceptual Roadmap",
    eyebrow: "Conceptual Roadmap",
    sourceLabel: "View Source on GitHub",
    switchLabel: "日本語で読む",
    switchHref: "/roadmap/",
    rawUrl: "https://raw.githubusercontent.com/kentaroid-bot/Monku_Ai/main/docs/conceptual-roadmap-zero-sum-cage-infinite-opening.md",
    sourceUrl: "https://github.com/kentaroid-bot/Monku_Ai/blob/main/docs/conceptual-roadmap-zero-sum-cage-infinite-opening.md"
  }
};

const STATEMENT = {
  lang: "ja",
  pageTitle: "MonkuAi 公式ステートメント",
  eyebrow: "Official Statement",
  sourceLabel: "GitHubで原本を見る",
  rawUrl: "https://raw.githubusercontent.com/kentaroid-bot/Monku_Ai/main/docs/official-statement.md",
  sourceUrl: "https://github.com/kentaroid-bot/Monku_Ai/blob/main/docs/official-statement.md"
};

async function handleRoadmap(locale) {
  const config = ROADMAPS[locale] || ROADMAPS.ja;
  return handleMarkdownPage(config);
}

async function handleStatement() {
  return handleMarkdownPage(STATEMENT);
}

async function handleMarkdownPage(config) {
  const response = await fetch(config.rawUrl, {
    headers: {
      "User-Agent": "MonkuAi-markdown-renderer"
    },
    cf: {
      cacheTtl: 300,
      cacheEverything: true
    }
  });

  if (!response.ok) {
    return htmlResponse(renderRoadmapError(config), response.status, 60);
  }

  const markdown = await response.text();
  const title = extractTitle(markdown) || config.pageTitle;
  const content = markdownToHtml(markdown);

  return htmlResponse(renderMarkdownPage({ config, title, content }), 200, 300);
}

function renderMarkdownPage({ config, title, content }) {
  return `<!doctype html>
<html lang="${config.lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)} | MonkuAi</title>
  <meta name="description" content="MonkuAi white paper rendered from the project Markdown source.">
  <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="/styles.css">
</head>
<body class="whitepaper-page">
  <header class="whitepaper-header">
    <a class="whitepaper-brand" href="/">
      <span class="whitepaper-brand-mark" aria-hidden="true">
        <svg viewBox="0 0 512 512">
          <path d="M332 94C293 85 260 96 238 126C216 156 215 195 238 211C265 230 309 211 344 176C360 160 376 151 397 154M326 96C288 145 257 197 232 256C204 321 191 389 224 429C254 465 319 464 348 426C377 388 373 305 366 247C359 184 344 132 310 104M190 257C224 245 262 247 303 252" />
        </svg>
      </span>
      <span>MonkuAi</span>
    </a>
    <nav>
      ${config.switchHref ? `<a href="${config.switchHref}">${escapeHtml(config.switchLabel)}</a>` : ""}
      <a href="${config.sourceUrl}">${escapeHtml(config.sourceLabel)}</a>
    </nav>
  </header>
  <main class="whitepaper-shell">
    <p class="whitepaper-eyebrow">${escapeHtml(config.eyebrow)}</p>
    <article class="whitepaper-document">
      ${content}
    </article>
  </main>
  <footer class="whitepaper-footer">
    <a href="/">MonkuAi</a>
    <span>Noise may already be the answer. Widen the aperture.</span>
  </footer>
</body>
</html>`;
}

function renderRoadmapError(config) {
  return `<!doctype html>
<html lang="${config.lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(config.pageTitle)} | MonkuAi</title>
  <link rel="stylesheet" href="/styles.css">
</head>
<body class="whitepaper-page">
  <main class="whitepaper-shell">
    <p class="whitepaper-eyebrow">${escapeHtml(config.eyebrow)}</p>
    <article class="whitepaper-document">
      <h1>${escapeHtml(config.pageTitle)}</h1>
      <p>The source Markdown could not be loaded. Please try again later.</p>
      <p><a href="${config.sourceUrl}">${escapeHtml(config.sourceLabel)}</a></p>
    </article>
  </main>
</body>
</html>`;
}

function markdownToHtml(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");
  const html = [];
  let paragraph = [];
  let listType = null;
  let inCode = false;
  let codeLines = [];
  let blockquote = [];
  let index = 0;

  const flushParagraph = () => {
    if (!paragraph.length) return;
    html.push(`<p>${formatInline(paragraph.join(" "))}</p>`);
    paragraph = [];
  };

  const flushList = () => {
    if (!listType) return;
    html.push(`</${listType}>`);
    listType = null;
  };

  const flushBlockquote = () => {
    if (!blockquote.length) return;
    html.push(`<blockquote>${blockquote.map((line) => `<p>${formatInline(line)}</p>`).join("")}</blockquote>`);
    blockquote = [];
  };

  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();

    if (trimmed.startsWith("```")) {
      flushParagraph();
      flushList();
      flushBlockquote();
      if (inCode) {
        html.push(`<pre><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
        codeLines = [];
        inCode = false;
      } else {
        inCode = true;
      }
      index += 1;
      continue;
    }

    if (inCode) {
      codeLines.push(line);
      index += 1;
      continue;
    }

    if (!trimmed) {
      flushParagraph();
      flushList();
      flushBlockquote();
      index += 1;
      continue;
    }

    if (isTableStart(lines, index)) {
      flushParagraph();
      flushList();
      flushBlockquote();
      const { tableHtml, nextIndex } = parseTable(lines, index);
      html.push(tableHtml);
      index = nextIndex;
      continue;
    }

    const heading = trimmed.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushList();
      flushBlockquote();
      const level = Math.min(heading[1].length, 6);
      html.push(`<h${level}>${formatInline(heading[2])}</h${level}>`);
      index += 1;
      continue;
    }

    const quote = trimmed.match(/^>\s?(.*)$/);
    if (quote) {
      flushParagraph();
      flushList();
      blockquote.push(quote[1]);
      index += 1;
      continue;
    }

    const unordered = trimmed.match(/^[-*]\s+(.+)$/);
    const ordered = trimmed.match(/^\d+\.\s+(.+)$/);
    if (unordered || ordered) {
      flushParagraph();
      flushBlockquote();
      const nextListType = unordered ? "ul" : "ol";
      if (listType !== nextListType) {
        flushList();
        html.push(`<${nextListType}>`);
        listType = nextListType;
      }
      html.push(`<li>${formatInline((unordered || ordered)[1])}</li>`);
      index += 1;
      continue;
    }

    flushList();
    flushBlockquote();
    paragraph.push(trimmed);
    index += 1;
  }

  flushParagraph();
  flushList();
  flushBlockquote();

  if (inCode) {
    html.push(`<pre><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
  }

  return html.join("\n");
}

function isTableStart(lines, index) {
  const current = lines[index] || "";
  const next = lines[index + 1] || "";
  return current.includes("|") && /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(next);
}

function parseTable(lines, index) {
  const headers = splitTableRow(lines[index]);
  let rowIndex = index + 2;
  const rows = [];

  while (rowIndex < lines.length && lines[rowIndex].includes("|") && lines[rowIndex].trim()) {
    rows.push(splitTableRow(lines[rowIndex]));
    rowIndex += 1;
  }

  const head = headers.map((cell) => `<th>${formatInline(cell)}</th>`).join("");
  const body = rows
    .map((row) => `<tr>${headers.map((_, cellIndex) => `<td>${formatInline(row[cellIndex] || "")}</td>`).join("")}</tr>`)
    .join("");

  return {
    tableHtml: `<div class="whitepaper-table-wrap"><table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></div>`,
    nextIndex: rowIndex
  };
}

function splitTableRow(row) {
  return row
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function formatInline(value) {
  let text = escapeHtml(value);
  text = text.replace(/`([^`]+)`/g, "<code>$1</code>");
  text = text.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  text = text.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  text = text.replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2">$1</a>');
  return text;
}

function extractTitle(markdown) {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : "";
}

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

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function htmlResponse(html, status = 200, maxAge = 300) {
  return new Response(html, {
    status,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": `public, max-age=${maxAge}`
    }
  });
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
