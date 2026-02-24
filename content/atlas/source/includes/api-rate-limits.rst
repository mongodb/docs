.. Last updated: February 23, 2026 at 5:30 PM EST

.. _api-rate-limits-aws-clusters-dns:

AWS Clusters DNS
~~~~~~~~~~~~~~~~

**Scope:** GROUP

**Capacity:** 1200

**Refill:** 500/60s

**Endpoints:**

* **GET** ``/api/atlas/v2/groups/{groupId}/awsCustomDNS``
* **PATCH** ``/api/atlas/v2/groups/{groupId}/awsCustomDNS``

.. _api-rate-limits-access-logs:

Access Logs
~~~~~~~~~~~

**Scope:** GROUP

**Capacity:** 1200

**Refill:** 500/60s

**Endpoints:**

* **GET** ``/api/atlas/v2/groups/{groupId}/dbAccessHistory/clusters/{clusterName}``
* **GET** ``/api/atlas/v2/groups/{groupId}/dbAccessHistory/processes/{hostname}``

.. _api-rate-limits-activity-feed:

Activity Feed
~~~~~~~~~~~~~

**Scope:** GROUP

**Capacity:** 1200

**Refill:** 500/60s

**Endpoints:**

* **GET** ``/api/atlas/v2/groups/{groupId}/activityFeed``

**Scope:** ORGANIZATION

**Capacity:** 500

**Refill:** 250/60s

**Endpoints:**

* **GET** ``/api/atlas/v2/orgs/{orgId}/activityFeed``

.. _api-rate-limits-alert-configurations:

Alert Configurations
~~~~~~~~~~~~~~~~~~~~

**Scope:** GROUP

**Capacity:** 1200

**Refill:** 500/60s

**Endpoints:**

* **DELETE** ``/api/atlas/v2/groups/{groupId}/alertConfigs/{alertConfigId}``
* **GET** ``/api/atlas/v2/groups/{groupId}/alertConfigs``
* **GET** ``/api/atlas/v2/groups/{groupId}/alertConfigs/{alertConfigId}``
* **PATCH** ``/api/atlas/v2/groups/{groupId}/alertConfigs/{alertConfigId}``
* **POST** ``/api/atlas/v2/groups/{groupId}/alertConfigs``
* **PUT** ``/api/atlas/v2/groups/{groupId}/alertConfigs/{alertConfigId}``

**Scope:** USER

**Capacity:** 300

**Refill:** 100/60s

**Endpoints:**

* **GET** ``/api/atlas/v2/alertConfigs/matchers/fieldNames``

.. _api-rate-limits-alerts:

Alerts
~~~~~~

**Scope:** GROUP

**Capacity:** 1200

**Refill:** 500/60s

**Endpoints:**

* **GET** ``/api/atlas/v2/groups/{groupId}/alertConfigs/{alertConfigId}/alerts``
* **GET** ``/api/atlas/v2/groups/{groupId}/alerts``
* **GET** ``/api/atlas/v2/groups/{groupId}/alerts/{alertId}``
* **GET** ``/api/atlas/v2/groups/{groupId}/alerts/{alertId}/alertConfigs``
* **PATCH** ``/api/atlas/v2/groups/{groupId}/alerts/{alertId}``

.. _api-rate-limits-atlas-search-deployments:

Atlas Search Deployments
~~~~~~~~~~~~~~~~~~~~~~~~

**Scope:** GROUP

**Capacity:** 1200

**Refill:** 500/60s

**Endpoints:**

* **DELETE** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/search/deployment``
* **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/search/deployment``
* **PATCH** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/search/deployment``
* **POST** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/search/deployment``

.. _api-rate-limits-atlas-search-indexes:

Atlas Search Indexes
~~~~~~~~~~~~~~~~~~~~

**Scope:** GROUP

**Capacity:** 1200

**Refill:** 500/60s

**Endpoints:**

* **DELETE** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/fts/indexes/{indexId}``
* **DELETE** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/search/indexes/{databaseName}/{collectionName}/{indexName}``
* **DELETE** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/search/indexes/{indexId}``
* **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/fts/indexes/{databaseName}/{collectionName}``
* **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/fts/indexes/{indexId}``
* **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/search/indexes``
* **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/search/indexes/{databaseName}/{collectionName}``
* **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/search/indexes/{databaseName}/{collectionName}/{indexName}``
* **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/search/indexes/{indexId}``
* **PATCH** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/fts/indexes/{indexId}``
* **PATCH** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/search/indexes/{databaseName}/{collectionName}/{indexName}``
* **PATCH** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/search/indexes/{indexId}``
* **POST** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/fts/indexes``
* **POST** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/search/indexes``

.. _api-rate-limits-auditing:

Auditing
~~~~~~~~

**Scope:** GROUP

**Capacity:** 1200

**Refill:** 500/60s

**Endpoints:**

* **GET** ``/api/atlas/v2/groups/{groupId}/auditLog``
* **PATCH** ``/api/atlas/v2/groups/{groupId}/auditLog``

.. _api-rate-limits-cloud-backups:

Cloud Backups
~~~~~~~~~~~~~

**Scope:** GROUP

**Capacity:** 1200

**Refill:** 500/60s

**Endpoints:**

* **DELETE** ``/api/atlas/v2/groups/{groupId}/backup/exportBuckets/{exportBucketId}``
* **DELETE** ``/api/atlas/v2/groups/{groupId}/backup/{cloudProvider}/privateEndpoints/{endpointId}``
* **DELETE** ``/api/atlas/v2/groups/{groupId}/backupCompliancePolicy``
* **DELETE** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/backup/restoreJobs/{restoreJobId}``
* **DELETE** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/backup/schedule``
* **DELETE** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/backup/snapshots/shardedCluster/{snapshotId}``
* **DELETE** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/backup/snapshots/{snapshotId}``
* **GET** ``/api/atlas/v2/groups/{groupId}/backup/exportBuckets``
* **GET** ``/api/atlas/v2/groups/{groupId}/backup/exportBuckets/{exportBucketId}``
* **GET** ``/api/atlas/v2/groups/{groupId}/backup/{cloudProvider}/privateEndpoints``
* **GET** ``/api/atlas/v2/groups/{groupId}/backup/{cloudProvider}/privateEndpoints/{endpointId}``
* **GET** ``/api/atlas/v2/groups/{groupId}/backupCompliancePolicy``
* **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/backup/exports``
* **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/backup/exports/{exportId}``
* **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/backup/restoreJobs``
* **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/backup/restoreJobs/{restoreJobId}``
* **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/backup/schedule``
* **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/backup/snapshots``
* **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/backup/snapshots/shardedCluster/{snapshotId}``
* **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/backup/snapshots/shardedClusters``
* **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/backup/snapshots/{snapshotId}``
* **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/restoreJobs``
* **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/restoreJobs/{jobId}``
* **PATCH** ``/api/atlas/v2/groups/{groupId}/backup/exportBuckets/{exportBucketId}``
* **PATCH** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/backup/schedule``
* **PATCH** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/backup/snapshots/{snapshotId}``
* **POST** ``/api/atlas/v2/groups/{groupId}/backup/exportBuckets``
* **POST** ``/api/atlas/v2/groups/{groupId}/backup/{cloudProvider}/privateEndpoints``
* **POST** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/backup/exports``
* **POST** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/backup/restoreJobs``
* **POST** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/backup/snapshots``
* **POST** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/restoreJobs``
* **PUT** ``/api/atlas/v2/groups/{groupId}/backupCompliancePolicy``

