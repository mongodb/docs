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
      },
      {
        label: "Security",
        contentSite: "mcp-server",
        url: "/docs/mcp-server/security",
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
        label: "Tools",
        contentSite: "mcp-server",
        url: "/docs/mcp-server/tools",
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
