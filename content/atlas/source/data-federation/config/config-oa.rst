.. _adf-configuration-file-adl:
.. _adf-configuration-file-oa:

====================
{+Online-Archive+}\s
====================

.. default-domain:: mongodb

.. facet::
   :name: genre
   :values: reference

.. meta:: 
   :keywords: Online Archive, configure federated database for Online Archives, federated database configuration settings for Online Archives


.. note::

   You can only use *new* {+Online-Archive+}\s as a data source in {+adf+}. Read the MongoDB blog post 
   `New Online Archive with Performance Improvements and Enhanced Metrics <https://www.mongodb.com/blog/post/new-online-archive-performance-improvements-enhanced-metrics>`__
   for more information.


{+adf+} supports |service| :ref:`online archives
<online-archive-overview>` as {+fdi+} stores. You must define mappings 
in your {+fdi+} storage configuration to your online archive to run
queries against your data. 

.. include:: /includes/fact-info-visible-internally.rst

.. _adf-oa-configuration-format:

Configuration Format
--------------------

To define a {+fdi+} store for an |service| Online Archive, you can 
specify the following |json| configuration parameters in your
:ref:`Federated Database Instance Configuration File <adf-setstorageconfig>`. 
The configuration contains the |service| online archive and maps it to virtual 
collections that you can query.

The following |json| configuration shows the format of the 
:ref:`adf-oa-stores-reference` and :ref:`adf-oa-databases-reference` 
configuration fields, which you must set in your {+FDI+} configuration 
file to define an |service| Online Archive as a {+fdi+} store: 

.. literalinclude:: /includes/data-federation/oa-config-format.json
   :language: json
   :linenos:

The JSON configuration for |service| Online Archive data stores contains 
two top-level objects: :ref:`adf-oa-stores-reference` and
:ref:`adf-oa-databases-reference`.


.. _adf-oa-stores-reference:

``stores``
~~~~~~~~~~
The stores object defines each data store associated with the {+fdi+}.
This store captures documents in an |service| Online Archive. 
Data Federation can only access data stores defined within 
the stores object.

The ``stores`` object contains the following fields:

.. literalinclude:: /includes/data-federation/oa-stores-config-format.json
   :language: json
   :linenos:

The following table describes the fields in the ``stores`` object:

.. list-table:: 
   :header-rows: 1
   :widths: 28 10 12 50

   * - Field 
     - Type 
     - Necessity 
     - Description

   * - .. datalakeconf-adl:: stores
     - array
     - required
     - Array of objects where each object represents a data store to 
       associate with the {+fdi+}. The {+fdi+} store references to an |service| 
       online archives. {+adf+} can only access data stores defined in
       the ``stores`` object.

   * - .. datalakeconf-adl:: stores.[n].name
     - string
     - required
     - Name of the {+fdi+} store. The :datalakeconf-adl:`databases.[n].collections.[n].dataSources.[n].storeName` 
       field references this value as part of mapping configuration.

   * - .. datalakeconf-adl:: stores.[n].provider
     - string
     - required
     - Cloud provider where the snapshot data is stored. Value must be 
       ``dls:<subtype>`` for a snapshot. {+adf+} supports the following
       subtypes:
   
       - ``aws``, for which the value must be ``dls:aws``

   * - .. datalakeconf-adl:: stores.[n].region
     - string
     - required
     - Region name of your online archive. Each store is associated with a
       single region, where the archived data is stored. If you have
       multiple online archives in different regions, you must add a store
       for each region to map data in that region to virtual databases and
       collection in {+fdi+}.

       To learn more about the supported regions for |aws|, see 
       :ref:`atlas-data-federation-regions`. 

.. _adf-oa-databases-reference:

``databases``
~~~~~~~~~~~~~

The databases object defines the mapping between each federated database 
instance store defined in stores and MongoDB collections in the databases.

The database object contains the following fields:

.. literalinclude:: /includes/data-federation/oa-databases-config-format.json
   :language: json
   :linenos:

The following table describes the fields in the database object:

.. list-table:: 
   :header-rows: 1
   :widths: 28 10 12 50

   * - Field 
     - Type 
     - Necessity 
     - Description
      
   * - .. datalakeconf-adl:: databases
     - array
     - required
     - Array of objects that define the mapping between each {+fdi+} 
       store defined in ``stores`` and online archives. Each object
       represents a database, its collections, and, optionally, any
       :manual:`views </core/views/>` on the collections. Each database 
       can have multiple ``collections`` and ``views`` objects.

   * - .. datalakeconf-adl:: databases.[n].name
     - string
     - required
     - Name of the database to which {+adf+} maps the data contained in the 
       data store. 

   * - .. datalakeconf-adl:: databases.[n].collections
     - array
     - required
     - Array of objects where each object represents a collection and data 
       sources that map to a :datalakeconf-adl:`stores` {+fdi+} store. 

   * - .. datalakeconf-adl:: databases.[n].collections.[n].name
     - string
     - required
     - Name of the collection to which {+adf+} maps the data contained in 
       each :datalakeconf-adl:`databases.[n].collections.[n].dataSources.[n].storeName`. 
       Each object in the array represents the mapping between the 
       collection and an object in the :datalakeconf-adl:`stores` array. 

       You can generate collection names dynamically by specifying ``*`` 
       for the collection name. To dynamically generate collection names, 
       you must also specify the following: 

       - :datalakeconf-adl:`databases.[n].collections.[n].dataSources.[n].datasetPrefix`
       - :datalakeconf-adl:`databases.[n].collections.[n].dataSources.[n].trimLevel`

       For wildcard collections, {+adf+} maps a dataset name to a 
       collection name first by splitting the :manual:`namespace 
       </reference/limits/#namespaces>` into a list of fields on the ``$`` 
       delimiter, then by trimming a number of fields from the left of the 
       list, and finally by combining the remaining fields using ``_``. 

   * - .. datalakeconf-adl:: databases.[n].collections.[n].dataSources 
     - array
     - required
     - Array of objects where each object represents a {+fdi+} store in the 
       :datalakeconf-adl:`stores` array to map with the collection. You can 
       specify multiple ``dataSources`` for a wildcard collection only if 
       all the ``dataSources`` for the collection map to the online archive 
       :datalakeconf-adl:`stores`.

   * - .. datalakeconf-adl:: databases.[n].collections.[n].dataSources.[n].storeName
     - string
     - required
     - Name of a {+fdi+} store to map to the ``<collection>``. Must match 
       the :datalakeconf-adl:`~stores.[n].name` of an object in the 
       :datalakeconf-adl:`stores` array. 

   * - .. datalakeconf-adl:: databases.[n].collections.[n].dataSources.[n].datasetName 
     - string
     - required
     - Name of the online archive dataset to map with the collection. The
       ``datasetName`` is in the following format:  

       .. code-block:: 

          <version>$<type>$<subtype>$<clusterName>$<dbName>$<collectionName>$<archiveId>


       For example, consider the following online archive name.
 
       .. code-block:: 
 
          v1$atlas$archive$clusterName$dbName$collections$archiveId
       
       Here: 
 
       - ``v1`` is the version 
       - ``atlas`` is the type of data source
       - ``archive`` is the subtype
       - ``clusterName`` is the name of the |service| cluster 
       - ``dbName`` is the name of the database on the |service| cluster 
       - ``collection`` is the the collections in the database 
       - ``archiveId`` is the unique identifier of the archived data 

       :gold:`IMPORTANT:` For a non-wildcard collection, you can't specify this option 
       if you specify the :datalakeconf-adl:`databases.[n].collections.[n].dataSources.[n].datasetPrefix` 
       option because {+adf+} automatically generates collections for the
       latest dataset using the name specified through
       :datalakeconf-adl:`databases.[n].collections.[n].dataSources.[n].datasetPrefix`
       option.

   * - .. datalakeconf-adl:: databases.[n].collections.[n].dataSources.[n].datasetPrefix 
     - string
     - Required for wildcard collections.
     - Dataset name prefix to match against the online archive dataset name.
       When you set this for wildcard collections, {+adf+} maps collections
       to only to the online archive dataset names whose prefix match the
       value specified here.

       If you specify this setting for a non-wildcard collection, {+adf+} maps only
       the latest dataset (for the most recently captured snapshot) to the
       collection. You can't specify the
       :datalakeconf-adl:`databases.[n].collections.[n].dataSources.[n].datasetName`
       also if you specify this option for a non-wildcard collection.
       
       For example: 
       
       .. code-block:: sh 
          :copyable: false 
 
          {
            ...,
            "name": "myFederatedDbCollection",
            "dataSources": [
            {
               "storeName": "aws-dl-store",
               "datasetPrefix": "v1$atlas$archive$MyCluster$MyDB$MyArchiveId"
               }
             ]
          }

   * - .. datalakeconf-adl:: databases.[n].collections.[n].dataSources.[n].trimLevel
     - integer
     - required
     - Unsigned integer that specifies how many fields of the dataset name 
       to trim from the left of the dataset name before mapping the 
       remaining fields to a wildcard collection name. Value must be 
       greater than ``0`` and less than ``7``. You can set this setting for
       wildcard collections only. 
         
       You can't configure this setting using the Visual Editor in the 
       |service| UI. Therefore, this setting defaults to trim level ``5`` 
       for configurations using the Visual Editor.

   * - .. datalakeconf-adl:: databases.[n].collections.[n].dataSources.[n].provenanceFieldName 
     - string
     - required
     - Name for the field that includes the provenance of the documents in
       the results. If you specify this setting in the storage
       configuration, {+adf+} returns the following fields for each document
       in the result: 

       .. list-table:: 
          :widths: 20 80
          :header-rows: 1
       
          * - Field Name 
            - Description
       
          * - ``provider``
            - Provider (:datalakeconf-adl:`stores.[n].provider`)
              in the {+fdi+} storage configuration 
       
          * - ``clusterName``
            - Name of the |service| cluster
       
          * - ``databaseName``
            - Name of the database on the |service| cluster
      
          * - ``collectionName``
            - Name of the collection 
       
          * - ``snapshotID``
            - Unique 24-hexadecimal character string that identifies the
              snapshot 
      
          * - ``dataSetName``
            - Name of the online archive dataset (:datalakeconf-adl:`databases.[n].collections.[n].dataSources.[n].datasetName`) 

       You can't configure this setting using the Visual Editor in the 
       |service| UI. 

   * - .. datalakeconf-adl:: databases.[n].collections.[n].dataSources.[n].maxDatasets
     - integer
     - required
     - Unsigned integer that specifies the maximum number of datasets from
       which to dynamically generate collections for the data source. You must
       provide a value greater than ``0``. You can set this setting for wildcard
       collections only. {+adf+} returns datasets in reverse lexicographical
       order. 

       :gold:`IMPORTANT:` You can't configure this setting using the Visual 
       Editor in the |service| UI. Therefore, {+adf+} configuration doesn't 
       include a limit on the number of datasets for configurations using
       the Visual Editor. 