.. _api-rate-limits-cloud-migration-service:

Cloud Migration Service
~~~~~~~~~~~~~~~~~~~~~~~

**Scope:** GROUP

**Capacity:** 1200

**Refill:** 500/60s

**Endpoints:**

* **GET** ``/api/atlas/v2/groups/{groupId}/liveMigrations/validate/{validationId}``
* **GET** ``/api/atlas/v2/groups/{groupId}/liveMigrations/{liveMigrationId}``
* **POST** ``/api/atlas/v2/groups/{groupId}/liveMigrations``
* **POST** ``/api/atlas/v2/groups/{groupId}/liveMigrations/validate``
* **PUT** ``/api/atlas/v2/groups/{groupId}/liveMigrations/{liveMigrationId}/cutover``

**Scope:** ORGANIZATION

**Capacity:** 500

**Refill:** 250/60s

**Endpoints:**

* **DELETE** ``/api/atlas/v2/orgs/{orgId}/liveMigrations/linkTokens``
* **GET** ``/api/atlas/v2/orgs/{orgId}/liveMigrations/availableProjects``
* **POST** ``/api/atlas/v2/orgs/{orgId}/liveMigrations/linkTokens``

.. _api-rate-limits-cloud-provider-access:

Cloud Provider Access
~~~~~~~~~~~~~~~~~~~~~

**Scope:** GROUP

**Capacity:** 2000

**Refill:** 1000/60s

**Endpoints:**

* **DELETE** ``/api/atlas/v2/groups/{groupId}/cloudProviderAccess/{cloudProvider}/{roleId}``
* **GET** ``/api/atlas/v2/groups/{groupId}/cloudProviderAccess``
* **GET** ``/api/atlas/v2/groups/{groupId}/cloudProviderAccess/{roleId}``
* **PATCH** ``/api/atlas/v2/groups/{groupId}/cloudProviderAccess/{roleId}``
* **POST** ``/api/atlas/v2/groups/{groupId}/cloudProviderAccess``

.. _api-rate-limits-cluster-log-monitoring:

Cluster Log Monitoring
~~~~~~~~~~~~~~~~~~~~~~

**Scope:** GROUP

**Capacity:** 10000

**Refill:** 5000/60s

**Endpoints:**

* **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{hostName}/logs/{logName}.gz``

.. _api-rate-limits-cluster-outage-simulation:

Cluster Outage Simulation
~~~~~~~~~~~~~~~~~~~~~~~~~

**Scope:** GROUP

**Capacity:** 1200

**Refill:** 500/60s

**Endpoints:**

* **DELETE** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/outageSimulation``
* **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/outageSimulation``
* **POST** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/outageSimulation``

.. _api-rate-limits-clusters:

Clusters
~~~~~~~~

**Scope:** GROUP

**Capacity:** 10000

**Refill:** 5000/60s

**Endpoints:**

* **DELETE** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}``
* **GET** ``/api/atlas/v2/groups/{groupId}/clusters``
* **GET** ``/api/atlas/v2/groups/{groupId}/clusters/provider/regions``
* **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}``
* **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/autoScalingConfiguration``
* **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/processArgs``
* **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/status``
* **GET** ``/api/atlas/v2/groups/{groupId}/sampleDatasetLoad/{sampleDatasetId}``
* **PATCH** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}``
* **PATCH** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/processArgs``
* **POST** ``/api/atlas/v2/groups/{groupId}/clusters``
* **POST** ``/api/atlas/v2/groups/{groupId}/clusters/tenantUpgrade``
* **POST** ``/api/atlas/v2/groups/{groupId}/clusters/tenantUpgradeToServerless``
* **POST** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/restartPrimaries``
* **POST** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}:grantMongoDBEmployeeAccess``
* **POST** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}:pinFeatureCompatibilityVersion``
* **POST** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}:revokeMongoDBEmployeeAccess``
* **POST** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}:unpinFeatureCompatibilityVersion``
* **POST** ``/api/atlas/v2/groups/{groupId}/sampleDatasetLoad/{name}``

**Scope:** USER

**Capacity:** 300

**Refill:** 100/60s

**Endpoints:**

* **GET** ``/api/atlas/v2/clusters``

.. _api-rate-limits-collection-level-metrics:

Collection Level Metrics
~~~~~~~~~~~~~~~~~~~~~~~~

**Scope:** GROUP

**Capacity:** 300

**Refill:** 100/60s

**Endpoints:**

* **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/collStats/pinned``
* **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/{clusterView}/collStats/namespaces``
* **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/{clusterView}/{databaseName}/{collectionName}/collStats/measurements``
* **GET** ``/api/atlas/v2/groups/{groupId}/collStats/metrics``
* **GET** ``/api/atlas/v2/groups/{groupId}/processes/{processId}/collStats/namespaces``
* **GET** ``/api/atlas/v2/groups/{groupId}/processes/{processId}/{databaseName}/{collectionName}/collStats/measurements``
* **PATCH** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/collStats/pinned``
* **PATCH** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/collStats/unpin``
* **PUT** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/collStats/pinned``

.. _api-rate-limits-custom-database-roles:

Custom Database Roles
~~~~~~~~~~~~~~~~~~~~~

**Scope:** GROUP

**Capacity:** 2000

**Refill:** 1000/60s

**Endpoints:**

* **DELETE** ``/api/atlas/v2/groups/{groupId}/customDBRoles/roles/{roleName}``
* **GET** ``/api/atlas/v2/groups/{groupId}/customDBRoles/roles``
* **GET** ``/api/atlas/v2/groups/{groupId}/customDBRoles/roles/{roleName}``
* **PATCH** ``/api/atlas/v2/groups/{groupId}/customDBRoles/roles/{roleName}``
* **POST** ``/api/atlas/v2/groups/{groupId}/customDBRoles/roles``

.. _api-rate-limits-data-federation:

