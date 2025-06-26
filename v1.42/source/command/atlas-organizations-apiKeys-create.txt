.. _atlas-organizations-apiKeys-create:

==================================
atlas organizations apiKeys create
==================================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Create an API Key for your organization.

MongoDB returns the private API key only once. After you run this command, immediately copy, save, and secure both the public and private API keys.

To use this command, you must authenticate with a user account or an API key with the Organization User Admin role.

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas organizations apiKeys create [options]

.. Code end marker, please don't delete this comment

Options
-------

.. list-table::
   :header-rows: 1
   :widths: 20 10 10 60

   * - Name
     - Type
     - Required
     - Description
   * - --desc
     - string
     - true
     - Description of the API key.
   * - -h, --help
     - 
     - false
     - help for create
   * - --orgId
     - string
     - false
     - Organization ID to use. This option overrides the settings in the configuration file or environment variable.
   * - -o, --output
     - string
     - false
     - Output format. Valid values are json, json-path, go-template, or go-template-file. To see the full output, use the -o json option.
   * - --role
     - strings
     - true
     - Role or roles that you want to assign to the API key. To assign more than one role, specify each role with a separate role flag or specify all of the roles as a comma-separated list using one role flag. For the full list of accepted values, see the Items Enum for the corresponding Atlas API endpoint: https://www.mongodb.com/docs/atlas/reference/api-resources-spec/v2/#tag/Programmatic-API-Keys/operation/createApiKey. To learn more about organization level user roles, see: https://dochub.mongodb.org/core/atlas-org-roles.

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

   API Key '<Id>' created.
   Public API Key <PublicKey>
   Private API Key <PrivateKey>
   

Examples
--------

.. code-block::
   :copyable: false

   # Create an organization API key with organization owner access in the organization with the ID 5a1b39eec902201990f12345:
   atlas organizations apiKeys create --role ORG_OWNER --desc "My API Key" --orgId 5a1b39eec902201990f12345 --output json
