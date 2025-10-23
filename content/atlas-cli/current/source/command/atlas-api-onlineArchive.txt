.. _atlas-api-onlineArchive:

=======================
atlas api onlineArchive
=======================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Returns, adds, edits, or removes an online archive.

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
     - help for onlineArchive

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

* :ref:`atlas-api-onlineArchive-createOnlineArchive` - Creates one online archive.
* :ref:`atlas-api-onlineArchive-deleteOnlineArchive` - Removes one online archive.
* :ref:`atlas-api-onlineArchive-downloadQueryLogs` - Downloads query logs for the specified online archive.
* :ref:`atlas-api-onlineArchive-getOnlineArchive` - Returns one online archive for one cluster.
* :ref:`atlas-api-onlineArchive-listOnlineArchives` - Returns details of all online archives.
* :ref:`atlas-api-onlineArchive-updateOnlineArchive` - Updates, pauses, or resumes one online archive.


.. toctree::
   :titlesonly:

   createOnlineArchive </command/atlas-api-onlineArchive-createOnlineArchive>
   deleteOnlineArchive </command/atlas-api-onlineArchive-deleteOnlineArchive>
   downloadQueryLogs </command/atlas-api-onlineArchive-downloadQueryLogs>
   getOnlineArchive </command/atlas-api-onlineArchive-getOnlineArchive>
   listOnlineArchives </command/atlas-api-onlineArchive-listOnlineArchives>
   updateOnlineArchive </command/atlas-api-onlineArchive-updateOnlineArchive>
