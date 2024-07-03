.. _atlas-kubernetes-operator-install:

=================================
atlas kubernetes operator install
=================================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Install Atlas Kubernetes Operator to a cluster.

This command installs a supported version of Atlas Kubernetes Operator to an existing cluster, and optionally imports Atlas resources that are managed by the operator.

This command creates an API key for the Operator and adds it to Kubernetes as a secret, which the Operator then uses to make Atlas Admin API calls.
The key is scoped to the project when you specify the --projectName option and to the organization when you omit the --projectName option.

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas kubernetes operator install [options]

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
   * - --atlasGov
     - 
     - false
     - Flag that indicates whether to configure Atlas for Government as a target of the operator.
   * - -h, --help
     - 
     - false
     - help for install
   * - --import
     - 
     - false
     - Flag that indicates whether to import existing Atlas resources into the cluster for the operator to manage.
   * - --kubeContext
     - string
     - false
     - Name of the kubeconfig context to use.
   * - --kubeconfig
     - string
     - false
     - Path to the kubeconfig file to use for CLI requests.
   * - --operatorVersion
     - string
     - false
     - Version of the operator to install.
   * - --orgId
     - string
     - false
     - Organization ID to use. This option overrides the settings in the configuration file or environment variable.
   * - --projectName
     - string
     - false
     - Name of the project to create or use with the installed operator.
   * - --resourceDeletionProtection
     - 
     - false
     - Toggle atlas operator deletion protection for resources like Projects, Deployments, etc. Read more: https://dochub.mongodb.org/core/ako-deletion-protection This value defaults to true.
   * - --subresourceDeletionProtection
     - 
     - false
     - Toggle atlas operator deletion protection for subresources like Alerts, Integrations, etc. Read more: https://dochub.mongodb.org/core/ako-deletion-protection This value defaults to true.
   * - --targetNamespace
     - string
     - false
     - Namespace where to install the operator.
   * - --watchNamespace
     - strings
     - false
     - List that contains namespaces that the operator will listen to.

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

   # Install latest version of the operator into the default namespace:
   atlas kubernetes operator install

   
.. code-block::
   :copyable: false

   # Install the latest version of the operator targeting Atlas for Government instead of regular commercial Atlas:
   atlas kubernetes operator install --atlasGov

   
.. code-block::
   :copyable: false

   # Install a specific version of the operator:
   atlas kubernetes operator install --operatorVersion=1.7.0

   
.. code-block::
   :copyable: false

   # Install a specific version of the operator to a namespace and watch only this namespace and a second one:
   atlas kubernetes operator install --operatorVersion=1.7.0 --targetNamespace=<namespace> --watchNamespace=<namespace>,<secondNamespace>

   
.. code-block::
   :copyable: false

   # Install and import all objects from an organization:
   atlas kubernetes operator install --targetNamespace=<namespace> --orgID <orgID> --import

   
.. code-block::
   :copyable: false

   # Install and import objects from a specific project:
   atlas kubernetes operator install --targetNamespace=<namespace> --orgID <orgID> --projectName <project> --import

 	
.. code-block::
   :copyable: false

   # Install the operator and disable deletion protection:
 	atlas kubernetes operator install --resourceDeletionProtection=false

 	
.. code-block::
   :copyable: false

   # Install the operator and disable deletion protection for sub-resources (Atlas project integrations, private endpoints, etc.):
 	atlas kubernetes operator install --subresourceDeletionProtection=false
