.. _atlas-backups-exports-jobs-watch:

================================
atlas backups exports jobs watch
================================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Watch for the specified export job to complete.

This command checks the export job's status periodically until it reaches a completed, cancelled or failed status. 
Once the export reaches the expected status, the command prints "Export completed."
If you run the command in the terminal, it blocks the terminal session until the resource status completes or fails.
You can interrupt the command's polling at any time with CTRL-C.
To use this command, you must authenticate with a user account or an API key with the Project Owner role.

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas backups exports jobs watch <exportJobId> [options]

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
   * - exportJobId
     - string
     - true
     - Unique string that identifies the export job.

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
     - help for watch
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

   
   Export completed.
   

Examples
--------

.. code-block::
   :copyable: false

   # Watch the continuous backup restore job with the ID 507f1f77bcf86cd799439011 for the cluster named Cluster0 until it becomes available:
   atlas backup restore watch 507f1f77bcf86cd799439011 --clusterName Cluster0
