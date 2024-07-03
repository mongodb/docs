.. _atlas-logs-download:

===================
atlas logs download
===================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Download a compressed file that contains the MongoDB logs for the specified host.

This command downloads a file with a .gz extension.

To find the hostnames for an Atlas project, use the process list command.

To use this command, you must authenticate with a user account or an API key with the Project Data Access Read/Write role.

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas logs download <hostname> <mongodb.gz|mongos.gz|mongosqld.gz|mongodb-audit-log.gz|mongos-audit-log.gz> [options]

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
   * - hostname
     - string
     - true
     - Label that identifies the host that stores the log files that you want to download.
   * - mongodb.gz|mongos.gz|mongosqld.gz|mongodb-audit-log.gz|mongos-audit-log.gz
     - string
     - true
     - Log file that you want to return.

Options
-------

.. list-table::
   :header-rows: 1
   :widths: 20 10 10 60

   * - Name
     - Type
     - Required
     - Description
   * - -d, --decompress
     - 
     - false
     - Flag that indicates whether to decompress the log files.
   * - --end
     - int
     - false
     - UNIX Epoch-formatted ending date and time for the range of log messages to retrieve. This value defaults to the current timestamp.
   * - --force
     - 
     - false
     - Flag that indicates whether to overwrite the destination file.
   * - -h, --help
     - 
     - false
     - help for download
   * - --out
     - string
     - false
     - Output file name. This value defaults to the log name.
   * - --projectId
     - string
     - false
     - Hexadecimal string that identifies the project to use. This option overrides the settings in the configuration file or environment variable.
   * - --start
     - int
     - false
     - UNIX Epoch-formatted starting date and time for the range of log messages to retrieve. This value defaults to 24 hours prior to the current timestamp.

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

   Download of <Name> completed.
   

Examples
--------

.. code-block::
   :copyable: false

   # Download the mongodb log file from the host atlas-123abc-shard-00-00.111xx.mongodb.net for the project with the ID 5e2211c17a3e5a48f5497de3:
   atlas logs download  atlas-123abc-shard-00-00.111xx.mongodb.net mongodb.gz --projectId 5e2211c17a3e5a48f5497de3
