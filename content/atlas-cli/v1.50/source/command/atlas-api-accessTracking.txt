.. _atlas-api-accessTracking:

========================
atlas api accessTracking
========================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Returns access logs for authentication attempts made to Atlas database deployments.

The atlas api sub-command is automatically generated from the MongoDB Atlas Admin API and offers full coverage of the Admin API.
Admin API capabilities have their own release lifecycle, which you can check via the provided API endpoint documentation link.

To view database access history, you must have either the Project Owner or Organization Owner role.

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
     - help for accessTracking

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

* :ref:`atlas-api-accessTracking-getAccessHistoryCluster` - Returns the access logs of one cluster identified by the cluster's name.
* :ref:`atlas-api-accessTracking-getAccessHistoryProcess` - Returns the access logs of one cluster identified by the cluster's hostname.


.. toctree::
   :titlesonly:

   getAccessHistoryCluster </command/atlas-api-accessTracking-getAccessHistoryCluster>
   getAccessHistoryProcess </command/atlas-api-accessTracking-getAccessHistoryProcess>
