.. _atlas-local-search-indexes:

==========================
atlas local search indexes
==========================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Manage local search indexes.

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

* :ref:`atlas-local-search-indexes-create` - 
* :ref:`atlas-local-search-indexes-delete` - Delete the specified search index from the specified deployment
* :ref:`atlas-local-search-indexes-describe` - Describe a search index for the specified deployment
* :ref:`atlas-local-search-indexes-list` - List all Atlas Search indexes for a deployment


.. toctree::
   :titlesonly:

   create </command/atlas-local-search-indexes-create>
   delete </command/atlas-local-search-indexes-delete>
   describe </command/atlas-local-search-indexes-describe>
   list </command/atlas-local-search-indexes-list>
