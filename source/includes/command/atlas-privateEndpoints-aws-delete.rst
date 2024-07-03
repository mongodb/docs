.. _atlas-privateEndpoints-aws-delete:

=================================
atlas privateEndpoints aws delete
=================================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Remove the specified AWS private endpoint from your project.

To use this command, you must authenticate with a user account or an API key with the Project Owner role.

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas privateEndpoints aws delete <privateEndpointId> [options]

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
   * - privateEndpointId
     - string
     - true
     - Unique 24-character alphanumeric string that identifies the private endpoint in Atlas.

Options
-------

.. list-table::
   :header-rows: 1
   :widths: 20 10 10 60

   * - Name
     - Type
     - Required
     - Description
   * - --force
     - 
     - false
     - Flag that indicates whether to skip the confirmation prompt before proceeding with the requested action.
   * - -h, --help
     - 
     - false
     - help for delete
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

   Private endpoint '<Name>' deleted
   

Examples
--------

.. code-block::
   :copyable: false

   # Remove the AWS private endpoint with the ID 5f4fc14da2b47835a58c63a2 from the project with the ID 5e2211c17a3e5a48f5497de3:
   atlas privateEndpoints aws delete 5f4fc14da2b47835a58c63a2 --projectId 5e2211c17a3e5a48f5497de3
