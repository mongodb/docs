.. _atlas-api-clusters:

==================
atlas api clusters
==================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

`experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns, adds, edits, and removes database deployments.

Changes to cluster configurations can affect costs. This resource requires your Project ID.

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
     - help for clusters

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

Related Commands
----------------

* :ref:`atlas-api-clusters-createCluster` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Creates one cluster in the specified project.
* :ref:`atlas-api-clusters-deleteCluster` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Removes one cluster from the specified project.
* :ref:`atlas-api-clusters-getCluster` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns the details for one cluster in the specified project.
* :ref:`atlas-api-clusters-getClusterAdvancedConfiguration` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns the advanced configuration details for one cluster in the specified project.
* :ref:`atlas-api-clusters-getClusterStatus` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns the status of all changes that you made to the specified cluster in the specified project.
* :ref:`atlas-api-clusters-getSampleDatasetLoadStatus` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Checks the progress of loading the sample dataset into one cluster.
* :ref:`atlas-api-clusters-grantMongoDbEmployeeAccess` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Grants MongoDB employee cluster access for the given duration and at the specified level for one cluster.
* :ref:`atlas-api-clusters-listCloudProviderRegions` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns the list of regions available for the specified cloud provider at the specified tier.
* :ref:`atlas-api-clusters-listClusters` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns the details for all clusters in the specific project to which you have access.
* :ref:`atlas-api-clusters-listClustersForAllProjects` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns the details for all clusters in all projects to which you have access.
* :ref:`atlas-api-clusters-loadSampleDataset` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Requests loading the MongoDB sample dataset into the specified cluster.
* :ref:`atlas-api-clusters-pinFeatureCompatibilityVersion` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Pins the Feature Compatibility Version (FCV) to the current MongoDB version and sets the pin expiration date.
* :ref:`atlas-api-clusters-revokeMongoDbEmployeeAccess` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Revokes a previously granted MongoDB employee cluster access.
* :ref:`atlas-api-clusters-testFailover` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Starts a failover test for the specified cluster in the specified project.
* :ref:`atlas-api-clusters-unpinFeatureCompatibilityVersion` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Unpins the current fixed Feature Compatibility Version (FCV).
* :ref:`atlas-api-clusters-updateCluster` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Updates the details for one cluster in the specified project.
* :ref:`atlas-api-clusters-updateClusterAdvancedConfiguration` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Updates the advanced configuration details for one cluster in the specified project.
* :ref:`atlas-api-clusters-upgradeSharedCluster` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Upgrades a shared-tier cluster to a Flex or Dedicated (M10+) cluster in the specified project.


.. toctree::
   :titlesonly:

   createCluster </command/atlas-api-clusters-createCluster>
   deleteCluster </command/atlas-api-clusters-deleteCluster>
   getCluster </command/atlas-api-clusters-getCluster>
   getClusterAdvancedConfiguration </command/atlas-api-clusters-getClusterAdvancedConfiguration>
   getClusterStatus </command/atlas-api-clusters-getClusterStatus>
   getSampleDatasetLoadStatus </command/atlas-api-clusters-getSampleDatasetLoadStatus>
   grantMongoDbEmployeeAccess </command/atlas-api-clusters-grantMongoDbEmployeeAccess>
   listCloudProviderRegions </command/atlas-api-clusters-listCloudProviderRegions>
   listClusters </command/atlas-api-clusters-listClusters>
   listClustersForAllProjects </command/atlas-api-clusters-listClustersForAllProjects>
   loadSampleDataset </command/atlas-api-clusters-loadSampleDataset>
   pinFeatureCompatibilityVersion </command/atlas-api-clusters-pinFeatureCompatibilityVersion>
   revokeMongoDbEmployeeAccess </command/atlas-api-clusters-revokeMongoDbEmployeeAccess>
   testFailover </command/atlas-api-clusters-testFailover>
   unpinFeatureCompatibilityVersion </command/atlas-api-clusters-unpinFeatureCompatibilityVersion>
   updateCluster </command/atlas-api-clusters-updateCluster>
   updateClusterAdvancedConfiguration </command/atlas-api-clusters-updateClusterAdvancedConfiguration>
   upgradeSharedCluster </command/atlas-api-clusters-upgradeSharedCluster>