Data Federation
~~~~~~~~~~~~~~~

**Scope:** GROUP

**Capacity:** 1200

**Refill:** 500/60s

**Endpoints:**

* **DELETE** ``/api/atlas/v2/groups/{groupId}/dataFederation/{tenantName}``
* **DELETE** ``/api/atlas/v2/groups/{groupId}/dataFederation/{tenantName}/limits/{limitName}``
* **DELETE** ``/api/atlas/v2/groups/{groupId}/privateNetworkSettings/endpointIds/{endpointId}``
* **GET** ``/api/atlas/v2/groups/{groupId}/dataFederation``
* **GET** ``/api/atlas/v2/groups/{groupId}/dataFederation/{tenantName}``
* **GET** ``/api/atlas/v2/groups/{groupId}/dataFederation/{tenantName}/limits``
* **GET** ``/api/atlas/v2/groups/{groupId}/dataFederation/{tenantName}/limits/{limitName}``
* **GET** ``/api/atlas/v2/groups/{groupId}/dataFederation/{tenantName}/queryLogs.gz``
* **GET** ``/api/atlas/v2/groups/{groupId}/privateNetworkSettings/endpointIds``
* **GET** ``/api/atlas/v2/groups/{groupId}/privateNetworkSettings/endpointIds/{endpointId}``
* **PATCH** ``/api/atlas/v2/groups/{groupId}/dataFederation/{tenantName}``
* **PATCH** ``/api/atlas/v2/groups/{groupId}/dataFederation/{tenantName}/limits/{limitName}``
* **POST** ``/api/atlas/v2/groups/{groupId}/dataFederation``
* **POST** ``/api/atlas/v2/groups/{groupId}/privateNetworkSettings/endpointIds``

.. _api-rate-limits-database-users:

Database Users
~~~~~~~~~~~~~~

**Scope:** GROUP

**Capacity:** 10000

**Refill:** 5000/60s

**Endpoints:**

* **DELETE** ``/api/atlas/v2/groups/{groupId}/databaseUsers/{databaseName}/{username}``
* **GET** ``/api/atlas/v2/groups/{groupId}/databaseUsers``
* **GET** ``/api/atlas/v2/groups/{groupId}/databaseUsers/{databaseName}/{username}``
* **PATCH** ``/api/atlas/v2/groups/{groupId}/databaseUsers/{databaseName}/{username}``
* **POST** ``/api/atlas/v2/groups/{groupId}/databaseUsers``

.. _api-rate-limits-encryption-at-rest-using-customer-key-management:

Encryption At Rest Using Customer Key Management
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Scope:** GROUP

**Capacity:** 2000

**Refill:** 1000/60s

**Endpoints:**

* **DELETE** ``/api/atlas/v2/groups/{groupId}/encryptionAtRest/{cloudProvider}/privateEndpoints/{endpointId}``
* **GET** ``/api/atlas/v2/groups/{groupId}/encryptionAtRest``
* **GET** ``/api/atlas/v2/groups/{groupId}/encryptionAtRest/{cloudProvider}/privateEndpoints``
* **GET** ``/api/atlas/v2/groups/{groupId}/encryptionAtRest/{cloudProvider}/privateEndpoints/{endpointId}``
* **PATCH** ``/api/atlas/v2/groups/{groupId}/encryptionAtRest``
* **POST** ``/api/atlas/v2/groups/{groupId}/encryptionAtRest/{cloudProvider}/privateEndpoints``

.. _api-rate-limits-events:

Events
~~~~~~

**Scope:** GROUP

**Capacity:** 300

**Refill:** 100/60s

**Endpoints:**

* **GET** ``/api/atlas/v2/groups/{groupId}/events``
* **GET** ``/api/atlas/v2/groups/{groupId}/events/{eventId}``

**Scope:** ORGANIZATION

**Capacity:** 500

**Refill:** 250/60s

**Endpoints:**

* **GET** ``/api/atlas/v2/orgs/{orgId}/events``
* **GET** ``/api/atlas/v2/orgs/{orgId}/events/{eventId}``

**Scope:** USER

**Capacity:** 300

**Refill:** 100/60s

**Endpoints:**

* **GET** ``/api/atlas/v2/eventTypes``

.. _api-rate-limits-federated-authentication:

Federated Authentication
~~~~~~~~~~~~~~~~~~~~~~~~

**Scope:** ORGANIZATION

**Capacity:** 500

**Refill:** 250/60s

**Endpoints:**

* **DELETE** ``/api/atlas/v2/federationSettings/{federationSettingsId}/connectedOrgConfigs/{orgId}``
* **DELETE** ``/api/atlas/v2/federationSettings/{federationSettingsId}/connectedOrgConfigs/{orgId}/roleMappings/{id}``
* **GET** ``/api/atlas/v2/federationSettings/{federationSettingsId}/connectedOrgConfigs/{orgId}``
* **GET** ``/api/atlas/v2/federationSettings/{federationSettingsId}/connectedOrgConfigs/{orgId}/roleMappings``
* **GET** ``/api/atlas/v2/federationSettings/{federationSettingsId}/connectedOrgConfigs/{orgId}/roleMappings/{id}``
* **GET** ``/api/atlas/v2/orgs/{orgId}/federationSettings``
* **PATCH** ``/api/atlas/v2/federationSettings/{federationSettingsId}/connectedOrgConfigs/{orgId}``
* **POST** ``/api/atlas/v2/federationSettings/{federationSettingsId}/connectedOrgConfigs/{orgId}/roleMappings``
* **PUT** ``/api/atlas/v2/federationSettings/{federationSettingsId}/connectedOrgConfigs/{orgId}/roleMappings/{id}``

**Scope:** USER

**Capacity:** 300

**Refill:** 100/60s

**Endpoints:**

* **DELETE** ``/api/atlas/v2/federationSettings/{federationSettingsId}``
* **DELETE** ``/api/atlas/v2/federationSettings/{federationSettingsId}/identityProviders/{identityProviderId}``
* **DELETE** ``/api/atlas/v2/federationSettings/{federationSettingsId}/identityProviders/{identityProviderId}/jwks``
* **GET** ``/api/atlas/v2/federationSettings/{federationSettingsId}/connectedOrgConfigs``
* **GET** ``/api/atlas/v2/federationSettings/{federationSettingsId}/identityProviders``
* **GET** ``/api/atlas/v2/federationSettings/{federationSettingsId}/identityProviders/{identityProviderId}``
* **GET** ``/api/atlas/v2/federationSettings/{federationSettingsId}/identityProviders/{identityProviderId}/metadata.xml``
* **PATCH** ``/api/atlas/v2/federationSettings/{federationSettingsId}/identityProviders/{identityProviderId}``
* **POST** ``/api/atlas/v2/federationSettings/{federationSettingsId}/identityProviders``

