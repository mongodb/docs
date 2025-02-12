.. _atlas-api:

=========
atlas api
=========

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

`experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Interact directly with any Atlas Admin API endpoint through the Atlas CLI, streamlining script development.

Options
-------

.. list-table::
   :header-rows: 1
   :widths: 20 10 10 60

   * - Name
     - Type
     - Required
     - Description
   * - -h, --help
     - 
     - false
     - help for api

Inherited Options
-----------------

.. list-table::
   :header-rows: 1
   :widths: 20 10 10 60

   * - Name
     - Type
     - Required
     - Description
   * - -P, --profile
     - string
     - false
     - Name of the profile to use from your configuration file. To learn about profiles for the Atlas CLI, see https://dochub.mongodb.org/core/atlas-cli-save-connection-settings.

Related Commands
----------------

* :ref:`atlas-api-accessTracking` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns access logs for authentication attempts made to Atlas database deployments.
* :ref:`atlas-api-alertConfigurations` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns and edits the conditions that trigger alerts and how MongoDB Cloud notifies users.
* :ref:`atlas-api-alerts` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns and acknowledges alerts that MongoDB Cloud triggers based on the alert conditions that you define.
* :ref:`atlas-api-atlasSearch` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns, adds, edits, and removes Atlas Search indexes for the specified cluster.
* :ref:`atlas-api-auditing` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns and edits database auditing settings for MongoDB Cloud projects.
* :ref:`atlas-api-awsClustersDns` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns and edits custom DNS configurations for MongoDB Cloud database deployments on AWS.
* :ref:`atlas-api-cloudBackups` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Manages Cloud Backup snapshots, snapshot export buckets, restore jobs, and schedules.
* :ref:`atlas-api-cloudMigrationService` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Manages the Cloud Migration Service.
* :ref:`atlas-api-cloudProviderAccess` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns, adds, authorizes, and removes AWS IAM roles in Atlas.
* :ref:`atlas-api-clusterOutageSimulation` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns, starts, or ends a cluster outage simulation.
* :ref:`atlas-api-clusters` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns, adds, edits, and removes database deployments.
* :ref:`atlas-api-collectionLevelMetrics` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns, adds, and edits pinned namespaces for the specified cluster or process.
* :ref:`atlas-api-customDatabaseRoles` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns, adds, edits, and removes custom database user privilege roles.
* :ref:`atlas-api-dataFederation` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns, adds, edits, and removes Federated Database Instances.
* :ref:`atlas-api-dataLakePipelines` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns, edits, and removes Atlas Data Lake Pipelines and associated runs.
* :ref:`atlas-api-databaseUsers` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns, adds, edits, and removes database users.
* :ref:`atlas-api-encryptionAtRestUsingCustomerKeyManagement` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns and edits the Encryption at Rest using Customer Key Management configuration.
* :ref:`atlas-api-events` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns events.
* :ref:`atlas-api-federatedAuthentication` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns, adds, edits, and removes federation-related features such as role mappings and connected organization configurations.
* :ref:`atlas-api-flexClusters` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns, adds, edits, and removes flex clusters.
* :ref:`atlas-api-flexRestoreJobs` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns and adds restore jobs for flex database deployments.
* :ref:`atlas-api-flexSnapshots` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns and requests to download flex database deployment snapshots.
* :ref:`atlas-api-globalClusters` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns, adds, and removes Global Cluster managed namespaces and custom zone mappings.
* :ref:`atlas-api-invoices` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns invoices.
* :ref:`atlas-api-ldapConfiguration` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns, edits, verifies, and removes LDAP configurations.
* :ref:`atlas-api-legacyBackup` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Manages Legacy Backup snapshots, restore jobs, schedules and checkpoints.
* :ref:`atlas-api-maintenanceWindows` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns, edits, and removes maintenance windows.
* :ref:`atlas-api-mongoDbCloudUsers` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns, adds, and edits MongoDB Cloud users.
* :ref:`atlas-api-monitoringAndLogs` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns database deployment monitoring and logging data.
* :ref:`atlas-api-networkPeering` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns, adds, edits, and removes network peering containers and peering connections.
* :ref:`atlas-api-onlineArchive` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns, adds, edits, or removes an online archive.
* :ref:`atlas-api-openApi` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns information about the MongoDB Atlas Specification.
* :ref:`atlas-api-organizations` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns, adds, and edits organizational units in MongoDB Cloud.
* :ref:`atlas-api-performanceAdvisor` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns suggested indexes and slow query data for a database deployment.
* :ref:`atlas-api-privateEndpointServices` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns, adds, edits, and removes private endpoint services.
* :ref:`atlas-api-programmaticApiKeys` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns, adds, edits, and removes access tokens to use the MongoDB Cloud API.
* :ref:`atlas-api-projectIpAccessList` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns, adds, edits, and removes network access limits to database deployments in Atlas.
* :ref:`atlas-api-projects` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns, adds, and edits collections of clusters and users in MongoDB Cloud.
* :ref:`atlas-api-pushBasedLogExport` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: You can continually push logs from mongod, mongos, and audit logs to an AWS S3 bucket.
* :ref:`atlas-api-resourcePolicies` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Configure and manage Atlas Resource Policies within your organization.
* :ref:`atlas-api-rollingIndex` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Creates one index to a database deployment in a rolling manner.
* :ref:`atlas-api-root` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns details that describe the MongoDB Cloud build and the access token that requests this resource.
* :ref:`atlas-api-serverlessInstances` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns, adds, edits, and removes serverless instances.
* :ref:`atlas-api-serverlessPrivateEndpoints` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns, adds, edits, and removes private endpoints for serverless instances.
* :ref:`atlas-api-serviceAccounts` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Endpoints for managing Service Accounts and secrets.
* :ref:`atlas-api-sharedTierRestoreJobs` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns and adds restore jobs for shared-tier database deployments.
* :ref:`atlas-api-sharedTierSnapshots` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns and requests to download shared-tier database deployment snapshots.
* :ref:`atlas-api-streams` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns, adds, edits, and removes Streams Instances.
* :ref:`atlas-api-teams` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns, adds, edits, or removes teams.
* :ref:`atlas-api-test` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Atlas test endpoints.
* :ref:`atlas-api-thirdPartyIntegrations` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns, adds, edits, and removes third-party service integration configurations.
* :ref:`atlas-api-x509Authentication` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns, edits, and removes user-managed X.509 configurations.


.. toctree::
   :titlesonly:

   accessTracking </command/atlas-api-accessTracking>
   alertConfigurations </command/atlas-api-alertConfigurations>
   alerts </command/atlas-api-alerts>
   atlasSearch </command/atlas-api-atlasSearch>
   auditing </command/atlas-api-auditing>
   awsClustersDns </command/atlas-api-awsClustersDns>
   cloudBackups </command/atlas-api-cloudBackups>
   cloudMigrationService </command/atlas-api-cloudMigrationService>
   cloudProviderAccess </command/atlas-api-cloudProviderAccess>
   clusterOutageSimulation </command/atlas-api-clusterOutageSimulation>
   clusters </command/atlas-api-clusters>
   collectionLevelMetrics </command/atlas-api-collectionLevelMetrics>
   customDatabaseRoles </command/atlas-api-customDatabaseRoles>
   dataFederation </command/atlas-api-dataFederation>
   dataLakePipelines </command/atlas-api-dataLakePipelines>
   databaseUsers </command/atlas-api-databaseUsers>
   encryptionAtRestUsingCustomerKeyManagement </command/atlas-api-encryptionAtRestUsingCustomerKeyManagement>
   events </command/atlas-api-events>
   federatedAuthentication </command/atlas-api-federatedAuthentication>
   flexClusters </command/atlas-api-flexClusters>
   flexRestoreJobs </command/atlas-api-flexRestoreJobs>
   flexSnapshots </command/atlas-api-flexSnapshots>
   globalClusters </command/atlas-api-globalClusters>
   invoices </command/atlas-api-invoices>
   ldapConfiguration </command/atlas-api-ldapConfiguration>
   legacyBackup </command/atlas-api-legacyBackup>
   maintenanceWindows </command/atlas-api-maintenanceWindows>
   mongoDbCloudUsers </command/atlas-api-mongoDbCloudUsers>
   monitoringAndLogs </command/atlas-api-monitoringAndLogs>
   networkPeering </command/atlas-api-networkPeering>
   onlineArchive </command/atlas-api-onlineArchive>
   openApi </command/atlas-api-openApi>
   organizations </command/atlas-api-organizations>
   performanceAdvisor </command/atlas-api-performanceAdvisor>
   privateEndpointServices </command/atlas-api-privateEndpointServices>
   programmaticApiKeys </command/atlas-api-programmaticApiKeys>
   projectIpAccessList </command/atlas-api-projectIpAccessList>
   projects </command/atlas-api-projects>
   pushBasedLogExport </command/atlas-api-pushBasedLogExport>
   resourcePolicies </command/atlas-api-resourcePolicies>
   rollingIndex </command/atlas-api-rollingIndex>
   root </command/atlas-api-root>
   serverlessInstances </command/atlas-api-serverlessInstances>
   serverlessPrivateEndpoints </command/atlas-api-serverlessPrivateEndpoints>
   serviceAccounts </command/atlas-api-serviceAccounts>
   sharedTierRestoreJobs </command/atlas-api-sharedTierRestoreJobs>
   sharedTierSnapshots </command/atlas-api-sharedTierSnapshots>
   streams </command/atlas-api-streams>
   teams </command/atlas-api-teams>
   test </command/atlas-api-test>
   thirdPartyIntegrations </command/atlas-api-thirdPartyIntegrations>
   x509Authentication </command/atlas-api-x509Authentication>

