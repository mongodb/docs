.. _atlas-clusters:

==============
atlas clusters
==============

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Manage clusters for your project.

The clusters command provides access to your cluster configurations. You can create, edit, and delete clusters.

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
     - help for clusters

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

* :ref:`atlas-clusters-advancedSettings` - Manage advanced configuration settings for your cluster.
* :ref:`atlas-clusters-availableRegions` - Manage available regions for your project.
* :ref:`atlas-clusters-connectionStrings` - Manage MongoDB cluster connection string.
* :ref:`atlas-clusters-create` - Create a cluster for your project.
* :ref:`atlas-clusters-delete` - Remove the specified cluster from your project.
* :ref:`atlas-clusters-describe` - Return the details for the specified cluster for your project.
* :ref:`atlas-clusters-failover` - Starts a failover test for the specified cluster in the specified project.
* :ref:`atlas-clusters-indexes` - Manage cluster rolling indexes for your project.
* :ref:`atlas-clusters-list` - Return all clusters for your project.
* :ref:`atlas-clusters-onlineArchives` - Manage online archives for your cluster.
* :ref:`atlas-clusters-pause` - Pause the specified running MongoDB cluster.
* :ref:`atlas-clusters-sampleData` - Manage sample data for your cluster.
* :ref:`atlas-clusters-search` - Manage Atlas Search for your cluster.
* :ref:`atlas-clusters-start` - Start the specified paused MongoDB cluster.
* :ref:`atlas-clusters-update` - Modify the settings of the specified cluster.
* :ref:`atlas-clusters-upgrade` - Upgrade a shared cluster's tier, disk size, and/or MongoDB version.
* :ref:`atlas-clusters-watch` - Watch the specified cluster in your project until it becomes available.


.. toctree::
   :titlesonly:

   advancedSettings </command/atlas-clusters-advancedSettings>
   availableRegions </command/atlas-clusters-availableRegions>
   connectionStrings </command/atlas-clusters-connectionStrings>
   create </command/atlas-clusters-create>
   delete </command/atlas-clusters-delete>
   describe </command/atlas-clusters-describe>
   failover </command/atlas-clusters-failover>
   indexes </command/atlas-clusters-indexes>
   list </command/atlas-clusters-list>
   onlineArchives </command/atlas-clusters-onlineArchives>
   pause </command/atlas-clusters-pause>
   sampleData </command/atlas-clusters-sampleData>
   search </command/atlas-clusters-search>
   start </command/atlas-clusters-start>
   update </command/atlas-clusters-update>
   upgrade </command/atlas-clusters-upgrade>
   watch </command/atlas-clusters-watch>

