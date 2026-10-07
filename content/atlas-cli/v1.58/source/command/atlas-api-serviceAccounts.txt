.. _atlas-api-serviceAccounts:

=========================
atlas api serviceAccounts
=========================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Endpoints for managing Service Accounts and secrets.

The atlas api sub-command is automatically generated from the MongoDB Atlas Admin API and offers full coverage of the Admin API.
Admin API capabilities have their own release lifecycle, which you can check via the provided API endpoint documentation link.

Service Accounts are used for programmatic access to the Atlas Admin API through the OAuth 2.0 Client Credentials flow.

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
     - help for serviceAccounts

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

* :ref:`atlas-api-serviceAccounts-createAccessList` - Add Access List Entries for the specified Service Account for the project.
* :ref:`atlas-api-serviceAccounts-createGroupSecret` - Create a secret for the specified Service Account in the specified Project.
* :ref:`atlas-api-serviceAccounts-createGroupServiceAccount` - Creates one Service Account for the specified Project.
* :ref:`atlas-api-serviceAccounts-createOrgAccessList` - Add Access List Entries for the specified Service Account for the organization.
* :ref:`atlas-api-serviceAccounts-createOrgSecret` - Create a secret for the specified Service Account.
* :ref:`atlas-api-serviceAccounts-createOrgServiceAccount` - Creates one Service Account for the specified Organization.
* :ref:`atlas-api-serviceAccounts-deleteGroupAccessEntry` - Removes the specified access list entry from the specified Service Account for the project.
* :ref:`atlas-api-serviceAccounts-deleteGroupSecret` - Deletes the specified Service Account secret.
* :ref:`atlas-api-serviceAccounts-deleteGroupServiceAccount` - Removes the specified Service Account from the specified project.
* :ref:`atlas-api-serviceAccounts-deleteOrgAccessEntry` - Removes the specified access list entry from the specified Service Account for the organization.
* :ref:`atlas-api-serviceAccounts-deleteOrgSecret` - Deletes the specified Service Account secret.
* :ref:`atlas-api-serviceAccounts-deleteOrgServiceAccount` - Deletes the specified Service Account.
* :ref:`atlas-api-serviceAccounts-getGroupServiceAccount` - Returns one Service Account in the specified Project.
* :ref:`atlas-api-serviceAccounts-getOrgServiceAccount` - Returns the specified Service Account.
* :ref:`atlas-api-serviceAccounts-getServiceAccountGroups` - Returns a list of all projects the specified Service Account is a part of.
* :ref:`atlas-api-serviceAccounts-inviteGroupServiceAccount` - Assigns the specified Service Account to the specified Project.
* :ref:`atlas-api-serviceAccounts-listAccessList` - Returns all access list entries that you configured for the specified Service Account for the project.
* :ref:`atlas-api-serviceAccounts-listGroupServiceAccounts` - Returns all Service Accounts for the specified Project.
* :ref:`atlas-api-serviceAccounts-listOrgAccessList` - Returns all access list entries that you configured for the specified Service Account for the organization.
* :ref:`atlas-api-serviceAccounts-listOrgServiceAccounts` - Returns all Service Accounts for the specified Organization.
* :ref:`atlas-api-serviceAccounts-updateGroupServiceAccount` - Updates one Service Account in the specified Project.
* :ref:`atlas-api-serviceAccounts-updateOrgServiceAccount` - Updates the specified Service Account in the specified Organization.


.. toctree::
   :titlesonly:

   createAccessList </command/atlas-api-serviceAccounts-createAccessList>
   createGroupSecret </command/atlas-api-serviceAccounts-createGroupSecret>
   createGroupServiceAccount </command/atlas-api-serviceAccounts-createGroupServiceAccount>
   createOrgAccessList </command/atlas-api-serviceAccounts-createOrgAccessList>
   createOrgSecret </command/atlas-api-serviceAccounts-createOrgSecret>
   createOrgServiceAccount </command/atlas-api-serviceAccounts-createOrgServiceAccount>
   deleteGroupAccessEntry </command/atlas-api-serviceAccounts-deleteGroupAccessEntry>
   deleteGroupSecret </command/atlas-api-serviceAccounts-deleteGroupSecret>
   deleteGroupServiceAccount </command/atlas-api-serviceAccounts-deleteGroupServiceAccount>
   deleteOrgAccessEntry </command/atlas-api-serviceAccounts-deleteOrgAccessEntry>
   deleteOrgSecret </command/atlas-api-serviceAccounts-deleteOrgSecret>
   deleteOrgServiceAccount </command/atlas-api-serviceAccounts-deleteOrgServiceAccount>
   getGroupServiceAccount </command/atlas-api-serviceAccounts-getGroupServiceAccount>
   getOrgServiceAccount </command/atlas-api-serviceAccounts-getOrgServiceAccount>
   getServiceAccountGroups </command/atlas-api-serviceAccounts-getServiceAccountGroups>
   inviteGroupServiceAccount </command/atlas-api-serviceAccounts-inviteGroupServiceAccount>
   listAccessList </command/atlas-api-serviceAccounts-listAccessList>
   listGroupServiceAccounts </command/atlas-api-serviceAccounts-listGroupServiceAccounts>
   listOrgAccessList </command/atlas-api-serviceAccounts-listOrgAccessList>
   listOrgServiceAccounts </command/atlas-api-serviceAccounts-listOrgServiceAccounts>
   updateGroupServiceAccount </command/atlas-api-serviceAccounts-updateGroupServiceAccount>
   updateOrgServiceAccount </command/atlas-api-serviceAccounts-updateOrgServiceAccount>
