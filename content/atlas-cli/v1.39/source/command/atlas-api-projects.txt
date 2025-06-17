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

`experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns, adds, and edits collections of clusters and users in MongoDB Cloud.

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

* :ref:`atlas-api-projects-addUserToProject` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Adds one MongoDB Cloud user to the specified project.
* :ref:`atlas-api-projects-createProject` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Creates one project.
* :ref:`atlas-api-projects-createProjectInvitation` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Invites one MongoDB Cloud user to join the specified project.
* :ref:`atlas-api-projects-deleteProject` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Removes the specified project.
* :ref:`atlas-api-projects-deleteProjectInvitation` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Cancels one pending invitation sent to the specified MongoDB Cloud user to join a project.
* :ref:`atlas-api-projects-deleteProjectLimit` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Removes the specified project limit.
* :ref:`atlas-api-projects-getProject` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns details about the specified project.
* :ref:`atlas-api-projects-getProjectByName` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns details about the specified project.
* :ref:`atlas-api-projects-getProjectInvitation` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns the details of one pending invitation to the specified project.
* :ref:`atlas-api-projects-getProjectLimit` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns the specified limit for the specified project.
* :ref:`atlas-api-projects-getProjectLtsVersions` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns the MongoDB Long Term Support Major Versions available to new clusters in this project.
* :ref:`atlas-api-projects-getProjectSettings` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns details about the specified project's settings.
* :ref:`atlas-api-projects-listProjectInvitations` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns all pending invitations to the specified project.
* :ref:`atlas-api-projects-listProjectLimits` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns all the limits for the specified project.
* :ref:`atlas-api-projects-listProjectUsers` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns details about all users in the specified project.
* :ref:`atlas-api-projects-listProjects` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns details about all projects.
* :ref:`atlas-api-projects-migrateProjectToAnotherOrg` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Migrates a project from its current organization to another organization.
* :ref:`atlas-api-projects-removeProjectUser` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Removes the specified user from the specified project.
* :ref:`atlas-api-projects-returnAllIpAddresses` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns all IP addresses for this project.
* :ref:`atlas-api-projects-setProjectLimit` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Sets the specified project limit.
* :ref:`atlas-api-projects-updateProject` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Updates the human-readable label that identifies the specified project, or the tags associated with the project.
* :ref:`atlas-api-projects-updateProjectInvitation` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Updates the details of one pending invitation to the specified project.
* :ref:`atlas-api-projects-updateProjectInvitationById` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Updates the details of one pending invitation to the specified project.
* :ref:`atlas-api-projects-updateProjectRoles` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Updates the roles of the specified user in the specified project.
* :ref:`atlas-api-projects-updateProjectSettings` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Updates the settings of the specified project.


.. toctree::
   :titlesonly:

   addUserToProject </command/atlas-api-projects-addUserToProject>
   createProject </command/atlas-api-projects-createProject>
   createProjectInvitation </command/atlas-api-projects-createProjectInvitation>
   deleteProject </command/atlas-api-projects-deleteProject>
   deleteProjectInvitation </command/atlas-api-projects-deleteProjectInvitation>
   deleteProjectLimit </command/atlas-api-projects-deleteProjectLimit>
   getProject </command/atlas-api-projects-getProject>
   getProjectByName </command/atlas-api-projects-getProjectByName>
   getProjectInvitation </command/atlas-api-projects-getProjectInvitation>
   getProjectLimit </command/atlas-api-projects-getProjectLimit>
   getProjectLtsVersions </command/atlas-api-projects-getProjectLtsVersions>
   getProjectSettings </command/atlas-api-projects-getProjectSettings>
   listProjectInvitations </command/atlas-api-projects-listProjectInvitations>
   listProjectLimits </command/atlas-api-projects-listProjectLimits>
   listProjectUsers </command/atlas-api-projects-listProjectUsers>
   listProjects </command/atlas-api-projects-listProjects>
   migrateProjectToAnotherOrg </command/atlas-api-projects-migrateProjectToAnotherOrg>
   removeProjectUser </command/atlas-api-projects-removeProjectUser>
   returnAllIpAddresses </command/atlas-api-projects-returnAllIpAddresses>
   setProjectLimit </command/atlas-api-projects-setProjectLimit>
   updateProject </command/atlas-api-projects-updateProject>
   updateProjectInvitation </command/atlas-api-projects-updateProjectInvitation>
   updateProjectInvitationById </command/atlas-api-projects-updateProjectInvitationById>
   updateProjectRoles </command/atlas-api-projects-updateProjectRoles>
   updateProjectSettings </command/atlas-api-projects-updateProjectSettings>

