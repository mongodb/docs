.. _atlas-api-x509Authentication:

============================
atlas api x509Authentication
============================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

`experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns, edits, and removes user-managed X.509 configurations.

Also returns and generates MongoDB Cloud-managed X.509 certificates for database users. The following resources help manage database users who authenticate using X.509 certificates. You can manage these X.509 certificates or let MongoDB Cloud do it for you. If MongoDB Cloud manages your certificates, it also manages your Certificate Authority and can generate certificates for your database users. No additional X.509 configuration is required. If you manage your certificates, you must provide a Certificate Authority and generate certificates for your database users.

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
     - help for x509Authentication

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

* :ref:`atlas-api-x509Authentication-createDatabaseUserCertificate` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Generates one X.509 certificate for the specified MongoDB user.
* :ref:`atlas-api-x509Authentication-disableCustomerManagedX509` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Clears the customer-managed X.509 settings on a project, including the uploaded Certificate Authority, which disables self-managed X.509.
* :ref:`atlas-api-x509Authentication-listDatabaseUserCertificates` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns all unexpired X.509 certificates for the specified MongoDB user.


.. toctree::
   :titlesonly:

   createDatabaseUserCertificate </command/atlas-api-x509Authentication-createDatabaseUserCertificate>
   disableCustomerManagedX509 </command/atlas-api-x509Authentication-disableCustomerManagedX509>
   listDatabaseUserCertificates </command/atlas-api-x509Authentication-listDatabaseUserCertificates>

