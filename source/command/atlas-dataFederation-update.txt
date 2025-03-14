.. _atlas-dataFederation-update:

===========================
atlas dataFederation update
===========================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Modify the details of the specified data federation database for your project.

To use this command, you must authenticate with a user account or an API key with the Project Owner role.

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas dataFederation update <name> [options]

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
     - Name of the data federation database.

Options
-------

.. list-table::
   :header-rows: 1
   :widths: 20 10 10 60

   * - Name
     - Type
     - Required
     - Description
   * - --awsRoleId
     - string
     - false
     - Amazon Resource Name (ARN) of the role which Atlas Data Federation uses for accessing the data stores.

       Mutually exclusive with --file.
   * - --awsTestS3Bucket
     - string
     - false
     - Name of an Amazon S3 data bucket that Atlas Data Federation uses to validate the provided role.

       Mutually exclusive with --file.
   * - -f, --file
     - string
     - false
     - Path to an optional JSON configuration file that defines data federation settings. Note: Unsupported fields in the JSON file are ignored. To learn more about data federation configuration files for the Atlas CLI, see https://dochub.mongodb.org/core/atlas-cli-json-data-federation-config.

       Mutually exclusive with --region, --awsRoleId, --awsTestS3Bucket.
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
   * - --region
     - string
     - false
     - Name of the region to which Atlas Data Federation routes client connections for data processing.

       Mutually exclusive with --file.

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

   Pipeline <Name> updated.

Examples
--------

.. code-block::
   :copyable: false

   # update data lake pipeline:
   atlas dataFederation update DataFederation1

