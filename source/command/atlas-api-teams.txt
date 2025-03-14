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

`experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns, adds, edits, or removes teams.

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

* :ref:`atlas-api-teams-addAllTeamsToProject` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Adds one or more teams to the specified project.
* :ref:`atlas-api-teams-addTeamUser` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Adds one or more MongoDB Cloud users from the specified organization to the specified team.
* :ref:`atlas-api-teams-createTeam` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Creates one team in the specified organization.
* :ref:`atlas-api-teams-deleteTeam` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Removes one team specified using its unique 24-hexadecimal digit identifier from the organization specified using its unique 24-hexadecimal digit identifier.
* :ref:`atlas-api-teams-getTeamById` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns one team that you identified using its unique 24-hexadecimal digit ID.
* :ref:`atlas-api-teams-getTeamByName` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns one team that you identified using its human-readable name.
* :ref:`atlas-api-teams-listOrganizationTeams` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns all teams that belong to the specified organization.
* :ref:`atlas-api-teams-listProjectTeams` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns all teams to which the authenticated user has access in the project specified using its unique 24-hexadecimal digit identifier.
* :ref:`atlas-api-teams-listTeamUsers` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns all MongoDB Cloud users assigned to the team specified using its unique 24-hexadecimal digit identifier.
* :ref:`atlas-api-teams-removeProjectTeam` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Removes one team specified using its unique 24-hexadecimal digit identifier from the project specified using its unique 24-hexadecimal digit identifier.
* :ref:`atlas-api-teams-removeTeamUser` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Removes one MongoDB Cloud user from the specified team.
* :ref:`atlas-api-teams-renameTeam` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Renames one team in the specified organization.
* :ref:`atlas-api-teams-updateTeamRoles` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Updates the project roles assigned to the specified team.


.. toctree::
   :titlesonly:

   addAllTeamsToProject </command/atlas-api-teams-addAllTeamsToProject>
   addTeamUser </command/atlas-api-teams-addTeamUser>
   createTeam </command/atlas-api-teams-createTeam>
   deleteTeam </command/atlas-api-teams-deleteTeam>
   getTeamById </command/atlas-api-teams-getTeamById>
   getTeamByName </command/atlas-api-teams-getTeamByName>
   listOrganizationTeams </command/atlas-api-teams-listOrganizationTeams>
   listProjectTeams </command/atlas-api-teams-listProjectTeams>
   listTeamUsers </command/atlas-api-teams-listTeamUsers>
   removeProjectTeam </command/atlas-api-teams-removeProjectTeam>
   removeTeamUser </command/atlas-api-teams-removeTeamUser>
   renameTeam </command/atlas-api-teams-renameTeam>
   updateTeamRoles </command/atlas-api-teams-updateTeamRoles>

