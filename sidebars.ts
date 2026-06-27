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
      items: [
        'build-media/standard-workflow',
        'build-media/media-authoring-flow',
        'build-media/media-creation',
      ],
    },
    {
      type: 'category',
      label: 'Configure Media',
      description:
        'Author the settings that Foundry OSD stages into generated media.',
      link: {
        type: 'generated-index',
        title: 'Configure Media',
        slug: '/configure',
        description:
          'Author the settings that Foundry OSD stages into generated media.',
      },
      items: [
        'configure/expert-mode',
        'configure/general',
        'configure/network',
        'configure/customization',
      ],
    },
    {
      type: 'category',
      label: 'Autopilot',
      description:
        'Choose and configure the Autopilot provisioning mode for deployment media.',
      link: {
        type: 'generated-index',
        title: 'Autopilot',
        slug: '/autopilot',
        description:
          'Choose and configure the Autopilot provisioning mode for deployment media.',
      },
      items: [
        'autopilot/overview',
        'autopilot/json-profile-injection',
        'autopilot/zero-touch-hardware-hash-upload',
        'autopilot/interactive-hardware-hash-upload',
        'autopilot/troubleshooting',
      ],
    },
    {
      type: 'category',
      label: 'Runtime',
      description:
        'Understand what happens after the target boots into Foundry media.',
      link: {
        type: 'generated-index',
        title: 'Runtime',
        slug: '/runtime',
        description:
          'Understand what happens after the target boots into Foundry media.',
      },
      items: [
        'runtime/network-readiness',
        'runtime/deployment-flow',
        'runtime/post-winpe-handoff',
        'runtime/logs-and-artifacts',
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      description:
        'Architecture, product boundaries, orchestration, catalog behavior, and telemetry.',
      link: {
        type: 'generated-index',
        title: 'Reference',
        slug: '/reference',
        description:
          'Architecture, product boundaries, orchestration, catalog behavior, and telemetry.',
      },
      items: [
        'reference/architecture-overview',
        'reference/product-boundaries',
        'reference/catalog-overview',
        'reference/deployment-orchestrator',
        'reference/telemetry',
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
