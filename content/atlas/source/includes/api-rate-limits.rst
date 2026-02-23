.. Last updated: February 23, 2026 at 10:16 AM EST

.. list-table::
   :header-rows: 1
   :widths: 20 10 35 10 10 15

   * - Endpoint Set
     - Scope
     - Endpoints
     - Max Capacity
     - Refill Rate
     - Refill Interval (seconds)

   * - AWS Clusters DNS
     - GROUP
     - | **GET** ``/api/atlas/v2/groups/{groupId}/awsCustomDNS``
       | **PATCH** ``/api/atlas/v2/groups/{groupId}/awsCustomDNS``
     - 1200
     - 500
     - 60

   * - Access Logs
     - GROUP
     - | **GET** ``/api/atlas/v2/groups/{groupId}/dbAccessHistory/clusters/{clusterName}``
       | **GET** ``/api/atlas/v2/groups/{groupId}/dbAccessHistory/processes/{hostname}``
     - 1200
     - 500
     - 60

   * - Activity Feed
     - GROUP
     - | **GET** ``/api/atlas/v2/groups/{groupId}/activityFeed``
     - 1200
     - 500
     - 60

   * - Activity Feed
     - ORGANIZATION
     - | **GET** ``/api/atlas/v2/orgs/{orgId}/activityFeed``
     - 500
     - 250
     - 60

   * - Alert Configurations
     - GROUP
     - | **DELETE** ``/api/atlas/v2/groups/{groupId}/alertConfigs/{alertConfigId}``
       | **GET** ``/api/atlas/v2/groups/{groupId}/alertConfigs``
       | **GET** ``/api/atlas/v2/groups/{groupId}/alertConfigs/{alertConfigId}``
       | **PATCH** ``/api/atlas/v2/groups/{groupId}/alertConfigs/{alertConfigId}``
       | **POST** ``/api/atlas/v2/groups/{groupId}/alertConfigs``
       | **PUT** ``/api/atlas/v2/groups/{groupId}/alertConfigs/{alertConfigId}``
     - 1200
     - 500
     - 60

   * - Alert Configurations
     - USER
     - | **GET** ``/api/atlas/v2/alertConfigs/matchers/fieldNames``
     - 300
     - 100
     - 60

   * - Alerts
     - GROUP
     - | **GET** ``/api/atlas/v2/groups/{groupId}/alertConfigs/{alertConfigId}/alerts``
       | **GET** ``/api/atlas/v2/groups/{groupId}/alerts``
       | **GET** ``/api/atlas/v2/groups/{groupId}/alerts/{alertId}``
       | **GET** ``/api/atlas/v2/groups/{groupId}/alerts/{alertId}/alertConfigs``
       | **PATCH** ``/api/atlas/v2/groups/{groupId}/alerts/{alertId}``
     - 1200
     - 500
     - 60

   * - Atlas Search Deployments
     - GROUP
     - | **DELETE** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/search/deployment``
       | **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/search/deployment``
       | **PATCH** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/search/deployment``
       | **POST** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/search/deployment``
     - 1200
     - 500
     - 60

   * - Atlas Search Indexes
     - GROUP
     - | **DELETE** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/fts/indexes/{indexId}``
       | **DELETE** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/search/indexes/{databaseName}/{collectionName}/{indexName}``
       | **DELETE** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/search/indexes/{indexId}``
       | **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/fts/indexes/{databaseName}/{collectionName}``
       | **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/fts/indexes/{indexId}``
       | **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/search/indexes``
       | **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/search/indexes/{databaseName}/{collectionName}``
       | **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/search/indexes/{databaseName}/{collectionName}/{indexName}``
       | **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/search/indexes/{indexId}``
       | **PATCH** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/fts/indexes/{indexId}``
       | **PATCH** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/search/indexes/{databaseName}/{collectionName}/{indexName}``
       | **PATCH** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/search/indexes/{indexId}``
       | **POST** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/fts/indexes``
       | **POST** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/search/indexes``
     - 1200
     - 500
     - 60

   * - Auditing
     - GROUP
     - | **GET** ``/api/atlas/v2/groups/{groupId}/auditLog``
       | **PATCH** ``/api/atlas/v2/groups/{groupId}/auditLog``
     - 1200
     - 500
     - 60

   * - Cloud Backups
     - GROUP
     - | **DELETE** ``/api/atlas/v2/groups/{groupId}/backup/exportBuckets/{exportBucketId}``
       | **DELETE** ``/api/atlas/v2/groups/{groupId}/backup/{cloudProvider}/privateEndpoints/{endpointId}``
       | **DELETE** ``/api/atlas/v2/groups/{groupId}/backupCompliancePolicy``
       | **DELETE** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/backup/restoreJobs/{restoreJobId}``
       | **DELETE** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/backup/schedule``
       | **DELETE** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/backup/snapshots/shardedCluster/{snapshotId}``
       | **DELETE** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/backup/snapshots/{snapshotId}``
       | **GET** ``/api/atlas/v2/groups/{groupId}/backup/exportBuckets``
       | **GET** ``/api/atlas/v2/groups/{groupId}/backup/exportBuckets/{exportBucketId}``
       | **GET** ``/api/atlas/v2/groups/{groupId}/backup/{cloudProvider}/privateEndpoints``
       | **GET** ``/api/atlas/v2/groups/{groupId}/backup/{cloudProvider}/privateEndpoints/{endpointId}``
       | **GET** ``/api/atlas/v2/groups/{groupId}/backupCompliancePolicy``
       | **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/backup/exports``
       | **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/backup/exports/{exportId}``
       | **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/backup/restoreJobs``
       | **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/backup/restoreJobs/{restoreJobId}``
       | **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/backup/schedule``
       | **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/backup/snapshots``
       | **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/backup/snapshots/shardedCluster/{snapshotId}``
       | **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/backup/snapshots/shardedClusters``
       | **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/backup/snapshots/{snapshotId}``
       | **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/restoreJobs``
       | **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/restoreJobs/{jobId}``
       | **PATCH** ``/api/atlas/v2/groups/{groupId}/backup/exportBuckets/{exportBucketId}``
       | **PATCH** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/backup/schedule``
       | **PATCH** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/backup/snapshots/{snapshotId}``
       | **POST** ``/api/atlas/v2/groups/{groupId}/backup/exportBuckets``
       | **POST** ``/api/atlas/v2/groups/{groupId}/backup/{cloudProvider}/privateEndpoints``
       | **POST** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/backup/exports``
       | **POST** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/backup/restoreJobs``
       | **POST** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/backup/snapshots``
       | **POST** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/restoreJobs``
       | **PUT** ``/api/atlas/v2/groups/{groupId}/backupCompliancePolicy``
     - 1200
     - 500
     - 60

   * - Cloud Migration Service
     - GROUP
     - | **GET** ``/api/atlas/v2/groups/{groupId}/liveMigrations/validate/{validationId}``
       | **GET** ``/api/atlas/v2/groups/{groupId}/liveMigrations/{liveMigrationId}``
       | **POST** ``/api/atlas/v2/groups/{groupId}/liveMigrations``
       | **POST** ``/api/atlas/v2/groups/{groupId}/liveMigrations/validate``
       | **PUT** ``/api/atlas/v2/groups/{groupId}/liveMigrations/{liveMigrationId}/cutover``
     - 1200
     - 500
     - 60

   * - Cloud Migration Service
     - ORGANIZATION
     - | **DELETE** ``/api/atlas/v2/orgs/{orgId}/liveMigrations/linkTokens``
       | **GET** ``/api/atlas/v2/orgs/{orgId}/liveMigrations/availableProjects``
       | **POST** ``/api/atlas/v2/orgs/{orgId}/liveMigrations/linkTokens``
     - 500
     - 250
     - 60

   * - Cloud Provider Access
     - GROUP
     - | **DELETE** ``/api/atlas/v2/groups/{groupId}/cloudProviderAccess/{cloudProvider}/{roleId}``
       | **GET** ``/api/atlas/v2/groups/{groupId}/cloudProviderAccess``
       | **GET** ``/api/atlas/v2/groups/{groupId}/cloudProviderAccess/{roleId}``
       | **PATCH** ``/api/atlas/v2/groups/{groupId}/cloudProviderAccess/{roleId}``
       | **POST** ``/api/atlas/v2/groups/{groupId}/cloudProviderAccess``
     - 2000
     - 1000
     - 60

   * - Cluster Log Monitoring
     - GROUP
     - | **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{hostName}/logs/{logName}.gz``
     - 10000
     - 5000
     - 60

   * - Cluster Outage Simulation
     - GROUP
     - | **DELETE** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/outageSimulation``
       | **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/outageSimulation``
       | **POST** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/outageSimulation``
     - 1200
     - 500
     - 60

   * - Clusters
     - GROUP
     - | **DELETE** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}``
       | **GET** ``/api/atlas/v2/groups/{groupId}/clusters``
       | **GET** ``/api/atlas/v2/groups/{groupId}/clusters/provider/regions``
       | **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}``
       | **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/autoScalingConfiguration``
       | **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/processArgs``
       | **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/status``
       | **GET** ``/api/atlas/v2/groups/{groupId}/sampleDatasetLoad/{sampleDatasetId}``
       | **PATCH** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}``
       | **PATCH** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/processArgs``
       | **POST** ``/api/atlas/v2/groups/{groupId}/clusters``
       | **POST** ``/api/atlas/v2/groups/{groupId}/clusters/tenantUpgrade``
       | **POST** ``/api/atlas/v2/groups/{groupId}/clusters/tenantUpgradeToServerless``
       | **POST** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/restartPrimaries``
       | **POST** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}:grantMongoDBEmployeeAccess``
       | **POST** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}:pinFeatureCompatibilityVersion``
       | **POST** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}:revokeMongoDBEmployeeAccess``
       | **POST** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}:unpinFeatureCompatibilityVersion``
       | **POST** ``/api/atlas/v2/groups/{groupId}/sampleDatasetLoad/{name}``
     - 10000
     - 5000
     - 60

   * - Clusters
     - USER
     - | **GET** ``/api/atlas/v2/clusters``
     - 300
     - 100
     - 60

   * - Collection Level Metrics
     - GROUP
     - | **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/collStats/pinned``
       | **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/{clusterView}/collStats/namespaces``
       | **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/{clusterView}/{databaseName}/{collectionName}/collStats/measurements``
       | **GET** ``/api/atlas/v2/groups/{groupId}/collStats/metrics``
       | **GET** ``/api/atlas/v2/groups/{groupId}/processes/{processId}/collStats/namespaces``
       | **GET** ``/api/atlas/v2/groups/{groupId}/processes/{processId}/{databaseName}/{collectionName}/collStats/measurements``
       | **PATCH** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/collStats/pinned``
       | **PATCH** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/collStats/unpin``
       | **PUT** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/collStats/pinned``
     - 300
     - 100
     - 60

   * - Custom Database Roles
     - GROUP
     - | **DELETE** ``/api/atlas/v2/groups/{groupId}/customDBRoles/roles/{roleName}``
       | **GET** ``/api/atlas/v2/groups/{groupId}/customDBRoles/roles``
       | **GET** ``/api/atlas/v2/groups/{groupId}/customDBRoles/roles/{roleName}``
       | **PATCH** ``/api/atlas/v2/groups/{groupId}/customDBRoles/roles/{roleName}``
       | **POST** ``/api/atlas/v2/groups/{groupId}/customDBRoles/roles``
     - 2000
     - 1000
     - 60

   * - Data Federation
     - GROUP
     - | **DELETE** ``/api/atlas/v2/groups/{groupId}/dataFederation/{tenantName}``
       | **DELETE** ``/api/atlas/v2/groups/{groupId}/dataFederation/{tenantName}/limits/{limitName}``
       | **DELETE** ``/api/atlas/v2/groups/{groupId}/dataLakes/{tenantName}``
       | **DELETE** ``/api/atlas/v2/groups/{groupId}/privateNetworkSettings/endpointIds/{endpointId}``
       | **GET** ``/api/atlas/v2/groups/{groupId}/dataFederation``
       | **GET** ``/api/atlas/v2/groups/{groupId}/dataFederation/{tenantName}``
       | **GET** ``/api/atlas/v2/groups/{groupId}/dataFederation/{tenantName}/limits``
       | **GET** ``/api/atlas/v2/groups/{groupId}/dataFederation/{tenantName}/limits/{limitName}``
       | **GET** ``/api/atlas/v2/groups/{groupId}/dataFederation/{tenantName}/queryLogs.gz``
       | **GET** ``/api/atlas/v2/groups/{groupId}/dataLakes``
       | **GET** ``/api/atlas/v2/groups/{groupId}/dataLakes/{tenantName}``
       | **GET** ``/api/atlas/v2/groups/{groupId}/dataLakes/{tenantName}/queryLogs.gz``
       | **GET** ``/api/atlas/v2/groups/{groupId}/privateNetworkSettings/endpointIds``
       | **GET** ``/api/atlas/v2/groups/{groupId}/privateNetworkSettings/endpointIds/{endpointId}``
       | **PATCH** ``/api/atlas/v2/groups/{groupId}/dataFederation/{tenantName}``
       | **PATCH** ``/api/atlas/v2/groups/{groupId}/dataFederation/{tenantName}/limits/{limitName}``
       | **PATCH** ``/api/atlas/v2/groups/{groupId}/dataLakes/{tenantName}``
       | **POST** ``/api/atlas/v2/groups/{groupId}/dataFederation``
       | **POST** ``/api/atlas/v2/groups/{groupId}/dataLakes``
       | **POST** ``/api/atlas/v2/groups/{groupId}/privateNetworkSettings/endpointIds``
     - 1200
     - 500
     - 60

   * - Data Lake Pipelines
     - GROUP
     - | **DELETE** ``/api/atlas/v2/groups/{groupId}/pipelines/{pipelineName}``
       | **DELETE** ``/api/atlas/v2/groups/{groupId}/pipelines/{pipelineName}/runs/{pipelineRunId}``
       | **GET** ``/api/atlas/v2/groups/{groupId}/pipelines``
       | **GET** ``/api/atlas/v2/groups/{groupId}/pipelines/{pipelineName}``
       | **GET** ``/api/atlas/v2/groups/{groupId}/pipelines/{pipelineName}/availableSchedules``
       | **GET** ``/api/atlas/v2/groups/{groupId}/pipelines/{pipelineName}/availableSnapshots``
       | **GET** ``/api/atlas/v2/groups/{groupId}/pipelines/{pipelineName}/runs``
       | **GET** ``/api/atlas/v2/groups/{groupId}/pipelines/{pipelineName}/runs/{pipelineRunId}``
       | **PATCH** ``/api/atlas/v2/groups/{groupId}/pipelines/{pipelineName}``
       | **POST** ``/api/atlas/v2/groups/{groupId}/pipelines``
       | **POST** ``/api/atlas/v2/groups/{groupId}/pipelines/{pipelineName}/pause``
       | **POST** ``/api/atlas/v2/groups/{groupId}/pipelines/{pipelineName}/resume``
       | **POST** ``/api/atlas/v2/groups/{groupId}/pipelines/{pipelineName}/trigger``
     - 1200
     - 500
     - 60

   * - Database Users
     - GROUP
     - | **DELETE** ``/api/atlas/v2/groups/{groupId}/databaseUsers/{databaseName}/{username}``
       | **GET** ``/api/atlas/v2/groups/{groupId}/databaseUsers``
       | **GET** ``/api/atlas/v2/groups/{groupId}/databaseUsers/{databaseName}/{username}``
       | **PATCH** ``/api/atlas/v2/groups/{groupId}/databaseUsers/{databaseName}/{username}``
       | **POST** ``/api/atlas/v2/groups/{groupId}/databaseUsers``
     - 10000
     - 5000
     - 60

   * - Encryption At Rest Using Customer Key Management
     - GROUP
     - | **DELETE** ``/api/atlas/v2/groups/{groupId}/encryptionAtRest/{cloudProvider}/privateEndpoints/{endpointId}``
       | **GET** ``/api/atlas/v2/groups/{groupId}/encryptionAtRest``
       | **GET** ``/api/atlas/v2/groups/{groupId}/encryptionAtRest/{cloudProvider}/privateEndpoints``
       | **GET** ``/api/atlas/v2/groups/{groupId}/encryptionAtRest/{cloudProvider}/privateEndpoints/{endpointId}``
       | **PATCH** ``/api/atlas/v2/groups/{groupId}/encryptionAtRest``
       | **POST** ``/api/atlas/v2/groups/{groupId}/encryptionAtRest/{cloudProvider}/privateEndpoints``
     - 2000
     - 1000
     - 60

   * - Events
     - GROUP
     - | **GET** ``/api/atlas/v2/groups/{groupId}/events``
       | **GET** ``/api/atlas/v2/groups/{groupId}/events/{eventId}``
     - 300
     - 100
     - 60

   * - Events
     - ORGANIZATION
     - | **GET** ``/api/atlas/v2/orgs/{orgId}/events``
       | **GET** ``/api/atlas/v2/orgs/{orgId}/events/{eventId}``
     - 500
     - 250
     - 60

   * - Events
     - USER
     - | **GET** ``/api/atlas/v2/eventTypes``
     - 300
     - 100
     - 60

   * - Federated Authentication
     - ORGANIZATION
     - | **DELETE** ``/api/atlas/v2/federationSettings/{federationSettingsId}/connectedOrgConfigs/{orgId}``
       | **DELETE** ``/api/atlas/v2/federationSettings/{federationSettingsId}/connectedOrgConfigs/{orgId}/roleMappings/{id}``
       | **GET** ``/api/atlas/v2/federationSettings/{federationSettingsId}/connectedOrgConfigs/{orgId}``
       | **GET** ``/api/atlas/v2/federationSettings/{federationSettingsId}/connectedOrgConfigs/{orgId}/roleMappings``
       | **GET** ``/api/atlas/v2/federationSettings/{federationSettingsId}/connectedOrgConfigs/{orgId}/roleMappings/{id}``
       | **GET** ``/api/atlas/v2/orgs/{orgId}/federationSettings``
       | **PATCH** ``/api/atlas/v2/federationSettings/{federationSettingsId}/connectedOrgConfigs/{orgId}``
       | **POST** ``/api/atlas/v2/federationSettings/{federationSettingsId}/connectedOrgConfigs/{orgId}/roleMappings``
       | **PUT** ``/api/atlas/v2/federationSettings/{federationSettingsId}/connectedOrgConfigs/{orgId}/roleMappings/{id}``
     - 500
     - 250
     - 60

   * - Federated Authentication
     - USER
     - | **DELETE** ``/api/atlas/v2/federationSettings/{federationSettingsId}``
       | **DELETE** ``/api/atlas/v2/federationSettings/{federationSettingsId}/identityProviders/{identityProviderId}``
       | **DELETE** ``/api/atlas/v2/federationSettings/{federationSettingsId}/identityProviders/{identityProviderId}/jwks``
       | **GET** ``/api/atlas/v2/federationSettings/{federationSettingsId}/connectedOrgConfigs``
       | **GET** ``/api/atlas/v2/federationSettings/{federationSettingsId}/identityProviders``
       | **GET** ``/api/atlas/v2/federationSettings/{federationSettingsId}/identityProviders/{identityProviderId}``
       | **GET** ``/api/atlas/v2/federationSettings/{federationSettingsId}/identityProviders/{identityProviderId}/metadata.xml``
       | **PATCH** ``/api/atlas/v2/federationSettings/{federationSettingsId}/identityProviders/{identityProviderId}``
       | **POST** ``/api/atlas/v2/federationSettings/{federationSettingsId}/identityProviders``
     - 300
     - 100
     - 60

   * - Flex Clusters
     - GROUP
     - | **DELETE** ``/api/atlas/v2/groups/{groupId}/flexClusters/{name}``
       | **GET** ``/api/atlas/v2/groups/{groupId}/flexClusters``
       | **GET** ``/api/atlas/v2/groups/{groupId}/flexClusters/{name}``
       | **PATCH** ``/api/atlas/v2/groups/{groupId}/flexClusters/{name}``
       | **POST** ``/api/atlas/v2/groups/{groupId}/flexClusters``
       | **POST** ``/api/atlas/v2/groups/{groupId}/flexClusters:tenantUpgrade``
     - 1200
     - 500
     - 60

   * - Flex Restore Jobs
     - GROUP
     - | **GET** ``/api/atlas/v2/groups/{groupId}/flexClusters/{name}/backup/restoreJobs``
       | **GET** ``/api/atlas/v2/groups/{groupId}/flexClusters/{name}/backup/restoreJobs/{restoreJobId}``
       | **POST** ``/api/atlas/v2/groups/{groupId}/flexClusters/{name}/backup/restoreJobs``
     - 1200
     - 500
     - 60

   * - Flex Snapshots
     - GROUP
     - | **GET** ``/api/atlas/v2/groups/{groupId}/flexClusters/{name}/backup/snapshots``
       | **GET** ``/api/atlas/v2/groups/{groupId}/flexClusters/{name}/backup/snapshots/{snapshotId}``
       | **POST** ``/api/atlas/v2/groups/{groupId}/flexClusters/{name}/backup/download``
     - 1200
     - 500
     - 60

   * - Global Clusters
     - GROUP
     - | **DELETE** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/globalWrites/customZoneMapping``
       | **DELETE** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/globalWrites/managedNamespaces``
       | **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/globalWrites``
       | **POST** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/globalWrites/customZoneMapping``
       | **POST** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/globalWrites/managedNamespaces``
     - 1200
     - 500
     - 60

   * - IP Addresses
     - GROUP
     - | **GET** ``/api/atlas/v2/groups/{groupId}/ipAddresses``
     - 1200
     - 500
     - 60

   * - Invoices
     - ORGANIZATION
     - | **GET** ``/api/atlas/v2/orgs/{orgId}/billing/costExplorer/usage/{token}``
       | **GET** ``/api/atlas/v2/orgs/{orgId}/invoices``
       | **GET** ``/api/atlas/v2/orgs/{orgId}/invoices/pending``
       | **GET** ``/api/atlas/v2/orgs/{orgId}/invoices/{invoiceId}``
       | **GET** ``/api/atlas/v2/orgs/{orgId}/invoices/{invoiceId}/csv``
       | **GET** ``/api/atlas/v2/orgs/{orgId}/invoices/{invoiceId}/lineItems:search``
       | **POST** ``/api/atlas/v2/orgs/{orgId}/billing/costExplorer/usage``
     - 500
     - 100
     - 60

   * - Invoices
     - USER
     - | **GET** ``/api/atlas/v2/skus``
       | **GET** ``/api/atlas/v2/skus/{skuId}``
     - 300
     - 100
     - 60

   * - LDAP Configuration
     - GROUP
     - | **DELETE** ``/api/atlas/v2/groups/{groupId}/userSecurity/ldap/userToDNMapping``
       | **GET** ``/api/atlas/v2/groups/{groupId}/userSecurity``
       | **GET** ``/api/atlas/v2/groups/{groupId}/userSecurity/ldap/verify/{requestId}``
       | **PATCH** ``/api/atlas/v2/groups/{groupId}/userSecurity``
       | **POST** ``/api/atlas/v2/groups/{groupId}/userSecurity/ldap/verify``
     - 1200
     - 500
     - 60

   * - Legacy Backup
     - GROUP
     - | **DELETE** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/snapshots/{snapshotId}``
       | **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/backupCheckpoints``
       | **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/backupCheckpoints/{checkpointId}``
       | **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/snapshotSchedule``
       | **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/snapshots``
       | **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/snapshots/{snapshotId}``
       | **PATCH** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/snapshotSchedule``
       | **PATCH** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/snapshots/{snapshotId}``
     - 1200
     - 500
     - 60

   * - Maintenance Windows
     - GROUP
     - | **DELETE** ``/api/atlas/v2/groups/{groupId}/maintenanceWindow``
       | **GET** ``/api/atlas/v2/groups/{groupId}/maintenanceWindow``
       | **PATCH** ``/api/atlas/v2/groups/{groupId}/maintenanceWindow``
       | **POST** ``/api/atlas/v2/groups/{groupId}/maintenanceWindow/autoDefer``
       | **POST** ``/api/atlas/v2/groups/{groupId}/maintenanceWindow/defer``
     - 1200
     - 500
     - 60

   * - MongoDB Cloud Users
     - GROUP
     - | **DELETE** ``/api/atlas/v2/groups/{groupId}/users/{userId}``
       | **GET** ``/api/atlas/v2/groups/{groupId}/users``
       | **GET** ``/api/atlas/v2/groups/{groupId}/users/{userId}``
       | **POST** ``/api/atlas/v2/groups/{groupId}/users``
       | **POST** ``/api/atlas/v2/groups/{groupId}/users/{userId}:addRole``
       | **POST** ``/api/atlas/v2/groups/{groupId}/users/{userId}:removeRole``
       | **PUT** ``/api/atlas/v2/groups/{groupId}/users/{userId}/roles``
     - 1200
     - 500
     - 60

   * - MongoDB Cloud Users
     - ORGANIZATION
     - | **DELETE** ``/api/atlas/v2/orgs/{orgId}/users/{userId}``
       | **GET** ``/api/atlas/v2/orgs/{orgId}/users``
       | **GET** ``/api/atlas/v2/orgs/{orgId}/users/{userId}``
       | **PATCH** ``/api/atlas/v2/orgs/{orgId}/users/{userId}``
       | **POST** ``/api/atlas/v2/orgs/{orgId}/users``
       | **POST** ``/api/atlas/v2/orgs/{orgId}/users/{userId}:addRole``
       | **POST** ``/api/atlas/v2/orgs/{orgId}/users/{userId}:removeRole``
       | **PUT** ``/api/atlas/v2/orgs/{orgId}/users/{userId}/roles``
     - 500
     - 250
     - 60

   * - MongoDB Cloud Users
     - USER
     - | **GET** ``/api/atlas/v2/users/byName/{userName}``
       | **GET** ``/api/atlas/v2/users/{userId}``
       | **POST** ``/api/atlas/v2/users``
     - 2500
     - 2000
     - 60

   * - Monitoring And Logs
     - GROUP
     - | **GET** ``/api/atlas/v2/groups/{groupId}/hosts/{processId}/fts/metrics``
       | **GET** ``/api/atlas/v2/groups/{groupId}/hosts/{processId}/fts/metrics/indexes/{databaseName}/{collectionName}/measurements``
       | **GET** ``/api/atlas/v2/groups/{groupId}/hosts/{processId}/fts/metrics/indexes/{databaseName}/{collectionName}/{indexName}/measurements``
       | **GET** ``/api/atlas/v2/groups/{groupId}/hosts/{processId}/fts/metrics/measurements``
       | **GET** ``/api/atlas/v2/groups/{groupId}/processes``
       | **GET** ``/api/atlas/v2/groups/{groupId}/processes/{processId}``
       | **GET** ``/api/atlas/v2/groups/{groupId}/processes/{processId}/databases``
       | **GET** ``/api/atlas/v2/groups/{groupId}/processes/{processId}/databases/{databaseName}``
       | **GET** ``/api/atlas/v2/groups/{groupId}/processes/{processId}/databases/{databaseName}/measurements``
       | **GET** ``/api/atlas/v2/groups/{groupId}/processes/{processId}/disks``
       | **GET** ``/api/atlas/v2/groups/{groupId}/processes/{processId}/disks/{partitionName}``
       | **GET** ``/api/atlas/v2/groups/{groupId}/processes/{processId}/disks/{partitionName}/measurements``
       | **GET** ``/api/atlas/v2/groups/{groupId}/processes/{processId}/measurements``
     - 300
     - 100
     - 60

   * - Network Peering
     - GROUP
     - | **DELETE** ``/api/atlas/v2/groups/{groupId}/containers/{containerId}``
       | **DELETE** ``/api/atlas/v2/groups/{groupId}/peers/{peerId}``
       | **GET** ``/api/atlas/v2/groups/{groupId}/containers``
       | **GET** ``/api/atlas/v2/groups/{groupId}/containers/all``
       | **GET** ``/api/atlas/v2/groups/{groupId}/containers/{containerId}``
       | **GET** ``/api/atlas/v2/groups/{groupId}/peers``
       | **GET** ``/api/atlas/v2/groups/{groupId}/peers/{peerId}``
       | **GET** ``/api/atlas/v2/groups/{groupId}/privateIpMode``
       | **PATCH** ``/api/atlas/v2/groups/{groupId}/containers/{containerId}``
       | **PATCH** ``/api/atlas/v2/groups/{groupId}/peers/{peerId}``
       | **PATCH** ``/api/atlas/v2/groups/{groupId}/privateIpMode``
       | **POST** ``/api/atlas/v2/groups/{groupId}/containers``
       | **POST** ``/api/atlas/v2/groups/{groupId}/peers``
     - 2000
     - 1000
     - 60

   * - Online Archive
     - GROUP
     - | **DELETE** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/onlineArchives/{archiveId}``
       | **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/onlineArchives``
       | **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/onlineArchives/queryLogs.gz``
       | **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/onlineArchives/{archiveId}``
       | **PATCH** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/onlineArchives/{archiveId}``
       | **POST** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/onlineArchives``
     - 1200
     - 500
     - 60

   * - Organization Settings
     - ORGANIZATION
     - | **GET** ``/api/atlas/v2/orgs/{orgId}/settings``
       | **PATCH** ``/api/atlas/v2/orgs/{orgId}/settings``
     - 10
     - 5
     - 60

   * - Organizations
     - ORGANIZATION
     - | **DELETE** ``/api/atlas/v2/orgs/{orgId}``
       | **DELETE** ``/api/atlas/v2/orgs/{orgId}/invites/{invitationId}``
       | **GET** ``/api/atlas/v2/orgs/{orgId}``
       | **GET** ``/api/atlas/v2/orgs/{orgId}/groups``
       | **GET** ``/api/atlas/v2/orgs/{orgId}/invites``
       | **GET** ``/api/atlas/v2/orgs/{orgId}/invites/{invitationId}``
       | **PATCH** ``/api/atlas/v2/orgs/{orgId}``
       | **PATCH** ``/api/atlas/v2/orgs/{orgId}/invites``
       | **PATCH** ``/api/atlas/v2/orgs/{orgId}/invites/{invitationId}``
       | **POST** ``/api/atlas/v2/orgs/{orgId}/invites``
     - 500
     - 250
     - 60

   * - Organizations
     - USER
     - | **GET** ``/api/atlas/v2/orgs``
       | **POST** ``/api/atlas/v2/orgs``
     - 300
     - 100
     - 60

   * - Performance Advisor
     - GROUP
     - | **DELETE** ``/api/atlas/v2/groups/{groupId}/managedSlowMs/disable``
       | **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/performanceAdvisor/dropIndexSuggestions``
       | **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/performanceAdvisor/schemaAdvice``
       | **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/performanceAdvisor/suggestedIndexes``
       | **GET** ``/api/atlas/v2/groups/{groupId}/managedSlowMs``
       | **GET** ``/api/atlas/v2/groups/{groupId}/processes/{processId}/performanceAdvisor/namespaces``
       | **GET** ``/api/atlas/v2/groups/{groupId}/processes/{processId}/performanceAdvisor/slowQueryLogs``
       | **GET** ``/api/atlas/v2/groups/{groupId}/processes/{processId}/performanceAdvisor/suggestedIndexes``
       | **GET** ``/api/atlas/v2/groups/{groupId}/serverless/{clusterName}/performanceAdvisor/autoIndexing``
       | **POST** ``/api/atlas/v2/groups/{groupId}/managedSlowMs/enable``
       | **POST** ``/api/atlas/v2/groups/{groupId}/serverless/{clusterName}/performanceAdvisor/autoIndexing``
     - 1200
     - 500
     - 60

   * - Private Endpoint Services
     - GROUP
     - | **DELETE** ``/api/atlas/v2/groups/{groupId}/privateEndpoint/{cloudProvider}/endpointService/{endpointServiceId}``
       | **DELETE** ``/api/atlas/v2/groups/{groupId}/privateEndpoint/{cloudProvider}/endpointService/{endpointServiceId}/endpoint/{endpointId}``
       | **GET** ``/api/atlas/v2/groups/{groupId}/privateEndpoint/regionalMode``
       | **GET** ``/api/atlas/v2/groups/{groupId}/privateEndpoint/{cloudProvider}/endpointService``
       | **GET** ``/api/atlas/v2/groups/{groupId}/privateEndpoint/{cloudProvider}/endpointService/{endpointServiceId}``
       | **GET** ``/api/atlas/v2/groups/{groupId}/privateEndpoint/{cloudProvider}/endpointService/{endpointServiceId}/endpoint/{endpointId}``
       | **PATCH** ``/api/atlas/v2/groups/{groupId}/privateEndpoint/regionalMode``
       | **POST** ``/api/atlas/v2/groups/{groupId}/privateEndpoint/endpointService``
       | **POST** ``/api/atlas/v2/groups/{groupId}/privateEndpoint/{cloudProvider}/endpointService/{endpointServiceId}/endpoint``
     - 4000
     - 2000
     - 60

   * - Programmatic API Keys
     - GROUP
     - | **DELETE** ``/api/atlas/v2/groups/{groupId}/apiKeys/{apiUserId}``
       | **GET** ``/api/atlas/v2/groups/{groupId}/apiKeys``
       | **PATCH** ``/api/atlas/v2/groups/{groupId}/apiKeys/{apiUserId}``
       | **POST** ``/api/atlas/v2/groups/{groupId}/apiKeys``
       | **POST** ``/api/atlas/v2/groups/{groupId}/apiKeys/{apiUserId}``
     - 1200
     - 500
     - 60

   * - Programmatic API Keys
     - ORGANIZATION
     - | **DELETE** ``/api/atlas/v2/orgs/{orgId}/apiKeys/{apiUserId}``
       | **DELETE** ``/api/atlas/v2/orgs/{orgId}/apiKeys/{apiUserId}/accessList/{ipAddress}``
       | **GET** ``/api/atlas/v2/orgs/{orgId}/apiKeys``
       | **GET** ``/api/atlas/v2/orgs/{orgId}/apiKeys/{apiUserId}``
       | **GET** ``/api/atlas/v2/orgs/{orgId}/apiKeys/{apiUserId}/accessList``
       | **GET** ``/api/atlas/v2/orgs/{orgId}/apiKeys/{apiUserId}/accessList/{ipAddress}``
       | **PATCH** ``/api/atlas/v2/orgs/{orgId}/apiKeys/{apiUserId}``
       | **POST** ``/api/atlas/v2/orgs/{orgId}/apiKeys``
       | **POST** ``/api/atlas/v2/orgs/{orgId}/apiKeys/{apiUserId}/accessList``
     - 500
     - 250
     - 60

   * - Project IP Access List
     - GROUP
     - | **DELETE** ``/api/atlas/v2/groups/{groupId}/accessList/{entryValue}``
       | **GET** ``/api/atlas/v2/groups/{groupId}/accessList``
       | **GET** ``/api/atlas/v2/groups/{groupId}/accessList/{entryValue}``
       | **GET** ``/api/atlas/v2/groups/{groupId}/accessList/{entryValue}/status``
       | **POST** ``/api/atlas/v2/groups/{groupId}/accessList``
     - 1200
     - 500
     - 60

   * - Projects
     - GROUP
     - | **DELETE** ``/api/atlas/v2/groups/{groupId}``
       | **DELETE** ``/api/atlas/v2/groups/{groupId}/invites/{invitationId}``
       | **DELETE** ``/api/atlas/v2/groups/{groupId}/limits/{limitName}``
       | **GET** ``/api/atlas/v2/groups/{groupId}``
       | **GET** ``/api/atlas/v2/groups/{groupId}/invites``
       | **GET** ``/api/atlas/v2/groups/{groupId}/invites/{invitationId}``
       | **GET** ``/api/atlas/v2/groups/{groupId}/limits``
       | **GET** ``/api/atlas/v2/groups/{groupId}/limits/{limitName}``
       | **GET** ``/api/atlas/v2/groups/{groupId}/mongoDBVersions``
       | **GET** ``/api/atlas/v2/groups/{groupId}/settings``
       | **PATCH** ``/api/atlas/v2/groups/{groupId}``
       | **PATCH** ``/api/atlas/v2/groups/{groupId}/invites``
       | **PATCH** ``/api/atlas/v2/groups/{groupId}/invites/{invitationId}``
       | **PATCH** ``/api/atlas/v2/groups/{groupId}/limits/{limitName}``
       | **PATCH** ``/api/atlas/v2/groups/{groupId}/settings``
       | **POST** ``/api/atlas/v2/groups/{groupId}/access``
       | **POST** ``/api/atlas/v2/groups/{groupId}/invites``
       | **POST** ``/api/atlas/v2/groups/{groupId}:migrate``
     - 1200
     - 500
     - 60

   * - Projects
     - USER
     - | **GET** ``/api/atlas/v2/groups``
       | **GET** ``/api/atlas/v2/groups/byName/{groupName}``
       | **POST** ``/api/atlas/v2/groups``
     - 1200
     - 500
     - 60

   * - Push Based Log Exports
     - GROUP
     - | **DELETE** ``/api/atlas/v2/groups/{groupId}/logIntegrations/{id}``
       | **DELETE** ``/api/atlas/v2/groups/{groupId}/pushBasedLogExport``
       | **GET** ``/api/atlas/v2/groups/{groupId}/logIntegrations``
       | **GET** ``/api/atlas/v2/groups/{groupId}/logIntegrations/{id}``
       | **GET** ``/api/atlas/v2/groups/{groupId}/pushBasedLogExport``
       | **PATCH** ``/api/atlas/v2/groups/{groupId}/pushBasedLogExport``
       | **POST** ``/api/atlas/v2/groups/{groupId}/logIntegrations``
       | **POST** ``/api/atlas/v2/groups/{groupId}/pushBasedLogExport``
       | **PUT** ``/api/atlas/v2/groups/{groupId}/logIntegrations/{id}``
     - 1200
     - 500
     - 60

   * - Query Shape Insights
     - GROUP
     - | **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/queryShapeInsights/summaries``
       | **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/queryShapeInsights/{queryShapeHash}/details``
       | **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/queryShapes``
       | **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/queryShapes/{queryShapeHash}``
       | **PATCH** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/queryShapes/{queryShapeHash}``
     - 1200
     - 500
     - 60

   * - Resource Policies
     - ORGANIZATION
     - | **DELETE** ``/api/atlas/v2/orgs/{orgId}/resourcePolicies/{resourcePolicyId}``
       | **GET** ``/api/atlas/v2/orgs/{orgId}/nonCompliantResources``
       | **GET** ``/api/atlas/v2/orgs/{orgId}/resourcePolicies``
       | **GET** ``/api/atlas/v2/orgs/{orgId}/resourcePolicies/{resourcePolicyId}``
       | **PATCH** ``/api/atlas/v2/orgs/{orgId}/resourcePolicies/{resourcePolicyId}``
       | **POST** ``/api/atlas/v2/orgs/{orgId}/resourcePolicies``
       | **POST** ``/api/atlas/v2/orgs/{orgId}/resourcePolicies:validate``
     - 500
     - 250
     - 60

   * - Root
     - IP
     - | **GET** ``/api/atlas/v2/unauth/controlPlaneIPAddresses``
     - 400
     - 100
     - 60

   * - Root
     - USER
     - | **GET** ``/api/atlas/v2``
     - 300
     - 100
     - 60

   * - Serverless Instances
     - GROUP
     - | **DELETE** ``/api/atlas/v2/groups/{groupId}/serverless/{name}``
       | **GET** ``/api/atlas/v2/groups/{groupId}/serverless``
       | **GET** ``/api/atlas/v2/groups/{groupId}/serverless/{name}``
       | **PATCH** ``/api/atlas/v2/groups/{groupId}/serverless/{name}``
       | **POST** ``/api/atlas/v2/groups/{groupId}/serverless``
     - 1200
     - 500
     - 60

   * - Serverless Private Cloud Backup
     - GROUP
     - | **GET** ``/api/atlas/v2/groups/{groupId}/serverless/{clusterName}/backup/restoreJobs``
       | **GET** ``/api/atlas/v2/groups/{groupId}/serverless/{clusterName}/backup/restoreJobs/{restoreJobId}``
       | **GET** ``/api/atlas/v2/groups/{groupId}/serverless/{clusterName}/backup/snapshots``
       | **GET** ``/api/atlas/v2/groups/{groupId}/serverless/{clusterName}/backup/snapshots/{snapshotId}``
       | **POST** ``/api/atlas/v2/groups/{groupId}/serverless/{clusterName}/backup/restoreJobs``
     - 1200
     - 500
     - 60

   * - Serverless Private Endpoints
     - GROUP
     - | **DELETE** ``/api/atlas/v2/groups/{groupId}/privateEndpoint/serverless/instance/{instanceName}/endpoint/{endpointId}``
       | **GET** ``/api/atlas/v2/groups/{groupId}/privateEndpoint/serverless/instance/{instanceName}/endpoint``
       | **GET** ``/api/atlas/v2/groups/{groupId}/privateEndpoint/serverless/instance/{instanceName}/endpoint/{endpointId}``
       | **PATCH** ``/api/atlas/v2/groups/{groupId}/privateEndpoint/serverless/instance/{instanceName}/endpoint/{endpointId}``
       | **POST** ``/api/atlas/v2/groups/{groupId}/privateEndpoint/serverless/instance/{instanceName}/endpoint``
     - 1200
     - 500
     - 60

   * - Service Accounts
     - GROUP
     - | **DELETE** ``/api/atlas/v2/groups/{groupId}/serviceAccounts/{clientId}``
       | **DELETE** ``/api/atlas/v2/groups/{groupId}/serviceAccounts/{clientId}/accessList/{ipAddress}``
       | **DELETE** ``/api/atlas/v2/groups/{groupId}/serviceAccounts/{clientId}/secrets/{secretId}``
       | **GET** ``/api/atlas/v2/groups/{groupId}/serviceAccounts``
       | **GET** ``/api/atlas/v2/groups/{groupId}/serviceAccounts/{clientId}``
       | **GET** ``/api/atlas/v2/groups/{groupId}/serviceAccounts/{clientId}/accessList``
       | **PATCH** ``/api/atlas/v2/groups/{groupId}/serviceAccounts/{clientId}``
       | **POST** ``/api/atlas/v2/groups/{groupId}/serviceAccounts``
       | **POST** ``/api/atlas/v2/groups/{groupId}/serviceAccounts/{clientId}/accessList``
       | **POST** ``/api/atlas/v2/groups/{groupId}/serviceAccounts/{clientId}/secrets``
       | **POST** ``/api/atlas/v2/groups/{groupId}/serviceAccounts/{clientId}:invite``
     - 1200
     - 500
     - 60

   * - Service Accounts
     - ORGANIZATION
     - | **DELETE** ``/api/atlas/v2/orgs/{orgId}/serviceAccounts/{clientId}``
       | **DELETE** ``/api/atlas/v2/orgs/{orgId}/serviceAccounts/{clientId}/accessList/{ipAddress}``
       | **DELETE** ``/api/atlas/v2/orgs/{orgId}/serviceAccounts/{clientId}/secrets/{secretId}``
       | **GET** ``/api/atlas/v2/orgs/{orgId}/serviceAccounts``
       | **GET** ``/api/atlas/v2/orgs/{orgId}/serviceAccounts/{clientId}``
       | **GET** ``/api/atlas/v2/orgs/{orgId}/serviceAccounts/{clientId}/accessList``
       | **GET** ``/api/atlas/v2/orgs/{orgId}/serviceAccounts/{clientId}/groups``
       | **PATCH** ``/api/atlas/v2/orgs/{orgId}/serviceAccounts/{clientId}``
       | **POST** ``/api/atlas/v2/orgs/{orgId}/serviceAccounts``
       | **POST** ``/api/atlas/v2/orgs/{orgId}/serviceAccounts/{clientId}/accessList``
       | **POST** ``/api/atlas/v2/orgs/{orgId}/serviceAccounts/{clientId}/secrets``
     - 500
     - 250
     - 60

   * - Shared Tier Restore Jobs
     - GROUP
     - | **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/backup/tenant/restores``
       | **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/backup/tenant/restores/{restoreId}``
       | **POST** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/backup/tenant/restore``
     - 4000
     - 2000
     - 60

   * - Shared Tier Snapshots
     - GROUP
     - | **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/backup/tenant/snapshots``
       | **GET** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/backup/tenant/snapshots/{snapshotId}``
       | **POST** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/backup/tenant/download``
     - 4000
     - 2000
     - 60

   * - Streams
     - GROUP
     - | **DELETE** ``/api/atlas/v2/groups/{groupId}/streams/privateLinkConnections/{connectionId}``
       | **DELETE** ``/api/atlas/v2/groups/{groupId}/streams/vpcPeeringConnections/{id}``
       | **DELETE** ``/api/atlas/v2/groups/{groupId}/streams/{tenantName}``
       | **DELETE** ``/api/atlas/v2/groups/{groupId}/streams/{tenantName}/connections/{connectionName}``
       | **DELETE** ``/api/atlas/v2/groups/{groupId}/streams/{tenantName}/processor/{processorName}``
       | **GET** ``/api/atlas/v2/groups/{groupId}/streams``
       | **GET** ``/api/atlas/v2/groups/{groupId}/streams/accountDetails``
       | **GET** ``/api/atlas/v2/groups/{groupId}/streams/activeVpcPeeringConnections``
       | **GET** ``/api/atlas/v2/groups/{groupId}/streams/privateLinkConnections``
       | **GET** ``/api/atlas/v2/groups/{groupId}/streams/privateLinkConnections/{connectionId}``
       | **GET** ``/api/atlas/v2/groups/{groupId}/streams/vpcPeeringConnections``
       | **GET** ``/api/atlas/v2/groups/{groupId}/streams/{tenantName}``
       | **GET** ``/api/atlas/v2/groups/{groupId}/streams/{tenantName}/auditLogs``
       | **GET** ``/api/atlas/v2/groups/{groupId}/streams/{tenantName}/connections``
       | **GET** ``/api/atlas/v2/groups/{groupId}/streams/{tenantName}/connections/{connectionName}``
       | **GET** ``/api/atlas/v2/groups/{groupId}/streams/{tenantName}/processor/{processorName}``
       | **GET** ``/api/atlas/v2/groups/{groupId}/streams/{tenantName}/processors``
       | **GET** ``/api/atlas/v2/groups/{groupId}/streams/{tenantName}:downloadOperationalLogs``
       | **PATCH** ``/api/atlas/v2/groups/{groupId}/streams/{tenantName}``
       | **PATCH** ``/api/atlas/v2/groups/{groupId}/streams/{tenantName}/connections/{connectionName}``
       | **PATCH** ``/api/atlas/v2/groups/{groupId}/streams/{tenantName}/processor/{processorName}``
       | **POST** ``/api/atlas/v2/groups/{groupId}/streams``
       | **POST** ``/api/atlas/v2/groups/{groupId}/streams/privateLinkConnections``
       | **POST** ``/api/atlas/v2/groups/{groupId}/streams/vpcPeeringConnections/{id}:accept``
       | **POST** ``/api/atlas/v2/groups/{groupId}/streams/vpcPeeringConnections/{id}:reject``
       | **POST** ``/api/atlas/v2/groups/{groupId}/streams/{tenantName}/connections``
       | **POST** ``/api/atlas/v2/groups/{groupId}/streams/{tenantName}/processor``
       | **POST** ``/api/atlas/v2/groups/{groupId}/streams/{tenantName}/processor/{processorName}:start``
       | **POST** ``/api/atlas/v2/groups/{groupId}/streams/{tenantName}/processor/{processorName}:startWith``
       | **POST** ``/api/atlas/v2/groups/{groupId}/streams/{tenantName}/processor/{processorName}:stop``
       | **POST** ``/api/atlas/v2/groups/{groupId}/streams:withSampleConnections``
     - 1200
     - 500
     - 60

   * - Teams
     - GROUP
     - | **DELETE** ``/api/atlas/v2/groups/{groupId}/teams/{teamId}``
       | **GET** ``/api/atlas/v2/groups/{groupId}/teams``
       | **GET** ``/api/atlas/v2/groups/{groupId}/teams/{teamId}``
       | **PATCH** ``/api/atlas/v2/groups/{groupId}/teams/{teamId}``
       | **POST** ``/api/atlas/v2/groups/{groupId}/teams``
     - 1200
     - 500
     - 60

   * - Teams
     - ORGANIZATION
     - | **DELETE** ``/api/atlas/v2/orgs/{orgId}/teams/{teamId}``
       | **DELETE** ``/api/atlas/v2/orgs/{orgId}/teams/{teamId}/users/{userId}``
       | **GET** ``/api/atlas/v2/orgs/{orgId}/teams``
       | **GET** ``/api/atlas/v2/orgs/{orgId}/teams/byName/{teamName}``
       | **GET** ``/api/atlas/v2/orgs/{orgId}/teams/{teamId}``
       | **GET** ``/api/atlas/v2/orgs/{orgId}/teams/{teamId}/users``
       | **PATCH** ``/api/atlas/v2/orgs/{orgId}/teams/{teamId}``
       | **POST** ``/api/atlas/v2/orgs/{orgId}/teams``
       | **POST** ``/api/atlas/v2/orgs/{orgId}/teams/{teamId}/users``
       | **POST** ``/api/atlas/v2/orgs/{orgId}/teams/{teamId}:addUser``
       | **POST** ``/api/atlas/v2/orgs/{orgId}/teams/{teamId}:removeUser``
     - 1200
     - 500
     - 60

   * - Third Party Integrations
     - GROUP
     - | **DELETE** ``/api/atlas/v2/groups/{groupId}/integrations/{integrationType}``
       | **GET** ``/api/atlas/v2/groups/{groupId}/integrations``
       | **GET** ``/api/atlas/v2/groups/{groupId}/integrations/{integrationType}``
       | **POST** ``/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/index``
       | **POST** ``/api/atlas/v2/groups/{groupId}/integrations/{integrationType}``
       | **PUT** ``/api/atlas/v2/groups/{groupId}/integrations/{integrationType}``
     - 1200
     - 500
     - 60

   * - X509 Authentication
     - GROUP
     - | **DELETE** ``/api/atlas/v2/groups/{groupId}/userSecurity/customerX509``
       | **GET** ``/api/atlas/v2/groups/{groupId}/databaseUsers/{username}/certs``
       | **POST** ``/api/atlas/v2/groups/{groupId}/databaseUsers/{username}/certs``
     - 1200
     - 500
     - 60

