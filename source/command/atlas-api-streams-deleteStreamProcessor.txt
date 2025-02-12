.. _atlas-api-streams-deleteStreamProcessor:

=======================================
atlas api streams deleteStreamProcessor
=======================================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

`experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Delete a Stream Processor within the specified stream instance.

To use this resource, the requesting API Key must have the Project Owner role or Project Stream Processing Owner role. This command is invoking the endpoint with OperationID: 'deleteStreamProcessor'. For more information about flags, format of --file and examples, see: https://www.mongodb.com/docs/atlas/reference/api-resources-spec/v2/#tag/Streams/operation/deleteStreamProcessor

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas api streams deleteStreamProcessor [options]

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
   * - --envelope
     - 
     - false
     - flag that indicates whether Application wraps the response in an envelope JSON object
   * - --groupId
     - string
     - true
     - unique 24-hexadecimal digit string that identifies your project
   * - -h, --help
     - 
     - false
     - help for deleteStreamProcessor
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
   * - --processorName
     - string
     - true
     - human-readable label that identifies the stream processor
   * - --tenantName
     - string
     - true
     - human-readable label that identifies the stream instance
   * - --version
     - string
     - false
     - api version to use when calling the api call [options: "2024-05-30"], defaults to the latest version or the profiles api_version config value if set This value defaults to "2024-05-30".

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