.. _api-rate-limits-flex-clusters:

Flex Clusters
~~~~~~~~~~~~~

**Scope:** GROUP

**Capacity:** 1200

**Refill:** 500/60s

**Endpoints:**

* **DELETE** ``/api/atlas/v2/groups/{groupId}/flexClusters/{name}``
* **GET** ``/api/atlas/v2/groups/{groupId}/flexClusters``
* **GET** ``/api/atlas/v2/groups/{groupId}/flexClusters/{name}``
* **PATCH** ``/api/atlas/v2/groups/{groupId}/flexClusters/{name}``
* **POST** ``/api/atlas/v2/groups/{groupId}/flexClusters``
* **POST** ``/api/atlas/v2/groups/{groupId}/flexClusters:tenantUpgrade``

.. _api-rate-limits-flex-restore-jobs:

Flex Restore Jobs
~~~~~~~~~~~~~~~~~

**Scope:** GROUP

**Capacity:** 1200

**Refill:** 500/60s

**Endpoints:**

* **GET** ``/api/atlas/v2/groups/{groupId}/flexClusters/{name}/backup/restoreJobs``
* **GET** ``/api/atlas/v2/groups/{groupId}/flexClusters/{name}/backup/restoreJobs/{restoreJobId}``
* **POST** ``/api/atlas/v2/groups/{groupId}/flexClusters/{name}/backup/restoreJobs``

.. _api-rate-limits-flex-snapshots:

Flex Snapshots
~~~~~~~~~~~~~~

**Scope:** GROUP

**Capacity:** 1200

**Refill:** 500/60s

**Endpoints:**

* **GET** ``/api/atlas/v2/groups/{groupId}/flexClusters/{name}/backup/snapshots``
* **GET** ``/api/atlas/v2/groups/{groupId}/flexClusters/{name}/backup/snapshots/{snapshotId}``
* **POST** ``/api/atlas/v2/groups/{groupId}/flexClusters/{name}/backup/download``

.. _api-rate-limits-global-clusters:

Global Clusters
~~~~~~~~~~~~~~~

**Scope:** GROUP

**Capacity:** 1200

**Refill:** 500/60s

**Endpoints:**

* **DELETE** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/globalWrites/customZoneMapping``
* **DELETE** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/globalWrites/managedNamespaces``
* **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/globalWrites``
* **POST** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/globalWrites/customZoneMapping``
* **POST** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/globalWrites/managedNamespaces``

.. _api-rate-limits-ip-addresses:

IP Addresses
~~~~~~~~~~~~

**Scope:** GROUP

**Capacity:** 1200

**Refill:** 500/60s

**Endpoints:**

* **GET** ``/api/atlas/v2/groups/{groupId}/ipAddresses``

.. _api-rate-limits-invoices:

Invoices
~~~~~~~~

**Scope:** ORGANIZATION

**Capacity:** 500

**Refill:** 100/60s

**Endpoints:**

* **GET** ``/api/atlas/v2/orgs/{orgId}/billing/costExplorer/usage/{token}``
* **GET** ``/api/atlas/v2/orgs/{orgId}/invoices``
* **GET** ``/api/atlas/v2/orgs/{orgId}/invoices/pending``
* **GET** ``/api/atlas/v2/orgs/{orgId}/invoices/{invoiceId}``
* **GET** ``/api/atlas/v2/orgs/{orgId}/invoices/{invoiceId}/csv``
* **GET** ``/api/atlas/v2/orgs/{orgId}/invoices/{invoiceId}/lineItems:search``
* **POST** ``/api/atlas/v2/orgs/{orgId}/billing/costExplorer/usage``

**Scope:** USER

**Capacity:** 300

**Refill:** 100/60s

**Endpoints:**

* **GET** ``/api/atlas/v2/skus``
* **GET** ``/api/atlas/v2/skus/{skuId}``

.. _api-rate-limits-ldap-configuration:

LDAP Configuration
~~~~~~~~~~~~~~~~~~

**Scope:** GROUP

**Capacity:** 1200

**Refill:** 500/60s

**Endpoints:**

* **DELETE** ``/api/atlas/v2/groups/{groupId}/userSecurity/ldap/userToDNMapping``
* **GET** ``/api/atlas/v2/groups/{groupId}/userSecurity``
* **GET** ``/api/atlas/v2/groups/{groupId}/userSecurity/ldap/verify/{requestId}``
* **PATCH** ``/api/atlas/v2/groups/{groupId}/userSecurity``
* **POST** ``/api/atlas/v2/groups/{groupId}/userSecurity/ldap/verify``

.. _api-rate-limits-legacy-backup:

Legacy Backup
~~~~~~~~~~~~~

**Scope:** GROUP

**Capacity:** 1200

**Refill:** 500/60s

**Endpoints:**

* **DELETE** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/snapshots/{snapshotId}``
* **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/backupCheckpoints``
* **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/backupCheckpoints/{checkpointId}``
* **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/snapshotSchedule``
* **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/snapshots``
* **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/snapshots/{snapshotId}``
* **PATCH** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/snapshotSchedule``
* **PATCH** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/snapshots/{snapshotId}``

.. _api-rate-limits-maintenance-windows:

Maintenance Windows
~~~~~~~~~~~~~~~~~~~

**Scope:** GROUP

**Capacity:** 1200

**Refill:** 500/60s

**Endpoints:**

* **DELETE** ``/api/atlas/v2/groups/{groupId}/maintenanceWindow``
* **GET** ``/api/atlas/v2/groups/{groupId}/maintenanceWindow``
* **PATCH** ``/api/atlas/v2/groups/{groupId}/maintenanceWindow``
* **POST** ``/api/atlas/v2/groups/{groupId}/maintenanceWindow/autoDefer``
* **POST** ``/api/atlas/v2/groups/{groupId}/maintenanceWindow/defer``

.. _api-rate-limits-mongodb-cloud-users:

MongoDB Cloud Users
~~~~~~~~~~~~~~~~~~~

**Scope:** GROUP

**Capacity:** 1200

**Refill:** 500/60s

**Endpoints:**

* **DELETE** ``/api/atlas/v2/groups/{groupId}/users/{userId}``
* **GET** ``/api/atlas/v2/groups/{groupId}/users``
* **GET** ``/api/atlas/v2/groups/{groupId}/users/{userId}``
* **POST** ``/api/atlas/v2/groups/{groupId}/users``
* **POST** ``/api/atlas/v2/groups/{groupId}/users/{userId}:addRole``
* **POST** ``/api/atlas/v2/groups/{groupId}/users/{userId}:removeRole``
* **PUT** ``/api/atlas/v2/groups/{groupId}/users/{userId}/roles``

