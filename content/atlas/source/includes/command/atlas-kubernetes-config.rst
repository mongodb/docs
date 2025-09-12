.. _atlas-kubernetes-config:

=======================
atlas kubernetes config
=======================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Manage Kubernetes configuration resources.

This command provides your Kubernetes configuration access to Atlas.

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
     - help for config

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

* :ref:`atlas-kubernetes-config-apply` - Generate and apply Kubernetes configuration resources for use with Atlas Kubernetes Operator.
* :ref:`atlas-kubernetes-config-generate` - Generate Kubernetes configuration resources for use with Atlas Kubernetes Operator.


.. toctree::
   :titlesonly:

   apply </command/atlas-kubernetes-config-apply>
   generate </command/atlas-kubernetes-config-generate>

