.. _atlas-dataLakePipelines-runs-watch:

==================================
atlas dataLakePipelines runs watch
==================================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Watch for the specified data lake pipeline run to complete.

To use this command, you must authenticate with a user account or an API key with the Project Owner role.

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas dataLakePipelines runs watch <pipelineName> [options]

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
   * - pipelineName
     - string
     - true
     - Label that identifies the pipeline

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
     - help for watch
   * - -o, --output
     - string
     - false
     - Output format. Valid values are json, json-path, go-template, or go-template-file. To see the full output, use the -o json option.
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

   data lake pipeline created
   

Examples
--------

.. code-block::
   :copyable: false

   # watches the pipeline 'Pipeline1':
   atlas dataLakePipelines watch Pipeline1

