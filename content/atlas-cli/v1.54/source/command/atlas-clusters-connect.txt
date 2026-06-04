.. _atlas-clusters-connect:

======================
atlas clusters connect
======================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Connect to an Atlas cluster. If the cluster is paused, run atlas cluster start first.

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas clusters connect [clusterName] [options]

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
   * - clusterName
     - string
     - false
     - Name of the cluster that you want to connect to.

Options
-------

.. list-table::
   :header-rows: 1
   :widths: 20 10 10 60

   * - Name
     - Type
     - Required
     - Description
   * - --autoScalingMode
     - string
     - false
     - Mode in which the cluster scales. Valid values are clusterWideScaling or independentShardScaling.
   * - --connectWith
     - string
     - false
     - Method for connecting to the deployment. Valid values are compass, connectionString, mongosh, and vscode.
   * - --connectionStringType
     - string
     - false
     - Type of connection string. If you specify 'private', this option retrieves the connection string for the network peering endpoint. If you specify 'privateEndpoint', this option retrieves the shard optimized connection strings for the private endpoints. This value defaults to "standard".
   * - -h, --help
     -
     - false
     - help for connect
   * - -o, --output
     - string
     - false
     - Output format. Valid values are json, json-path, go-template, or go-template-file. To see the full output, use the -o json option.
   * - --password
     - string
     - false
     - Password for the user.
   * - --projectId
     - string
     - false
     - Hexadecimal string that identifies the project to use. This option overrides the settings in the configuration file or environment variable.
   * - --username
     - string
     - false
     - Username for authenticating to MongoDB.

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
