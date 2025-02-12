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

`experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns, adds, edits, and removes network access limits to database deployments in Atlas.

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

* :ref:`atlas-api-projectIpAccessList-createProjectIpAccessList` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Adds one or more access list entries to the specified project.
* :ref:`atlas-api-projectIpAccessList-deleteProjectIpAccessList` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Removes one access list entry from the specified project's IP access list.
* :ref:`atlas-api-projectIpAccessList-getProjectIpAccessListStatus` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns the status of one project IP access list entry.
* :ref:`atlas-api-projectIpAccessList-getProjectIpList` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns one access list entry from the specified project's IP access list.
* :ref:`atlas-api-projectIpAccessList-listProjectIpAccessLists` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns all access list entries from the specified project's IP access list.


.. toctree::
   :titlesonly:

   createProjectIpAccessList </command/atlas-api-projectIpAccessList-createProjectIpAccessList>
   deleteProjectIpAccessList </command/atlas-api-projectIpAccessList-deleteProjectIpAccessList>
   getProjectIpAccessListStatus </command/atlas-api-projectIpAccessList-getProjectIpAccessListStatus>
   getProjectIpList </command/atlas-api-projectIpAccessList-getProjectIpList>
   listProjectIpAccessLists </command/atlas-api-projectIpAccessList-listProjectIpAccessLists>

