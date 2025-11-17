import type { TocItem } from '../types';
import kubernetesOperatorVersions from '../version-arrays/cloud-docs/kubernetes-operator';

const tocData: TocItem[] = [
  {
    label: 'Enterprise Kubernetes Operator',
    contentSite: 'docs-k8s-operator',
    group: true,
    versionDropdown: true,
    versions: {
      includes: kubernetesOperatorVersions.after('v1.28', { inclusive: true }),
    },
    items: [
      {
        label: 'Quick Start',
        contentSite: 'docs-k8s-operator',
        url: '/docs/kubernetes-operator/:version/kind-quick-start',
      },
      {
        label: 'OpenShift Tutorials',
        contentSite: 'docs-k8s-operator',
        url: '/docs/kubernetes-operator/:version/openshift-tutorials',
        collapsible: true,
        items: [
          {
            label: 'Quick Start',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/:version/openshift-quick-start',
          },
          {
            label: 'Deploy in Restricted Network',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/:version/tutorial/restricted-network-tutorial',
          },
        ],
      },
      {
        label: 'Architecture',
        contentSite: 'docs-k8s-operator',
        url: '/docs/kubernetes-operator/:version/tutorial/plan-k8s-op-architecture',
      },
      {
        label: 'Security',
        contentSite: 'docs-k8s-operator',
        url: '/docs/kubernetes-operator/:version/security',
        collapsible: true,
        items: [
          {
            label: 'Verify Permissions',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/:version/permissions',
          },
          {
            label: 'Verify Signatures',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/:version/verify-signatures',
          },
          {
            label: 'Use Gatekeeper OPA',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/:version/opa-gatekeeper',
          },
          {
            label: 'Configure Encryption',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/:version/encryption',
          },
          {
            label: 'Configure Encryption at Rest',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/:version/encryption-at-rest',
          },
          {
            label: 'Enable Authentication',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/:version/authentication',
          },
          {
            label: 'Configure Secret Storage',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/:version/tutorial/secret-storage',
            collapsible: true,
            items: [
              {
                label: 'Create Secrets in Vault',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/:version/tutorial/create-vault-secret',
              },
            ],
          },
        ],
      },
      {
        label: 'Install',
        contentSite: 'docs-k8s-operator',
        url: '/docs/kubernetes-operator/:version/installation',
        collapsible: true,
        items: [
          {
            label: 'Plan Installation',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/:version/tutorial/plan-k8s-operator-install',
            collapsible: true,
            items: [
              {
                label: 'Architecture',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/:version/tutorial/plan-k8s-op-architecture',
              },
              {
                label: 'Compatibility',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/:version/tutorial/plan-k8s-op-compatibility',
              },
              {
                label: 'Container Images',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/:version/tutorial/plan-k8s-op-container-images',
              },
              {
                label: 'Single or Multi-Kubernetes Clusters',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/:version/tutorial/plan-k8s-install-single-or-multi-clusters',
              },
              {
                label: 'Set Deployment Scope',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/:version/tutorial/set-scope-k8s-operator',
              },
              {
                label: 'Considerations',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/:version/tutorial/plan-k8s-op-considerations',
              },
              {
                label: 'Prerequisites',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/:version/tutorial/plan-k8s-op-prerequisites',
              },
            ],
          },
          {
            label: 'Install',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/:version/tutorial/install-k8s-operator',
          },
          {
            label: 'Verify Package Integrity',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/:version/tutorial/verify-mongodb-packages',
            versions: { excludes: ['v1.25'] },
          },
          {
            label: 'Upgrade',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/:version/upgrade',
            collapsible: true,
            items: [
              {
                label: 'Upgrade Enterprise',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/:version/tutorial/upgrade-k8s-operator',
              },
              {
                label: 'Migrate from Ubuntu to UBI',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/:version/tutorial/migrate-k8s-images',
              },
            ],
          },
        ],
      },
      {
        label: 'Deploy Ops Manager',
        contentSite: 'docs-k8s-operator',
        url: '/docs/kubernetes-operator/:version/om-resources',
        collapsible: true,
        items: [
          {
            label: 'Ops Manager Architecture',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/:version/tutorial/om-arch',
            collapsible: true,
            items: [
              {
                label: 'MongoDBOpsManager Resource',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/:version/tutorial/om-resource-crd-parts',
              },
              {
                label: 'Reconciliation',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/:version/tutorial/om-arch-reconciliation',
              },
              {
                label: 'Multi-Cluster Deployments',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/:version/tutorial/om-arch-multi-cluster',
                collapsible: true,
                items: [
                  {
                    label: 'Diagram',
                    contentSite: 'docs-k8s-operator',
                    url: '/docs/kubernetes-operator/:version/tutorial/om-diagram-multi-cluster',
                  },
                  {
                    label: 'Networking, Load Balancing, Service Mesh',
                    contentSite: 'docs-k8s-operator',
                    url: '/docs/kubernetes-operator/:version/tutorial/om-nw-lb-mesh-multi-cluster',
                  },
                  {
                    label: 'Performance',
                    contentSite: 'docs-k8s-operator',
                    url: '/docs/kubernetes-operator/:version/tutorial/om-perf-multi-cluster',
                  },
                ],
              },
            ],
          },
          {
            label: 'Plan Resource',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/:version/tutorial/plan-om-resource',
          },
          {
            label: 'Deploy on Multiple Clusters',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/:version/tutorial/deploy-om-multi-cluster',
          },
          {
            label: 'Deploy Resource',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/:version/tutorial/deploy-om-container',
          },
          {
            label: 'Use Remote Mode',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/:version/tutorial/deploy-om-container-remote-mode',
          },
          {
            label: 'Use Local Mode',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/:version/tutorial/deploy-om-container-local-mode',
          },
          {
            label: 'Upgrade',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/:version/tutorial/upgrade-om-version',
          },
          {
            label: 'Configure Queryable Backups',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/:version/tutorial/configure-om-queryable-backups',
          },
          {
            label: 'Configure KMIP Backup Encryption',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/:version/tutorial/configure-kmip-backup-encryption',
          },
          {
            label: 'Configure File System Backup',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/:version/tutorial/configure-file-store',
          },
          {
            label: 'Configure cert-manager',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/:version/tutorial/cert-manager-integration',
          },
          {
            label: 'Disaster Recovery',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/:version/tutorial/disaster-recovery-om-appdb',
            collapsible: true,
            items: [
              {
                label: 'Recover Available Cluster',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/:version/tutorial/recover-om-appdb-yes-k8sop-cluster',
              },
              {
                label: 'Recover Failed Cluster',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/:version/tutorial/recover-om-appdb-no-k8sop-cluster',
              },
            ],
          },
        ],
      },
      {
        label: 'Deploy Database Resources',
        contentSite: 'docs-k8s-operator',
        url: '/docs/kubernetes-operator/:version/mdb-resources',
        collapsible: true,
        items: [
          {
            label: 'Database Architecture',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/:version/tutorial/mdb-resources-arch',
          },
          {
            label: 'Configure',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/:version/configure-k8s-operator-for-mdb-resources',
            collapsible: true,
            items: [
              {
                label: 'Create Credentials',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/:version/tutorial/create-operator-credentials',
              },
              {
                label: 'Create One Project',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/:version/tutorial/create-project-using-configmap',
              },
              {
                label: 'Generate X.509 Certificates',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/:version/tutorial/create-x509-client-certs',
              },
            ],
          },
          {
            label: 'Deploy',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/:version/deploy',
            collapsible: true,
            items: [
              {
                label: 'Standalone Instance',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/:version/tutorial/deploy-standalone',
              },
              {
                label: 'Replica Set',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/:version/tutorial/deploy-replica-set',
              },
              {
                label: 'Sharded Cluster',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/:version/tutorial/deploy-sharded-cluster',
              },
              {
                label: 'Use with Prometheus',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/:version/tutorial/deploy-prometheus',
              },
            ],
          },
          {
            label: 'Edit',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/:version/tutorial/edit-deployment',
            collapsible: true,
            items: [
              {
                label: 'Upgrade MongoDB',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/:version/tutorial/upgrade-mdb-version',
              },
              {
                label: 'Scale Deployment',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/:version/tutorial/scale-resources',
              },
              {
                label: 'Increase Storage',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/:version/tutorial/resize-pv-storage',
              },
            ],
          },
          {
            label: 'Secure Client Connections',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/:version/tutorial/secure-client-connections',
            collapsible: true,
            items: [
              {
                label: 'Use LDAP',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/:version/tutorial/secure-ldap-auth',
              },
              {
                label: 'Use X.509',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/:version/tutorial/secure-x509-auth',
              },
              {
                label: 'Use X.509 with Internal Authentication',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/:version/tutorial/secure-internal-auth',
              },
            ],
          },
          {
            label: 'Configure Backups',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/:version/tutorial/back-up-mdb-resources',
          },
          {
            label: 'Configure Topology',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/:version/tutorial/configure-mongodb-cluster-topology',
          },
          {
            label: 'Configure Storage Options',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/:version/tutorial/configure-mongodb-specific-storage',
          },
          {
            label: 'Manage Users',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/:version/manage-users',
            collapsible: true,
            items: [
              {
                label: 'Use LDAP',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/:version/tutorial/manage-database-users-ldap',
              },
              {
                label: 'Use SCRAM',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/:version/tutorial/manage-database-users-scram',
              },
              {
                label: 'Use X.509',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/:version/tutorial/manage-database-users-x509',
              },
            ],
          },
          {
            label: 'Connect',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/:version/connect',
            collapsible: true,
            items: [
              {
                label: 'Inside Kubernetes',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/:version/tutorial/connect-from-inside-k8s',
              },
              {
                label: 'Outside Kubernetes',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/:version/tutorial/connect-from-outside-k8s',
              },
            ],
          },
        ],
      },
      {
        label: 'Deploy on Multiple Kubernetes Clusters',
        contentSite: 'docs-k8s-operator',
        url: '/docs/kubernetes-operator/:version/multi-cluster',
        collapsible: true,
        items: [
          {
            label: 'Overview',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/:version/multi-cluster-overview',
          },
          {
            label: 'Architecture & Limitations',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/:version/multi-cluster-arch',
          },
          {
            label: 'Services & Tools',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/:version/multi-cluster-services-tools',
          },
          {
            label: 'Prerequisites',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/:version/multi-cluster-prerequisites',
          },
          {
            label: 'Quick Start',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/:version/multi-cluster-quick-start',
          },
          {
            label: 'Deploy a Resource',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/:version/multi-cluster-deploy-replica-set',
          },
          {
            label: 'Deploy Without a Service Mesh',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/:version/multi-cluster-no-service-mesh-deploy-rs',
          },
          {
            label: 'Edit a Resource',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/:version/tutorial/multi-cluster-edit-deployment',
          },
          {
            label: 'Secure Connections',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/:version/tutorial/multi-cluster-secure-client-connections',
            collapsible: true,
            items: [
              {
                label: 'Use LDAP',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/:version/tutorial/multi-cluster-secure-ldap-auth',
              },
              {
                label: 'Use X.509',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/:version/tutorial/multi-cluster-secure-x509',
              },
              {
                label: 'Use X.509 for Internal Authentication',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/:version/tutorial/multi-cluster-secure-internal-auth',
              },
            ],
          },
          {
            label: 'Access Resources',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/:version/multi-cluster-connect',
            collapsible: true,
            items: [
              {
                label: 'Connect from Outside Kubernetes',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/:version/tutorial/multi-cluster-connect-from-outside-k8s',
              },
            ],
          },
          {
            label: 'Sharded Cluster',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/:version/multi-cluster-sharded-cluster',
            versions: { excludes: ['v1.25', 'v1.26', 'v1.27'] },
          },
          {
            label: 'Sharded Cluster Without a Service Mesh',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/:version/tutorial/non-service-mesh-mcsc',
            versions: { includes: ['v1.32', 'v1.33'] },
          },
          {
            label: 'Replica Sets Disaster Recovery',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/:version/multi-cluster-disaster-recovery',
          },
          {
            label: 'Sharded Cluster Disaster Recovery',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/:version/multi-cluster-sharded-cluster-disaster-recovery',
            collapsible: true,
            items: [
              {
                label: 'Recover Available Cluster',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/:version/tutorial/recover-mcsc-yes-k8sop-cluster',
                versions: { includes: ['v1.32', 'v1.33'] },
              },
              {
                label: 'Recover Failed Cluster',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/:version/tutorial/recover-mcsc-no-k8sop-cluster',
                versions: { includes: ['v1.32', 'v1.33'] },
              },
              {
                label: 'Recover Lost Majority Replica Set',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/:version/tutorial/recover-mcsc-forced-reconfig',
                versions: { includes: ['v1.32', 'v1.33'] },
              },
            ],
          },
          {
            label: 'Plugin Reference',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/:version/plugin-reference',
          },
          {
            label: 'Troubleshoot',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/:version/multi-cluster-troubleshooting',
          },
        ],
      },
      {
        label: 'Modify Containers',
        contentSite: 'docs-k8s-operator',
        url: '/docs/kubernetes-operator/:version/tutorial/modify-resource-image',
      },
      {
        label: 'Host on GDC',
        contentSite: 'docs-k8s-operator',
        url: '/docs/kubernetes-operator/:version/gdc-hosted',
        versions: { excludes: ['v1.25'] },
      },
      {
        label: 'Reference Architectures',
        contentSite: 'docs-k8s-operator',
        url: '/docs/kubernetes-operator/:version/reference-architectures',
        collapsible: true,
        items: [
          {
            label: 'How to Use a Reference Architecture',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/:version/reference-architectures/how-to-use',
            versions: { includes: ['v1.32', 'v1.33'] },
          },
          {
            label: 'Multi-Cluster Architecture',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/:version/reference-architectures/multi-cluster/multi-cluster',
            collapsible: true,
            items: [
              {
                label: 'GKE Clusters',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/:version/reference-architectures/multi-cluster/gke-clusters',
                versions: { includes: ['v1.33'] },
              },
              {
                label: 'Istio Service Mesh',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/:version/reference-architectures/multi-cluster/istio-service-mesh',
                versions: { includes: ['v1.33'] },
              },
              {
                label: 'TLS Certificates',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/:version/reference-architectures/multi-cluster/ca-certs',
                versions: { includes: ['v1.33'] },
              },
              {
                label: 'Deploy the Operator',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/:version/reference-architectures/multi-cluster/deploy-operator',
                versions: { includes: ['v1.33'] },
              },
              {
                label: 'Multi-Cluster Ops Manager',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/:version/reference-architectures/multi-cluster/multi-cluster-om',
                versions: { includes: ['v1.33'] },
              },
              {
                label: 'Multi-Cluster Replica Sets',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/:version/reference-architectures/multi-cluster/multi-cluster-replica-sets',
                versions: { includes: ['v1.33'] },
              },
              {
                label: 'Multi-Cluster Sharded Cluster',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/:version/reference-architectures/multi-cluster/multi-cluster-sharded-cluster',
                versions: { includes: ['v1.33'] },
              },
            ],
          },
          {
            label: 'Multi-Cluster Architecture Without Service Mesh',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/:version/reference-architectures/multi-cluster-no-mesh/multi-cluster-no-mesh',
            collapsible: true,
            items: [
              {
                label: 'GKE Clusters',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/:version/reference-architectures/multi-cluster-no-mesh/gke-clusters-no-mesh',
                versions: { includes: ['v1.33'] },
              },
              {
                label: 'External DNS',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/:version/reference-architectures/multi-cluster-no-mesh/external-dns-no-mesh',
                versions: { includes: ['v1.33'] },
              },
              {
                label: 'Deploy the Operator',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/:version/reference-architectures/multi-cluster-no-mesh/deploy-operator-no-mesh',
                versions: { includes: ['v1.33'] },
              },
              {
                label: 'TLS Certificates',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/:version/reference-architectures/multi-cluster-no-mesh/ca-certs-no-mesh',
                versions: { includes: ['v1.33'] },
              },
              {
                label: 'Multi-Cluster Ops Manager',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/:version/reference-architectures/multi-cluster-no-mesh/multi-cluster-om-no-mesh',
                versions: { includes: ['v1.33'] },
              },
              {
                label: 'Multi-Cluster Replica Sets',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/:version/reference-architectures/multi-cluster-no-mesh/multi-cluster-replica-sets-no-mesh',
                versions: { includes: ['v1.33'] },
              },
              {
                label: 'Multi-Cluster Sharded Cluster',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/:version/reference-architectures/multi-cluster-no-mesh/multi-cluster-sharded-cluster-no-mesh',
                versions: { includes: ['v1.33'] },
              },
            ],
          },
        ],
      },
      {
        label: 'Reference',
        contentSite: 'docs-k8s-operator',
        url: '/docs/kubernetes-operator/:version/reference',
        collapsible: true,
        items: [
          {
            label: 'Ops Manager',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/:version/reference/k8s-operator-om-specification',
          },
          {
            label: 'MongoDB User',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/:version/reference/k8s-operator-mongodbuser-specification',
          },
          {
            label: 'Databases',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/:version/reference/k8s-operator-specification',
          },
          {
            label: 'Multi-Kubernetes-Clusters',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/:version/reference/k8s-operator-multi-cluster-specification',
          },
          {
            label: 'Enterprise Installation Settings',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/:version/reference/operator-settings',
            collapsible: true,
            items: [
              {
                label: 'Operator `kubectl` & `oc`',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/:version/reference/kubectl-operator-settings',
              },
              {
                label: 'Operator Helm',
                contentSite: 'docs-k8s-operator',
                url: '/docs/kubernetes-operator/:version/reference/helm-operator-settings',
              },
            ],
          },
          {
            label: 'Kubernetes Operator Telemetry',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/:version/reference/meko-telemetry',
            versions: { includes: ['v1.32', 'v1.33'] },
          },
          {
            label: 'Exclusive Settings',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/:version/reference/k8s-op-exclusive-settings',
          },
          {
            label: 'Support Lifecycle',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/:version/reference/support-lifecycle',
          },
          {
            label: 'CRD Log Rotation Settings',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/:version/reference/k8s-operator-crd-logging-specification',
          },
          {
            label: 'Third-Party Integrations',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/:version/third-party-integrations',
          },
          {
            label: 'Third-Party Licenses',
            contentSite: 'docs-k8s-operator',
            url: '/docs/kubernetes-operator/:version/third-party-licenses',
          },
        ],
      },
      {
        label: 'FAQ',
        contentSite: 'docs-k8s-operator',
        url: '/docs/kubernetes-operator/:version/faq',
      },
      {
        label: 'Release Notes',
        contentSite: 'docs-k8s-operator',
        url: '/docs/kubernetes-operator/:version/release-notes',
      },
      {
        label: 'Troubleshoot',
        contentSite: 'docs-k8s-operator',
        url: '/docs/kubernetes-operator/:version/reference/troubleshooting',
      },
      {
        label: 'Known Issues',
        contentSite: 'docs-k8s-operator',
        url: '/docs/kubernetes-operator/:version/reference/known-issues',
      },
      {
        label: 'MongoDB Community Kubernetes Operator',
        isExternal: true,
        url: 'https://github.com/mongodb/mongodb-kubernetes-operator',
      },
    ],
  },
];

export default tocData;
