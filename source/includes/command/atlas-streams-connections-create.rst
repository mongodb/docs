.. _atlas-streams-connections-create:

================================
atlas streams connections create
================================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Creates a connection for an Atlas Stream Processing instance.

To use this command, you must authenticate with a user account or an API key with the Project Owner role.

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas streams connections create [connectionName] [options]

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
   * - connectionName
     - string
     - false
     - Name of the connection

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
     - Path to a JSON configuration file that defines an Atlas Stream Processing connection.
   * - -h, --help
     - 
     - false
     - help for create
   * - -i, --instance
     - string
     - true
     - Name of your Atlas Stream Processing instance.
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

   Connection <Name> created.
   

Examples
--------

.. code-block::
   :copyable: false

   # create a new connection for Atlas Stream Processing:
   atlas streams connection create kafkaprod -i test01 -f kafkaConfig.json


.. code-block::
   :copyable: false

   # create a new connection using the name from a cluster configuration file
   atlas streams connection create -i test01 -f clusterConfig.json

