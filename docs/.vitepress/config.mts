import { defineConfig } from 'vitepress'

const repository = 'https://github.com/yunfei07/ai-dsh-book'

export default defineConfig({
  base: process.env.BOOK_BASE ?? '/',
  cleanUrls: true,
  lastUpdated: true,
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      title: 'dsh 插件开发实战',
      description: '从第一个插件到产品级能力的 DeepSeek Harness 开发指南',
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      title: 'dsh Plugin Development in Practice',
      description: 'A practical guide from a first plugin to production DeepSeek Harness capabilities',
    },
  },
  themeConfig: {
    search: {
      provider: 'local',
    },
    socialLinks: [
      { icon: 'github', link: repository },
    ],
    locales: {
      root: {
        label: '简体中文',
        nav: [
          { text: '阅读', link: '/' },
          { text: 'DeepSeek Harness', link: 'https://github.com/deepseek-ai/deepseek-harness' },
          { text: '宋式主题', link: 'https://github.com/yunfei07/ui-song-theme' },
        ],
        sidebar: [
          {
            text: '开始',
            items: [
              { text: '全书导读', link: '/' },
            ],
          },
          {
            text: '第一部分：让插件跑起来',
            items: [
              { text: '第一个插件', link: '/basic/' },
              { text: '开发一个 Tool', link: '/basic/tool' },
              { text: '插件配置', link: '/basic/config' },
              { text: '打包与安装', link: '/basic/publish' },
            ],
          },
          {
            text: '第二部分：使用框架',
            items: [
              { text: '插件与生命周期', link: '/framework/' },
              { text: '服务与依赖', link: '/framework/service' },
              { text: '事件系统', link: '/framework/events' },
            ],
          },
          {
            text: '第三部分：开发产品能力',
            items: [
              { text: '能力的三种角色', link: '/practice/' },
              { text: 'LLM 适配器', link: '/practice/llm-adapter' },
              { text: '宋式 UI 主题', link: '/practice/song-theme' },
            ],
          },
        ],
        outline: { label: '本页目录' },
        docFooter: { prev: '上一篇', next: '下一篇' },
        lastUpdated: { text: '最后更新' },
        returnToTopLabel: '返回顶部',
        sidebarMenuLabel: '目录',
        darkModeSwitchLabel: '外观',
      },
      en: {
        label: 'English',
        nav: [
          { text: 'Read', link: '/en/' },
          { text: 'DeepSeek Harness', link: 'https://github.com/deepseek-ai/deepseek-harness' },
          { text: 'Song theme', link: 'https://github.com/yunfei07/ui-song-theme' },
        ],
        sidebar: [
          {
            text: 'Start',
            items: [
              { text: 'Book overview', link: '/en/' },
            ],
          },
          {
            text: 'Part I: make a plugin work',
            items: [
              { text: 'Your first plugin', link: '/en/basic/' },
              { text: 'Build a Tool', link: '/en/basic/tool' },
              { text: 'Plugin configuration', link: '/en/basic/config' },
              { text: 'Package and install', link: '/en/basic/publish' },
            ],
          },
          {
            text: 'Part II: use the framework',
            items: [
              { text: 'Plugins and lifecycle', link: '/en/framework/' },
              { text: 'Services and dependencies', link: '/en/framework/service' },
              { text: 'Event system', link: '/en/framework/events' },
            ],
          },
          {
            text: 'Part III: build capabilities',
            items: [
              { text: 'Three-role capability design', link: '/en/practice/' },
              { text: 'LLM adapters', link: '/en/practice/llm-adapter' },
              { text: 'Song-inspired UI theme', link: '/en/practice/song-theme' },
            ],
          },
        ],
        outline: { label: 'On this page' },
        docFooter: { prev: 'Previous page', next: 'Next page' },
        lastUpdated: { text: 'Last updated' },
        returnToTopLabel: 'Return to top',
        sidebarMenuLabel: 'Menu',
        darkModeSwitchLabel: 'Appearance',
      },
    },
  },
})
