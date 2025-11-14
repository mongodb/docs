import type { TocItem } from '../types';

const tocData: TocItem[] = [
  {
    label: 'MongoDB Controllers for Kubernetes Operator',
    contentSite: 'mck',
    url: '/docs/kubernetes/:version/',
    versionDropdown: true,
    group: true,
    items: [
      {
        label: 'Quick Start',
        contentSite: 'mck',
        url: '/docs/kubernetes/:version/kind-quick-start',
      },
      {
        label: 'OpenShift Tutorials',
        contentSite: 'mck',
        url: '/docs/kubernetes/:version/openshift-tutorials',
        collapsible: true,
        items: [
          {
            label: 'Quick Start',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/openshift-quick-start',
          },
          {
            label: 'Deploy in Restricted Network',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/tutorial/restricted-network-tutorial',
          },
        ],
      },
      {
        label: 'Architecture',
        contentSite: 'mck',
        url: '/docs/kubernetes/:version/tutorial/plan-k8s-op-architecture',
      },
      {
        label: 'Security',
        contentSite: 'mck',
        url: '/docs/kubernetes/:version/security',
        collapsible: true,
        items: [
          {
            label: 'Verify Permissions',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/permissions',
          },
          {
            label: 'Verify Signatures',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/verify-signatures',
          },
          {
            label: 'Use Gatekeeper OPA',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/opa-gatekeeper',
          },
          {
            label: 'Configure Encryption',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/encryption',
          },
          {
            label: 'Configure Encryption at Rest',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/encryption-at-rest',
          },
          {
            label: 'Enable Authentication',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/authentication',
          },
          {
            label: 'Configure Secret Storage',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/tutorial/secret-storage',
            collapsible: true,
            items: [
              {
                label: 'Create Secrets in Vault',
                contentSite: 'mck',
                url: '/docs/kubernetes/:version/tutorial/create-vault-secret',
              },
            ],
          },
        ],
      },
      {
        label: 'Install',
        contentSite: 'mck',
        url: '/docs/kubernetes/:version/installation',
        collapsible: true,
        items: [
          {
            label: 'Plan Installation',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/tutorial/plan-k8s-operator-install',
            collapsible: true,
            items: [
              {
                label: 'Architecture',
                contentSite: 'mck',
                url: '/docs/kubernetes/:version/tutorial/plan-k8s-op-architecture',
              },
              {
                label: 'Compatibility',
                contentSite: 'mck',
                url: '/docs/kubernetes/:version/tutorial/plan-k8s-op-compatibility',
              },
              {
                label: 'Container Images',
                contentSite: 'mck',
                url: '/docs/kubernetes/:version/tutorial/plan-k8s-op-container-images',
              },
              {
                label: 'Single or Multi-Kubernetes Clusters',
                contentSite: 'mck',
                url: '/docs/kubernetes/:version/tutorial/plan-k8s-install-single-or-multi-clusters',
              },
              {
                label: 'Set Deployment Scope',
                contentSite: 'mck',
                url: '/docs/kubernetes/:version/tutorial/set-scope-k8s-operator',
              },
              {
                label: 'Considerations',
                contentSite: 'mck',
                url: '/docs/kubernetes/:version/tutorial/plan-k8s-op-considerations',
              },
              {
                label: 'Prerequisites',
                contentSite: 'mck',
                url: '/docs/kubernetes/:version/tutorial/plan-k8s-op-prerequisites',
              },
            ],
          },
          {
            label: 'Install',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/tutorial/install-k8s-operator',
          },
          {
            label: 'Migrate',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/tutorial/migrate-to-mck',
          },
          {
            label: 'Verify Package Integrity',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/tutorial/verify-mongodb-packages',
          },
          {
            label: 'Upgrade',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/upgrade',
            collapsible: true,
            items: [
              {
                label: 'Upgrade Enterprise',
                contentSite: 'mck',
                url: '/docs/kubernetes/:version/tutorial/upgrade-k8s-operator',
              },
              {
                label: 'Migrate from Ubuntu to UBI',
                contentSite: 'mck',
                url: '/docs/kubernetes/:version/tutorial/migrate-k8s-images',
              },
            ],
          },
        ],
      },
      {
        label: 'Deploy Ops Manager',
        contentSite: 'mck',
        url: '/docs/kubernetes/:version/om-resources',
        collapsible: true,
        items: [
          {
            label: 'Ops Manager Architecture',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/tutorial/om-arch',
            collapsible: true,
            items: [
              {
                label: 'MongoDBOpsManager Resource',
                contentSite: 'mck',
                url: '/docs/kubernetes/:version/tutorial/om-resource-crd-parts',
              },
              {
                label: 'Reconciliation',
                contentSite: 'mck',
                url: '/docs/kubernetes/:version/tutorial/om-arch-reconciliation',
              },
              {
                label: 'Multi-Cluster Deployments',
                contentSite: 'mck',
                url: '/docs/kubernetes/:version/tutorial/om-arch-multi-cluster',
                collapsible: true,
                items: [
                  {
                    label: 'Diagram',
                    contentSite: 'mck',
                    url: '/docs/kubernetes/:version/tutorial/om-diagram-multi-cluster',
                  },
                  {
                    label: 'Networking, Load Balancing, Service Mesh',
                    contentSite: 'mck',
                    url: '/docs/kubernetes/:version/tutorial/om-nw-lb-mesh-multi-cluster',
                  },
                  {
                    label: 'Performance',
                    contentSite: 'mck',
                    url: '/docs/kubernetes/:version/tutorial/om-perf-multi-cluster',
                  },
                ],
              },
            ],
          },
          {
            label: 'Plan Resource',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/tutorial/plan-om-resource',
          },
          {
            label: 'Deploy on Multiple Clusters',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/tutorial/deploy-om-multi-cluster',
          },
          {
            label: 'Deploy Resource',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/tutorial/deploy-om-container',
          },
          {
            label: 'Use Remote Mode',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/tutorial/deploy-om-container-remote-mode',
          },
          {
            label: 'Use Local Mode',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/tutorial/deploy-om-container-local-mode',
          },
          {
            label: 'Upgrade',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/tutorial/upgrade-om-version',
          },
          {
            label: 'Configure Queryable Backups',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/tutorial/configure-om-queryable-backups',
          },
          {
            label: 'Configure KMIP Backup Encryption',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/tutorial/configure-kmip-backup-encryption',
          },
          {
            label: 'Configure File System Backup',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/tutorial/configure-file-store',
          },
          {
            label: 'Configure cert-manager',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/tutorial/cert-manager-integration',
          },
          {
            label: 'Disaster Recovery',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/tutorial/disaster-recovery-om-appdb',
            collapsible: true,
            items: [
              {
                label: 'Recover Available Cluster',
                contentSite: 'mck',
                url: '/docs/kubernetes/:version/tutorial/recover-om-appdb-yes-k8sop-cluster',
              },
              {
                label: 'Recover Failed Cluster',
                contentSite: 'mck',
                url: '/docs/kubernetes/:version/tutorial/recover-om-appdb-no-k8sop-cluster',
              },
              {
                label: 'Recover Lost Majority Replica Set',
                contentSite: 'mck',
                url: '/docs/kubernetes/:version/tutorial/recover-appdb-forced-reconfig',
              },
            ],
          },
        ],
      },
      {
        label: 'Deploy Database Resources',
        contentSite: 'mck',
        url: '/docs/kubernetes/:version/mdb-resources',
        collapsible: true,
        items: [
          {
            label: 'Database Architecture',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/tutorial/mdb-resources-arch',
          },
          {
            label: 'Configure',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/configure-k8s-operator-for-mdb-resources',
            collapsible: true,
            items: [
              {
                label: 'Create Credentials',
                contentSite: 'mck',
                url: '/docs/kubernetes/:version/tutorial/create-operator-credentials',
              },
              {
                label: 'Create One Project',
                contentSite: 'mck',
                url: '/docs/kubernetes/:version/tutorial/create-project-using-configmap',
              },
              {
                label: 'Generate X.509 Certificates',
                contentSite: 'mck',
                url: '/docs/kubernetes/:version/tutorial/create-x509-client-certs',
              },
            ],
          },
          {
            label: 'Deploy',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/deploy',
            collapsible: true,
            items: [
              {
                label: 'Standalone Instance',
                contentSite: 'mck',
                url: '/docs/kubernetes/:version/tutorial/deploy-standalone',
              },
              {
                label: 'Replica Set',
                contentSite: 'mck',
                url: '/docs/kubernetes/:version/tutorial/deploy-replica-set',
              },
              {
                label: 'Sharded Cluster',
                contentSite: 'mck',
                url: '/docs/kubernetes/:version/tutorial/deploy-sharded-cluster',
              },
              {
                label: 'Use with Prometheus',
                contentSite: 'mck',
                url: '/docs/kubernetes/:version/tutorial/deploy-prometheus',
              },
            ],
          },
          {
            label: 'Edit',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/tutorial/edit-deployment',
            collapsible: true,
            items: [
              {
                label: 'Upgrade MongoDB',
                contentSite: 'mck',
                url: '/docs/kubernetes/:version/tutorial/upgrade-mdb-version',
              },
              {
                label: 'Scale Deployment',
                contentSite: 'mck',
                url: '/docs/kubernetes/:version/tutorial/scale-resources',
              },
              {
                label: 'Increase Storage',
                contentSite: 'mck',
                url: '/docs/kubernetes/:version/tutorial/resize-pv-storage',
              },
            ],
          },
          {
            label: 'Secure Client Connections',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/tutorial/secure-client-connections',
            collapsible: true,
            items: [
              {
                label: 'Use LDAP',
                contentSite: 'mck',
                url: '/docs/kubernetes/:version/tutorial/secure-ldap-auth',
              },
              {
                label: 'Use X.509',
                contentSite: 'mck',
                url: '/docs/kubernetes/:version/tutorial/secure-x509-auth',
              },
              {
                label: 'Use X.509 with Internal Authentication',
                contentSite: 'mck',
                url: '/docs/kubernetes/:version/tutorial/secure-internal-auth',
              },
              {
                label: 'Use OIDC',
                contentSite: 'mck',
                url: '/docs/kubernetes/:version/tutorial/secure-oidc-auth',
                versions: { includes: ['current', 'upcoming'] },
              },
            ],
          },
          {
            label: 'Configure Backups',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/tutorial/back-up-mdb-resources',
          },
          {
            label: 'Configure Topology',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/tutorial/configure-mongodb-cluster-topology',
          },
          {
            label: 'Configure Storage Options',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/tutorial/configure-mongodb-specific-storage',
          },
          {
            label: 'Manage Users',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/manage-users',
            collapsible: true,
            items: [
              {
                label: 'Use LDAP',
                contentSite: 'mck',
                url: '/docs/kubernetes/:version/tutorial/manage-database-users-ldap',
              },
              {
                label: 'Use SCRAM',
                contentSite: 'mck',
                url: '/docs/kubernetes/:version/tutorial/manage-database-users-scram',
              },
              {
                label: 'Use X.509',
                contentSite: 'mck',
                url: '/docs/kubernetes/:version/tutorial/manage-database-users-x509',
              },
              {
                label: 'Use OIDC',
                contentSite: 'mck',
                url: '/docs/kubernetes/:version/tutorial/manage-database-users-oidc',
                versions: { includes: ['current', 'upcoming'] },
              },
            ],
          },
          {
            label: 'Connect',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/connect',
            collapsible: true,
            items: [
              {
                label: 'Inside Kubernetes',
                contentSite: 'mck',
                url: '/docs/kubernetes/:version/tutorial/connect-from-inside-k8s',
              },
              {
                label: 'Outside Kubernetes',
                contentSite: 'mck',
                url: '/docs/kubernetes/:version/tutorial/connect-from-outside-k8s',
              },
            ],
          },
        ],
      },
      {
        label: 'Deploy Search & Vector Search',
        contentSite: 'mck',
        url: '/docs/kubernetes/:version/fts-vs-deployment',
        collapsible: true,
        versions: { excludes: ['v1.1', 'v1.2', 'v1.3'] },
        items: [
          {
            label: "Install and Use with MongoDB Community Edition",
            contentSite: "mck",
            url: "/docs/kubernetes/:version/tutorial/install-fts-vs-with-community",
            versions: { excludes: ["v1.1", "v1.2", "v1.3", "v1.4", "v1.5"] },
          },
          {
            label: "Install and Use with MongoDB Enterprise Edition",
            contentSite: "mck",
            url: "/docs/kubernetes/:version/tutorial/install-fts-vs-with-enterprise",
          },
          {
            label: 'Install and Use with External MongoDB Enterprise Edition',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/tutorial/install-fts-vs-with-external-enterprise',
          },
          {
            label: 'Migrate External MongoDB Enterprise to Use gRPC',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/tutorial/migrate-fts-vs-with-external-mongod-to-grpc',
            versions: { excludes: ["v1.1", "v1.2", "v1.3", "v1.4", "v1.5"] },
          },
          {
            label: 'Use Search & Vector Search',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/tutorial/fts-vs-quickstart',
          },
        ],
      },
      {
        label: 'Deploy on Multiple Kubernetes Clusters',
        contentSite: 'mck',
        url: '/docs/kubernetes/:version/multi-cluster',
        collapsible: true,
        items: [
          {
            label: 'Overview',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/multi-cluster-overview',
          },
          {
            label: 'Architecture & Limitations',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/multi-cluster-arch',
          },
          {
            label: 'Services & Tools',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/multi-cluster-services-tools',
          },
          {
            label: 'Prerequisites',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/multi-cluster-prerequisites',
          },
          {
            label: 'Quick Start',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/multi-cluster-quick-start',
          },
          {
            label: 'Deploy a Resource',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/multi-cluster-deploy-replica-set',
          },
          {
            label: 'Deploy Without a Service Mesh',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/multi-cluster-no-service-mesh-deploy-rs',
          },
          {
            label: 'Edit a Resource',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/tutorial/multi-cluster-edit-deployment',
          },
          {
            label: 'Secure Connections',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/tutorial/multi-cluster-secure-client-connections',
            collapsible: true,
            items: [
              {
                label: 'Use LDAP',
                contentSite: 'mck',
                url: '/docs/kubernetes/:version/tutorial/multi-cluster-secure-ldap-auth',
              },
              {
                label: 'Use X.509',
                contentSite: 'mck',
                url: '/docs/kubernetes/:version/tutorial/multi-cluster-secure-x509',
              },
              {
                label: 'Use X.509 for Internal Authentication',
                contentSite: 'mck',
                url: '/docs/kubernetes/:version/tutorial/multi-cluster-secure-internal-auth',
              },
              {
                label: 'Use OIDC',
                contentSite: 'mck',
                url: '/docs/kubernetes/:version/tutorial/multi-cluster-secure-oidc-auth',
                versions: { includes: ['current', 'upcoming'] },
              },
            ],
          },
          {
            label: 'Access Resources',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/multi-cluster-connect',
            collapsible: true,
            items: [
              {
                label: 'Connect from Outside Kubernetes',
                contentSite: 'mck',
                url: '/docs/kubernetes/:version/tutorial/multi-cluster-connect-from-outside-k8s',
              },
            ],
          },
          {
            label: 'Sharded Cluster',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/multi-cluster-sharded-cluster',
          },
          {
            label: 'Sharded Cluster Without a Service Mesh',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/tutorial/non-service-mesh-mcsc',
          },
          {
            label: 'Replica Sets Disaster Recovery',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/multi-cluster-disaster-recovery',
          },
          {
            label: 'Sharded Cluster Disaster Recovery',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/multi-cluster-sharded-cluster-disaster-recovery',
            collapsible: true,
            items: [
              {
                label: 'Recover Available Cluster',
                contentSite: 'mck',
                url: '/docs/kubernetes/:version/tutorial/recover-mcsc-yes-k8sop-cluster',
              },
              {
                label: 'Recover Failed Cluster',
                contentSite: 'mck',
                url: '/docs/kubernetes/:version/tutorial/recover-mcsc-no-k8sop-cluster',
              },
              {
                label: 'Recover Lost Majority Replica Set',
                contentSite: 'mck',
                url: '/docs/kubernetes/:version/tutorial/recover-mcsc-forced-reconfig',
              },
            ],
          },
          {
            label: 'Plugin Reference',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/plugin-reference',
          },
          {
            label: 'Troubleshoot',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/multi-cluster-troubleshooting',
          },
        ],
      },
      {
        label: 'Modify Containers',
        contentSite: 'mck',
        url: '/docs/kubernetes/:version/tutorial/modify-resource-image',
      },
      {
        label: 'Host on GDC',
        contentSite: 'mck',
        url: '/docs/kubernetes/:version/gdc-hosted',
      },
      {
        label: 'Reference Architectures',
        contentSite: 'mck',
        url: '/docs/kubernetes/:version/reference-architectures',
        collapsible: true,
        items: [
          {
            label: 'How to Use a Reference Architecture',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/reference-architectures/how-to-use',
          },
          {
            label: 'Multi-Cluster Architecture',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/reference-architectures/multi-cluster/multi-cluster',
            collapsible: true,
            items: [
              {
                label: 'GKE Clusters',
                contentSite: 'mck',
                url: '/docs/kubernetes/:version/reference-architectures/multi-cluster/gke-clusters',
              },
              {
                label: 'Istio Service Mesh',
                contentSite: 'mck',
                url: '/docs/kubernetes/:version/reference-architectures/multi-cluster/istio-service-mesh',
              },
              {
                label: 'TLS Certificates',
                contentSite: 'mck',
                url: '/docs/kubernetes/:version/reference-architectures/multi-cluster/ca-certs',
              },
              {
                label: 'Deploy the Operator',
                contentSite: 'mck',
                url: '/docs/kubernetes/:version/reference-architectures/multi-cluster/deploy-operator',
              },
              {
                label: 'Multi-Cluster Ops Manager',
                contentSite: 'mck',
                url: '/docs/kubernetes/:version/reference-architectures/multi-cluster/multi-cluster-om',
              },
              {
                label: 'Multi-Cluster Replica Sets',
                contentSite: 'mck',
                url: '/docs/kubernetes/:version/reference-architectures/multi-cluster/multi-cluster-replica-sets',
              },
              {
                label: 'Multi-Cluster Sharded Cluster',
                contentSite: 'mck',
                url: '/docs/kubernetes/:version/reference-architectures/multi-cluster/multi-cluster-sharded-cluster',
              },
            ],
          },
          {
            label: 'Multi-Cluster Architecture Without Service Mesh',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/reference-architectures/multi-cluster-no-mesh/multi-cluster-no-mesh',
            collapsible: true,
            items: [
              {
                label: 'GKE Clusters',
                contentSite: 'mck',
                url: '/docs/kubernetes/:version/reference-architectures/multi-cluster-no-mesh/gke-clusters-no-mesh',
              },
              {
                label: 'External DNS',
                contentSite: 'mck',
                url: '/docs/kubernetes/:version/reference-architectures/multi-cluster-no-mesh/external-dns-no-mesh',
              },
              {
                label: 'Deploy the Operator',
                contentSite: 'mck',
                url: '/docs/kubernetes/:version/reference-architectures/multi-cluster-no-mesh/deploy-operator-no-mesh',
              },
              {
                label: 'TLS Certificates',
                contentSite: 'mck',
                url: '/docs/kubernetes/:version/reference-architectures/multi-cluster-no-mesh/ca-certs-no-mesh',
              },
              {
                label: 'Multi-Cluster Ops Manager',
                contentSite: 'mck',
                url: '/docs/kubernetes/:version/reference-architectures/multi-cluster-no-mesh/multi-cluster-om-no-mesh',
              },
              {
                label: 'Multi-Cluster Replica Sets',
                contentSite: 'mck',
                url: '/docs/kubernetes/:version/reference-architectures/multi-cluster-no-mesh/multi-cluster-replica-sets-no-mesh',
              },
              {
                label: 'Multi-Cluster Sharded Cluster',
                contentSite: 'mck',
                url: '/docs/kubernetes/:version/reference-architectures/multi-cluster-no-mesh/multi-cluster-sharded-cluster-no-mesh',
              },
            ],
          },
        ],
      },
      {
        label: 'Reference',
        contentSite: 'mck',
        url: '/docs/kubernetes/:version/reference',
        collapsible: true,
        items: [
          {
            label: 'Ops Manager',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/reference/k8s-operator-om-specification',
          },
          {
            label: 'MongoDB User',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/reference/k8s-operator-mongodbuser-specification',
          },
          {
            label: 'MongoDB Role Specification',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/reference/mongodb-role-specification',
            versions: { includes: ['current', 'upcoming'] },
          },
          {
            label: 'Databases',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/reference/k8s-operator-specification',
          },
          {
            label: 'Multi-Kubernetes-Clusters',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/reference/k8s-operator-multi-cluster-specification',
          },
          {
            label: 'Enterprise Installation Settings',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/reference/operator-settings',
            collapsible: true,
            items: [
              {
                label: 'Operator `kubectl` & `oc`',
                contentSite: 'mck',
                url: '/docs/kubernetes/:version/reference/kubectl-operator-settings',
              },
              {
                label: 'Operator Helm',
                contentSite: 'mck',
                url: '/docs/kubernetes/:version/reference/helm-operator-settings',
              },
            ],
          },
          {
            label: 'Kubernetes Operator Telemetry',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/reference/meko-telemetry',
          },
          {
            label: 'Exclusive Settings',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/reference/k8s-op-exclusive-settings',
          },
          {
            label: 'Support Lifecycle',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/reference/support-lifecycle',
          },
          {
            label: 'CRD Log Rotation Settings',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/reference/k8s-operator-crd-logging-specification',
          },
          {
            label: 'Search & Vector Search Settings',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/reference/fts-vs-settings',
          },
          {
            label: 'Third-Party Integrations',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/third-party-integrations',
          },
          {
            label: 'Third-Party Licenses',
            contentSite: 'mck',
            url: '/docs/kubernetes/:version/third-party-licenses',
          },
        ],
      },
      {
        label: 'FAQ',
        contentSite: 'mck',
        url: '/docs/kubernetes/:version/faq',
      },
      {
        label: 'Release Notes',
        contentSite: 'mck',
        url: '/docs/kubernetes/:version/release-notes',
      },
      {
        label: 'Troubleshoot',
        contentSite: 'mck',
        url: '/docs/kubernetes/:version/reference/troubleshooting',
      },
      {
        label: 'Known Issues',
        contentSite: 'mck',
        url: '/docs/kubernetes/:version/reference/known-issues',
      },
      {
        label: 'Deploy MongoDB Community on Kubernetes',
        isExternal: true,
        url: 'https://github.com/mongodb/mongodb-kubernetes/tree/master/docs/mongodbcommunity',
      },
    ],
  },
];

export default tocData;
