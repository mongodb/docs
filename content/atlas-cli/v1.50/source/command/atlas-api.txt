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

Access all features of the Atlas Administration API through the Atlas CLI by using the 'atlas api <tag> <operationId>' command.

This feature streamlines script development by letting you interact directly with any Atlas Administration API endpoint through the Atlas CLI.

For more information on
- Atlas Administration API see: https://www.mongodb.com/docs/api/doc/atlas-admin-api-v2/
- Getting started with the Atlas Administration API: https://www.mongodb.com/docs/atlas/configure-api-access/#std-label-atlas-admin-api-access

The atlas api sub-command is automatically generated from the MongoDB Atlas Admin API and offers full coverage of the Admin API.
Admin API capabilities have their own release lifecycle, which you can check via the provided API endpoint documentation link.

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas api <tag> <operationId> [options]

.. important::

   Both ``<tag>`` and ``<operationId>`` must be in camelCase.

Arguments
---------

.. list-table::
   :header-rows: 1
   :widths: 30 30 10 30

   * - Name
     - Type
     - Required
     - Description
   * - <tag>
     - string
     - true
     - The category of Atlas Administration API operations in camelCase.
       To find and format the tag, check
       the API documentation
       URL for the endpoint. It appears after ``#tag/``, but you need to change to camelCase. For the Atlas API
       documentation, see: https://www.mongodb.com/docs/atlas/reference/api-resources-spec/v2/.

       For example, in
       ``https://www.mongodb.com/docs/atlas/reference/api-resources-spec/v2/#tag/Monitoring-and-Logs``,
       the tag is ``Monitoring-and-Logs``. In camelCase, it's ``monitoringAndLogs``.
   * - <operationId>
     - string
     - true
     - The identifier of the Atlas Administration API endpoint in camelCase.
       To find the operationId, check the
       API documentation
       URL for the endpoint. It appears after ``operation/``. For the Atlas API
       documentation, see: https://www.mongodb.com/docs/atlas/reference/api-resources-spec/v2/.

       For example, in
       ``https://www.mongodb.com/docs/api/doc/atlas-admin-api-v2/operation/operation-listclusters``,
       the operationId is ``listClusters``.

Subcommand options
----------------------

Pass in the path and query parameters for the Atlas Administration API endpoint
as flags. For example, if the endpoint is ``/api/atlas/v2/orgs/{orgId}/invoices/{invoiceId}``,
the Atlas CLI command is:

.. code-block:: shell

   atlas api <tag> <operationId> --orgId <ORG_ID> --invoiceId <INVOICE_ID>

.. note::

   You usually don't need to specify ``--orgId`` and ``--projectId`` as they are sourced
   from your profile. Specify them only if they are not set in your profile.

If applicable to the endpoint, pass in the request body using the ``--file`` option
or standard input (``stdin``).
For example:

.. code-block:: shell

   atlas api clusters create --file cluster-config.json

In addition, the following options are available for all Atlas Administration API endpoints.

.. list-table::
   :header-rows: 1
   :widths: 20 10 10 60

   * - Name
     - Type
     - Required
     - Description
   * - ``--api-version``
     - string
     - false
     - Specify the version of the Atlas Administration API
       for the command. Defaults to the latest API version or the value you've configured for ``api_version`` in your profile.
   * - ``--out``
     - string
     - false
     - Output format. The default is ``json``, but the supported formats can vary by endpoint:

       - Most endpoints output ``json``. When ``json`` is supported, you can also use a Go template.
       - Some endpoints support ``json`` and ``csv``, allowing you to use ``json``, ``csv``, or a Go template.
       - Certain endpoints output binary data (for example, logs in gzip format), requiring the ``--out`` option.

       To determine the supported formats for an endpoint:

       - Check the content response type examples in the API documentation: https://www.mongodb.com/docs/atlas/reference/api-resources-spec/v2/.
       - Run ``atlas api <tag> <operationId> --help`` for details.
   * - ``-o, --out-file``
     - string
     - false
     - File path to save the output. By default, the result is displayed in the terminal.
   * - ``--file``
     - string
     - false
     - File path to the request body content, if required by the operation.
       Alternatively, provide input through standard input (``stdin``).
   * - ``-h, --help``
     - boolean
     - false
     - Help for the current command.

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

