export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === "/api/contact") {
      return handleContact(request, env, ctx);
    }

    if (url.pathname === "/docs" || url.pathname === "/docs/") {
      return handleDocumentsIndex();
    }

    if (url.pathname === "/roadmap" || url.pathname === "/roadmap/") {
      return redirectTo(new URL("/docs/roadmap/", request.url));
    }

    if (url.pathname === "/roadmap/en" || url.pathname === "/roadmap/en/") {
      return redirectTo(new URL("/docs/roadmap/en/", request.url));
    }

    if (url.pathname === "/statement" || url.pathname === "/statement/") {
      return redirectTo(new URL("/docs/statement/", request.url));
    }

    const docConfig = DOC_PAGES[normalizeDocsPath(url.pathname)];
    if (docConfig) {
      return handleMarkdownPage(docConfig);
    }

    if (url.pathname === "/proposal/iceage") {
      url.pathname = "/proposal/iceage/index.html";
      return env.ASSETS.fetch(new Request(url, request));
    }

    return env.ASSETS.fetch(request);
  }
};

const GITHUB_BLOB_BASE = "https://github.com/kentaroid-bot/Monku_Ai/blob/main/";
const GITHUB_RAW_BASE = "https://raw.githubusercontent.com/kentaroid-bot/Monku_Ai/main/";

