.. _atlas-api-accessTracking:

========================
atlas api accessTracking
========================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

`experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns access logs for authentication attempts made to Atlas database deployments.

To view database access history, you must have either the Project Owner or Organization Owner role.

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
     - help for accessTracking

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

* :ref:`atlas-api-accessTracking-listAccessLogsByClusterName` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns the access logs of one cluster identified by the cluster's name.
* :ref:`atlas-api-accessTracking-listAccessLogsByHostname` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns the access logs of one cluster identified by the cluster's hostname.


.. toctree::
   :titlesonly:

   listAccessLogsByClusterName </command/atlas-api-accessTracking-listAccessLogsByClusterName>
   listAccessLogsByHostname </command/atlas-api-accessTracking-listAccessLogsByHostname>

