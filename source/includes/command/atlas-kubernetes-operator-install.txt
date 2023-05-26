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

This command installs one of the supported versions of Atlas Kubernetes Operator to an existing cluster, as well as automatically import Atlas resources to be managed by the operator.

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
   * - -h, --help
     - 
     - false
     - help for install
   * - --import
     - 
     - false
     - Flag to import existing Atlas resources into the cluster to be managed by the operator.
   * - --kubeContext
     - string
     - false
     - The name of the kubeconfig context to use.
   * - --kubeconfig
     - string
     - false
     - Path to the kubeconfig file to use for CLI requests.
   * - --operatorVersion
     - string
     - false
     - Version of the operator to be installed.
   * - --orgId
     - string
     - false
     - Organization ID to use. Overrides the settings in the configuration file or environment variable.
   * - --projectName
     - string
     - false
     - Name of the project to create or use with the installed operator.
   * - --targetNamespace
     - string
     - false
     - Namespace where to install the operator.
   * - --watchNamespace
     - strings
     - false
     - List of namespaces which the operator will be listen to.

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

   # Install latest version of the operator into the default namespace:
   atlas kubernetes operator install

   
.. code-block::

   # Install an specific version of the operator:
   atlas kubernetes operator install --operatorVersion=1.7.0

   
.. code-block::

   # Install an specific version of the operator to a namespace and watch only this namespace and a second one
   atlas kubernetes operator install --operatorVersion=1.7.0 --targetNamespace=<namespace> --watchNamespace=<namespace>,<secondNamespace>
