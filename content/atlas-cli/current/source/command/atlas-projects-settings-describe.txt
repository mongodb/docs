.. _atlas-projects-settings-describe:

================================
atlas projects settings describe
================================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Retrieve details for settings to the specified project.

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas projects settings describe [options]

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

   COLLECT DATABASE SPECIFICS STATISTICS ENABLED   DATA EXPLORER ENABLED     DATA EXPLORER GEN AI FEATURES ENABLED   DATA EXPLORER GEN AI SAMPLE DOCUMENT PASSING ENABLED   PERFORMANCE ADVISOR ENABLED     REALTIME PERFORMANCE PANEL ENABLED    SCHEMA ADVISOR ENABLED
   <IsCollectDatabaseSpecificsStatisticsEnabled>   <IsDataExplorerEnabled>   <IsDataExplorerGenAIFeaturesEnabled>    <IsDataExplorerGenAISampleDocumentPassingEnabled>      <IsPerformanceAdvisorEnabled>   <IsRealtimePerformancePanelEnabled>   <IsSchemaAdvisorEnabled>
   

Examples
--------

.. code-block::
   :copyable: false

   # This example uses the profile named "myprofile" for accessing Atlas.
   atlas projects settings describe -P myprofile --projectId 5e2211c17a3e5a48f5497de3
