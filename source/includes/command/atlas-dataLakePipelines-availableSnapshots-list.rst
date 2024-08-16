.. _atlas-dataLakePipelines-availableSnapshots-list:

===============================================
atlas dataLakePipelines availableSnapshots list
===============================================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Return all available backup snapshots for the specified data lake pipeline.

To use this command, you must authenticate with a user account or an API key with the Project Read Only role.

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas dataLakePipelines availableSnapshots list [options]

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
   * - --completedAfter
     - string
     - false
     - Date filter for when the backup snapshots were completed. You must use the YYYY-MM-DD format.
   * - -h, --help
     - 
     - false
     - help for list
   * - --limit
     - int
     - false
     - Number of items per results page, up to a maximum of 500. If you have more than 500 results, specify the --page option to change the results page. This value defaults to 100.
   * - --omitCount
     - 
     - false
     - Flag that indicates whether the JSON response returns the total number of items (totalCount) in the JSON response.
   * - -o, --output
     - string
     - false
     - Output format. Valid values are json, json-path, go-template, or go-template-file. To see the full output, use the -o json option.
   * - --page
     - int
     - false
     - Page number that specifies a page of results. This value defaults to 1.
   * - --pipeline
     - string
     - true
     - Name of the Data lake pipeline.
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

Examples
--------

.. code-block::
   :copyable: false

   # list available backup schedules for data lake pipeline called 'Pipeline1':
   atlas dataLakePipelines availableSnapshots list Pipeline1

