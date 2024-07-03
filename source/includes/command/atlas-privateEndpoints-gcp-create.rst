.. _atlas-privateEndpoints-gcp-create:

=================================
atlas privateEndpoints gcp create
=================================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Create a new GCP private endpoint for your project.

To use this command, you must authenticate with a user account or an API key with the Project Owner role.

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas privateEndpoints gcp create [options]

.. Code end marker, please don't delete this comment

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
   * - --region
     - string
     - true
     - Cloud provider region in which you want to create the private endpoint connection. For a complete list of supported AWS regions, see: https://dochub.mongodb.org/core/aws-atlas. For a complete list of supported Azure regions, see: https://dochub.mongodb.org/core/azure-atlas. For a complete list of supported GCP regions, see: https://dochub.mongodb.org/core/gcp-atlas.

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

   Private endpoint '<Id>' created.
   

Examples
--------

.. code-block::
   :copyable: false

   atlas privateEndpoints gcp create --region CENTRAL_US
