# dsh 插件开发实战

[English](README.md) | 中文

一本面向 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) 插件开发的双语实战书。内容从最小本地插件出发，逐步讲解 Tool、配置、生命周期、服务、事件、能力角色、提供方适配器和 Web UI 主题。

网站使用 [MkThingsHQ/mkdocs](https://github.com/MkThingsHQ/mkdocs) 的 FumaPress 模板，技术栈包括 Waku、React 和 Tailwind CSS，并内置静态搜索、明暗模式、`llms.txt` 与站点地图。网站默认显示中文，英文版位于 `/en/`。

## 本地开发

需要 Node.js 24 或更高版本，并启用 Corepack。

```sh
corepack pnpm@11.21.0 install
pnpm dev
```

发布前验证并构建静态站点：

```sh
pnpm check
```

生产构建时通过 `PUBLIC_SITE_URL` 设置网站域名：

```sh
PUBLIC_SITE_URL=https://docs.example.com pnpm build
```

项目内的 `wrangler.jsonc` 会把静态资源部署到 Cloudflare Workers。完成 Wrangler 登录后运行 `pnpm deploy`；确定自定义域名后，再把域名写入该配置。

## 内容结构

- 第一部分：第一个插件、Tool、配置与分发
- 第二部分：生命周期、服务与事件
- 第三部分：能力角色、LLM 适配器与宋式 UI 主题

示例以当前 DeepSeek Harness 源码树为准。离开本书范围的链接会指向内容所属仓库，因此本书可以独立构建和阅读。中文章节是 `content/` 下不带语言后缀的文件，对应英文文件使用 `.en.mdx` 后缀。

## 许可证

[MIT](LICENSE)。书稿源自 DeepSeek Harness 文档，网站运行时改编自 MkThingsHQ/mkdocs，并保留两个上游项目的版权声明。
