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

Returns, adds, edits, and removes Federated Database Instances.

The atlas api sub-command is automatically generated from the MongoDB Atlas Admin API and offers full coverage of the Admin API.
Admin API capabilities have their own release lifecycle, which you can check via the provided API endpoint documentation link.

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

* :ref:`atlas-api-dataFederation-createDataFederation` - Creates one federated database instance in the specified project.
* :ref:`atlas-api-dataFederation-createPrivateEndpointId` - Adds one private endpoint for Federated Database Instances and Online Archives to the specified projects.
* :ref:`atlas-api-dataFederation-deleteDataFederation` - Removes one federated database instance from the specified project.
* :ref:`atlas-api-dataFederation-deleteDataFederationLimit` - Deletes one query limit for one federated database instance.
* :ref:`atlas-api-dataFederation-deletePrivateEndpointId` - Removes one private endpoint for Federated Database Instances and Online Archives in the specified project.
* :ref:`atlas-api-dataFederation-downloadFederationQueryLogs` - Downloads the query logs for the specified federated database instance.
* :ref:`atlas-api-dataFederation-getDataFederation` - Returns the details of one federated database instance within the specified project.
* :ref:`atlas-api-dataFederation-getDataFederationLimit` - Returns the details of one query limit for the specified federated database instance in the specified project.
* :ref:`atlas-api-dataFederation-getPrivateEndpointId` - Returns the specified private endpoint for Federated Database Instances or Online Archives in the specified project.
* :ref:`atlas-api-dataFederation-listDataFederation` - Returns the details of all federated database instances in the specified project.
* :ref:`atlas-api-dataFederation-listDataFederationLimits` - Returns query limits for a federated databases instance in the specified project.
* :ref:`atlas-api-dataFederation-listPrivateEndpointIds` - Returns all private endpoints for Federated Database Instances and Online Archives in the specified project.
* :ref:`atlas-api-dataFederation-setDataFederationLimit` - Creates or updates one query limit for one federated database instance.
* :ref:`atlas-api-dataFederation-updateDataFederation` - Updates the details of one federated database instance in the specified project.


.. toctree::
   :titlesonly:

   createDataFederation </command/atlas-api-dataFederation-createDataFederation>
   createPrivateEndpointId </command/atlas-api-dataFederation-createPrivateEndpointId>
   deleteDataFederation </command/atlas-api-dataFederation-deleteDataFederation>
   deleteDataFederationLimit </command/atlas-api-dataFederation-deleteDataFederationLimit>
   deletePrivateEndpointId </command/atlas-api-dataFederation-deletePrivateEndpointId>
   downloadFederationQueryLogs </command/atlas-api-dataFederation-downloadFederationQueryLogs>
   getDataFederation </command/atlas-api-dataFederation-getDataFederation>
   getDataFederationLimit </command/atlas-api-dataFederation-getDataFederationLimit>
   getPrivateEndpointId </command/atlas-api-dataFederation-getPrivateEndpointId>
   listDataFederation </command/atlas-api-dataFederation-listDataFederation>
   listDataFederationLimits </command/atlas-api-dataFederation-listDataFederationLimits>
   listPrivateEndpointIds </command/atlas-api-dataFederation-listPrivateEndpointIds>
   setDataFederationLimit </command/atlas-api-dataFederation-setDataFederationLimit>
   updateDataFederation </command/atlas-api-dataFederation-updateDataFederation>