**Scope:** ORGANIZATION

**Capacity:** 500

**Refill:** 250/60s

**Endpoints:**

* **DELETE** ``/api/atlas/v2/orgs/{orgId}/users/{userId}``
* **GET** ``/api/atlas/v2/orgs/{orgId}/users``
* **GET** ``/api/atlas/v2/orgs/{orgId}/users/{userId}``
* **PATCH** ``/api/atlas/v2/orgs/{orgId}/users/{userId}``
* **POST** ``/api/atlas/v2/orgs/{orgId}/users``
* **POST** ``/api/atlas/v2/orgs/{orgId}/users/{userId}:addRole``
* **POST** ``/api/atlas/v2/orgs/{orgId}/users/{userId}:removeRole``
* **PUT** ``/api/atlas/v2/orgs/{orgId}/users/{userId}/roles``

**Scope:** USER

**Capacity:** 2500

**Refill:** 2000/60s

**Endpoints:**

* **GET** ``/api/atlas/v2/users/byName/{userName}``
* **GET** ``/api/atlas/v2/users/{userId}``
* **POST** ``/api/atlas/v2/users``

.. _api-rate-limits-monitoring-and-logs:

Monitoring And Logs
~~~~~~~~~~~~~~~~~~~

**Scope:** GROUP

**Capacity:** 300

**Refill:** 100/60s

**Endpoints:**

* **GET** ``/api/atlas/v2/groups/{groupId}/hosts/{processId}/fts/metrics``
* **GET** ``/api/atlas/v2/groups/{groupId}/hosts/{processId}/fts/metrics/indexes/{databaseName}/{collectionName}/measurements``
* **GET** ``/api/atlas/v2/groups/{groupId}/hosts/{processId}/fts/metrics/indexes/{databaseName}/{collectionName}/{indexName}/measurements``
* **GET** ``/api/atlas/v2/groups/{groupId}/hosts/{processId}/fts/metrics/measurements``
* **GET** ``/api/atlas/v2/groups/{groupId}/processes``
* **GET** ``/api/atlas/v2/groups/{groupId}/processes/{processId}``
* **GET** ``/api/atlas/v2/groups/{groupId}/processes/{processId}/databases``
* **GET** ``/api/atlas/v2/groups/{groupId}/processes/{processId}/databases/{databaseName}``
* **GET** ``/api/atlas/v2/groups/{groupId}/processes/{processId}/databases/{databaseName}/measurements``
* **GET** ``/api/atlas/v2/groups/{groupId}/processes/{processId}/disks``
* **GET** ``/api/atlas/v2/groups/{groupId}/processes/{processId}/disks/{partitionName}``
* **GET** ``/api/atlas/v2/groups/{groupId}/processes/{processId}/disks/{partitionName}/measurements``
* **GET** ``/api/atlas/v2/groups/{groupId}/processes/{processId}/measurements``

.. _api-rate-limits-network-peering:

Network Peering
~~~~~~~~~~~~~~~

**Scope:** GROUP

**Capacity:** 2000

**Refill:** 1000/60s

**Endpoints:**

* **DELETE** ``/api/atlas/v2/groups/{groupId}/containers/{containerId}``
* **DELETE** ``/api/atlas/v2/groups/{groupId}/peers/{peerId}``
* **GET** ``/api/atlas/v2/groups/{groupId}/containers``
* **GET** ``/api/atlas/v2/groups/{groupId}/containers/all``
* **GET** ``/api/atlas/v2/groups/{groupId}/containers/{containerId}``
* **GET** ``/api/atlas/v2/groups/{groupId}/peers``
* **GET** ``/api/atlas/v2/groups/{groupId}/peers/{peerId}``
* **GET** ``/api/atlas/v2/groups/{groupId}/privateIpMode``
* **PATCH** ``/api/atlas/v2/groups/{groupId}/containers/{containerId}``
* **PATCH** ``/api/atlas/v2/groups/{groupId}/peers/{peerId}``
* **PATCH** ``/api/atlas/v2/groups/{groupId}/privateIpMode``
* **POST** ``/api/atlas/v2/groups/{groupId}/containers``
* **POST** ``/api/atlas/v2/groups/{groupId}/peers``

.. _api-rate-limits-online-archive:

Online Archive
~~~~~~~~~~~~~~

**Scope:** GROUP

**Capacity:** 1200

**Refill:** 500/60s

**Endpoints:**

* **DELETE** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/onlineArchives/{archiveId}``
* **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/onlineArchives``
* **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/onlineArchives/queryLogs.gz``
* **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/onlineArchives/{archiveId}``
* **PATCH** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/onlineArchives/{archiveId}``
* **POST** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/onlineArchives``

.. _api-rate-limits-organization-settings:

Organization Settings
~~~~~~~~~~~~~~~~~~~~~

**Scope:** ORGANIZATION

**Capacity:** 10

**Refill:** 5/60s

**Endpoints:**

* **GET** ``/api/atlas/v2/orgs/{orgId}/settings``
* **PATCH** ``/api/atlas/v2/orgs/{orgId}/settings``

.. _api-rate-limits-organizations:

Organizations
~~~~~~~~~~~~~

**Scope:** ORGANIZATION

**Capacity:** 500

**Refill:** 250/60s

**Endpoints:**

* **DELETE** ``/api/atlas/v2/orgs/{orgId}``
* **DELETE** ``/api/atlas/v2/orgs/{orgId}/invites/{invitationId}``
* **GET** ``/api/atlas/v2/orgs/{orgId}``
* **GET** ``/api/atlas/v2/orgs/{orgId}/groups``
* **GET** ``/api/atlas/v2/orgs/{orgId}/invites``
* **GET** ``/api/atlas/v2/orgs/{orgId}/invites/{invitationId}``
* **PATCH** ``/api/atlas/v2/orgs/{orgId}``
* **PATCH** ``/api/atlas/v2/orgs/{orgId}/invites``
* **PATCH** ``/api/atlas/v2/orgs/{orgId}/invites/{invitationId}``
* **POST** ``/api/atlas/v2/orgs/{orgId}/invites``

**Scope:** USER

**Capacity:** 300

**Refill:** 100/60s

**Endpoints:**

* **GET** ``/api/atlas/v2/orgs``
* **POST** ``/api/atlas/v2/orgs``

.. _api-rate-limits-performance-advisor:

Performance Advisor
~~~~~~~~~~~~~~~~~~~

**Scope:** GROUP

**Capacity:** 1200

**Refill:** 500/60s

**Endpoints:**

