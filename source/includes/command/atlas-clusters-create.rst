.. _atlas-clusters-create:

=====================
atlas clusters create
=====================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Create a cluster for your project.

To get started quickly, specify a name for your cluster, a cloud provider, and a region to deploy a three-member replica set with the latest MongoDB server version.
For full control of your deployment, or to create multi-cloud clusters, provide a JSON configuration file with the --file flag.

Deprecation note: the M2 and M5 tiers are now deprecated; when selecting M2 or M5, a FLEX tier will be created instead. For the migration guide, visit: https://dochub.mongodb.org/core/flex-migration.\n

To use this command, you must authenticate with a user account or an API key with the Project Owner role.

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas clusters create [name] [options]

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
   * - name
     - string
     - false
     - Name of the cluster. The cluster name cannot be changed after the cluster is created. Cluster name can contain ASCII letters, numbers, and hyphens. You must specify the cluster name argument if you don't use the --file option.

Options
-------

.. list-table::
   :header-rows: 1
   :widths: 20 10 10 60

   * - Name
     - Type
     - Required
     - Description
   * - --backup
     - 
     - false
     - Flag that enables Continuous Cloud Backup for your deployment. This option is unavailable for clusters smaller than M10.
   * - --biConnector
     - 
     - false
     - Flag that enables BI Connector for Atlas on the deployment.

       Mutually exclusive with --file.
   * - --diskSizeGB
     - float
     - false
     - Capacity, in gigabytes, of the host's root volume.

       Mutually exclusive with --file. This value defaults to 2.
   * - --enableTerminationProtection
     - 
     - false
     - Enables termination protection for your cluster. You can't delete a cluster with termination protection enabled.
   * - -f, --file
     - string
     - false
     - Path to an optional JSON configuration file that defines cluster settings. To learn more about cluster configuration files for the Atlas CLI, see https://dochub.mongodb.org/core/cluster-config-file-atlascli.

       Mutually exclusive with --tier, --provider, --members, --region, --diskSizeGB, --mdbVersion, --biConnector, --type, --shards, --tag.
   * - -h, --help
     - 
     - false
     - help for create
   * - --mdbVersion
     - string
     - false
     - Major MongoDB version of the cluster.

       Mutually exclusive with --file. This value defaults to "8.0".
   * - -m, --members
     - int
     - false
     - Number of members in the replica set.

       Mutually exclusive with --file. This value defaults to 3.
   * - -o, --output
     - string
     - false
     - Output format. Valid values are json, json-path, go-template, or go-template-file. To see the full output, use the -o json option.
   * - --projectId
     - string
     - false
     - Hexadecimal string that identifies the project to use. This option overrides the settings in the configuration file or environment variable.
   * - --provider
     - string
     - false
     - Name of your cloud service provider. Valid values are AWS, AZURE, or GCP. You must specify the provider option if you don't use the --file option.

       Mutually exclusive with --file.
   * - -r, --region
     - string
     - false
     - Physical location of your MongoDB cluster. You must specify the region option if you don't use the --file option. For a complete list of supported AWS regions, see: https://dochub.mongodb.org/core/aws-atlas. For a complete list of supported Azure regions, see: https://dochub.mongodb.org/core/azure-atlas. For a complete list of supported GCP regions, see: https://dochub.mongodb.org/core/gcp-atlas.

       Mutually exclusive with --file.
   * - -s, --shards
     - int
     - false
     - Number of shards in the cluster.

       Mutually exclusive with --file. This value defaults to 1.
   * - --tag
     - key=value
     - false
     - List that contains key-value pairs between 1 to 255 characters in length for tagging and categorizing the cluster.

       Mutually exclusive with --file.
   * - --tier
     - string
     - false
     - Tier for each data-bearing server in the cluster. To learn more about cluster tiers, see https://dochub.mongodb.org/core/cluster-tier-atlas.

       Mutually exclusive with --file. This value defaults to "FLEX".
   * - --type
     - string
     - false
     - Type of the cluster that you want to create. Valid values are REPLICASET or SHARDED.

       Mutually exclusive with --file. This value defaults to "REPLICASET".
   * - -w, --watch
     - 
     - false
     - Flag that indicates whether to watch the command until it completes its execution or the watch times out. To set the time that the watch times out, use the --watchTimeout option.
   * - --watchTimeout
     - int
     - false
     - Time in seconds until a watch times out. After a watch times out, the CLI no longer watches the command.

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

   Cluster '<Name>' is being created.
   

Examples
--------

.. code-block::
   :copyable: false

   # Deploy a free cluster named myCluster for the project with the ID 5e2211c17a3e5a48f5497de3:
   atlas cluster create myCluster --projectId 5e2211c17a3e5a48f5497de3 --provider AWS --region US_EAST_1 --tier M0

   
.. code-block::
   :copyable: false

   # Deploy a Flex cluster named myFlexCluster for the project with the ID 5e2211c17a3e5a48f5497de3 and tag "env=dev":
   atlas cluster create myFlexCluster --projectId 5e2211c17a3e5a48f5497de3 --provider AWS --region US_EAST_1 --tier FLEX --tag env=dev

   
.. code-block::
   :copyable: false

   # Deploy a free cluster named myCluster for the project with the ID 5e2211c17a3e5a48f5497de3 and tag "env=dev":
   atlas cluster create myCluster --projectId 5e2211c17a3e5a48f5497de3 --provider AWS --region US_EAST_1 --tier M0 --tag env=dev

   
.. code-block::
   :copyable: false

   # Deploy a three-member replica set named myRS in AWS for the project with the ID 5e2211c17a3e5a48f5497de3:
   atlas cluster create myRS --projectId 5e2211c17a3e5a48f5497de3 --provider AWS --region US_EAST_1 --members 3 --tier M10 --mdbVersion 5.0 --diskSizeGB 10

   
.. code-block::
   :copyable: false

   # Deploy a three-member replica set named myRS in AZURE for the project with the ID 5e2211c17a3e5a48f5497de3:
   atlas cluster create myRS --projectId 5e2211c17a3e5a48f5497de3 --provider AZURE --region US_EAST_2 --members 3 --tier M10  --mdbVersion 5.0 --diskSizeGB 10
   
   
.. code-block::
   :copyable: false

   # Deploy a three-member replica set named myRS in GCP for the project with the ID 5e2211c17a3e5a48f5497de3:
   atlas cluster create myRS --projectId 5e2211c17a3e5a48f5497de3 --provider GCP --region EASTERN_US --members 3 --tier M10  --mdbVersion 5.0 --diskSizeGB 10

   
.. code-block::
   :copyable: false

   # Deploy a cluster or a multi-cloud cluster from a JSON configuration file named myfile.json for the project with the ID 5e2211c17a3e5a48f5497de3:
   atlas cluster create --projectId <projectId> --file myfile.json
