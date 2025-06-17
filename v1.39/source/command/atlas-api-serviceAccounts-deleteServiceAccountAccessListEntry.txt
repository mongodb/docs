.. _atlas-api-serviceAccounts-deleteServiceAccountAccessListEntry:

=============================================================
atlas api serviceAccounts deleteServiceAccountAccessListEntry
=============================================================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

`experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Removes the specified access list entry from the specified Service Account for the organization.

You can't remove the requesting IP address from the access list. Available as a preview feature. This command is invoking the endpoint with OperationID: 'deleteServiceAccountAccessListEntry'. For more information about flags, format of --file and examples, see: https://www.mongodb.com/docs/atlas/reference/api-resources-spec/v2/#tag/Service-Accounts/operation/deleteServiceAccountAccessListEntry

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas api serviceAccounts deleteServiceAccountAccessListEntry [options]

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
   * - --clientId
     - string
     - true
     - the Client ID of the Service Account
   * - --envelope
     - 
     - false
     - flag that indicates whether Application wraps the response in an envelope JSON object
   * - -h, --help
     - 
     - false
     - help for deleteServiceAccountAccessListEntry
   * - --ipAddress
     - string
     - true
     - one IP address or multiple IP addresses represented as one CIDR block
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
     - api version to use when calling the api call [options: "2024-08-05"], defaults to the latest version or the profiles api_version config value if set This value defaults to "2024-08-05".

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

