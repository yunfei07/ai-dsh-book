import { zhCN } from '@fumapress/language/zh-cn';
import { defineConfig } from 'fumapress';
import { fumadocsMdx } from 'fumapress/adapters/mdx';
import { flexsearchPlugin } from 'fumapress/plugins/flexsearch';
import { llmsPlugin } from 'fumapress/plugins/llms.txt';
import { sitemapPlugin } from 'fumapress/plugins/sitemap';
import { takumiPlugin } from 'fumapress/plugins/takumi';
import { defineI18n } from 'fumadocs-core/i18n';
import { lucideIconsPlugin } from 'fumadocs-core/source/plugins/lucide-icons';
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';
import { File, Files, Folder } from 'fumadocs-ui/components/files';
import { Step, Steps } from 'fumadocs-ui/components/steps';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import { TypeTable } from 'fumadocs-ui/components/type-table';
import defaultMdxComponents, { createRelativeLink } from 'fumadocs-ui/mdx';
import * as LucideIcons from 'lucide-react';
import type { MDXComponents } from 'mdx/types';
import type { ComponentProps, FC } from 'react';
import { docs } from './.source/server';
import { Github } from './src/components/github-icon';
import { SidebarFooter } from './src/components/sidebar-footer';
import { siteConfig } from './src/site.config';

const isDevelopment = process.env.NODE_ENV === 'development';
const DefaultMdxLink = defaultMdxComponents.a as FC<ComponentProps<'a'>>;

function createDevelopmentLink(locale: string | undefined): FC<ComponentProps<'a'>> {
  return function DevelopmentLink({ href, ...props }) {
    const localizedHref =
      isDevelopment && locale === 'zh' && href?.startsWith('/') && !href.startsWith('//')
        ? `/zh${href}`
        : href;

    return <DefaultMdxLink href={localizedHref} {...props} />;
  };
}

const i18n = defineI18n({
  languages: ['zh', 'en'],
  defaultLanguage: 'zh',
  hideLocale: isDevelopment ? 'never' : 'default-locale',
});

const translations = i18n
  .translations()
  .preset('zh', zhCN())
  .add({
    zh: { displayName: '🇨🇳 中文' },
    en: { displayName: '🇺🇸 English' },
  });

const lucideMdxComponents = Object.fromEntries(
  Object.entries(LucideIcons).filter(([name]) => /^[A-Z]/.test(name)),
) as MDXComponents;

export default defineConfig({
  mode: 'static',
  content: docs.toFumadocsSource(),
  translations,
  loaderOptions: {
    plugins: [lucideIconsPlugin()],
  },
  site: {
    name: siteConfig.name,
    baseUrl: siteConfig.url,
    git: siteConfig.git,
  },
  meta: {
    root() {
      return (
        <>
          <meta name="description" content={siteConfig.description} />
          <meta name="theme-color" content="#405d52" />
          <meta property="og:site_name" content={siteConfig.name} />
          <link rel="icon" href={siteConfig.favicon} />
        </>
      );
    },
    page(page) {
      const pageUrl = new URL(page.url, siteConfig.url).href;

      return (
        <>
          <meta property="og:type" content="website" />
          <meta property="og:url" content={pageUrl} />
        </>
      );
    },
  },
})
  .plugins(
    flexsearchPlugin(),
    llmsPlugin(),
    sitemapPlugin(),
    takumiPlugin(),
  )
  .adapters(
    fumadocsMdx({
      async getMdxComponents(page) {
        const source = await this.getLoader();

        return {
          ...defaultMdxComponents,
          ...lucideMdxComponents,
          a: createRelativeLink(source, page, createDevelopmentLink(page.locale)),
          Accordion,
          Accordions,
          File,
          Files,
          Folder,
          Github,
          Step,
          Steps,
          Tab,
          Tabs,
          TypeTable,
        };
      },
    }),
  )
  .layouts({
    async defaultProps() {
      return {
        githubUrl: '',
        nav: {
          title: (
            <>
              <img
                src={siteConfig.logo}
                alt=""
                aria-hidden="true"
                className="size-7 rounded-md"
              />
              <span className="font-semibold">{siteConfig.name}</span>
            </>
          ),
          url: isDevelopment ? '/zh' : '/',
        },
        links: [
          {
            text: siteConfig.homeLabel,
            url: siteConfig.homeUrl,
            external: siteConfig.homeUrl.startsWith('http'),
          },
        ],
        i18n: false,
        themeSwitch: {
          enabled: false,
        },
        sidebar: {
          footer: <SidebarFooter githubUrl={siteConfig.githubUrl} />,
        },
      };
    },
  });
