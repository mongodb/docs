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

`experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns, adds, edits, and removes federation-related features such as role mappings and connected organization configurations.

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

* :ref:`atlas-api-federatedAuthentication-createIdentityProvider` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Creates one identity provider within the specified federation.
* :ref:`atlas-api-federatedAuthentication-createRoleMapping` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Adds one role mapping to the specified organization in the specified federation.
* :ref:`atlas-api-federatedAuthentication-deleteFederationApp` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Deletes the federation settings instance and all associated data, including identity providers and domains.
* :ref:`atlas-api-federatedAuthentication-deleteIdentityProvider` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Deletes one identity provider in the specified federation.
* :ref:`atlas-api-federatedAuthentication-deleteRoleMapping` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Removes one role mapping in the specified organization from the specified federation.
* :ref:`atlas-api-federatedAuthentication-getConnectedOrgConfig` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns the specified connected org config from the specified federation.
* :ref:`atlas-api-federatedAuthentication-getFederationSettings` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns information about the federation settings for the specified organization.
* :ref:`atlas-api-federatedAuthentication-getIdentityProvider` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns one identity provider in the specified federation by the identity provider's id.
* :ref:`atlas-api-federatedAuthentication-getIdentityProviderMetadata` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns the metadata of one identity provider in the specified federation.
* :ref:`atlas-api-federatedAuthentication-getRoleMapping` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns one role mapping from the specified organization in the specified federation.
* :ref:`atlas-api-federatedAuthentication-listConnectedOrgConfigs` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns all connected org configs in the specified federation.
* :ref:`atlas-api-federatedAuthentication-listIdentityProviders` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns all identity providers with the provided protocol and type in the specified federation.
* :ref:`atlas-api-federatedAuthentication-listRoleMappings` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns all role mappings from the specified organization in the specified federation.
* :ref:`atlas-api-federatedAuthentication-removeConnectedOrgConfig` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Removes one connected organization configuration from the specified federation.
* :ref:`atlas-api-federatedAuthentication-revokeJwksFromIdentityProvider` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Revokes the JWKS tokens from the requested OIDC identity provider.
* :ref:`atlas-api-federatedAuthentication-updateConnectedOrgConfig` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Updates one connected organization configuration from the specified federation.
* :ref:`atlas-api-federatedAuthentication-updateIdentityProvider` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Updates one identity provider in the specified federation.
* :ref:`atlas-api-federatedAuthentication-updateRoleMapping` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Updates one role mapping in the specified organization in the specified federation.


.. toctree::
   :titlesonly:

   createIdentityProvider </command/atlas-api-federatedAuthentication-createIdentityProvider>
   createRoleMapping </command/atlas-api-federatedAuthentication-createRoleMapping>
   deleteFederationApp </command/atlas-api-federatedAuthentication-deleteFederationApp>
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
   revokeJwksFromIdentityProvider </command/atlas-api-federatedAuthentication-revokeJwksFromIdentityProvider>
   updateConnectedOrgConfig </command/atlas-api-federatedAuthentication-updateConnectedOrgConfig>
   updateIdentityProvider </command/atlas-api-federatedAuthentication-updateIdentityProvider>
   updateRoleMapping </command/atlas-api-federatedAuthentication-updateRoleMapping>

