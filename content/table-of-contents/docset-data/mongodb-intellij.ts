import type { TocItem } from '../types';

const tocData: TocItem[] = [
  {
    label: 'MongoDB for IntelliJ Plugin',
    contentSite: 'intellij',
    group: true,
    items: [
      {
        label: 'Overview',
        contentSite: 'intellij',
        url: '/docs/mongodb-intellij/',
      },
      {
        label: 'Install',
        contentSite: 'intellij',
        url: '/docs/mongodb-intellij/install',
      },
      {
        label: 'Connect',
        contentSite: 'intellij',
        url: '/docs/mongodb-intellij/connect',
      },
      {
        label: 'Autocomplete',
        contentSite: 'intellij',
        url: '/docs/mongodb-intellij/autocomplete',
      },
      {
        label: 'Database Reference Validation',
        contentSite: 'intellij',
        url: '/docs/mongodb-intellij/db-reference-validation',
      },
      {
        label: 'Type Validation',
        contentSite: 'intellij',
        url: '/docs/mongodb-intellij/type-validation',
      },
      {
        label: 'Index Performance Warnings',
        contentSite: 'intellij',
        url: '/docs/mongodb-intellij/index-warning',
      },
      {
        label: 'Disable Warnings',
        contentSite: 'intellij',
        url: '/docs/mongodb-intellij/disable-warnings',
      },
      {
        label: 'Run Java Queries',
        contentSite: 'intellij',
        url: '/docs/mongodb-intellij/run-java-queries',
        collapsible: true,
        items: [
          {
            label: 'Java Driver Methods',
            contentSite: 'intellij',
            url: '/docs/mongodb-intellij/java-driver-methods-introspection',
          },
          {
            label: 'Spring Criteria MongoDB Methods',
            contentSite: 'intellij',
            url: '/docs/mongodb-intellij/spring-criteria-methods-introspection',
          },
        ],
      },
      {
        label: 'Release Notes',
        isExternal: true,
        url: 'https://github.com/mongodb-js/intellij/blob/main/CHANGELOG.md',
      },
      {
        label: 'Submit Feedback',
        contentSite: 'intellij',
        url: '/docs/mongodb-intellij/submit-feedback',
        collapsible: true,
        items: [
          {
            label: 'Logs',
            contentSite: 'intellij',
            url: '/docs/mongodb-intellij/logs',
          },
        ],
      },
    ],
  },
];

export default tocData;
