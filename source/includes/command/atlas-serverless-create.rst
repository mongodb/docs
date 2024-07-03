.. _atlas-serverless-create:

=======================
atlas serverless create
=======================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Creates one serverless instance in the specified project.

To use this command, you must authenticate with a user account or an API key with the Project Owner role.

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas serverless create <instanceName> [options]

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
   * - instanceName
     - string
     - true
     - Human-readable label that identifies your serverless instance.

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
     - Cloud service provider that applies to the provisioned serverless instance.
   * - --region
     - string
     - true
     - Human-readable label that identifies the physical location of your MongoDB serverless instance. The region you choose can affect network latency for clients accessing your databases.
   * - --tag
     - key=value
     - false
     - List that contains key-value pairs between 1 to 255 characters in length for tagging and categorizing the serverless instance.

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

   Serverless instance <Name> created.
   

Examples
--------

.. code-block::
   :copyable: false

   # Deploy a serverlessIntance named myInstance for the project with the ID 5e2211c17a3e5a48f5497de3:
   atlas serverless create myInstance --provider AWS --region US_EAST_1 --projectId 5e2211c17a3e5a48f5497de3
