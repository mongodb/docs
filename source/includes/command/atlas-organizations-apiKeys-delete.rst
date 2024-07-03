.. _atlas-organizations-apiKeys-delete:

==================================
atlas organizations apiKeys delete
==================================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Remove the specified API key for your organization.

To view possible values for the ID argument, run atlas organizations apiKeys list.

To use this command, you must authenticate with a user account or an API key with the Organization User Admin role.

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas organizations apiKeys delete <ID> [options]

.. Code end marker, please don't delete this comment

Arguments
---------

.. list-table::
   :header-rows: 1
   :widths: 20 10 10 60

   * - Name
     - Type
     - Required
     - Description
   * - ID
     - string
     - true
     - Unique 24-digit string that identifies the organization's API key.

Options
-------

.. list-table::
   :header-rows: 1
   :widths: 20 10 10 60

   * - Name
     - Type
     - Required
     - Description
   * - --force
     - 
     - false
     - Flag that indicates whether to skip the confirmation prompt before proceeding with the requested action.
   * - -h, --help
     - 
     - false
     - help for delete
   * - --orgId
     - string
     - false
     - Organization ID to use. This option overrides the settings in the configuration file or environment variable.

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

Output
------

If the command succeeds, the CLI returns output similar to the following sample. Values in brackets represent your values.

.. code-block::

   API Key '<Name>' deleted
   

Examples
--------

.. code-block::
   :copyable: false

   # Remove the organization API key with the ID 5f24084d8dbffa3ad3f21234 for the organization with the ID 5a1b39eec902201990f12345:
   atlas organizations apiKeys delete 5f24084d8dbffa3ad3f21234 --orgId 5a1b39eec902201990f12345
