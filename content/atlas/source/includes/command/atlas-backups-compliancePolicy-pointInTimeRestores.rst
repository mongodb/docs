.. _atlas-backups-compliancePolicy-pointInTimeRestores:

==================================================
atlas backups compliancePolicy pointInTimeRestores
==================================================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Manage whether the project uses Continuous Cloud Backups with a Backup Compliance Policy. Read more in the documentation: https://www.mongodb.com/docs/atlas/backup/cloud-backup/configure-backup-policy/#configure-the-restore-window.

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
     - help for pointInTimeRestores

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

* :ref:`atlas-backups-compliancePolicy-pointInTimeRestores-enable` - Enable Point-in-Time restores of the backup compliance policy for your project.


.. toctree::
   :titlesonly:

   enable </command/atlas-backups-compliancePolicy-pointInTimeRestores-enable>

