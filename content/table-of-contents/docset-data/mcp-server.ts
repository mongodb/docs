import type { TocItem } from "../types";

const tocData: TocItem[] = [
  {
    label: "MongoDB MCP Server",
    contentSite: "mcp-server",
    group: true,
    items: [
      {
        label: "Home",
        contentSite: "mcp-server",
        url: "/docs/mcp-server",
      },
      {
        label: "Overview",
        contentSite: "mcp-server",
        url: "/docs/mcp-server/overview",
      },
      {
        label: "Get Started",
        contentSite: "mcp-server",
        url: "/docs/mcp-server/get-started/",
      },
      {
        label: "Prerequisites",
        contentSite: "mcp-server",
        url: "/docs/mcp-server/prerequisites",
      },
      {
        label: "Configure",
        contentSite: "mcp-server",
        url: "/docs/mcp-server/configuration",
        collapsible: true,
        items: [
          {
            label: "Options",
            contentSite: "mcp-server",
            url: "/docs/mcp-server/configuration/options",
          },
          {
            label: "Methods",
            contentSite: "mcp-server",
            url: "/docs/mcp-server/configuration/methods",
          },
          {
            label: "Enable or Disable Features",
            contentSite: "mcp-server",
            url: "/docs/mcp-server/configuration/enable-or-disable-features",
          },
          {
            label: "Export Data",
            contentSite: "mcp-server",
            url: "/docs/mcp-server/configuration/export-data",
          },
          {
            label: "Standalone Service",
            contentSite: "mcp-server",
            url: "/docs/mcp-server/configuration/standalone-service",
          },
          {
            label: "Troubleshooting",
            contentSite: "mcp-server",
            url: "/docs/mcp-server/configuration/troubleshooting",
          },
        ],
      },
      {
        label: "Tools",
        contentSite: "mcp-server",
        url: "/docs/mcp-server/tools",
      },
      {
        label: "Security",
        contentSite: "mcp-server",
        url: "/docs/mcp-server/security",
        collapsible: true,
        items: [
          {
            label: "OIDC",
            contentSite: "mcp-server",
            url: "/docs/mcp-server/security/connect-with-oidc",
          },
          {
            label: "LDAP",
            contentSite: "mcp-server",
            url: "/docs/mcp-server/security/connect-with-ldap",
          },
          {
            label: "Kerberos",
            contentSite: "mcp-server",
            url: "/docs/mcp-server/security/connect-with-kerberos",
          },
          {
            label: "x.509",
            contentSite: "mcp-server",
            url: "/docs/mcp-server/security/connect-with-x509",
          },
          {
            label: "Proxy",
            contentSite: "mcp-server",
            url: "/docs/mcp-server/security/connect-with-proxy",
          },        
        ],
      },
      {
        label: "Security Best Practices",
        contentSite: "mcp-server",
        url: "/docs/mcp-server/security-best-practices",
      },
      {
        label: "Usage Examples",
        contentSite: "mcp-server",
        url: "/docs/mcp-server/examples",
      }
    ]
  }
]

export default tocData;
