export const siteConfig = {
  name: 'dsh 插件开发实战',
  description:
    '从第一个插件到产品级能力的 DeepSeek Harness 双语开发指南。',
  url:
    import.meta.env.PUBLIC_SITE_URL ??
    'http://localhost:3000',
  logo: '/logo.svg',
  favicon: '/favicon.svg',
  homeLabel: 'GitHub',
  homeUrl: 'https://github.com/yunfei07/ai-dsh-book',
  githubUrl: 'https://github.com/yunfei07/ai-dsh-book',
  git: {
    user: 'yunfei07',
    repo: 'ai-dsh-book',
    branch: 'main',
  },
} as const;