* **DELETE** ``/api/atlas/v2/groups/{groupId}/managedSlowMs/disable``
* **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/performanceAdvisor/dropIndexSuggestions``
* **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/performanceAdvisor/schemaAdvice``
* **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/performanceAdvisor/suggestedIndexes``
* **GET** ``/api/atlas/v2/groups/{groupId}/managedSlowMs``
* **GET** ``/api/atlas/v2/groups/{groupId}/processes/{processId}/performanceAdvisor/namespaces``
* **GET** ``/api/atlas/v2/groups/{groupId}/processes/{processId}/performanceAdvisor/slowQueryLogs``
* **GET** ``/api/atlas/v2/groups/{groupId}/processes/{processId}/performanceAdvisor/suggestedIndexes``
* **POST** ``/api/atlas/v2/groups/{groupId}/managedSlowMs/enable``

.. _api-rate-limits-private-endpoint-services:

Private Endpoint Services
~~~~~~~~~~~~~~~~~~~~~~~~~

**Scope:** GROUP

**Capacity:** 4000

**Refill:** 2000/60s

**Endpoints:**

* **DELETE** ``/api/atlas/v2/groups/{groupId}/privateEndpoint/{cloudProvider}/endpointService/{endpointServiceId}``
* **DELETE** ``/api/atlas/v2/groups/{groupId}/privateEndpoint/{cloudProvider}/endpointService/{endpointServiceId}/endpoint/{endpointId}``
* **GET** ``/api/atlas/v2/groups/{groupId}/privateEndpoint/regionalMode``
* **GET** ``/api/atlas/v2/groups/{groupId}/privateEndpoint/{cloudProvider}/endpointService``
* **GET** ``/api/atlas/v2/groups/{groupId}/privateEndpoint/{cloudProvider}/endpointService/{endpointServiceId}``
* **GET** ``/api/atlas/v2/groups/{groupId}/privateEndpoint/{cloudProvider}/endpointService/{endpointServiceId}/endpoint/{endpointId}``
* **PATCH** ``/api/atlas/v2/groups/{groupId}/privateEndpoint/regionalMode``
* **POST** ``/api/atlas/v2/groups/{groupId}/privateEndpoint/endpointService``
* **POST** ``/api/atlas/v2/groups/{groupId}/privateEndpoint/{cloudProvider}/endpointService/{endpointServiceId}/endpoint``

.. _api-rate-limits-programmatic-api-keys:

Programmatic API Keys
~~~~~~~~~~~~~~~~~~~~~

**Scope:** GROUP

**Capacity:** 1200

**Refill:** 500/60s

**Endpoints:**

* **DELETE** ``/api/atlas/v2/groups/{groupId}/apiKeys/{apiUserId}``
* **GET** ``/api/atlas/v2/groups/{groupId}/apiKeys``
* **PATCH** ``/api/atlas/v2/groups/{groupId}/apiKeys/{apiUserId}``
* **POST** ``/api/atlas/v2/groups/{groupId}/apiKeys``
* **POST** ``/api/atlas/v2/groups/{groupId}/apiKeys/{apiUserId}``

**Scope:** ORGANIZATION

**Capacity:** 500

**Refill:** 250/60s

**Endpoints:**

* **DELETE** ``/api/atlas/v2/orgs/{orgId}/apiKeys/{apiUserId}``
* **DELETE** ``/api/atlas/v2/orgs/{orgId}/apiKeys/{apiUserId}/accessList/{ipAddress}``
* **GET** ``/api/atlas/v2/orgs/{orgId}/apiKeys``
* **GET** ``/api/atlas/v2/orgs/{orgId}/apiKeys/{apiUserId}``
* **GET** ``/api/atlas/v2/orgs/{orgId}/apiKeys/{apiUserId}/accessList``
* **GET** ``/api/atlas/v2/orgs/{orgId}/apiKeys/{apiUserId}/accessList/{ipAddress}``
* **PATCH** ``/api/atlas/v2/orgs/{orgId}/apiKeys/{apiUserId}``
* **POST** ``/api/atlas/v2/orgs/{orgId}/apiKeys``
* **POST** ``/api/atlas/v2/orgs/{orgId}/apiKeys/{apiUserId}/accessList``

.. _api-rate-limits-project-ip-access-list:

Project IP Access List
~~~~~~~~~~~~~~~~~~~~~~

**Scope:** GROUP

**Capacity:** 1200

**Refill:** 500/60s

**Endpoints:**

* **DELETE** ``/api/atlas/v2/groups/{groupId}/accessList/{entryValue}``
* **GET** ``/api/atlas/v2/groups/{groupId}/accessList``
* **GET** ``/api/atlas/v2/groups/{groupId}/accessList/{entryValue}``
* **GET** ``/api/atlas/v2/groups/{groupId}/accessList/{entryValue}/status``
* **POST** ``/api/atlas/v2/groups/{groupId}/accessList``

.. _api-rate-limits-projects:

Projects
~~~~~~~~

**Scope:** GROUP

**Capacity:** 1200

**Refill:** 500/60s

**Endpoints:**

* **DELETE** ``/api/atlas/v2/groups/{groupId}``
* **DELETE** ``/api/atlas/v2/groups/{groupId}/invites/{invitationId}``
* **DELETE** ``/api/atlas/v2/groups/{groupId}/limits/{limitName}``
* **GET** ``/api/atlas/v2/groups/{groupId}``
* **GET** ``/api/atlas/v2/groups/{groupId}/invites``
* **GET** ``/api/atlas/v2/groups/{groupId}/invites/{invitationId}``
* **GET** ``/api/atlas/v2/groups/{groupId}/limits``
* **GET** ``/api/atlas/v2/groups/{groupId}/limits/{limitName}``
* **GET** ``/api/atlas/v2/groups/{groupId}/mongoDBVersions``
* **GET** ``/api/atlas/v2/groups/{groupId}/settings``
* **PATCH** ``/api/atlas/v2/groups/{groupId}``
* **PATCH** ``/api/atlas/v2/groups/{groupId}/invites``
* **PATCH** ``/api/atlas/v2/groups/{groupId}/invites/{invitationId}``
* **PATCH** ``/api/atlas/v2/groups/{groupId}/limits/{limitName}``
* **PATCH** ``/api/atlas/v2/groups/{groupId}/settings``
* **POST** ``/api/atlas/v2/groups/{groupId}/access``
* **POST** ``/api/atlas/v2/groups/{groupId}/invites``
* **POST** ``/api/atlas/v2/groups/{groupId}:migrate``

**Scope:** USER

**Capacity:** 1200

**Refill:** 500/60s

**Endpoints:**

* **GET** ``/api/atlas/v2/groups``
* **GET** ``/api/atlas/v2/groups/byName/{groupName}``
* **POST** ``/api/atlas/v2/groups``

