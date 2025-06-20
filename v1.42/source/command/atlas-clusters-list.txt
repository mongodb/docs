.. _atlas-clusters-list:

===================
atlas clusters list
===================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Return all clusters for your project.

To use this command, you must authenticate with a user account or an API key with the Project Read Only role.

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas clusters list [options]

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
   * - --projectId
     - string
     - false
     - Hexadecimal string that identifies the project to use. This option overrides the settings in the configuration file or environment variable.
   * - --tier
     - string
     - false
     - Tier for each data-bearing server in the cluster. To learn more about cluster tiers, see https://dochub.mongodb.org/core/cluster-tier-atlas.

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

   ID     NAME     MDB VER            STATE
   <Id>   <Name>   <MongoDBVersion>   <StateName>
   

Examples
--------

.. code-block::
   :copyable: false

   # Return a JSON-formatted list of all clusters for the project with ID 5e2211c17a3e5a48f5497de3:
   atlas clusters list --projectId 5e2211c17a3e5a48f5497de3 --output json
