.. _atlas-api-dataFederation:

========================
atlas api dataFederation
========================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

`experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns, adds, edits, and removes Federated Database Instances.

This resource requires your project ID. Changes to federated database instance configurations can affect costs.

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
     - help for dataFederation

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

* :ref:`atlas-api-dataFederation-createDataFederationPrivateEndpoint` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Adds one private endpoint for Federated Database Instances and Online Archives to the specified projects.
* :ref:`atlas-api-dataFederation-createFederatedDatabase` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Creates one federated database instance in the specified project.
* :ref:`atlas-api-dataFederation-createOneDataFederationQueryLimit` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Creates or updates one query limit for one federated database instance.
* :ref:`atlas-api-dataFederation-deleteDataFederationPrivateEndpoint` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Removes one private endpoint for Federated Database Instances and Online Archives in the specified project.
* :ref:`atlas-api-dataFederation-deleteFederatedDatabase` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Removes one federated database instance from the specified project.
* :ref:`atlas-api-dataFederation-deleteOneDataFederationInstanceQueryLimit` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Deletes one query limit for one federated database instance.
* :ref:`atlas-api-dataFederation-downloadFederatedDatabaseQueryLogs` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Downloads the query logs for the specified federated database instance.
* :ref:`atlas-api-dataFederation-getDataFederationPrivateEndpoint` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns the specified private endpoint for Federated Database Instances or Online Archives in the specified project.
* :ref:`atlas-api-dataFederation-getFederatedDatabase` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns the details of one federated database instance within the specified project.
* :ref:`atlas-api-dataFederation-listDataFederationPrivateEndpoints` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns all private endpoints for Federated Database Instances and Online Archives in the specified project.
* :ref:`atlas-api-dataFederation-listFederatedDatabases` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns the details of all federated database instances in the specified project.
* :ref:`atlas-api-dataFederation-returnFederatedDatabaseQueryLimit` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns the details of one query limit for the specified federated database instance in the specified project.
* :ref:`atlas-api-dataFederation-returnFederatedDatabaseQueryLimits` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns query limits for a federated databases instance in the specified project.
* :ref:`atlas-api-dataFederation-updateFederatedDatabase` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Updates the details of one federated database instance in the specified project.


.. toctree::
   :titlesonly:

   createDataFederationPrivateEndpoint </command/atlas-api-dataFederation-createDataFederationPrivateEndpoint>
   createFederatedDatabase </command/atlas-api-dataFederation-createFederatedDatabase>
   createOneDataFederationQueryLimit </command/atlas-api-dataFederation-createOneDataFederationQueryLimit>
   deleteDataFederationPrivateEndpoint </command/atlas-api-dataFederation-deleteDataFederationPrivateEndpoint>
   deleteFederatedDatabase </command/atlas-api-dataFederation-deleteFederatedDatabase>
   deleteOneDataFederationInstanceQueryLimit </command/atlas-api-dataFederation-deleteOneDataFederationInstanceQueryLimit>
   downloadFederatedDatabaseQueryLogs </command/atlas-api-dataFederation-downloadFederatedDatabaseQueryLogs>
   getDataFederationPrivateEndpoint </command/atlas-api-dataFederation-getDataFederationPrivateEndpoint>
   getFederatedDatabase </command/atlas-api-dataFederation-getFederatedDatabase>
   listDataFederationPrivateEndpoints </command/atlas-api-dataFederation-listDataFederationPrivateEndpoints>
   listFederatedDatabases </command/atlas-api-dataFederation-listFederatedDatabases>
   returnFederatedDatabaseQueryLimit </command/atlas-api-dataFederation-returnFederatedDatabaseQueryLimit>
   returnFederatedDatabaseQueryLimits </command/atlas-api-dataFederation-returnFederatedDatabaseQueryLimits>
   updateFederatedDatabase </command/atlas-api-dataFederation-updateFederatedDatabase>