.. _api-rate-limits-push-based-log-exports:

Push Based Log Exports
~~~~~~~~~~~~~~~~~~~~~~

**Scope:** GROUP

**Capacity:** 1200

**Refill:** 500/60s

**Endpoints:**

* **DELETE** ``/api/atlas/v2/groups/{groupId}/logIntegrations/{id}``
* **DELETE** ``/api/atlas/v2/groups/{groupId}/pushBasedLogExport``
* **GET** ``/api/atlas/v2/groups/{groupId}/logIntegrations``
* **GET** ``/api/atlas/v2/groups/{groupId}/logIntegrations/{id}``
* **GET** ``/api/atlas/v2/groups/{groupId}/pushBasedLogExport``
* **PATCH** ``/api/atlas/v2/groups/{groupId}/pushBasedLogExport``
* **POST** ``/api/atlas/v2/groups/{groupId}/logIntegrations``
* **POST** ``/api/atlas/v2/groups/{groupId}/pushBasedLogExport``
* **PUT** ``/api/atlas/v2/groups/{groupId}/logIntegrations/{id}``

.. _api-rate-limits-query-shape-insights:

Query Shape Insights
~~~~~~~~~~~~~~~~~~~~

**Scope:** GROUP

**Capacity:** 1200

**Refill:** 500/60s

**Endpoints:**

* **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/queryShapeInsights/summaries``
* **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/queryShapeInsights/{queryShapeHash}/details``
* **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/queryShapes``
* **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/queryShapes/{queryShapeHash}``
* **PATCH** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/queryShapes/{queryShapeHash}``

.. _api-rate-limits-rate-limits-inspection:

Rate Limits Inspection
~~~~~~~~~~~~~~~~~~~~~~

**Scope:** USER

**Capacity:** 300

**Refill:** 100/60s

**Endpoints:**

* **GET** ``/api/atlas/v2/rateLimits``
* **GET** ``/api/atlas/v2/rateLimits/{endpointSetId}``

.. _api-rate-limits-resource-policies:

Resource Policies
~~~~~~~~~~~~~~~~~

**Scope:** ORGANIZATION

**Capacity:** 500

**Refill:** 250/60s

**Endpoints:**

* **DELETE** ``/api/atlas/v2/orgs/{orgId}/resourcePolicies/{resourcePolicyId}``
* **GET** ``/api/atlas/v2/orgs/{orgId}/nonCompliantResources``
* **GET** ``/api/atlas/v2/orgs/{orgId}/resourcePolicies``
* **GET** ``/api/atlas/v2/orgs/{orgId}/resourcePolicies/{resourcePolicyId}``
* **PATCH** ``/api/atlas/v2/orgs/{orgId}/resourcePolicies/{resourcePolicyId}``
* **POST** ``/api/atlas/v2/orgs/{orgId}/resourcePolicies``
* **POST** ``/api/atlas/v2/orgs/{orgId}/resourcePolicies:validate``

.. _api-rate-limits-root:

Root
~~~~

**Scope:** IP

**Capacity:** 400

**Refill:** 100/60s

**Endpoints:**

* **GET** ``/api/atlas/v2/unauth/controlPlaneIPAddresses``

**Scope:** USER

**Capacity:** 300

**Refill:** 100/60s

**Endpoints:**

* **GET** ``/api/atlas/v2``

.. _api-rate-limits-service-accounts:

Service Accounts
~~~~~~~~~~~~~~~~

**Scope:** GROUP

**Capacity:** 1200

**Refill:** 500/60s

**Endpoints:**

* **DELETE** ``/api/atlas/v2/groups/{groupId}/serviceAccounts/{clientId}``
* **DELETE** ``/api/atlas/v2/groups/{groupId}/serviceAccounts/{clientId}/accessList/{ipAddress}``
* **DELETE** ``/api/atlas/v2/groups/{groupId}/serviceAccounts/{clientId}/secrets/{secretId}``
* **GET** ``/api/atlas/v2/groups/{groupId}/serviceAccounts``
* **GET** ``/api/atlas/v2/groups/{groupId}/serviceAccounts/{clientId}``
* **GET** ``/api/atlas/v2/groups/{groupId}/serviceAccounts/{clientId}/accessList``
* **PATCH** ``/api/atlas/v2/groups/{groupId}/serviceAccounts/{clientId}``
* **POST** ``/api/atlas/v2/groups/{groupId}/serviceAccounts``
* **POST** ``/api/atlas/v2/groups/{groupId}/serviceAccounts/{clientId}/accessList``
* **POST** ``/api/atlas/v2/groups/{groupId}/serviceAccounts/{clientId}/secrets``
* **POST** ``/api/atlas/v2/groups/{groupId}/serviceAccounts/{clientId}:invite``

**Scope:** ORGANIZATION

**Capacity:** 500

**Refill:** 250/60s

**Endpoints:**

* **DELETE** ``/api/atlas/v2/orgs/{orgId}/serviceAccounts/{clientId}``
* **DELETE** ``/api/atlas/v2/orgs/{orgId}/serviceAccounts/{clientId}/accessList/{ipAddress}``
* **DELETE** ``/api/atlas/v2/orgs/{orgId}/serviceAccounts/{clientId}/secrets/{secretId}``
* **GET** ``/api/atlas/v2/orgs/{orgId}/serviceAccounts``
* **GET** ``/api/atlas/v2/orgs/{orgId}/serviceAccounts/{clientId}``
* **GET** ``/api/atlas/v2/orgs/{orgId}/serviceAccounts/{clientId}/accessList``
* **GET** ``/api/atlas/v2/orgs/{orgId}/serviceAccounts/{clientId}/groups``
* **PATCH** ``/api/atlas/v2/orgs/{orgId}/serviceAccounts/{clientId}``
* **POST** ``/api/atlas/v2/orgs/{orgId}/serviceAccounts``
* **POST** ``/api/atlas/v2/orgs/{orgId}/serviceAccounts/{clientId}/accessList``
* **POST** ``/api/atlas/v2/orgs/{orgId}/serviceAccounts/{clientId}/secrets``

.. _api-rate-limits-shared-tier-restore-jobs:

Shared Tier Restore Jobs
~~~~~~~~~~~~~~~~~~~~~~~~

**Scope:** GROUP

**Capacity:** 4000

**Refill:** 2000/60s

**Endpoints:**

* **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/backup/tenant/restores``
* **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/backup/tenant/restores/{restoreId}``
* **POST** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/backup/tenant/restore``

.. _api-rate-limits-shared-tier-snapshots:

Shared Tier Snapshots
~~~~~~~~~~~~~~~~~~~~~

**Scope:** GROUP

**Capacity:** 4000

**Refill:** 2000/60s

**Endpoints:**

