import type { L1TocItem } from '../types';

export const toc: L1TocItem[] = [
  {
    label: 'MongoDB MCP Server',
    contentSite: 'mcp-server',
    url: '/docs/mcp-server/',
    items: [
      {
        label: 'MongoDB MCP Server',
        contentSite: 'mcp-server',
        group: true,
        items: [
          {
            label: 'Home',
            contentSite: 'mcp-server',
            url: '/docs/mcp-server',
          },
          {
            label: 'Overview',
            contentSite: 'mcp-server',
            url: '/docs/mcp-server/overview',
          },
          {
            label: 'Get Started',
            contentSite: 'mcp-server',
            url: '/docs/mcp-server/get-started/',
          },
          {
            label: 'Prerequisites',
            contentSite: 'mcp-server',
            url: '/docs/mcp-server/prerequisites',
          },
          {
            label: 'Tools',
            contentSite: 'mcp-server',
            url: '/docs/mcp-server/tools',
          },
          {
            label: 'Local MCP',
            contentSite: 'mcp-server',
            collapsible: true,
            items: [
              {
                label: 'Configure',
                contentSite: 'mcp-server',
                collapsible: true,
                url: '/docs/mcp-server/local-mcp/configuration',
                items: [
                  {
                    label: 'Options',
                    contentSite: 'mcp-server',
                    url: '/docs/mcp-server/local-mcp/configuration/options',
                  },
                  {
                    label: 'Methods',
                    contentSite: 'mcp-server',
                    url: '/docs/mcp-server/local-mcp/configuration/methods',
                  },
                  {
                    label: 'Enable or Disable Features',
                    contentSite: 'mcp-server',
                    url: '/docs/mcp-server/local-mcp/configuration/enable-or-disable-features',
                  },
                  {
                    label: 'Export Data',
                    contentSite: 'mcp-server',
                    url: '/docs/mcp-server/local-mcp/configuration/export-data',
                  },
                  {
                    label: 'Standalone Service',
                    contentSite: 'mcp-server',
                    url: '/docs/mcp-server/local-mcp/configuration/standalone-service',
                  },
                  {
                    label: 'Memory Overflow',
                    contentSite: 'mcp-server',
                    url: '/docs/mcp-server/local-mcp/configuration/memory-overflow',
                  },
                  {
                    label: 'Troubleshooting',
                    contentSite: 'mcp-server',
                    url: '/docs/mcp-server/local-mcp/configuration/troubleshooting',
                  },
                ],
              },
              {
                label: 'Security',
                contentSite: 'mcp-server',
                collapsible: true,
                url: '/docs/mcp-server/local-mcp/security',
                items: [
                  {
                    label: 'OIDC',
                    contentSite: 'mcp-server',
                    url: '/docs/mcp-server/local-mcp/security/connect-with-oidc',
                  },
                  {
                    label: 'LDAP',
                    contentSite: 'mcp-server',
                    url: '/docs/mcp-server/local-mcp/security/connect-with-ldap',
                  },
                  {
                    label: 'Kerberos',
                    contentSite: 'mcp-server',
                    url: '/docs/mcp-server/local-mcp/security/connect-with-kerberos',
                  },
                  {
                    label: 'x.509',
                    contentSite: 'mcp-server',
                    url: '/docs/mcp-server/local-mcp/security/connect-with-x509',
                  },
                  {
                    label: 'Proxy',
                    contentSite: 'mcp-server',
                    url: '/docs/mcp-server/local-mcp/security/connect-with-proxy',
                  },
                ],
              },
              {
                label: 'Security Best Practices',
                contentSite: 'mcp-server',
                url: '/docs/mcp-server/local-mcp/security-best-practices',
              },
              {
                label: 'Usage Examples',
                contentSite: 'mcp-server',
                url: '/docs/mcp-server/local-mcp/examples',
              },
              {
                label: 'Release Notes',
                contentSite: 'mcp-server',
                url: '/docs/mcp-server/local-mcp/release-notes',
              },
            ],
          },
          {
            label: 'Atlas Managed MCP',
            contentSite: 'mcp-server',
            collapsible: true,
            items: [
              {
                label: 'Security, Governance, and Auditability',
                contentSite: 'mcp-server',
                url: '/docs/mcp-server/remote-mcp/security',
              },
              {
                label: 'Manage AI Client Access',
                contentSite: 'mcp-server',
                url: '/docs/mcp-server/remote-mcp/manage-ai-client-access',
              },
              {
                label: 'MCP Access Models for MongoDB Atlas',
                contentSite: 'mcp-server',
                url: '/docs/mcp-server/remote-mcp/access-models',
              },
            ],
          },
        ],
      },
    ],
  },
];
