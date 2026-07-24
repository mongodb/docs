.. _atlas-api-programmaticApiKeys:

=============================
atlas api programmaticApiKeys
=============================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Returns, adds, edits, and removes access tokens to use the MongoDB Cloud API.

The atlas api sub-command is automatically generated from the MongoDB Atlas Admin API and offers full coverage of the Admin API.
Admin API capabilities have their own release lifecycle, which you can check via the provided API endpoint documentation link.

MongoDB Cloud applies these keys to organizations. These resources can return, assign, or revoke use of these keys within a specified project.

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
     - help for programmaticApiKeys

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

* :ref:`atlas-api-programmaticApiKeys-addGroupApiKey` - Assigns the specified organization API key to the specified project.
* :ref:`atlas-api-programmaticApiKeys-createGroupApiKey` - Creates and assigns the specified organization API key to the specified project.
* :ref:`atlas-api-programmaticApiKeys-createOrgAccessEntry` - Creates the access list entries for the specified organization API key.
* :ref:`atlas-api-programmaticApiKeys-createOrgApiKey` - Creates one API key for the specified organization.
* :ref:`atlas-api-programmaticApiKeys-deleteAccessEntry` - Removes the specified access list entry from the specified organization API key.
* :ref:`atlas-api-programmaticApiKeys-deleteOrgApiKey` - Removes one organization API key from the specified organization.
* :ref:`atlas-api-programmaticApiKeys-getOrgAccessEntry` - Returns one access list entry for the specified organization API key.
* :ref:`atlas-api-programmaticApiKeys-getOrgApiKey` - Returns one organization API key.
* :ref:`atlas-api-programmaticApiKeys-listGroupApiKeys` - Returns all organization API keys that you assigned to the specified project.
* :ref:`atlas-api-programmaticApiKeys-listOrgAccessEntries` - Returns all access list entries that you configured for the specified organization API key.
* :ref:`atlas-api-programmaticApiKeys-listOrgApiKeys` - Returns all organization API keys for the specified organization.
* :ref:`atlas-api-programmaticApiKeys-removeGroupApiKey` - Removes one organization API key from the specified project.
* :ref:`atlas-api-programmaticApiKeys-updateApiKeyRoles` - Updates the roles of the organization API key that you specify for the project that you specify.
* :ref:`atlas-api-programmaticApiKeys-updateOrgApiKey` - Updates one organization API key in the specified organization.


.. toctree::
   :titlesonly:

   addGroupApiKey </command/atlas-api-programmaticApiKeys-addGroupApiKey>
   createGroupApiKey </command/atlas-api-programmaticApiKeys-createGroupApiKey>
   createOrgAccessEntry </command/atlas-api-programmaticApiKeys-createOrgAccessEntry>
   createOrgApiKey </command/atlas-api-programmaticApiKeys-createOrgApiKey>
   deleteAccessEntry </command/atlas-api-programmaticApiKeys-deleteAccessEntry>
   deleteOrgApiKey </command/atlas-api-programmaticApiKeys-deleteOrgApiKey>
   getOrgAccessEntry </command/atlas-api-programmaticApiKeys-getOrgAccessEntry>
   getOrgApiKey </command/atlas-api-programmaticApiKeys-getOrgApiKey>
   listGroupApiKeys </command/atlas-api-programmaticApiKeys-listGroupApiKeys>
   listOrgAccessEntries </command/atlas-api-programmaticApiKeys-listOrgAccessEntries>
   listOrgApiKeys </command/atlas-api-programmaticApiKeys-listOrgApiKeys>
   removeGroupApiKey </command/atlas-api-programmaticApiKeys-removeGroupApiKey>
   updateApiKeyRoles </command/atlas-api-programmaticApiKeys-updateApiKeyRoles>
   updateOrgApiKey </command/atlas-api-programmaticApiKeys-updateOrgApiKey>
