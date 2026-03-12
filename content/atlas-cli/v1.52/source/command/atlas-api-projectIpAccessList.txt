.. _atlas-api-projectIpAccessList:

=============================
atlas api projectIpAccessList
=============================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Returns, adds, edits, and removes network access limits to database deployments in Atlas.

The atlas api sub-command is automatically generated from the MongoDB Atlas Admin API and offers full coverage of the Admin API.
Admin API capabilities have their own release lifecycle, which you can check via the provided API endpoint documentation link.

This resource replaces the whitelist resource. Atlas removed whitelists in July 2021. Update your applications to use this new resource. This resource manages a project's IP Access List and supports creating temporary Access List entries that automatically expire within a user-configurable 7-day period.

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
     - help for projectIpAccessList

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

* :ref:`atlas-api-projectIpAccessList-createAccessListEntry` - Adds one or more access list entries to the specified project.
* :ref:`atlas-api-projectIpAccessList-deleteAccessListEntry` - Removes one access list entry from the specified project's IP access list.
* :ref:`atlas-api-projectIpAccessList-getAccessListEntry` - Returns one access list entry from the specified project's IP access list.
* :ref:`atlas-api-projectIpAccessList-getAccessListStatus` - Returns the status of one project IP access list entry.
* :ref:`atlas-api-projectIpAccessList-listAccessListEntries` - Returns all access list entries from the specified project's IP access list.


.. toctree::
   :titlesonly:

   createAccessListEntry </command/atlas-api-projectIpAccessList-createAccessListEntry>
   deleteAccessListEntry </command/atlas-api-projectIpAccessList-deleteAccessListEntry>
   getAccessListEntry </command/atlas-api-projectIpAccessList-getAccessListEntry>
   getAccessListStatus </command/atlas-api-projectIpAccessList-getAccessListStatus>
   listAccessListEntries </command/atlas-api-projectIpAccessList-listAccessListEntries>
