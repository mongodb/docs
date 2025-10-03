.. _atlas-federatedAuthentication-federationSettings-identityProvider:

=================================================================
atlas federatedAuthentication federationSettings identityProvider
=================================================================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Manage Federated Authentication Identity Providers.

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
     - help for identityProvider

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

* :ref:`atlas-federatedAuthentication-federationSettings-identityProvider-create` - Create Federated Authentication Identity Providers.
* :ref:`atlas-federatedAuthentication-federationSettings-identityProvider-delete` - Remove the specified identity provider from your federation settings.
* :ref:`atlas-federatedAuthentication-federationSettings-identityProvider-describe` - Describe the specified identity provider from your federation settings.
* :ref:`atlas-federatedAuthentication-federationSettings-identityProvider-list` - List the identity providers from your federation settings.
* :ref:`atlas-federatedAuthentication-federationSettings-identityProvider-revokeJwk` - Revoke the JWK token from the specified identity provider from your federation settings.
* :ref:`atlas-federatedAuthentication-federationSettings-identityProvider-update` - Update Federated Authentication Identity Providers.


.. toctree::
   :titlesonly:

   create </command/atlas-federatedAuthentication-federationSettings-identityProvider-create>
   delete </command/atlas-federatedAuthentication-federationSettings-identityProvider-delete>
   describe </command/atlas-federatedAuthentication-federationSettings-identityProvider-describe>
   list </command/atlas-federatedAuthentication-federationSettings-identityProvider-list>
   revokeJwk </command/atlas-federatedAuthentication-federationSettings-identityProvider-revokeJwk>
   update </command/atlas-federatedAuthentication-federationSettings-identityProvider-update>

