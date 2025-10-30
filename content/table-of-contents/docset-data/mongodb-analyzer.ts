import type { TocItem } from '../types';

const tocData: TocItem[] = [
  {
    label: 'C# Analyzer',
    contentSite: 'visual-studio-extension',
    group: true,
    versionDropdown: true,
    items: [
      {
        label: 'Overview',
        contentSite: 'visual-studio-extension',
        url: '/docs/mongodb-analyzer/:version/',
      },
      {
        label: 'Installation',
        contentSite: 'visual-studio-extension',
        url: '/docs/mongodb-analyzer/:version/install',
      },
      {
        label: 'Analyze Your Code',
        contentSite: 'visual-studio-extension',
        url: '/docs/mongodb-analyzer/:version/analyze-code',
        collapsible: true,
        items: [
          {
            label: 'Builders Expressions',
            contentSite: 'visual-studio-extension',
            url: '/docs/mongodb-analyzer/:version/code-type/builders',
          },
          {
            label: 'LINQ Expressions',
            contentSite: 'visual-studio-extension',
            url: '/docs/mongodb-analyzer/:version/code-type/linq',
          },
          {
            label: 'POCOs',
            contentSite: 'visual-studio-extension',
            url: '/docs/mongodb-analyzer/:version/code-type/pocos',
          },
        ],
      },
      {
        label: 'Rules & Message Content',
        contentSite: 'visual-studio-extension',
        url: '/docs/mongodb-analyzer/:version/rules',
      },
      {
        label: 'Configuration',
        contentSite: 'visual-studio-extension',
        url: '/docs/mongodb-analyzer/:version/configuration',
      },
      {
        label: 'Known Issues',
        contentSite: 'visual-studio-extension',
        url: '/docs/mongodb-analyzer/:version/known-issues',
      },
      {
        label: 'FAQ',
        contentSite: 'visual-studio-extension',
        url: '/docs/mongodb-analyzer/:version/faq',
      },
      {
        label: "What's New",
        contentSite: 'visual-studio-extension',
        url: '/docs/mongodb-analyzer/:version/whats-new',
      },
      {
        label: 'Issues & Help',
        contentSite: 'visual-studio-extension',
        url: '/docs/mongodb-analyzer/:version/issues-and-help',
      },
      {
        label: 'Source Code',
        isExternal: true,
        url: 'https://github.com/mongodb/mongo-csharp-analyzer',
      },
    ],
  },
];

export default tocData;
