.. _atlas-api-federatedAuthentication:

=================================
atlas api federatedAuthentication
=================================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Returns, adds, edits, and removes federation-related features such as role mappings and connected organization configurations.

The atlas api sub-command is automatically generated from the MongoDB Atlas Admin API and offers full coverage of the Admin API.
Admin API capabilities have their own release lifecycle, which you can check via the provided API endpoint documentation link.



Options
-------

.. list-table::
   :header-rows: 1
   :widths: 20 10 10 60

   * - Name
     - Type
     - Required
     - Description
   * - -h, --help
     -
     - false
     - help for federatedAuthentication

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

Related Commands
----------------

* :ref:`atlas-api-federatedAuthentication-createIdentityProvider` - Creates one identity provider within the specified federation.
* :ref:`atlas-api-federatedAuthentication-createRoleMapping` - Adds one role mapping to the specified organization in the specified federation.
* :ref:`atlas-api-federatedAuthentication-deleteFederationSetting` - Deletes the federation settings instance and all associated data, including identity providers and domains.
* :ref:`atlas-api-federatedAuthentication-deleteIdentityProvider` - Deletes one identity provider in the specified federation.
* :ref:`atlas-api-federatedAuthentication-deleteRoleMapping` - Removes one role mapping in the specified organization from the specified federation.
* :ref:`atlas-api-federatedAuthentication-getConnectedOrgConfig` - Returns the specified connected org config from the specified federation.
* :ref:`atlas-api-federatedAuthentication-getFederationSettings` - Returns information about the federation settings for the specified organization.
* :ref:`atlas-api-federatedAuthentication-getIdentityProvider` - Returns one identity provider in the specified federation by the identity provider's id.
* :ref:`atlas-api-federatedAuthentication-getIdentityProviderMetadata` - Returns the metadata of one identity provider in the specified federation.
* :ref:`atlas-api-federatedAuthentication-getRoleMapping` - Returns one role mapping from the specified organization in the specified federation.
* :ref:`atlas-api-federatedAuthentication-listConnectedOrgConfigs` - Returns all connected org configs in the specified federation.
* :ref:`atlas-api-federatedAuthentication-listIdentityProviders` - Returns all identity providers with the provided protocol and type in the specified federation.
* :ref:`atlas-api-federatedAuthentication-listRoleMappings` - Returns all role mappings from the specified organization in the specified federation.
* :ref:`atlas-api-federatedAuthentication-removeConnectedOrgConfig` - Removes one connected organization configuration from the specified federation.
* :ref:`atlas-api-federatedAuthentication-revokeIdentityProviderJwks` - Revokes the JWKS tokens from the requested OIDC identity provider.
* :ref:`atlas-api-federatedAuthentication-updateConnectedOrgConfig` - Updates one connected organization configuration from the specified federation.
* :ref:`atlas-api-federatedAuthentication-updateIdentityProvider` - Updates one identity provider in the specified federation.
* :ref:`atlas-api-federatedAuthentication-updateRoleMapping` - Updates one role mapping in the specified organization in the specified federation.


.. toctree::
   :titlesonly:

   createIdentityProvider </command/atlas-api-federatedAuthentication-createIdentityProvider>
   createRoleMapping </command/atlas-api-federatedAuthentication-createRoleMapping>
   deleteFederationSetting </command/atlas-api-federatedAuthentication-deleteFederationSetting>
   deleteIdentityProvider </command/atlas-api-federatedAuthentication-deleteIdentityProvider>
   deleteRoleMapping </command/atlas-api-federatedAuthentication-deleteRoleMapping>
   getConnectedOrgConfig </command/atlas-api-federatedAuthentication-getConnectedOrgConfig>
   getFederationSettings </command/atlas-api-federatedAuthentication-getFederationSettings>
   getIdentityProvider </command/atlas-api-federatedAuthentication-getIdentityProvider>
   getIdentityProviderMetadata </command/atlas-api-federatedAuthentication-getIdentityProviderMetadata>
   getRoleMapping </command/atlas-api-federatedAuthentication-getRoleMapping>
   listConnectedOrgConfigs </command/atlas-api-federatedAuthentication-listConnectedOrgConfigs>
   listIdentityProviders </command/atlas-api-federatedAuthentication-listIdentityProviders>
   listRoleMappings </command/atlas-api-federatedAuthentication-listRoleMappings>
   removeConnectedOrgConfig </command/atlas-api-federatedAuthentication-removeConnectedOrgConfig>
   revokeIdentityProviderJwks </command/atlas-api-federatedAuthentication-revokeIdentityProviderJwks>
   updateConnectedOrgConfig </command/atlas-api-federatedAuthentication-updateConnectedOrgConfig>
   updateIdentityProvider </command/atlas-api-federatedAuthentication-updateIdentityProvider>
   updateRoleMapping </command/atlas-api-federatedAuthentication-updateRoleMapping>
