.. _atlas-api-projects:

==================
atlas api projects
==================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Returns, adds, and edits collections of clusters and users in MongoDB Cloud.

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
     - help for projects

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

* :ref:`atlas-api-projects-createGroup` - Creates one project.
* :ref:`atlas-api-projects-deleteGroup` - Removes the specified project.
* :ref:`atlas-api-projects-deleteGroupLimit` - Removes the specified project limit.
* :ref:`atlas-api-projects-getGroup` - Returns details about the specified project.
* :ref:`atlas-api-projects-getGroupByName` - Returns details about the project identified by its name.
* :ref:`atlas-api-projects-getGroupIpAddresses` - Returns all IP addresses for this project.
* :ref:`atlas-api-projects-getGroupLimit` - Returns the specified limit for the specified project.
* :ref:`atlas-api-projects-getGroupSettings` - Returns details about the specified project's settings.
* :ref:`atlas-api-projects-getMongoDbVersions` - Returns the MongoDB Long Term Support Major Versions available to new clusters in this project.
* :ref:`atlas-api-projects-listGroupLimits` - Returns all the limits for the specified project.
* :ref:`atlas-api-projects-listGroups` - Returns details about all projects.
* :ref:`atlas-api-projects-migrateGroup` - Migrates a project from its current organization to another organization.
* :ref:`atlas-api-projects-setGroupLimit` - Sets the specified project limit.
* :ref:`atlas-api-projects-updateGroup` - Updates the human-readable label that identifies the specified project, or the tags associated with the project.
* :ref:`atlas-api-projects-updateGroupSettings` - Updates the settings of the specified project.


.. toctree::
   :titlesonly:

   createGroup </command/atlas-api-projects-createGroup>
   deleteGroup </command/atlas-api-projects-deleteGroup>
   deleteGroupLimit </command/atlas-api-projects-deleteGroupLimit>
   getGroup </command/atlas-api-projects-getGroup>
   getGroupByName </command/atlas-api-projects-getGroupByName>
   getGroupIpAddresses </command/atlas-api-projects-getGroupIpAddresses>
   getGroupLimit </command/atlas-api-projects-getGroupLimit>
   getGroupSettings </command/atlas-api-projects-getGroupSettings>
   getMongoDbVersions </command/atlas-api-projects-getMongoDbVersions>
   listGroupLimits </command/atlas-api-projects-listGroupLimits>
   listGroups </command/atlas-api-projects-listGroups>
   migrateGroup </command/atlas-api-projects-migrateGroup>
   setGroupLimit </command/atlas-api-projects-setGroupLimit>
   updateGroup </command/atlas-api-projects-updateGroup>
   updateGroupSettings </command/atlas-api-projects-updateGroupSettings>
