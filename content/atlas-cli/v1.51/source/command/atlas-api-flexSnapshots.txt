.. _atlas-api-flexSnapshots:

=======================
atlas api flexSnapshots
=======================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Returns and requests to download flex database deployment snapshots.

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
     - help for flexSnapshots

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

* :ref:`atlas-api-flexSnapshots-downloadFlexBackup` - Requests one snapshot for the specified flex cluster.
* :ref:`atlas-api-flexSnapshots-getFlexBackupSnapshot` - Returns one snapshot of one flex cluster from the specified project.
* :ref:`atlas-api-flexSnapshots-listFlexBackupSnapshots` - Returns all snapshots of one flex cluster from the specified project.


.. toctree::
   :titlesonly:

   downloadFlexBackup </command/atlas-api-flexSnapshots-downloadFlexBackup>
   getFlexBackupSnapshot </command/atlas-api-flexSnapshots-getFlexBackupSnapshot>
   listFlexBackupSnapshots </command/atlas-api-flexSnapshots-listFlexBackupSnapshots>
