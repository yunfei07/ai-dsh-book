# dsh Plugin Development in Practice

English | [中文](README.zh.md)

A bilingual, runnable guide to building plugins for [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness). The book starts with a minimal local plugin and progresses through tools, configuration, lifecycle, services, events, capability roles, provider adapters, and Web UI themes.

The site uses the [MkThingsHQ/mkdocs](https://github.com/MkThingsHQ/mkdocs) FumaPress template with Waku, React, Tailwind CSS, static search, light and dark themes, `llms.txt`, and sitemap generation. Chinese is the default locale; English pages live under `/en/`.

## Local development

Requirements: Node.js 24 or later and Corepack.

```sh
corepack pnpm@11.21.0 install
pnpm dev
```

Validate and build the static site before publishing:

```sh
pnpm check
```

Set `PUBLIC_SITE_URL` to the deployed origin when building production metadata:

```sh
PUBLIC_SITE_URL=https://docs.example.com pnpm build
```

The included `wrangler.jsonc` deploys static assets to Cloudflare Workers. Authenticate with Wrangler and run `pnpm deploy`; add a custom domain to that file only when the domain is known.

## Contents

- Part I: first plugin, Tool, configuration, and distribution
- Part II: lifecycle, services, and events
- Part III: capability roles, LLM adapters, and the Song-inspired UI theme

The examples target the current DeepSeek Harness source tree. Links that leave this book point to their owning repository so the book can be built and read independently. Chinese chapters are unsuffixed files under `content/`; matching English files use the `.en.mdx` suffix.

## License

[MIT](LICENSE). The book content is derived from the DeepSeek Harness documentation, and the site runtime is adapted from MkThingsHQ/mkdocs. Both upstream copyright notices are retained.
