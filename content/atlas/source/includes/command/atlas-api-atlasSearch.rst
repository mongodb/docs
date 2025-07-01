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

`experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns, adds, edits, and removes Atlas Search indexes for the specified cluster.

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

* :ref:`atlas-api-atlasSearch-createAtlasSearchDeployment` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Creates Search Nodes for the specified cluster.
* :ref:`atlas-api-atlasSearch-createAtlasSearchIndex` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Creates one Atlas Search index on the specified collection.
* :ref:`atlas-api-atlasSearch-createAtlasSearchIndexDeprecated` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Creates one Atlas Search index on the specified collection.
* :ref:`atlas-api-atlasSearch-deleteAtlasSearchDeployment` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Deletes the Search Nodes for the specified cluster.
* :ref:`atlas-api-atlasSearch-deleteAtlasSearchIndex` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Removes one Atlas Search index that you identified with its unique ID.
* :ref:`atlas-api-atlasSearch-deleteAtlasSearchIndexByName` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Removes one Atlas Search index that you identified with its database, collection, and name.
* :ref:`atlas-api-atlasSearch-deleteAtlasSearchIndexDeprecated` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Removes one Atlas Search index that you identified with its unique ID.
* :ref:`atlas-api-atlasSearch-getAtlasSearchDeployment` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Return the Search Nodes for the specified cluster.
* :ref:`atlas-api-atlasSearch-getAtlasSearchIndex` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns one Atlas Search index that you identified with its unique ID.
* :ref:`atlas-api-atlasSearch-getAtlasSearchIndexByName` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns one Atlas Search index that you identified with its database, collection name, and index name.
* :ref:`atlas-api-atlasSearch-getAtlasSearchIndexDeprecated` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns one Atlas Search index in the specified project.
* :ref:`atlas-api-atlasSearch-listAtlasSearchIndexes` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns all Atlas Search indexes on the specified collection.
* :ref:`atlas-api-atlasSearch-listAtlasSearchIndexesCluster` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns all Atlas Search indexes on the specified cluster.
* :ref:`atlas-api-atlasSearch-listAtlasSearchIndexesDeprecated` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Returns all Atlas Search indexes on the specified collection.
* :ref:`atlas-api-atlasSearch-updateAtlasSearchDeployment` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Updates the Search Nodes for the specified cluster.
* :ref:`atlas-api-atlasSearch-updateAtlasSearchIndex` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Updates one Atlas Search index that you identified with its unique ID.
* :ref:`atlas-api-atlasSearch-updateAtlasSearchIndexByName` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Updates one Atlas Search index that you identified with its database, collection name, and index name.
* :ref:`atlas-api-atlasSearch-updateAtlasSearchIndexDeprecated` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Updates one Atlas Search index that you identified with its unique ID.


.. toctree::
   :titlesonly:

   createAtlasSearchDeployment </command/atlas-api-atlasSearch-createAtlasSearchDeployment>
   createAtlasSearchIndex </command/atlas-api-atlasSearch-createAtlasSearchIndex>
   createAtlasSearchIndexDeprecated </command/atlas-api-atlasSearch-createAtlasSearchIndexDeprecated>
   deleteAtlasSearchDeployment </command/atlas-api-atlasSearch-deleteAtlasSearchDeployment>
   deleteAtlasSearchIndex </command/atlas-api-atlasSearch-deleteAtlasSearchIndex>
   deleteAtlasSearchIndexByName </command/atlas-api-atlasSearch-deleteAtlasSearchIndexByName>
   deleteAtlasSearchIndexDeprecated </command/atlas-api-atlasSearch-deleteAtlasSearchIndexDeprecated>
   getAtlasSearchDeployment </command/atlas-api-atlasSearch-getAtlasSearchDeployment>
   getAtlasSearchIndex </command/atlas-api-atlasSearch-getAtlasSearchIndex>
   getAtlasSearchIndexByName </command/atlas-api-atlasSearch-getAtlasSearchIndexByName>
   getAtlasSearchIndexDeprecated </command/atlas-api-atlasSearch-getAtlasSearchIndexDeprecated>
   listAtlasSearchIndexes </command/atlas-api-atlasSearch-listAtlasSearchIndexes>
   listAtlasSearchIndexesCluster </command/atlas-api-atlasSearch-listAtlasSearchIndexesCluster>
   listAtlasSearchIndexesDeprecated </command/atlas-api-atlasSearch-listAtlasSearchIndexesDeprecated>
   updateAtlasSearchDeployment </command/atlas-api-atlasSearch-updateAtlasSearchDeployment>
   updateAtlasSearchIndex </command/atlas-api-atlasSearch-updateAtlasSearchIndex>
   updateAtlasSearchIndexByName </command/atlas-api-atlasSearch-updateAtlasSearchIndexByName>
   updateAtlasSearchIndexDeprecated </command/atlas-api-atlasSearch-updateAtlasSearchIndexDeprecated>

