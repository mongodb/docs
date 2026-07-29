.. _atlas-clusters-search-indexes-delete:

====================================
atlas clusters search indexes delete
====================================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Delete the specified search index from the specified cluster.

To use this command, you must authenticate with a user account, a service account, or an API key with the Project Data Access Admin role.

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

   atlas clusters search indexes delete <indexId> [options]

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
   * - indexId
     - string
     - true
     - ID of the index.

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

   Index '<Name>' deleted


Examples
--------

.. code-block::
   :copyable: false

   # Delete the search index with the ID 5f2099cd683fc55fbb30bef6 for the cluster named myCluster without requiring confirmation:
   atlas clusters search indexes delete 5f2099cd683fc55fbb30bef6 --clusterName myCluster --force
