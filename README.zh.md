# dsh 插件开发实战

[English](README.md) | 中文

一本面向 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) 插件开发的双语实战书。内容从最小本地插件出发，逐步讲解 Tool、配置、生命周期、服务、事件、能力角色、提供方适配器和 Web UI 主题。

网站默认显示中文，英文版位于 `/en/`。

## 本地开发

需要 Node.js `^22.19.0` 或 `>=24.0.0`，并启用 Corepack。

```sh
corepack pnpm@11.21.0 install
pnpm docs:dev
```

发布前构建并预览静态站点：

```sh
pnpm docs:build
pnpm docs:preview
```

网站部署在子路径时可设置 `BOOK_BASE`。例如 GitHub Pages 项目站点使用 `BOOK_BASE=/ai-dsh-book/ pnpm docs:build`。

## 内容结构

- 第一部分：第一个插件、Tool、配置与分发
- 第二部分：生命周期、服务与事件
- 第三部分：能力角色、LLM 适配器与宋式 UI 主题

示例以当前 DeepSeek Harness 源码树为准。离开本书范围的链接会指向内容所属仓库，因此本书可以独立构建和阅读。

## 许可证

[MIT](LICENSE)。本书源自 DeepSeek Harness 文档，并保留其版权声明。
