import type { TocItem } from "../types";

const tocData: TocItem[] = [
  {
    label: "Atlas",
    contentSite: "cloud-docs",
    group: true,
    items: [
      {
        label: "Get Started",
        contentSite: "cloud-docs",
        url: "/docs/atlas/getting-started",
        collapsible: true,
        items: [
          {
            label: "Create an Account",
            contentSite: "cloud-docs",
            url: "/docs/atlas/tutorial/create-atlas-account",
          },
          {
            label: "Deploy a Free Cluster",
            contentSite: "cloud-docs",
            url: "/docs/atlas/tutorial/deploy-free-tier-cluster",
          },
          {
            label: "Manage Database Users",
            contentSite: "cloud-docs",
            url: "/docs/atlas/tutorial/create-mongodb-user-for-cluster",
          },
          {
            label: "Manage the IP Access List",
            contentSite: "cloud-docs",
            url: "/docs/atlas/security/add-ip-address-to-list",
          },
          {
            label: "Connect to the Cluster",
            contentSite: "cloud-docs",
            url: "/docs/atlas/tutorial/connect-to-your-cluster",
          },
          {
            label: "Insert and View a Document",
            contentSite: "cloud-docs",
            url: "/docs/atlas/tutorial/insert-data-into-your-cluster",
          },
          {
            label: "Load Sample Data",
            contentSite: "cloud-docs",
            url: "/docs/atlas/sample-data",
            collapsible: true,
            items: [
              {
                label: "AirBnB Listings",
                contentSite: "cloud-docs",
                url: "/docs/atlas/sample-data/sample-airbnb",
              },
              {
                label: "Analytics",
                contentSite: "cloud-docs",
                url: "/docs/atlas/sample-data/sample-analytics",
              },
              {
                label: "Geospatial",
                contentSite: "cloud-docs",
                url: "/docs/atlas/sample-data/sample-geospatial",
              },
              {
                label: "Guides",
                contentSite: "cloud-docs",
                url: "/docs/atlas/sample-data/sample-guides",
              },
              {
                label: "Mflix",
                contentSite: "cloud-docs",
                url: "/docs/atlas/sample-data/sample-mflix",
              },
              {
                label: "Restaurants",
                contentSite: "cloud-docs",
                url: "/docs/atlas/sample-data/sample-restaurants",
              },
              {
                label: "Supply Store",
                contentSite: "cloud-docs",
                url: "/docs/atlas/sample-data/sample-supplies",
              },
              {
                label: "Training",
                contentSite: "cloud-docs",
                url: "/docs/atlas/sample-data/sample-training",
              },
              {
                label: "Weather",
                contentSite: "cloud-docs",
                url: "/docs/atlas/sample-data/sample-weather",
              },
            ],
          },
          {
            label: "Generate Synthetic Data",
            contentSite: "cloud-docs",
            url: "/docs/atlas/synthetic-data",
          },
        ],
      },
      {
        label: "Create & Connect to Clusters",
        contentSite: "cloud-docs",
        url: "/docs/atlas/create-connect-deployments",
        collapsible: true,
        items: [
          {
            label: "Cluster Types",
            contentSite: "cloud-docs",
            url: "/docs/atlas/create-database-deployment",
          },
          {
            label: "Create a Cluster",
            contentSite: "cloud-docs",
            url: "/docs/atlas/tutorial/create-new-cluster",
          },
          {
            label: "Create a Global Cluster",
            contentSite: "cloud-docs",
            url: "/docs/atlas/tutorial/create-global-cluster",
          },
          {
            label: "Cloud Providers and Regions",
            contentSite: "cloud-docs",
            url: "/docs/atlas/cloud-providers-regions",
          },
          {
            label: "Connection Methods",
            contentSite: "cloud-docs",
            url: "/docs/atlas/connect-to-database-deployment",
            collapsible: true,
            items: [
              {
                label: "Drivers",
                contentSite: "cloud-docs",
                url: "/docs/atlas/driver-connection",
              },
              {
                label: "Compass",
                contentSite: "cloud-docs",
                url: "/docs/atlas/compass-connection",
              },
              {
                label: "mongosh",
                contentSite: "cloud-docs",
                url: "/docs/atlas/mongo-shell-connection",
              },
              {
                label: "BI Connector",
                contentSite: "cloud-docs",
                url: "/docs/atlas/bi-connection",
                collapsible: true,
                items: [
                  {
                    label: "Transition to Atlas SQL",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/tutorial/transition-bic-to-atlas-sql",
                  },
                  {
                    label: "System DSN",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/tutorial/create-system-dsn",
                  },
                  {
                    label: "Excel",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/tutorial/connect-bic-excel",
                  },
                  {
                    label: "Tableau Desktop",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/tutorial/connect-bic-tableau",
                  },
                  {
                    label: "Qlik Sense",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/tutorial/connect-bic-qlik",
                  },
                  {
                    label: "MySQL Workbench",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/tutorial/connect-bic-workbench",
                  },
                  {
                    label: "Power BI Desktop",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/tutorial/connect-bic-powerbi",
                  },
                ],
              },
              {
                label: "Command Line Tools",
                contentSite: "cloud-docs",
                url: "/docs/atlas/command-line-tools",
              },
              {
                label: "VS Code",
                contentSite: "cloud-docs",
                url: "/docs/atlas/mongodb-for-vscode",
              },
              {
                label: "Azure Service Connector",
                contentSite: "cloud-docs",
                url: "/docs/atlas/tutorial/azure-service-connector",
              },
            ],
          },
          {
            label: "Test Resilience",
            contentSite: "cloud-docs",
            url: "/docs/atlas/tutorial/test-resilience",
            collapsible: true,
            items: [
              {
                label: "Test Primary Failover",
                contentSite: "cloud-docs",
                url: "/docs/atlas/tutorial/test-resilience/test-primary-failover",
              },
              {
                label: "Simulate Regional Outage",
                contentSite: "cloud-docs",
                url: "/docs/atlas/tutorial/test-resilience/simulate-regional-outage",
              },
            ],
          },
          {
            label: "AWS Lambda",
            contentSite: "cloud-docs",
            url: "/docs/atlas/manage-connections-aws-lambda",
          },
          {
            label: "Azure Functions",
            contentSite: "cloud-docs",
            url: "/docs/atlas/manage-connections-azure-functions",
          },
          {
            label: "Google Cloud",
            contentSite: "cloud-docs",
            url: "/docs/atlas/manage-connections-google-cloud",
          },
          {
            label: "Troubleshoot",
            contentSite: "cloud-docs",
            url: "/docs/atlas/troubleshoot-connection",
          },
        ],
      },
      {
        label: "Configure Security Features",
        contentSite: "cloud-docs",
        url: "/docs/atlas/setup-cluster-security",
        collapsible: true,
        items: [
          {
            label: "Cluster Access Quickstart",
            contentSite: "cloud-docs",
            url: "/docs/atlas/security/quick-start",
          },
          {
            label: "IP Access List",
            contentSite: "cloud-docs",
            url: "/docs/atlas/security/ip-access-list",
          },
          {
            label: "Atlas Resource Policies",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-resource-policies",
          },
          {
            label: "Network Peering",
            contentSite: "cloud-docs",
            url: "/docs/atlas/security-vpc-peering",
          },
          {
            label: "Private Endpoints",
            contentSite: "cloud-docs",
            url: "/docs/atlas/security-configure-private-endpoints",
            collapsible: true,
            items: [
              {
                label: "Overview",
                contentSite: "cloud-docs",
                url: "/docs/atlas/security-private-endpoint",
              },
              {
                label: "Dedicated Clusters",
                contentSite: "cloud-docs",
                url: "/docs/atlas/security-cluster-private-endpoint",
              },
              {
                label: "Manage and Connect",
                contentSite: "cloud-docs",
                url: "/docs/atlas/security-manage-private-endpoint",
              },
              {
                label: "Troubleshoot",
                contentSite: "cloud-docs",
                url: "/docs/atlas/troubleshoot-private-endpoints",
              },
            ],
          },
          {
            label: "Cloud Provider Access",
            contentSite: "cloud-docs",
            url: "/docs/atlas/security/cloud-provider-access",
            collapsible: true,
            items: [
              {
                label: "Unified AWS",
                contentSite: "cloud-docs",
                url: "/docs/atlas/security/set-up-unified-aws-access",
              },
              {
                label: "Azure Service",
                contentSite: "cloud-docs",
                url: "/docs/atlas/security/set-up-azure-access",
              },
              {
                label: "GCP Service Account",
                contentSite: "cloud-docs",
                url: "/docs/atlas/security/set-up-gcp-access",
              },
            ],
          },
          {
            label: "Authentication",
            contentSite: "cloud-docs",
            url: "/docs/atlas/security/config-db-auth",
            collapsible: true,
            items: [
              {
                label: "Database Users",
                contentSite: "cloud-docs",
                url: "/docs/atlas/security-add-mongodb-users",
              },
              {
                label: "Roles and Privileges",
                contentSite: "cloud-docs",
                url: "/docs/atlas/mongodb-users-roles-and-privileges",
              },
              {
                label: "Custom Database Roles",
                contentSite: "cloud-docs",
                url: "/docs/atlas/security-add-mongodb-roles",
              },
              {
                label: "AWS IAM",
                contentSite: "cloud-docs",
                url: "/docs/atlas/security/aws-iam-authentication",
              },
              {
                label: "LDAP",
                contentSite: "cloud-docs",
                url: "/docs/atlas/security-ldaps",
                collapsible: true,
                items: [
                  {
                    label: "Microsoft Entra ID DS",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/security-ldaps-azure",
                  },
                  {
                    label: "Okta",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/security-ldaps-okta",
                  },
                  {
                    label: "OneLogin",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/security-ldaps-onelogin",
                  },
                ],
              },
              {
                label: "OIDC/OAuth2.0",
                contentSite: "cloud-docs",
                url: "/docs/atlas/security-oidc",
                collapsible: true,
                items: [
                  {
                    label: "Workforce (Humans)",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/workforce-oidc",
                  },
                  {
                    label: "Workload (Applications)",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/workload-oidc",
                  },
                ],
              },
              {
                label: "X.509",
                contentSite: "cloud-docs",
                url: "/docs/atlas/security-self-managed-x509",
              },
            ],
          },
          {
            label: "Encryption at Rest",
            contentSite: "cloud-docs",
            url: "/docs/atlas/security-kms-encryption",
            collapsible: true,
            items: [
              {
                label: "AWS KMS",
                contentSite: "cloud-docs",
                url: "/docs/atlas/security-aws-kms",
                collapsible: true,
                items: [
                  {
                    label: "Configure Access Over Public Network",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/security/aws-kms-over-public-network",
                  },
                  {
                    label: "Configure Access Over Private Endpoints",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/security/aws-kms-over-private-endpoint",
                  },
                ],
              },
              {
                label: "Azure Key Vault",
                contentSite: "cloud-docs",
                url: "/docs/atlas/security-azure-kms",
                collapsible: true,
                items: [
                  {
                    label: "Configure Access Over Public Network",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/security/azure-kms-over-public-network",
                  },
                  {
                    label: "Configure Access Over Private Endpoints",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/security/azure-kms-over-private-endpoint",
                  },
                ],
              },
              {
                label: "Google Cloud KMS",
                contentSite: "cloud-docs",
                url: "/docs/atlas/security-gcp-kms",
              },
            ],
          },
          {
            label: "Auditing",
            contentSite: "cloud-docs",
            url: "/docs/atlas/database-auditing",
          },
          {
            label: "Access History",
            contentSite: "cloud-docs",
            url: "/docs/atlas/access-tracking",
          },
        ],
      },
      {
        label: "Configure UI Access",
        contentSite: "cloud-docs",
        url: "/docs/atlas/organizations-projects",
        collapsible: true,
        items: [
          {
            label: "Authentication",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-ui-authentication",
            collapsible: true,
            items: [
              {
                label: "Federated",
                contentSite: "cloud-docs",
                url: "/docs/atlas/security/federated-authentication",
                collapsible: true,
                items: [
                  {
                    label: "Identity Providers",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/security/manage-federated-auth",
                  },
                  {
                    label: "Domains",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/security/manage-domain-mapping",
                  },
                  {
                    label: "Organizations",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/security/manage-org-mapping",
                  },
                  {
                    label: "Roles",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/security/manage-role-mapping",
                  },
                  {
                    label: "Microsoft Entra ID",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/security/federated-auth-azure-ad",
                  },
                  {
                    label: "Google Workspace",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/security/federated-auth-google-ws",
                  },
                  {
                    label: "Okta",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/security/federated-auth-okta",
                  },
                  {
                    label: "PingOne",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/security/federated-auth-ping-one",
                  },
                  {
                    label: "Advanced Options",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/security/federation-advanced-options",
                  },
                ],
              },
              {
                label: "Multi-Factor",
                contentSite: "cloud-docs",
                url: "/docs/atlas/security-multi-factor-authentication",
              },
            ],
          },
          {
            label: "Authorization",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-ui-authorization",
            collapsible: true,
            items: [
              {
                label: "User Roles",
                contentSite: "cloud-docs",
                url: "/docs/atlas/reference/user-roles",
              },
              {
                label: "Organization Access",
                contentSite: "cloud-docs",
                url: "/docs/atlas/tutorial/manage-organizations",
                collapsible: true,
                items: [
                  {
                    label: "Organizations",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/access/orgs-create-view-edit-delete",
                  },
                  {
                    label: "Users",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/access/manage-org-users",
                  },
                  {
                    label: "Teams",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/access/manage-teams-in-orgs",
                  },
                  {
                    label: "Settings",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/tutorial/manage-organization-settings",
                  },
                ],
              },
              {
                label: "Project Access",
                contentSite: "cloud-docs",
                url: "/docs/atlas/tutorial/manage-projects",
                collapsible: true,
                items: [
                  {
                    label: "Projects",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/access/manage-project-access",
                  },
                  {
                    label: "Settings",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/tutorial/manage-project-settings",
                  },
                  {
                    label: "Overview Landing Page",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/project-overview",
                  },
                ],
              },
              {
                label: "Invitations",
                contentSite: "cloud-docs",
                url: "/docs/atlas/invitations",
              },
            ],
          },
          {
            label: "View Activity Feed",
            contentSite: "cloud-docs",
            url: "/docs/atlas/tutorial/activity-feed",
          },
          {
            label: "Manage Your Account",
            contentSite: "cloud-docs",
            url: "/docs/atlas/security/manage-your-mongodb-atlas-account",
          },
          {
            label: "Personalize the UI",
            contentSite: "cloud-docs",
            url: "/docs/atlas/personalization",
          },
          {
            label: "Configure Support Access",
            contentSite: "cloud-docs",
            url: "/docs/atlas/security-restrict-support-access",
          },
        ],
      },
      {
        label: "Migrate or Import Data",
        contentSite: "cloud-docs",
        url: "/docs/atlas/import",
        collapsible: true,
        items: [
          {
            label: "Monitor Migrations",
            contentSite: "cloud-docs",
            url: "/docs/atlas/import/monitor-migrations",
          },
          {
            label: "Verify Migrations",
            contentSite: "cloud-docs",
            url: "/docs/atlas/import/live-migration-verification",
          },
          {
            label: "Live Migrate a Cluster",
            contentSite: "cloud-docs",
            url: "/docs/atlas/live-migration",
            collapsible: true,
            items: [
              {
                label: "Pull into Atlas",
                contentSite: "cloud-docs",
                url: "/docs/atlas/import/c2c-pull-live-migration",
              },
              {
                label: "Push from Cloud Manager",
                contentSite: "cloud-docs",
                url: "/docs/atlas/import/c2c-push-live-migration",
              },
              {
                label: "Sharding Example",
                contentSite: "cloud-docs",
                url: "/docs/atlas/import/live-migration-example",
              },
            ],
          },
          {
            label: "Manual Cluster-to-Cluster Sync",
            contentSite: "cluster-sync",
            url: "/docs/cluster-to-cluster-sync/current/reference/mongosync/#mongosync",
          },
          {
            label: "Troubleshoot Live Migration",
            contentSite: "cloud-docs",
            url: "/docs/atlas/import/live-migration-troubleshooting",
          },
          {
            label: "Legacy Migration",
            contentSite: "cloud-docs",
            url: "/docs/atlas/legacy-migration",
            collapsible: true,
            items: [
              {
                label: "Pull into Atlas",
                contentSite: "cloud-docs",
                url: "/docs/atlas/migration-live-atlas-managed",
                collapsible: true,
                items: [
                  {
                    label: "Replica Set 4.4 or 5.0",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/import/live-import",
                  },
                  {
                    label: "Troubleshoot",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/import/live-import-troubleshooting",
                  },
                ],
              },
              {
                label: "Push from Cloud Manager or Ops Manager",
                contentSite: "cloud-docs",
                url: "/docs/atlas/migration-from-com",
                collapsible: true,
                items: [
                  {
                    label: "Replica Set 4.4 or 5.0",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/import/migrate-from-com-rs",
                  },
                ],
              },
              {
                label: "Self-Managed Tools",
                contentSite: "cloud-docs",
                url: "/docs/atlas/migration-self-managed",
                collapsible: true,
                items: [
                  {
                    label: "Migrate Manually",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/import/mongomirror",
                    collapsible: true,
                    items: [
                      {
                        label: "mongomirror",
                        contentSite: "cloud-docs",
                        url: "/docs/atlas/reference/mongomirror",
                      },
                      {
                        label: "mongomirror Changelog",
                        contentSite: "cloud-docs",
                        url: "/docs/atlas/release-notes/mongomirror",
                      },
                      {
                        label: "mongomirror Versions",
                        contentSite: "cloud-docs",
                        url: "/docs/atlas/reference/mongomirror-old-versions",
                      },
                    ],
                  },
                  {
                    label: "Seed Data",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/import/mongorestore",
                  },
                  {
                    label: "Load Files",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/import/mongoimport",
                  },
                  {
                    label: "Import with Compass",
                    contentSite: "compass",
                    url: "/docs/compass/current/import-export/",
                  },
                ],
              },
              {
                label: "AWS into Atlas",
                contentSite: "guides",
                url: "/docs/guides/cloud/migrate-from-aws-to-atlas/",
              },
            ],
          },
        ],
      },
      {
        label: "Interact with Data",
        contentSite: "cloud-docs",
        url: "/docs/atlas/atlas-ui",
        collapsible: true,
        items: [
          {
            label: "Databases",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-ui/databases",
          },
          {
            label: "Collections",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-ui/collections",
            collapsible: true,
            items: [
              {
                label: "Collections with Collation",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-ui/collections/collation-collection",
              },
              {
                label: "Clustered Collections",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-ui/collections/clustered-collection",
              },
              {
                label: "Time Series Collections",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-ui/collections/time-series-collection",
              },
            ],
          },
          {
            label: "Views",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-ui/views",
          },
          {
            label: "Documents",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-ui/documents",
            collapsible: true,
            items: [
              {
                label: "Modify Multiple",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-ui/documents/modify-multiple",
              },
              {
                label: "Delete Multiple",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-ui/documents/delete-multiple",
              },
            ],
          },
          {
            label: "Query",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-ui/query/filter",
            collapsible: true,
            items: [
              {
                label: "Set Returned Fields",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-ui/query/project",
              },
              {
                label: "Sort Returned Documents",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-ui/query/sort",
              },
              {
                label: "Adjust Maximum Time",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-ui/query/maxtimems",
              },
              {
                label: "Specify Collation",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-ui/query/collation",
              },
              {
                label: "Skip Documents",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-ui/query/skip",
              },
              {
                label: "Limit Results",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-ui/query/limit",
              },
              {
                label: "View Query Performance",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-ui/query-plan",
              },
              {
                label: "Export to a Language",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-ui/export-query-to-language",
              },
            ],
          },
          {
            label: "Query with Natural Language",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-ui/query-with-natural-language",
            collapsible: true,
            items: [
              {
                label: "Enable",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-ui/query-with-natural-language/enable-natural-language-querying",
              },
              {
                label: "Prompt Query",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-ui/query-with-natural-language/prompt-natural-language-query",
              },
              {
                label: "Prompt Aggregation",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-ui/query-with-natural-language/prompt-natural-language-aggregation",
              },
              {
                label: "AI & Data Usage",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-ui/query-with-natural-language/ai-and-data-usage-information",
              },
            ],
          },
          {
            label: "Indexes",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-ui/indexes",
          },
          {
            label: "Aggregation Pipelines",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-ui/create-agg-pipeline",
            collapsible: true,
            items: [
              {
                label: "View Explain Plans",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-ui/agg-pipeline-builder/view-pipeline-explain-plan",
              },
              {
                label: "Export to a Language",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-ui/agg-pipeline-builder/export-pipeline-to-language",
              },
              {
                label: "Create a View",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-ui/agg-pipeline-builder/create-a-view",
              },
              {
                label: "Count Results",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-ui/agg-pipeline-builder/count-pipeline-results",
              },
              {
                label: "Specify Collation",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-ui/agg-pipeline-builder/pipeline-custom-collation",
              },
              {
                label: "Set Max Time MS",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-ui/agg-pipeline-builder/maxtime-ms-pipeline",
              },
              {
                label: "Builder Settings",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-ui/agg-pipeline-builder/aggregation-pipeline-builder-settings",
              },
            ],
          },
          {
            label: "Data Schema",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-ui/schema",
          },
          {
            label: "Peformance Insights",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-ui/performance-insights",
          },
          {
            label: "Validation Rules",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-ui/validation",
          },
          {
            label: "Sampling",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-ui/sampling",
          },
          {
            label: "Triggers",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-ui/triggers",
            collapsible: true,
            items: [
              {
                label: "Database Triggers",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-ui/triggers/database-triggers",
              },
              {
                label: "Scheduled Triggers",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-ui/triggers/scheduled-triggers",
              },
              {
                label: "Authentication Triggers",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-ui/triggers/authentication-triggers",
              },
              {
                label: "Disable a Trigger",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-ui/triggers/disable",
              },
              {
                label: "Send Trigger Events to AWS EventBridge",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-ui/triggers/aws-eventbridge",
              },
              {
                label: "Functions",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-ui/triggers/functions",
                collapsible: true,
                items: [
                  {
                    label: "Context",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/atlas-ui/triggers/functions/context",
                  },
                  {
                    label: "Global Modules",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/atlas-ui/triggers/functions/globals",
                  },
                  {
                    label: "External Dependencies",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/atlas-ui/triggers/functions/dependencies",
                  },
                  {
                    label: "Handle Errors",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/atlas-ui/triggers/functions/handle-errors",
                  },
                  {
                    label: "JavaScript Support",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/atlas-ui/triggers/functions/javascript-support",
                  },
                  {
                    label: "Read",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/atlas-ui/triggers/functions/read",
                  },
                  {
                    label: "Write",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/atlas-ui/triggers/functions/write",
                  },
                  {
                    label: "Aggregate",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/atlas-ui/triggers/functions/aggregate",
                  },
                  {
                    label: "Define and Manage Secrets",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/atlas-ui/triggers/functions/secrets",
                  },
                  {
                    label: "MongoDB API Reference",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/atlas-ui/triggers/functions/api",
                  },
                  {
                    label: "Define and Access Values",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/atlas-ui/triggers/functions/values",
                  },
                ],
              },
              {
                label: "Logs",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-ui/triggers/logs",
              },
              {
                label: "Forward Logs",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-ui/triggers/forward-logs",
              },
              {
                label: "Limitations",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-ui/triggers/limitations",
              },
              {
                label: "Triggers Code Examples",
                isExternal: true,
                url: "/atlas-app-services-examples/tree/main/triggers-examples",
              },
            ],
          },
        ],
      },
      {
        label: "Query Federated Data",
        contentSite: "cloud-docs",
        url: "/docs/atlas/data-federation",
        collapsible: true,
        items: [
          {
            label: "Data Federation Overview",
            contentSite: "cloud-docs",
            url: "/docs/atlas/data-federation/overview",
          },
          {
            label: "Get Started",
            contentSite: "cloud-docs",
            url: "/docs/atlas/data-federation/tutorial/getting-started",
            collapsible: true,
            items: [
              {
                label: "Deploy",
                contentSite: "cloud-docs",
                url: "/docs/atlas/data-federation/tutorial/deploy",
              },
              {
                label: "Configure a Connection",
                contentSite: "cloud-docs",
                url: "/docs/atlas/data-federation/tutorial/configure-connection",
                collapsible: true,
                items: [
                  {
                    label: "IP Access Lists",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/data-federation/tutorial/add-ip-address",
                  },
                  {
                    label: "Private Endpoints",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/data-federation/tutorial/config-private-endpoint",
                  },
                  {
                    label: "Database Users",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/data-federation/tutorial/create-mongodb-user",
                  },
                  {
                    label: "X.509 Authentication",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/data-federation/tutorial/security-self-managed-x509",
                  },
                  {
                    label: "AWS IAM",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/security/aws-iam-authentication",
                  },
                ],
              },
              {
                label: "Connect",
                contentSite: "cloud-docs",
                url: "/docs/atlas/data-federation/tutorial/connect",
              },
              {
                label: "Run Queries",
                contentSite: "cloud-docs",
                url: "/docs/atlas/data-federation/tutorial/run-queries",
              },
            ],
          },
          {
            label: "Define Data Stores",
            contentSite: "cloud-docs",
            url: "/docs/atlas/data-federation/config/config-data-stores",
            collapsible: true,
            items: [
              {
                label: "AWS S3 Bucket",
                contentSite: "cloud-docs",
                url: "/docs/atlas/data-federation/config/config-aws-s3",
                collapsible: true,
                items: [
                  {
                    label: "Deploy",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/data-federation/deployment/deploy-s3",
                  },
                  {
                    label: "Generate Collections",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/data-federation/config/aws-gen-wildcard-collections",
                  },
                  {
                    label: "Define Path for S3 Data",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/data-federation/config/path-syntax-examples",
                  },
                  {
                    label: "Optimize Queries",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/data-federation/admin/optimize-query-performance",
                  },
                  {
                    label: "Configure S3 Encryption",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/data-federation/supported-unsupported/encryption",
                  },
                  {
                    label: "Data Formats",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/data-federation/supported-unsupported/supported-data-formats",
                    collapsible: true,
                    items: [
                      {
                        label: "Parquet",
                        contentSite: "cloud-docs",
                        url: "/docs/atlas/data-federation/supported-unsupported/data-formats/parquet-data-files",
                      },
                      {
                        label: "CSV and TSV",
                        contentSite: "cloud-docs",
                        url: "/docs/atlas/data-federation/supported-unsupported/data-formats/csv-tsv-data-files",
                      },
                    ],
                  },
                  {
                    label: "Limitations",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/data-federation/supported-unsupported/aws-s3-limitations",
                  },
                ],
              },
              {
                label: "Azure Blob Storage",
                contentSite: "cloud-docs",
                url: "/docs/atlas/data-federation/config/config-azure-blob",
                collapsible: true,
                items: [
                  {
                    label: "Deploy",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/data-federation/deployment/deploy-azure",
                  },
                ],
              },
              {
                label: "Google Cloud Storage",
                contentSite: "cloud-docs",
                url: "/docs/atlas/data-federation/config/config-gcp-bucket",
                collapsible: true,
                items: [
                  {
                    label: "Deploy",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/data-federation/deployment/deploy-gcp",
                  },
                ],
              },
              {
                label: "Atlas Cluster",
                contentSite: "cloud-docs",
                url: "/docs/atlas/data-federation/config/config-atlas-cluster",
                collapsible: true,
                items: [
                  {
                    label: "Deploy",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/data-federation/deployment/deploy-atlas",
                  },
                  {
                    label: "Generate Collections",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/data-federation/config/atlas-gen-wildcard-collections",
                  },
                ],
              },
              {
                label: "HTTP URL",
                contentSite: "cloud-docs",
                url: "/docs/atlas/data-federation/config/config-http-endpoint",
                collapsible: true,
                items: [
                  {
                    label: "Deploy",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/data-federation/deployment/deploy-http",
                  },
                ],
              },
              {
                label: "Atlas Online Archive",
                contentSite: "cloud-docs",
                url: "/docs/atlas/data-federation/config/config-oa",
                collapsible: true,
                items: [
                  {
                    label: "Create from the UI",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/data-federation/deployment/deploy-oa",
                  },
                ],
              },
              {
                label: "Use Partition Attributes",
                contentSite: "cloud-docs",
                url: "/docs/atlas/data-federation/supported-unsupported/supported-partition-attributes",
              },
            ],
          },
          {
            label: "Administration",
            contentSite: "cloud-docs",
            url: "/docs/atlas/data-federation/administration",
            collapsible: true,
            items: [
              {
                label: "Manage Configuration",
                contentSite: "cloud-docs",
                url: "/docs/atlas/data-federation/admin/manage-federated-database",
                collapsible: true,
                items: [
                  {
                    label: "Create Stores",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/data-federation/admin/cli/stores/create-store",
                  },
                  {
                    label: "List Stores",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/data-federation/admin/cli/stores/list-stores",
                  },
                  {
                    label: "Add Collections & Views",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/data-federation/admin/cli/collections/create-collections-views",
                  },
                  {
                    label: "Rename Collections",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/data-federation/admin/cli/collections/rename-collection",
                  },
                  {
                    label: "Drop Collections & Views",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/data-federation/admin/cli/collections/drop-collections-views",
                  },
                  {
                    label: "Drop Databases",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/data-federation/admin/cli/database/drop-database",
                  },
                  {
                    label: "Drop Stores",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/data-federation/admin/cli/stores/drop-store",
                  },
                ],
              },
              {
                label: "Manage Namespaces",
                contentSite: "cloud-docs",
                url: "/docs/atlas/data-federation/admin/manage-namespace-catalog-cli",
                collapsible: true,
                items: [
                  {
                    label: "Update Namespaces",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/data-federation/admin/namespace/updatecatalog",
                  },
                ],
              },
              {
                label: "Manage Private Endpoints",
                contentSite: "cloud-docs",
                url: "/docs/atlas/data-federation/admin/manage-private-endpoint",
                collapsible: true,
                items: [
                  {
                    label: "Set Up",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/data-federation/tutorial/config-private-endpoint",
                  },
                  {
                    label: "View",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/data-federation/admin/view-private-endpoints",
                  },
                  {
                    label: "Edit",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/data-federation/admin/edit-private-endpoint",
                  },
                  {
                    label: "Delete",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/data-federation/admin/delete-private-endpoint",
                  },
                ],
              },
              {
                label: "Update Region",
                contentSite: "cloud-docs",
                url: "/docs/atlas/data-federation/admin/update-region",
              },
              {
                label: "Manage Query Limits",
                contentSite: "cloud-docs",
                url: "/docs/atlas/data-federation/query/manage-query-limits",
              },
              {
                label: "Determine Query Status",
                contentSite: "cloud-docs",
                url: "/docs/atlas/data-federation/admin/determine-query-status",
              },
              {
                label: "Terminate Query",
                contentSite: "cloud-docs",
                url: "/docs/atlas/data-federation/admin/terminate-running-query",
              },
              {
                label: "Retrieve Query History",
                contentSite: "cloud-docs",
                url: "/docs/atlas/data-federation/query/view-query-history",
              },
              {
                label: "Download Query Logs",
                contentSite: "cloud-docs",
                url: "/docs/atlas/data-federation/query/download-query-logs",
              },
            ],
          },
          {
            label: "MQL",
            contentSite: "cloud-docs",
            url: "/docs/atlas/data-federation/query/query-federated-database",
          },
          {
            label: "SQL",
            contentSite: "cloud-docs",
            url: "/docs/atlas/data-federation/query/query-with-sql",
            collapsible: true,
            items: [
              {
                label: "Enable the Interface",
                contentSite: "cloud-docs",
                url: "/docs/atlas/data-federation/query/sql/getting-started",
                collapsible: true,
                items: [
                  {
                    label: "Quick Start",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/data-federation/query/sql/getting-started/get-started-quick",
                  },
                  {
                    label: "Advanced Configuration",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/data-federation/query/sql/getting-started/get-started-advanced",
                  },
                ],
              },
              {
                label: "Connect",
                contentSite: "cloud-docs",
                url: "/docs/atlas/data-federation/query/sql/connect",
                collapsible: true,
                items: [
                  {
                    label: "MongoDB Shell",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/data-federation/query/sql/shell/connect",
                  },
                  {
                    label: "JDBC Driver",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/data-federation/query/sql/drivers/jdbc/connect",
                  },
                  {
                    label: "ODBC",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/data-federation/query/sql/drivers/odbc/connect",
                  },
                  {
                    label: "Tableau",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/data-federation/query/sql/tableau/connect",
                  },
                  {
                    label: "Power BI",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/data-federation/query/sql/powerbi/connect",
                  },
                  {
                    label: "Private Endpoint",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/data-federation/query/sql/private-endpoint/connect",
                  },
                ],
              },
              {
                label: "Query",
                contentSite: "cloud-docs",
                url: "/docs/atlas/data-federation/query/sql/query-with-asql-statements",
              },
              {
                label: "Manage Schemas",
                contentSite: "cloud-docs",
                url: "/docs/atlas/data-federation/query/sql/schema-management",
                collapsible: true,
                items: [
                  {
                    label: "Create",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/data-federation/query/sql/schema/create",
                  },
                  {
                    label: "View",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/data-federation/query/sql/schema/view",
                  },
                  {
                    label: "Set",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/data-federation/query/sql/schema/set",
                  },
                  {
                    label: "Schedule Updates",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/data-federation/query/sql/schema/schedule-updates",
                  },
                  {
                    label: "Delete",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/data-federation/query/sql/schema/delete",
                  },
                ],
              },
              {
                label: "SQL Tutorials",
                contentSite: "cloud-docs",
                url: "/docs/atlas/data-federation/query/sql/tutorials",
                collapsible: true,
                items: [
                  {
                    label: "Connect and Query",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/data-federation/query/sql/tutorials/connect-tutorial",
                  },
                ],
              },
              {
                label: "Errors",
                contentSite: "cloud-docs",
                url: "/docs/atlas/data-federation/query/sql/errors",
              },
              {
                label: "Language Reference",
                contentSite: "cloud-docs",
                url: "/docs/atlas/data-federation/query/sql/language-reference",
              },
            ],
          },
          {
            label: "Data Federation Tutorials",
            contentSite: "cloud-docs",
            url: "/docs/atlas/data-federation/tutorials",
          },
          {
            label: "Features",
            contentSite: "cloud-docs",
            url: "/docs/atlas/data-federation/supported-unsupported",
            collapsible: true,
            items: [
              {
                label: "MongoDB Commands",
                contentSite: "cloud-docs",
                url: "/docs/atlas/data-federation/supported-unsupported/mql-support",
                collapsible: true,
                items: [
                  {
                    label: "Administration",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/data-federation/supported-unsupported/administration-commands",
                  },
                  {
                    label: "Diagnostic",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/data-federation/supported-unsupported/diagnostic-commands",
                  },
                  {
                    label: "Operations",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/data-federation/supported-unsupported/query-write-op-commands",
                  },
                  {
                    label: "Role Management",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/data-federation/supported-unsupported/role-management-commands",
                  },
                  {
                    label: "Storage Configuration",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/data-federation/supported-unsupported/storage-config-commands",
                  },
                ],
              },
              {
                label: "Aggregation Pipelines",
                contentSite: "cloud-docs",
                url: "/docs/atlas/data-federation/supported-unsupported/supported-aggregation",
                collapsible: true,
                items: [
                  {
                    label: "$collStats",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/data-federation/supported-unsupported/pipeline/collstats",
                  },
                  {
                    label: "$lookup",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/data-federation/supported-unsupported/pipeline/lookup-stage",
                  },
                  {
                    label: "$merge",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/data-federation/supported-unsupported/pipeline/merge",
                  },
                  {
                    label: "$out",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/data-federation/supported-unsupported/pipeline/out",
                  },
                  {
                    label: "$queryHistory",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/data-federation/query/view-query-history",
                  },
                  {
                    label: "$sql",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/data-federation/supported-unsupported/pipeline/sql",
                  },
                ],
              },
            ],
          },
          {
            label: "Limitations",
            contentSite: "cloud-docs",
            url: "/docs/atlas/data-federation/supported-unsupported/limitations",
          },
        ],
      },
      {
        label: "Atlas Search",
        contentSite: "cloud-docs",
        url: "/docs/atlas/atlas-search",
        collapsible: true,
        items: [
          {
            label: "Quick Start",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-search/tutorial",
            collapsible: true,
            items: [
              {
                label: "Autocomplete and Partial Matching",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-search/tutorial/partial-match",
              },
              {
                label: "Facets",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-search/tutorial/facet-tutorial",
              },
            ],
          },
          {
            label: "Queries & Indexes",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-search/searching",
            collapsible: true,
            items: [
              {
                label: "Manage Indexes",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-search/manage-indexes",
              },
              {
                label: "Index Reference",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-search/index-definitions",
                collapsible: true,
                items: [
                  {
                    label: "Analyzers",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/atlas-search/analyzers",
                    collapsible: true,
                    items: [
                      {
                        label: "Standard",
                        contentSite: "cloud-docs",
                        url: "/docs/atlas/atlas-search/analyzers/standard",
                      },
                      {
                        label: "Simple",
                        contentSite: "cloud-docs",
                        url: "/docs/atlas/atlas-search/analyzers/simple",
                      },
                      {
                        label: "Whitespace",
                        contentSite: "cloud-docs",
                        url: "/docs/atlas/atlas-search/analyzers/whitespace",
                      },
                      {
                        label: "Keyword",
                        contentSite: "cloud-docs",
                        url: "/docs/atlas/atlas-search/analyzers/keyword",
                      },
                      {
                        label: "Language",
                        contentSite: "cloud-docs",
                        url: "/docs/atlas/atlas-search/analyzers/language",
                      },
                      {
                        label: "Multi",
                        contentSite: "cloud-docs",
                        url: "/docs/atlas/atlas-search/analyzers/multi",
                      },
                      {
                        label: "Custom",
                        contentSite: "cloud-docs",
                        url: "/docs/atlas/atlas-search/analyzers/custom",
                        collapsible: true,
                        items: [
                          {
                            label: "Character Filters",
                            contentSite: "cloud-docs",
                            url: "/docs/atlas/atlas-search/analyzers/character-filters",
                          },
                          {
                            label: "Tokenizers",
                            contentSite: "cloud-docs",
                            url: "/docs/atlas/atlas-search/analyzers/tokenizers",
                          },
                          {
                            label: "Token Filters",
                            contentSite: "cloud-docs",
                            url: "/docs/atlas/atlas-search/analyzers/token-filters",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    label: "Field Mappings",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/atlas-search/define-field-mappings",
                    collapsible: true,
                    items: [
                      {
                        label: "array",
                        contentSite: "cloud-docs",
                        url: "/docs/atlas/atlas-search/field-types/array-type",
                      },
                      {
                        label: "autocomplete",
                        contentSite: "cloud-docs",
                        url: "/docs/atlas/atlas-search/field-types/autocomplete-type",
                      },
                      {
                        label: "boolean",
                        contentSite: "cloud-docs",
                        url: "/docs/atlas/atlas-search/field-types/boolean-type",
                      },
                      {
                        label: "date",
                        contentSite: "cloud-docs",
                        url: "/docs/atlas/atlas-search/field-types/date-type",
                      },
                      {
                        label: "dateFacet",
                        contentSite: "cloud-docs",
                        url: "/docs/atlas/atlas-search/field-types/date-facet-type",
                      },
                      {
                        label: "document",
                        contentSite: "cloud-docs",
                        url: "/docs/atlas/atlas-search/field-types/document-type",
                      },
                      {
                        label: "embeddedDocuments",
                        contentSite: "cloud-docs",
                        url: "/docs/atlas/atlas-search/field-types/embedded-documents-type",
                      },
                      {
                        label: "geo",
                        contentSite: "cloud-docs",
                        url: "/docs/atlas/atlas-search/field-types/geo-type",
                      },
                      {
                        label: "knnVector",
                        contentSite: "cloud-docs",
                        url: "/docs/atlas/atlas-search/field-types/knn-vector",
                      },
                      {
                        label: "number",
                        contentSite: "cloud-docs",
                        url: "/docs/atlas/atlas-search/field-types/number-type",
                      },
                      {
                        label: "numberFacet",
                        contentSite: "cloud-docs",
                        url: "/docs/atlas/atlas-search/field-types/number-facet-type",
                      },
                      {
                        label: "objectId",
                        contentSite: "cloud-docs",
                        url: "/docs/atlas/atlas-search/field-types/object-id-type",
                      },
                      {
                        label: "string",
                        contentSite: "cloud-docs",
                        url: "/docs/atlas/atlas-search/field-types/string-type",
                      },
                      {
                        label: "stringFacet",
                        contentSite: "cloud-docs",
                        url: "/docs/atlas/atlas-search/field-types/string-facet-type",
                      },
                      {
                        label: "token",
                        contentSite: "cloud-docs",
                        url: "/docs/atlas/atlas-search/field-types/token-type",
                      },
                      {
                        label: "uuid",
                        contentSite: "cloud-docs",
                        url: "/docs/atlas/atlas-search/field-types/uuid-type",
                      },
                    ],
                  },
                  {
                    label: "Stored Source",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/atlas-search/stored-source-definition",
                  },
                  {
                    label: "Synonym Mappings",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/atlas-search/synonyms",
                  },
                  {
                    label: "Index Partitions",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/atlas-search/index-partition",
                  },
                ],
              },
              {
                label: "Query Reference",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-search/query-ref",
                collapsible: true,
                items: [
                  {
                    label: "Pipeline Stages",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/atlas-search/query-syntax",
                    collapsible: true,
                    items: [
                      {
                        label: "Documents: $search",
                        contentSite: "cloud-docs",
                        url: "/docs/atlas/atlas-search/aggregation-stages/search",
                      },
                      {
                        label: "Metadata: $searchMeta",
                        contentSite: "cloud-docs",
                        url: "/docs/atlas/atlas-search/aggregation-stages/searchMeta",
                      },
                    ],
                  },
                  {
                    label: "Operators & Collectors",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/atlas-search/operators-and-collectors",
                    collapsible: true,
                    items: [
                      {
                        label: "autocomplete",
                        contentSite: "cloud-docs",
                        url: "/docs/atlas/atlas-search/autocomplete",
                      },
                      {
                        label: "compound",
                        contentSite: "cloud-docs",
                        url: "/docs/atlas/atlas-search/compound",
                      },
                      {
                        label: "embedded-document",
                        contentSite: "cloud-docs",
                        url: "/docs/atlas/atlas-search/embedded-document",
                      },
                      {
                        label: "equals",
                        contentSite: "cloud-docs",
                        url: "/docs/atlas/atlas-search/equals",
                      },
                      {
                        label: "exists",
                        contentSite: "cloud-docs",
                        url: "/docs/atlas/atlas-search/exists",
                      },
                      {
                        label: "facet",
                        contentSite: "cloud-docs",
                        url: "/docs/atlas/atlas-search/facet",
                      },
                      {
                        label: "geoShape",
                        contentSite: "cloud-docs",
                        url: "/docs/atlas/atlas-search/geoShape",
                      },
                      {
                        label: "geoWithin",
                        contentSite: "cloud-docs",
                        url: "/docs/atlas/atlas-search/geoWithin",
                      },
                      {
                        label: "in",
                        contentSite: "cloud-docs",
                        url: "/docs/atlas/atlas-search/in",
                      },
                      {
                        label: "knnBeta (Deprecated)",
                        contentSite: "cloud-docs",
                        url: "/docs/atlas/atlas-search/knn-beta",
                      },
                      {
                        label: "morelikethis",
                        contentSite: "cloud-docs",
                        url: "/docs/atlas/atlas-search/morelikethis",
                      },
                      {
                        label: "near",
                        contentSite: "cloud-docs",
                        url: "/docs/atlas/atlas-search/near",
                      },
                      {
                        label: "phrase",
                        contentSite: "cloud-docs",
                        url: "/docs/atlas/atlas-search/phrase",
                      },
                      {
                        label: "queryString",
                        contentSite: "cloud-docs",
                        url: "/docs/atlas/atlas-search/queryString",
                      },
                      {
                        label: "range",
                        contentSite: "cloud-docs",
                        url: "/docs/atlas/atlas-search/range",
                      },
                      {
                        label: "regex",
                        contentSite: "cloud-docs",
                        url: "/docs/atlas/atlas-search/regex",
                      },
                      {
                        label: "span (Deprecated)",
                        contentSite: "cloud-docs",
                        url: "/docs/atlas/atlas-search/span",
                      },
                      {
                        label: "text",
                        contentSite: "cloud-docs",
                        url: "/docs/atlas/atlas-search/text",
                      },
                      {
                        label: "wildcard",
                        contentSite: "cloud-docs",
                        url: "/docs/atlas/atlas-search/wildcard",
                      },
                    ],
                  },
                  {
                    label: "Query Path",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/atlas-search/path-construction",
                  },
                  {
                    label: "Search Options",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/atlas-search/search-options",
                    collapsible: true,
                    items: [
                      {
                        label: "score",
                        contentSite: "cloud-docs",
                        url: "/docs/atlas/atlas-search/scoring",
                        collapsible: true,
                        items: [
                          {
                            label: "Score Options",
                            contentSite: "cloud-docs",
                            url: "/docs/atlas/atlas-search/score/modify-score",
                          },
                          {
                            label: "Score Details",
                            contentSite: "cloud-docs",
                            url: "/docs/atlas/atlas-search/score/get-details",
                          },
                        ],
                      },
                      {
                        label: "sort",
                        contentSite: "cloud-docs",
                        url: "/docs/atlas/atlas-search/sort",
                      },
                      {
                        label: "highlight",
                        contentSite: "cloud-docs",
                        url: "/docs/atlas/atlas-search/highlighting",
                      },
                      {
                        label: "count",
                        contentSite: "cloud-docs",
                        url: "/docs/atlas/atlas-search/counting",
                      },
                      {
                        label: "searchSequenceToken",
                        contentSite: "cloud-docs",
                        url: "/docs/atlas/atlas-search/paginate-results",
                      },
                      {
                        label: "tracking",
                        contentSite: "cloud-docs",
                        url: "/docs/atlas/atlas-search/tracking",
                      },
                    ],
                  },
                  {
                    label: "Performance Options",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/atlas-search/performance-options",
                    collapsible: true,
                    items: [
                      {
                        label: "concurrent",
                        contentSite: "cloud-docs",
                        url: "/docs/atlas/atlas-search/concurrent-query",
                      },
                      {
                        label: "returnStoredSource",
                        contentSite: "cloud-docs",
                        url: "/docs/atlas/atlas-search/return-stored-source",
                      },
                    ],
                  },
                ],
              },
              {
                label: "MongoDB Views Compatibility",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-search/view-support",
              },
              {
                label: "Search Playground",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-search/playground",
              },
            ],
          },
          {
            label: "Improve Accuracy",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-search/accuracy",
            collapsible: true,
            items: [
              {
                label: "Customize Score",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-search/customize-score",
              },
              {
                label: "Hybrid Search",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-search/tutorial/hybrid-search",
              },
              {
                label: "Synonyms",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-search/tutorial/synonyms-tutorial",
              },
              {
                label: "Explain Plan & Statistics",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-search/explain",
              },
            ],
          },
          {
            label: "Improve Performance",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-search/performance",
            collapsible: true,
            items: [
              {
                label: "Indexes",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-search/performance/index-performance",
              },
              {
                label: "Queries",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-search/performance/query-performance",
              },
            ],
          },
          {
            label: "Deployment Options",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-search/about/deployment-options",
          },
          {
            label: "Monitor Atlas Search",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-search/monitoring",
            collapsible: true,
            items: [
              {
                label: "Manage Alerts",
                contentSite: "cloud-docs",
                url: "/docs/atlas/reference/alert-resolutions/atlas-search-alerts",
              },
              {
                label: "Review Metrics",
                contentSite: "cloud-docs",
                url: "/docs/atlas/review-atlas-search-metrics",
              },
              {
                label: "View Query Analytics",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-search/view-query-analytics",
              },
            ],
          },
          {
            label: "Design Search for Your Data Model",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-search/design-patterns",
            collapsible: true,
            items: [
              {
                label: "Search Non-Alphabetical Data as Strings",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-search/tutorial/string-operators-tutorial",
              },
              {
                label: "Embedded Documents",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-search/tutorial/embedded-documents-tutorial",
              },
              {
                label: "Multiple Collections",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-search/tutorial/cross-collection-tutorials",
              },
            ],
          },
          {
            label: "Compatibility & Limitations",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-search/about/feature-compatibility",
          },
          {
            label: "Changelog",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-search/changelog",
          },
        ],
      },
      {
        label: "Atlas Vector Search",
        contentSite: "cloud-docs",
        url: "/docs/atlas/atlas-vector-search/vector-search-overview",
        collapsible: true,
        items: [
          {
            label: "Quick Start",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-vector-search/tutorials/vector-search-quick-start",
          },
          {
            label: "Create Embeddings",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-vector-search/create-embeddings",
          },
          {
            label: "Create and Manage Indexes",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-vector-search/vector-search-type",
          },
          {
            label: "Create and Run Queries",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-vector-search/vector-search-stage",
            collapsible: true,
            items: [
              {
                label: "Explain Query Results",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-vector-search/explain",
              },
            ],
          },
          {
            label: "Hybrid Search",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-vector-search/hybrid-search",
            collapsible: true,
            items: [
              {
                label: "Combined Vector Search and Full-Text Search",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-vector-search/hybrid-search/vector-search-with-full-text-search",
              },
              {
                label: "Combined Vector Search",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-vector-search/hybrid-search/vector-search-with-rankfusion",
              },
            ],
          },
          {
            label: "MongoDB Views Compatibility",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-vector-search/view-support",
          },
          {
            label: "Vector Quantization",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-vector-search/vector-quantization",
          },
          {
            label: "Retrieval-Augmented Generation (RAG)",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-vector-search/rag",
          },
          {
            label: "Build AI Agents",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-vector-search/ai-agents",
          },
          {
            label: "Review Deployment Options",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-vector-search/deployment-options",
          },
          {
            label: "Tutorials",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-vector-search/tutorials",
            collapsible: true,
            items: [
              {
                label: "Semantic Search for Text",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-vector-search/tutorials/vector-search-tutorial",
              },
              {
                label: "Local RAG",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-vector-search/tutorials/local-rag",
              },
              {
                label: "Automatic Quantization with Voyage AI Embeddings",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-vector-search/tutorials/auto-quantize-with-voyage-ai",
              },
            ],
          },
          {
            label: "AI Integrations",
            contentSite: "cloud-docs",
            url: "/docs/atlas/ai-integrations/",
          },
          {
            label: "Improve Accuracy",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-vector-search/improve-accuracy",
          },
          {
            label: "Improve Performance",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-vector-search/tune-vector-search",
          },
          {
            label: "Multi-Tenant Architecture",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-vector-search/multi-tenant-architecture",
          },
          {
            label: "Troubleshooting",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-vector-search/troubleshooting",
          },
          {
            label: "Changelog",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-vector-search/changelog",
          },
        ],
      },
      {
        label: "AI Integrations",
        contentSite: "cloud-docs",
        url: "/docs/atlas/ai-integrations",
        collapsible: true,
        items: [
          {
            label: "Frameworks",
            contentSite: "cloud-docs",
            url: "/docs/atlas/ai-integrations/frameworks",
            collapsible: true,
            items: [
              {
                label: "LangChain",
                contentSite: "cloud-docs",
                url: "/docs/atlas/ai-integrations/langchain",
                collapsible: true,
                items: [
                  {
                    label: "Get Started",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/ai-integrations/langchain/get-started",
                  },
                  {
                    label: "Memory and Semantic Caching",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/ai-integrations/langchain/memory-semantic-cache",
                  },
                  {
                    label: "Hybrid Search",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/ai-integrations/langchain/hybrid-search",
                  },
                  {
                    label: "Parent Document Retrieval",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/ai-integrations/langchain/parent-document-retrieval",
                  },
                  {
                    label: "Local RAG",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/ai-integrations/langchain/local-rag",
                  },
                  {
                    label: "GraphRAG",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/ai-integrations/langchain/graph-rag",
                  },
                  {
                    label: "Natural Language Queries",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/ai-integrations/langchain/natural-language-to-mql",
                  },
                ],
              },
              {
                label: "LangChain JS/TS",
                contentSite: "cloud-docs",
                url: "/docs/atlas/ai-integrations/langchain-js",
              },
              {
                label: "LangChainGo",
                contentSite: "cloud-docs",
                url: "/docs/atlas/ai-integrations/langchaingo",
              },
              {
                label: "LangChain4j",
                contentSite: "cloud-docs",
                url: "/docs/atlas/ai-integrations/langchain4j",
              },
              {
                label: "LlamaIndex",
                contentSite: "cloud-docs",
                url: "/docs/atlas/ai-integrations/llamaindex",
              },
              {
                label: "Semantic Kernel",
                contentSite: "cloud-docs",
                url: "/docs/atlas/ai-integrations/semantic-kernel",
                collapsible: true,
                items: [
                  {
                    label: "Python Integration",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/ai-integrations/semantic-kernel-python",
                  },
                  {
                    label: "C# Integration",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/ai-integrations/semantic-kernel-csharp",
                  },
                ],
              },
              {
                label: "Haystack",
                contentSite: "cloud-docs",
                url: "/docs/atlas/ai-integrations/haystack",
              },
              {
                label: "Spring AI",
                contentSite: "cloud-docs",
                url: "/docs/atlas/ai-integrations/spring-ai",
              },
            ],
          },
          {
            label: "Agent Frameworks",
            contentSite: "cloud-docs",
            url: "/docs/atlas/ai-integrations/agent-frameworks",
            collapsible: true,
            items: [
              {
                label: "LangGraph",
                contentSite: "cloud-docs",
                url: "/docs/atlas/ai-integrations/langgraph",
                collapsible: true,
                items: [
                  {
                    label: "Build AI Agents",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/ai-integrations/langgraph/build-agents",
                  },
                ],
              },
              {
                label: "LangGraph.js",
                contentSite: "cloud-docs",
                url: "/docs/atlas/ai-integrations/langgraph-js",
                collapsible: true,
                items: [
                  {
                    label: "Build AI Agents",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/ai-integrations/langgraph-js/build-agents",
                  },
                ],
              },
            ],
          },
          {
            label: "Platforms",
            contentSite: "cloud-docs",
            url: "/docs/atlas/ai-integrations/platforms",
            collapsible: true,
            items: [
              {
                label: "Amazon Bedrock",
                contentSite: "cloud-docs",
                url: "/docs/atlas/ai-integrations/amazon-bedrock",
                collapsible: true,
                items: [
                  {
                    label: "Hybrid Search",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/ai-integrations/amazon-bedrock/hybrid-search",
                  },
                  {
                    label: "Troubleshooting",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/ai-integrations/amazon-bedrock/troubleshooting",
                  },
                ],
              },
              {
                label: "Google Vertex AI",
                contentSite: "cloud-docs",
                url: "/docs/atlas/ai-integrations/google-vertex-ai",
                collapsible: true,
                items: [
                  {
                    label: "Vertex AI Extensions",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/ai-integrations/google-vertex-ai/extensions",
                  },
                  {
                    label: "Vertex AI Agent Engine",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/ai-integrations/google-vertex-ai/agent-engine",
                  },
                ],
              },
            ],
          },
          {
            label: "Tools",
            contentSite: "cloud-docs",
            url: "/docs/atlas/ai-integrations/tools",
            collapsible: true,
            items: [
              {
                label: "MCP Server",
                contentSite: "mcp-server",
                url: "/docs/mcp-server/",
              },
            ],
          },
          {
            label: "API Resources",
            contentSite: "cloud-docs",
            url: "/docs/atlas/ai-integrations/ai-api-resources",
            collapsible: true,
            items: [
              {
                label: "LangChain Python API Reference",
                isExternal: true,
                url: "https://langchain-mongodb.readthedocs.io/en/latest/langchain_mongodb/api_docs.html",
              },
              {
                label: "LangChain JS/TS API Reference",
                isExternal: true,
                url: "https://api.js.langchain.com/modules/langchain_mongodb.html",
              },
              {
                label: "LangGraph API Reference",
                isExternal: true,
                url: "https://langchain-mongodb.readthedocs.io/en/latest/langgraph_checkpoint_mongodb/api_docs.html",
              },
              {
                label: "LangGraph.js API Reference",
                isExternal: true,
                url: "https://langchain-ai.github.io/langgraphjs/reference/classes/checkpoint_mongodb.MongoDBSaver.html",
              },
              {
                label: "LangChainGo API Reference",
                isExternal: true,
                url: "https://pkg.go.dev/github.com/tmc/langchaingo",
              },
              {
                label: "LangChain4j API Reference",
                isExternal: true,
                url: "https://docs.langchain4j.dev/apidocs/index.html",
              },
              {
                label: "LlamaIndex API Reference",
                isExternal: true,
                url: "https://docs.llamaindex.ai/en/stable/api_reference/storage/vector_store/mongodb/",
              },
              {
                label: "Semantic Kernel C# API Reference",
                isExternal: true,
                url: "https://learn.microsoft.com/en-us/dotnet/api/microsoft.semantickernel.connectors.mongodb",
              },
              {
                label: "Haystack API Reference",
                isExternal: true,
                url: "https://docs.haystack.deepset.ai/reference/integrations-mongodb-atlas",
              },
              {
                label: "Spring AI API Reference",
                isExternal: true,
                url: "https://docs.spring.io/spring-ai/docs/current/api/org/springframework/ai/vectorstore/package-summary.html",
              },
            ],
          },
        ],
      },
      {
        label: "Atlas Stream Processing",
        contentSite: "cloud-docs",
        url: "/docs/atlas/atlas-stream-processing",
        collapsible: true,
        items: [
          {
            label: "Overview",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-stream-processing/overview",
          },
          {
            label: "Get Started",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-stream-processing/tutorial",
          },
          {
            label: "Stream Processor Windows",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-stream-processing/windows",
          },
          {
            label: "Security",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-stream-processing/security",
          },
          {
            label: "Manage Stream Processing Instances",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-stream-processing/manage-processing-instance",
          },
          {
            label: "Manage Connections",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-stream-processing/manage-connection-registry",
            collapsible: true,
            items: [
              {
                label: "Kafka Connections",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-stream-processing/kafka-connection",
              },
              {
                label: "Atlas Connections",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-stream-processing/atlas-connection",
              },
              {
                label: "HTTPS Connections",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-stream-processing/https-connection",
              },
              {
                label: "S3 Connections",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-stream-processing/s3-connection",
              },
              {
                label: "External Functions Connections",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-stream-processing/external-function-connection",
              },
            ],
          },
          {
            label: "Manage Stream Processors",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-stream-processing/manage-stream-processor",
          },
          {
            label: "Manage VPC Peering Connections",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-stream-processing/manage-vpc-peering-connections",
          },
          {
            label: "Aggregation Expressions",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-stream-processing/stream-aggregation-expression",
            collapsible: true,
            items: [
              {
                label: "$convert",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-stream-processing/sp-agg-convert",
              },
              {
                label: "$currentDate",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-stream-processing/sp-agg-currentdate",
              },
              {
                label: "$meta",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-stream-processing/sp-agg-meta",
              },
              {
                label: "$createUUID",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-stream-processing/sp-agg-createuuid",
              },
            ],
          },
          {
            label: "Aggregation Pipelines",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-stream-processing/stream-aggregation",
            collapsible: true,
            items: [
              {
                label: "$source",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-stream-processing/sp-agg-source",
              },
              {
                label: "$validate",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-stream-processing/sp-agg-validate",
              },
              {
                label: "$https",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-stream-processing/sp-agg-https",
              },
              {
                label: "$lookup",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-stream-processing/sp-agg-lookup",
              },
              {
                label: "$hoppingWindow",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-stream-processing/sp-agg-hopping",
              },
              {
                label: "$tumblingWindow",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-stream-processing/sp-agg-tumbling",
              },
              {
                label: "$emit",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-stream-processing/sp-agg-emit",
              },
              {
                label: "$merge",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-stream-processing/sp-agg-merge",
              },
              {
                label: "$externalFunction",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-stream-processing/sp-agg-externalFunction",
              },
              {
                label: "$sessionWindow",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-stream-processing/sp-agg-session",
              },
            ],
          },
          {
            label: "Monitoring",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-stream-processing/monitoring",
          },
          {
            label: "Limitations",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-stream-processing/limitations",
          },
          {
            label: "Changelog",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-stream-processing/changelog",
          },
        ],
      },
      {
        label: "Backup, Restore, and Archive",
        contentSite: "cloud-docs",
        url: "/docs/atlas/backup-restore-cluster",
        collapsible: true,
        items: [
          {
            label: "Backup",
            contentSite: "cloud-docs",
            url: "/docs/atlas/backup/cloud-backup/overview",
            collapsible: true,
            items: [
              {
                label: "Dedicated Cluster",
                contentSite: "cloud-docs",
                url: "/docs/atlas/backup/cloud-backup/dedicated-cluster-backup",
              },
              {
                label: "Flex Cluster",
                contentSite: "cloud-docs",
                url: "/docs/atlas/backup/cloud-backup/flex-cluster-backup",
              },
              {
                label: "Serverless Instance (Deprecated)",
                contentSite: "cloud-docs",
                url: "/docs/atlas/backup/cloud-backup/serverless-backup",
              },
              {
                label: "Options",
                contentSite: "cloud-docs",
                url: "/docs/atlas/backup/cloud-backup/scheduling",
                collapsible: true,
                items: [
                  {
                    label: "Backup Policies",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/backup/cloud-backup/configure-backup-policy",
                  },
                  {
                    label: "Snapshots",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/backup/cloud-backup/snapshot-management",
                  },
                  {
                    label: "Copy to Region",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/backup/cloud-backup/snapshot-distribution",
                  },
                ],
              },
              {
                label: "Compliance Policies",
                contentSite: "cloud-docs",
                url: "/docs/atlas/backup/cloud-backup/backup-compliance-policy",
              },
            ],
          },
          {
            label: "Encryption",
            contentSite: "cloud-docs",
            url: "/docs/atlas/backup/cloud-backup/cloud-backup-encryption",
            collapsible: true,
            items: [
              {
                label: "Access Encrypted Snapshots",
                contentSite: "cloud-docs",
                url: "/docs/atlas/tutorial/access-encrypted-snapshot",
              },
              {
                label: "Restore Using Encryption at Rest",
                contentSite: "cloud-docs",
                url: "/docs/atlas/backup/cloud-backup/restore-from-ear",
              },
            ],
          },
          {
            label: "Export Snapshots",
            contentSite: "cloud-docs",
            url: "/docs/atlas/backup/cloud-backup/export",
          },
          {
            label: "Restore Sources",
            contentSite: "cloud-docs",
            url: "/docs/atlas/backup/cloud-backup/restore-overview",
            collapsible: true,
            items: [
              {
                label: "Restore from Snapshot",
                contentSite: "cloud-docs",
                url: "/docs/atlas/backup/cloud-backup/restore-from-snapshot",
              },
              {
                label: "Restore from Continuous Cloud Backup",
                contentSite: "cloud-docs",
                url: "/docs/atlas/backup/cloud-backup/restore-from-continuous",
              },
              {
                label: "Restore from Another Project",
                contentSite: "cloud-docs",
                url: "/docs/atlas/backup/cloud-backup/aws-cross-project",
              },
              {
                label: "Restore from Local Download",
                contentSite: "cloud-docs",
                url: "/docs/atlas/backup/cloud-backup/restore-from-local-file",
              },
              {
                label: "Restore from Cloud Manager Snapshot",
                contentSite: "cloud-docs",
                url: "/docs/atlas/backup/cloud-backup/restore-from-cloud-manager",
              },
              {
                label: "Restore from Archive",
                contentSite: "cloud-docs",
                url: "/docs/atlas/backup/cloud-backup/import-archive",
              },
            ],
          },
          {
            label: "Online Archive",
            contentSite: "cloud-docs",
            url: "/docs/atlas/online-archive/manage-online-archive",
            collapsible: true,
            items: [
              {
                label: "Configure Online Archive",
                contentSite: "cloud-docs",
                url: "/docs/atlas/online-archive/configure-online-archive",
              },
              {
                label: "Set Up a Private Endpoint",
                contentSite: "cloud-docs",
                url: "/docs/atlas/online-archive/config-private-endpoint",
              },
              {
                label: "Connect to Online Archive",
                contentSite: "cloud-docs",
                url: "/docs/atlas/online-archive/connect-to-online-archive",
              },
              {
                label: "Manage Online Archives",
                contentSite: "cloud-docs",
                url: "/docs/atlas/online-archive/query-online-archive",
              },
              {
                label: "Manage Private Endpoints",
                contentSite: "cloud-docs",
                url: "/docs/atlas/online-archive/view-private-endpoints",
              },
              {
                label: "Pause and Resume",
                contentSite: "cloud-docs",
                url: "/docs/atlas/online-archive/pause-resume-online-archive",
              },
              {
                label: "Back Up Online Archive",
                contentSite: "cloud-docs",
                url: "/docs/atlas/online-archive/config-backup-online-archive",
              },
              {
                label: "Restore Archived Data",
                contentSite: "cloud-docs",
                url: "/docs/atlas/online-archive/restore-archived-data",
              },
              {
                label: "Download Query Logs",
                contentSite: "cloud-docs",
                url: "/docs/atlas/online-archive/download-query-logs",
              },
            ],
          },
        ],
      },
      {
        label: "Resource Tags",
        contentSite: "cloud-docs",
        url: "/docs/atlas/tags",
        collapsible: true,
        items: [
          {
            label: "Tags on Clusters",
            contentSite: "cloud-docs",
            url: "/docs/atlas/database-deployment-tags",
          },
          {
            label: "Tags on Projects",
            contentSite: "cloud-docs",
            url: "/docs/atlas/project-tags",
          },
        ],
      },
      {
        label: "Manage Clusters",
        contentSite: "cloud-docs",
        url: "/docs/atlas/manage-database-deployments",
        collapsible: true,
        items: [
          {
            label: "Clusters",
            contentSite: "cloud-docs",
            url: "/docs/atlas/manage-clusters",
            collapsible: true,
            items: [
              {
                label: "Storage",
                contentSite: "cloud-docs",
                url: "/docs/atlas/customize-storage",
              },
              {
                label: "Auto-Scaling",
                contentSite: "cloud-docs",
                url: "/docs/atlas/cluster-autoscaling",
              },
              {
                label: "Additional Settings",
                contentSite: "cloud-docs",
                url: "/docs/atlas/cluster-additional-settings",
              },
              {
                label: "Modify a Cluster",
                contentSite: "cloud-docs",
                url: "/docs/atlas/scale-cluster",
                collapsible: true,
                items: [
                  {
                    label: "Recover from an Outage",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/reconfigure-replica-set-during-regional-outage",
                  },
                ],
              },
              {
                label: "Major MongoDB Version",
                contentSite: "cloud-docs",
                url: "/docs/atlas/tutorial/major-version-change",
              },
              {
                label: "Maintenance Windows",
                contentSite: "cloud-docs",
                url: "/docs/atlas/tutorial/cluster-maintenance-window",
              },
              {
                label: "Stop, Start, or Delete",
                contentSite: "cloud-docs",
                url: "/docs/atlas/pause-terminate-cluster",
              },
              {
                label: "Restore a Free Tier Cluster",
                contentSite: "cloud-docs",
                url: "/docs/atlas/backup/restore-free-tier-cluster",
              },
              {
                label: "HA and Workload Isolation",
                contentSite: "cloud-docs",
                url: "/docs/atlas/cluster-config/multi-cloud-distribution",
              },
              {
                label: "Pre-Defined Tags",
                contentSite: "cloud-docs",
                url: "/docs/atlas/reference/replica-set-tags",
              },
            ],
          },
          {
            label: "Serverless Instances (deprecated)",
            contentSite: "cloud-docs",
            url: "/docs/atlas/manage-serverless-instances",
            collapsible: true,
            items: [
              {
                label: "Configure Backup",
                contentSite: "cloud-docs",
                url: "/docs/atlas/configure-serverless-backup",
              },
              {
                label: "Auto-Create Indexes",
                contentSite: "cloud-docs",
                url: "/docs/atlas/performance-advisor/auto-index-serverless",
              },
              {
                label: "Convert to Dedicated",
                contentSite: "cloud-docs",
                url: "/docs/atlas/tutorial/convert-serverless-to-dedicated",
              },
              {
                label: "Terminate",
                contentSite: "cloud-docs",
                url: "/docs/atlas/terminate-serverless-instance",
              },
            ],
          },
          {
            label: "Global Clusters",
            contentSite: "cloud-docs",
            url: "/docs/atlas/global-clusters",
            collapsible: true,
            items: [
              {
                label: "Shard a Global Collection",
                contentSite: "cloud-docs",
                url: "/docs/atlas/shard-global-collection",
              },
              {
                label: "Move a Cluster",
                contentSite: "cloud-docs",
                url: "/docs/atlas/tutorial/move-cluster",
              },
            ],
          },
        ],
      },
      {
        label: "Monitor Clusters",
        contentSite: "cloud-docs",
        url: "/docs/atlas/monitoring-alerts",
        collapsible: true,
        items: [
          {
            label: "Analyze Slow Queries",
            contentSite: "cloud-docs",
            url: "/docs/atlas/analyze-slow-queries",
            collapsible: true,
            items: [
              {
                label: "Performance Advisor",
                contentSite: "cloud-docs",
                url: "/docs/atlas/performance-advisor",
                collapsible: true,
                items: [
                  {
                    label: "Index Ranking",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/performance-advisor/index-ranking",
                  },
                  {
                    label: "Drop Index Suggestions",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/performance-advisor/drop-indexes",
                  },
                  {
                    label: "Enable or Disable",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/performance-advisor/enable-disable",
                  },
                ],
              },
              {
                label: "Query Latency",
                contentSite: "cloud-docs",
                url: "/docs/atlas/namespace-insights",
              },
              {
                label: "Query Performance",
                contentSite: "cloud-docs",
                url: "/docs/atlas/tutorial/query-profiler",
              },
              {
                label: "Real-Time Performance",
                contentSite: "cloud-docs",
                url: "/docs/atlas/real-time-performance-panel",
              },
              {
                label: "Search Performance",
                contentSite: "cloud-docs",
                url: "/docs/atlas/performance-advisor/recommend-search-text",
              },
            ],
          },
          {
            label: "Improve Your Schema",
            contentSite: "cloud-docs",
            url: "/docs/atlas/performance-advisor/schema-suggestions",
            collapsible: true,
            items: [
              {
                label: "Reduce $lookup",
                contentSite: "cloud-docs",
                url: "/docs/atlas/schema-suggestions/reduce-lookup-operations",
              },
              {
                label: "Avoid Unbounded Arrays",
                contentSite: "cloud-docs",
                url: "/docs/atlas/schema-suggestions/avoid-unbounded-arrays",
              },
              {
                label: "Remove Unused Indexes",
                contentSite: "cloud-docs",
                url: "/docs/atlas/schema-suggestions/too-many-indexes",
              },
              {
                label: "Reduce Document Size",
                contentSite: "cloud-docs",
                url: "/docs/atlas/schema-suggestions/reduce-document-size",
              },
              {
                label: "Reduce Collections",
                contentSite: "cloud-docs",
                url: "/docs/atlas/schema-suggestions/too-many-collections",
              },
              {
                label: "Avoid Regex",
                contentSite: "cloud-docs",
                url: "/docs/atlas/schema-suggestions/case-insensitive-regex",
              },
            ],
          },
          {
            label: "Configure and Resolve Alerts",
            contentSite: "cloud-docs",
            url: "/docs/atlas/alerts",
            collapsible: true,
            items: [
              {
                label: "Alert Basics",
                contentSite: "cloud-docs",
                url: "/docs/atlas/alert-basics",
              },
              {
                label: "Review Alert Conditions",
                contentSite: "cloud-docs",
                url: "/docs/atlas/reference/alert-conditions",
              },
              {
                label: "Configure Alert Settings",
                contentSite: "cloud-docs",
                url: "/docs/atlas/configure-alerts",
              },
              {
                label: "Resolve Alerts",
                contentSite: "cloud-docs",
                url: "/docs/atlas/alert-resolutions",
                collapsible: true,
                items: [
                  {
                    label: "Auto-scaling",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/reference/alert-resolutions/atlas-autoscaling-alerts",
                  },
                  {
                    label: "Atlas Search",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/reference/alert-resolutions/atlas-search-alerts",
                  },
                  {
                    label: "Connection",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/reference/alert-resolutions/connection-alerts",
                  },
                  {
                    label: "IOPS",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/reference/alert-resolutions/disk-io-utilization",
                  },
                  {
                    label: "Storage",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/reference/alert-resolutions/disk-space-used",
                  },
                  {
                    label: "Query",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/reference/alert-resolutions/query-targeting",
                  },
                  {
                    label: "Lost Primary",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/reference/alert-resolutions/no-primary",
                  },
                  {
                    label: "Oplog",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/reference/alert-resolutions/replication-oplog",
                  },
                  {
                    label: "CPU Usage",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/reference/alert-resolutions/system-cpu-usage",
                  },
                ],
              },
            ],
          },
          {
            label: "Review Metrics",
            contentSite: "cloud-docs",
            url: "/docs/atlas/monitor-cluster-metrics",
            collapsible: true,
            items: [
              {
                label: "Project Overview",
                contentSite: "cloud-docs",
                url: "/docs/atlas/review-all-cluster-metrics",
              },
              {
                label: "Serverless (Deprecated)",
                contentSite: "cloud-docs",
                url: "/docs/atlas/review-serverless-metrics",
              },
              {
                label: "Replica Sets",
                contentSite: "cloud-docs",
                url: "/docs/atlas/review-replica-set-metrics",
              },
              {
                label: "Sharded Clusters",
                contentSite: "cloud-docs",
                url: "/docs/atlas/review-sharded-cluster-metrics",
              },
              {
                label: "Processes",
                contentSite: "cloud-docs",
                url: "/docs/atlas/review-mongodb-process-metrics",
              },
              {
                label: "Real-Time Metrics",
                contentSite: "cloud-docs",
                url: "/docs/atlas/review-real-time-metrics",
              },
              {
                label: "Atlas Search",
                contentSite: "cloud-docs",
                url: "/docs/atlas/review-atlas-search-metrics",
              },
              {
                label: "Available Metrics",
                contentSite: "cloud-docs",
                url: "/docs/atlas/review-available-metrics",
              },
            ],
          },
          {
            label: "Third-Party Services",
            contentSite: "cloud-docs",
            url: "/docs/atlas/tutorial/third-party-service-integrations",
            collapsible: true,
            items: [
              {
                label: "Datadog",
                contentSite: "cloud-docs",
                url: "/docs/atlas/tutorial/datadog-integration",
              },
              {
                label: "Microsoft Teams",
                contentSite: "cloud-docs",
                url: "/docs/atlas/tutorial/integrate-msft-teams",
              },
              {
                label: "PagerDuty",
                contentSite: "cloud-docs",
                url: "/docs/atlas/tutorial/pagerduty-integration",
              },
              {
                label: "Prometheus",
                contentSite: "cloud-docs",
                url: "/docs/atlas/tutorial/prometheus-integration",
              },
            ],
          },
          {
            label: "Review and Download Logs",
            contentSite: "cloud-docs",
            url: "/docs/atlas/mongodb-logs",
          },
          {
            label: "Push MongoDB Logs to AWS S3",
            contentSite: "cloud-docs",
            url: "/docs/atlas/push-logs",
          },
        ],
      },
      {
        label: "Related Services",
        contentSite: "cloud-docs",
        url: "/docs/atlas/integrate",
        collapsible: true,
        items: [
          {
            label: "Triggers",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-ui/triggers/",
          },
          {
            label: "MongoDB Charts",
            contentSite: "charts",
            url: "/docs/charts/",
          },
          {
            label: "Partner Integrations",
            contentSite: "cloud-docs",
            url: "/docs/atlas/partner-integrations",
            collapsible: true,
            items: [
              {
                label: "Explore Ecosystem",
                contentSite: "cloud-docs",
                url: "/docs/atlas/reference/partner-integrations/explore-ecosystem",
              },
              {
                label: "Integrate with Render",
                contentSite: "cloud-docs",
                url: "/docs/atlas/reference/partner-integrations/render",
              },
              {
                label: "Integrate with Vercel",
                contentSite: "cloud-docs",
                url: "/docs/atlas/reference/partner-integrations/vercel",
              },
              {
                label: "Integrate with Azure",
                contentSite: "cloud-docs",
                url: "/docs/atlas/reference/partner-integrations/azure",
              },
            ],
          },
        ],
      },
      {
        label: "Manage Billing",
        contentSite: "cloud-docs",
        url: "/docs/atlas/billing",
        collapsible: true,
        items: [
          {
            label: "Invoices",
            contentSite: "cloud-docs",
            url: "/docs/atlas/billing/invoices",
          },
          {
            label: "Invoice Breakdown",
            contentSite: "cloud-docs",
            url: "/docs/atlas/billing/invoice-breakdown",
          },
          {
            label: "Subscriptions",
            contentSite: "cloud-docs",
            url: "/docs/atlas/billing/subscriptions",
          },
          {
            label: "Billing Optimization",
            contentSite: "cloud-docs",
            url: "/docs/atlas/billing/billing-breakdown-optimization",
          },
          {
            label: "Cluster Configuration",
            contentSite: "cloud-docs",
            url: "/docs/atlas/billing/cluster-configuration-costs",
          },
          {
            label: "Costs for Serverless Instances (deprecated)",
            contentSite: "cloud-docs",
            url: "/docs/atlas/billing/serverless-instance-costs",
          },
          {
            label: "Atlas Flex Costs",
            contentSite: "cloud-docs",
            url: "/docs/atlas/billing/atlas-flex-costs",
          },
          {
            label: "Data Federation",
            contentSite: "cloud-docs",
            url: "/docs/atlas/billing/data-federation",
          },
          {
            label: "Data Transfer",
            contentSite: "cloud-docs",
            url: "/docs/atlas/billing/data-transfer-costs",
          },
          {
            label: "Stream Processing",
            contentSite: "cloud-docs",
            url: "/docs/atlas/billing/stream-processing-costs",
          },
          {
            label: "Online Archive",
            contentSite: "cloud-docs",
            url: "/docs/atlas/billing/online-archive",
          },
          {
            label: "Search Nodes",
            contentSite: "cloud-docs",
            url: "/docs/atlas/billing/search-node",
          },
          {
            label: "AWS Marketplace",
            contentSite: "cloud-docs",
            url: "/docs/atlas/billing/aws-self-serve-marketplace",
          },
          {
            label: "Azure Marketplace",
            contentSite: "cloud-docs",
            url: "/docs/atlas/billing/azure-self-serve-marketplace",
          },
          {
            label: "GCP Marketplace",
            contentSite: "cloud-docs",
            url: "/docs/atlas/billing/gcp-self-serve-marketplace",
          },
          {
            label: "Additional Services",
            contentSite: "cloud-docs",
            url: "/docs/atlas/billing/additional-services",
          },
          {
            label: "International Usage & Taxes",
            contentSite: "cloud-docs",
            url: "/docs/atlas/billing/international-usage",
          },
        ],
      },
      {
        label: "Programmatic Access",
        contentSite: "cloud-docs",
        url: "/docs/atlas/api",
        collapsible: true,
        items: [
          {
            label: "Atlas Administration API",
            contentSite: "cloud-docs",
            url: "/docs/atlas/api/atlas-admin-api",
            collapsible: true,
            items: [
              {
                label: "Get Started",
                contentSite: "cloud-docs",
                url: "/docs/atlas/configure-api-access",
                collapsible: true,
                items: [
                  {
                    label: "Organization Access",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/configure-api-access-org",
                  },
                  {
                    label: "Multiple Organizations",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/configure-api-access-mult-org",
                  },
                  {
                    label: "Project Access",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/configure-api-access-project",
                  },
                ],
              },
              {
                label: "Admin API Overview",
                contentSite: "cloud-docs",
                url: "/docs/atlas/api/atlas-admin-api-ref",
              },
              {
                label: "API Authentication",
                contentSite: "cloud-docs",
                url: "/docs/atlas/api/api-authentication",
              },
              {
                label: "Service Accounts Overview",
                contentSite: "cloud-docs",
                url: "/docs/atlas/api/service-accounts-overview",
              },
              {
                label: "Rotate Service Account Secrets",
                contentSite: "cloud-docs",
                url: "/docs/atlas/tutorial/rotate-service-account-secrets",
              },
              {
                label: "Versioning Overview",
                contentSite: "cloud-docs",
                url: "/docs/atlas/api/versioned-api-overview",
              },
              {
                label: "Migrate to New API Version",
                contentSite: "cloud-docs",
                url: "/docs/atlas/api/migrate-to-new-version",
              },
              {
                label: "API Upgrades",
                contentSite: "cloud-docs",
                url: "/docs/atlas/api/api-upgrades",
              },
              {
                label: "v2.0 API Specification",
                contentSite: "cloud-docs",
                url: "/docs/atlas/reference/api-resources-spec/v2",
              },
              {
                label: "V1.0 API Specification",
                contentSite: "cloud-docs",
                url: "/docs/atlas/reference/api-resources-spec/v1",
              },
              {
                label: "Versioned API Changelog",
                contentSite: "cloud-docs",
                url: "/docs/atlas/reference/api-resources-spec/changelog",
              },
              {
                label: "API Error Codes",
                contentSite: "cloud-docs",
                url: "/docs/atlas/reference/api-errors",
              },
              {
                label: "Atlas Go SDK",
                contentSite: "cloud-docs",
                url: "/docs/atlas/sdk",
                collapsible: true,
                items: [
                  {
                    label: "Authentication",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/sdk/go/authentication",
                  },
                  {
                    label: "Fundamentals",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/sdk/go/concepts",
                  },
                  {
                    label: "Error Handling",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/sdk/go/error_handling",
                  },
                  {
                    label: "Migration",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/sdk/go/migration",
                  },
                  {
                    label: "Best Practices",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/sdk/go/best_practices",
                  },
                  {
                    label: "Reference",
                    isExternal: true,
                    url: "https://github.com/mongodb/atlas-sdk-go/blob/main/docs/doc_last_reference.md",
                  },
                ],
              },
              {
                label: "More API Resources",
                contentSite: "cloud-docs",
                url: "/docs/atlas/reference/more-api-resources",
                collapsible: true,
                items: [
                  {
                    label: "Return the Latest Targets for Prometheus",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/reference/third-party-integration-settings-discovery",
                  },
                  {
                    label: "Custom Role Actions",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/reference/custom-role-actions",
                  },
                  {
                    label: "Generate Service Account Token",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/api/service-accounts/generate-oauth2-token",
                  },
                  {
                    label: "Revoke Service Account Token",
                    contentSite: "cloud-docs",
                    url: "/docs/atlas/api/service-accounts/revoke-oauth2-token",
                  },
                ],
              },
            ],
          },
          {
            label: "Infrastructure as Code",
            contentSite: "cloud-docs",
            url: "/docs/atlas/infrastructure",
            collapsible: true,
            items: [
              {
                label: "Atlas Kubernetes Operator",
                contentSite: "atlas-operator",
                url: "/docs/atlas/operator/current/",
              },
              {
                label: "Verified HashiCorp Terraform Example",
                contentSite: "cloud-docs",
                url: "/docs/atlas/terraform",
              },
              {
                label: "HashiCorp Terraform",
                isExternal: true,
                url: "https://registry.terraform.io/providers/mongodb/mongodbatlas/latest/docs/",
              },
              {
                label: "AWS CloudFormation",
                isExternal: true,
                url: "https://github.com/mongodb/mongodbatlas-cloudformation-resources",
              },
              {
                label: "GraphQL APIs on AWS",
                contentSite: "cloud-docs",
                url: "/docs/atlas/graphql-api",
              },
              {
                label: "Migrate to Flex Clusters",
                contentSite: "cloud-docs",
                url: "/docs/atlas/flex-migration",
              },
            ],
          },
        ],
      },
      {
        label: "Reference",
        contentSite: "cloud-docs",
        url: "/docs/atlas/reference",
        collapsible: true,
        items: [
          {
            label: "UI Shortcuts",
            contentSite: "cloud-docs",
            url: "/docs/atlas/reference/atlas-go-to",
          },
          {
            label: "Cloud Providers",
            contentSite: "cloud-docs",
            url: "/docs/atlas/reference/cloud-providers",
            collapsible: true,
            items: [
              {
                label: "Amazon Web Services",
                contentSite: "cloud-docs",
                url: "/docs/atlas/reference/amazon-aws",
              },
              {
                label: "Google Cloud Platform",
                contentSite: "cloud-docs",
                url: "/docs/atlas/reference/google-gcp",
              },
              {
                label: "Microsoft Azure",
                contentSite: "cloud-docs",
                url: "/docs/atlas/reference/microsoft-azure",
              },
            ],
          },
          {
            label: "Limits",
            contentSite: "cloud-docs",
            url: "/docs/atlas/reference/limitations",
            collapsible: true,
            items: [
              {
                label: "Service Limits",
                contentSite: "cloud-docs",
                url: "/docs/atlas/reference/atlas-limits",
              },
              {
                label: "Atlas Flex Limits",
                contentSite: "cloud-docs",
                url: "/docs/atlas/reference/flex-limitations",
              },
              {
                label: "Serverless Limits",
                contentSite: "cloud-docs",
                url: "/docs/atlas/reference/serverless-instance-limitations",
              },
              {
                label: "M0 Limits",
                contentSite: "cloud-docs",
                url: "/docs/atlas/reference/free-shared-limitations",
              },
              {
                label: "Unsupported Commands",
                contentSite: "cloud-docs",
                url: "/docs/atlas/unsupported-commands",
              },
              {
                label: "Supported Commands",
                contentSite: "cloud-docs",
                url: "/docs/atlas/free-tier-commands",
              },
            ],
          },
          {
            label: "Oplog Access",
            contentSite: "cloud-docs",
            url: "/docs/atlas/reference/atlas-oplog",
          },
          {
            label: "Event Types",
            contentSite: "cloud-docs",
            url: "/docs/atlas/reference/atlas-alert-event-types",
          },
          {
            label: "Host Metrics",
            contentSite: "cloud-docs",
            url: "/docs/atlas/reference/alert-host-metrics",
          },
          {
            label: "Supported Browsers",
            contentSite: "cloud-docs",
            url: "/docs/atlas/reference/supported-browsers",
          },
          {
            label: "Frequently Asked Questions",
            contentSite: "cloud-docs",
            url: "/docs/atlas/faq",
            collapsible: true,
            items: [
              {
                label: "FAQ: Accounts",
                contentSite: "cloud-docs",
                url: "/docs/atlas/reference/faq/accounts",
              },
              {
                label: "FAQ: Applications",
                contentSite: "cloud-docs",
                url: "/docs/atlas/reference/faq/applications",
              },
              {
                label: "FAQ: Atlas Search",
                contentSite: "cloud-docs",
                url: "/docs/atlas/atlas-search/faq",
              },
              {
                label: "FAQ: Backup",
                contentSite: "cloud-docs",
                url: "/docs/atlas/reference/faq/backup",
              },
              {
                label: "FAQ: Billing",
                contentSite: "cloud-docs",
                url: "/docs/atlas/reference/faq/billing",
              },
              {
                label: "FAQ: Connection Strings",
                contentSite: "cloud-docs",
                url: "/docs/atlas/reference/faq/connection-changes",
              },
              {
                label: "FAQ: Databases",
                contentSite: "cloud-docs",
                url: "/docs/atlas/reference/faq/database",
              },
              {
                label: "FAQ: Deployment",
                contentSite: "cloud-docs",
                url: "/docs/atlas/reference/faq/deployment",
              },
              {
                label: "FAQ: Monitoring and Alerts",
                contentSite: "cloud-docs",
                url: "/docs/atlas/reference/faq/monitoring-alerts",
              },
              {
                label: "FAQ: Navigation Improvements",
                contentSite: "cloud-docs",
                url: "/docs/atlas/reference/faq/nav-improvements",
              },
              {
                label: "FAQ: Networking",
                contentSite: "cloud-docs",
                url: "/docs/atlas/reference/faq/networking",
              },
              {
                label: "FAQ: Security",
                contentSite: "cloud-docs",
                url: "/docs/atlas/reference/faq/security",
              },
              {
                label: "FAQ: Storage",
                contentSite: "cloud-docs",
                url: "/docs/atlas/reference/faq/storage",
              },
              {
                label: "FAQ: Support",
                contentSite: "cloud-docs",
                url: "/docs/atlas/reference/faq/support",
              },
            ],
          },
          {
            label: "Glossary",
            contentSite: "docs",
            url: "/docs/manual/reference/glossary/",
          },
        ],
      },
      {
        label: "Get Help",
        contentSite: "cloud-docs",
        url: "/docs/atlas/support",
      },
      {
        label: "Production Notes",
        contentSite: "cloud-docs",
        url: "/docs/atlas/production-notes",
        collapsible: true,
        items: [
          {
            label: "Cluster Sizing and Tiers",
            contentSite: "cloud-docs",
            url: "/docs/atlas/sizing-tier-selection",
          },
          {
            label: "Build a Resilient Application",
            contentSite: "cloud-docs",
            url: "/docs/atlas/resilient-application",
          },
          {
            label: "Recover a Point in Time",
            contentSite: "cloud-docs",
            url: "/docs/atlas/recover-pit-continuous-cloud-backup",
          },
          {
            label: "Multi-Tenant Architecture",
            contentSite: "cloud-docs",
            url: "/docs/atlas/build-multi-tenant-arch",
          },
        ],
      },
      {
        label: "Release Notes",
        contentSite: "cloud-docs",
        url: "/docs/atlas/release-notes",
        collapsible: true,
        items: [
          {
            label: "Atlas",
            contentSite: "cloud-docs",
            url: "/docs/atlas/release-notes/changelog",
          },
          {
            label: "Atlas Data Federation",
            contentSite: "cloud-docs",
            url: "/docs/atlas/release-notes/data-federation",
          },
          {
            label: "Atlas Kubernetes Operator",
            contentSite: "atlas-operator",
            url: "/docs/atlas/operator/stable/ak8so-changelog/",
          },
          {
            label: "Atlas SQL",
            contentSite: "cloud-docs",
            url: "/docs/atlas/release-notes/sql",
          },
          {
            label: "Atlas Stream Processing",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-stream-processing/changelog",
          },
          {
            label: "Atlas Search",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-search/changelog",
          },
          {
            label: "Atlas Vector Search",
            contentSite: "cloud-docs",
            url: "/docs/atlas/atlas-vector-search/changelog",
          },
          {
            label: "MongoDB Charts",
            contentSite: "charts",
            url: "/docs/charts/release-notes/",
          },
        ],
      },
    ],
  },
];

export default tocData;
