.. _atlas-api-encryptionAtRestUsingCustomerKeyManagement:

====================================================
atlas api encryptionAtRestUsingCustomerKeyManagement
====================================================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Returns and edits the Encryption at Rest using Customer Key Management configuration.

The atlas api sub-command is automatically generated from the MongoDB Atlas Admin API and offers full coverage of the Admin API.
Admin API capabilities have their own release lifecycle, which you can check via the provided API endpoint documentation link.

MongoDB Cloud encrypts all storage whether or not you use your own key management.

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
     - help for encryptionAtRestUsingCustomerKeyManagement

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

* :ref:`atlas-api-encryptionAtRestUsingCustomerKeyManagement-createRestPrivateEndpoint` - Creates a private endpoint in the specified region for encryption at rest using customer key management.
* :ref:`atlas-api-encryptionAtRestUsingCustomerKeyManagement-getEncryptionAtRest` - Returns the configuration for encryption at rest using the keys you manage through your cloud provider.
* :ref:`atlas-api-encryptionAtRestUsingCustomerKeyManagement-getRestPrivateEndpoint` - Returns one private endpoint, identified by its ID, for encryption at rest using Customer Key Management.
* :ref:`atlas-api-encryptionAtRestUsingCustomerKeyManagement-listRestPrivateEndpoints` - Returns the private endpoints of the specified cloud provider for encryption at rest using customer key management.
* :ref:`atlas-api-encryptionAtRestUsingCustomerKeyManagement-requestPrivateEndpointDeletion` - Deletes one private endpoint, identified by its ID, for encryption at rest using Customer Key Management.
* :ref:`atlas-api-encryptionAtRestUsingCustomerKeyManagement-updateEncryptionAtRest` - Updates the configuration for encryption at rest using the keys you manage through your cloud provider.


.. toctree::
   :titlesonly:

   createRestPrivateEndpoint </command/atlas-api-encryptionAtRestUsingCustomerKeyManagement-createRestPrivateEndpoint>
   getEncryptionAtRest </command/atlas-api-encryptionAtRestUsingCustomerKeyManagement-getEncryptionAtRest>
   getRestPrivateEndpoint </command/atlas-api-encryptionAtRestUsingCustomerKeyManagement-getRestPrivateEndpoint>
   listRestPrivateEndpoints </command/atlas-api-encryptionAtRestUsingCustomerKeyManagement-listRestPrivateEndpoints>
   requestPrivateEndpointDeletion </command/atlas-api-encryptionAtRestUsingCustomerKeyManagement-requestPrivateEndpointDeletion>
   updateEncryptionAtRest </command/atlas-api-encryptionAtRestUsingCustomerKeyManagement-updateEncryptionAtRest>
