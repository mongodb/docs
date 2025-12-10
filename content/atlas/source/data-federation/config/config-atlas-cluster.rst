.. _adf-configuration-file-atlas:

=================
|service| Cluster
=================

.. meta::
   :description: Configure Atlas Data Federation to map Atlas cluster data for querying using federated database instances.

.. default-domain:: mongodb



{+adf+} supports |service| clusters as {+fdi+} stores. You must define 
mappings in your {+fdi+} to your |service| cluster to run queries 
against your data.

.. include:: /includes/fact-info-visible-internally.rst

.. _adf-atlas-configuration-format:

Configuration Format
--------------------

To define a {+fdi+} store for an |service| cluster, you can 
specify the following |json| configuration parameters in your 
:ref:`Federated Database Instance Configuration File <adf-setstorageconfig>`.
The configuration contains the |service| cluster and maps it to virtual 
collections that you can query.

The following |json| configuration shows the format of the 
:ref:`adf-atlas-stores-reference` and :ref:`adf-atlas-databases-reference` 
configuration fields, which you must set in your {+FDI+} configuration file
to define an {+service+} cluster as a {+fdi+} store: 


.. literalinclude:: /includes/data-federation/atlas-config-format.json
   :language: json
   :linenos:

The JSON configuration for an |service| cluster contains two top-level 
objects: :ref:`adf-atlas-stores-reference` and :ref:`adf-atlas-databases-reference` 


.. _adf-atlas-stores-reference:

``stores``
~~~~~~~~~~

The ``stores`` object defines each data store associated with the 
{+fdi+}. This store captures documents in the |service| 
cluster. {+FDI+}s can only access data stores defined in the ``stores`` 
object.

.. literalinclude:: /includes/data-federation/atlas-stores-config-format.json
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
 
   * - .. datalakeconf-atlas:: stores
     - array
     - required
     - Array of objects where each object represents a data store to 
       associate with the {+fdi+}. The {+fdi+} store captures documents in the 
       |service| cluster. {+adf+} can only access data stores 
       defined in the ``stores`` object.

   * - .. datalakeconf-atlas:: stores.[n].name
     - string
     - required
     - Name of the {+fdi+} store. The :datalakeconf-atlas:`databases.[n].collections.[n].dataSources.[n].storeName`
       field references this value as part of mapping configuration.

   * - .. datalakeconf-atlas:: stores.[n].provider
     - string
     - required
     - Defines where the data is stored. Value must be ``atlas`` for a 
       collection in an |service| cluster.

   * - .. datalakeconf-atlas:: stores.[n].clusterName 
     - string
     - required
     - Name of the |service| cluster on which the store is based. The 
       cluster must exist in the same project as your {+fdi+}. The 
       ``source`` field on the data partition is the name of the |service| 
       cluster.

   * - .. datalakeconf-atlas:: stores.[n].projectId 
     - string
     - required
     - Unique identifier of the project that contains the |service| 
       cluster on which the store is based.

   * - .. datalakeconf-atlas:: stores.[n].readPreference 
     - boolean
     - optional
     - Cluster :manual:`read preference 
       </core/read-preference/>`, which describes how to route read 
       requests to the cluster.

       For example: 

       The following ``readPreference`` setting specifies ``secondary`` :manual:`mode 
       </core/read-preference/#std-label-read-pref-modes-summary>` and 
       ``ANALYTICS`` :ref:`nodeType <repl-set-node-types>`.

       .. code-block:: json 
          :copyable: false 
          :emphasize-lines: 9-20
 
          { 
             ... 
             "stores": [
               {
                 "provider": "atlas",
                 "clusterName": <CLUSTER_NAME>,
                 "name": <STORE_NAME>,
                 "projectId": <PROJECT_ID>,
                 "readPreference": {
                   "mode": "secondary",
                   "tagSets": [
                     [
                       {
                         "name": "nodeType",
                         "value": "ANALYTICS"
                       }
                     ],
                     ...
                   ]
                 }
               }
             ]
           }

   * - .. datalakeconf-atlas:: stores.[n].readPreference.mode 
     - string
     - optional
     - :manual:`Read preference mode 
       </core/read-preference/#read-preference-modes>` that specifies which 
       replica set member to route the read requests to. Value can be one 
       of the following: 

       .. include:: /includes/data-federation/fact-read-preference-modes.rst

       If omitted, defaults to ``local``.
         
   * - .. datalakeconf-atlas:: stores.[n].readPreference.tagSets
     - array
     - optional
     - Arrays of :manual:`tag sets 
       </core/read-preference-tags/>` or tag specification documents that 
       contain name and value pairs for the replica set member. If 
       specified, {+adf+} routes read requests to replica set member or 
       members that are associated with the specified tags. To learn more, 
       :manual:`Read Preference Tag Sets </core/read-preference-tags/>`.

       :gold:`IMPORTANT:` {+adf+} doesn't support ``tagSets`` for sharded 
       clusters.
         
   * - .. datalakeconf-atlas:: stores.[n].readPreference.maxStalenessSeconds
     - string
     - optional
     - Maximum replication lag, or "staleness", for reads from 
       secondaries. To learn more about ``maxStalenessSeconds``, see 
       :manual:`Read Preference maxStalenessSeconds </core/read-preference-staleness/>`.

   * - .. datalakeconf-atlas:: stores.[n].readConcern
     - string
     - optional
     - Consistency and isolation properties of the data read 
       from an |service| {+cluster+}. To learn more, see :manual:`Read Concern 
       </reference/read-concern/>`. The value for the level of consistency
       and availability can be one of the following: 

       .. include:: /includes/data-federation/fact-read-concern-levels.rst


