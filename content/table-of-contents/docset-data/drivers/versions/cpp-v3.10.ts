import { inheritContentSite, type TocItem } from '../../../types';

const tocData: TocItem[] = inheritContentSite('cpp-driver', [
  {
    label: 'Overview',
    url: '/docs/languages/cpp/cpp-driver/:version/',
  },
  {
    label: 'C++17 Polyfill',
    url: '/docs/languages/cpp/cpp-driver/:version/polyfill-selection',
  },
  {
    label: 'Installation',
    url: '/docs/languages/cpp/cpp-driver/:version/installation',
    collapsible: true,
    items: [
      {
        label: 'Windows',
        url: '/docs/languages/cpp/cpp-driver/:version/installation/windows',
      },
      {
        label: 'MacOS',
        url: '/docs/languages/cpp/cpp-driver/:version/installation/macos',
      },
      {
        label: 'Linux',
        url: '/docs/languages/cpp/cpp-driver/:version/installation/linux',
      },
      {
        label: 'Advanced',
        url: '/docs/languages/cpp/cpp-driver/:version/installation/advanced',
      },
    ],
  },
  {
    label: 'Configuration',
    url: '/docs/languages/cpp/cpp-driver/:version/configuration',
  },
  {
    label: 'Client-Side Encryption',
    url: '/docs/languages/cpp/cpp-driver/:version/client-side-encryption',
  },
  {
    label: 'Tutorial',
    url: '/docs/languages/cpp/cpp-driver/:version/tutorial',
  },
  {
    label: 'Thread Safety',
    url: '/docs/languages/cpp/cpp-driver/:version/thread-safety',
  },
  {
    label: 'Connection Pools',
    url: '/docs/languages/cpp/cpp-driver/:version/connection-pools',
  },
  {
    label: 'BSON',
    url: '/docs/languages/cpp/cpp-driver/:version/working-with-bson',
  },
  {
    label: 'API & ABI Versioning',
    url: '/docs/languages/cpp/cpp-driver/:version/api-abi-versioning',
    collapsible: true,
    items: [
      {
        label: 'API Versioning',
        url: '/docs/languages/cpp/cpp-driver/:version/api-abi-versioning/api-versioning',
      },
      {
        label: 'ABI Versioning',
        url: '/docs/languages/cpp/cpp-driver/:version/api-abi-versioning/abi-versioning',
      },
    ],
  },
  {
    label: 'Reporting Bugs',
    contentSite: 'cpp-driver',
    url: '/docs/languages/cpp/cpp-driver/:version/reporting-bugs',
  },
  {
    label: 'Testing',
    url: '/docs/languages/cpp/cpp-driver/:version/testing',
  },
  {
    label: 'Contributing',
    url: '/docs/languages/cpp/cpp-driver/:version/contributing',
  },
  {
    label: 'Getting Help',
    url: '/docs/languages/cpp/cpp-driver/:version/getting-help',
  },
  {
    label: 'API Documentation',
    url: 'https://mongocxx.org/api/current/',
  },
  {
    label: 'Driver Source',
    url: 'https://github.com/mongodb/mongo-cxx-driver',
  },
]);

export default tocData;
