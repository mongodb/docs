.. _atlas-clusters-onlineArchives-update:

====================================
atlas clusters onlineArchives update
====================================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Modify the archiving rule for the specified online archive for a cluster.

To use this command, you must authenticate with a user account or an API key with the Project Data Access Admin role.

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas clusters onlineArchives update <archiveId> [options]

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
     - Unique identifier of the online archive to update.

Options
-------

.. list-table::
   :header-rows: 1
   :widths: 20 10 10 60

   * - Name
     - Type
     - Required
     - Description
   * - --archiveAfter
     - int
     - false
     - Number of days after which to archive cluster data.

       Mutually exclusive with --file.
   * - --clusterName
     - string
     - true
     - Name of the cluster. To learn more, see https://dochub.mongodb.org/core/create-cluster-api.
   * - --expireAfterDays
     - int
     - false
     - Number of days used in the date criteria for nominating documents for deletion.

       Mutually exclusive with --file.
   * - --file
     - string
     - false
     - Path to an optional JSON configuration file that defines online archive settings. To learn more about online archive configuration files for the Atlas CLI, see https://dochub.mongodb.org/core/atlas-cli-json-online-archive-config.

       Mutually exclusive with --archiveAfter, --expireAfterDays.
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

   Online archive '<Id>' updated.
   

Examples
--------

.. code-block::
   :copyable: false

   # Update the archiving rule to archive after 5 days for the online archive with the ID 5f189832e26ec075e10c32d3 for the cluster named myCluster:
   atlas clusters onlineArchives update 5f189832e26ec075e10c32d3 --clusterName --archiveAfter 5 myCluster --output json