.. _adf-atlas-databases-reference:

``databases``
~~~~~~~~~~~~~

The ``databases`` object defines the mapping between each
{+fdi+} store defined in ``stores`` and MongoDB collections 
in the databases.

.. literalinclude:: /includes/data-federation/atlas-databases-config-format.json
   :language: json
   :linenos:

The following table describes the fields in the ``databases`` object:

.. list-table:: 
   :header-rows: 1
   :widths: 28 10 12 50

   * - Field 
     - Type 
     - Necessity 
     - Description
    
   * - .. datalakeconf-atlas:: databases
     - array
     - required
     - Array of objects where each object represents a database, its 
       collections, and, optionally, any :manual:`views </core/views/>` on 
       the collections. Each database can have multiple ``collections`` and 
       ``views`` objects.

   * - .. datalakeconf-atlas:: databases.[n].name
     - string
     - required
     - Name of the database to which {+adf+} maps the data contained in the 
       data store. You can generate databases dynamically by specifying 
       ``*`` for the database name. Dynamically generated databases:

       - Can exist alongside explicitly defined databases. However, {+adf+} 
         won't dynamically generate databases with names that conflict with 
         explicitly defined databases in the storage configuration.
       - Can only be from a single |service| cluster. {+adf+} won't 
         dynamically generate databases from multiple |service| clusters or 
         other data stores.

   * - .. datalakeconf-atlas:: databases.[n].collections
     - array
     - required
     - Array of objects where each object represents a collection and data 
       sources that map to a :datalakeconf-atlas:`stores` {+fdi+} store. 
       For dynamically generated databases, you can define only one 
       wildcard (``*``) collection object in the storage configuration.

   * - .. datalakeconf-atlas:: databases.[n].collections.[n].name
     - string
     - required
     - Name of the collection to which {+adf+} maps the data contained in 
       each :datalakeconf-atlas:`databases.[n].collections.[n].dataSources.[n].storeName`. 
       Each object in the array represents the mapping between the 
       collection and an object in the :datalakeconf-atlas:`stores` array. 

       You can generate collection names dynamically by specifying ``*`` 
       for the collection name and omitting the
       :datalakeconf-atlas:`~databases.[n].collections.[n].dataSources.[n].collection` 
       field. To dynamically generate wildcard (``*``) collections for 
       dynamically generated wilcard (``*``) databases, specify the 
       :datalakeconf-atlas:`databases.[n].collections.[n].dataSources.[n].storeName` 
       option and omit the :datalakeconf-atlas:`databases.[n].collections.[n].dataSources.[n].database` 
       option. Note that for dynamically generated databases, you can 
       define only one wildcard (``*``) collection object in the storage 
       configuration.
         
       For wildcard (``*``) collections, you can also define regex patterns 
       using :datalakeconf-atlas:`databases.[n].collections.[n].dataSources.[n].collectionRegex` 
       field to filter the collections only. 

   * - .. datalakeconf-atlas:: databases.[n].collections.[n].dataSources 
     - array
     - required
     - Array of objects where each object represents a 
       :datalakeconf-atlas:`stores` {+fdi+} store to map with the 
       collection.

   * - .. datalakeconf-atlas:: databases.[n].collections.[n].dataSources.[n].storeName
     - string
     - required
     - Name of a {+fdi+} store to map to the ``<collection>``. 
       Must match the :datalakeconf-atlas:`~stores.[n].name` of an object in the 
       :datalakeconf-atlas:`stores` array. 

   * - .. datalakeconf-atlas:: databases.[n].collections.[n].dataSources.[n].database 
     - string
     - required
     - Name of the database on the |service| cluster that contains the 
       collection. You must omit this setting to: 
   
       - Create a wildcard (``*``) collection for a wilcard (``*``) database.
       - Glob multiple databases.

   * - .. datalakeconf-atlas:: databases.[n].collections.[n].dataSources.[n].databaseRegex
     - string
     - optional
     - Regex pattern to use for globbing databases to combine
       multiple collections. If you specify this option, the {+fdi+}
       instance contains a single database with collections from multiple
       databases. For globbing databases, you must do the following:
   
       - Omit the
         :datalakeconf-atlas:`~databases.[n].collections.[n].dataSources.[n].database` 
         field. 
       - Specify a valid name for the
         :datalakeconf-atlas:`databases.[n].collections.[n].dataSources.[n].collection`
         field. 

       Suppose you have 2 databases named ``foo`` and ``bar`` that each
       have a collection named ``Sales``. You can combine the ``Sales``
       collection from ``foo`` and ``bar`` using the ``databaseRegex``
       option in your storage configuration:
 
       .. code-block:: json 
          :copyable: false 
 
          {
            "databases": [
              {
                "name": "Transactions",
                "collections": [
                  {
                    "name": "AllSales",
                    "dataSources": [
                      {
                        "storeName": "atlasStore",
                        "databaseRegex": ".*",
                        "collection": "Sales"
                      }
                    ]
                  } 
                ]
              }
            ]
          }

         For the preceding :datalakeconf-atlas:`databases` object, {+adf+}
         generates the following in your {+fdi+}: 

         - A virtual database named ``Transactions``.
         - A virtual collection named ``AllSales`` that contains data from
           the collection named ``Sales`` in all the databases whose name
           match the regex pattern specified in the ``databaseRegex`` 
           option.
       
       If you specify this option, you must specify the name of
       the collection. You can't specify this option for wildcard collections.

   * - .. datalakeconf-atlas:: databases.[n].collections.[n].dataSources.[n].collection 
     - string
     - required
     - Name of the collection in the |service| cluster on which the {+fdi+} 
       store is based. You must omit this setting for: 
         
       - Creating a wildcard (``*``) collection.
       - Creating wildcard collection names that match regex patterns.
       - Combining multiple collections in a database using regex patterns.

   * - .. datalakeconf-atlas:: databases.[n].collections.[n].dataSources.[n].collectionRegex
     - string
     - Optional for wildcard collections
       Required for combining collections in a database 
     - Regex pattern to use for creating the wildcard (``*``) 
       collection or for combining mulitple collections in a database. 
               
       To use regex patterns for wildcard (``*``) collection names, you
       must do the following:

       - Specify wildcard (``*``) as the value for
         :datalakeconf-atlas:`databases.[n].collections.[n].name`.
       - Omit :datalakeconf-atlas:`databases.[n].collections.[n].dataSources.[n].collection`.

       If you specify this field for generating wildcard collections, the
       {+fdi+} instance only contains collections with names that match the
       specified regular expression. The collections in the {+fdi+} storage
       configuration use their original names in the |service| cluster.
       
       To use regex patterns for combining multiple collections in a 
       database, you must do the following:

       - Specify a name that isn't the wildcard (``*``) as the value for 
         :datalakeconf-atlas:`databases.[n].collections.[n].name`.
       - Omit :datalakeconf-atlas:`databases.[n].collections.[n].dataSources.[n].collection`.

       If you specify this field for combining multiple collections, the
       collection in the {+fdi+} contains data from all the
       |service| collections with names that match the specified regular
       expression. The collection in the {+fdi+} storage configuration uses 
       the name that you specify as value for 
       :datalakeconf-atlas:`databases.[n].collections.[n].name`. 
     
       To learn more about the regex syntax, see `Go programming language 
       <https://golang.org/pkg/regexp/>`__.

   * - .. datalakeconf-atlas:: databases.[n].collections.[n].dataSources.[n].provenanceFieldName
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
             - Provider (:datalakeconf-atlas:`stores.[n].provider`) in the
               {+fdi+} storage configuration 
 
           * - ``clusterName``
             - Name of the |service| cluster
               (:datalakeconf-atlas:`stores.[n].clusterName`) 
       
           * - ``databaseName`` 
             - Name of the database
               (:datalakeconf-atlas:`databases.[n].collections.[n].dataSources.[n].database`)
               in the |service| cluster 
       
           * - ``collectionName`` 
             - Name of the collection
               (:datalakeconf-atlas:`databases.[n].collections.[n].name`) 

       You can't configure this setting using the Visual Editor in the 
       |service| UI.

   * - .. datalakeconf-atlas:: databases.[n].views 
     - array
     - required
     - Array of objects where each object represents an 
       :manual:`aggregation pipeline </core/aggregation-pipeline/#id1>` on 
       a collection. To learn more about views, see :manual:`Views 
       </core/views/>`.

   * - .. datalakeconf-atlas:: databases.[n].views.[n].name 
     - string
     - required
     - Name of the view. 

   * - .. datalakeconf-atlas:: databases.[n].views.[n].source 
     - string
     - required
     - Name of the source collection for the view. If you want to create a
       view with a :ref:`$sql <adf-sql-stage>` stage, you must omit this field
       as the SQL statement will specify the source collection.

   * - .. datalakeconf-atlas:: databases.[n].views.[n].pipeline 
     - string
     - required
     - :manual:`Aggregation pipeline stage(s) 
       </core/aggregation-pipeline/#id1>` to apply to the 
       :datalakeconf-atlas:`~databases.[n].views.[n].source` collection. You 
       can also create views using the :ref:`$sql <adf-sql-stage>` stage.


