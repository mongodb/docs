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

Returns and adds restore jobs for flex database deployments.

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

* :ref:`atlas-api-flexRestoreJobs-createFlexRestoreJob` - Restores one snapshot of one flex cluster from the specified project.
* :ref:`atlas-api-flexRestoreJobs-getFlexRestoreJob` - Returns one restore job for one flex cluster from the specified project.
* :ref:`atlas-api-flexRestoreJobs-listFlexRestoreJobs` - Returns all restore jobs for one flex cluster from the specified project.


.. toctree::
   :titlesonly:

   createFlexRestoreJob </command/atlas-api-flexRestoreJobs-createFlexRestoreJob>
   getFlexRestoreJob </command/atlas-api-flexRestoreJobs-getFlexRestoreJob>
   listFlexRestoreJobs </command/atlas-api-flexRestoreJobs-listFlexRestoreJobs>