Example Configuration for |service| {+Online-Archive+} Data Store
-----------------------------------------------------------------

Consider an |service| online archive backed by |aws| with the
following ID:

.. code-block::

   v1$atlas$archive$V3metrics$hardware$69437250-b9da-4ae9-a1cd-8811462c38a4$64679f7c09f07374b4dcc914

The online archive contains the archived data from the  
``metrics.hardware`` in an |service| cluster. The following
configuration:

- Specifies the |service| online archive in the ``us-east-1`` |aws|
  region as a {+fdi+} store. 

- Maps documents from the |service| online archive to the
  ``dataCenter.inventory``
  collection in the storage configuration.

.. code-block:: json 

   {
     "stores" : [
     {
       "name" : "atlasOnlineArchiveStore",
       "provider" : "dls:aws",
       "region" : "us-east-1"
       }
     ],
     "databases" : [ 
      {
        "name" : "dataCenter", 
        "collections" : [
        {
          "name" : "inventory",
          "dataSources" : [
          {
            "storeName" : "atlasOnlineArchiveStore",
            "datasetName" : "v1$atlas$archive$V3metrics$hardware$69437250-b9da-4ae9-a1cd-8811462c38a4$64679f7c09f07374b4dcc914",
            "provider" : "dls:aws"
            }
          ]
        }
       ]
      }
     ]
    }


.. note::
       
   Since |aws| backs the online archive, the ``provider`` is set to
   ``dls:aws`` in the example. If |azure| backed the online archive,
   the ``provider`` would be ``dls:azure``.
  

{+adf+} maps all the documents in the online archive
to the ``dataCenter.inventory`` collection in the storage 
configuration.

Users connected to the {+fdi+} can use the MongoDB Query Language 
and supported aggregations to analyze data in the |service| cluster 
through the ``dataCenter.inventory`` collection.