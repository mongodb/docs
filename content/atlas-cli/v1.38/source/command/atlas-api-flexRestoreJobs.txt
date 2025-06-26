.. _atlas-api-flexRestoreJobs:

=========================
atlas api flexRestoreJobs
=========================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

`experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns and adds restore jobs for flex database deployments.

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
     - help for flexRestoreJobs

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

* :ref:`atlas-api-flexRestoreJobs-createFlexBackupRestoreJob` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Restores one snapshot of one flex cluster from the specified project.
* :ref:`atlas-api-flexRestoreJobs-getFlexBackupRestoreJob` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns one restore job for one flex cluster from the specified project.
* :ref:`atlas-api-flexRestoreJobs-listFlexBackupRestoreJobs` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns all restore jobs for one flex cluster from the specified project.


.. toctree::
   :titlesonly:

   createFlexBackupRestoreJob </command/atlas-api-flexRestoreJobs-createFlexBackupRestoreJob>
   getFlexBackupRestoreJob </command/atlas-api-flexRestoreJobs-getFlexBackupRestoreJob>
   listFlexBackupRestoreJobs </command/atlas-api-flexRestoreJobs-listFlexBackupRestoreJobs>

