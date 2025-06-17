.. _atlas-streams-instances-update:

==============================
atlas streams instances update
==============================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Updates an Atlas Stream Processing instance for your project.

Before updating an Atlas Streams Processing instance, you must first stop all processes associated with it.
To use this command, you must authenticate with a user account or an API key with the Project Owner role.

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas streams instances update <name> [options]

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
   * - name
     - string
     - true
     - Name of the Atlas Stream Processing instance. After creation, you can't change the name of the instance. The name can contain ASCII letters, numbers, and hyphens.

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
     - help for update
   * - -o, --output
     - string
     - false
     - Output format. Valid values are json, json-path, go-template, or go-template-file. To see the full output, use the -o json option.
   * - --projectId
     - string
     - false
     - Hexadecimal string that identifies the project to use. This option overrides the settings in the configuration file or environment variable.
   * - --provider
     - string
     - true
     - Cloud service provider that applies to the provisioned Atlas Stream Processing instance. Valid values are AWS or AZURE. This value defaults to "AWS".
   * - -r, --region
     - string
     - true
     - Human-readable label that identifies the physical location of your Atlas Stream Processing instance. The region can affect network latency and performance if it is far from your source or sink. For AWS, region name must be in the following format: VIRGINIA_USA. For a list of valid values, see https://www.mongodb.com/docs/atlas/reference/amazon-aws/#std-label-aws-stream-processing-regions. For Azure, region name must be in the following format: eastus. For a list of valid values, see https://www.mongodb.com/docs/atlas/reference/microsoft-azure/#std-label-azure-stream-processing-regions.

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

   Atlas Streams Processor Instance '<Name>' successfully updated.
   

Examples
--------

.. code-block::
   :copyable: false

   # Modify the Atlas Stream Processing instance configuration with the name MyInstance:
   atlas streams instance update MyInstance --provider AWS --region VIRGINIA_USA
