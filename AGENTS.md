# Repository guidance

This repository publishes a bilingual VitePress book about DeepSeek Harness plugin development.

- Keep Chinese chapters in `docs/` and matching English chapters in `docs/en/`.
- Update both languages in the same change. Keep headings, code blocks, and link targets structurally aligned.
- Link DeepSeek Harness implementation details to their owning files on GitHub. Do not copy unrelated source documentation into this repository.
- Keep examples small, runnable, and consistent with the current public dsh plugin API.
- Run `pnpm docs:build` after changing content, navigation, or VitePress configuration.
