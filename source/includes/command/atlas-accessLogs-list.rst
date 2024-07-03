.. _atlas-accessLogs-list:

=====================
atlas accessLogs list
=====================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Retrieve the access logs of a cluster identified by the cluster's name or hostname.

To use this command, you must authenticate with a user account or an API key with the Project Monitoring Admin role.

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas accessLogs list [options]

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
   * - --authResult
     - string
     - false
     - Authentication attempts that Atlas should return. When set to success, Atlas filters the log to return only successful authentication attempts. When set to fail, Atlas filters the log to return only failed authentication attempts.
   * - --clusterName
     - string
     - false
     - Name of the cluster. To learn more, see https://dochub.mongodb.org/core/create-cluster-api.
   * - --end
     - string
     - false
     - Timestamp in the number of milliseconds that have elapsed, since the UNIX Epoch, for the last entry that Atlas returns from the database access logs.
   * - -h, --help
     - 
     - false
     - help for list
   * - --hostname
     - string
     - false
     - The fully qualified domain name (FQDN) of the target node that should receive the authentication attempt.
   * - --ip
     - string
     - false
     - IP address that attempted to authenticate with the database. Atlas filters the returned logs to include documents with only this IP address.
   * - --nLog
     - int
     - false
     - Maximum number of log lines to return.
   * - -o, --output
     - string
     - false
     - Output format. Valid values are json, json-path, go-template, or go-template-file. To see the full output, use the -o json option.
   * - --projectId
     - string
     - false
     - Hexadecimal string that identifies the project to use. This option overrides the settings in the configuration file or environment variable.
   * - --start
     - string
     - false
     - Timestamp in the number of milliseconds that have elapsed, since the UNIX Epoch, for the first entry that Atlas returns from the database access logs.

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

Examples
--------

.. code-block::
   :copyable: false

   # Return a JSON-formatted list of all authentication requests made against the cluster named Cluster0 for the project with ID 618d48e05277a606ed2496fe:		
   atlas accesslogs list --output json --projectId 618d48e05277a606ed2496fe --clusterName Cluster0
