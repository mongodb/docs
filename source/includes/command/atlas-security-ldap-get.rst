.. _atlas-security-ldap-get:

=======================
atlas security ldap get
=======================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Return the current LDAP configuration details for your project.

To use this command, you must authenticate with a user account or an API key with the Project Owner role.

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas security ldap get [options]

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
   * - -h, --help
     - 
     - false
     - help for get
   * - -o, --output
     - string
     - false
     - Output format. Valid values are json, json-path, go-template, or go-template-file. To see the full output, use the -o json option.
   * - --projectId
     - string
     - false
     - Hexadecimal string that identifies the project to use. This option overrides the settings in the configuration file or environment variable.

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

   HOSTNAME          PORT          AUTHENTICATION                 AUTHORIZATION
   <Ldap.Hostname>   <Ldap.Port>   <Ldap.AuthenticationEnabled>   <Ldap.AuthorizationEnabled>
   

Examples
--------

.. code-block::
   :copyable: false

   # Return the JSON-formatted details of the current LDAP configuration in the project with the ID 5e2211c17a3e5a48f5497de3:
   atlas security ldap get --projectId 5e2211c17a3e5a48f5497de3 --output json
