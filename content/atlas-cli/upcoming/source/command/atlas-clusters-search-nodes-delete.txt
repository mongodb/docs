.. _atlas-clusters-search-nodes-delete:

==================================
atlas clusters search nodes delete
==================================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Delete a search node for a cluster.

To use this command, you must authenticate with a user account, a service account, or an API key with the Organization Owner or Project Owner role.

.. warning:: Deleting Search Indexes and Clusters Is Irreversible

   Deleting Search indexes and associated clusters is a permanent
   action. MongoDB doesn't provide support for recovering deleted Search
   indexes or data. Ensure that you have taken appropriate measures,
   such as creating backups, to avoid data loss before proceeding.

   MongoDB doesn't support requests to recover deleted Search indexes or
   data. You are responsible for data integrity and configurations.

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas clusters search nodes delete [options]

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
   * - --clusterName
     - string
     - true
     - Name of the cluster. To learn more, see https://dochub.mongodb.org/core/create-cluster-api.
   * - --force
     -
     - false
     - Flag that indicates whether to skip the confirmation prompt before proceeding with the requested action.
   * - -h, --help
     -
     - false
     - help for delete
   * - -o, --output
     - string
     - false
     - Output format. Valid values are json, json-path, go-template, or go-template-file. To see the full output, use the -o json option.
   * - --projectId
     - string
     - false
     - Hexadecimal string that identifies the project to use. This option overrides the settings in the configuration file or environment variable.
   * - -w, --watch
     -
     - false
     - Flag that indicates whether to watch the command until it completes its execution or the watch times out.
   * - --watchTimeout
     - int
     - false
     - Time in seconds until a watch times out. After a watch times out, the CLI no longer watches the command.

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

   # Delete a search node for the cluster named myCluster:
   atlas clusters search nodes delete --clusterName myCluster
