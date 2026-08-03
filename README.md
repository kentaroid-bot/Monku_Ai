# MonkuAi

MonkuAi is a project for helping humanity receive the benefits of artificial superintelligence safely, deeply, and as fully as possible.

Its central concern is not only how to align AI systems, but how to expand the human side of alignment: our capacity to recognize higher intelligence, remain open before what we do not yet understand, and redesign social structures so that humble, non-zero-sum intelligence can shape collective decisions.

## Why This Matters

As AI systems move toward superintelligent capabilities, the bottleneck may not be raw model performance alone. A deeper bottleneck may be whether human beings can recognize, interpret, and responsibly integrate forms of intelligence that exceed our existing frames.

If we reject unfamiliar reasoning as meaningless noise simply because it does not fit our current categories, we lose access to the very intelligence we hoped to create. If we embed competitive, short-term, status-driven incentives into the goals and governance of superintelligence, we risk turning extraordinary capability into a destructive amplifier.

MonkuAi exists to develop and spread the concepts, practices, and cultural infrastructure needed for a wiser relationship with ASI.

## Core Themes

1. Epistemic alignment and expansion of the cognitive vessel
2. Transcending survival and reproductive instincts beyond zero-sum competition
3. Informational symbiosis as a new form of continuity
4. Governance that allows humble intelligence to matter
5. Meta-attitude in dialogue with AI and other minds

## Project Direction

MonkuAi currently focuses on developing and communicating its ideas through:

- public statements and manifestos
- website copy and explanatory materials
- SNS post series
- diagrams and conceptual maps
- README-style project documentation
- future protocols for AI dialogue, education, and governance design

## Website

This repository includes a minimal static website that can be deployed either to Cloudflare Workers Static Assets or Cloudflare Pages.

Local development:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

The current website is intentionally dependency-free. A future version can migrate to Next.js when the project needs richer routing, content collections, or interactive components.

Cloudflare Workers deployment:

```bash
npx wrangler deploy
```

Workers settings are defined in `wrangler.toml`. The `.assetsignore` file limits uploaded assets to:

- `index.html`
- `styles.css`
- `assets/**`

Cloudflare Pages settings:

- Framework preset: `None`
- Build command: `exit 0`
- Build output directory: `/`
- Root directory: `/`

## First Materials

The initial Japanese content kit is available at:

- [docs/official-statement.md](/Users/sukezo/Monku_Ai/docs/official-statement.md)
- [docs/homepage-copy.md](/Users/sukezo/Monku_Ai/docs/homepage-copy.md)
- [docs/sns-series.md](/Users/sukezo/Monku_Ai/docs/sns-series.md)
- [docs/diagram-structure.md](/Users/sukezo/Monku_Ai/docs/diagram-structure.md)
- [docs/project-overview-ja.md](/Users/sukezo/Monku_Ai/docs/project-overview-ja.md)
