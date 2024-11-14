.. _atlas-kubernetes-config-generate:

================================
atlas kubernetes config generate
================================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Generate Kubernetes configuration resources for use with Atlas Kubernetes Operator.

This command exports configurations for Atlas objects including projects, deployments, and users in a Kubernetes-compatible format, allowing you to manage these resources using the Atlas Kubernetes Operator. For more information, see https://www.mongodb.com/docs/atlas/atlas-operator/

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas kubernetes config generate [options]

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
     - strings
     - false
     - One or more comma separated cluster names to import
   * - --dataFederationName
     - strings
     - false
     - One or more comma separated data federation names to import
   * - -h, --help
     - 
     - false
     - help for generate
   * - --includeSecrets
     - 
     - false
     - Flag that generates kubernetes secrets with data for projects, users, deployments entities.
   * - --independentResources
     - 
     - false
     - Flag that makes the generated resources that support independent usage, to use external IDs rather than Kubernetes references.
   * - --operatorVersion
     - string
     - false
     - Version of Atlas Kubernetes Operator to generate resources for. This value defaults to "2.5.0".
   * - --orgId
     - string
     - false
     - Organization ID to use. This option overrides the settings in the configuration file or environment variable.
   * - --projectId
     - string
     - false
     - Hexadecimal string that identifies the project to use. This option overrides the settings in the configuration file or environment variable.
   * - --targetNamespace
     - string
     - false
     - Namespaces to use for generated kubernetes entities

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

   # Export Project, DatabaseUsers, Deployments resources for a specific project without connection and integration secrets:
   atlas kubernetes config generate --projectId=<projectId>

   
.. code-block::
   :copyable: false

   # Export Project, DatabaseUsers, Deployments resources for a specific project, but use external IDs where supported:
   atlas kubernetes config generate --projectId=<projectId> --independentResources

   
.. code-block::
   :copyable: false

   # Export Project, DatabaseUsers, Deployments resources for a specific project including connection and integration secrets:
   atlas kubernetes config generate --projectId=<projectId> --includeSecrets

   
.. code-block::
   :copyable: false

   # Export Project, DatabaseUsers, Deployments resources for a specific project including connection and integration secrets to a specific namespace:
   atlas kubernetes config generate --projectId=<projectId> --includeSecrets --targetNamespace=<namespace>

   
.. code-block::
   :copyable: false

   # Export Project, DatabaseUsers, DataFederations and specific Deployment resources for a specific project including connection and integration secrets to a specific namespace:
   atlas kubernetes config generate --projectId=<projectId> --clusterName=<cluster-name-1, cluster-name-2> --includeSecrets --targetNamespace=<namespace>

   
.. code-block::
   :copyable: false

   # Export resources for a specific version of the Atlas Kubernetes Operator:
   atlas kubernetes config generate --projectId=<projectId> --targetNamespace=<namespace> --operatorVersion=1.5.1

   
.. code-block::
   :copyable: false

   # Export Project, DatabaseUsers, Clusters and specific DataFederation resources for a specific project to a specific namespace:
   atlas kubernetes config generate --projectId=<projectId> --dataFederationName=<data-federation-name-1, data-federation-name-2> --targetNamespace=<namespace>
