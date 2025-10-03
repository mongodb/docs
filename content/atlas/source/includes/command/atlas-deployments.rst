.. _atlas-deployments:

=================
atlas deployments
=================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Manage cloud and local deployments.

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
     - help for deployments

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

* :ref:`atlas-deployments-connect` - Connect to a deployment that is running locally or in Atlas. If the deployment is paused, make sure to run atlas deployments start first.
* :ref:`atlas-deployments-delete` - Delete a deployment.
* :ref:`atlas-deployments-list` - Return all deployments.
* :ref:`atlas-deployments-logs` - Get deployment logs.
* :ref:`atlas-deployments-pause` - Pause a deployment.
* :ref:`atlas-deployments-search` - Manage search for cloud and local deployments.
* :ref:`atlas-deployments-setup` - Create a local deployment.
* :ref:`atlas-deployments-start` - Start a deployment.


.. toctree::
   :titlesonly:

   connect </command/atlas-deployments-connect>
   delete </command/atlas-deployments-delete>
   list </command/atlas-deployments-list>
   logs </command/atlas-deployments-logs>
   pause </command/atlas-deployments-pause>
   search </command/atlas-deployments-search>
   setup </command/atlas-deployments-setup>
   start </command/atlas-deployments-start>

