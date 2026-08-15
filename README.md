# dsh Plugin Development in Practice

English | [中文](README.zh.md)

A bilingual, runnable guide to building plugins for [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness). The book starts with a minimal local plugin and progresses through tools, configuration, lifecycle, services, events, capability roles, provider adapters, and Web UI themes.

Chinese is the default website locale. English pages live under `/en/`.

## Local development

Requirements: Node.js `^22.19.0` or `>=24.0.0` and Corepack.

```sh
corepack pnpm@11.21.0 install
pnpm docs:dev
```

Build the static site before publishing:

```sh
pnpm docs:build
pnpm docs:preview
```

Set `BOOK_BASE` when the site is hosted below a path, for example `BOOK_BASE=/ai-dsh-book/ pnpm docs:build` for GitHub Pages project hosting.

## Contents

- Part I: first plugin, Tool, configuration, and distribution
- Part II: lifecycle, services, and events
- Part III: capability roles, LLM adapters, and the Song-inspired UI theme

The examples target the current DeepSeek Harness source tree. Links that leave this book point to their owning repository so the book can be built and read independently.

## License

[MIT](LICENSE). This book is derived from the DeepSeek Harness documentation and retains its copyright notice.
