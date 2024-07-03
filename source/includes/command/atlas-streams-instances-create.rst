.. _atlas-streams-instances-create:

==============================
atlas streams instances create
==============================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Create an Atlas Stream Processing instance for your project

To get started quickly, specify a name, a cloud provider, and a region to configure an Atlas Stream Processing instance.To use this command, you must authenticate with a user account or an API key with the Project Owner role.

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas streams instances create <name> [options]

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
     - help for create
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
     - Cloud service provider that applies to the provisioned Atlas Stream Processing instance. This value defaults to "AWS".
   * - -r, --region
     - string
     - true
     - Human-readable label that identifies the physical location of your Atlas Stream Processing instance. The region can affect network latency and performance if it is far from your source or sink.
   * - --tier
     - string
     - false
     - Tier for your Stream Instance. This value defaults to "SP30".

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

   Atlas Streams Processor Instance '<Name>' successfully created.
   

Examples
--------

.. code-block::
   :copyable: false

   # Deploy an Atlas Stream Processing instance called myProcessor for the project with the ID 5e2211c17a3e5a48f5497de3:
   atlas streams instance create myProcessor --projectId 5e2211c17a3e5a48f5497de3 --provider AWS --region VIRGINIA_USA --tier SP30