* :ref:`atlas-api-accessTracking` - Returns access logs for authentication attempts made to Atlas database deployments.
* :ref:`atlas-api-alertConfigurations` - Returns and edits the conditions that trigger alerts and how MongoDB Cloud notifies users.
* :ref:`atlas-api-alerts` - Returns and acknowledges alerts that MongoDB Cloud triggers based on the alert conditions that you define.
* :ref:`atlas-api-atlasSearch` - Returns, adds, edits, and removes Atlas Search indexes for the specified cluster.
* :ref:`atlas-api-auditing` - Returns and edits database auditing settings for MongoDB Cloud projects.
* :ref:`atlas-api-awsClustersDns` - Returns and edits custom DNS configurations for MongoDB Cloud database deployments on AWS.
* :ref:`atlas-api-cloudBackups` - Manages Cloud Backup snapshots, snapshot export buckets, restore jobs, and schedules.
* :ref:`atlas-api-cloudMigrationService` - Manages the Cloud Migration Service.
* :ref:`atlas-api-cloudProviderAccess` - Returns, adds, authorizes, and removes AWS IAM roles in Atlas.
* :ref:`atlas-api-clusterOutageSimulation` - Returns, starts, or ends a cluster outage simulation.
* :ref:`atlas-api-clusters` - Returns, adds, edits, and removes database deployments.
* :ref:`atlas-api-collectionLevelMetrics` - Returns, adds, and edits pinned namespaces for the specified cluster or process.
* :ref:`atlas-api-customDatabaseRoles` - Returns, adds, edits, and removes custom database user privilege roles.
* :ref:`atlas-api-dataFederation` - Returns, adds, edits, and removes Federated Database Instances.
* :ref:`atlas-api-databaseUsers` - Returns, adds, edits, and removes database users.
* :ref:`atlas-api-encryptionAtRestUsingCustomerKeyManagement` - Returns and edits the Encryption at Rest using Customer Key Management configuration.
* :ref:`atlas-api-events` - Returns events.
* :ref:`atlas-api-federatedAuthentication` - Returns, adds, edits, and removes federation-related features such as role mappings and connected organization configurations.
* :ref:`atlas-api-flexClusters` - Returns, adds, edits, and removes flex clusters.
* :ref:`atlas-api-flexRestoreJobs` - Returns and adds restore jobs for flex database deployments.
* :ref:`atlas-api-flexSnapshots` - Returns and requests to download flex database deployment snapshots.
* :ref:`atlas-api-globalClusters` - Returns, adds, and removes Global Cluster managed namespaces and custom zone mappings.
* :ref:`atlas-api-invoices` - Returns invoices.
* :ref:`atlas-api-ldapConfiguration` - Returns, edits, verifies, and removes LDAP configurations.
* :ref:`atlas-api-legacyBackup` - Manages Legacy Backup snapshots, restore jobs, schedules and checkpoints.
* :ref:`atlas-api-maintenanceWindows` - Returns, edits, and removes maintenance windows.
* :ref:`atlas-api-mongoDbCloudUsers` - Returns, adds, and edits MongoDB Cloud users.
* :ref:`atlas-api-monitoringAndLogs` - Returns database deployment monitoring and logging data.
* :ref:`atlas-api-networkPeering` - Returns, adds, edits, and removes network peering containers and peering connections.
* :ref:`atlas-api-onlineArchive` - Returns, adds, edits, or removes an online archive.
* :ref:`atlas-api-organizations` - Returns, adds, and edits organizational units in MongoDB Cloud.
* :ref:`atlas-api-performanceAdvisor` - Returns suggested indexes and slow query data for a database deployment.
* :ref:`atlas-api-privateEndpointServices` - Returns, adds, edits, and removes private endpoint services.
* :ref:`atlas-api-programmaticApiKeys` - Returns, adds, edits, and removes access tokens to use the MongoDB Cloud API.
* :ref:`atlas-api-projectIpAccessList` - Returns, adds, edits, and removes network access limits to database deployments in Atlas.
* :ref:`atlas-api-projects` - Returns, adds, and edits collections of clusters and users in MongoDB Cloud.
* :ref:`atlas-api-pushBasedLogExport` - You can continually push logs from mongod, mongos, and audit logs to an AWS S3 bucket.
* :ref:`atlas-api-queryShapeInsights` -
* :ref:`atlas-api-resourcePolicies` - Configure and manage Atlas Resource Policies within your organization.
* :ref:`atlas-api-rollingIndex` - Creates one index to a database deployment in a rolling manner.
* :ref:`atlas-api-root` - Returns details that describe the MongoDB Cloud build and the access token that requests this resource.

* :ref:`atlas-api-serviceAccounts` - Endpoints for managing Service Accounts and secrets.
* :ref:`atlas-api-sharedTierRestoreJobs` - Returns and adds restore jobs for shared-tier database deployments.
* :ref:`atlas-api-sharedTierSnapshots` - Returns and requests to download shared-tier database deployment snapshots.
* :ref:`atlas-api-streams` - Returns, adds, edits, and removes Streams Instances.
* :ref:`atlas-api-teams` - Returns, adds, edits, or removes teams.
* :ref:`atlas-api-thirdPartyIntegrations` - Returns, adds, edits, and removes third-party service integration configurations.
* :ref:`atlas-api-x509Authentication` - Returns, edits, and removes user-managed X.509 configurations.

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
   organizations </command/atlas-api-organizations>
   performanceAdvisor </command/atlas-api-performanceAdvisor>
   privateEndpointServices </command/atlas-api-privateEndpointServices>
   programmaticApiKeys </command/atlas-api-programmaticApiKeys>
   projectIpAccessList </command/atlas-api-projectIpAccessList>
   projects </command/atlas-api-projects>
   pushBasedLogExport </command/atlas-api-pushBasedLogExport>
   queryShapeInsights </command/atlas-api-queryShapeInsights>
   resourcePolicies </command/atlas-api-resourcePolicies>
   rollingIndex </command/atlas-api-rollingIndex>
   root </command/atlas-api-root>

   serviceAccounts </command/atlas-api-serviceAccounts>
   sharedTierRestoreJobs </command/atlas-api-sharedTierRestoreJobs>
   sharedTierSnapshots </command/atlas-api-sharedTierSnapshots>
   streams </command/atlas-api-streams>
   teams </command/atlas-api-teams>
   thirdPartyIntegrations </command/atlas-api-thirdPartyIntegrations>
   x509Authentication </command/atlas-api-x509Authentication>
