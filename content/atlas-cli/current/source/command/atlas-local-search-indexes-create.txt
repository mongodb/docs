.. _atlas-local-search-indexes-create:

=================================
atlas local search indexes create
=================================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol



Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas local search indexes create [index_name] [options]

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
   * - index_name
     - string
     - false
     - Name of the index

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
     - help for create
   * - --collection
     - string
     - false
     - Name of the collection
   * - --db
     - string
     - false
     - Name of the database
   * - --deploymentName
     - string
     - true
     - Name of the deployment
   * - --file
     - string
     - false
     - Name of the JSON index configuration file to use.

To learn about the Atlas Search and Atlas Vector Search index configuration file, see https://dochub.mongodb.org/core/search-index-config-file-atlascli. To learn about the Atlas Search index syntax and options that you can define in your configuration file, see https://dochub.mongodb.org/core/index-definitions-fts. To learn about the Atlas Vector Search index syntax and options that you can define in your configuration file, see https://dochub.mongodb.org/core/index-definition-avs.
   * - --password
     - string
     - false
     - Password for authenticating to MongoDB
   * - --username
     - string
     - false
     - Username for authenticating to MongoDB
   * - -w, --watch
     - 
     - false
     - Flag that indicates whether to watch the command until it completes its execution or the watch times out

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

