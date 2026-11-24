import type { L1TocItem } from '../types';

export const toc: L1TocItem[] = [
  {
    label: 'Legacy Docs',
    contentSite: 'docs-k8s-operator',
    url: '/docs/kubernetes-operator/v1.32/',
    items: [
      {
        label: 'Enterprise Kubernetes Operator',
        contentSite: 'docs-k8s-operator',
        group: true,
        items: [
          {
            label: 'Overview',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/v1.32',
          },
          {
            label: 'Quick Start',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/v1.32/kind-quick-start',
          },
          {
            label: 'OpenShift Tutorials',
            contentSite: 'docs-k8s-operator',
            collapsible: true,
            url: '/docs/kubernetes-operator/v1.32/openshift-tutorials',
            items: [
              {
                label: 'Quick Start',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/v1.32/openshift-quick-start',
              },
              {
                label: 'Deploy in Restricted Network',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/v1.32/tutorial/restricted-network-tutorial',
              },
            ],
          },
          {
            label: 'Architecture',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/v1.32/tutorial/plan-k8s-op-architecture',
          },
          {
            label: 'Security',
            contentSite: 'docs-k8s-operator',
            collapsible: true,
            url: '/docs/kubernetes-operator/v1.32/security',
            items: [
              {
                label: 'Verify Permissions',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/v1.32/permissions',
              },
              {
                label: 'Verify Signatures',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/v1.32/verify-signatures',
              },
              {
                label: 'Use Gatekeeper OPA',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/v1.32/opa-gatekeeper',
              },
              {
                label: 'Configure Encryption',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/v1.32/encryption',
              },
              {
                label: 'Configure Encryption at Rest',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/v1.32/encryption-at-rest',
              },
              {
                label: 'Enable Authentication',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/v1.32/authentication',
              },
              {
                label: 'Configure Secret Storage',
                contentSite: 'docs-k8s-operator',
                collapsible: true,
                url: '/docs/kubernetes-operator/v1.32/tutorial/secret-storage',
                items: [
                  {
                    label: 'Create Secrets in Vault',
                    contentSite: 'docs-k8s-operator',
                    url: '/docs/kubernetes-operator/v1.32/tutorial/create-vault-secret',
                  },
                ],
              },
            ],
          },
          {
            label: 'Install',
            contentSite: 'docs-k8s-operator',
            collapsible: true,
            url: '/docs/kubernetes-operator/v1.32/installation',
            items: [
              {
                label: 'Plan Installation',
                contentSite: 'docs-k8s-operator',
                collapsible: true,
                url: '/docs/kubernetes-operator/v1.32/tutorial/plan-k8s-operator-install',
                items: [
                  {
                    label: 'Architecture',
                    contentSite: 'docs-k8s-operator',
                    url: '/docs/kubernetes-operator/v1.32/tutorial/plan-k8s-op-architecture',
                  },
                  {
                    label: 'Compatibility',
                    contentSite: 'docs-k8s-operator',
                    url: '/docs/kubernetes-operator/v1.32/tutorial/plan-k8s-op-compatibility',
                  },
                  {
                    label: 'Container Images',
                    contentSite: 'docs-k8s-operator',
                    url: '/docs/kubernetes-operator/v1.32/tutorial/plan-k8s-op-container-images',
                  },
                  {
                    label: 'Single or Multi-Kubernetes Clusters',
                    contentSite: 'docs-k8s-operator',
                    url: '/docs/kubernetes-operator/v1.32/tutorial/plan-k8s-install-single-or-multi-clusters',
                  },
                  {
                    label: 'Set Deployment Scope',
                    contentSite: 'docs-k8s-operator',
                    url: '/docs/kubernetes-operator/v1.32/tutorial/set-scope-k8s-operator',
                  },
                  {
                    label: 'Considerations',
                    contentSite: 'docs-k8s-operator',
                    url: '/docs/kubernetes-operator/v1.32/tutorial/plan-k8s-op-considerations',
                  },
                  {
                    label: 'Prerequisites',
                    contentSite: 'docs-k8s-operator',
                    url: '/docs/kubernetes-operator/v1.32/tutorial/plan-k8s-op-prerequisites',
                  },
                ],
              },
              {
                label: 'Install',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/v1.32/tutorial/install-k8s-operator',
              },
              {
                label: 'Verify Package Integrity',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/v1.32/tutorial/verify-mongodb-packages',
              },
              {
                label: 'Upgrade',
                contentSite: 'docs-k8s-operator',
                collapsible: true,
                url: '/docs/kubernetes-operator/v1.32/upgrade',
                items: [
                  {
                    label: 'Upgrade Enterprise',
                    contentSite: 'docs-k8s-operator',
                    url: '/docs/kubernetes-operator/v1.32/tutorial/upgrade-k8s-operator',
                  },
                  {
                    label: 'Migrate from Ubuntu to UBI',
                    contentSite: 'docs-k8s-operator',
                    url: '/docs/kubernetes-operator/v1.32/tutorial/migrate-k8s-images',
                  },
                ],
              },
            ],
          },
          {
            label: 'Deploy Ops Manager',
            contentSite: 'docs-k8s-operator',
            collapsible: true,
            url: '/docs/kubernetes-operator/v1.32/om-resources',
            items: [
              {
                label: 'Ops Manager Architecture',
                contentSite: 'docs-k8s-operator',
                collapsible: true,
                url: '/docs/kubernetes-operator/v1.32/tutorial/om-arch',
                items: [
                  {
                    label: 'MongoDBOpsManager Resource',
                    contentSite: 'docs-k8s-operator',
                    url: '/docs/kubernetes-operator/v1.32/tutorial/om-resource-crd-parts',
                  },
                  {
                    label: 'Reconciliation',
                    contentSite: 'docs-k8s-operator',
                    url: '/docs/kubernetes-operator/v1.32/tutorial/om-arch-reconciliation',
                  },
                  {
                    label: 'Multi-Cluster Deployments',
                    contentSite: 'docs-k8s-operator',
                    collapsible: true,
                    url: '/docs/kubernetes-operator/v1.32/tutorial/om-arch-multi-cluster',
                    items: [
                      {
                        label: 'Diagram',
                        contentSite: 'docs-k8s-operator',
                        url: '/docs/kubernetes-operator/v1.32/tutorial/om-diagram-multi-cluster',
                      },
                      {
                        label: 'Networking, Load Balancing, Service Mesh',
                        contentSite: 'docs-k8s-operator',
                        url: '/docs/kubernetes-operator/v1.32/tutorial/om-nw-lb-mesh-multi-cluster',
                      },
                      {
                        label: 'Performance',
                        contentSite: 'docs-k8s-operator',
                        url: '/docs/kubernetes-operator/v1.32/tutorial/om-perf-multi-cluster',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Plan Resource',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/v1.32/tutorial/plan-om-resource',
              },
              {
                label: 'Deploy on Multiple Clusters',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/v1.32/tutorial/deploy-om-multi-cluster',
              },
              {
                label: 'Deploy Resource',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/v1.32/tutorial/deploy-om-container',
              },
              {
                label: 'Use Remote Mode',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/v1.32/tutorial/deploy-om-container-remote-mode',
              },
              {
                label: 'Use Local Mode',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/v1.32/tutorial/deploy-om-container-local-mode',
              },
              {
                label: 'Upgrade',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/v1.32/tutorial/upgrade-om-version',
              },
              {
                label: 'Configure Queryable Backups',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/v1.32/tutorial/configure-om-queryable-backups',
              },
              {
                label: 'Configure KMIP Backup Encryption',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/v1.32/tutorial/configure-kmip-backup-encryption',
              },
              {
                label: 'Configure File System Backup',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/v1.32/tutorial/configure-file-store',
              },
              {
                label: 'Configure cert-manager',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/v1.32/tutorial/cert-manager-integration',
              },
              {
                label: 'Disaster Recovery',
                contentSite: 'docs-k8s-operator',
                collapsible: true,
                url: '/docs/kubernetes-operator/v1.32/tutorial/disaster-recovery-om-appdb',
                items: [
                  {
                    label: 'Recover Available Cluster',
                    contentSite: 'docs-k8s-operator',
                    url: '/docs/kubernetes-operator/v1.32/tutorial/recover-om-appdb-yes-k8sop-cluster',
                  },
                  {
                    label: 'Recover Failed Cluster',
                    contentSite: 'docs-k8s-operator',
                    url: '/docs/kubernetes-operator/v1.32/tutorial/recover-om-appdb-no-k8sop-cluster',
                  },
                  {
                    label: 'Recover Lost Majority Replica Set',
                    contentSite: 'docs-k8s-operator',
                    url: '/docs/kubernetes-operator/v1.32/tutorial/recover-appdb-forced-reconfig',
                  },
                ],
              },
            ],
          },
          {
            label: 'Deploy Database Resources',
            contentSite: 'docs-k8s-operator',
            collapsible: true,
            url: '/docs/kubernetes-operator/v1.32/mdb-resources',
            items: [
              {
                label: 'Database Architecture',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/v1.32/tutorial/mdb-resources-arch',
              },
              {
                label: 'Configure',
                contentSite: 'docs-k8s-operator',
                collapsible: true,
                url: '/docs/kubernetes-operator/v1.32/configure-k8s-operator-for-mdb-resources',
                items: [
                  {
                    label: 'Create Credentials',
                    contentSite: 'docs-k8s-operator',
                    url: '/docs/kubernetes-operator/v1.32/tutorial/create-operator-credentials',
                  },
                  {
                    label: 'Create One Project',
                    contentSite: 'docs-k8s-operator',
                    url: '/docs/kubernetes-operator/v1.32/tutorial/create-project-using-configmap',
                  },
                  {
                    label: 'Generate X.509 Certificates',
                    contentSite: 'docs-k8s-operator',
                    url: '/docs/kubernetes-operator/v1.32/tutorial/create-x509-client-certs',
                  },
                ],
              },
              {
                label: 'Deploy',
                contentSite: 'docs-k8s-operator',
                collapsible: true,
                url: '/docs/kubernetes-operator/v1.32/deploy',
                items: [
                  {
                    label: 'Standalone Instance',
                    contentSite: 'docs-k8s-operator',
                    url: '/docs/kubernetes-operator/v1.32/tutorial/deploy-standalone',
                  },
                  {
                    label: 'Replica Set',
                    contentSite: 'docs-k8s-operator',
                    url: '/docs/kubernetes-operator/v1.32/tutorial/deploy-replica-set',
                  },
                  {
                    label: 'Sharded Cluster',
                    contentSite: 'docs-k8s-operator',
                    url: '/docs/kubernetes-operator/v1.32/tutorial/deploy-sharded-cluster',
                  },
                  {
                    label: 'Use with Prometheus',
                    contentSite: 'docs-k8s-operator',
                    url: '/docs/kubernetes-operator/v1.32/tutorial/deploy-prometheus',
                  },
                ],
              },
              {
                label: 'Edit',
                contentSite: 'docs-k8s-operator',
                collapsible: true,
                url: '/docs/kubernetes-operator/v1.32/tutorial/edit-deployment',
                items: [
                  {
                    label: 'Upgrade MongoDB',
                    contentSite: 'docs-k8s-operator',
                    url: '/docs/kubernetes-operator/v1.32/tutorial/upgrade-mdb-version',
                  },
                  {
                    label: 'Scale Deployment',
                    contentSite: 'docs-k8s-operator',
                    url: '/docs/kubernetes-operator/v1.32/tutorial/scale-resources',
                  },
                  {
                    label: 'Increase Storage',
                    contentSite: 'docs-k8s-operator',
                    url: '/docs/kubernetes-operator/v1.32/tutorial/resize-pv-storage',
                  },
                ],
              },
              {
                label: 'Secure Client Connections',
                contentSite: 'docs-k8s-operator',
                collapsible: true,
                url: '/docs/kubernetes-operator/v1.32/tutorial/secure-client-connections',
                items: [
                  {
                    label: 'Use LDAP',
                    contentSite: 'docs-k8s-operator',
                    url: '/docs/kubernetes-operator/v1.32/tutorial/secure-ldap-auth',
                  },
                  {
                    label: 'Use X.509',
                    contentSite: 'docs-k8s-operator',
                    url: '/docs/kubernetes-operator/v1.32/tutorial/secure-x509-auth',
                  },
                  {
                    label: 'Use X.509 with Internal Authentication',
                    contentSite: 'docs-k8s-operator',
                    url: '/docs/kubernetes-operator/v1.32/tutorial/secure-internal-auth',
                  },
                ],
              },
              {
                label: 'Configure Backups',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/v1.32/tutorial/back-up-mdb-resources',
              },
              {
                label: 'Configure Topology',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/v1.32/tutorial/configure-mongodb-cluster-topology',
              },
              {
                label: 'Configure Storage Options',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/v1.32/tutorial/configure-mongodb-specific-storage',
              },
              {
                label: 'Manage Users',
                contentSite: 'docs-k8s-operator',
                collapsible: true,
                url: '/docs/kubernetes-operator/v1.32/manage-users',
                items: [
                  {
                    label: 'Use LDAP',
                    contentSite: 'docs-k8s-operator',
                    url: '/docs/kubernetes-operator/v1.32/tutorial/manage-database-users-ldap',
                  },
                  {
                    label: 'Use SCRAM',
                    contentSite: 'docs-k8s-operator',
                    url: '/docs/kubernetes-operator/v1.32/tutorial/manage-database-users-scram',
                  },
                  {
                    label: 'Use X.509',
                    contentSite: 'docs-k8s-operator',
                    url: '/docs/kubernetes-operator/v1.32/tutorial/manage-database-users-x509',
                  },
                ],
              },
              {
                label: 'Connect',
                contentSite: 'docs-k8s-operator',
                collapsible: true,
                url: '/docs/kubernetes-operator/v1.32/connect',
                items: [
                  {
                    label: 'Inside Kubernetes',
                    contentSite: 'docs-k8s-operator',
                    url: '/docs/kubernetes-operator/v1.32/tutorial/connect-from-inside-k8s',
                  },
                  {
                    label: 'Outside Kubernetes',
                    contentSite: 'docs-k8s-operator',
                    url: '/docs/kubernetes-operator/v1.32/tutorial/connect-from-outside-k8s',
                  },
                ],
              },
            ],
          },
          {
            label: 'Deploy on Multiple Kubernetes Clusters',
            contentSite: 'docs-k8s-operator',
            collapsible: true,
            url: '/docs/kubernetes-operator/v1.32/multi-cluster',
            items: [
              {
                label: 'Overview',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/v1.32/multi-cluster-overview',
              },
              {
                label: 'Architecture & Limitations',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/v1.32/multi-cluster-arch',
              },
              {
                label: 'Services & Tools',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/v1.32/multi-cluster-services-tools',
              },
              {
                label: 'Prerequisites',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/v1.32/multi-cluster-prerequisites',
              },
              {
                label: 'Quick Start',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/v1.32/multi-cluster-quick-start',
              },
              {
                label: 'Deploy a Resource',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/v1.32/multi-cluster-deploy-replica-set',
              },
              {
                label: 'Deploy Without a Service Mesh',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/v1.32/multi-cluster-no-service-mesh-deploy-rs',
              },
              {
                label: 'Edit a Resource',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/v1.32/tutorial/multi-cluster-edit-deployment',
              },
              {
                label: 'Secure Connections',
                contentSite: 'docs-k8s-operator',
                collapsible: true,
                url: '/docs/kubernetes-operator/v1.32/tutorial/multi-cluster-secure-client-connections',
                items: [
                  {
                    label: 'Use LDAP',
                    contentSite: 'docs-k8s-operator',
                    url: '/docs/kubernetes-operator/v1.32/tutorial/multi-cluster-secure-ldap-auth',
                  },
                  {
                    label: 'Use X.509',
                    contentSite: 'docs-k8s-operator',
                    url: '/docs/kubernetes-operator/v1.32/tutorial/multi-cluster-secure-x509',
                  },
                  {
                    label: 'Use X.509 for Internal Authentication',
                    contentSite: 'docs-k8s-operator',
                    url: '/docs/kubernetes-operator/v1.32/tutorial/multi-cluster-secure-internal-auth',
                  },
                ],
              },
              {
                label: 'Access Resources',
                contentSite: 'docs-k8s-operator',
                collapsible: true,
                url: '/docs/kubernetes-operator/v1.32/multi-cluster-connect',
                items: [
                  {
                    label: 'Connect from Outside Kubernetes',
                    contentSite: 'docs-k8s-operator',
                    url: '/docs/kubernetes-operator/v1.32/tutorial/multi-cluster-connect-from-outside-k8s',
                  },
                ],
              },
              {
                label: 'Sharded Cluster',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/v1.32/multi-cluster-sharded-cluster',
              },
              {
                label: 'Sharded Cluster Without a Service Mesh',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/v1.32/tutorial/non-service-mesh-mcsc',
              },
              {
                label: 'Replica Sets Disaster Recovery',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/v1.32/multi-cluster-disaster-recovery',
              },
              {
                label: 'Sharded Cluster Disaster Recovery',
                contentSite: 'docs-k8s-operator',
                collapsible: true,
                url: '/docs/kubernetes-operator/v1.32/multi-cluster-sharded-cluster-disaster-recovery',
                items: [
                  {
                    label: 'Recover Available Cluster',
                    contentSite: 'docs-k8s-operator',
                    url: '/docs/kubernetes-operator/v1.32/tutorial/recover-mcsc-yes-k8sop-cluster',
                  },
                  {
                    label: 'Recover Failed Cluster',
                    contentSite: 'docs-k8s-operator',
                    url: '/docs/kubernetes-operator/v1.32/tutorial/recover-mcsc-no-k8sop-cluster',
                  },
                  {
                    label: 'Recover Lost Majority Replica Set',
                    contentSite: 'docs-k8s-operator',
                    url: '/docs/kubernetes-operator/v1.32/tutorial/recover-mcsc-forced-reconfig',
                  },
                ],
              },
              {
                label: 'Plugin Reference',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/v1.32/plugin-reference',
              },
              {
                label: 'Troubleshoot',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/v1.32/multi-cluster-troubleshooting',
              },
            ],
          },
          {
            label: 'Modify Containers',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/v1.32/tutorial/modify-resource-image',
          },
          {
            label: 'Host on GDC',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/v1.32/gdc-hosted',
          },
          {
            label: 'Reference Architectures',
            contentSite: 'docs-k8s-operator',
            collapsible: true,
            url: '/docs/kubernetes-operator/v1.32/reference-architectures',
            items: [
              {
                label: 'How to Use a Reference Architecture',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/v1.32/reference-architectures/how-to-use',
              },
            ],
          },
          {
            label: 'Reference',
            contentSite: 'docs-k8s-operator',
            collapsible: true,
            url: '/docs/kubernetes-operator/v1.32/reference',
            items: [
              {
                label: 'Ops Manager',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/v1.32/reference/k8s-operator-om-specification',
              },
              {
                label: 'MongoDB User',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/v1.32/reference/k8s-operator-mongodbuser-specification',
              },
              {
                label: 'Databases',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/v1.32/reference/k8s-operator-specification',
              },
              {
                label: 'Multi-Kubernetes-Clusters',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/v1.32/reference/k8s-operator-multi-cluster-specification',
              },
              {
                label: 'Enterprise Installation Settings',
                contentSite: 'docs-k8s-operator',
                collapsible: true,
                url: '/docs/kubernetes-operator/v1.32/reference/operator-settings',
                items: [
                  {
                    label: 'Operator `kubectl` & `oc`',
                    contentSite: 'docs-k8s-operator',
                    url: '/docs/kubernetes-operator/v1.32/reference/kubectl-operator-settings',
                  },
                  {
                    label: 'Operator Helm',
                    contentSite: 'docs-k8s-operator',
                    url: '/docs/kubernetes-operator/v1.32/reference/helm-operator-settings',
                  },
                ],
              },
              {
                label: 'Kubernetes Operator Telemetry',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/v1.32/reference/meko-telemetry',
              },
              {
                label: 'Exclusive Settings',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/v1.32/reference/k8s-op-exclusive-settings',
              },
              {
                label: 'Support Lifecycle',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/v1.32/reference/support-lifecycle',
              },
              {
                label: 'CRD Log Rotation Settings',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/v1.32/reference/k8s-operator-crd-logging-specification',
              },
              {
                label: 'Third-Party Integrations',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/v1.32/third-party-integrations',
              },
              {
                label: 'Third-Party Licenses',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/v1.32/third-party-licenses',
              },
            ],
          },
          {
            label: 'FAQ',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/v1.32/faq',
          },
          {
            label: 'Release Notes',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/v1.32/release-notes',
          },
          {
            label: 'Troubleshoot',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/v1.32/reference/troubleshooting',
          },
          {
            label: 'Known Issues',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/v1.32/reference/known-issues',
          },
          {
            label: 'MongoDB Community Kubernetes Operator',
            isExternal: true,
            url: 'https://github.com/mongodb/mongodb-kubernetes-operator',
          },
        ],
      },
    ],
  },
];
