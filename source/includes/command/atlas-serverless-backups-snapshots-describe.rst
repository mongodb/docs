.. _atlas-serverless-backups-snapshots-describe:

===========================================
atlas serverless backups snapshots describe
===========================================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Return the details for the specified snapshot for your project.

To use this command, you must authenticate with a user account or an API key with the Project Read Only role.

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas serverless backups snapshots describe [options]

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
     - help for describe
   * - -o, --output
     - string
     - false
     - Output format. Valid values are json, json-path, go-template, or go-template-file. To see the full output, use the -o json option.
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

   ID     SNAPSHOT TYPE    EXPIRES AT
   <Id>   <SnapshotType>   <ExpiresAt>
   

Examples
--------

.. code-block::
   :copyable: false

   # Return the details for the backup snapshot with the ID 5f4007f327a3bd7b6f4103c5 for the instance named myDemo:
   atlas serverless backups snapshots describe --snapshotId 5f4007f327a3bd7b6f4103c5 --clusterName myDemo
