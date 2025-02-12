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

`experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns and requests to download flex database deployment snapshots.

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

* :ref:`atlas-api-flexSnapshots-downloadFlexBackup` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Requests one snapshot for the specified flex cluster.
* :ref:`atlas-api-flexSnapshots-getFlexBackup` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns one snapshot of one flex cluster from the specified project.
* :ref:`atlas-api-flexSnapshots-listFlexBackups` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns all snapshots of one flex cluster from the specified project.


.. toctree::
   :titlesonly:

   downloadFlexBackup </command/atlas-api-flexSnapshots-downloadFlexBackup>
   getFlexBackup </command/atlas-api-flexSnapshots-getFlexBackup>
   listFlexBackups </command/atlas-api-flexSnapshots-listFlexBackups>

