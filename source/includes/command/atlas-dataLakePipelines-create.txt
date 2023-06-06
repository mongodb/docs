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

To use this command, you must authenticate with a user account or an API key that has the Project Owner role.

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
   * - -h, --help
     - 
     - false
     - help for create
   * - -o, --output
     - string
     - false
     - Output format. Valid values are json, json-path, go-template, or go-template-file.
   * - --projectId
     - string
     - false
     - Hexadecimal string that identifies the project to use. This option overrides the settings in the configuration file or environment variable.
   * - --sinkMetadataProvider
     - string
     - false
     - Target cloud provider for this data lake pipeline.
   * - --sinkMetadataRegion
     - string
     - false
     - Target cloud provider region for this data lake pipeline.
   * - --sinkPartitionField
     - strings
     - false
     - Ordered fields used to physically organize data in the destination.
   * - --sinkType
     - string
     - false
     - Type of ingestion destination for this data lake pipeline.
   * - --sourceClusterName
     - string
     - false
     - Human-readable label that identifies the source cluster.
   * - --sourceCollectionName
     - string
     - false
     - Human-readable label that identifies the source collection.
   * - --sourceDatabaseName
     - string
     - false
     - Human-readable label that identifies the source database.
   * - --sourcePolicyItemId
     - string
     - false
     - Human-readable label that identifies the policy item.
   * - --sourceType
     - string
     - false
     - Type of ingestion source for this data lake pipeline.
   * - --transform
     - strings
     - false
     - Fields to be excluded for this data lake pipeline.

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

   # create data lake pipeline:
   atlas dataLakePipelines create Pipeline1 --sinkType CPS --sinkMetadataProvider AWS --sinkMetadataRegion us-east-1 --sinkPartitionField name:0,summary:1 --sourceType PERIODIC_CPS --sourceClusterName Cluster1 --sourceDatabaseName sample_airbnb --sourceCollectionName listingsAndReviews --sourcePolicyItemId 507f1f77bcf86cd799439011 --transform EXCLUDE:space,EXCLUDE:notes
