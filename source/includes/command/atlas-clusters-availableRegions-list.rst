.. _atlas-clusters-availableRegions-list:

====================================
atlas clusters availableRegions list
====================================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

List available regions that Atlas supports for new deployments.

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas clusters availableRegions list [options]

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
   * - -h, --help
     - 
     - false
     - help for list
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
     - Name of your cloud service provider. Valid values are AWS, AZURE, or GCP.
   * - --tier
     - string
     - false
     - Tier for each data-bearing server in the cluster. To learn more about cluster tiers, see https://dochub.mongodb.org/core/cluster-tier-atlas.

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

   # List available regions for a given cloud provider and tier:
   atlas cluster availableRegions list --provider AWS --tier M50

   
.. code-block::
   :copyable: false

   # List available regions by tier for a given provider:
   atlas cluster availableRegions list --provider GCP