Example Configuration for |service| Data Store
----------------------------------------------

Consider a ``M10`` or higher |service| cluster named 
``myDataCenter`` containing data in the ``metrics.hardware`` 
collection. The ``metrics.hardware`` collection contains JSON 
documents with metrics derived from the hardware in a datacenter. 
The following configuration:

- Specifies the |service| cluster named ``myDataCenter`` in the 
  specified project as a {+fdi+} store.
- Maps documents from the ``metrics.hardware`` collection in the 
  |service| cluster to the ``dataCenter.inventory`` collection in 
  the storage configuration.

.. code-block:: json 

   {
    "stores" : [
          {
             "name" : "atlasClusterStore",
             "provider" : "atlas",
             "clusterName" : "myDataCenter",
             "projectId" : "5e2211c17a3e5a48f5497de3"
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
                    "storeName" : "atlasClusterStore",
                    "database" : "metrics",
                    "collection" : "hardware"
                  }
                ]
              }
            ]
          }
        ]
      }

   {+adf+} maps all the documents in the ``metrics.hardware`` 
   collection to the ``dataCenter.inventory`` collection in the storage 
   configuration.

   Users connected to the {+fdi+} can use the MongoDB Query Language 
   and supported aggregations to analyze data in the |service| cluster 
   through the ``dataCenter.inventory`` collection. When you run 
   queries, the query first goes to {+adf+}. Therefore, if you run 
   aggregation queries that are supported by your |service| cluster but 
   not by {+adf+}, the queries will fail. To learn more about supported 
   and unsupported commands in {+df+}, see :ref:`adf-mql-support`.


.. seealso::
   - :ref:`query-atlas`
   - :ref:`Configure Atlas Data Federation <adf-configuration-file-atlas>` 
   - `Tutorial: Federated Queries and $out to S3 
     <https://www.mongodb.com/developer/products/atlas/atlas-data-lake-federated-queries-out-aws-s3/>`__
