.. _atlas-api-mongoDbCloudUsers:

===========================
atlas api mongoDbCloudUsers
===========================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Returns, adds, and edits MongoDB Cloud users.

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
     - help for mongoDbCloudUsers

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

* :ref:`atlas-api-mongoDbCloudUsers-addGroupUserRole` - Adds one project-level role to the MongoDB Cloud user.
* :ref:`atlas-api-mongoDbCloudUsers-addGroupUsers` - Adds one MongoDB Cloud user to one project.
* :ref:`atlas-api-mongoDbCloudUsers-addOrgRole` - Adds one organization-level role to the MongoDB Cloud user.
* :ref:`atlas-api-mongoDbCloudUsers-addOrgTeamUser` - Adds one MongoDB Cloud user to one team.
* :ref:`atlas-api-mongoDbCloudUsers-createOrgUser` - Invites one new or existing MongoDB Cloud user to join the organization.
* :ref:`atlas-api-mongoDbCloudUsers-createUser` - Creates one MongoDB Cloud user account.
* :ref:`atlas-api-mongoDbCloudUsers-getGroupUser` - Returns information about the specified MongoDB Cloud user within the context of the specified project.
* :ref:`atlas-api-mongoDbCloudUsers-getOrgUser` - Returns information about the specified MongoDB Cloud user within the context of the specified organization.
* :ref:`atlas-api-mongoDbCloudUsers-getUser` - Returns the details for one MongoDB Cloud user account with the specified unique identifier for the user.
* :ref:`atlas-api-mongoDbCloudUsers-getUserByName` - Returns the details for one MongoDB Cloud user account with the specified username.
* :ref:`atlas-api-mongoDbCloudUsers-listGroupUsers` - Returns details about the pending and active MongoDB Cloud users associated with the specified project.
* :ref:`atlas-api-mongoDbCloudUsers-listOrgUsers` - Returns details about the pending and active MongoDB Cloud users associated with the specified organization.
* :ref:`atlas-api-mongoDbCloudUsers-listTeamUsers` - Returns details about the pending and active MongoDB Cloud users associated with the specified team in the organization.
* :ref:`atlas-api-mongoDbCloudUsers-removeGroupUser` - Removes one MongoDB Cloud user from the specified project.
* :ref:`atlas-api-mongoDbCloudUsers-removeGroupUserRole` - Removes one project-level role from the MongoDB Cloud user.
* :ref:`atlas-api-mongoDbCloudUsers-removeOrgRole` - Removes one organization-level role from the MongoDB Cloud user.
* :ref:`atlas-api-mongoDbCloudUsers-removeOrgTeamUser` - Removes one MongoDB Cloud user from one team.
* :ref:`atlas-api-mongoDbCloudUsers-removeOrgUser` - Removes one MongoDB Cloud user in the specified organization.
* :ref:`atlas-api-mongoDbCloudUsers-updateOrgUser` - Updates one MongoDB Cloud user in the specified organization.


.. toctree::
   :titlesonly:

   addGroupUserRole </command/atlas-api-mongoDbCloudUsers-addGroupUserRole>
   addGroupUsers </command/atlas-api-mongoDbCloudUsers-addGroupUsers>
   addOrgRole </command/atlas-api-mongoDbCloudUsers-addOrgRole>
   addOrgTeamUser </command/atlas-api-mongoDbCloudUsers-addOrgTeamUser>
   createOrgUser </command/atlas-api-mongoDbCloudUsers-createOrgUser>
   createUser </command/atlas-api-mongoDbCloudUsers-createUser>
   getGroupUser </command/atlas-api-mongoDbCloudUsers-getGroupUser>
   getOrgUser </command/atlas-api-mongoDbCloudUsers-getOrgUser>
   getUser </command/atlas-api-mongoDbCloudUsers-getUser>
   getUserByName </command/atlas-api-mongoDbCloudUsers-getUserByName>
   listGroupUsers </command/atlas-api-mongoDbCloudUsers-listGroupUsers>
   listOrgUsers </command/atlas-api-mongoDbCloudUsers-listOrgUsers>
   listTeamUsers </command/atlas-api-mongoDbCloudUsers-listTeamUsers>
   removeGroupUser </command/atlas-api-mongoDbCloudUsers-removeGroupUser>
   removeGroupUserRole </command/atlas-api-mongoDbCloudUsers-removeGroupUserRole>
   removeOrgRole </command/atlas-api-mongoDbCloudUsers-removeOrgRole>
   removeOrgTeamUser </command/atlas-api-mongoDbCloudUsers-removeOrgTeamUser>
   removeOrgUser </command/atlas-api-mongoDbCloudUsers-removeOrgUser>
   updateOrgUser </command/atlas-api-mongoDbCloudUsers-updateOrgUser>
