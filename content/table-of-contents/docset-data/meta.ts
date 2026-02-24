import type { TocItem } from '../types';

const tocData: TocItem[] = [
  {
    label: 'MongoDB Meta Documentation',
    contentSite: 'meta',
    url: '/docs/meta/',
    collapsible: true,
    items: [
      {
        label: 'MongoDB Documentation Style Guide',
        contentSite: 'meta',
        url: '/docs/meta/style-guide',
        collapsible: true,
        items: [
          {
            label: 'Quickstart',
            contentSite: 'meta',
            url: '/docs/meta/style-guide/quickstart',
          },
          {
            label: 'Writing Guidelines',
            contentSite: 'meta',
            url: '/docs/meta/style-guide/writing/index',
            collapsible: true,
            items: [
              {
                label: 'Use Active Voice',
                contentSite: 'meta',
                url: '/docs/meta/style-guide/writing/use-active-voice',
              },
              {
                label: 'Use Present Tense',
                contentSite: 'meta',
                url: '/docs/meta/style-guide/writing/use-present-tense',
              },
              {
                label: 'Use Second Person and Imperative Mood',
                contentSite: 'meta',
                url: '/docs/meta/style-guide/writing/write-to-the-user',
              },
              {
                label: 'Write Clear and Concise Sentences and Paragraphs',
                contentSite: 'meta',
                url: '/docs/meta/style-guide/writing/write-clear-concise-sentences-paragraphs',
              },
              {
                label: 'Use Effective Verbs',
                contentSite: 'meta',
                url: '/docs/meta/style-guide/writing/use-effective-verbs',
              },
              {
                label: 'Clarify Gerunds and Participles',
                contentSite: 'meta',
                url: '/docs/meta/style-guide/writing/clarify-gerunds-participles',
              },
              {
                label: 'Clarify Ambiguous Modifiers',
                contentSite: 'meta',
                url: '/docs/meta/style-guide/writing/clarify-modifiers',
              },
              {
                label: 'Use , , and  Correctly',
                contentSite: 'meta',
                url: '/docs/meta/style-guide/writing/use-that-which-correctly',
              },
              {
                label: 'Clarify Pronouns and Antecedents',
                contentSite: 'meta',
                url: '/docs/meta/style-guide/writing/use-pronouns-carefully',
              },
              {
                label: 'Use Gender-Neutral Pronouns',
                contentSite: 'meta',
                url: '/docs/meta/style-guide/writing/use-gender-neutral-pronouns',
              },
              {
                label: 'Use Positive Statements',
                contentSite: 'meta',
                url: '/docs/meta/style-guide/writing/use-positive-statements',
              },
              {
                label: 'Use Correct Punctuation',
                contentSite: 'meta',
                url: '/docs/meta/style-guide/writing/use-correct-punctuation',
              },
              {
                label: 'Use Interjections with Care',
                contentSite: 'meta',
                url: '/docs/meta/style-guide/writing/use-interjections-with-care',
              },
              {
                label: 'Write for Accessibility',
                contentSite: 'meta',
                url: '/docs/meta/style-guide/writing/write-for-accessibility',
              },
              {
                label: 'Write for a Global Audience',
                contentSite: 'meta',
                url: '/docs/meta/style-guide/terminology/terms-for-global-audience',
              },
              {
                label: 'Best Practices for Writing for Robots',
                contentSite: 'meta',
                url: '/docs/meta/style-guide/writing/write-for-robots',
              }
            ],
          },
          {
            label: 'Style Guidelines',
            contentSite: 'meta',
            url: '/docs/meta/style-guide/style/index',
            collapsible: true,
            items: [
              {
                label: 'Abbreviations',
                contentSite: 'meta',
                url: '/docs/meta/style-guide/style/abbreviations',
              },
              {
                label: 'Collapsible Sections',
                contentSite: 'meta',
                url: '/docs/meta/style-guide/style/collapsible-sections',
              },
              {
                label: 'Callouts and Admonitions',
                contentSite: 'meta',
                url: '/docs/meta/style-guide/style/callouts',
              },
              {
                label: 'Capitalization',
                contentSite: 'meta',
                url: '/docs/meta/style-guide/style/capitalization',
              },
              {
                label: 'Citations',
                contentSite: 'meta',
                url: '/docs/meta/style-guide/style/citations',
              },
              {
                label: 'Code Examples',
                contentSite: 'meta',
                url: '/docs/meta/style-guide/style/code-examples',
              },
              {
                label: 'Contractions',
                contentSite: 'meta',
                url: '/docs/meta/style-guide/style/contractions',
              },
              {
                label: 'Copyrights and Trademarks',
                contentSite: 'meta',
                url: '/docs/meta/style-guide/style/copyrights',
              },
              {
                label: 'Dates',
                contentSite: 'meta',
                url: '/docs/meta/style-guide/style/dates',
              },
              {
                label: 'Email Addresses',
                contentSite: 'meta',
                url: '/docs/meta/style-guide/style/email-addresses',
              },
              {
                label: 'File Types',
                contentSite: 'meta',
                url: '/docs/meta/style-guide/style/file-types',
              },
              {
                label: 'Glossaries',
                contentSite: 'meta',
                url: '/docs/meta/style-guide/style/glossaries',
              },
              {
                label: 'IP Addresses',
                contentSite: 'meta',
                url: '/docs/meta/style-guide/style/ip-addresses',
              },
              {
                label: 'Keyboard Keys',
                contentSite: 'meta',
                url: '/docs/meta/style-guide/style/keyboard-keys',
              },
              {
                label: 'Method and Language Selectors',
                contentSite: 'meta',
                url: '/docs/meta/style-guide/style/language-selectors',
              },
              {
                label: 'Links and Cross-References',
                contentSite: 'meta',
                url: '/docs/meta/style-guide/style/links-and-cross-references',
              },
              {
                label: 'Lists',
                contentSite: 'meta',
                url: '/docs/meta/style-guide/style/lists',
              },
              {
                label: 'Messages',
                contentSite: 'meta',
                url: '/docs/meta/style-guide/style/messages',
              },
              {
                label: 'Names',
                contentSite: 'meta',
                url: '/docs/meta/style-guide/style/names',
              },
              {
                label: 'Next Buttons',
                contentSite: 'meta',
                url: '/docs/meta/style-guide/style/next-buttons',
              },
              {
                label: 'Numbers',
                contentSite: 'meta',
                url: '/docs/meta/style-guide/style/numbers',
              },
              {
                label: 'Parameters',
                contentSite: 'meta',
                url: '/docs/meta/style-guide/style/parameters',
              },
              {
                label: 'Placeholders for APIs',
                contentSite: 'meta',
                url: '/docs/meta/style-guide/style/cloud-account-info',
              },
              {
                label: 'Placeholder or Variable Text',
                contentSite: 'meta',
                url: '/docs/meta/style-guide/style/placeholder-variable-text',
              },
              {
                label: 'Plurals',
                contentSite: 'meta',
                url: '/docs/meta/style-guide/style/plurals',
              },
              {
                label: 'Prepositions',
                contentSite: 'meta',
                url: '/docs/meta/style-guide/style/prepositions',
              },
              {
                label: 'Product Names',
                contentSite: 'meta',
                url: '/docs/meta/style-guide/style/product-names-version-numbers',
              },
              {
                label: 'Punctuation',
                contentSite: 'meta',
                url: '/docs/meta/style-guide/style/punctuation',
              },
              {
                label: 'Symbols',
                contentSite: 'meta',
                url: '/docs/meta/style-guide/style/symbols',
              },
              {
                label: 'Tables',
                contentSite: 'meta',
                url: '/docs/meta/style-guide/style/tables',
              },
              {
                label: 'Table of Contents Labels',
                contentSite: 'meta',
                url: '/docs/meta/style-guide/style/toc-labels',
              },
              {
                label: 'Tasks',
                contentSite: 'meta',
                url: '/docs/meta/style-guide/style/tasks',
              },
              {
                label: 'Telephone Numbers',
                contentSite: 'meta',
                url: '/docs/meta/style-guide/style/telephone-numbers',
              },
              {
                label: 'Text Formatting',
                contentSite: 'meta',
                url: '/docs/meta/style-guide/style/text-formatting',
              },
              {
                label: 'Time',
                contentSite: 'meta',
                url: '/docs/meta/style-guide/style/time',
              },
              {
                label: 'Titles and Headings',
                contentSite: 'meta',
                url: '/docs/meta/style-guide/style/titles-and-headings',
              },
              {
                label: 'URLs and Domain Names',
                contentSite: 'meta',
                url: '/docs/meta/style-guide/style/urls',
              },
              {
                label: 'Version Numbers',
                contentSite: 'meta',
                url: '/docs/meta/style-guide/style/version',
              },
              {
                label: 'Voice and Tone',
                contentSite: 'meta',
                url: '/docs/meta/style-guide/style/voice-and-tone',
              },
            ],
          },
          {
            label: 'Markup Guidelines',
            contentSite: 'meta',
            url: '/docs/meta/style-guide/markup-guidelines',
            collapsible: true,
            items: [
              {
                label: 'Directives',
                contentSite: 'meta',
                url: '/docs/meta/style-guide/markup/directives',
                collapsible: true,
                items: [
                  {
                    label: 'Page Metadata Directives',
                    contentSite: 'meta',
                    url: '/docs/meta/style-guide/markup/directives/metadata',
                  },
                  {
                    label: 'Shared Include',
                    contentSite: 'meta',
                    url: '/docs/meta/style-guide/markup/directives/sharedinclude',
                  },
                  {
                    label: 'Tabbed Content',
                    contentSite: 'meta',
                    url: '/docs/meta/style-guide/markup/directives/tabs',
                  },
                  {
                    label: 'Table Directives',
                    contentSite: 'meta',
                    url: '/docs/meta/style-guide/markup/directives/tables',
                  },
                ],
              },
              {
                label: 'Headings and Sections',
                contentSite: 'meta',
                url: '/docs/meta/style-guide/markup/headings',
              },
              {
                label: 'Inline Markup',
                contentSite: 'meta',
                url: '/docs/meta/style-guide/markup/inline',
              },
            ],
          },
          {
            label: 'Terminology Guidelines',
            contentSite: 'meta',
            url: '/docs/meta/style-guide/terminology/index',
            collapsible: true,
            items: [
              {
                label: 'General Terminology Guidelines',
                contentSite: 'meta',
                url: '/docs/meta/style-guide/terminology/general-term-guidelines/index',
                collapsible: true,
                items: [
                  {
                    label: 'Use Consistent Terminology',
                    contentSite: 'meta',
                    url: '/docs/meta/style-guide/terminology/general-term-guidelines/use-consistent-terms',
                  },
                  {
                    label: 'Use Short, Familiar Words and Phrases',
                    contentSite: 'meta',
                    url: '/docs/meta/style-guide/terminology/general-term-guidelines/use-short-words',
                  },
                  {
                    label:
                      'Use Consistent References to Time, Space, and Versions',
                    contentSite: 'meta',
                    url: '/docs/meta/style-guide/terminology/general-term-guidelines/use-consistent-time-references',
                  },
                  {
                    label: 'Avoid Obscure Non-English Words and Abbreviations',
                    contentSite: 'meta',
                    url: '/docs/meta/style-guide/terminology/general-term-guidelines/avoid-obscure-words',
                  },
                ],
              },
              {
                label: 'Alphabetical List of Terms',
                contentSite: 'meta',
                url: '/docs/meta/style-guide/terminology/alphabetical-terms',
              },
              {
                label: 'Concise Terms',
                contentSite: 'meta',
                url: '/docs/meta/style-guide/terminology/concise-terms',
              },
            ],
          },
          {
            label: 'Screenshot and Diagram Guidelines',
            contentSite: 'meta',
            url: '/docs/meta/style-guide/screenshots/index',
            collapsible: true,
            items: [
              {
                label: 'Screenshot Guidelines and Process',
                contentSite: 'meta',
                url: '/docs/meta/style-guide/screenshots/screenshot-guidelines',
              },
              {
                label: 'Diagram Guidelines',
                contentSite: 'meta',
                url: '/docs/meta/style-guide/screenshots/diagram-guidelines',
              },
            ],
          },
          {
            label: 'Error Message Guidelines',
            contentSite: 'meta',
            url: '/docs/meta/style-guide/error-message-guidelines',
          },
          {
            label: 'Nested Components Guidelines',
            contentSite: 'meta',
            url: '/docs/meta/style-guide/nested-components',
          },
          {
            label: 'Release Notes Guidelines',
            contentSite: 'meta',
            url: '/docs/meta/style-guide/release-notes-guidelines',
          },
          {
            label: 'Information Types',
            contentSite: 'meta',
            url: '/docs/meta/style-guide/information-types/index',
            collapsible: true,
            items: [
              {
                label: 'Information Type Prototypes',
                contentSite: 'meta',
                url: '/docs/meta/style-guide/information-types/prototypes',
                collapsible: true,
                items: [
                  {
                    label: 'Concept Page Prototype',
                    contentSite: 'meta',
                    url: '/docs/meta/style-guide/information-types/prototypes/concept',
                  },
                  {
                    label: 'Reference Page Prototype',
                    contentSite: 'meta',
                    url: '/docs/meta/style-guide/information-types/prototypes/reference',
                    collapsible: true,
                    items: [
                      {
                        label: 'Server Parameters Guidelines',
                        contentSite: 'meta',
                        url: '/docs/meta/style-guide/information-types/prototypes/reference/server-params-style',
                      },
                    ],
                  },
                  {
                    label: 'Task Page Prototype',
                    contentSite: 'meta',
                    url: '/docs/meta/style-guide/information-types/prototypes/task',
                  },
                ],
              },
            ],
          },
          {
            label: 'Code Example Guidelines',
            contentSite: 'meta',
            url: '/docs/meta/style-guide/code-example-guidelines',
          },
          {
            label: 'Findability (SEO and LLM) Guidelines',
            contentSite: 'meta',
            url: '/docs/meta/style-guide/seo-guidelines',
          },
          {
            label: 'MongoDB Style Guide Revision History',
            contentSite: 'meta',
            url: '/docs/meta/style-guide/revision-history',
          },
        ],
      },
      {
        label: 'Tutorials',
        contentSite: 'meta',
        url: '/docs/meta/tutorials',
        collapsible: true,
        items: [
          {
            label: 'Adding Images',
            contentSite: 'meta',
            url: '/docs/meta/images-guide',
          },
          {
            label: 'Version Bumping',
            contentSite: 'meta',
            url: '/docs/meta/tutorials/version-bumping',
          },
          {
            label: 'Generating a Browser Coverage List',
            contentSite: 'meta',
            url: '/docs/meta/tutorials/generating-a-browser-list',
          },
          {
            label: 'Fantastic Errors and How to Fix Them',
            contentSite: 'meta',
            url: '/docs/meta/error-kb',
          },
          {
            label: 'Installing MongoDB Documentation Build Tools',
            contentSite: 'meta',
            url: '/docs/meta/tutorials/install',
          },
          {
            label: 'How to Create a Docstools-Enabled Repository',
            contentSite: 'meta',
            url: '/docs/meta/tutorials/repo',
          },
          {
            label: 'How to Create a Guide for MongoDB Docs',
            contentSite: 'meta',
            url: '/docs/meta/tutorials/guide',
          },
        ],
      },
      {
        label: 'Reference',
        contentSite: 'meta',
        url: '/docs/meta/reference',
        collapsible: true,
        items: [
          {
            label: 'Syntax',
            isExternal: true,
            url: 'http://docutils.sourceforge.net/docs/ref/rst/restructuredtext.html',
          },
          {
            label: 'Docutils Directives',
            isExternal: true,
            url: 'http://docutils.sourceforge.net/docs/ref/rst/directives.html',
          },
          {
            label: 'Sphinx Documentation',
            isExternal: true,
            url: 'http://www.sphinx-doc.org/en/stable/contents.html',
          },
          {
            label: 'Redirects',
            contentSite: 'meta',
            url: '/docs/meta/redirects',
          },
          {
            label: 'Apiargs',
            contentSite: 'meta',
            url: '/docs/meta/reference/apiargs',
          },
          {
            label: ' Directive',
            contentSite: 'meta',
            url: '/docs/meta/reference/cond',
          },
          {
            label: 'Code Examples',
            contentSite: 'meta',
            url: '/docs/meta/reference/code-blocks',
          },
          {
            label: 'Eval Role',
            contentSite: 'meta',
            url: '/docs/meta/reference/eval',
          },
          {
            label: 'Icon Roles',
            contentSite: 'meta',
            url: '/docs/meta/reference/icon',
          },
          {
            label: 'Image Lightboxes',
            contentSite: 'meta',
            url: '/docs/meta/reference/lightbox',
          },
          {
            label: 'Options / Settings',
            contentSite: 'meta',
            url: '/docs/meta/reference/options',
          },
          {
            label: 'Source Constants',
            contentSite: 'meta',
            url: '/docs/meta/reference/source-constants',
          },
          {
            label: 'Substitutions',
            contentSite: 'meta',
            url: '/docs/meta/style-guide/markup/format/substitutions',
          },
          {
            label: 'Suppressing Previous/Next Links',
            contentSite: 'meta',
            url: '/docs/meta/reference/suppressing-prevnext-links',
          },
          {
            label: 'XML Role',
            contentSite: 'meta',
            url: '/docs/meta/reference/xmlrole',
          },
        ],
      },
      {
        label: 'Manual Organization',
        contentSite: 'meta',
        url: '/docs/meta/organization',
      },
      {
        label: 'Practices and Processes',
        contentSite: 'meta',
        url: '/docs/meta/practices',
        collapsible: true,
        items: [
          {
            label: 'Snooty',
            contentSite: 'meta',
            url: '/docs/meta/snooty',
          },
        ],
      },
      {
        label: 'Translation',
        contentSite: 'meta',
        url: '/docs/meta/translation',
      },
    ],
  },
];

export default tocData;
