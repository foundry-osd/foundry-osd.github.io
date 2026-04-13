import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

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
              <Link
                className="button button--primary button--lg"
                to="/docs/getting-started/quick-start">
                Start with quick start
              </Link>
              <Link
                className="button button--secondary button--lg"
                to="/docs/getting-started/requirements">
                Download and requirements
              </Link>
            </div>
            <div className={styles.heroMeta}>
              <span>Download Foundry</span>
              <span>Create boot media</span>
              <span>Deploy with confidence</span>
            </div>
          </div>

          <div className={styles.heroPanel}>
            <Heading as="h2" className={styles.panelTitle}>
              Start path
            </Heading>
            <ol className={styles.sequenceList}>
              <li>
                Download <strong>Foundry</strong>, then let the app validate ADK readiness on the admin workstation.
              </li>
              <li>
                Build ISO for a reusable artifact or USB for direct media with a persistent cache partition.
              </li>
              <li>
                Boot the target device and continue through{' '}
                <strong>Foundry.Connect</strong> and <strong>Foundry.Deploy</strong>.
              </li>
            </ol>
            <Link className={styles.inlineLink} to="/docs/foundry/standard-workflow">
              See the standard workflow
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
      title="Foundry documentation"
      description="Documentation for the Foundry media builder, Foundry.Connect network gate, and Foundry.Deploy deployment workflow.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
