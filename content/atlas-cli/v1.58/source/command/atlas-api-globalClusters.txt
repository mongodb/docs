.. _atlas-api-globalClusters:

========================
atlas api globalClusters
========================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Returns, adds, and removes Global Cluster managed namespaces and custom zone mappings.

The atlas api sub-command is automatically generated from the MongoDB Atlas Admin API and offers full coverage of the Admin API.
Admin API capabilities have their own release lifecycle, which you can check via the provided API endpoint documentation link.

Each collection in a Global Cluster is associated with a managed namespace. When you create a managed namespace for a Global Cluster, MongoDB Cloud creates an empty collection for that namespace. Creating a managed namespace doesn't populate a collection with data. Similarly, deleting a managed namespace doesn't delete the associated collection.
MongoDB Cloud shards the empty collection using the required location field and a custom shard key. For example, if your custom shard key is city, the compound shard key is location, city. Each Global Cluster is also associated with one or more Global Writes Zones. When a user creates a Global Cluster, MongoDB Cloud automatically maps each location code to the closest geographical zone. Custom zone mappings allow administrators to override these automatic mappings. For example, a use case might require mapping a location code to a geographically distant zone. Administrators can manage custom zone mappings with the APIs below and the Global Cluster Configuration pane when you create or modify your Global Cluster.

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
     - help for globalClusters

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

* :ref:`atlas-api-globalClusters-createCustomZoneMapping` - Creates one custom zone mapping for the specified global cluster.
* :ref:`atlas-api-globalClusters-createManagedNamespace` - Creates one managed namespace within the specified global cluster.
* :ref:`atlas-api-globalClusters-deleteCustomZoneMapping` - Removes all custom zone mappings for the specified global cluster.
* :ref:`atlas-api-globalClusters-deleteManagedNamespaces` - Removes one managed namespace within the specified global cluster.
* :ref:`atlas-api-globalClusters-getClusterGlobalWrites` - Returns one managed namespace within the specified global cluster.


.. toctree::
   :titlesonly:

   createCustomZoneMapping </command/atlas-api-globalClusters-createCustomZoneMapping>
   createManagedNamespace </command/atlas-api-globalClusters-createManagedNamespace>
   deleteCustomZoneMapping </command/atlas-api-globalClusters-deleteCustomZoneMapping>
   deleteManagedNamespaces </command/atlas-api-globalClusters-deleteManagedNamespaces>
   getClusterGlobalWrites </command/atlas-api-globalClusters-getClusterGlobalWrites>
