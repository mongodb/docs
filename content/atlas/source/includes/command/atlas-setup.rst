.. _atlas-setup:

===========
atlas setup
===========

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Register, authenticate, create, and access an Atlas cluster.

This command takes you through registration, login, default profile creation, creating your first free tier cluster and connecting to it using MongoDB Shell.

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas setup [options]

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
   * - --accessListIp
     - strings
     - false
     - IP address to grant access to the deployment.

       Mutually exclusive with --currentIp.
   * - --clusterName
     - string
     - false
     - Name of the cluster. To learn more, see https://dochub.mongodb.org/core/create-cluster-api.
   * - --connectWith
     - string
     - false
     - Method for connecting to the cluster. Valid values are compass, mongosh and skip.

       Mutually exclusive with --skipMongosh.
   * - --currentIp
     - 
     - false
     - Flag that adds the IP address from the host that is currently executing the command to the access list.

       Mutually exclusive with --accessListIp.
   * - --enableTerminationProtection
     - 
     - false
     - Enables termination protection for your cluster. You can't delete a cluster with termination protection enabled.
   * - --force
     - 
     - false
     - Flag that indicates whether to skip the request for input and create a cluster with the default settings for any unspecified options.
   * - --gov
     - 
     - false
     - Register with Atlas for Government.
   * - -h, --help
     - 
     - false
     - help for setup
   * - --mdbVersion
     - string
     - false
     - Major MongoDB version of the deployment.
   * - --noBrowser
     - 
     - false
     - Don't try to open a browser session.
   * - --password
     - string
     - false
     - Password for the user.
   * - --projectId
     - string
     - false
     - Hexadecimal string that identifies the project to use. This option overrides the settings in the configuration file or environment variable.
   * - --provider
     - string
     - false
     - Name of your cloud service provider. Valid values are AWS, AZURE, or GCP.
   * - -r, --region
     - string
     - false
     - Physical location of your MongoDB cluster. For a complete list of supported AWS regions, see: https://dochub.mongodb.org/core/aws-atlas. For a complete list of supported Azure regions, see: https://dochub.mongodb.org/core/azure-atlas. For a complete list of supported GCP regions, see: https://dochub.mongodb.org/core/gcp-atlas.
   * - --skipSampleData
     - 
     - false
     - Flag that indicates whether to skip loading sample data into your MongoDB cluster.
   * - --tag
     - key=value
     - false
     - List that contains key-value pairs between 1 to 255 characters in length for tagging and categorizing the cluster.
   * - --tier
     - string
     - false
     - Tier for each data-bearing server in the cluster. To learn more about cluster tiers, see https://dochub.mongodb.org/core/cluster-tier-atlas. This value defaults to "M0".
   * - --username
     - string
     - false
     - Username for authenticating to MongoDB.

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

   # Override default cluster settings like name, provider, or database username by using the command options
   atlas setup --clusterName Test --provider GCP --username dbuserTest
