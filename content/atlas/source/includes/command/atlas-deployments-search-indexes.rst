.. _atlas-deployments-search-indexes:

================================
atlas deployments search indexes
================================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Manage cloud and local search indexes.

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
     - help for indexes

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

* :ref:`atlas-deployments-search-indexes-create` - Create a search index for the specified deployment.
* :ref:`atlas-deployments-search-indexes-delete` - Delete the specified search index from the specified deployment.
* :ref:`atlas-deployments-search-indexes-describe` - Describe a search index for the specified deployment.
* :ref:`atlas-deployments-search-indexes-list` - List all Atlas Search indexes for a deployment.


.. toctree::
   :titlesonly:

   create </command/atlas-deployments-search-indexes-create>
   delete </command/atlas-deployments-search-indexes-delete>
   describe </command/atlas-deployments-search-indexes-describe>
   list </command/atlas-deployments-search-indexes-list>

