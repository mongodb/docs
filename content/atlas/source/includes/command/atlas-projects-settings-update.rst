.. _atlas-projects-settings-update:

==============================
atlas projects settings update
==============================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Updates settings for a project.

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas projects settings update [options]

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
   * - --disableCollectDatabaseSpecificsStatistics
     - 
     - false
     - Flag that disables the Collect Database Specific Statistics project setting.

       Mutually exclusive with --enableCollectDatabaseSpecificsStatistics.
   * - --disableDataExplorer
     - 
     - false
     - Flag that disables the Data Explorer project setting.

       Mutually exclusive with --enableDataExplorer.
   * - --disablePerformanceAdvisor
     - 
     - false
     - Flag that disables the Performance Advisor project setting.

       Mutually exclusive with --enablePerformanceAdvisor.
   * - --disableRealtimePerformancePanel
     - 
     - false
     - Flag that disables the Real Time Performance Panel project setting.

       Mutually exclusive with --enableRealtimePerformancePanel.
   * - --disableSchemaAdvisor
     - 
     - false
     - Flag that disables the Schema Advisor project setting.

       Mutually exclusive with --enableSchemaAdvisor.
   * - --enableCollectDatabaseSpecificsStatistics
     - 
     - false
     - Flag that enables the Collect Database Specific Statistics project setting.

       Mutually exclusive with --disableCollectDatabaseSpecificsStatistics.
   * - --enableDataExplorer
     - 
     - false
     - Flag that enables the Data Explorer project setting.

       Mutually exclusive with --disableDataExplorer.
   * - --enablePerformanceAdvisor
     - 
     - false
     - Flag that enables the Performance Advisor project setting.

       Mutually exclusive with --disablePerformanceAdvisor.
   * - --enableRealtimePerformancePanel
     - 
     - false
     - Flag that enables the Real Time Performance Panel project setting.

       Mutually exclusive with --disableRealtimePerformancePanel.
   * - --enableSchemaAdvisor
     - 
     - false
     - Flag that enables the Schema Advisor project setting.

       Mutually exclusive with --disableSchemaAdvisor.
   * - -h, --help
     - 
     - false
     - help for update
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

   Project settings updated.
   

Examples
--------

.. code-block::
   :copyable: false

   # This example uses the profile named "myprofile" for accessing Atlas.
   atlas projects settings update --disableCollectDatabaseSpecificsStatistics -P myprofile --projectId 5e2211c17a3e5a48f5497de3