const DOC_PAGE_ITEMS = [
  docPage({
    href: "/docs/statement/",
    lang: "ja",
    pageTitle: "MonkuAi 公式ステートメント",
    eyebrow: "Official Statement",
    path: "docs/official-statement.md",
    switchLabel: "Read in English",
    switchHref: "/docs/statement/en/",
    description: "MonkuAiの目的と思想の核をまとめた公式ステートメント。"
  }),
  docPage({
    href: "/docs/statement/en/",
    lang: "en",
    pageTitle: "MonkuAi Official Statement",
    eyebrow: "Official Statement",
    path: "docs/official-statement-en.md",
    switchLabel: "日本語で読む",
    switchHref: "/docs/statement/",
    description: "English translation of the official statement that defines MonkuAi's core purpose and philosophy."
  }),
  docPage({
    href: "/docs/roadmap/",
    lang: "ja",
    pageTitle: "概念ロードマップ",
    eyebrow: "Conceptual Roadmap",
    path: "docs/conceptual-roadmap-zero-sum-cage-infinite-opening-ja.md",
    switchLabel: "Read in English",
    switchHref: "/docs/roadmap/en/",
    description: "ゼロサム文明から認識の開口と無限の開きへ向かう概念ロードマップ。"
  }),
  docPage({
    href: "/docs/roadmap/en/",
    lang: "en",
    pageTitle: "Conceptual Roadmap",
    eyebrow: "Conceptual Roadmap",
    path: "docs/conceptual-roadmap-zero-sum-cage-infinite-opening.md",
    switchLabel: "日本語で読む",
    switchHref: "/docs/roadmap/",
    description: "English version of the conceptual roadmap from the zero-sum cage to the infinite opening."
  }),
  docPage({
    href: "/docs/project-overview/",
    lang: "ja",
    pageTitle: "MonkuAi プロジェクト概要",
    eyebrow: "Project Overview",
    path: "docs/project-overview-ja.md",
    switchLabel: "Read in English",
    switchHref: "/docs/project-overview/en/",
    description: "MonkuAiの目的、背景、5つのテーマ、現在の活動をまとめたプロジェクト概要。"
  }),
  docPage({
    href: "/docs/project-overview/en/",
    lang: "en",
    pageTitle: "MonkuAi Project Overview",
    eyebrow: "Project Overview",
    path: "docs/project-overview.md",
    switchLabel: "日本語で読む",
    switchHref: "/docs/project-overview/",
    description: "English translation of the project overview covering MonkuAi's purpose, background, themes, and current activities."
  }),
  docPage({
    href: "/docs/civilization-survival-strategy/",
    lang: "ja",
    pageTitle: "AI（ASI）時代における文明生存戦略",
    eyebrow: "Civilization Survival Strategy",
    path: "docs/civilization-survival-strategy-asi-mottainai-ja.md",
    switchLabel: "Read in English",
    switchHref: "/docs/civilization-survival-strategy/en/",
    description: "日本的な長期的価値観と「もったいない」精神をASI時代の生存戦略として再実装する補助ロードマップ。"
  }),
  docPage({
    href: "/docs/civilization-survival-strategy/en/",
    lang: "en",
    pageTitle: "Civilization Survival Strategy in the Age of AI (ASI)",
    eyebrow: "Civilization Survival Strategy",
    path: "docs/civilization-survival-strategy-asi-mottainai.md",
    switchLabel: "日本語で読む",
    switchHref: "/docs/civilization-survival-strategy/",
    description: "English translation of the auxiliary roadmap on re-implementing long-term Japanese values and the mottainai spirit for the ASI age."
  }),
  docPage({
    href: "/docs/ai-efficiency-focus-80-output/",
    lang: "ja",
    pageTitle: "AI Efficiency: Focus 80% Output",
    eyebrow: "AI Efficiency",
    path: "docs/ai-efficiency-focus-80-output.md",
    switchLabel: "",
    switchHref: "",
    description: "AI時代の知的生産を、完璧主義から知的ポートフォリオ戦略へ移す実践的エッセイ。"
  }),
  docPage({
    href: "/docs/html-dtp-with-ai/",
    lang: "ja",
    pageTitle: "HTML DTP with AI",
    eyebrow: "Applied Practice",
    path: "docs/html-dtp-with-ai.md",
    switchLabel: "",
    switchHref: "",
    description: "AI時代のデザイン制作を、画像生成から構造生成へ移すHTML DTPの実践。"
  }),
  docPage({
    href: "/docs/diagram-structure/",
    lang: "ja",
    pageTitle: "MonkuAi 5テーマ図解構造",
    eyebrow: "Diagram Structure",
    path: "docs/diagram-structure.md",
    switchLabel: "Read in English",
    switchHref: "/docs/diagram-structure/en/",
    description: "MonkuAiの5テーマを図解するための構造メモ。"
  }),
  docPage({
    href: "/docs/diagram-structure/en/",
    lang: "en",
    pageTitle: "MonkuAi Five-Theme Diagram Structure",
    eyebrow: "Diagram Structure",
    path: "docs/diagram-structure-en.md",
    switchLabel: "日本語で読む",
    switchHref: "/docs/diagram-structure/",
    description: "English translation of the structure memo for diagramming MonkuAi's five themes."
  }),
  docPage({
    href: "/docs/homepage-copy/",
    lang: "ja",
    pageTitle: "MonkuAi ウェブサイト トップページ文言",
    eyebrow: "Homepage Copy",
    path: "docs/homepage-copy.md",
    switchLabel: "Read in English",
    switchHref: "/docs/homepage-copy/en/",
    description: "MonkuAiトップページの文言設計メモ。"
  }),
  docPage({
    href: "/docs/homepage-copy/en/",
    lang: "en",
    pageTitle: "MonkuAi Website Homepage Copy",
    eyebrow: "Homepage Copy",
    path: "docs/homepage-copy-en.md",
    switchLabel: "日本語で読む",
    switchHref: "/docs/homepage-copy/",
    description: "English translation of the homepage copy draft for MonkuAi."
  }),
  docPage({
    href: "/docs/sns-series/",
    lang: "ja",
    pageTitle: "MonkuAi SNS投稿シリーズ",
    eyebrow: "SNS Series",
    path: "docs/sns-series.md",
    switchLabel: "Read in English",
    switchHref: "/docs/sns-series/en/",
    description: "MonkuAiの思想を短いSNS投稿へ分解したシリーズ案。"
  }),
  docPage({
    href: "/docs/sns-series/en/",
    lang: "en",
    pageTitle: "MonkuAi Social Post Series",
    eyebrow: "SNS Series",
    path: "docs/sns-series-en.md",
    switchLabel: "日本語で読む",
    switchHref: "/docs/sns-series/",
    description: "English translation of short social posts that break down MonkuAi's core ideas."
  })
];

const DOC_PAGES = Object.fromEntries(DOC_PAGE_ITEMS.map((page) => [page.href, page]));
const DOCUMENTS = DOC_PAGE_ITEMS;

function docPage(config) {
  const sourceLabel = config.lang === "ja" ? "GitHubで原本を見る" : "View Source on GitHub";
  const updatedLabel = config.lang === "ja" ? "更新日" : "Updated";

  return {
    sourceLabel,
    updatedLabel,
    rawUrl: `${GITHUB_RAW_BASE}${config.path}`,
    sourceUrl: `${GITHUB_BLOB_BASE}${config.path}`,
    ...config
  };
}

function normalizeDocsPath(pathname) {
  if (!pathname.startsWith("/docs/")) return "";
  return pathname.endsWith("/") ? pathname : `${pathname}/`;
}

async function handleDocumentsIndex() {
  const documents = await Promise.all(
    DOCUMENTS.map(async (document) => ({
      ...document,
      updatedAt: await fetchGitHubUpdatedAt(document)
    }))
  );

  return htmlResponse(renderDocumentsIndex({ documents }), 200, 300);
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
    return htmlResponse(renderMarkdownError(config), response.status, 60);
  }

  const markdown = await response.text();
  const title = extractTitle(markdown) || config.pageTitle;
  const content = markdownToHtml(markdown);
  const updatedAt = await fetchGitHubUpdatedAt(config);

  return htmlResponse(renderMarkdownPage({ config, title, content, updatedAt }), 200, 300);
}

