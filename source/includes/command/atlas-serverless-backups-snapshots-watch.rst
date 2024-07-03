.. _atlas-serverless-backups-snapshots-watch:

========================================
atlas serverless backups snapshots watch
========================================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Watch the specified snapshot in your project until it reaches a completed or failed status.

This command checks the snapshot's status periodically until it reaches a completed or failed status. 
Command finishes once one of the expected statuses are reached.
If you run the command in the terminal, it blocks the terminal session until the resource status completes or fails.
You can interrupt the command's polling at any time with CTRL-C.
To use this command, you must authenticate with a user account or an API key with the Project Read Only role.

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas serverless backups snapshots watch [options]

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
   * - --clusterName
     - string
     - true
     - Name of the cluster. To learn more, see https://dochub.mongodb.org/core/create-cluster-api.
   * - -h, --help
     - 
     - false
     - help for watch
   * - --projectId
     - string
     - false
     - Hexadecimal string that identifies the project to use. This option overrides the settings in the configuration file or environment variable.
   * - --snapshotId
     - string
     - true
     - Unique identifier of the snapshot.

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

   
   Snapshot changes completed.
   

Examples
--------

.. code-block::
   :copyable: false

   # Watch the backup snapshot with the ID 5f4007f327a3bd7b6f4103c5 in the cluster named myDemo until it becomes available:
   atlas backups snapshots watch 5f4007f327a3bd7b6f4103c5 --clusterName myDemo
