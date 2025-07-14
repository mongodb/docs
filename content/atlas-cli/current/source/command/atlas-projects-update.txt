.. _atlas-projects-update:

=====================
atlas projects update
=====================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Update a project.

To use this command, you must authenticate with a user account or an API key with the Project Owner role.

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas projects update <ID> [options]

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
   * - ID
     - string
     - true
     - ID of the project you want to update.

Options
-------

.. list-table::
   :header-rows: 1
   :widths: 20 10 10 60

   * - Name
     - Type
     - Required
     - Description
   * - -f, --file
     - string
     - true
     - Path to the JSON configuration file that defines project configuration settings. Note: Unsupported fields in the JSON file are ignored. To learn more about project configuration files for the Atlas CLI, see https://dochub.mongodb.org/core/project-config-file.
   * - -h, --help
     - 
     - false
     - help for update
   * - -o, --output
     - string
     - false
     - Output format. Valid values are json, json-path, go-template, or go-template-file. To see the full output, use the -o json option.

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

   Project '<Id>' updated.
   

Examples
--------

.. code-block::
   :copyable: false

   # Update a project with the ID 5e2211c17a3e5a48f5497de3 using the JSON file named myProject.json:
   atlas projects update 5f4007f327a3bd7b6f4103c5 --file myProject.json --output json
