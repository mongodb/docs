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

`experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns, adds, edits, and removes access tokens to use the MongoDB Cloud API.

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

* :ref:`atlas-api-programmaticApiKeys-addProjectApiKey` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Assigns the specified organization API key to the specified project.
* :ref:`atlas-api-programmaticApiKeys-createApiKey` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Creates one API key for the specified organization.
* :ref:`atlas-api-programmaticApiKeys-createApiKeyAccessList` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Creates the access list entries for the specified organization API key.
* :ref:`atlas-api-programmaticApiKeys-createProjectApiKey` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Creates and assigns the specified organization API key to the specified project.
* :ref:`atlas-api-programmaticApiKeys-deleteApiKey` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Removes one organization API key from the specified organization.
* :ref:`atlas-api-programmaticApiKeys-deleteApiKeyAccessListEntry` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Removes the specified access list entry from the specified organization API key.
* :ref:`atlas-api-programmaticApiKeys-getApiKey` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns one organization API key.
* :ref:`atlas-api-programmaticApiKeys-getApiKeyAccessList` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns one access list entry for the specified organization API key.
* :ref:`atlas-api-programmaticApiKeys-listApiKeyAccessListsEntries` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns all access list entries that you configured for the specified organization API key.
* :ref:`atlas-api-programmaticApiKeys-listApiKeys` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns all organization API keys for the specified organization.
* :ref:`atlas-api-programmaticApiKeys-listProjectApiKeys` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns all organization API keys that you assigned to the specified project.
* :ref:`atlas-api-programmaticApiKeys-removeProjectApiKey` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Removes one organization API key from the specified project.
* :ref:`atlas-api-programmaticApiKeys-updateApiKey` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Updates one organization API key in the specified organization.
* :ref:`atlas-api-programmaticApiKeys-updateApiKeyRoles` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Updates the roles of the organization API key that you specify for the project that you specify.


.. toctree::
   :titlesonly:

   addProjectApiKey </command/atlas-api-programmaticApiKeys-addProjectApiKey>
   createApiKey </command/atlas-api-programmaticApiKeys-createApiKey>
   createApiKeyAccessList </command/atlas-api-programmaticApiKeys-createApiKeyAccessList>
   createProjectApiKey </command/atlas-api-programmaticApiKeys-createProjectApiKey>
   deleteApiKey </command/atlas-api-programmaticApiKeys-deleteApiKey>
   deleteApiKeyAccessListEntry </command/atlas-api-programmaticApiKeys-deleteApiKeyAccessListEntry>
   getApiKey </command/atlas-api-programmaticApiKeys-getApiKey>
   getApiKeyAccessList </command/atlas-api-programmaticApiKeys-getApiKeyAccessList>
   listApiKeyAccessListsEntries </command/atlas-api-programmaticApiKeys-listApiKeyAccessListsEntries>
   listApiKeys </command/atlas-api-programmaticApiKeys-listApiKeys>
   listProjectApiKeys </command/atlas-api-programmaticApiKeys-listProjectApiKeys>
   removeProjectApiKey </command/atlas-api-programmaticApiKeys-removeProjectApiKey>
   updateApiKey </command/atlas-api-programmaticApiKeys-updateApiKey>
   updateApiKeyRoles </command/atlas-api-programmaticApiKeys-updateApiKeyRoles>

