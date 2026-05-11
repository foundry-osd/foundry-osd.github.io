import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';

import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  eyebrow: string;
  link: string;
  linkLabel: string;
  description: ReactNode;
};

const featureList: FeatureItem[] = [
  {
    eyebrow: 'Start',
    title: 'Install and prepare',
    link: '/docs/start/quick-start',
    linkLabel: 'Open Quick Start',
    description:
      'Check requirements, install Foundry OSD, and follow the shortest path to a first deployment.',
  },
  {
    eyebrow: 'Build',
    title: 'Create deployment media',
    link: '/docs/build-media/media-creation',
    linkLabel: 'Open Build Media',
    description:
      'Compare ISO and USB output, then create the boot media that fits the deployment scenario.',
  },
  {
    eyebrow: 'Connect',
    title: 'Validate WinPE networking',
    link: '/docs/connect/network-readiness',
    linkLabel: 'Open Foundry Connect',
    description:
      'Boot the target device and confirm that the runtime network state is ready before deployment.',
  },
  {
    eyebrow: 'Deploy',
    title: 'Run deployment',
    link: '/docs/deploy/deployment-flow',
    linkLabel: 'Open Foundry Deploy',
    description:
      'Choose deployment options in the WinPE wizard and start the Windows deployment workflow.',
  },
];

function Feature({eyebrow, title, description, link, linkLabel}: FeatureItem) {
  return (
    <div className={clsx('col col--6')}>
      <article className={styles.featureCard}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
        <Link className={styles.cardLink} to={link}>
          {linkLabel}
        </Link>
      </article>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <p className={styles.sectionLead}>Documentation paths</p>
          <Heading as="h2">Use the shortest path for the task in front of you</Heading>
        </div>
        <div className="row">
          {featureList.map((props) => (
            <Feature key={props.title} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
