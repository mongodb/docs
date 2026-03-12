.. _atlas-local-delete:

==================
atlas local delete
==================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Delete a deployment.

The command prompts you to confirm the operation when you run the command without the --force option.

Deleting a Local deployment also deletes any local data volumes. Deleting a deployment will not remove saved connections from MongoDB for VS Code. This must be done manually. To learn more, see https://www.mongodb.com/docs/mongodb-vscode/connect/#remove-a-connection.

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas local delete <deployment_name> [options]

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
   * - deployment_name
     - string
     - true
     - Name of the deployment to delete

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
     - help for delete
   * - --force
     - 
     - false
     - Flag that indicates whether to skip the confirmation prompt before proceeding with the requested action

Inherited Options
-----------------

.. list-table::
   :header-rows: 1
   :widths: 20 10 10 60

   * - Name
     - Type
     - Required
     - Description
   * - -o, --output
     - string
     - false
     - Output format
   * - -P, --profile
     - string
     - false
     - Name of the profile to use from your configuration file. To learn about profiles for the Atlas CLI, see https://dochub.mongodb.org/core/atlas-cli-save-connection-settings

