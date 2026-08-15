# Repository guidance

This repository publishes a bilingual FumaPress book about DeepSeek Harness plugin development.

- Keep Chinese chapters as unsuffixed `content/**/*.mdx` files and matching English chapters as `content/**/*.en.mdx` files.
- Update both languages in the same change. Keep headings, code blocks, and link targets structurally aligned.
- Keep matching `meta.json` and `meta.en.json` navigation files aligned.
- Link DeepSeek Harness implementation details to their owning files on GitHub. Do not copy unrelated source documentation into this repository.
- Keep examples small, runnable, and consistent with the current public dsh plugin API.
- Run `pnpm check` after changing content, navigation, runtime code, or deployment configuration.
