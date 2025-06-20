.. _atlas-api-federatedAuthentication-updateConnectedOrgConfig:

==========================================================
atlas api federatedAuthentication updateConnectedOrgConfig
==========================================================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

`experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Updates one connected organization configuration from the specified federation.

To use this resource, the requesting API Key must have the Organization Owner role. Note If the organization configuration has no associated identity provider, you can't use this resource to update role mappings or post authorization role grants. Note: The domainRestrictionEnabled field defaults to false if not provided in the request. Note: If the identityProviderId field is not provided, you will disconnect the organization and the identity provider. Note: Currently connected data access identity providers missing from the dataAccessIdentityProviderIds field will be disconnected. This command is invoking the endpoint with OperationID: 'updateConnectedOrgConfig'. For more information about flags, format of --file and examples, see: https://www.mongodb.com/docs/atlas/reference/api-resources-spec/v2/#tag/Federated-Authentication/operation/updateConnectedOrgConfig

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas api federatedAuthentication updateConnectedOrgConfig [options]

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
   * - --federationSettingsId
     - string
     - true
     - unique 24-hexadecimal digit string that identifies your federation
   * - --file
     - string
     - false
     - path to the file which contains the api request contents
   * - -h, --help
     - 
     - false
     - help for updateConnectedOrgConfig
   * - --orgId
     - string
     - true
     - unique 24-hexadecimal digit string that identifies the connected organization configuration to update
   * - --output
     - string
     - false
     - preferred api format, can be ["json", go-template] This value defaults to "json".
   * - --output-file
     - string
     - false
     - file to write the api output to. This flag is required when the output of an endpoint is binary (ex: gzip) and the command is not piped (ex: atlas command > out.zip)
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

