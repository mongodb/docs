import type { TocItem } from '../types';
import mongosyncVersions from '../version-arrays/server-docs/mongosync';

const tocData: TocItem[] = [
  {
    label: 'MongoDB Mongosync',
    contentSite: 'mongosync',
    group: true,
    versionDropdown: true,
    items: [
      {
        label: 'Overview',
        contentSite: 'mongosync',
        url: '/docs/mongosync/:version',
      },
      {
        label: 'Quickstart',
        contentSite: 'mongosync',
        url: '/docs/mongosync/:version/quickstart',
      },
      {
        label: 'About mongosync',
        contentSite: 'mongosync',
        url: '/docs/mongosync/:version/about-mongosync',
      },
      {
        label: 'Install',
        contentSite: 'mongosync',
        collapsible: true,
        items: [
          {
            label: 'Linux',
            contentSite: 'mongosync',
            url: '/docs/mongosync/:version/installation/install-on-linux',
          },
          {
            label: 'macOS',
            contentSite: 'mongosync',
            url: '/docs/mongosync/:version/installation/install-on-macos',
          },
          {
            label: 'Verify Packages',
            contentSite: 'mongosync',
            collapsible: true,
            items: [
              {
                label: 'macOS',
                contentSite: 'mongosync',
                url: '/docs/mongosync/:version/installation/verify/macos',
              },
              {
                label: 'Linux',
                contentSite: 'mongosync',
                url: '/docs/mongosync/:version/installation/verify/gpg',
              },
              {
                label: 'RHEL',
                contentSite: 'mongosync',
                url: '/docs/mongosync/:version/installation/verify/rpm',
              },
            ],
          },
        ],
      },
      {
        label: 'Connect',
        contentSite: 'mongosync',
        collapsible: true,
        items: [
          {
            label: 'Atlas Clusters',
            contentSite: 'mongosync',
            url: '/docs/mongosync/:version/connecting/atlas-to-atlas',
          },
          {
            label: 'Self-Managed Clusters',
            contentSite: 'mongosync',
            url: '/docs/mongosync/:version/connecting/onprem-to-onprem',
          },
          {
            label: 'Self-Managed Cluster to Atlas',
            contentSite: 'mongosync',
            url: '/docs/mongosync/:version/connecting/onprem-to-atlas',
          },
        ],
      },
      {
        label: 'Cluster Topologies',
        contentSite: 'mongosync',
        url: '/docs/mongosync/:version/topologies',
        collapsible: true,
        items: [
          {
            label: 'Replica Set to Sharded Cluster',
            contentSite: 'mongosync',
            url: '/docs/mongosync/:version/topologies/rs-to-sharded',
          },
          {
            label: 'Two Sharded Clusters',
            contentSite: 'mongosync',
            url: '/docs/mongosync/:version/topologies/multiple-mongosyncs',
          },
        ],
      },
      {
        label: 'Reference',
        contentSite: 'mongosync',
        url: '/docs/mongosync/:version/reference',
        collapsible: true,
        items: [
          {
            label: 'mongosync',
            contentSite: 'mongosync',
            url: '/docs/mongosync/:version/reference/mongosync',
            collapsible: true,
            items: [
              {
                label: 'Behavior',
                contentSite: 'mongosync',
                url: '/docs/mongosync/:version/reference/mongosync/mongosync-behavior',
              },
            ],
          },
          {
            label: 'Configuration',
            contentSite: 'mongosync',
            url: '/docs/mongosync/:version/reference/configuration',
          },
          {
            label: 'mongosync API Endpoints',
            contentSite: 'mongosync',
            collapsible: true,
            items: [
              {
                label: 'start',
                contentSite: 'mongosync',
                url: '/docs/mongosync/:version/reference/api/start',
              },
              {
                label: 'progress',
                contentSite: 'mongosync',
                url: '/docs/mongosync/:version/reference/api/progress',
              },
              {
                label: 'pause',
                contentSite: 'mongosync',
                url: '/docs/mongosync/:version/reference/api/pause',
              },
              {
                label: 'resume',
                contentSite: 'mongosync',
                url: '/docs/mongosync/:version/reference/api/resume',
              },
              {
                label: 'commit',
                contentSite: 'mongosync',
                url: '/docs/mongosync/:version/reference/api/commit',
              },
              {
                label: 'reverse',
                contentSite: 'mongosync',
                url: '/docs/mongosync/:version/reference/api/reverse',
              },
            ],
          },
          {
            label: 'mongosync States',
            contentSite: 'mongosync',
            url: '/docs/mongosync/:version/reference/mongosync-states',
          },
          {
            label: 'Filtered Sync',
            contentSite: 'mongosync',
            url: '/docs/mongosync/:version/reference/collection-level-filtering',
            collapsible: true,
            items: [
              {
                label: 'Regular Expressions',
                contentSite: 'mongosync',
                url: '/docs/mongosync/:version/reference/collection-level-filtering/filter-regex',
              },
            ],
          },
          {
            label: 'Authentication Using Workload Identity Federation',
            contentSite: 'mongosync',
            url: '/docs/mongosync/:version/reference/authentication',
          },
          {
            label: 'oplog Sizing',
            contentSite: 'mongosync',
            url: '/docs/mongosync/:version/reference/oplog-sizing',
          },
          {
            label: 'Finalize Cutover Process',
            contentSite: 'mongosync',
            url: '/docs/mongosync/:version/reference/cutover-process',
            collapsible: true,
            items: [
              {
                label: 'Migrate Persistent Query Settings',
                contentSite: 'mongosync',
                url: '/docs/mongosync/:version/reference/c2c-migrate-pqs',
              },
            ],
          },
          {
            label: "Restart Mongosync",
            contentSite: "mongosync",
            url: "/docs/mongosync/:version/reference/restart-mongosync",
          },
          {
            label: "Reverse Sync Direction",
            contentSite: "mongosync",
            url: "/docs/mongosync/:version/reverse-sync",
          },
          {
            label: 'Limitations',
            contentSite: 'mongosync',
            url: '/docs/mongosync/:version/reference/limitations',
          },
          {
            label: 'Logging',
            contentSite: 'mongosync',
            url: '/docs/mongosync/:version/reference/logging',
          },
          {
            label: 'Metrics',
            contentSite: 'mongosync',
            url: '/docs/mongosync/:version/reference/metrics/',
            versions: { excludes: mongosyncVersions.before('v1.16') },
          },
          {
            label: 'User Permissions',
            contentSite: 'mongosync',
            url: '/docs/mongosync/:version/reference/permissions',
          },
          {
            label: 'Telemetry',
            contentSite: 'mongosync',
            url: '/docs/mongosync/:version/reference/telemetry',
          },
          {
            label: 'Data Transfer Verification',
            contentSite: 'mongosync',
            url: '/docs/mongosync/:version/reference/verification',
            collapsible: true,
            items: [
              {
                label: 'Use Embedded Verifier',
                contentSite: 'mongosync',
                url: '/docs/mongosync/:version/reference/verification/embedded',
              },
              {
                label: 'Use Document Counts',
                contentSite: 'mongosync',
                url: '/docs/mongosync/:version/reference/verification/count',
              },
              {
                label: 'Use Hash Comparison',
                contentSite: 'mongosync',
                url: '/docs/mongosync/:version/reference/verification/hash',
              },
              {
                label: 'Use Migration Verifier',
                contentSite: 'mongosync',
                url: '/docs/mongosync/:version/reference/verification/verifier',
              },
              {
                label: 'Verifying Data with Custom Scripts',
                contentSite: 'mongosync',
                url: '/docs/mongosync/:version/reference/verification/custom-manual',
              },
            ],
          },
          {
            label: 'Versioning',
            contentSite: 'mongosync',
            url: '/docs/mongosync/:version/reference/versioning',
          },
          {
            label: 'Version Compatibility',
            contentSite: 'mongosync',
            url: '/docs/mongosync/:version/reference/supported-server-version',
          },
        ],
      },
      {
        label: 'Release Notes',
        contentSite: 'mongosync',
        url: '/docs/mongosync/:version/release-notes',
        collapsible: true,
        items: [
          {
            label: '1.17',
            contentSite: 'mongosync',
            url: '/docs/mongosync/:version/release-notes/1.17',
            versions: { excludes: mongosyncVersions.before('v1.17') },
          },
          {
            label: '1.16',
            contentSite: 'mongosync',
            url: '/docs/mongosync/:version/release-notes/1.16',
            versions: { excludes: mongosyncVersions.before('v1.16') },
          },
          {
            label: '1.15',
            contentSite: 'mongosync',
            url: '/docs/mongosync/:version/release-notes/1.15',
          },
          {
            label: '1.14',
            contentSite: 'mongosync',
            url: '/docs/mongosync/:version/release-notes/1.14',
          },
          {
            label: '1.13',
            contentSite: 'mongosync',
            url: '/docs/mongosync/:version/release-notes/1.13',
          },
          {
            label: '1.12',
            contentSite: 'mongosync',
            url: '/docs/mongosync/:version/release-notes/1.12',
          },
          {
            label: '1.11',
            contentSite: 'mongosync',
            url: '/docs/mongosync/:version/release-notes/1.11',
          },
          {
            label: '1.10',
            contentSite: 'mongosync',
            url: '/docs/mongosync/:version/release-notes/1.10',
          },
          {
            label: '1.9',
            contentSite: 'mongosync',
            url: '/docs/mongosync/:version/release-notes/1.9',
          },
          {
            label: '1.8',
            contentSite: 'mongosync',
            url: '/docs/mongosync/:version/release-notes/1.8',
          },
          {
            label: '1.7',
            contentSite: 'mongosync',
            url: '/docs/mongosync/:version/release-notes/1.7',
          },
          {
            label: '1.6',
            contentSite: 'mongosync',
            url: '/docs/mongosync/:version/release-notes/1.6',
          },
          {
            label: '1.5',
            contentSite: 'mongosync',
            url: '/docs/mongosync/:version/release-notes/1.5',
          },
          {
            label: '1.4',
            contentSite: 'mongosync',
            url: '/docs/mongosync/:version/release-notes/1.4',
          },
          {
            label: '1.3',
            contentSite: 'mongosync',
            url: '/docs/mongosync/:version/release-notes/1.3',
          },
          {
            label: '1.2',
            contentSite: 'mongosync',
            url: '/docs/mongosync/:version/release-notes/1.2',
          },
          {
            label: '1.1',
            contentSite: 'mongosync',
            url: '/docs/mongosync/:version/release-notes/1.1',
          },
          {
            label: '1.0',
            contentSite: 'mongosync',
            url: '/docs/mongosync/:version/release-notes/1.0',
          },
          {
            label: '0.9',
            contentSite: 'mongosync',
            url: '/docs/mongosync/:version/release-notes/0.9',
          },
        ],
      },
      {
        label: 'FAQ',
        contentSite: 'mongosync',
        url: '/docs/mongosync/:version/faq',
      },
    ],
  },
];

export default tocData;
