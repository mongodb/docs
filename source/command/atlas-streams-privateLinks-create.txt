.. _atlas-streams-privateLinks-create:

=================================
atlas streams privateLinks create
=================================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Creates a PrivateLink endpoint that can be used as an Atlas Stream Processor connection.

To use this command, you must authenticate with a user account or an API key with any of the following roles: Project Owner, Project Stream Processing Owner.

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas streams privateLinks create [options]

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
   * - -f, --file
     - string
     - true
     - Path to a JSON configuration file that defines an Atlas Stream Processing PrivateLink endpoint. Note: Unsupported fields in the JSON file are ignored.
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

   Atlas Stream Processing PrivateLink endpoint <InterfaceEndpointId> created.
   

Examples
--------

.. code-block::
   :copyable: false

   # create a new PrivateLink endpoint for Atlas Stream Processing:
   atlas streams privateLink create -f endpointConfig.json

