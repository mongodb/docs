.. _atlas-api-organizations:

=======================
atlas api organizations
=======================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

`experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns, adds, and edits organizational units in MongoDB Cloud.

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
     - help for organizations

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

* :ref:`atlas-api-organizations-createOrganization` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Creates one organization in MongoDB Cloud and links it to the requesting API Key's organization.
* :ref:`atlas-api-organizations-createOrganizationInvitation` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Invites one MongoDB Cloud user to join the specified organization.
* :ref:`atlas-api-organizations-deleteOrganization` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Removes one specified organization.
* :ref:`atlas-api-organizations-deleteOrganizationInvitation` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Cancels one pending invitation sent to the specified MongoDB Cloud user to join an organization.
* :ref:`atlas-api-organizations-getOrganization` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns one organization to which the requesting API key has access.
* :ref:`atlas-api-organizations-getOrganizationInvitation` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns the details of one pending invitation to the specified organization.
* :ref:`atlas-api-organizations-getOrganizationSettings` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns details about the specified organization's settings.
* :ref:`atlas-api-organizations-listOrganizationInvitations` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns all pending invitations to the specified organization.
* :ref:`atlas-api-organizations-listOrganizationProjects` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns multiple projects in the specified organization.
* :ref:`atlas-api-organizations-listOrganizationUsers` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns details about the MongoDB Cloud users associated with the specified organization.
* :ref:`atlas-api-organizations-listOrganizations` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns all organizations to which the requesting API Key has access.
* :ref:`atlas-api-organizations-removeOrganizationUser` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Removes one MongoDB Cloud user from the specified organization.
* :ref:`atlas-api-organizations-updateOrganization` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Updates one organization.
* :ref:`atlas-api-organizations-updateOrganizationInvitation` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Updates the details of one pending invitation, identified by the username of the invited user, to the specified organization.
* :ref:`atlas-api-organizations-updateOrganizationInvitationById` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Updates the details of one pending invitation, identified by its unique ID, to the specified organization.
* :ref:`atlas-api-organizations-updateOrganizationRoles` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Updates the roles of the specified user in the specified organization.
* :ref:`atlas-api-organizations-updateOrganizationSettings` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Updates the organization's settings.


.. toctree::
   :titlesonly:

   createOrganization </command/atlas-api-organizations-createOrganization>
   createOrganizationInvitation </command/atlas-api-organizations-createOrganizationInvitation>
   deleteOrganization </command/atlas-api-organizations-deleteOrganization>
   deleteOrganizationInvitation </command/atlas-api-organizations-deleteOrganizationInvitation>
   getOrganization </command/atlas-api-organizations-getOrganization>
   getOrganizationInvitation </command/atlas-api-organizations-getOrganizationInvitation>
   getOrganizationSettings </command/atlas-api-organizations-getOrganizationSettings>
   listOrganizationInvitations </command/atlas-api-organizations-listOrganizationInvitations>
   listOrganizationProjects </command/atlas-api-organizations-listOrganizationProjects>
   listOrganizationUsers </command/atlas-api-organizations-listOrganizationUsers>
   listOrganizations </command/atlas-api-organizations-listOrganizations>
   removeOrganizationUser </command/atlas-api-organizations-removeOrganizationUser>
   updateOrganization </command/atlas-api-organizations-updateOrganization>
   updateOrganizationInvitation </command/atlas-api-organizations-updateOrganizationInvitation>
   updateOrganizationInvitationById </command/atlas-api-organizations-updateOrganizationInvitationById>
   updateOrganizationRoles </command/atlas-api-organizations-updateOrganizationRoles>
   updateOrganizationSettings </command/atlas-api-organizations-updateOrganizationSettings>

