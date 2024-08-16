.. _atlas-serverless-backups-restores:

=================================
atlas serverless backups restores
=================================

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

* :ref:`atlas-serverless-backups-restores-create` - Start a restore job for your serverless instance.
* :ref:`atlas-serverless-backups-restores-describe` - Describe a cloud backup restore job.
* :ref:`atlas-serverless-backups-restores-list` - Return all cloud backup restore jobs for the specified serverless instance in your project.
* :ref:`atlas-serverless-backups-restores-watch` - Watch the specified backup restore job until it completes.


.. toctree::
   :titlesonly:

   create </command/atlas-serverless-backups-restores-create>
   describe </command/atlas-serverless-backups-restores-describe>
   list </command/atlas-serverless-backups-restores-list>
   watch </command/atlas-serverless-backups-restores-watch>

