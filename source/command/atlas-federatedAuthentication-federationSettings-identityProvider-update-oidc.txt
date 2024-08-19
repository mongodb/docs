.. _atlas-federatedAuthentication-federationSettings-identityProvider-update-oidc:

=============================================================================
atlas federatedAuthentication federationSettings identityProvider update oidc
=============================================================================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Update an OIDC identity provider.

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas federatedAuthentication federationSettings identityProvider update oidc [identityProviderId] [options]

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
   * - identityProviderId
     - string
     - false
     - The Identity Provider ID.

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
     - false
     - Identifier of the intended recipient of the token.
   * - --authorizationType
     - string
     - false
     - Type of authorization. Valid values are NONE, JWT, or SAML.
   * - --clientId
     - string
     - false
     - Client identifier that is assigned to an application by the Identity Provider.	
   * - --desc
     - string
     - false
     - Description of the Identity Provider.
   * - --federationSettingsId
     - string
     - true
     - Unique 24-hexadecimal digit string that identifies the federation settings.
   * - --groupsClaim
     - string
     - false
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
     - false
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
     - false
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

   Identity provider '<Id>' updated.
   

Examples
--------

.. code-block::
   :copyable: false

   # Update the audience of the identity provider with ID aa2223b25a115342acc1f108 and from your federation settings with federationSettingsId 5d1113b25a115342acc2d1aa with IdpType WORKFORCE
 			atlas federatedAuthentication federationSettings identityProvider update aa2223b25a115342acc1f108 --federationSettingsId 5d1113b25a115342acc2d1aa --idpType WORKFORCE --audience newAudience
 		
