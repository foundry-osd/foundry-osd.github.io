import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Start Here',
      description:
        'Install Foundry OSD, check requirements, and complete the first deployment.',
      link: {
        type: 'generated-index',
        title: 'Start Here',
        slug: '/start',
        description:
          'Install Foundry OSD, check requirements, and complete the first deployment.',
      },
      items: ['start/requirements', 'start/quick-start'],
    },
    {
      type: 'category',
      label: 'Build Media',
      description: 'Create ISO or USB deployment media with Foundry OSD.',
      link: {
        type: 'generated-index',
        title: 'Build Media',
        slug: '/build-media',
        description: 'Create ISO or USB deployment media with Foundry OSD.',
      },
      items: ['build-media/standard-workflow', 'build-media/media-creation'],
    },
    {
      type: 'category',
      label: 'Connect',
      description: 'Validate WinPE networking before deployment continues.',
      link: {
        type: 'generated-index',
        title: 'Connect',
        slug: '/connect',
        description: 'Validate WinPE networking before deployment continues.',
      },
      items: ['connect/network-readiness'],
    },
    {
      type: 'category',
      label: 'Deploy',
      description: 'Select deployment options and run the Windows deployment.',
      link: {
        type: 'generated-index',
        title: 'Deploy',
        slug: '/deploy',
        description: 'Select deployment options and run the Windows deployment.',
      },
      items: ['deploy/deployment-flow'],
    },
    {
      type: 'category',
      label: 'Configure Deployment',
      description:
        'Use expert settings only when the standard path is not enough.',
      link: {
        type: 'generated-index',
        title: 'Configure Deployment',
        slug: '/configure',
        description:
          'Use expert settings only when the standard path is not enough.',
      },
      items: [
        'configure/expert-mode',
        'configure/network',
        'configure/localization',
        'configure/autopilot',
        'configure/customization',
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      description:
        'Architecture, product boundaries, runtime sequence, and catalog behavior.',
      link: {
        type: 'generated-index',
        title: 'Reference',
        slug: '/reference',
        description:
          'Architecture, product boundaries, runtime sequence, and catalog behavior.',
      },
      items: [
        'reference/architecture-overview',
        'reference/product-boundaries',
        'reference/catalog-overview',
      ],
    },
    {
      type: 'category',
      label: 'Developer',
      description: 'Build, test, and validate Foundry Project from source.',
      link: {
        type: 'generated-index',
        title: 'Developer',
        slug: '/developer',
        description: 'Build, test, and validate Foundry Project from source.',
      },
      items: ['developer/build-from-source', 'developer/local-winpe-testing'],
    },
  ],
};

export default sidebars;
