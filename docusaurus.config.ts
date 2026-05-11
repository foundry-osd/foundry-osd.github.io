import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Foundry Project',
  tagline:
    'Create bootable Windows deployment media, validate WinPE networking, and deploy with a guided workflow.',
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
      title: 'Foundry Project',
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
            {label: 'Quick Start', to: '/docs/start/quick-start'},
            {label: 'Requirements', to: '/docs/start/requirements'},
            {label: 'Build Media', to: '/docs/build-media/media-creation'},
          ],
        },
        {
          title: 'Downloads',
          items: [
            {
              label: 'Download x64',
              href: 'https://github.com/foundry-osd/foundry/releases/latest/download/FoundrySetup-x64.msi',
            },
            {
              label: 'Download ARM64',
              href: 'https://github.com/foundry-osd/foundry/releases/latest/download/FoundrySetup-arm64.msi',
            },
            {
              label: 'All releases',
              href: 'https://github.com/foundry-osd/foundry/releases',
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
              label: 'Foundry Repository',
              href: 'https://github.com/foundry-osd/foundry',
            },
            {
              label: 'Catalog Repository',
              href: 'https://github.com/foundry-osd/catalog',
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
