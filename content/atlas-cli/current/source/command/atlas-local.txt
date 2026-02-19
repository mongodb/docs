.. _atlas-local:

===========
atlas local
===========

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Manage local deployments

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
     - help for local

Inherited Options
-----------------

.. list-table::
   :header-rows: 1
   :widths: 20 10 10 60

   * - Name
     - Type
     - Required
     - Description
   * - -o, --output
     - string
     - false
     - Output format
   * - -P, --profile
     - string
     - false
     - Name of the profile to use from your configuration file. To learn about profiles for the Atlas CLI, see https://dochub.mongodb.org/core/atlas-cli-save-connection-settings

Related Commands
----------------

* :ref:`atlas-local-connect` - Connect to a deployment
* :ref:`atlas-local-delete` - Delete a deployment.
* :ref:`atlas-local-list` - List all local deployments
* :ref:`atlas-local-logs` - Get deployment logs
* :ref:`atlas-local-search` - Manage search for local deployments.
* :ref:`atlas-local-setup` - Create a local deployment.
* :ref:`atlas-local-start` - Start a deployment
* :ref:`atlas-local-stop` - Stop (pause) a deployment


.. toctree::
   :titlesonly:

   connect </command/atlas-local-connect>
   delete </command/atlas-local-delete>
   list </command/atlas-local-list>
   logs </command/atlas-local-logs>
   search </command/atlas-local-search>
   setup </command/atlas-local-setup>
   start </command/atlas-local-start>
   stop </command/atlas-local-stop>
