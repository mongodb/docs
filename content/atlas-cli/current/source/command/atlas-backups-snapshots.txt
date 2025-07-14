.. _atlas-backups-snapshots:

=======================
atlas backups snapshots
=======================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Manage cloud backup snapshots for your project.

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
     - help for snapshots

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

* :ref:`atlas-backups-snapshots-create` - Create a backup snapshot for your project and cluster.
* :ref:`atlas-backups-snapshots-delete` - Remove the specified backup snapshot.
* :ref:`atlas-backups-snapshots-describe` - Return the details for the specified snapshot for your project.
* :ref:`atlas-backups-snapshots-download` - Download one snapshot for the specified flex cluster.
* :ref:`atlas-backups-snapshots-list` - Return all cloud backup snapshots for your project and cluster.
* :ref:`atlas-backups-snapshots-watch` - Watch the specified snapshot in your project until it becomes available.


.. toctree::
   :titlesonly:

   create </command/atlas-backups-snapshots-create>
   delete </command/atlas-backups-snapshots-delete>
   describe </command/atlas-backups-snapshots-describe>
   download </command/atlas-backups-snapshots-download>
   list </command/atlas-backups-snapshots-list>
   watch </command/atlas-backups-snapshots-watch>