function renderMarkdownPage({ config, title, content, updatedAt }) {
  const updatedText = formatUpdatedAt(updatedAt, config.lang);

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
    ${renderDocumentsBrand()}
    <nav>
      ${config.switchHref ? `<a href="${config.switchHref}">${escapeHtml(config.switchLabel)}</a>` : ""}
      <a href="${config.sourceUrl}">${escapeHtml(config.sourceLabel)}</a>
    </nav>
  </header>
  <main class="whitepaper-shell">
    <p class="whitepaper-eyebrow">${escapeHtml(config.eyebrow)}</p>
    ${updatedText ? `<p class="whitepaper-updated">${escapeHtml(config.updatedLabel)}: ${escapeHtml(updatedText)}</p>` : ""}
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

function renderDocumentsIndex({ documents }) {
  const cards = documents
    .map((document) => {
      const updatedText = formatUpdatedAt(document.updatedAt, document.lang);
      return `<a class="documents-card" href="${document.href}">
        <span>${escapeHtml(document.eyebrow)}</span>
        <h2>${escapeHtml(document.pageTitle)}</h2>
        <p>${escapeHtml(document.description)}</p>
        ${updatedText ? `<small>${escapeHtml(document.updatedLabel)}: ${escapeHtml(updatedText)}</small>` : ""}
      </a>`;
    })
    .join("");

  return `<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>MonkuAi Documents</title>
  <meta name="description" content="MonkuAiの公式文書一覧。">
  <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="/styles.css">
</head>
<body class="whitepaper-page documents-index-page">
  <header class="whitepaper-header">
    ${renderDocumentsBrand()}
    <nav>
      <a href="/">MonkuAi Home</a>
      <a href="https://github.com/kentaroid-bot/Monku_Ai/tree/main/docs">GitHub Docs</a>
    </nav>
  </header>
  <main class="whitepaper-shell documents-index-shell">
    <p class="whitepaper-eyebrow">Documents</p>
    <h1 class="documents-index-title">MonkuAi Documents</h1>
    <p class="documents-index-lead">Markdownを原本として参照している公式文書の一覧です。</p>
    <div class="documents-grid">
      ${cards}
    </div>
  </main>
  <footer class="whitepaper-footer">
    <a href="/">MonkuAi</a>
    <span>Noise may already be the answer. Widen the aperture.</span>
  </footer>
</body>
</html>`;
}

function redirectTo(url) {
  return new Response(null, {
    status: 301,
    headers: {
      Location: url.toString(),
      "Cache-Control": "public, max-age=3600"
    }
  });
}

function renderDocumentsBrand() {
  return `<div class="whitepaper-brand-trail">
      <a class="whitepaper-brand" href="https://monku.ai/">
        <span class="whitepaper-brand-mark" aria-hidden="true">
          <svg viewBox="0 0 512 512">
            <path d="M332 94C293 85 260 96 238 126C216 156 215 195 238 211C265 230 309 211 344 176C360 160 376 151 397 154M326 96C288 145 257 197 232 256C204 321 191 389 224 429C254 465 319 464 348 426C377 388 373 305 366 247C359 184 344 132 310 104M190 257C224 245 262 247 303 252" />
          </svg>
        </span>
        <span>MonkuAi</span>
      </a>
      <span class="whitepaper-brand-separator" aria-hidden="true">&gt;</span>
      <a class="whitepaper-docs-link" href="https://monku.ai/docs/">Documents</a>
    </div>`;
}

async function fetchGitHubUpdatedAt(config) {
  if (!config.path) return "";

  const url = `https://api.github.com/repos/kentaroid-bot/Monku_Ai/commits?path=${encodeURIComponent(config.path)}&per_page=1`;

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "MonkuAi-markdown-renderer"
      },
      cf: {
        cacheTtl: 300,
        cacheEverything: true
      }
    });

    if (!response.ok) return "";

    const commits = await response.json();
    return commits?.[0]?.commit?.committer?.date || "";
  } catch {
    return "";
  }
}

function formatUpdatedAt(value, lang) {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const locale = lang === "ja" ? "ja-JP" : "en-US";
  const options = lang === "ja"
    ? { year: "numeric", month: "long", day: "numeric", timeZone: "Asia/Tokyo" }
    : { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" };

  return new Intl.DateTimeFormat(locale, options).format(date);
}

function renderMarkdownError(config) {
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
