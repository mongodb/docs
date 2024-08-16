.. _atlas-dataLakePipelines-datasets-delete:

=======================================
atlas dataLakePipelines datasets delete
=======================================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Remove the specified data lake pipeline dataset from your project.

To use this command, you must authenticate with a user account or an API key with the Project Owner role.

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas dataLakePipelines datasets delete <pipelineRunId> [options]

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
   * - pipelineRunId
     - string
     - true
     - Unique identifier for the data lake pipeline run

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
   * - --pipeline
     - string
     - true
     - Name of the Data lake pipeline.
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

   '<Name>' deleted
   

Examples
--------

.. code-block::
   :copyable: false

   # delete dataset '507f1f77bcf86cd799439011' for data lake pipeline called 'Pipeline1':
   atlas dataLakePipelines datasets delete 507f1f77bcf86cd799439011 --pipeline Pipeline1

