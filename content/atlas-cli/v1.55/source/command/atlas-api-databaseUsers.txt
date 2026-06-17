.. _atlas-api-databaseUsers:

=======================
atlas api databaseUsers
=======================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Returns, adds, edits, and removes database users.

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
     - help for databaseUsers

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

* :ref:`atlas-api-databaseUsers-createDatabaseUser` - Creates one database user in the specified project.
* :ref:`atlas-api-databaseUsers-deleteDatabaseUser` - Removes one database user from the specified project.
* :ref:`atlas-api-databaseUsers-getDatabaseUser` - Returns one database user that belong to the specified project.
* :ref:`atlas-api-databaseUsers-listDatabaseUsers` - Returns all database users that belong to the specified project.
* :ref:`atlas-api-databaseUsers-updateDatabaseUser` - Updates one database user that belongs to the specified project.


.. toctree::
   :titlesonly:

   createDatabaseUser </command/atlas-api-databaseUsers-createDatabaseUser>
   deleteDatabaseUser </command/atlas-api-databaseUsers-deleteDatabaseUser>
   getDatabaseUser </command/atlas-api-databaseUsers-getDatabaseUser>
   listDatabaseUsers </command/atlas-api-databaseUsers-listDatabaseUsers>
   updateDatabaseUser </command/atlas-api-databaseUsers-updateDatabaseUser>
