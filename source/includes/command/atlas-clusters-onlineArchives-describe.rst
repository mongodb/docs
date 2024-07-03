.. _atlas-clusters-onlineArchives-describe:

======================================
atlas clusters onlineArchives describe
======================================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Return the details for the specified online archive for your cluster.

To use this command, you must authenticate with a user account or an API key with the Project Read Only role.

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas clusters onlineArchives describe <archiveId> [options]

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
   * - archiveId
     - string
     - true
     - Unique identifier of the online archive to retrieve.

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
   * - -h, --help
     - 
     - false
     - help for describe
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

   ID     CLUSTER         DATABASE   COLLECTION   STATE
   <Id>   <ClusterName>   <DbName>   <CollName>   <State>
   

Examples
--------

.. code-block::
   :copyable: false

   # Return the JSON-formatted details for the online archive with the ID 5f189832e26ec075e10c32d3 for the cluster named myCluster:
   atlas clusters onlineArchives describe 5f189832e26ec075e10c32d3 --clusterName myCluster --output json