* **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/backup/tenant/snapshots``
* **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/backup/tenant/snapshots/{snapshotId}``
* **POST** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/backup/tenant/download``

.. _api-rate-limits-streams:

Streams
~~~~~~~

**Scope:** GROUP

**Capacity:** 1200

**Refill:** 500/60s

**Endpoints:**

* **DELETE** ``/api/atlas/v2/groups/{groupId}/streams/privateLinkConnections/{connectionId}``
* **DELETE** ``/api/atlas/v2/groups/{groupId}/streams/vpcPeeringConnections/{id}``
* **DELETE** ``/api/atlas/v2/groups/{groupId}/streams/{tenantName}``
* **DELETE** ``/api/atlas/v2/groups/{groupId}/streams/{tenantName}/connections/{connectionName}``
* **DELETE** ``/api/atlas/v2/groups/{groupId}/streams/{tenantName}/processor/{processorName}``
* **GET** ``/api/atlas/v2/groups/{groupId}/streams``
* **GET** ``/api/atlas/v2/groups/{groupId}/streams/accountDetails``
* **GET** ``/api/atlas/v2/groups/{groupId}/streams/activeVpcPeeringConnections``
* **GET** ``/api/atlas/v2/groups/{groupId}/streams/privateLinkConnections``
* **GET** ``/api/atlas/v2/groups/{groupId}/streams/privateLinkConnections/{connectionId}``
* **GET** ``/api/atlas/v2/groups/{groupId}/streams/vpcPeeringConnections``
* **GET** ``/api/atlas/v2/groups/{groupId}/streams/{tenantName}``
* **GET** ``/api/atlas/v2/groups/{groupId}/streams/{tenantName}/auditLogs``
* **GET** ``/api/atlas/v2/groups/{groupId}/streams/{tenantName}/connections``
* **GET** ``/api/atlas/v2/groups/{groupId}/streams/{tenantName}/connections/{connectionName}``
* **GET** ``/api/atlas/v2/groups/{groupId}/streams/{tenantName}/processor/{processorName}``
* **GET** ``/api/atlas/v2/groups/{groupId}/streams/{tenantName}/processors``
* **GET** ``/api/atlas/v2/groups/{groupId}/streams/{tenantName}:downloadOperationalLogs``
* **PATCH** ``/api/atlas/v2/groups/{groupId}/streams/{tenantName}``
* **PATCH** ``/api/atlas/v2/groups/{groupId}/streams/{tenantName}/connections/{connectionName}``
* **PATCH** ``/api/atlas/v2/groups/{groupId}/streams/{tenantName}/processor/{processorName}``
* **POST** ``/api/atlas/v2/groups/{groupId}/streams``
* **POST** ``/api/atlas/v2/groups/{groupId}/streams/privateLinkConnections``
* **POST** ``/api/atlas/v2/groups/{groupId}/streams/vpcPeeringConnections/{id}:accept``
* **POST** ``/api/atlas/v2/groups/{groupId}/streams/vpcPeeringConnections/{id}:reject``
* **POST** ``/api/atlas/v2/groups/{groupId}/streams/{tenantName}/connections``
* **POST** ``/api/atlas/v2/groups/{groupId}/streams/{tenantName}/processor``
* **POST** ``/api/atlas/v2/groups/{groupId}/streams/{tenantName}/processor/{processorName}:start``
* **POST** ``/api/atlas/v2/groups/{groupId}/streams/{tenantName}/processor/{processorName}:startWith``
* **POST** ``/api/atlas/v2/groups/{groupId}/streams/{tenantName}/processor/{processorName}:stop``
* **POST** ``/api/atlas/v2/groups/{groupId}/streams:withSampleConnections``

.. _api-rate-limits-teams:

Teams
~~~~~

**Scope:** GROUP

**Capacity:** 1200

**Refill:** 500/60s

**Endpoints:**

* **DELETE** ``/api/atlas/v2/groups/{groupId}/teams/{teamId}``
* **GET** ``/api/atlas/v2/groups/{groupId}/teams``
* **GET** ``/api/atlas/v2/groups/{groupId}/teams/{teamId}``
* **PATCH** ``/api/atlas/v2/groups/{groupId}/teams/{teamId}``
* **POST** ``/api/atlas/v2/groups/{groupId}/teams``

**Scope:** ORGANIZATION

**Capacity:** 1200

**Refill:** 500/60s

**Endpoints:**

* **DELETE** ``/api/atlas/v2/orgs/{orgId}/teams/{teamId}``
* **DELETE** ``/api/atlas/v2/orgs/{orgId}/teams/{teamId}/users/{userId}``
* **GET** ``/api/atlas/v2/orgs/{orgId}/teams``
* **GET** ``/api/atlas/v2/orgs/{orgId}/teams/byName/{teamName}``
* **GET** ``/api/atlas/v2/orgs/{orgId}/teams/{teamId}``
* **GET** ``/api/atlas/v2/orgs/{orgId}/teams/{teamId}/users``
* **PATCH** ``/api/atlas/v2/orgs/{orgId}/teams/{teamId}``
* **POST** ``/api/atlas/v2/orgs/{orgId}/teams``
* **POST** ``/api/atlas/v2/orgs/{orgId}/teams/{teamId}/users``
* **POST** ``/api/atlas/v2/orgs/{orgId}/teams/{teamId}:addUser``
* **POST** ``/api/atlas/v2/orgs/{orgId}/teams/{teamId}:removeUser``

.. _api-rate-limits-third-party-integrations:

Third Party Integrations
~~~~~~~~~~~~~~~~~~~~~~~~

**Scope:** GROUP

**Capacity:** 1200

**Refill:** 500/60s

**Endpoints:**

* **DELETE** ``/api/atlas/v2/groups/{groupId}/integrations/{integrationType}``
* **GET** ``/api/atlas/v2/groups/{groupId}/integrations``
* **GET** ``/api/atlas/v2/groups/{groupId}/integrations/{integrationType}``
* **POST** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/index``
* **POST** ``/api/atlas/v2/groups/{groupId}/integrations/{integrationType}``
* **PUT** ``/api/atlas/v2/groups/{groupId}/integrations/{integrationType}``

.. _api-rate-limits-x509-authentication:

X509 Authentication
~~~~~~~~~~~~~~~~~~~

**Scope:** GROUP

**Capacity:** 1200

**Refill:** 500/60s

**Endpoints:**

* **DELETE** ``/api/atlas/v2/groups/{groupId}/userSecurity/customerX509``
* **GET** ``/api/atlas/v2/groups/{groupId}/databaseUsers/{username}/certs``
* **POST** ``/api/atlas/v2/groups/{groupId}/databaseUsers/{username}/certs``

