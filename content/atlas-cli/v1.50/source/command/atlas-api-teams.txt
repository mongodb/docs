.. _atlas-api-teams:

===============
atlas api teams
===============

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Returns, adds, edits, or removes teams.

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
     - help for teams

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

* :ref:`atlas-api-teams-addGroupTeams` - Adds one or more teams to the specified project.
* :ref:`atlas-api-teams-addTeamUsers` - Adds one or more MongoDB Cloud users from the specified organization to the specified team.
* :ref:`atlas-api-teams-createOrgTeam` - Creates one team in the specified organization.
* :ref:`atlas-api-teams-deleteOrgTeam` - Removes one team specified using its unique 24-hexadecimal digit identifier from the organization specified using its unique 24-hexadecimal digit identifier.
* :ref:`atlas-api-teams-getGroupTeam` - Returns one team to which the authenticated user has access in the project specified using its unique 24-hexadecimal digit identifier.
* :ref:`atlas-api-teams-getOrgTeam` - Returns one team that you identified using its unique 24-hexadecimal digit ID.
* :ref:`atlas-api-teams-getTeamByName` - Returns one team that you identified using its human-readable name.
* :ref:`atlas-api-teams-listGroupTeams` - Returns all teams to which the authenticated user has access in the project specified using its unique 24-hexadecimal digit identifier.
* :ref:`atlas-api-teams-listOrgTeams` - Returns all teams that belong to the specified organization.
* :ref:`atlas-api-teams-removeGroupTeam` - Removes one team specified using its unique 24-hexadecimal digit identifier from the project specified using its unique 24-hexadecimal digit identifier.
* :ref:`atlas-api-teams-removeUserFromTeam` - Removes one MongoDB Cloud user from the specified team.
* :ref:`atlas-api-teams-renameOrgTeam` - Renames one team in the specified organization.
* :ref:`atlas-api-teams-updateGroupTeam` - Updates the project roles assigned to the specified team.


.. toctree::
   :titlesonly:

   addGroupTeams </command/atlas-api-teams-addGroupTeams>
   addTeamUsers </command/atlas-api-teams-addTeamUsers>
   createOrgTeam </command/atlas-api-teams-createOrgTeam>
   deleteOrgTeam </command/atlas-api-teams-deleteOrgTeam>
   getGroupTeam </command/atlas-api-teams-getGroupTeam>
   getOrgTeam </command/atlas-api-teams-getOrgTeam>
   getTeamByName </command/atlas-api-teams-getTeamByName>
   listGroupTeams </command/atlas-api-teams-listGroupTeams>
   listOrgTeams </command/atlas-api-teams-listOrgTeams>
   removeGroupTeam </command/atlas-api-teams-removeGroupTeam>
   removeUserFromTeam </command/atlas-api-teams-removeUserFromTeam>
   renameOrgTeam </command/atlas-api-teams-renameOrgTeam>
   updateGroupTeam </command/atlas-api-teams-updateGroupTeam>
