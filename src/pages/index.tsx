import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

const downloadLinks = {
  x64: 'https://github.com/foundry-osd/foundry/releases/latest/download/FoundrySetup-x64.msi',
  arm64:
    'https://github.com/foundry-osd/foundry/releases/latest/download/FoundrySetup-arm64.msi',
  releases: 'https://github.com/foundry-osd/foundry/releases',
};

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();

  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>Windows deployment documentation</p>
            <Heading as="h1" className={styles.heroTitle}>
              {siteConfig.title}
            </Heading>
            <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
            <div className={styles.heroActions}>
              <Link className="button button--primary button--lg" to={downloadLinks.x64}>
                Download x64
              </Link>
              <Link
                className="button button--primary button--lg"
                to={downloadLinks.arm64}>
                Download ARM64
              </Link>
              <Link className="button button--secondary button--lg" to="/docs/start/quick-start">
                Quick Start
              </Link>
              <Link
                className="button button--secondary button--lg"
                to="/docs/start/requirements">
                Requirements
              </Link>
            </div>
            <Link className={styles.releaseLink} to={downloadLinks.releases}>
              View all releases
            </Link>
          </div>

          <div className={styles.heroPanel}>
            <Heading as="h2" className={styles.panelTitle}>
              Start path
            </Heading>
            <ol className={styles.sequenceList}>
              <li>Install Foundry OSD on the admin workstation.</li>
              <li>Create ISO or USB deployment media.</li>
              <li>Boot the target device and continue through Foundry Connect and Foundry Deploy.</li>
            </ol>
            <Link className={styles.inlineLink} to="/docs/build-media/standard-workflow">
              Open the standard workflow
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Foundry Project documentation"
      description="Create bootable Windows deployment media, validate WinPE networking, and deploy with a guided workflow.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
