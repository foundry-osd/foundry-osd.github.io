import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

const downloadLinks = {
  x64: 'https://github.com/foundry-osd/foundry/releases/latest/download/Foundry-win-x64.msi',
  arm64:
    'https://github.com/foundry-osd/foundry/releases/latest/download/Foundry-win-arm64.msi',
  releases: 'https://github.com/foundry-osd/foundry/releases',
};

const icons = {
  start: (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor">
      <path d="M8 6h13" />
      <path d="M8 12h13" />
      <path d="M8 18h13" />
      <path d="m3 6 1 1 2-2" />
      <path d="m3 12 1 1 2-2" />
      <path d="m3 18 1 1 2-2" />
    </svg>
  ),
  media: (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor">
      <rect width="14" height="18" x="5" y="3" rx="2" />
      <path d="M9 7h6" />
      <path d="M9 17h6" />
      <path d="M12 12h.01" />
    </svg>
  ),
  runtime: (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor">
      <rect width="7" height="5" x="3" y="4" rx="1" />
      <rect width="7" height="5" x="14" y="4" rx="1" />
      <rect width="7" height="5" x="8.5" y="15" rx="1" />
      <path d="M6.5 9v2H12" />
      <path d="M17.5 9v2H12" />
      <path d="M12 11v4" />
    </svg>
  ),
  reference: (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z" />
    </svg>
  ),
};

const documentationSections = [
  {
    icon: icons.start,
    title: 'Start Here',
    text: 'Install Foundry OSD, verify requirements, and complete the first guided path.',
    links: [
      ['Requirements', '/docs/start/requirements'],
      ['Quick Start', '/docs/start/quick-start'],
    ],
  },
  {
    icon: icons.media,
    title: 'Build Media',
    text: 'Create bootable media and choose between ISO and USB outputs.',
    links: [
      ['Media Creation', '/docs/build-media/media-creation'],
      ['Standard Workflow', '/docs/build-media/standard-workflow'],
    ],
  },
  {
    icon: icons.runtime,
    title: 'WinPE Runtime',
    text: 'Use Foundry Connect and Foundry Deploy after booting the target device.',
    links: [
      ['Foundry Connect', '/docs/connect/network-readiness'],
      ['Foundry Deploy', '/docs/deploy/deployment-flow'],
    ],
  },
  {
    icon: icons.reference,
    title: 'Reference',
    text: 'Understand product boundaries, architecture, and catalog behavior.',
    links: [
      ['Architecture', '/docs/reference/architecture-overview'],
      ['Product Boundaries', '/docs/reference/product-boundaries'],
    ],
  },
];

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();

  return (
    <section className={styles.hero}>
      <div className="container">
        <p className={styles.kicker}>Windows deployment documentation</p>
        <Heading as="h1" className={styles.title}>
          {siteConfig.title}
        </Heading>
        <p className={styles.subtitle}>{siteConfig.tagline}</p>
        <div className={styles.actions}>
          <Link className="button button--primary button--lg" to={downloadLinks.x64}>
            Download x64
          </Link>
          <Link className="button button--primary button--lg" to={downloadLinks.arm64}>
            Download ARM64
          </Link>
          <Link className="button button--secondary button--lg" to="/docs/start/quick-start">
            Quick Start
          </Link>
        </div>
        <Link className={styles.releaseLink} to={downloadLinks.releases}>
          View all releases
        </Link>
      </div>
    </section>
  );
}

function DocumentationIndex() {
  return (
    <section className={styles.documentationIndex}>
      <div className="container">
        <div className={styles.indexGrid}>
          {documentationSections.map((section) => (
            <article className={styles.indexCard} key={section.title}>
              <div className={styles.cardHeader}>
                <span className={styles.cardGlyph}>{section.icon}</span>
                <Heading as="h2">{section.title}</Heading>
              </div>
              <p>{section.text}</p>
              <div className={styles.indexLinks}>
                {section.links.map(([label, link]) => (
                  <Link key={label} to={link}>
                    {label}
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Foundry Project documentation"
      description="Create bootable Windows deployment media, validate WinPE networking, and deploy with a guided workflow.">
      <main className={styles.homepage}>
        <HomepageHeader />
        <DocumentationIndex />
      </main>
    </Layout>
  );
}
