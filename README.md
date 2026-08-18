<div align="center">

# Chatty Docs

**Source for [docs.chatty.personaliai.com](https://docs.chatty.personaliai.com)** — API reference, guides, and self-hosting documentation for [Chatty](https://chatty.personaliai.com), the open-source AI customer-support widget.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](package.json)
[![MDX](https://img.shields.io/badge/Content-MDX-1B1F24?logo=mdx&logoColor=fff)](src/app/(docs))

**[Live Docs](https://docs.chatty.personaliai.com)** · **[Chatty App](https://chatty.personaliai.com)** · **[Source (chatty)](https://github.com/PersonaliAI/chatty)**

</div>

---

A hand-built Next.js + MDX documentation site — no third-party docs platform, no imported theme. Everything here (layout, sidebar, search, MDX components) is custom and lives in this repo.

## Structure

```
src/app/(docs)/
├── introduction/        What Chatty is, what you can build
├── quickstart/          First API call in under 5 minutes
├── authentication/      API key auth
├── rate-limits/
├── errors/
├── api-reference/       One page per endpoint (chat, bots, leads, knowledge, ...)
├── guides/               Embed widget, mobile SDKs, webhooks, BYOK, self-hosting
├── security/
└── changelog/
src/components/mdx/       Callout, Card, CodeGroup, ParamField, etc. — used inside .mdx pages
src/lib/navigation.ts     Sidebar structure + prev/next page links
```

Adding a page: create `src/app/(docs)/your-section/page.mdx`, export `metadata`, write MDX, then add an entry to `src/lib/navigation.ts` so it shows up in the sidebar and prev/next nav.

## Local development

```bash
npm install
npm run dev
```

Runs on `http://localhost:3001` (matches the main [chatty](https://github.com/PersonaliAI/chatty) app's dev server, which uses `:3000`).

## Deployment

Deployed via Firebase App Hosting (`apphosting.yaml`) — auto-deploys on push to `main`/`master`.

## Contributing

Docs PRs are especially welcome — fixing an unclear explanation or adding a missing example is one of the easiest ways to contribute to the [Chatty](https://github.com/PersonaliAI/chatty) project.

## License

MIT — see [LICENSE](LICENSE).
