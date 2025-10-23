.. _atlas-api-pushBasedLogExport:

============================
atlas api pushBasedLogExport
============================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

You can continually push logs from mongod, mongos, and audit logs to an AWS S3 bucket.

The atlas api sub-command is automatically generated from the MongoDB Atlas Admin API and offers full coverage of the Admin API.
Admin API capabilities have their own release lifecycle, which you can check via the provided API endpoint documentation link.

Atlas exports logs every 5 minutes.

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
     - help for pushBasedLogExport

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

* :ref:`atlas-api-pushBasedLogExport-createLogExport` - Configures the project level settings for the push-based log export feature.
* :ref:`atlas-api-pushBasedLogExport-deleteLogExport` - Disables the push-based log export feature by resetting the project level settings to its default configuration.
* :ref:`atlas-api-pushBasedLogExport-getLogExport` - Fetches the current project level settings for the push-based log export feature.
* :ref:`atlas-api-pushBasedLogExport-updateLogExport` - Updates the project level settings for the push-based log export feature.


.. toctree::
   :titlesonly:

   createLogExport </command/atlas-api-pushBasedLogExport-createLogExport>
   deleteLogExport </command/atlas-api-pushBasedLogExport-deleteLogExport>
   getLogExport </command/atlas-api-pushBasedLogExport-getLogExport>
   updateLogExport </command/atlas-api-pushBasedLogExport-updateLogExport>
