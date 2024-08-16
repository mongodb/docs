.. _atlas-backups-restores:

======================
atlas backups restores
======================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Manage cloud backup restore jobs for your project.

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
     - help for restores

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

* :ref:`atlas-backups-restores-describe` - Describe a cloud backup restore job.
* :ref:`atlas-backups-restores-list` - Return all cloud backup restore jobs for your project and cluster.
* :ref:`atlas-backups-restores-start` - Start a restore job for your project and cluster.
* :ref:`atlas-backups-restores-watch` - Watch for a restore job to complete.


.. toctree::
   :titlesonly:

   describe </command/atlas-backups-restores-describe>
   list </command/atlas-backups-restores-list>
   start </command/atlas-backups-restores-start>
   watch </command/atlas-backups-restores-watch>

