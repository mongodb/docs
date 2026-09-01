.. _atlas-api-overloadProtectionSimulation:

======================================
atlas api overloadProtectionSimulation
======================================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Returns and starts overload protection simulations for a cluster.

The atlas api sub-command is automatically generated from the MongoDB Atlas Admin API and offers full coverage of the Admin API.
Admin API capabilities have their own release lifecycle, which you can check via the provided API endpoint documentation link.



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
     - help for overloadProtectionSimulation

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

* :ref:`atlas-api-overloadProtectionSimulation-createClusterOverloadSimulation` - Starts an overload protection simulation for one cluster.
* :ref:`atlas-api-overloadProtectionSimulation-deleteClusterOverloadSimulation` - Deletes the overload protection simulation for one cluster.
* :ref:`atlas-api-overloadProtectionSimulation-getClusterOverloadSimulation` - Returns the overload protection simulation for one cluster.
* :ref:`atlas-api-overloadProtectionSimulation-listClusterOverloadSimulations` - Returns all overload protection simulations for one cluster.


.. toctree::
   :titlesonly:

   createClusterOverloadSimulation </command/atlas-api-overloadProtectionSimulation-createClusterOverloadSimulation>
   deleteClusterOverloadSimulation </command/atlas-api-overloadProtectionSimulation-deleteClusterOverloadSimulation>
   getClusterOverloadSimulation </command/atlas-api-overloadProtectionSimulation-getClusterOverloadSimulation>
   listClusterOverloadSimulations </command/atlas-api-overloadProtectionSimulation-listClusterOverloadSimulations>
