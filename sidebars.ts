import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Start Here',
      items: [
        'getting-started/requirements',
        'getting-started/quick-start',
      ],
    },
    {
      type: 'category',
      label: 'Use Foundry',
      items: [
        'foundry/standard-workflow',
        'foundry/media-creation',
      ],
    },
    {
      type: 'category',
      label: 'Personalize It',
      items: [
        'foundry/expert-mode',
        'configuration/network',
        'configuration/localization',
        'configuration/autopilot',
        'configuration/customization',
      ],
    },
    {
      type: 'category',
      label: 'Deep Dives',
      items: [
        'architecture/overview',
        'architecture/product-boundaries',
        'foundry-connect/network-readiness',
        'foundry-deploy/deployment-flow',
        'catalog/overview',
      ],
    },
    {
      type: 'category',
      label: 'Developer',
      items: [
        'developer/build-from-source',
        'developer/local-winpe-testing',
      ],
    },
  ],
};

export default sidebars;
