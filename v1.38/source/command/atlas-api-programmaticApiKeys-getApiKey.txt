.. _atlas-api-programmaticApiKeys-getApiKey:

=======================================
atlas api programmaticApiKeys getApiKey
=======================================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

`experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns one organization API key.

The organization API keys grant programmatic access to an organization. You can't use the API key to log into MongoDB Cloud through the user interface. To use this resource, the requesting API Key must have the  Organization Member role. This command is invoking the endpoint with OperationID: 'getApiKey'. For more information about flags, format of --file and examples, see: https://www.mongodb.com/docs/atlas/reference/api-resources-spec/v2/#tag/Programmatic-API-Keys/operation/getApiKey

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas api programmaticApiKeys getApiKey [options]

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
   * - --apiUserId
     - string
     - true
     - unique 24-hexadecimal digit string that identifies this organization API key that  you want to update
   * - --envelope
     - 
     - false
     - flag that indicates whether Application wraps the response in an envelope JSON object
   * - -h, --help
     - 
     - false
     - help for getApiKey
   * - --orgId
     - string
     - true
     - unique 24-hexadecimal digit string that identifies the organization that contains your projects
   * - --output
     - string
     - false
     - preferred api format, can be ["json", go-template] This value defaults to "json".
   * - --output-file
     - string
     - false
     - file to write the api output to. This flag is required when the output of an endpoint is binary (ex: gzip) and the command is not piped (ex: atlas command > out.zip)
   * - --pretty
     - 
     - false
     - flag that indicates whether the response body should be in the prettyprint format
   * - --version
     - string
     - false
     - api version to use when calling the api call [options: "2023-01-01"], defaults to the latest version or the profiles api_version config value if set This value defaults to "2023-01-01".

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

