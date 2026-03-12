.. _atlas-local-search-indexes-describe:

===================================
atlas local search indexes describe
===================================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Describe a search index for the specified deployment

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas local search indexes describe [index_id] [options]

.. Code end marker, please don't delete this comment

Arguments
---------

.. list-table::
   :header-rows: 1
   :widths: 20 10 10 60

   * - Name
     - Type
     - Required
     - Description
   * - index_id
     - string
     - false
     - ID of the index

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
     - help for describe
   * - --deploymentName
     - string
     - true
     - Name of the deployment
   * - --password
     - string
     - false
     - Password for authenticating to MongoDB
   * - --username
     - string
     - false
     - Username for authenticating to MongoDB

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

