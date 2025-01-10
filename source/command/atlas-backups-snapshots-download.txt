.. _atlas-backups-snapshots-download:

================================
atlas backups snapshots download
================================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Download one snapshot for the specified flex cluster.

You can download a snapshot for an Atlas Flex cluster.
To use this command, you must authenticate with a user account or an API key with the Project Owner role.
Atlas supports this command only for Flex clusters.

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas backups snapshots download <snapshotId> [options]

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
   * - snapshotId
     - string
     - true
     - Unique 24-hexadecimal digit string that identifies the snapshot to download.

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
     - help for download
   * - --out
     - string
     - false
     - Output file name. This value defaults to the Snapshot ID.
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

   Snapshot '<Name>' downloaded.
   

