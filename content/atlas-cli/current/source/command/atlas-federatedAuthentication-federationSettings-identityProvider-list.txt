.. _atlas-federatedAuthentication-federationSettings-identityProvider-list:

======================================================================
atlas federatedAuthentication federationSettings identityProvider list
======================================================================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

List the identity providers from your federation settings.

To use this command, you must authenticate with a user account or an API key with the Org Owner role.

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas federatedAuthentication federationSettings identityProvider list [options]

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
   * - --federationSettingsId
     - string
     - true
     - Unique 24-hexadecimal digit string that identifies the federation settings.
   * - -h, --help
     - 
     - false
     - help for list
   * - --idpType
     - string
     - false
     - Type of Identity Provider. Valid values are WORKFORCE or WORKLOAD. This value defaults to "WORKFORCE".
   * - --limit
     - int
     - false
     - Number of items per results page, up to a maximum of 500. If you have more than 500 results, specify the --page option to change the results page. This value defaults to 100.
   * - -o, --output
     - string
     - false
     - Output format. Valid values are json, json-path, go-template, or go-template-file. To see the full output, use the -o json option.
   * - --page
     - int
     - false
     - Page number that specifies a page of results. This value defaults to 1.
   * - --protocol
     - string
     - false
     - Protocol used to authenticate the user. Valid value is OIDC or SAML. This value defaults to "OIDC".

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

   ID     DISPLAY NAME    ISSUER URI    CLIENT ID    IDP TYPE
   <Id>   <DisplayName>   <IssuerUri>   <ClientId>   <IdpType>
   

Examples
--------

.. code-block::
   :copyable: false

   # List the identity providers from your federation settings with federationSettingsId 5d1113b25a115342acc2d1aa and idpType WORKLOAD
 	atlas federatedAuthentication federationSettings identityProvider list --federationSettingsId 5d1113b25a115342acc2d1aa --idpType WORKLOAD

