.. _atlas-streams-privateLinks-delete:

=================================
atlas streams privateLinks delete
=================================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Deletes an Atlas Stream Processing PrivateLink endpoint.

To use this command, you must authenticate with a user account or an API key with any of the following roles: Project Owner, Project Stream Processing Owner.

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas streams privateLinks delete <connectionID> [options]

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
   * - connectionID
     - string
     - true
     - ID of the PrivateLink endpoint.

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

   Atlas Stream Processing PrivateLink endpoint '<Name>' deleted.
   

Examples
--------

.. code-block::
   :copyable: false

   # delete an Atlas Stream Processing PrivateLink endpoint:
   atlas streams privateLink delete 5e2211c17a3e5a48f5497de3

