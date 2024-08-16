.. _atlas-serverless-backups-snapshots:

==================================
atlas serverless backups snapshots
==================================

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

* :ref:`atlas-serverless-backups-snapshots-describe` - Return the details for the specified snapshot for your project.
* :ref:`atlas-serverless-backups-snapshots-list` - Return all cloud backup snapshots for the specified serverless instance in your project.
* :ref:`atlas-serverless-backups-snapshots-watch` - Watch the specified snapshot in your project until it reaches a completed or failed status.


.. toctree::
   :titlesonly:

   describe </command/atlas-serverless-backups-snapshots-describe>
   list </command/atlas-serverless-backups-snapshots-list>
   watch </command/atlas-serverless-backups-snapshots-watch>

