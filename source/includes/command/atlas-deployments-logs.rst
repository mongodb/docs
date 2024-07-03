.. _atlas-deployments-logs:

======================
atlas deployments logs
======================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Get deployment logs.

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas deployments logs [options]

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
   * - --deploymentName
     - string
     - false
     - Name of the deployment.
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
     - help for logs
   * - --hostname
     - string
     - false
     - Name of the host that stores the log files that you want to download.
   * - --name
     - string
     - false
     - Name of the log file (e.g. mongodb.gz|mongos.gz|mongosqld.gz|mongodb-audit-log.gz|mongos-audit-log.gz).
   * - -o, --output
     - string
     - false
     - Output format. Valid values are json, json-path, go-template, or go-template-file. To see the full output, use the -o json option.
   * - --projectId
     - string
     - false
     - Hexadecimal string that identifies the project to use. This option overrides the settings in the configuration file or environment variable.
   * - --start
     - int
     - false
     - UNIX Epoch-formatted starting date and time for the range of log messages to retrieve. This value defaults to 24 hours prior to the current timestamp.
   * - --type
     - string
     - false
     - Type of deployment. Valid values are ATLAS or LOCAL.

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

