.. _atlas-api-cloudMigrationService:

===============================
atlas api cloudMigrationService
===============================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Manages the Cloud Migration Service.

The atlas api sub-command is automatically generated from the MongoDB Atlas Admin API and offers full coverage of the Admin API.
Admin API capabilities have their own release lifecycle, which you can check via the provided API endpoint documentation link.

Source organizations, projects, and MongoDB clusters reside on Cloud Manager or Ops Manager. Destination organizations, projects, and MongoDB clusters reside on MongoDB Cloud. Source databases can't use any authentication except SCRAM-SHA.

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
     - help for cloudMigrationService

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

* :ref:`atlas-api-cloudMigrationService-createGroupLiveMigration` - Migrate one cluster that Cloud or Ops Manager manages to MongoDB Atlas.
* :ref:`atlas-api-cloudMigrationService-createLinkToken` - Create one link-token that contains all the information required to complete the link.
* :ref:`atlas-api-cloudMigrationService-cutoverMigration` - Cut over the migrated cluster to MongoDB Atlas.
* :ref:`atlas-api-cloudMigrationService-deleteLinkTokens` - Remove one organization link and its associated public API key.
* :ref:`atlas-api-cloudMigrationService-getGroupLiveMigration` - Return details of one cluster migration job.
* :ref:`atlas-api-cloudMigrationService-getMigrationValidateStatus` - Return the status of one migration validation job.
* :ref:`atlas-api-cloudMigrationService-listAvailableProjects` - Return all projects that you can migrate to the specified organization.
* :ref:`atlas-api-cloudMigrationService-validateLiveMigrations` - Verifies whether the provided credentials, available disk space, MongoDB versions, and so on meet the requirements of the migration request.


.. toctree::
   :titlesonly:

   createGroupLiveMigration </command/atlas-api-cloudMigrationService-createGroupLiveMigration>
   createLinkToken </command/atlas-api-cloudMigrationService-createLinkToken>
   cutoverMigration </command/atlas-api-cloudMigrationService-cutoverMigration>
   deleteLinkTokens </command/atlas-api-cloudMigrationService-deleteLinkTokens>
   getGroupLiveMigration </command/atlas-api-cloudMigrationService-getGroupLiveMigration>
   getMigrationValidateStatus </command/atlas-api-cloudMigrationService-getMigrationValidateStatus>
   listAvailableProjects </command/atlas-api-cloudMigrationService-listAvailableProjects>
   validateLiveMigrations </command/atlas-api-cloudMigrationService-validateLiveMigrations>
