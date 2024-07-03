.. _atlas-dbusers-create:

====================
atlas dbusers create
====================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Create a database user for your project.

If you set --ldapType, --x509Type, --oidcType and --awsIAMType to NONE, Atlas authenticates this user through SCRAM-SHA. To learn more, see https://www.mongodb.com/docs/manual/core/security-scram/.

To use this command, you must authenticate with a user account or an API key with the Project Owner role.

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas dbusers create [builtInRole]... [options]

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
   * - builtInRole
     - string
     - false
     - Atlas built-in role that you want to assign to the user.

Options
-------

.. list-table::
   :header-rows: 1
   :widths: 20 10 10 60

   * - Name
     - Type
     - Required
     - Description
   * - --awsIAMType
     - string
     - false
     - AWS IAM method by which the provided username is authenticated. Valid values are NONE, USER, or ROLE. If you set this to USER or ROLE, the user authenticates with IAM credentials and doesn't need a password.

       Mutually exclusive with --ldapType, --x509Type, --oidcType. This value defaults to "NONE".
   * - --deleteAfter
     - string
     - false
     - Timestamp in ISO 8601 in UTC after which Atlas deletes the user.
   * - -h, --help
     - 
     - false
     - help for create
   * - --ldapType
     - string
     - false
     - LDAP method by which the provided username is authenticated. Valid values are NONE, USER, or GROUP. If you set this to USER or GROUP, the user authenticates with LDAP.

       Mutually exclusive with --awsIAMType, --x509Type, --oidcType. This value defaults to "NONE".
   * - --oidcType
     - string
     - false
     - OIDC method by which the provided database user is authenticated. Valid values are NONE, USER, or IDP_GROUP. If you set this to USER or GROUP_ID, the user authenticates with OIDC.

       Mutually exclusive with --awsIAMType, --ldapType, --x509Type, --password. This value defaults to "NONE".
   * - -o, --output
     - string
     - false
     - Output format. Valid values are json, json-path, go-template, or go-template-file. To see the full output, use the -o json option.
   * - -p, --password
     - string
     - false
     - Password for the database user.

       Mutually exclusive with --oidcType.
   * - --projectId
     - string
     - false
     - Hexadecimal string that identifies the project to use. This option overrides the settings in the configuration file or environment variable.
   * - --role
     - strings
     - false
     - Comma-separated list that specifies the user's roles and the databases or collections on which the roles apply.
       The roles format is roleName[@dbName[.collection]].
       roleName can either be a built-in role or a custom role.
       dbName and collection are required only for built-in roles.
   * - --scope
     - strings
     - false
     - Array of clusters and Atlas Data Lakes that this user has access to.
   * - -u, --username
     - string
     - true
     - Username for authenticating to MongoDB.
   * - --x509Type
     - string
     - false
     - X.509 method for authenticating the specified username. Valid values include NONE, MANAGED, and CUSTOMER. If you set this to MANAGED the user authenticates with an Atlas-managed X.509 certificate. If you set this to CUSTOMER, the user authenticates with a self-managed X.509 certificate.

       Mutually exclusive with --awsIAMType, --ldapType, --oidcType. This value defaults to "NONE".

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

   Database user '<Username>' successfully created.
   

Examples
--------

.. code-block::
   :copyable: false

   # Create an Atlas database admin user named myAdmin for the project with ID 5e2211c17a3e5a48f5497de3:
   atlas dbusers create atlasAdmin --username myAdmin  --projectId 5e2211c17a3e5a48f5497de3

   
.. code-block::
   :copyable: false

   # Create a database user named myUser with read/write access to any database for the project with ID 5e2211c17a3e5a48f5497de3:
   atlas dbusers create readWriteAnyDatabase --username myUser --projectId 5e2211c17a3e5a48f5497de3

   
.. code-block::
   :copyable: false

   # Create a database user named myUser with multiple roles for the project with ID 5e2211c17a3e5a48f5497de3:
   atlas dbusers create --username myUser --role clusterMonitor,backup --projectId 5e2211c17a3e5a48f5497de3

   
.. code-block::
   :copyable: false

   # Create a database user named myUser with multiple scopes for the project with ID 5e2211c17a3e5a48f5497de3:
   atlas dbusers create --username myUser --role clusterMonitor --scope <REPLICA-SET ID>,<storeName> --projectId 5e2211c17a3e5a48f5497de3
