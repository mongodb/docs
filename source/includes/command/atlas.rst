.. _atlas:

=====
atlas
=====

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

CLI tool to manage MongoDB Atlas.

The Atlas CLI is a command line interface built specifically for MongoDB Atlas. You can manage your Atlas database deployments and Atlas Search from the terminal with short, intuitive commands.
		
Use the --help flag with any command for more info on that command.

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
     - help for atlas
   * - -P, --profile
     - string
     - false
     - Name of the profile to use from your configuration file. To learn about profiles for the Atlas CLI, see https://dochub.mongodb.org/core/atlas-cli-save-connection-settings.

Examples
--------

.. code-block::
   :copyable: false

   # Display the help menu for the config command:
   atlas config --help

Related Commands
----------------

* :ref:`atlas-accessLists` - Manage the list of IP addresses that can access your Atlas project.
* :ref:`atlas-accessLogs` - Return the access logs for a cluster.
* :ref:`atlas-alerts` - Manage alerts for your project.
* :ref:`atlas-auditing` - Returns database auditing settings for MongoDB Cloud projects.
* :ref:`atlas-auth` - Manage the CLI's authentication state.
* :ref:`atlas-backups` - Manage cloud backups for your project.
* :ref:`atlas-cloudProviders` - Manage cloud provider access in Atlas using AWS IAM roles.
* :ref:`atlas-clusters` - Manage clusters for your project.
* :ref:`atlas-completion` - Generate the autocompletion script for the specified shell
* :ref:`atlas-config` - Configure and manage your user profiles.
* :ref:`atlas-customDbRoles` - Manage custom database roles for your project.
* :ref:`atlas-customDns` - Manage DNS configuration of Atlas project’s clusters deployed to AWS.
* :ref:`atlas-dataFederation` - Data federation.
* :ref:`atlas-dataLakePipelines` - Data Lake pipelines.
* :ref:`atlas-dbusers` - Manage database users for your project.
* :ref:`atlas-deployments` - Manage cloud and local deployments.
* :ref:`atlas-events` - Manage events for your organization or project.
* :ref:`atlas-federatedAuthentication` - Manage Atlas Federated Authentication.
* :ref:`atlas-integrations` - Configure third-party integrations for your Atlas project.
* :ref:`atlas-kubernetes` - Manage Kubernetes resources.
* :ref:`atlas-liveMigrations` - Manage a Live Migration to Atlas for your organization.
* :ref:`atlas-logs` - Download host logs for your project.
* :ref:`atlas-maintenanceWindows` - Manage Atlas maintenance windows.
* :ref:`atlas-metrics` - Get metrics on the MongoDB process.
* :ref:`atlas-networking` - Manage or configure network peering for your Atlas project.
* :ref:`atlas-organizations` - Manage your Atlas organizations.
* :ref:`atlas-performanceAdvisor` - Learn more about slow queries and get suggestions to improve database performance.
* :ref:`atlas-privateEndpoints` - Manage Atlas private endpoints.
* :ref:`atlas-processes` - Manage MongoDB processes for your project.
* :ref:`atlas-projects` - Manage your Atlas projects.
* :ref:`atlas-security` - Manage security configuration for your project.
* :ref:`atlas-serverless` - Manage serverless instances for your project.
* :ref:`atlas-setup` - Register, authenticate, create, and access an Atlas cluster.
* :ref:`atlas-streams` - Manage your Atlas Stream Processing deployments.
* :ref:`atlas-teams` - Manage your Atlas teams.
* :ref:`atlas-users` - Manage your Atlas users.


.. toctree::
   :titlesonly:

   accessLists </command/atlas-accessLists>
   accessLogs </command/atlas-accessLogs>
   alerts </command/atlas-alerts>
   auditing </command/atlas-auditing>
   auth </command/atlas-auth>
   backups </command/atlas-backups>
   cloudProviders </command/atlas-cloudProviders>
   clusters </command/atlas-clusters>
   completion </command/atlas-completion>
   config </command/atlas-config>
   customDbRoles </command/atlas-customDbRoles>
   customDns </command/atlas-customDns>
   dataFederation </command/atlas-dataFederation>
   dataLakePipelines </command/atlas-dataLakePipelines>
   dbusers </command/atlas-dbusers>
   deployments </command/atlas-deployments>
   events </command/atlas-events>
   federatedAuthentication </command/atlas-federatedAuthentication>
   integrations </command/atlas-integrations>
   kubernetes </command/atlas-kubernetes>
   liveMigrations </command/atlas-liveMigrations>
   logs </command/atlas-logs>
   maintenanceWindows </command/atlas-maintenanceWindows>
   metrics </command/atlas-metrics>
   networking </command/atlas-networking>
   organizations </command/atlas-organizations>
   performanceAdvisor </command/atlas-performanceAdvisor>
   privateEndpoints </command/atlas-privateEndpoints>
   processes </command/atlas-processes>
   projects </command/atlas-projects>
   security </command/atlas-security>
   serverless </command/atlas-serverless>
   setup </command/atlas-setup>
   streams </command/atlas-streams>
   teams </command/atlas-teams>
   users </command/atlas-users>

