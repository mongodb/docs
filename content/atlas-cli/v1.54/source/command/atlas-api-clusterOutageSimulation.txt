.. _atlas-api-clusterOutageSimulation:

=================================
atlas api clusterOutageSimulation
=================================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Returns, starts, or ends a cluster outage simulation.

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
     - help for clusterOutageSimulation

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

* :ref:`atlas-api-clusterOutageSimulation-endOutageSimulation` - Ends a cluster outage simulation.
* :ref:`atlas-api-clusterOutageSimulation-getOutageSimulation` - Returns one outage simulation for one cluster.
* :ref:`atlas-api-clusterOutageSimulation-startOutageSimulation` - Starts a cluster outage simulation.


.. toctree::
   :titlesonly:

   endOutageSimulation </command/atlas-api-clusterOutageSimulation-endOutageSimulation>
   getOutageSimulation </command/atlas-api-clusterOutageSimulation-getOutageSimulation>
   startOutageSimulation </command/atlas-api-clusterOutageSimulation-startOutageSimulation>
