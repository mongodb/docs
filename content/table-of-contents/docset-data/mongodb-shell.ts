import type { TocItem } from '../types';

const tocData: TocItem[] = [
  {
    label: 'mongosh',
    contentSite: 'mongodb-shell',
    url: '/docs/mongodb-shell/',
    group: true,
    items: [
      {
        label: 'Install',
        contentSite: 'mongodb-shell',
        url: '/docs/mongodb-shell/install',
        collapsible: true,
        items: [
          {
            label: 'Upgrade',
            contentSite: 'mongodb-shell',
            url: '/docs/mongodb-shell/install/upgrade',
          },
          {
            label: 'Verify Package Integrity',
            contentSite: 'mongodb-shell',
            url: '/docs/mongodb-shell/install/verify-signatures',
            collapsible: true,
            items: [
              {
                label: 'Use Disk Image Verification (macOS)',
                contentSite: 'mongodb-shell',
                url: '/docs/mongodb-shell/install/verify-signatures/disk-images',
              },
              {
                label: 'Use GPG (Linux & macoS)',
                contentSite: 'mongodb-shell',
                url: '/docs/mongodb-shell/install/verify-signatures/gpg',
              },
              {
                label: 'Verify RPM Packages (RHEL)',
                contentSite: 'mongodb-shell',
                url: '/docs/mongodb-shell/install/verify-signatures/rpm',
              },
              {
                label: 'Verify Windows Packages',
                contentSite: 'mongodb-shell',
                url: '/docs/mongodb-shell/install/verify-signatures/windows',
              },
            ],
          },
        ],
      },
      {
        label: 'Connect',
        contentSite: 'mongodb-shell',
        url: '/docs/mongodb-shell/connect',
      },
      {
        label: 'Configure',
        contentSite: 'mongodb-shell',
        url: '/docs/mongodb-shell/configure-mongosh',
        collapsible: true,
        items: [
          {
            label: 'Use an Editor',
            contentSite: 'mongodb-shell',
            url: '/docs/mongodb-shell/reference/editor-mode',
          },
          {
            label: 'Configure Settings',
            contentSite: 'mongodb-shell',
            url: '/docs/mongodb-shell/reference/configure-shell-settings',
            collapsible: true,
            items: [
              {
                label: 'Use the API',
                contentSite: 'mongodb-shell',
                url: '/docs/mongodb-shell/reference/configure-shell-settings-api',
              },
              {
                label: 'Use a Configuration File',
                contentSite: 'mongodb-shell',
                url: '/docs/mongodb-shell/reference/configure-shell-settings-global',
              },
            ],
          },
          {
            label: 'Customize Prompt',
            contentSite: 'mongodb-shell',
            url: '/docs/mongodb-shell/reference/customize-prompt',
          },
          {
            label: 'Configure Telemetry Options',
            contentSite: 'mongodb-shell',
            url: '/docs/mongodb-shell/telemetry',
          },
        ],
      },
      {
        label: 'Run Commands',
        contentSite: 'mongodb-shell',
        url: '/docs/mongodb-shell/run-commands',
      },
      {
        label: 'Perform CRUD Operations',
        contentSite: 'mongodb-shell',
        url: '/docs/mongodb-shell/crud',
        collapsible: true,
        items: [
          {
            label: 'Insert',
            contentSite: 'mongodb-shell',
            url: '/docs/mongodb-shell/crud/insert',
          },
          {
            label: 'Read',
            contentSite: 'mongodb-shell',
            url: '/docs/mongodb-shell/crud/read',
          },
          {
            label: 'Update',
            contentSite: 'mongodb-shell',
            url: '/docs/mongodb-shell/crud/update',
          },
          {
            label: 'Delete',
            contentSite: 'mongodb-shell',
            url: '/docs/mongodb-shell/crud/delete',
          },
        ],
      },
      {
        label: 'Run Aggregation Pipelines',
        contentSite: 'mongodb-shell',
        url: '/docs/mongodb-shell/run-agg-pipelines',
      },
      {
        label: 'Client-Side Field Level Encryption',
        contentSite: 'mongodb-shell',
        url: '/docs/mongodb-shell/field-level-encryption',
      },
      {
        label: 'Write Scripts',
        contentSite: 'mongodb-shell',
        url: '/docs/mongodb-shell/write-scripts',
        collapsible: true,
        items: [
          {
            label: 'Include Files & Modules',
            contentSite: 'mongodb-shell',
            url: '/docs/mongodb-shell/write-scripts/require-external-modules',
          },
          {
            label: 'require() versus load()',
            contentSite: 'mongodb-shell',
            url: '/docs/mongodb-shell/write-scripts/require-load-differences',
          },
          {
            label: 'Environment Variables',
            contentSite: 'mongodb-shell',
            url: '/docs/mongodb-shell/write-scripts/env-variables',
          },
          {
            label: 'Code Scoping',
            contentSite: 'mongodb-shell',
            url: '/docs/mongodb-shell/write-scripts/scoping',
          },
          {
            label: 'Considerations',
            contentSite: 'mongodb-shell',
            url: '/docs/mongodb-shell/write-scripts/considerations',
          },
        ],
      },
      {
        label: 'Snippets',
        contentSite: 'mongodb-shell',
        url: '/docs/mongodb-shell/snippets',
        collapsible: true,
        items: [
          {
            label: 'Use in the Console',
            contentSite: 'mongodb-shell',
            url: '/docs/mongodb-shell/snippets/working-with-snippets',
          },
          {
            label: 'Create & Share',
            contentSite: 'mongodb-shell',
            url: '/docs/mongodb-shell/snippets/packages',
          },
          {
            label: 'Registries',
            contentSite: 'mongodb-shell',
            url: '/docs/mongodb-shell/snippets/registries-config',
          },
          {
            label: 'Troubleshoot',
            contentSite: 'mongodb-shell',
            url: '/docs/mongodb-shell/snippets/troubleshooting',
          },
          {
            label: 'Reference',
            contentSite: 'mongodb-shell',
            url: '/docs/mongodb-shell/snippets/reference',
            collapsible: true,
            items: [
              {
                label: 'Commands',
                contentSite: 'mongodb-shell',
                url: '/docs/mongodb-shell/snippets/commands',
              },
              {
                label: 'Configuration',
                contentSite: 'mongodb-shell',
                url: '/docs/mongodb-shell/snippets/configuration',
              },
              {
                label: 'Error Handlers',
                contentSite: 'mongodb-shell',
                url: '/docs/mongodb-shell/snippets/error-handlers',
              },
              {
                label: 'Create Registry Index File',
                contentSite: 'mongodb-shell',
                url: '/docs/mongodb-shell/snippets/registry-index',
              },
            ],
          },
        ],
      },
      {
        label: 'Reference',
        contentSite: 'mongodb-shell',
        collapsible: true,
        items: [
          {
            label: 'Cheat Sheet',
            contentSite: 'docs',
            url: '/docs/mongodb-shell/reference/cheatsheet',
          },
          {
            label: 'Compatibility Changes',
            contentSite: 'mongodb-shell',
            url: '/docs/mongodb-shell/reference/compatibility',
          },
          {
            label: 'Data Types',
            contentSite: 'mongodb-shell',
            url: '/docs/mongodb-shell/reference/data-types',
          },
          {
            label: 'Methods',
            contentSite: 'mongodb-shell',
            url: '/docs/mongodb-shell/reference/methods',
          },
          {
            label: 'EJSON',
            contentSite: 'mongodb-shell',
            url: '/docs/mongodb-shell/reference/ejson',
            collapsible: true,
            items: [
              {
                label: 'deserialize()',
                contentSite: 'mongodb-shell',
                url: '/docs/mongodb-shell/reference/ejson/deserialize',
              },
              {
                label: 'parse()',
                contentSite: 'mongodb-shell',
                url: '/docs/mongodb-shell/reference/ejson/parse',
              },
              {
                label: 'serialize()',
                contentSite: 'mongodb-shell',
                url: '/docs/mongodb-shell/reference/ejson/serialize',
              },
              {
                label: 'stringify()',
                contentSite: 'mongodb-shell',
                url: '/docs/mongodb-shell/reference/ejson/stringify',
              },
            ],
          },
          {
            label: '.mongoshrc Configuration File',
            contentSite: 'mongodb-shell',
            url: '/docs/mongodb-shell/mongoshrc',
          },
          {
            label: 'Options',
            contentSite: 'mongodb-shell',
            url: '/docs/mongodb-shell/reference/options',
          },
          {
            label: 'Logs',
            contentSite: 'mongodb-shell',
            url: '/docs/mongodb-shell/logs',
            collapsible: true,
            items: [
              {
                label: 'View Logs',
                contentSite: 'mongodb-shell',
                url: '/docs/mongodb-shell/logs/view',
              },
              {
                label: 'View Command History',
                contentSite: 'mongodb-shell',
                url: '/docs/mongodb-shell/logs/command-history',
              },
              {
                label: 'Specify Log Location',
                contentSite: 'mongodb-shell',
                url: '/docs/mongodb-shell/logs/location',
              },
              {
                label: 'Write Custom Log Entries',
                contentSite: 'mongodb-shell',
                url: '/docs/mongodb-shell/logs/custom-entries',
              },
              {
                label: 'Retention',
                contentSite: 'mongodb-shell',
                url: '/docs/mongodb-shell/logs/retention',
                collapsible: true,
                items: [
                  {
                    label: 'Duration',
                    contentSite: 'mongodb-shell',
                    url: '/docs/mongodb-shell/logs/retention/duration',
                  },
                  {
                    label: 'Storage Size',
                    contentSite: 'mongodb-shell',
                    url: '/docs/mongodb-shell/logs/retention/size',
                  },
                  {
                    label: 'File Count',
                    contentSite: 'mongodb-shell',
                    url: '/docs/mongodb-shell/logs/retention/file-count',
                  },
                ],
              },
              {
                label: 'Enable Log Compression',
                contentSite: 'mongodb-shell',
                url: '/docs/mongodb-shell/logs/compression',
              },
              {
                label: 'Disable Logging',
                contentSite: 'mongodb-shell',
                url: '/docs/mongodb-shell/logs/disable',
              },
            ],
          },
        ],
      },
      {
        label: 'Release Notes',
        contentSite: 'mongodb-shell',
        url: '/docs/mongodb-shell/changelog',
      },
      {
        label: 'Help',
        contentSite: 'mongodb-shell',
        url: '/docs/mongodb-shell/reference/access-mdb-shell-help',
      },
    ],
  },
];

export default tocData;
