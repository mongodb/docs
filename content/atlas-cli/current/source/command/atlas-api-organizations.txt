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

Returns, adds, and edits organizational units in MongoDB Cloud.

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

* :ref:`atlas-api-organizations-createOrg` - Creates one organization in MongoDB Cloud and links it to the requesting Service Account's or API Key's organization.
* :ref:`atlas-api-organizations-createOrgInvite` - Invites one MongoDB Cloud user to join the specified organization.
* :ref:`atlas-api-organizations-deleteOrg` - Removes one specified organization.
* :ref:`atlas-api-organizations-deleteOrgInvite` - Cancels one pending invitation sent to the specified MongoDB Cloud user to join an organization.
* :ref:`atlas-api-organizations-getOrg` - Returns one organization to which the requesting Service Account or API Key has access.
* :ref:`atlas-api-organizations-getOrgGroups` - Returns multiple projects in the specified organization.
* :ref:`atlas-api-organizations-getOrgInvite` - Returns the details of one pending invitation to the specified organization.
* :ref:`atlas-api-organizations-getOrgSettings` - Returns details about the specified organization's settings.
* :ref:`atlas-api-organizations-listOrgInvites` - Returns all pending invitations to the specified organization.
* :ref:`atlas-api-organizations-listOrgs` - Returns all organizations to which the requesting Service Account or API Key has access.
* :ref:`atlas-api-organizations-updateOrg` - Updates one organization.
* :ref:`atlas-api-organizations-updateOrgInviteById` - Updates the details of one pending invitation, identified by its unique ID, to the specified organization.
* :ref:`atlas-api-organizations-updateOrgInvites` - Updates the details of one pending invitation, identified by the username of the invited user, to the specified organization.
* :ref:`atlas-api-organizations-updateOrgSettings` - Updates the organization's settings.
* :ref:`atlas-api-organizations-updateOrgUserRoles` - Updates the roles of the specified user in the specified organization.


.. toctree::
   :titlesonly:

   createOrg </command/atlas-api-organizations-createOrg>
   createOrgInvite </command/atlas-api-organizations-createOrgInvite>
   deleteOrg </command/atlas-api-organizations-deleteOrg>
   deleteOrgInvite </command/atlas-api-organizations-deleteOrgInvite>
   getOrg </command/atlas-api-organizations-getOrg>
   getOrgGroups </command/atlas-api-organizations-getOrgGroups>
   getOrgInvite </command/atlas-api-organizations-getOrgInvite>
   getOrgSettings </command/atlas-api-organizations-getOrgSettings>
   listOrgInvites </command/atlas-api-organizations-listOrgInvites>
   listOrgs </command/atlas-api-organizations-listOrgs>
   updateOrg </command/atlas-api-organizations-updateOrg>
   updateOrgInviteById </command/atlas-api-organizations-updateOrgInviteById>
   updateOrgInvites </command/atlas-api-organizations-updateOrgInvites>
   updateOrgSettings </command/atlas-api-organizations-updateOrgSettings>
   updateOrgUserRoles </command/atlas-api-organizations-updateOrgUserRoles>
