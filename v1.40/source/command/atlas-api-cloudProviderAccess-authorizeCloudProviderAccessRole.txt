.. _atlas-api-cloudProviderAccess-authorizeCloudProviderAccessRole:

==============================================================
atlas api cloudProviderAccess authorizeCloudProviderAccessRole
==============================================================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

`experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Grants access to the specified project for the specified access role.

To use this resource, the requesting API Key must have the Project Owner role. This API endpoint is one step in a procedure to create unified access for MongoDB Cloud services. This is not required for GCP service account access. This command is invoking the endpoint with OperationID: 'authorizeCloudProviderAccessRole'. For more information about flags, format of --file and examples, see: https://www.mongodb.com/docs/atlas/reference/api-resources-spec/v2/#tag/Cloud-Provider-Access/operation/authorizeCloudProviderAccessRole

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas api cloudProviderAccess authorizeCloudProviderAccessRole [options]

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
   * - --file
     - string
     - false
     - path to the file which contains the api request contents
   * - --groupId
     - string
     - true
     - unique 24-hexadecimal digit string that identifies your project
   * - -h, --help
     - 
     - false
     - help for authorizeCloudProviderAccessRole
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
   * - --roleId
     - string
     - true
     - unique 24-hexadecimal digit string that identifies the role
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

