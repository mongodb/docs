.. _atlas-users-describe:

====================
atlas users describe
====================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Return the details for the specified Atlas user.

You can specify either the unique 24-digit ID that identifies the Atlas user or the username for the Atlas user.
		
User accounts and API keys with any role can run this command.

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas users describe [options]

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
     - help for describe
   * - --id
     - string
     - false
     - Unique 24-digit identifier of the user.

       Mutually exclusive with --username.
   * - -o, --output
     - string
     - false
     - Output format. Valid values are json, json-path, go-template, or go-template-file. To see the full output, use the -o json option.
   * - --username
     - string
     - false
     - Name that identifies the user. You must specify a valid email address.

       Mutually exclusive with --id.

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

   ID     FIRST NAME    LAST NAME    USERNAME     EMAIL
   <Id>   <FirstName>   <LastName>   <Username>   <EmailAddress>
   

Examples
--------

.. code-block::
   :copyable: false

   # Return the JSON-formatted details for the Atlas user with the ID 5dd56c847a3e5a1f363d424d:
   atlas users describe --id 5dd56c847a3e5a1f363d424d --output json
   
   
.. code-block::
   :copyable: false

   # Return the JSON-formatted details for the Atlas user with the username myUser:
   atlas users describe --username myUser --output json
