import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Foundry',
  tagline:
    'Documentation for building deployment media, validating WinPE connectivity, and running repeatable Windows deployment workflows.',
  favicon: 'img/favicon.ico',
  future: {
    v4: true,
  },
  url: 'https://foundry-osd.github.io',
  baseUrl: '/',
  organizationName: 'foundry-osd',
  projectName: 'foundry-osd.github.io',
  trailingSlash: false,
  onBrokenLinks: 'throw',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: {
          blogTitle: 'Foundry Blog',
          blogDescription:
            'Updates, architecture notes, and implementation guidance for the Foundry project.',
          postsPerPage: 10,
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    image: 'img/foundry-social-preview.png',
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'Foundry',
      logo: {
        alt: 'Foundry logo',
        src: 'img/foundry-logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/foundry-osd/foundry',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Quick Start',
              to: '/docs/getting-started/quick-start',
            },
            {
              label: 'Create Boot Media',
              to: '/docs/foundry/media-creation',
            },
          ],
        },
        {
          title: 'Project',
          items: [
            {
              label: 'Foundry Repository',
              href: 'https://github.com/foundry-osd/foundry',
            },
            {
              label: 'Catalog Repository',
              href: 'https://github.com/foundry-osd/catalog',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'Releases',
              href: 'https://github.com/foundry-osd/foundry/releases',
            },
            {
              label: 'Issues',
              href: 'https://github.com/foundry-osd/foundry/issues',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Foundry Contributors. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.oneDark,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
