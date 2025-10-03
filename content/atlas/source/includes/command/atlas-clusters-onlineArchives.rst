.. _atlas-clusters-onlineArchives:

=============================
atlas clusters onlineArchives
=============================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Manage online archives for your cluster.

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
     - help for onlineArchives

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

* :ref:`atlas-clusters-onlineArchives-create` - Create an online archive for a collection in the specified cluster.
* :ref:`atlas-clusters-onlineArchives-delete` - Remove the specified online archive from your cluster.
* :ref:`atlas-clusters-onlineArchives-describe` - Return the details for the specified online archive for your cluster.
* :ref:`atlas-clusters-onlineArchives-list` - Return all online archives for your cluster.
* :ref:`atlas-clusters-onlineArchives-pause` - Pause the specfied online archive for your cluster.
* :ref:`atlas-clusters-onlineArchives-start` - Start a paused online archive from a cluster.
* :ref:`atlas-clusters-onlineArchives-update` - Modify the archiving rule for the specified online archive for a cluster.
* :ref:`atlas-clusters-onlineArchives-watch` - Watch for an archive to be available.


.. toctree::
   :titlesonly:

   create </command/atlas-clusters-onlineArchives-create>
   delete </command/atlas-clusters-onlineArchives-delete>
   describe </command/atlas-clusters-onlineArchives-describe>
   list </command/atlas-clusters-onlineArchives-list>
   pause </command/atlas-clusters-onlineArchives-pause>
   start </command/atlas-clusters-onlineArchives-start>
   update </command/atlas-clusters-onlineArchives-update>
   watch </command/atlas-clusters-onlineArchives-watch>

