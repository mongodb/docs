.. _atlas-federatedAuthentication-federationSettings-identityProvider-create-oidc:

=============================================================================
atlas federatedAuthentication federationSettings identityProvider create oidc
=============================================================================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Create an OIDC identity provider.

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas federatedAuthentication federationSettings identityProvider create oidc [displayName] [options]

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
   * - displayName
     - string
     - false
     - The Identity Provider display name.

Options
-------

.. list-table::
   :header-rows: 1
   :widths: 20 10 10 60

   * - Name
     - Type
     - Required
     - Description
   * - --associatedDomain
     - strings
     - false
     - List of domains associated with the Identity Provider.
   * - --audience
     - string
     - true
     - Identifier of the intended recipient of the token.
   * - --authorizationType
     - string
     - true
     - Type of authorization. Valid values are NONE, JWT, or SAML.
   * - --clientId
     - string
     - false
     - Client identifier that is assigned to an application by the Identity Provider.	
   * - --desc
     - string
     - true
     - Description of the Identity Provider.
   * - --federationSettingsId
     - string
     - true
     - Unique 24-hexadecimal digit string that identifies the federation settings.
   * - --groupsClaim
     - string
     - true
     - Identifier of the claim which contains IdP Group IDs in the token.
   * - -h, --help
     - 
     - false
     - help for oidc
   * - --idpType
     - string
     - true
     - Type of Identity Provider. Valid values are WORKFORCE or WORKLOAD.
   * - --issuerUri
     - string
     - true
     - Unique string that identifies the issuer of the OIDC metadata/discovery document URL.
   * - -o, --output
     - string
     - false
     - Output format. Valid values are json, json-path, go-template, or go-template-file. To see the full output, use the -o json option.
   * - --requestedScope
     - strings
     - false
     - Scopes that MongoDB applications will request from the authorization endpoint.	
   * - --userClaim
     - string
     - true
     - Identifier of the claim which contains the user ID in the token.

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

   Identity provider '<Id>' created.
   

Examples
--------

.. code-block::
   :copyable: false

   # Create an identity provider with name IDPName and from your federation settings with federationSettingsId 5d1113b25a115342acc2d1aa.
 		atlas federatedAuthentication federationSettings identityProvider create oidc IDPName --audience "audience" --authorizationType "GROUP" --clientId clientId --desc "IDPName test" --federationSettingsId "5d1113b25a115342acc2d1aa" --groupsClaim "groups" --idpType "WORKLOAD" --issuerUri uri" --userClaim "user"  --associatedDomain "domain"
 	
