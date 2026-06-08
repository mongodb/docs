import type { TocItem } from '../types';
import { mongocliCommands } from './mongocli-commands';

const tocData: TocItem[] = [
  {
    label: 'MongoCLI',
    contentSite: 'mongocli',
    group: true,
    versionDropdown: true,
    items: [
      {
        label: 'Overview',
        contentSite: 'mongocli',
        url: '/docs/mongocli/:version/',
      },
      {
        label: 'Compatibility',
        contentSite: 'mongocli',
        url: '/docs/mongocli/:version/install/compatibility',
      },
      {
        label: 'Install or Update',
        contentSite: 'mongocli',
        url: '/docs/mongocli/:version/install',
        collapsible: true,
        items: [
          {
            label: 'Verify Packages',
            contentSite: 'mongocli',
            url: '/docs/mongocli/:version/verify-packages',
          },
        ],
      },
      {
        label: 'Configure',
        contentSite: 'mongocli',
        url: '/docs/mongocli/:version/configure',
        collapsible: true,
        items: [
          {
            label: 'Configuration File',
            contentSite: 'mongocli',
            url: '/docs/mongocli/:version/configure/configuration-file',
          },
          {
            label: 'Environment Variables',
            contentSite: 'mongocli',
            url: '/docs/mongocli/:version/configure/environment-variables',
          },
          {
            label: 'Enable Autocomplete',
            contentSite: 'mongocli',
            url: '/docs/mongocli/:version/configure/autocomplete',
          },
          {
            label: 'Customize Output',
            contentSite: 'mongocli',
            url: '/docs/mongocli/:version/configure/custom-output',
          },
        ],
      },
      {
        label: 'Quick Start',
        contentSite: 'mongocli',
        url: '/docs/mongocli/:version/quick-start',
        collapsible: true,
        items: [
          {
            label: 'Use Cloud Manager',
            contentSite: 'mongocli',
            url: '/docs/mongocli/:version/quick-start/cloudmgr',
          },
          {
            label: 'Use Ops Manager',
            contentSite: 'mongocli',
            url: '/docs/mongocli/:version/quick-start/opsmgr',
          },
        ],
      },
      {
        label: 'Commands',
        contentSite: 'mongocli',
        url: '/docs/mongocli/:version/command/mongocli',
        collapsible: true,
        items: mongocliCommands[0].items ?? [],
      },
      {
        label: 'Reference',
        contentSite: 'mongocli',
        url: '/docs/mongocli/:version/reference',
        collapsible: true,
        items: [
          {
            label: 'Cluster Configuration File',
            contentSite: 'mongocli',
            url: '/docs/mongocli/:version/reference/mms-cluster-settings-file',
          },
        ],
      },
      {
        label: 'Troubleshooting',
        contentSite: 'mongocli',
        url: '/docs/mongocli/:version/troubleshooting',
      },
      {
        label: 'Release Notes',
        contentSite: 'mongocli',
        url: '/docs/mongocli/:version/release-notes',
      },
      {
        label: 'Third-Party Licenses',
        contentSite: 'mongocli',
        url: '/docs/mongocli/:version/third-party-licenses',
      },
    ],
  },
];

export default tocData;
