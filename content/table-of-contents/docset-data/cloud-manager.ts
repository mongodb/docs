import type { TocItem } from "../types";

const tocData: TocItem[] = [
  {
    label: "Cloud Manager",
    contentSite: "cloud-manager",
    url: "/docs/cloud-manager/",
    group: true,
    items: [
      {
        label: "Overview",
        contentSite: "cloud-manager",
        url: "/docs/cloud-manager/application",
        collapsible: true,
        items: [
          {
            label: "Start a Free Trial",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/tutorial/getting-started",
          },
        ],
      },
      {
        label: "Create Deployments",
        contentSite: "cloud-manager",
        url: "/docs/cloud-manager/tutorial/nav/manage-hosts",
        collapsible: true,
        items: [
          {
            label: "Prerequisites",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/tutorial/provisioning-prep",
          },
          {
            label: "Provision Servers",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/tutorial/nav/add-servers",
            collapsible: true,
            items: [
              {
                label: "Use Automation",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/tutorial/add-servers-automation",
              },
              {
                label: "Use a Migration Host",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/tutorial/provision-migration-host",
              },
            ],
          },
          {
            label: "Add Existing Processes",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/tutorial/add-existing-mongodb-processes",
          },
          {
            label: "Deploy a Replica Set",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/tutorial/deploy-replica-set",
          },
          {
            label: "Deploy a Sharded Cluster",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/tutorial/deploy-sharded-cluster",
          },
          {
            label: "Deploy a Standalone Instance",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/tutorial/deploy-standalone",
          },
          {
            label: "Install a Kubernetes Operator",
            contentSite: "docs-k8s-operator",
            url: "/docs/kubernetes-operator/stable/tutorial/install-k8s-operator",
          },
          {
            label: "Deploy with Kubernetes",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/tutorial/nav/manage-hosts-kubernetes",
            collapsible: true,
            items: [
              {
                label: "Configure Kubernetes",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/tutorial/nav/k8s-config-for-mdb-resource",
              },
              {
                label: "Deploy a Replica Set",
                contentSite: "docs-k8s-operator",
                url: "/docs/kubernetes-operator/stable/tutorial/deploy-replica-set/",
              },
              {
                label: "Deploy a Sharded Cluster",
                contentSite: "docs-k8s-operator",
                url: "/docs/kubernetes-operator/stable/tutorial/deploy-sharded-cluster/",
              },
              {
                label: "Deploy a Standalone",
                contentSite: "docs-k8s-operator",
                url: "/docs/kubernetes-operator/stable/tutorial/deploy-standalone/",
              },
            ],
          },
          {
            label: "Deploy a BI Connector Instance",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/tutorial/deploy-bi-connector",
          },
          {
            label: "Connect to MongoDB",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/tutorial/connect-to-mongodb",
          },
          {
            label: "Interact with your Data",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/data-explorer",
            collapsible: true,
            items: [
              {
                label: "Databases & Collections",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/data-explorer/databases-collections",
              },
              {
                label: "Documents",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/data-explorer/documents",
              },
              {
                label: "Indexes",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/data-explorer/indexes",
              },
              {
                label: "Build Aggregation Pipelines",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/data-explorer/cloud-agg-pipeline",
              },
            ],
          },
        ],
      },
      {
        label: "Manage Deployments",
        contentSite: "cloud-manager",
        url: "/docs/cloud-manager/tutorial/nav/monitor-and-manage",
        collapsible: true,
        items: [
          {
            label: "View All Clusters",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/tutorial/view-all-clusters",
          },
          {
            label: "Prepare for Maintenance",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/tutorial/prepare-for-maintenance",
          },
          {
            label: "Edit Configuration",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/tutorial/edit-deployment",
          },
          {
            label: "Manage BI Connector",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/tutorial/manage-bi-connector",
          },
          {
            label: "Calculate Suggested Indexes",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/tutorial/suggest-indexes",
          },
          {
            label: "Edit a Replica Set",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/tutorial/edit-replica-set",
          },
          {
            label: "Covert Standalone to Replica Set",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/tutorial/convert-standalone-to-replica-set",
          },
          {
            label: "Convert Replica Set to Sharded Cluster",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/tutorial/convert-replica-set-to-sharded-cluster",
          },
          {
            label: "Migrate a Replica Set Member",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/tutorial/migrate-member-to-new-hardware",
          },
          {
            label: "Add a Shard",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/tutorial/add-shard-using-automation",
          },
          {
            label: "Remove a Shard",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/tutorial/remove-shard-using-automation",
          },
          {
            label: "Stop Managing and/or Monitoring",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/tutorial/unmanage-deployment",
          },
          {
            label: "MongoDB Processes",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/tutorial/nav/mongodb-processes",
            collapsible: true,
            items: [
              {
                label: "Shut Down",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/tutorial/shut-down-deployment",
              },
              {
                label: "Restart",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/tutorial/restart-processes",
              },
              {
                label: "Trigger an Initial Sync",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/tutorial/trigger-resync",
              },
              {
                label: "Suspend Management",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/tutorial/suspend-automation",
              },
              {
                label: "Remove a Process",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/tutorial/remove-process-from-monitoring",
              },
            ],
          },
          {
            label: "MongoDB Versions",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/tutorial/nav/mongodb-versions",
            collapsible: true,
            items: [
              {
                label: "Change Version",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/tutorial/change-mongodb-version",
              },
              {
                label: "Add a Custom Build",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/tutorial/configure-available-mongodb-version",
              },
            ],
          },
          {
            label: "Host Mappings",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/tutorial/nav/host-mappings",
          },
        ],
      },
      {
        label: "Migrate Deployments",
        contentSite: "cloud-manager",
        url: "/docs/cloud-manager/migration",
        collapsible: true,
        items: [
          {
            label: "Cloud Manager to Atlas",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/tutorial/migrate-to-atlas",
          },
          {
            label: "Community Deployment to Atlas",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/tutorial/migrate-community-to-atlas",
          },
          {
            label: "Restore a Deployment",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/tutorial/restore-deployment-to-atlas",
          },
        ],
      },
      {
        label: "Monitor Deployments",
        contentSite: "cloud-manager",
        url: "/docs/cloud-manager/tutorial/nav/alerts-and-monitoring",
        collapsible: true,
        items: [
          {
            label: "Analyze Slow Queries",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/analyze-slow-queries",
            collapsible: true,
            items: [
              {
                label: "Monitor & Improve",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/tutorial/performance-advisor",
                collapsible: true,
                items: [
                  {
                    label: "Get Namespaces",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/performance-advisor/slow-query-threshold",
                  },
                  {
                    label: "Get Slow Query Logs",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/performance-advisor/index-ranking",
                  },
                  {
                    label: "Get Suggested Indexes",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/performance-advisor/drop-indexes",
                  },
                ],
              },
              {
                label: "Collection-Level Query Latency",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/query-insights",
              },
              {
                label: "Profile Databases",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/tutorial/profile-database",
              },
            ],
          },
          {
            label: "Improve Your Schema",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/performance-advisor/schema-advisor",
            collapsible: true,
            items: [
              {
                label: "Reduce $lookup Operations",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/schema-advisor/reduce-lookup-operations",
              },
              {
                label: "Avoid Unbounded Arrays",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/schema-advisor/avoid-unbounded-arrays",
              },
              {
                label: "Remove Indexes",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/schema-advisor/too-many-indexes",
              },
              {
                label: "Reduce Document Size",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/schema-advisor/reduce-document-size",
              },
              {
                label: "Reduce Collections",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/schema-advisor/too-many-collections",
              },
            ],
          },
          {
            label: "Configure & Resolve Alerts",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/tutorial/nav/alerts",
            collapsible: true,
            items: [
              {
                label: "Get All",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/reference/alerts",
              },
              {
                label: "Get One",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/tutorial/manage-alert-configurations",
              },
              {
                label: "Acknowledge One",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/tutorial/nav/alert-resolutions",
                collapsible: true,
                items: [
                  {
                    label: "Manage",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/tutorial/manage-alerts-and-events",
                  },
                  {
                    label: "Host Down",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/alerts/host-down",
                  },
                  {
                    label: "Host Exposed",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/alerts/host-exposed",
                  },
                  {
                    label: "Replica Lag",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/alerts/replication-lag",
                  },
                  {
                    label: "Lost Primary",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/alerts/no-primary",
                  },
                  {
                    label: "Inconsistent Backup",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/alerts/inconsistent-backup",
                  },
                  {
                    label: "Backup Oplog Issues",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/alerts/backup-oplog-is-behind",
                  },
                  {
                    label: "Query Issues",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/alerts/query-targeting",
                  },
                  {
                    label: "CPU Usage Issues",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/alerts/system-cpu-usage",
                  },
                  {
                    label: "IOPS Issues",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/alerts/disk-io-utilization",
                  },
                ],
              },
              {
                label: "Review Conditions",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/reference/alerts",
              },
              {
                label: "Configure Settings",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/tutorial/manage-alert-configurations",
              },
              {
                label: "Resolve Alerts",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/tutorial/nav/alert-resolutions",
              },
            ],
          },
          {
            label: "View Metrics",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/tutorial/view-diagnostics",
            collapsible: true,
            items: [
              {
                label: "Replica Sets",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/view-replica-set-metrics",
              },
              {
                label: "Sharded Clusters",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/view-sharded-cluster-metrics",
              },
              {
                label: "MongoDB Processes",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/view-mongodb-process-metrics",
              },
              {
                label: "View in Real Time",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/view-real-time-metrics",
              },
              {
                label: "Review Available Metrics",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/review-available-metrics",
              },
            ],
          },
          {
            label: "Use Third-Party Integrations",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/tutorial/third-party-service-integrations",
            collapsible: true,
            items: [
              {
                label: "Microsoft Teams",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/tutorial/mms-integrate-with-microsoft-teams",
              },
              {
                label: "PagerDuty",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/tutorial/pagerduty-integration",
              },
              {
                label: "Prometheus",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/tutorial/prometheus-integration",
              },
            ],
          },
          {
            label: "View, Retrieve, & Manage Logs",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/tutorial/view-logs",
          },
        ],
      },
      {
        label: "Backup & Restore Deployments",
        contentSite: "cloud-manager",
        url: "/docs/cloud-manager/tutorial/nav/backup-use",
        collapsible: true,
        items: [
          {
            label: "Back Up Deployments",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/tutorial/nav/backup-deployments",
            collapsible: true,
            items: [
              {
                label: "Preparations",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/core/backup-preparations",
              },
              {
                label: "Backup Deployment",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/tutorial/enable-backup",
              },
            ],
          },
          {
            label: "Manage Backups",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/tutorial/nav/backup-use-operations",
            collapsible: true,
            items: [
              {
                label: "Edit Settings",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/tutorial/edit-backup",
              },
              {
                label: "Stop, Restart, or Terminate",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/tutorial/stop-restart-terminate-backup",
              },
              {
                label: "View Snapshots",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/tutorial/view-snapshots",
              },
              {
                label: "Delete a Snapshot",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/tutorial/delete-backup-snapshots",
              },
              {
                label: "Resync",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/tutorial/resync-backup",
              },
              {
                label: "Disable",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/tutorial/disable-backup",
              },
              {
                label: "Change Region",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/tutorial/change-backup-region",
              },
            ],
          },
          {
            label: "Restore Deployments",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/tutorial/nav/backup-restore-deployments",
            collapsible: true,
            items: [
              {
                label: "Overview",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/tutorial/nav/restore-overview",
              },
              {
                label: "Restore Sharded Cluster",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/tutorial/restore-sharded-cluster",
              },
              {
                label: "Restore Replica Set",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/tutorial/restore-replica-set",
              },
              {
                label: "Query a Snapshot",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/tutorial/query-backup",
              },
              {
                label: "Restore a Single Database or Collection",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/tutorial/restore-single-database",
              },
            ],
          },
        ],
      },
      {
        label: "Security",
        contentSite: "cloud-manager",
        url: "/docs/cloud-manager/tutorial/nav/security",
        collapsible: true,
        items: [
          {
            label: "Overview",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/core/security",
          },
          {
            label: "Firewall Configuration",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/reference/firewall-configuration",
          },
          {
            label: "Secure Connections",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/tutorial/enable-ssl-for-a-deployment",
          },
          {
            label: "Secure with Authentication",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/tutorial/nav/security-enable-authentication",
            collapsible: true,
            items: [
              {
                label: "Overview",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/tutorial/edit-host-authentication-credentials",
              },
              {
                label: "Use Username/Password",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/tutorial/enable-mongodbcr-authentication-for-group",
              },
              {
                label: "Use LDAP",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/tutorial/enable-ldap-authentication-for-group",
              },
              {
                label: "Use Kerberos",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/tutorial/enable-kerberos-authentication-for-group",
              },
              {
                label: "Use OIDC",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/tutorial/enable-oidc-authentication-for-group",
                collapsible: true,
                items: [
                  {
                    label: "Workforce (Humans)",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/tutorial/workforce-oidc",
                  },
                  {
                    label: "Workload (Applications)",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/tutorial/workload-oidc",
                  },
                ],
              },
              {
                label: "Use X.509",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/tutorial/enable-x509-authentication-for-group",
              },
              {
                label: "Manage Users & Roles",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/tutorial/nav/access-control-mongodb",
                collapsible: true,
                items: [
                  {
                    label: "Manage MongoDB Users",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/tutorial/manage-mongodb-users",
                  },
                  {
                    label: "Manage Custom Roles",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/tutorial/manage-mongodb-roles",
                  },
                ],
              },
              {
                label: "Clear Security Settings",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/tutorial/clear-security-settings",
              },
              {
                label: "Rotate Keyfile",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/tutorial/rotate-keyfile",
              },
              {
                label: "Rotate Automation Password",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/tutorial/rotate-automation-password",
              },
            ],
          },
          {
            label: "Configure Federated Authentication",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/security/federated-authentication",
            collapsible: true,
            items: [
              {
                label: "Identity Providers",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/security/manage-idps",
              },
              {
                label: "Domain Mapping",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/security/manage-domain-mapping",
              },
              {
                label: "Organization Mapping",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/security/manage-org-mapping",
              },
              {
                label: "Cloud Manager Role Mapping",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/security/manage-role-mapping",
              },
              {
                label: "Microsoft Entra ID",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/security/federated-auth-azure-ad",
              },
              {
                label: "Okta",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/security/federated-auth-okta",
              },
              {
                label: "Advanced Options",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/security/federation-advanced-options",
              },
            ],
          },
          {
            label: "Encrypt Snapshots",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/tutorial/encrypt-snapshots",
          },
          {
            label: "Rotate Master KMIP Keys",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/tutorial/rotate-master-kmip-keys",
          },
          {
            label: "Configure & Deploy Auditing",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/tutorial/configure-auditing",
          },
        ],
      },
      {
        label: "MongoDB Agent",
        contentSite: "cloud-manager",
        url: "/docs/cloud-manager/tutorial/nav/mongodb-agent",
        collapsible: true,
        items: [
          {
            label: "Prerequisites",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/tutorial/install-mongodb-agent-prereq",
          },
          {
            label: "Install",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/tutorial/nav/install-mongodb-agent",
            collapsible: true,
            items: [
              {
                label: "Manage Deployments",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/tutorial/install-mongodb-agent-to-manage",
              },
              {
                label: "Monitor or Backup Deployments",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/tutorial/install-mongodb-agent-to-monitor",
              },
              {
                label: "Verify Package Integrity",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/tutorial/verify-mongodb-packages",
              },
            ],
          },
          {
            label: "Update",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/tutorial/nav/update-mongodb-agent",
            collapsible: true,
            items: [
              {
                label: "All Legacy Agents",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/tutorial/update-mongodb-agent-from-all-agents",
              },
              {
                label: "Legacy Monitoring Agents",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/tutorial/update-mongodb-agent-from-monitoring-agent",
              },
              {
                label: "Legacy Backups & Monitoring Agents",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/tutorial/update-mongodb-agent-from-backup-and-monitoring-agents",
              },
              {
                label: "Managed & Unmanaged Agents",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/tutorial/update-mongodb-agent-from-automation-agent",
              },
            ],
          },
          {
            label: "Restart",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/tutorial/nav/start-or-stop-mongodb-agent",
          },
          {
            label: "Manage Functions",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/tutorial/mongodb-agent-functions",
          },
          {
            label: "Settings",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/reference/mongodb-agent-settings",
          },
          {
            label: "Required Access",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/reference/required-access-mongodb-agent",
          },
          {
            label: "Configure for Access Control",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/tutorial/nav/configure-mongodb-agent",
            collapsible: true,
            items: [
              {
                label: "SCRAM-SHA",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/tutorial/configure-mongodb-agent-for-scram",
              },
              {
                label: "LDAP",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/tutorial/configure-mongodb-agent-for-ldap",
              },
              {
                label: "Kerberos",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/tutorial/configure-mongodb-agent-for-kerberos",
              },
              {
                label: "X.509",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/tutorial/configure-mongodb-agent-for-x509",
              },
            ],
          },
          {
            label: "Use TLS",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/tutorial/configure-mongodb-agent-for-tls",
          },
          {
            label: "Manage Config Files & Passwords",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/reference/mongodb-agent-external-configuration",
          },
          {
            label: "Remove Legacy Agents",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/tutorial/uninstall-legacy-agents",
          },
          {
            label: "View Status",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/tutorial/view-agent-status",
          },
          {
            label: "Manage API Keys",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/tutorial/manage-agent-api-key",
          },
          {
            label: "Enable Fatal Log Rotation",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/tutorial/update-fatal-log-rotation",
          },
        ],
      },
      {
        label: "Organizations & Projects",
        contentSite: "cloud-manager",
        url: "/docs/cloud-manager/organizations-projects",
        collapsible: true,
        items: [
          {
            label: "Organizations",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/tutorial/manage-organizations",
          },
          {
            label: "Connect to Atlas",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/tutorial/connect-to-atlas-live-migration",
          },
          {
            label: "Projects",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/tutorial/manage-projects",
          },
          {
            label: "Edit Project Settings",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/tutorial/manage-project-settings",
          },
          {
            label: "Cloud Manager Access",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/tutorial/manage-users",
            collapsible: true,
            items: [
              {
                label: "Programmatic Access",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/tutorial/manage-programmatic-access",
              },
            ],
          },
          {
            label: "Cloud Manager Roles",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/reference/user-roles",
          },
          {
            label: "Invitations",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/invitations",
          },
        ],
      },
      {
        label: "Account Management",
        contentSite: "cloud-manager",
        url: "/docs/cloud-manager/tutorial/nav/account-management",
        collapsible: true,
        items: [
          {
            label: "Edit Personal Settings",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/tutorial/edit-your-user-account",
          },
          {
            label: "Use Multi-Factor Authentication",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/core/multi-factor-authentication",
          },
          {
            label: "Use Two-Factor Authentication",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/core/two-factor-authentication",
          },
          {
            label: "Process Payment",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/core/pricing",
            collapsible: true,
            items: [
              {
                label: "Manage Invoices",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/billing/invoices",
              },
              {
                label: "Process International Payments",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/billing/international-billing",
              },
            ],
          },
          {
            label: "Reopen a Locked Account",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/tutorial/reopen-locked-account",
          },
          {
            label: "Delete an Account",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/tutorial/delete-user-account",
          },
        ],
      },
      {
        label: "API",
        contentSite: "cloud-manager",
        url: "/docs/cloud-manager/api",
        collapsible: true,
        items: [
          {
            label: "Principles",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/core/api",
          },
          {
            label: "Resources",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/reference/api",
            collapsible: true,
            items: [
              {
                label: "Root",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/reference/api/root",
              },
              {
                label: "Deployments",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/reference/api/nav/deployments",
                collapsible: true,
                items: [
                  {
                    label: "Hosts",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/api/hosts",
                    collapsible: true,
                    items: [
                      {
                        label: "Get All Hosts",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/hosts/get-all-hosts-in-group",
                      },
                      {
                        label: "Get by ID",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/hosts/get-one-host-by-id",
                      },
                      {
                        label: "Get by Hostname & Port",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/hosts/get-one-host-by-hostname-port",
                      },
                      {
                        label: "Monitor",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/hosts/create-one-host",
                      },
                      {
                        label: "Update",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/hosts/update-one-host",
                      },
                      {
                        label: "Stop Monitoring",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/hosts/delete-one-host",
                      },
                    ],
                  },
                  {
                    label: "Disks",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/api/disks",
                    collapsible: true,
                    items: [
                      {
                        label: "Get All",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/disks-get-all",
                      },
                      {
                        label: "Get One",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/disk-get-one",
                      },
                    ],
                  },
                  {
                    label: "Databases",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/api/databases",
                    collapsible: true,
                    items: [
                      {
                        label: "Get All",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/databases-get-all-on-host",
                      },
                      {
                        label: "Get by Name",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/database-get-by-name",
                      },
                    ],
                  },
                  {
                    label: "Clusters",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/api/clusters",
                    collapsible: true,
                    items: [
                      {
                        label: "Get All in All Projects",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/clusters/clusters-get-all-key",
                      },
                      {
                        label: "Get All in One Project",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/clusters/clusters-get-all",
                      },
                      {
                        label: "Get One",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/clusters/clusters-get-one",
                      },
                      {
                        label: "Update One",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/clusters/clusters-update-one",
                      },
                    ],
                  },
                ],
              },
              {
                label: "Agents",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/reference/api/agents",
                collapsible: true,
                items: [
                  {
                    label: "Get Links",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/api/agents-get-all",
                  },
                  {
                    label: "Get by Type",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/api/agents-get-by-type",
                  },
                  {
                    label: "Create API Key",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/api/agentapikeys/create-one-agent-api-key",
                  },
                  {
                    label: "Get All API Keys",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/api/agentapikeys/get-all-agent-api-keys-for-project",
                  },
                  {
                    label: "Remove API Key",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/api/agentapikeys/delete-one-agent-api-key",
                  },
                ],
              },
              {
                label: "Measurements & Alerts",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/reference/api/nav/measurements-and-alerts",
                collapsible: true,
                items: [
                  {
                    label: "Measurements",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/api/measurements",
                    collapsible: true,
                    items: [
                      {
                        label: "Host",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/measures/get-host-process-system-measurements",
                      },
                      {
                        label: "Disk Partition",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/measures/get-disk-measurements",
                      },
                      {
                        label: "Database",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/measures/get-database-measurements",
                      },
                      {
                        label: "Types",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/measures/measurement-types",
                      },
                      {
                        label: "Get Types",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/measures/get-measurement-types",
                      },
                    ],
                  },
                  {
                    label: "Alerts",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/api/alerts",
                    collapsible: true,
                    items: [
                      {
                        label: "Get All Alerts",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/alerts-get-all-alerts",
                      },
                      {
                        label: "Get One Alert",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/alerts-get-alert",
                      },
                      {
                        label: "Acknowledge One Alert",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/alerts-acknowledge-alert",
                      },
                    ],
                  },
                  {
                    label: "Alert Configurations",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/api/alert-configurations",
                    collapsible: true,
                    items: [
                      {
                        label: "Get Matchers Field Names",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/alert-configurations-get-matchers-field-names",
                      },
                      {
                        label: "Get All for a Project",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/alert-configurations-get-all-configs",
                      },
                      {
                        label: "Create",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/alert-configurations-create-config",
                      },
                      {
                        label: "Get One",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/alert-configurations-get-config",
                      },
                      {
                        label: "Update",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/alert-configurations-update-config",
                      },
                      {
                        label: "Enable/Disable",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/alert-configurations-enable-disable-config",
                      },
                      {
                        label: "Delete",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/alert-configurations-delete-config",
                      },
                      {
                        label: "Get Open Alerts",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/alert-configurations-get-open-alerts",
                      },
                    ],
                  },
                  {
                    label: "Events",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/api/events",
                    collapsible: true,
                    items: [
                      {
                        label: "Get All (Organization)",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/events/get-all-events-for-org",
                      },
                      {
                        label: "Get One (Organization)",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/events/get-one-event-for-org",
                      },
                      {
                        label: "Get All (Project)",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/events/get-all-events-for-project",
                      },
                      {
                        label: "Get One (Project)",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/events/get-one-event-for-project",
                      },
                    ],
                  },
                  {
                    label: "Maintenance Windows",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/api/maintenance-windows",
                    collapsible: true,
                    items: [
                      {
                        label: "Get All",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/maintenance-windows-get-all",
                      },
                      {
                        label: "Get One",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/maintenance-windows-get-one",
                      },
                      {
                        label: "Create",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/maintenance-windows-create-one",
                      },
                      {
                        label: "Update",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/maintenance-windows-update-one",
                      },
                      {
                        label: "Delete",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/maintenance-windows-delete-one",
                      },
                    ],
                  },
                  {
                    label: "Performance Advisor",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/api/performance-advisor",
                    collapsible: true,
                    items: [
                      {
                        label: "Get Namespaces for a Project",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/performance-advisor/pa-namespaces-get-all",
                      },
                      {
                        label: "Get Slow Query Logs",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/performance-advisor/get-slow-queries",
                      },
                      {
                        label: "Get Suggested Indexes",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/performance-advisor/get-suggested-indexes",
                      },
                      {
                        label: "Get Index Removal Suggestions",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/performance-advisor/get-dropped-index-suggestions",
                      },
                      {
                        label: "Get Schema Advice",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/performance-advisor/get-schema-advice",
                      },
                    ],
                  },
                  {
                    label: "Query Latency",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/api/query-latency",
                    collapsible: true,
                    items: [
                      {
                        label: "Return Metric Names",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/query-latency/query-latency-metrics",
                      },
                      {
                        label: "Pin Namespaces",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/query-latency/query-latency-put-pin",
                      },
                      {
                        label: "Add Pins",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/query-latency/query-latency-patch-pin",
                      },
                      {
                        label: "Return Pins",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/query-latency/query-latency-get-pin",
                      },
                      {
                        label: "Unpin",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/query-latency/query-latency-patch-unpin",
                      },
                      {
                        label: "Return at a Cluster Level",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/query-latency/query-latency-get-measurements",
                      },
                      {
                        label: "Return Ranked Namespaces(Cluster)",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/query-latency/query-latency-get-namespaces",
                      },
                      {
                        label: "Return at a Host-Level",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/query-latency/query-latency-get-host-measurements",
                      },
                      {
                        label: "Return Ranked Namespaces (Host)",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/query-latency/query-latency-get-host-namespaces",
                      },
                    ],
                  },
                  {
                    label: "Third-Party Integrations",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/api/third-party-integration-settings",
                    collapsible: true,
                    items: [
                      {
                        label: "Get All Configurations",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/third-party-integration-settings-get-all",
                      },
                      {
                        label: "Get One Configuration",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/third-party-integration-settings-get-one",
                      },
                      {
                        label: "Create a Configuration",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/third-party-integration-settings-create",
                      },
                      {
                        label: "Update a Configuration",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/third-party-integration-settings-update",
                      },
                      {
                        label: "Delete a Configuration",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/third-party-integration-settings-delete",
                      },
                      {
                        label: "Return Latest Prometheus Targets",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/third-party-integration-settings-discovery",
                      },
                    ],
                  },
                ],
              },
              {
                label: "Projects & Users",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/reference/api/nav/groups-and-users",
                collapsible: true,
                items: [
                  {
                    label: "Projects",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/api/groups",
                    collapsible: true,
                    items: [
                      {
                        label: "Get All",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/groups/get-all-groups-for-current-user",
                      },
                      {
                        label: "Get by ID",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/groups/get-one-group-by-id",
                      },
                      {
                        label: "Get by Name",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/groups/get-one-group-by-name",
                      },
                      {
                        label: "Get by Agent API Key",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/groups/get-one-group-by-agent-api-key",
                      },
                      {
                        label: "Create",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/groups/create-one-group",
                      },
                      {
                        label: "Update",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/groups/change-one-group-name",
                      },
                      {
                        label: "Delete",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/groups/delete-one-group",
                      },
                      {
                        label: "Update Roles",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/groups/update-project-roles-for-one-user",
                      },
                      {
                        label: "Get All Users",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/groups/get-all-users-in-one-group",
                      },
                      {
                        label: "Add Existing Users",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/groups/add-users-to-one-group",
                      },
                      {
                        label: "Remove User",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/groups/remove-one-user-from-one-group",
                      },
                      {
                        label: "Create Invitation",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/invitations/projects/create-one-invitation",
                      },
                      {
                        label: "Delete Invitation",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/invitations/projects/delete-one-invitation",
                      },
                      {
                        label: "Get All Invitations",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/invitations/projects/get-all-invitations",
                      },
                      {
                        label: "Get One Invitation",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/invitations/projects/get-one-invitation",
                      },
                      {
                        label: "Update Invitation by Invitation ID",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/invitations/projects/update-one-invitation-by-id",
                      },
                      {
                        label: "Update Invitation",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/invitations/projects/update-one-invitation",
                      },
                      {
                        label: "Get All Teams",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/groups/project-get-teams",
                      },
                      {
                        label: "Add Teams",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/groups/project-add-team",
                      },
                      {
                        label: "Remove Team",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/teams/teams-remove-from-project",
                      },
                    ],
                  },
                  {
                    label: "Users",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/api/users",
                    collapsible: true,
                    items: [
                      {
                        label: "Create",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/user-create",
                      },
                      {
                        label: "Get by ID",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/user-get-by-id",
                      },
                      {
                        label: "Get by Name",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/user-get-by-name",
                      },
                    ],
                  },
                  {
                    label: "Access List",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/api/access-list",
                    collapsible: true,
                    items: [
                      {
                        label: "Get for Current User",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/access-list-get-for-current-user",
                      },
                      {
                        label: "Get for IP Address",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/access-list-get-for-ip-address",
                      },
                      {
                        label: "Add Entries",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/access-list-add-entries",
                      },
                      {
                        label: "Delete Entry",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/access-list-delete-entry",
                      },
                    ],
                  },
                ],
              },
              {
                label: "Programmatic API Keys",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/reference/api/nav/prog-api-keys",
                collapsible: true,
                items: [
                  {
                    label: "Organization API Keys",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/api/org-api-keys",
                    collapsible: true,
                    items: [
                      {
                        label: "Create",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/api-keys/org/create-one-org-api-key",
                      },
                      {
                        label: "Get All",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/api-keys/org/get-all-org-api-keys",
                      },
                      {
                        label: "Get One",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/api-keys/org/get-one-org-api-key",
                      },
                      {
                        label: "Update",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/api-keys/org/update-one-org-api-key",
                      },
                      {
                        label: "Delete",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/api-keys/org/delete-one-api-key",
                      },
                    ],
                  },
                  {
                    label: "Access Lists",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/api/org-api-key-access-lists",
                    collapsible: true,
                    items: [
                      {
                        label: "Create",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/api-keys/org/create-org-api-key-access-list",
                      },
                      {
                        label: "Get All",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/api-keys/org/get-all-org-api-key-access-list",
                      },
                      {
                        label: "Get One",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/api-keys/org/get-one-org-api-key-access-list",
                      },
                      {
                        label: "Delete",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/api-keys/org/delete-one-org-api-key-access-list",
                      },
                    ],
                  },
                  {
                    label: "API Keys on Projects",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/api/project-api-keys",
                    collapsible: true,
                    items: [
                      {
                        label: "Get All",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/api-keys/project/get-all-apiKeys-in-one-project",
                      },
                      {
                        label: "Create & Assign",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/api-keys/project/create-one-apiKey-in-one-project",
                      },
                      {
                        label: "Assign to One Project",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/api-keys/project/assign-one-org-apiKey-to-one-project",
                      },
                      {
                        label: "Modify Roles",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/api-keys/project/update-one-apiKey-in-one-project",
                      },
                      {
                        label: "Unassign",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/api-keys/project/delete-one-apiKey-in-one-project",
                      },
                    ],
                  },
                ],
              },
              {
                label: "Service Accounts",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/reference/api/nav/service-accounts",
                collapsible: true,
                items: [
                  {
                    label: "Generate Token",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/api/service-accounts/generate-oauth2-token",
                  },
                  {
                    label: "Revoke Token",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/api/service-accounts/revoke-oauth2-token",
                  },
                  {
                    label: "Organization Accounts",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/api/org-service-accounts",
                    collapsible: true,
                    items: [
                      {
                        label: "Get All",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/service-accounts/org/get-all-org-service-accounts",
                      },
                      {
                        label: "Get One",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/service-accounts/org/get-one-org-service-account",
                      },
                      {
                        label: "Get All Assignments",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/service-accounts/org/get-all-org-service-account-project-assignments",
                      },
                      {
                        label: "Create",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/service-accounts/org/create-one-org-service-account",
                      },
                      {
                        label: "Update",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/service-accounts/org/update-one-org-service-account",
                      },
                      {
                        label: "Delete",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/service-accounts/org/delete-one-service-account",
                      },
                      {
                        label: "Create Secret",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/service-accounts/org/create-service-account-secret",
                      },
                      {
                        label: "Delete Secret",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/service-accounts/org/delete-service-account-secret",
                      },
                    ],
                  },
                  {
                    label: "Organization Access Lists",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/api/org-service-account-access-lists",
                    collapsible: true,
                    items: [
                      {
                        label: "Get All",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/service-accounts/org/get-all-org-service-account-access-list",
                      },
                      {
                        label: "Create",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/service-accounts/org/create-org-service-account-access-list",
                      },
                      {
                        label: "Delete",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/service-accounts/org/delete-one-org-service-account-access-list",
                      },
                    ],
                  },
                  {
                    label: "Project Access Lists",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/api/project-service-account-access-lists",
                    collapsible: true,
                    items: [
                      {
                        label: "Get All",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/service-accounts/project/get-all-project-service-account-access-list",
                      },
                      {
                        label: "Create",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/service-accounts/project/create-project-service-account-access-list",
                      },
                      {
                        label: "Delete",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/service-accounts/project/delete-one-project-service-account-access-list",
                      },
                    ],
                  },
                  {
                    label: "Project Accounts",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/api/project-service-accounts",
                    collapsible: true,
                    items: [
                      {
                        label: "Get All",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/service-accounts/project/get-all-service-accounts-project",
                      },
                      {
                        label: "Get One",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/service-accounts/project/get-one-project-service-account",
                      },
                      {
                        label: "Create & Assign",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/service-accounts/project/create-one-service-account-in-one-project",
                      },
                      {
                        label: "Assign",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/service-accounts/project/assign-one-org-service-account-to-one-project",
                      },
                      {
                        label: "Modify Details",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/service-accounts/project/update-one-service-account-in-one-project",
                      },
                      {
                        label: "Unassign",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/service-accounts/project/delete-one-service-account-in-one-project",
                      },
                      {
                        label: "Create Secret",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/service-accounts/project/create-project-service-account-secret",
                      },
                      {
                        label: "Delete Secret",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/service-accounts/project/delete-project-service-account-secret",
                      },
                    ],
                  },
                ],
              },
              {
                label: "Organizations & Teams",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/reference/api/nav/organizations-and-teams",
                collapsible: true,
                items: [
                  {
                    label: "Organizations",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/api/organizations",
                    collapsible: true,
                    items: [
                      {
                        label: "Get All",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/organizations/organization-get-all",
                      },
                      {
                        label: "Get One",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/organizations/organization-get-one",
                      },
                      {
                        label: "Get All Projects",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/organizations/organization-get-all-projects",
                      },
                      {
                        label: "Get All Users",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/organizations/organization-get-all-users",
                      },
                      {
                        label: "Delete User",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/organizations/organization-delete-one-user",
                      },
                      {
                        label: "Update Roles",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/organizations/update-org-roles-for-one-user",
                      },
                      {
                        label: "Rename",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/organizations/organization-rename",
                      },
                      {
                        label: "Delete",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/organizations/organization-delete-one",
                      },
                      {
                        label: "Invite User",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/invitations/organizations/create-one-invitation",
                      },
                      {
                        label: "Delete Invitation",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/invitations/organizations/delete-one-invitation",
                      },
                      {
                        label: "Get All Invitations",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/invitations/organizations/get-all-invitations",
                      },
                      {
                        label: "Get One Invitation",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/invitations/organizations/get-one-invitation",
                      },
                      {
                        label: "Update by Invitation ID",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/invitations/organizations/update-one-invitation-by-id",
                      },
                      {
                        label: "Update Invitation",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/invitations/organizations/update-one-invitation",
                      },
                    ],
                  },
                  {
                    label: "Teams",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/api/teams",
                    collapsible: true,
                    items: [
                      {
                        label: "Get All",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/teams/teams-get-all",
                      },
                      {
                        label: "Get One by ID",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/teams/teams-get-one-by-id",
                      },
                      {
                        label: "Get One by Name",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/teams/teams-get-one-by-name",
                      },
                      {
                        label: "Get All Team Users",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/teams/teams-get-all-users",
                      },
                      {
                        label: "Create",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/teams/teams-create-one",
                      },
                      {
                        label: "Rename",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/teams/teams-rename-one",
                      },
                      {
                        label: "Update Roles",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/teams/teams-update-roles",
                      },
                      {
                        label: "Add Users",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/teams/teams-add-user",
                      },
                      {
                        label: "Remove User",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/teams/teams-remove-user",
                      },
                      {
                        label: "Delete",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/teams/teams-delete-one",
                      },
                      {
                        label: "Remove",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/teams/teams-remove-from-project",
                      },
                    ],
                  },
                ],
              },
              {
                label: "Invoices",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/reference/api/invoices",
                collapsible: true,
                items: [
                  {
                    label: "Get All",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/api/organizations/organization-get-all-invoices",
                  },
                  {
                    label: "Get One",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/api/organizations/organization-get-one-invoice",
                  },
                  {
                    label: "Get Pending Invoice",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/api/organizations/organization-get-pending-invoices",
                  },
                ],
              },
              {
                label: "Backup & Restore",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/reference/api/nav/backup-and-restore",
                collapsible: true,
                items: [
                  {
                    label: "Backup Configurations",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/api/backup-configurations",
                    collapsible: true,
                    items: [
                      {
                        label: " Get All",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/backup/get-all-backup-configs-for-group",
                      },
                      {
                        label: " Get One",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/backup/get-one-backup-config-by-cluster-id",
                      },
                      {
                        label: " Update",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/backup/update-backup-config",
                      },
                    ],
                  },
                  {
                    label: "Snapshot Schedule",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/api/snapshot-schedule",
                    collapsible: true,
                    items: [
                      {
                        label: "Get Schedule",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/backup/get-snapshot-schedule",
                      },
                      {
                        label: "Update",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/backup/update-one-snapshot-schedule-by-cluster-id",
                      },
                    ],
                  },
                  {
                    label: "Snapshots",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/api/snapshots",
                    collapsible: true,
                    items: [
                      {
                        label: "Get All (Cluster)",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/snapshots/get-all-snapshots-for-one-cluster",
                      },
                      {
                        label: "Get One (Cluster)",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/snapshots/get-one-snapshot-for-one-cluster",
                      },
                      {
                        label: "Change Expiry",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/snapshots/change-expiry-for-one-snapshot",
                      },
                      {
                        label: "Remove One",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/snapshots/remove-one-snapshot-from-one-cluster",
                      },
                      {
                        label: "Get All (Config Server)",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/snapshots/get-all-snapshots-for-config-server",
                      },
                      {
                        label: "Get One (Config Server)",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/snapshots/get-one-snapshot-for-config-server",
                      },
                    ],
                  },
                  {
                    label: "Checkpoints",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/api/checkpoints",
                  },
                  {
                    label: "Restore Jobs",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/api/restore-jobs",
                    collapsible: true,
                    items: [
                      {
                        label: "Get All (Cluster)",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/restorejobs/get-all-restore-jobs-for-one-cluster",
                      },
                      {
                        label: "Get One (Cluster)",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/restorejobs/get-one-single-restore-job-for-one-cluster",
                      },
                      {
                        label: "Create (Cluster)",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/restorejobs/create-one-restore-job-for-one-cluster",
                      },
                      {
                        label: "Get All (Config Server)",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/restorejobs/get-all-restore-jobs-for-one-sccc-config-server",
                      },
                      {
                        label: "Get One (Config Server)",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/restorejobs/get-one-single-restore-job-for-one-sccc-config-server",
                      },
                      {
                        label: "Create (Config Server)",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/restorejobs/create-one-restore-job-for-one-sccc-config-server",
                      },
                    ],
                  },
                ],
              },
              {
                label: "Automation",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/reference/api/nav/automation",
                collapsible: true,
                items: [
                  {
                    label: "Configuration Resource",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/api/automation-config",
                    collapsible: true,
                    items: [
                      {
                        label: "Get the Automation Configuration",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/automation-config/get-automation-config",
                      },
                      {
                        label: "Update the Automation Configuration",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/automation-config/update-automation-config",
                      },
                      {
                        label: "Automation Configuration Parameters",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/automation-config/automation-config-parameters",
                      },
                      {
                        label: "Example Automation Configuration",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/automation-config/automation-config-example",
                      },
                      {
                        label: "Update Agent Versions",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/automation-config/update-agent-versions",
                      },
                      {
                        label: "Get Backup Configuration Settings",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/automation-config/get-backup-log-attributes",
                      },
                      {
                        label: "Update Backup Configuration Settings",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/automation-config/update-backup-log-attributes",
                      },
                      {
                        label: "Get Monitoring Configuration Settings",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/automation-config/get-monitoring-log-attributes",
                      },
                      {
                        label: "Update Monitoring Configuration Settings",
                        contentSite: "cloud-manager",
                        url: "/docs/cloud-manager/reference/api/automation-config/update-monitoring-log-attributes",
                      },
                    ],
                  },
                  {
                    label: "Get Status of Latest Plan",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/api/automation-status",
                  },
                  {
                    label: "Get Status of Last 50 Plans",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/api/automation-status-full",
                  },
                ],
              },
              {
                label: "Federated Authentication",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/reference/api/federation-configuration",
                collapsible: true,
                items: [
                  {
                    label: "Return Configuration",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/api/org-get-federation-settings",
                  },
                  {
                    label: "Return All Organizations",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/api/org-mappings-return-all",
                  },
                  {
                    label: "Return Organization",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/api/org-mapping-return-one",
                  },
                  {
                    label: "Update Organization",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/api/org-mapping-update-one",
                  },
                  {
                    label: "Remove Organization",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/api/org-mapping-remove-one",
                  },
                  {
                    label: "Return All Role Mappings",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/api/role-mapping-return-all",
                  },
                  {
                    label: "Return Role Mapping",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/api/role-mapping-return-one",
                  },
                  {
                    label: "Return All Identity Providers",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/api/identity-provider-return-all",
                  },
                  {
                    label: "Return Identity Provider",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/api/identity-provider-return-one",
                  },
                  {
                    label: "Return Identity Provider's Metadata",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/api/identity-provider-return-one-metadata",
                  },
                  {
                    label: "Delete Role Mapping",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/api/role-mapping-delete-one",
                  },
                  {
                    label: "Remove One Federation",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/api/federation-delete-one",
                  },
                ],
              },
              {
                label: "Log Collection Jobs",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/reference/api/log-collection",
                collapsible: true,
                items: [
                  {
                    label: "Get All Jobs",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/api/log-collections/log-collections-get-all",
                  },
                  {
                    label: "Get Job",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/api/log-collections/log-collections-get-one",
                  },
                  {
                    label: "Download Logs",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/api/log-collections/log-collections-download-job",
                  },
                  {
                    label: "Create",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/api/log-collections/log-collections-submit",
                  },
                  {
                    label: "Extend",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/api/log-collections/log-collections-update-one",
                  },
                  {
                    label: "Retry",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/api/log-collections/log-collections-retry",
                  },
                  {
                    label: "Delete",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/api/log-collections/log-collections-delete-one",
                  },
                ],
              },
              {
                label: "Feature Control Policies",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/reference/api/feature-control-policies",
                collapsible: true,
                items: [
                  {
                    label: "Retrieve",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/api/controlled-features/get-controlled-features-for-one-project",
                  },
                  {
                    label: "Retrieve All",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/api/controlled-features/get-all-feature-control-policies",
                  },
                  {
                    label: "Update",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/api/controlled-features/update-controlled-features-for-one-project",
                  },
                ],
              },
              {
                label: "Live Data Migration to Atlas",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/reference/api/cloud-migration",
                collapsible: true,
                items: [
                  {
                    label: "Connect",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/api/cloud-migration/link-the-organization-with-atlas",
                  },
                  {
                    label: "Remove Connection",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/api/cloud-migration/remove-the-link-between-organizations",
                  },
                  {
                    label: "Return Connection Status",
                    contentSite: "cloud-manager",
                    url: "/docs/cloud-manager/reference/api/cloud-migration/return-the-status-of-the-organization-link",
                  },
                ],
              },
            ],
          },
          {
            label: "Error Codes",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/reference/api-error-codes",
          },
          {
            label: "Configure Access",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/tutorial/configure-public-api-access",
            collapsible: true,
            items: [
              {
                label: "Programmatic Access",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/tutorial/manage-programmatic-api-keys",
              },
            ],
          },
          {
            label: "Tutorials",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/tutorial/nav/api-tutorials",
            collapsible: true,
            items: [
              {
                label: "Deploy a Sharded Cluster",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/tutorial/create-cluster-with-api",
              },
              {
                label: "Update Automation Configuration",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/tutorial/update-automation-configuration",
              },
              {
                label: "Rotate Key File",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/tutorial/rotate-key-with-api",
              },
              {
                label: "Rotate Automation Password",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/tutorial/rotate-automation-password-with-api",
              },
              {
                label: "Update Deployment Version",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/tutorial/update-mongodb-version-of-deployment-via-api",
              },
              {
                label: "Automate Backup Restoration",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/tutorial/automate-backup-restoration-with-api",
              },
              {
                label: "Stop Process Monitoring",
                contentSite: "cloud-manager",
                url: "/docs/cloud-manager/tutorial/remove-monitored-process-api",
              },
            ],
          },
        ],
      },
      {
        label: "Troubleshoot",
        contentSite: "cloud-manager",
        url: "/docs/cloud-manager/troubleshooting",
        collapsible: true,
        items: [
          {
            label: "Getting Started",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/reference/troubleshooting/getting-started",
          },
          {
            label: "Authentication",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/reference/troubleshooting/authentication",
          },
          {
            label: "Automation",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/reference/troubleshooting/automation",
          },
          {
            label: "Monitoring",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/reference/troubleshooting/monitoring",
          },
          {
            label: "Backup",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/reference/troubleshooting/backup",
          },
          {
            label: "Kubernetes Operator",
            contentSite: "docs-k8s-operator",
            url: "/docs/kubernetes-operator/stable/reference/troubleshooting",
          },
        ],
      },
      {
        label: "FAQ",
        contentSite: "cloud-manager",
        url: "/docs/cloud-manager/faq",
        collapsible: true,
        items: [
          {
            label: "Project Administration",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/reference/faq/faq-administration",
          },
          {
            label: "Automation",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/reference/faq/faq-automation",
          },
          {
            label: "Backup & Restore",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/reference/faq/faq-backup",
          },
          {
            label: "Billing",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/reference/faq/faq-billing",
          },
          {
            label: "Monitoring & Alerts",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/reference/faq/faq-monitoring",
          },
          {
            label: "MongoDB Agent",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/reference/faq/faq-mongodb-agent",
          },
          {
            label: "Navigation Improvements",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/reference/faq/faq-nav-improvements",
          },
        ],
      },
      {
        label: "Reference",
        contentSite: "cloud-manager",
        url: "/docs/cloud-manager/reference",
        collapsible: true,
        items: [
          {
            label: "Compatibility",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/reference/mongodb-compatibility",
          },
          {
            label: "Supported Browsers",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/reference/supported-browsers",
          },
          {
            label: "Glossary",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/reference/glossary",
          },
          {
            label: "Advanced Deployment Options",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/reference/deployment-advanced-options",
          },
          {
            label: "Automation Configuration",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/reference/cluster-configuration",
          },
          {
            label: "Settings & Automation",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/reference/cluster-configuration-process-options",
          },
          {
            label: "AWS IAM Policy",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/reference/required-permissions-aws-user",
          },
          {
            label: "Monitor Commands",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/reference/monitoring",
          },
          {
            label: "Alert Event Types",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/reference/alert-types",
          },
          {
            label: "Health Check Solutions",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/reference/health-score",
          },
          {
            label: "Monitoring Metrics",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/reference/monitoring-metrics-per-plan",
          },
          {
            label: "Build a Resilient Application",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/reference/resilient-application",
          },
        ],
      },
      {
        label: "Release Notes",
        contentSite: "cloud-manager",
        url: "/docs/cloud-manager/release-notes",
        collapsible: true,
        items: [
          {
            label: "Server",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/release-notes/application",
          },
          {
            label: "MongoDB Agent",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/release-notes/mongodb-agent",
          },
          {
            label: "Automation Agent",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/release-notes/automation-agent",
          },
          {
            label: "Monitoring Agent",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/release-notes/monitoring-agent",
          },
          {
            label: "Backup Agent",
            contentSite: "cloud-manager",
            url: "/docs/cloud-manager/release-notes/backup-agent",
          },
          {
            label: "Kubernetes Operator",
            contentSite: "docs-k8s-operator",
            url: "/docs/kubernetes-operator/stable/release-notes/",
          },
        ],
      },
      {
        label: "Licensing",
        contentSite: "cloud-manager",
        url: "/docs/cloud-manager/reference/legal/cloud-manager-backup-license",
      },
    ],
  },
];

export default tocData;
