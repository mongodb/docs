.. _atlas-dataLakePipelines-create:

==============================
atlas dataLakePipelines create
==============================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Creates a new Data Lake Pipeline.

To use this command, you must authenticate with a user account or an API key with the Project Owner role.

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas dataLakePipelines create <pipelineName> [options]

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
   * - pipelineName
     - string
     - true
     - Label that identifies the pipeline

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
     - false
     - Name of the JSON data lake pipeline configuration file to use.

       Mutually exclusive with --sinkType, --sinkMetadataProvider, --sinkMetadataRegion, --sinkPartitionField, --sourceType, --sourceClusterName, --sourceCollectionName, --sourceDatabaseName, --sourcePolicyItemId, --transform.
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
   * - --sinkMetadataProvider
     - string
     - false
     - Target cloud provider for this data lake pipeline.

       Mutually exclusive with --file.
   * - --sinkMetadataRegion
     - string
     - false
     - Target cloud provider region for this data lake pipeline.

       Mutually exclusive with --file.
   * - --sinkPartitionField
     - strings
     - false
     - Ordered fields used to physically organize data in the destination.

       Mutually exclusive with --file.
   * - --sinkType
     - string
     - false
     - Type of ingestion destination for this data lake pipeline.

       Mutually exclusive with --file.
   * - --sourceClusterName
     - string
     - false
     - Human-readable label that identifies the source cluster.

       Mutually exclusive with --file.
   * - --sourceCollectionName
     - string
     - false
     - Human-readable label that identifies the source collection.

       Mutually exclusive with --file.
   * - --sourceDatabaseName
     - string
     - false
     - Human-readable label that identifies the source database.

       Mutually exclusive with --file.
   * - --sourcePolicyItemId
     - string
     - false
     - Human-readable label that identifies the policy item.

       Mutually exclusive with --file.
   * - --sourceType
     - string
     - false
     - Type of ingestion source for this data lake pipeline.

       Mutually exclusive with --file.
   * - --transform
     - strings
     - false
     - Fields to exclude for this data lake pipeline.

       Mutually exclusive with --file.

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

   # create data lake pipeline:
   atlas dataLakePipelines create Pipeline1 --sinkType CPS --sinkMetadataProvider AWS --sinkMetadataRegion us-east-1 --sinkPartitionField name:0,summary:1 --sourceType PERIODIC_CPS --sourceClusterName Cluster1 --sourceDatabaseName sample_airbnb --sourceCollectionName listingsAndReviews --sourcePolicyItemId 507f1f77bcf86cd799439011 --transform EXCLUDE:space,EXCLUDE:notes
