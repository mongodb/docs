.. _atlas-api-atlasSearch:

=====================
atlas api atlasSearch
=====================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Returns, adds, edits, and removes Atlas Search indexes for the specified cluster.

The atlas api sub-command is automatically generated from the MongoDB Atlas Admin API and offers full coverage of the Admin API.
Admin API capabilities have their own release lifecycle, which you can check via the provided API endpoint documentation link.

Also returns and updates user-defined analyzers for the specified cluster.

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
     - help for atlasSearch

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

* :ref:`atlas-api-atlasSearch-createClusterFtsIndex` - Creates one Atlas Search index on the specified collection.
* :ref:`atlas-api-atlasSearch-createClusterSearchDeployment` - Creates Search Nodes for the specified cluster.
* :ref:`atlas-api-atlasSearch-createClusterSearchIndex` - Creates one Atlas Search index on the specified collection.
* :ref:`atlas-api-atlasSearch-deleteClusterFtsIndex` - Removes one Atlas Search index that you identified with its unique ID.
* :ref:`atlas-api-atlasSearch-deleteClusterSearchDeployment` - Deletes the Search Nodes for the specified cluster.
* :ref:`atlas-api-atlasSearch-deleteClusterSearchIndex` - Removes one Atlas Search index that you identified with its unique ID.
* :ref:`atlas-api-atlasSearch-deleteIndexByName` - Removes one Atlas Search index that you identified with its database, collection, and name.
* :ref:`atlas-api-atlasSearch-getClusterFtsIndex` - Returns one Atlas Search index in the specified project.
* :ref:`atlas-api-atlasSearch-getClusterSearchDeployment` - Returns the Search Nodes for the specified cluster.
* :ref:`atlas-api-atlasSearch-getClusterSearchIndex` - Returns one Atlas Search index that you identified with its unique ID.
* :ref:`atlas-api-atlasSearch-getIndexByName` - Returns one Atlas Search index that you identified with its database, collection name, and index name.
* :ref:`atlas-api-atlasSearch-listClusterFtsIndex` - Returns all Atlas Search indexes on the specified collection.
* :ref:`atlas-api-atlasSearch-listClusterSearchIndexes` - Returns all Atlas Search indexes on the specified cluster.
* :ref:`atlas-api-atlasSearch-listSearchIndex` - Returns all Atlas Search indexes on the specified collection.
* :ref:`atlas-api-atlasSearch-updateClusterFtsIndex` - Updates one Atlas Search index that you identified with its unique ID.
* :ref:`atlas-api-atlasSearch-updateClusterSearchDeployment` - Updates the Search Nodes for the specified cluster.
* :ref:`atlas-api-atlasSearch-updateClusterSearchIndex` - Updates one Atlas Search index that you identified with its unique ID.
* :ref:`atlas-api-atlasSearch-updateIndexByName` - Updates one Atlas Search index that you identified with its database, collection name, and index name.


.. toctree::
   :titlesonly:

   createClusterFtsIndex </command/atlas-api-atlasSearch-createClusterFtsIndex>
   createClusterSearchDeployment </command/atlas-api-atlasSearch-createClusterSearchDeployment>
   createClusterSearchIndex </command/atlas-api-atlasSearch-createClusterSearchIndex>
   deleteClusterFtsIndex </command/atlas-api-atlasSearch-deleteClusterFtsIndex>
   deleteClusterSearchDeployment </command/atlas-api-atlasSearch-deleteClusterSearchDeployment>
   deleteClusterSearchIndex </command/atlas-api-atlasSearch-deleteClusterSearchIndex>
   deleteIndexByName </command/atlas-api-atlasSearch-deleteIndexByName>
   getClusterFtsIndex </command/atlas-api-atlasSearch-getClusterFtsIndex>
   getClusterSearchDeployment </command/atlas-api-atlasSearch-getClusterSearchDeployment>
   getClusterSearchIndex </command/atlas-api-atlasSearch-getClusterSearchIndex>
   getIndexByName </command/atlas-api-atlasSearch-getIndexByName>
   listClusterFtsIndex </command/atlas-api-atlasSearch-listClusterFtsIndex>
   listClusterSearchIndexes </command/atlas-api-atlasSearch-listClusterSearchIndexes>
   listSearchIndex </command/atlas-api-atlasSearch-listSearchIndex>
   updateClusterFtsIndex </command/atlas-api-atlasSearch-updateClusterFtsIndex>
   updateClusterSearchDeployment </command/atlas-api-atlasSearch-updateClusterSearchDeployment>
   updateClusterSearchIndex </command/atlas-api-atlasSearch-updateClusterSearchIndex>
   updateIndexByName </command/atlas-api-atlasSearch-updateIndexByName>
