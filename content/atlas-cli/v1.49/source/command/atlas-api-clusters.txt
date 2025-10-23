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

Returns, adds, edits, and removes database deployments.

The atlas api sub-command is automatically generated from the MongoDB Atlas Admin API and offers full coverage of the Admin API.
Admin API capabilities have their own release lifecycle, which you can check via the provided API endpoint documentation link.

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

* :ref:`atlas-api-clusters-autoScalingConfiguration` - Returns the internal configuration of AutoScaling for sharded clusters.
* :ref:`atlas-api-clusters-createCluster` - Creates one cluster in the specified project.
* :ref:`atlas-api-clusters-deleteCluster` - Removes one cluster from the specified project.
* :ref:`atlas-api-clusters-getCluster` - Returns the details for one cluster in the specified project.
* :ref:`atlas-api-clusters-getClusterStatus` - Returns the status of all changes that you made to the specified cluster in the specified project.
* :ref:`atlas-api-clusters-getProcessArgs` - Returns the advanced configuration details for one cluster in the specified project.
* :ref:`atlas-api-clusters-getSampleDatasetLoad` - Checks the progress of loading the sample dataset into one cluster.
* :ref:`atlas-api-clusters-grantMongoEmployeeAccess` - Grants MongoDB employee cluster access for the given duration and at the specified level for one cluster.
* :ref:`atlas-api-clusters-listClusterDetails` - Returns the details for all clusters in all projects to which you have access.
* :ref:`atlas-api-clusters-listClusterProviderRegions` - Returns the list of regions available for the specified cloud provider at the specified tier.
* :ref:`atlas-api-clusters-listClusters` - Returns the details for all clusters in the specific project to which you have access.
* :ref:`atlas-api-clusters-pinFeatureCompatibilityVersion` - Pins the Feature Compatibility Version (FCV) to the current MongoDB version and sets the pin expiration date.
* :ref:`atlas-api-clusters-requestSampleDatasetLoad` - Requests loading the MongoDB sample dataset into the specified cluster.
* :ref:`atlas-api-clusters-restartPrimaries` - Starts a failover test for the specified cluster in the specified project.
* :ref:`atlas-api-clusters-revokeMongoEmployeeAccess` - Revokes a previously granted MongoDB employee cluster access.
* :ref:`atlas-api-clusters-unpinFeatureCompatibilityVersion` - Unpins the current fixed Feature Compatibility Version (FCV).
* :ref:`atlas-api-clusters-updateCluster` - Updates the details for one cluster in the specified project.
* :ref:`atlas-api-clusters-updateProcessArgs` - Updates the advanced configuration details for one cluster in the specified project.
* :ref:`atlas-api-clusters-upgradeTenantUpgrade` - Upgrades a shared-tier cluster to a Flex or Dedicated (M10+) cluster in the specified project.


.. toctree::
   :titlesonly:

   autoScalingConfiguration </command/atlas-api-clusters-autoScalingConfiguration>
   createCluster </command/atlas-api-clusters-createCluster>
   deleteCluster </command/atlas-api-clusters-deleteCluster>
   getCluster </command/atlas-api-clusters-getCluster>
   getClusterStatus </command/atlas-api-clusters-getClusterStatus>
   getProcessArgs </command/atlas-api-clusters-getProcessArgs>
   getSampleDatasetLoad </command/atlas-api-clusters-getSampleDatasetLoad>
   grantMongoEmployeeAccess </command/atlas-api-clusters-grantMongoEmployeeAccess>
   listClusterDetails </command/atlas-api-clusters-listClusterDetails>
   listClusterProviderRegions </command/atlas-api-clusters-listClusterProviderRegions>
   listClusters </command/atlas-api-clusters-listClusters>
   pinFeatureCompatibilityVersion </command/atlas-api-clusters-pinFeatureCompatibilityVersion>
   requestSampleDatasetLoad </command/atlas-api-clusters-requestSampleDatasetLoad>
   restartPrimaries </command/atlas-api-clusters-restartPrimaries>
   revokeMongoEmployeeAccess </command/atlas-api-clusters-revokeMongoEmployeeAccess>
   unpinFeatureCompatibilityVersion </command/atlas-api-clusters-unpinFeatureCompatibilityVersion>
   updateCluster </command/atlas-api-clusters-updateCluster>
   updateProcessArgs </command/atlas-api-clusters-updateProcessArgs>
   upgradeTenantUpgrade </command/atlas-api-clusters-upgradeTenantUpgrade>
