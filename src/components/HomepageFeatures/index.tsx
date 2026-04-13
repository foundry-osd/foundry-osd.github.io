import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';

import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  eyebrow: string;
  description: ReactNode;
};

const featureList: FeatureItem[] = [
  {
    eyebrow: 'Start Here',
    title: 'Download Foundry and get to first success fast',
    description: (
      <>
        The shortest path should answer four questions immediately: where to
        download Foundry, what you need, how to build the media, and how to run
        the first deployment.
      </>
    ),
  },
  {
    eyebrow: 'Use Foundry',
    title: 'Create ISO or USB boot media with the desktop app',
    description: (
      <>
        Standard workflow guidance should stay focused on the operator path, not
        the internal product split.
      </>
    ),
  },
  {
    eyebrow: 'Personalize It',
    title: 'Add network, localization, Autopilot, and customization only when needed',
    description: (
      <>
        Advanced options belong behind the main workflow so first-time users are
        not forced through expert concepts before they need them.
      </>
    ),
  },
  {
    eyebrow: 'Deep Dives',
    title: 'Keep architecture and internals available, but out of the critical path',
    description: (
      <>
        Product boundaries, catalog mechanics, and developer workflows should be
        one click away, not the default route for every user.
      </>
    ),
  },
];

function Feature({eyebrow, title, description}: FeatureItem) {
  return (
    <div className={clsx('col col--6')}>
      <div className={styles.featureCard}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <p className={styles.sectionLead}>What the platform covers</p>
          <Heading as="h2">
            Lead with the operator workflow, then let deeper pages explain the internals
          </Heading>
        </div>
        <div className="row">
          {featureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
