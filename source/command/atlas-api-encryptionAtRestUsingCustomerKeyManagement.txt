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

`experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns and edits the Encryption at Rest using Customer Key Management configuration.

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

* :ref:`atlas-api-encryptionAtRestUsingCustomerKeyManagement-createEncryptionAtRestPrivateEndpoint` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Creates a private endpoint in the specified region for encryption at rest using customer key management.
* :ref:`atlas-api-encryptionAtRestUsingCustomerKeyManagement-getEncryptionAtRest` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns the configuration for encryption at rest using the keys you manage through your cloud provider.
* :ref:`atlas-api-encryptionAtRestUsingCustomerKeyManagement-getEncryptionAtRestPrivateEndpoint` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns one private endpoint, identified by its ID, for encryption at rest using Customer Key Management.
* :ref:`atlas-api-encryptionAtRestUsingCustomerKeyManagement-getEncryptionAtRestPrivateEndpointsForCloudProvider` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns the private endpoints of the specified cloud provider for encryption at rest using customer key management.
* :ref:`atlas-api-encryptionAtRestUsingCustomerKeyManagement-requestEncryptionAtRestPrivateEndpointDeletion` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Deletes one private endpoint, identified by its ID, for encryption at rest using Customer Key Management.
* :ref:`atlas-api-encryptionAtRestUsingCustomerKeyManagement-updateEncryptionAtRest` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Updates the configuration for encryption at rest using the keys you manage through your cloud provider.


.. toctree::
   :titlesonly:

   createEncryptionAtRestPrivateEndpoint </command/atlas-api-encryptionAtRestUsingCustomerKeyManagement-createEncryptionAtRestPrivateEndpoint>
   getEncryptionAtRest </command/atlas-api-encryptionAtRestUsingCustomerKeyManagement-getEncryptionAtRest>
   getEncryptionAtRestPrivateEndpoint </command/atlas-api-encryptionAtRestUsingCustomerKeyManagement-getEncryptionAtRestPrivateEndpoint>
   getEncryptionAtRestPrivateEndpointsForCloudProvider </command/atlas-api-encryptionAtRestUsingCustomerKeyManagement-getEncryptionAtRestPrivateEndpointsForCloudProvider>
   requestEncryptionAtRestPrivateEndpointDeletion </command/atlas-api-encryptionAtRestUsingCustomerKeyManagement-requestEncryptionAtRestPrivateEndpointDeletion>
   updateEncryptionAtRest </command/atlas-api-encryptionAtRestUsingCustomerKeyManagement-updateEncryptionAtRest>

