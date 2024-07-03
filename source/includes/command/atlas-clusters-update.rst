.. _atlas-clusters-update:

=====================
atlas clusters update
=====================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Modify the settings of the specified cluster.

You can specify modifications in a JSON configuration file with the --file flag.
		
You can't change the name of the cluster or downgrade the MongoDB version of your cluster.

You can only update a replica set to a single-shard cluster; you cannot update a replica set to a multi-sharded cluster. To learn more, see https://www.mongodb.com/docs/atlas/scale-cluster/#convert-a-replica-set-to-a-sharded-cluster and https://www.mongodb.com/docs/upcoming/tutorial/convert-replica-set-to-replicated-shard-cluster.

To use this command, you must authenticate with a user account or an API key with the Project Cluster Manager role.
Atlas supports this command only for M10+ clusters

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas clusters update [clusterName] [options]

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
   * - clusterName
     - string
     - false
     - Name of the cluster to update.

Options
-------

.. list-table::
   :header-rows: 1
   :widths: 20 10 10 60

   * - Name
     - Type
     - Required
     - Description
   * - --disableTerminationProtection
     - 
     - false
     - Disables termination protection for your cluster. You can delete a cluster with termination protection disabled.

       Mutually exclusive with --enableTerminationProtection, --file.
   * - --diskSizeGB
     - float
     - false
     - Capacity, in gigabytes, of the host's root volume.

       Mutually exclusive with --file.
   * - --enableTerminationProtection
     - 
     - false
     - Enables termination protection for your cluster. You can't delete a cluster with termination protection enabled.

       Mutually exclusive with --disableTerminationProtection, --file.
   * - -f, --file
     - string
     - false
     - Path to an optional JSON configuration file that defines cluster settings. To learn more about cluster configuration files for the Atlas CLI, see https://dochub.mongodb.org/core/cluster-config-file-atlascli.

       Mutually exclusive with --tier, --diskSizeGB, --enableTerminationProtection, --disableTerminationProtection, --tag.
   * - -h, --help
     - 
     - false
     - help for update
   * - --mdbVersion
     - string
     - false
     - Major MongoDB version of the cluster.
   * - -o, --output
     - string
     - false
     - Output format. Valid values are json, json-path, go-template, or go-template-file. To see the full output, use the -o json option.
   * - --projectId
     - string
     - false
     - Hexadecimal string that identifies the project to use. This option overrides the settings in the configuration file or environment variable.
   * - --tag
     - key=value
     - false
     - List that contains key-value pairs between 1 to 255 characters in length for tagging and categorizing the cluster. Passing this flag replaces preexisting data.

       Mutually exclusive with --file.
   * - --tier
     - string
     - false
     - Tier for each data-bearing server in the cluster. To learn more about cluster tiers, see https://dochub.mongodb.org/core/cluster-tier-atlas.

       Mutually exclusive with --file.

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

   Updating cluster '<Name>'.
   

Examples
--------

.. code-block::
   :copyable: false

   # Update the tier for a cluster named myCluster for the project with ID 5e2211c17a3e5a48f5497de3:
   atlas cluster update myCluster --projectId 5e2211c17a3e5a48f5497de3 --tier M50

   
.. code-block::
   :copyable: false

   # Replace tags cluster named myCluster for the project with ID 5e2211c17a3e5a48f5497de3:
   atlas cluster update myCluster --projectId 5e2211c17a3e5a48f5497de3 --tag key1=value1

   
.. code-block::
   :copyable: false

   # Remove all tags from cluster named myCluster for the project with ID 5e2211c17a3e5a48f5497de3:
   atlas cluster update myCluster --projectId 5e2211c17a3e5a48f5497de3 --tag =

   
.. code-block::
   :copyable: false

   # Update the disk size for a cluster named myCluster for the project with ID 5e2211c17a3e5a48f5497de3:
   atlas cluster update myCluster --projectId 5e2211c17a3e5a48f5497de3 --diskSizeGB 20

   
.. code-block::
   :copyable: false

   # Update the MongoDB version for a cluster named myCluster for the project with ID 5e2211c17a3e5a48f5497de3:
   atlas cluster update myCluster --projectId 5e2211c17a3e5a48f5497de3 --mdbVersion 5.0
   
   
.. code-block::
   :copyable: false

   # Use a configuration file named cluster-config.json to update a cluster named myCluster for the project with ID 5e2211c17a3e5a48f5497de3:
   atlas cluster update myCluster --projectId 5e2211c17a3e5a48f5497de3 --file cluster-config.json --output json
