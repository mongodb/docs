import type { L1TocItem } from '../types';

export const toc: L1TocItem[] = [
  {
    label: 'Legacy Docs',
    contentSite: 'mck',
    url: '/docs/kubernetes/v1.3/',
    items: [
      {
        label: 'MongoDB Controllers for Kubernetes Operator',
        contentSite: 'mck',
        group: true,
        items: [
          {
            label: 'Quick Start',
            contentSite: 'mck',
            url: '/docs/kubernetes/v1.3/kind-quick-start',
          },
          {
            label: 'OpenShift Tutorials',
            contentSite: 'mck',
            collapsible: true,
            url: '/docs/kubernetes/v1.3/openshift-tutorials',
            items: [
              {
                label: 'Quick Start',
                contentSite: 'mck',
                url: '/docs/kubernetes/v1.3/openshift-quick-start',
              },
              {
                label: 'Deploy in Restricted Network',
                contentSite: 'mck',
                url: '/docs/kubernetes/v1.3/tutorial/restricted-network-tutorial',
              },
            ],
          },
          {
            label: 'Architecture',
            contentSite: 'mck',
            url: '/docs/kubernetes/v1.3/tutorial/plan-k8s-op-architecture',
          },
          {
            label: 'Security',
            contentSite: 'mck',
            collapsible: true,
            url: '/docs/kubernetes/v1.3/security',
            items: [
              {
                label: 'Verify Permissions',
                contentSite: 'mck',
                url: '/docs/kubernetes/v1.3/permissions',
              },
              {
                label: 'Verify Signatures',
                contentSite: 'mck',
                url: '/docs/kubernetes/v1.3/verify-signatures',
              },
              {
                label: 'Use Gatekeeper OPA',
                contentSite: 'mck',
                url: '/docs/kubernetes/v1.3/opa-gatekeeper',
              },
              {
                label: 'Configure Encryption',
                contentSite: 'mck',
                url: '/docs/kubernetes/v1.3/encryption',
              },
              {
                label: 'Configure Encryption at Rest',
                contentSite: 'mck',
                url: '/docs/kubernetes/v1.3/encryption-at-rest',
              },
              {
                label: 'Enable Authentication',
                contentSite: 'mck',
                url: '/docs/kubernetes/v1.3/authentication',
              },
              {
                label: 'Configure Secret Storage',
                contentSite: 'mck',
                collapsible: true,
                url: '/docs/kubernetes/v1.3/tutorial/secret-storage',
                items: [
                  {
                    label: 'Create Secrets in Vault',
                    contentSite: 'mck',
                    url: '/docs/kubernetes/v1.3/tutorial/create-vault-secret',
                  },
                ],
              },
            ],
          },
          {
            label: 'Install',
            contentSite: 'mck',
            collapsible: true,
            url: '/docs/kubernetes/v1.3/installation',
            items: [
              {
                label: 'Plan Installation',
                contentSite: 'mck',
                collapsible: true,
                url: '/docs/kubernetes/v1.3/tutorial/plan-k8s-operator-install',
                items: [
                  {
                    label: 'Architecture',
                    contentSite: 'mck',
                    url: '/docs/kubernetes/v1.3/tutorial/plan-k8s-op-architecture',
                  },
                  {
                    label: 'Compatibility',
                    contentSite: 'mck',
                    url: '/docs/kubernetes/v1.3/tutorial/plan-k8s-op-compatibility',
                  },
                  {
                    label: 'Container Images',
                    contentSite: 'mck',
                    url: '/docs/kubernetes/v1.3/tutorial/plan-k8s-op-container-images',
                  },
                  {
                    label: 'Single or Multi-Kubernetes Clusters',
                    contentSite: 'mck',
                    url: '/docs/kubernetes/v1.3/tutorial/plan-k8s-install-single-or-multi-clusters',
                  },
                  {
                    label: 'Set Deployment Scope',
                    contentSite: 'mck',
                    url: '/docs/kubernetes/v1.3/tutorial/set-scope-k8s-operator',
                  },
                  {
                    label: 'Considerations',
                    contentSite: 'mck',
                    url: '/docs/kubernetes/v1.3/tutorial/plan-k8s-op-considerations',
                  },
                  {
                    label: 'Prerequisites',
                    contentSite: 'mck',
                    url: '/docs/kubernetes/v1.3/tutorial/plan-k8s-op-prerequisites',
                  },
                ],
              },
              {
                label: 'Install',
                contentSite: 'mck',
                url: '/docs/kubernetes/v1.3/tutorial/install-k8s-operator',
              },
              {
                label: 'Migrate',
                contentSite: 'mck',
                url: '/docs/kubernetes/v1.3/tutorial/migrate-to-mck',
              },
              {
                label: 'Verify Package Integrity',
                contentSite: 'mck',
                url: '/docs/kubernetes/v1.3/tutorial/verify-mongodb-packages',
              },
              {
                label: 'Upgrade',
                contentSite: 'mck',
                collapsible: true,
                url: '/docs/kubernetes/v1.3/upgrade',
                items: [
                  {
                    label: 'Upgrade Enterprise',
                    contentSite: 'mck',
                    url: '/docs/kubernetes/v1.3/tutorial/upgrade-k8s-operator',
                  },
                  {
                    label: 'Migrate from Ubuntu to UBI',
                    contentSite: 'mck',
                    url: '/docs/kubernetes/v1.3/tutorial/migrate-k8s-images',
                  },
                ],
              },
            ],
          },
          {
            label: 'Deploy Ops Manager',
            contentSite: 'mck',
            collapsible: true,
            url: '/docs/kubernetes/v1.3/om-resources',
            items: [
              {
                label: 'Ops Manager Architecture',
                contentSite: 'mck',
                collapsible: true,
                url: '/docs/kubernetes/v1.3/tutorial/om-arch',
                items: [
                  {
                    label: 'MongoDBOpsManager Resource',
                    contentSite: 'mck',
                    url: '/docs/kubernetes/v1.3/tutorial/om-resource-crd-parts',
                  },
                  {
                    label: 'Reconciliation',
                    contentSite: 'mck',
                    url: '/docs/kubernetes/v1.3/tutorial/om-arch-reconciliation',
                  },
                  {
                    label: 'Multi-Cluster Deployments',
                    contentSite: 'mck',
                    collapsible: true,
                    url: '/docs/kubernetes/v1.3/tutorial/om-arch-multi-cluster',
                    items: [
                      {
                        label: 'Diagram',
                        contentSite: 'mck',
                        url: '/docs/kubernetes/v1.3/tutorial/om-diagram-multi-cluster',
                      },
                      {
                        label: 'Networking, Load Balancing, Service Mesh',
                        contentSite: 'mck',
                        url: '/docs/kubernetes/v1.3/tutorial/om-nw-lb-mesh-multi-cluster',
                      },
                      {
                        label: 'Performance',
                        contentSite: 'mck',
                        url: '/docs/kubernetes/v1.3/tutorial/om-perf-multi-cluster',
                      },
                    ],
                  },
                ],
              },
              {
                label: 'Plan Resource',
                contentSite: 'mck',
                url: '/docs/kubernetes/v1.3/tutorial/plan-om-resource',
              },
              {
                label: 'Deploy on Multiple Clusters',
                contentSite: 'mck',
                url: '/docs/kubernetes/v1.3/tutorial/deploy-om-multi-cluster',
              },
              {
                label: 'Deploy Resource',
                contentSite: 'mck',
                url: '/docs/kubernetes/v1.3/tutorial/deploy-om-container',
              },
              {
                label: 'Use Remote Mode',
                contentSite: 'mck',
                url: '/docs/kubernetes/v1.3/tutorial/deploy-om-container-remote-mode',
              },
              {
                label: 'Use Local Mode',
                contentSite: 'mck',
                url: '/docs/kubernetes/v1.3/tutorial/deploy-om-container-local-mode',
              },
              {
                label: 'Upgrade',
                contentSite: 'mck',
                url: '/docs/kubernetes/v1.3/tutorial/upgrade-om-version',
              },
              {
                label: 'Configure Queryable Backups',
                contentSite: 'mck',
                url: '/docs/kubernetes/v1.3/tutorial/configure-om-queryable-backups',
              },
              {
                label: 'Configure KMIP Backup Encryption',
                contentSite: 'mck',
                url: '/docs/kubernetes/v1.3/tutorial/configure-kmip-backup-encryption',
              },
              {
                label: 'Configure File System Backup',
                contentSite: 'mck',
                url: '/docs/kubernetes/v1.3/tutorial/configure-file-store',
              },
              {
                label: 'Configure cert-manager',
                contentSite: 'mck',
                url: '/docs/kubernetes/v1.3/tutorial/cert-manager-integration',
              },
              {
                label: 'Disaster Recovery',
                contentSite: 'mck',
                collapsible: true,
                url: '/docs/kubernetes/v1.3/tutorial/disaster-recovery-om-appdb',
                items: [
                  {
                    label: 'Recover Available Cluster',
                    contentSite: 'mck',
                    url: '/docs/kubernetes/v1.3/tutorial/recover-om-appdb-yes-k8sop-cluster',
                  },
                  {
                    label: 'Recover Failed Cluster',
                    contentSite: 'mck',
                    url: '/docs/kubernetes/v1.3/tutorial/recover-om-appdb-no-k8sop-cluster',
                  },
                  {
                    label: 'Recover Lost Majority Replica Set',
                    contentSite: 'mck',
                    url: '/docs/kubernetes/v1.3/tutorial/recover-appdb-forced-reconfig',
                  },
                ],
              },
            ],
          },
          {
            label: 'Deploy Database Resources',
            contentSite: 'mck',
            collapsible: true,
            url: '/docs/kubernetes/v1.3/mdb-resources',
            items: [
              {
                label: 'Database Architecture',
                contentSite: 'mck',
                url: '/docs/kubernetes/v1.3/tutorial/mdb-resources-arch',
              },
              {
                label: 'Configure',
                contentSite: 'mck',
                collapsible: true,
                url: '/docs/kubernetes/v1.3/configure-k8s-operator-for-mdb-resources',
                items: [
                  {
                    label: 'Create Credentials',
                    contentSite: 'mck',
                    url: '/docs/kubernetes/v1.3/tutorial/create-operator-credentials',
                  },
                  {
                    label: 'Create One Project',
                    contentSite: 'mck',
                    url: '/docs/kubernetes/v1.3/tutorial/create-project-using-configmap',
                  },
                  {
                    label: 'Generate X.509 Certificates',
                    contentSite: 'mck',
                    url: '/docs/kubernetes/v1.3/tutorial/create-x509-client-certs',
                  },
                ],
              },
              {
                label: 'Deploy',
                contentSite: 'mck',
                collapsible: true,
                url: '/docs/kubernetes/v1.3/deploy',
                items: [
                  {
                    label: 'Standalone Instance',
                    contentSite: 'mck',
                    url: '/docs/kubernetes/v1.3/tutorial/deploy-standalone',
                  },
                  {
                    label: 'Replica Set',
                    contentSite: 'mck',
                    url: '/docs/kubernetes/v1.3/tutorial/deploy-replica-set',
                  },
                  {
                    label: 'Sharded Cluster',
                    contentSite: 'mck',
                    url: '/docs/kubernetes/v1.3/tutorial/deploy-sharded-cluster',
                  },
                  {
                    label: 'Use with Prometheus',
                    contentSite: 'mck',
                    url: '/docs/kubernetes/v1.3/tutorial/deploy-prometheus',
                  },
                ],
              },
              {
                label: 'Edit',
                contentSite: 'mck',
                collapsible: true,
                url: '/docs/kubernetes/v1.3/tutorial/edit-deployment',
                items: [
                  {
                    label: 'Upgrade MongoDB',
                    contentSite: 'mck',
                    url: '/docs/kubernetes/v1.3/tutorial/upgrade-mdb-version',
                  },
                  {
                    label: 'Scale Deployment',
                    contentSite: 'mck',
                    url: '/docs/kubernetes/v1.3/tutorial/scale-resources',
                  },
                  {
                    label: 'Increase Storage',
                    contentSite: 'mck',
                    url: '/docs/kubernetes/v1.3/tutorial/resize-pv-storage',
                  },
                ],
              },
              {
                label: 'Secure Client Connections',
                contentSite: 'mck',
                collapsible: true,
                url: '/docs/kubernetes/v1.3/tutorial/secure-client-connections',
                items: [
                  {
                    label: 'Use LDAP',
                    contentSite: 'mck',
                    url: '/docs/kubernetes/v1.3/tutorial/secure-ldap-auth',
                  },
                  {
                    label: 'Use X.509',
                    contentSite: 'mck',
                    url: '/docs/kubernetes/v1.3/tutorial/secure-x509-auth',
                  },
                  {
                    label: 'Use X.509 with Internal Authentication',
                    contentSite: 'mck',
                    url: '/docs/kubernetes/v1.3/tutorial/secure-internal-auth',
                  },
                ],
              },
              {
                label: 'Configure Backups',
                contentSite: 'mck',
                url: '/docs/kubernetes/v1.3/tutorial/back-up-mdb-resources',
              },
              {
                label: 'Configure Topology',
                contentSite: 'mck',
                url: '/docs/kubernetes/v1.3/tutorial/configure-mongodb-cluster-topology',
              },
              {
                label: 'Configure Storage Options',
                contentSite: 'mck',
                url: '/docs/kubernetes/v1.3/tutorial/configure-mongodb-specific-storage',
              },
              {
                label: 'Manage Users',
                contentSite: 'mck',
                collapsible: true,
                url: '/docs/kubernetes/v1.3/manage-users',
                items: [
                  {
                    label: 'Use LDAP',
                    contentSite: 'mck',
                    url: '/docs/kubernetes/v1.3/tutorial/manage-database-users-ldap',
                  },
                  {
                    label: 'Use SCRAM',
                    contentSite: 'mck',
                    url: '/docs/kubernetes/v1.3/tutorial/manage-database-users-scram',
                  },
                  {
                    label: 'Use X.509',
                    contentSite: 'mck',
                    url: '/docs/kubernetes/v1.3/tutorial/manage-database-users-x509',
                  },
                ],
              },
              {
                label: 'Connect',
                contentSite: 'mck',
                collapsible: true,
                url: '/docs/kubernetes/v1.3/connect',
                items: [
                  {
                    label: 'Inside Kubernetes',
                    contentSite: 'mck',
                    url: '/docs/kubernetes/v1.3/tutorial/connect-from-inside-k8s',
                  },
                  {
                    label: 'Outside Kubernetes',
                    contentSite: 'mck',
                    url: '/docs/kubernetes/v1.3/tutorial/connect-from-outside-k8s',
                  },
                ],
              },
            ],
          },
          {
            label: 'Deploy on Multiple Kubernetes Clusters',
            contentSite: 'mck',
            collapsible: true,
            url: '/docs/kubernetes/v1.3/multi-cluster',
            items: [
              {
                label: 'Overview',
                contentSite: 'mck',
                url: '/docs/kubernetes/v1.3/multi-cluster-overview',
              },
              {
                label: 'Architecture & Limitations',
                contentSite: 'mck',
                url: '/docs/kubernetes/v1.3/multi-cluster-arch',
              },
              {
                label: 'Services & Tools',
                contentSite: 'mck',
                url: '/docs/kubernetes/v1.3/multi-cluster-services-tools',
              },
              {
                label: 'Prerequisites',
                contentSite: 'mck',
                url: '/docs/kubernetes/v1.3/multi-cluster-prerequisites',
              },
              {
                label: 'Quick Start',
                contentSite: 'mck',
                url: '/docs/kubernetes/v1.3/multi-cluster-quick-start',
              },
              {
                label: 'Deploy a Resource',
                contentSite: 'mck',
                url: '/docs/kubernetes/v1.3/multi-cluster-deploy-replica-set',
              },
              {
                label: 'Deploy Without a Service Mesh',
                contentSite: 'mck',
                url: '/docs/kubernetes/v1.3/multi-cluster-no-service-mesh-deploy-rs',
              },
              {
                label: 'Edit a Resource',
                contentSite: 'mck',
                url: '/docs/kubernetes/v1.3/tutorial/multi-cluster-edit-deployment',
              },
              {
                label: 'Secure Connections',
                contentSite: 'mck',
                collapsible: true,
                url: '/docs/kubernetes/v1.3/tutorial/multi-cluster-secure-client-connections',
                items: [
                  {
                    label: 'Use LDAP',
                    contentSite: 'mck',
                    url: '/docs/kubernetes/v1.3/tutorial/multi-cluster-secure-ldap-auth',
                  },
                  {
                    label: 'Use X.509',
                    contentSite: 'mck',
                    url: '/docs/kubernetes/v1.3/tutorial/multi-cluster-secure-x509',
                  },
                  {
                    label: 'Use X.509 for Internal Authentication',
                    contentSite: 'mck',
                    url: '/docs/kubernetes/v1.3/tutorial/multi-cluster-secure-internal-auth',
                  },
                ],
              },
              {
                label: 'Access Resources',
                contentSite: 'mck',
                collapsible: true,
                url: '/docs/kubernetes/v1.3/multi-cluster-connect',
                items: [
                  {
                    label: 'Connect from Outside Kubernetes',
                    contentSite: 'mck',
                    url: '/docs/kubernetes/v1.3/tutorial/multi-cluster-connect-from-outside-k8s',
                  },
                ],
              },
              {
                label: 'Sharded Cluster',
                contentSite: 'mck',
                url: '/docs/kubernetes/v1.3/multi-cluster-sharded-cluster',
              },
              {
                label: 'Sharded Cluster Without a Service Mesh',
                contentSite: 'mck',
                url: '/docs/kubernetes/v1.3/tutorial/non-service-mesh-mcsc',
              },
              {
                label: 'Replica Sets Disaster Recovery',
                contentSite: 'mck',
                url: '/docs/kubernetes/v1.3/multi-cluster-disaster-recovery',
              },
              {
                label: 'Sharded Cluster Disaster Recovery',
                contentSite: 'mck',
                collapsible: true,
                url: '/docs/kubernetes/v1.3/multi-cluster-sharded-cluster-disaster-recovery',
                items: [
                  {
                    label: 'Recover Available Cluster',
                    contentSite: 'mck',
                    url: '/docs/kubernetes/v1.3/tutorial/recover-mcsc-yes-k8sop-cluster',
                  },
                  {
                    label: 'Recover Failed Cluster',
                    contentSite: 'mck',
                    url: '/docs/kubernetes/v1.3/tutorial/recover-mcsc-no-k8sop-cluster',
                  },
                  {
                    label: 'Recover Lost Majority Replica Set',
                    contentSite: 'mck',
                    url: '/docs/kubernetes/v1.3/tutorial/recover-mcsc-forced-reconfig',
                  },
                ],
              },
              {
                label: 'Plugin Reference',
                contentSite: 'mck',
                url: '/docs/kubernetes/v1.3/plugin-reference',
              },
              {
                label: 'Troubleshoot',
                contentSite: 'mck',
                url: '/docs/kubernetes/v1.3/multi-cluster-troubleshooting',
              },
            ],
          },
          {
            label: 'Modify Containers',
            contentSite: 'mck',
            url: '/docs/kubernetes/v1.3/tutorial/modify-resource-image',
          },
          {
            label: 'Host on GDC',
            contentSite: 'mck',
            url: '/docs/kubernetes/v1.3/gdc-hosted',
          },
          {
            label: 'Reference Architectures',
            contentSite: 'mck',
            collapsible: true,
            url: '/docs/kubernetes/v1.3/reference-architectures',
            items: [
              {
                label: 'How to Use a Reference Architecture',
                contentSite: 'mck',
                url: '/docs/kubernetes/v1.3/reference-architectures/how-to-use',
              },
              {
                label: 'Multi-Cluster Architecture',
                contentSite: 'mck',
                collapsible: true,
                url: '/docs/kubernetes/v1.3/reference-architectures/multi-cluster/multi-cluster',
                items: [
                  {
                    label: 'GKE Clusters',
                    contentSite: 'mck',
                    url: '/docs/kubernetes/v1.3/reference-architectures/multi-cluster/gke-clusters',
                  },
                  {
                    label: 'Istio Service Mesh',
                    contentSite: 'mck',
                    url: '/docs/kubernetes/v1.3/reference-architectures/multi-cluster/istio-service-mesh',
                  },
                  {
                    label: 'TLS Certificates',
                    contentSite: 'mck',
                    url: '/docs/kubernetes/v1.3/reference-architectures/multi-cluster/ca-certs',
                  },
                  {
                    label: 'Deploy the Operator',
                    contentSite: 'mck',
                    url: '/docs/kubernetes/v1.3/reference-architectures/multi-cluster/deploy-operator',
                  },
                  {
                    label: 'Multi-Cluster Ops Manager',
                    contentSite: 'mck',
                    url: '/docs/kubernetes/v1.3/reference-architectures/multi-cluster/multi-cluster-om',
                  },
                  {
                    label: 'Multi-Cluster Replica Sets',
                    contentSite: 'mck',
                    url: '/docs/kubernetes/v1.3/reference-architectures/multi-cluster/multi-cluster-replica-sets',
                  },
                  {
                    label: 'Multi-Cluster Sharded Cluster',
                    contentSite: 'mck',
                    url: '/docs/kubernetes/v1.3/reference-architectures/multi-cluster/multi-cluster-sharded-cluster',
                  },
                ],
              },
              {
                label: 'Multi-Cluster Architecture Without Service Mesh',
                contentSite: 'mck',
                collapsible: true,
                url: '/docs/kubernetes/v1.3/reference-architectures/multi-cluster-no-mesh/multi-cluster-no-mesh',
                items: [
                  {
                    label: 'GKE Clusters',
                    contentSite: 'mck',
                    url: '/docs/kubernetes/v1.3/reference-architectures/multi-cluster-no-mesh/gke-clusters-no-mesh',
                  },
                  {
                    label: 'External DNS',
                    contentSite: 'mck',
                    url: '/docs/kubernetes/v1.3/reference-architectures/multi-cluster-no-mesh/external-dns-no-mesh',
                  },
                  {
                    label: 'Deploy the Operator',
                    contentSite: 'mck',
                    url: '/docs/kubernetes/v1.3/reference-architectures/multi-cluster-no-mesh/deploy-operator-no-mesh',
                  },
                  {
                    label: 'TLS Certificates',
                    contentSite: 'mck',
                    url: '/docs/kubernetes/v1.3/reference-architectures/multi-cluster-no-mesh/ca-certs-no-mesh',
                  },
                  {
                    label: 'Multi-Cluster Ops Manager',
                    contentSite: 'mck',
                    url: '/docs/kubernetes/v1.3/reference-architectures/multi-cluster-no-mesh/multi-cluster-om-no-mesh',
                  },
                  {
                    label: 'Multi-Cluster Replica Sets',
                    contentSite: 'mck',
                    url: '/docs/kubernetes/v1.3/reference-architectures/multi-cluster-no-mesh/multi-cluster-replica-sets-no-mesh',
                  },
                  {
                    label: 'Multi-Cluster Sharded Cluster',
                    contentSite: 'mck',
                    url: '/docs/kubernetes/v1.3/reference-architectures/multi-cluster-no-mesh/multi-cluster-sharded-cluster-no-mesh',
                  },
                ],
              },
            ],
          },
          {
            label: 'Reference',
            contentSite: 'mck',
            collapsible: true,
            url: '/docs/kubernetes/v1.3/reference',
            items: [
              {
                label: 'Ops Manager',
                contentSite: 'mck',
                url: '/docs/kubernetes/v1.3/reference/k8s-operator-om-specification',
              },
              {
                label: 'MongoDB User',
                contentSite: 'mck',
                url: '/docs/kubernetes/v1.3/reference/k8s-operator-mongodbuser-specification',
              },
              {
                label: 'Databases',
                contentSite: 'mck',
                url: '/docs/kubernetes/v1.3/reference/k8s-operator-specification',
              },
              {
                label: 'Multi-Kubernetes-Clusters',
                contentSite: 'mck',
                url: '/docs/kubernetes/v1.3/reference/k8s-operator-multi-cluster-specification',
              },
              {
                label: 'Enterprise Installation Settings',
                contentSite: 'mck',
                collapsible: true,
                url: '/docs/kubernetes/v1.3/reference/operator-settings',
                items: [
                  {
                    label: 'Operator `kubectl` & `oc`',
                    contentSite: 'mck',
                    url: '/docs/kubernetes/v1.3/reference/kubectl-operator-settings',
                  },
                  {
                    label: 'Operator Helm',
                    contentSite: 'mck',
                    url: '/docs/kubernetes/v1.3/reference/helm-operator-settings',
                  },
                ],
              },
              {
                label: 'Kubernetes Operator Telemetry',
                contentSite: 'mck',
                url: '/docs/kubernetes/v1.3/reference/meko-telemetry',
              },
              {
                label: 'Exclusive Settings',
                contentSite: 'mck',
                url: '/docs/kubernetes/v1.3/reference/k8s-op-exclusive-settings',
              },
              {
                label: 'CRD Log Rotation Settings',
                contentSite: 'mck',
                url: '/docs/kubernetes/v1.3/reference/k8s-operator-crd-logging-specification',
              },
              {
                label: 'Third-Party Integrations',
                contentSite: 'mck',
                url: '/docs/kubernetes/v1.3/third-party-integrations',
              },
              {
                label: 'Third-Party Licenses',
                contentSite: 'mck',
                url: '/docs/kubernetes/v1.3/third-party-licenses',
              },
            ],
          },
          {
            label: 'FAQ',
            contentSite: 'mck',
            url: '/docs/kubernetes/v1.3/faq',
          },
          {
            label: 'Release Notes',
            contentSite: 'mck',
            url: '/docs/kubernetes/v1.3/release-notes',
          },
          {
            label: 'Troubleshoot',
            contentSite: 'mck',
            url: '/docs/kubernetes/v1.3/reference/troubleshooting',
          },
          {
            label: 'Known Issues',
            contentSite: 'mck',
            url: '/docs/kubernetes/v1.3/reference/known-issues',
          },
          {
            label: 'Deploy MongoDB Community on Kubernetes',
            isExternal: true,
            url: 'https://github.com/mongodb/mongodb-kubernetes/tree/master/docs/mongodbcommunity',
          },
        ],
      },
    ],
  },
];
