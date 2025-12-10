.. _adf-configuration-file-azure:

==================
Azure Blob Storage  
==================

.. meta::
   :description: Configure Azure Blob Storage containers as federated database instance stores in Atlas Data Federation to run queries on your data.

.. default-domain:: mongodb


.. _aws-configuration-file-overview:

{+adf+} supports |azure| Blob Storage containers as {+fdi+} stores. You
must define mappings in your {+fdi+} to your {+az-bs+} containers to run queries
against your data. 

.. note:: 

   While we refer to blobs as files and delimiter-separated prefixes as
   directories in this page, these blob storage services are not actually
   file systems and don't have the same behaviors in all cases as files
   on a hard drive.

.. _adf-azure-configuration-format:

Configuration File Format
-------------------------

To define a federated database instance store for an {+az-bs+} container,  
you can specify the configuration parameters in JSON format. The configuration
contains the {+az-bs+} data store and maps it to virtual collections that you 
can query.

The JSON configuration for data in {+az-bs+} containers uses the following
fields:

.. literalinclude:: /includes/data-federation/azure-config-format.json
   :language: json
   :linenos:

The JSON configuration for an {+az-bs+} contains two top-level objects: 
:ref:`adf-azure-stores-reference` and :ref:`adf-azure-databases-reference`


.. _adf-azure-stores-reference:

``stores``
~~~~~~~~~~
The ``stores`` object defines each data store associated with the 
{+fdi+}. The {+fdi+} store captures files in a {+az-bs+} container.
{+df+} can only access data stores defined in the ``stores`` object. 

The ``stores`` object contains the following fields:

.. literalinclude:: /includes/data-federation/azure-stores-config-format.json
   :language: json
   :linenos:

The following table describes the fields in the stores object:

.. list-table:: 
   :header-rows: 1
   :widths: 28 10 12 50

   * - Field 
     - Type 
     - Necessity 
     - Description
  
   * - .. datalakeconf-azure:: stores
     - array
     - required
     - Array of objects where each object represents a data store to 
       associate with the {+fdi+}. The {+fdi+} store captures: 
       
       - Files in an {+az-bs+} container
       - Documents in an |service| cluster
       - Files stored at publicly accessible |url|\s. 
       
       {+adf+} can only access data stores 
       defined in the ``stores`` object.

   * - .. datalakeconf-azure:: stores.[n].name
     - string
     - required
     - Name of the {+fdi+} store. The 
       :datalakeconf-azure:`databases.[n].collections.[n].dataSources.[n].storeName` 
       field references this value as part of mapping configuration.

   * - .. datalakeconf-azure:: stores.[n].provider
     - string
     - required
     - Defines where the data is stored. Value must be ``azure`` for an
       {+az-bs+} container. 

   * - .. datalakeconf-azure:: stores.[n].region
     - string
     - required
     - Name of the |azure| region in which the data is stored. 

   * - .. datalakeconf-azure:: stores.[n].serviceURL
     - string
     - required
     - URL of the {+az-bs+} account that contains your blob containers. The
       ``serviceURL`` must be in the following format:
       
       .. code-block:: shell
           :copyable: false 
           
             https://<storage-account-name>.blob.core.windows.net/

       where ``storage-account-name`` is the name of your {+az-bs+} account. 

   * - .. datalakeconf-azure:: stores.[n].containerName
     - string
     - required
     - Name of the {+az-bs+} container that contains the files. 

   * - .. datalakeconf-azure:: stores.[n].prefix
     - string
     - optional
     - Prefix {+adf+} applies when searching for files in the 
       {+az-bs+}. 

       For example, consider an an {+az-bs+} container ``metrics`` with
       the following structure:

       .. code-block:: text
          :copyable: false

               metrics
               |--hardware
               |--software
                  |--computed

       The {+fdi+} store prepends the value of ``prefix`` to the
       :datalakeconf-azure:`databases.[n].collections.[n].dataSources.[n].path` 
       to create the full path for files to ingest. Setting the ``prefix`` 
       to ``/software`` restricts any :datalakeconf-azure:`databases` objects 
       using the {+fdi+} store to only subpaths ``/software``.

       If omitted, {+adf+} searches all files from the root of the
       {+az-bs+} container. 

   * - .. datalakeconf-azure:: stores.[n].delimiter
     - string
     - optional
     - The delimiter that separates 
       :datalakeconf-azure:`databases.[n].collections.[n].dataSources.[n].path` 
       segments in the {+fdi+} store. {+df+} uses the delimiter to 
       efficiently traverse {+az-bs+} containers with a hierarchical 
       directory structure. 
   
       If omitted, defaults to ``"/"``.

   * - .. datalakeconf-azure:: stores.[n].public
     - boolean
     - optional
     - Specifies whether the {+az-bs+} container is public. 

       If set to ``true``, {+adf+} doesn't use the configured |azure|
       Service Principal to access your {+az-bs+}. If set to ``false``, the
       configured Service Principal must include permissions to access the
       blob container, even if that blob container is public.

       If omitted, defaults to ``false``.

.. _adf-azure-databases-reference:

``databases``
~~~~~~~~~~~~~

The ``databases`` object defines the mapping between each
{+fdi+} store defined in ``stores`` and MongoDB collections 
in the databases. 

The ``databases`` object contains the following fields:

.. literalinclude:: /includes/data-federation/azure-databases-config-format.json
   :language: json
   :linenos:

The following table describes the fields in the databases object:

.. list-table:: 
   :header-rows: 1
   :widths: 28 10 12 50

   * - Field 
     - Type 
     - Necessity 
     - Description

   * - .. datalakeconf-azure:: databases
     - array
     - required
     - Array of objects where each object represents a database, its 
       collections, and, optionally, any :manual:`views </core/views/>` on 
       the collections. Each database can have multiple ``collections`` and 
       ``views`` objects.

   * - .. datalakeconf-azure:: databases.[n].name
     - string
     - required
     - Name of the database to which {+adf+} maps the data contained in the 
       data store.

   * - .. datalakeconf-azure:: databases.[n].collections
     - array
     - required
     - Array of objects where each object represents a collection and data 
       sources that map to a :datalakeconf-azure:`stores` {+fdi+} store. 

   * - .. datalakeconf-azure:: databases.[n].collections.[n].name
     - string
     - required
     - Name of the collection to which {+adf+} maps the data contained in 
       each :datalakeconf-azure:`databases.[n].collections.[n].dataSources.[n].storeName`. 
       Each object in the array represents the mapping between the 
       collection and an object in the :datalakeconf-azure:`stores` array. 

       You can generate collection names dynamically from file paths by 
       specifying ``*`` for the collection name and the 
       ``collectionName()`` function in the 
       :datalakeconf-azure:`~databases.[n].collections.[n].dataSources.[n].path`
       field.

   * - .. datalakeconf-azure:: databases.[n].collections.[n].dataSources
     - array
     - required
     - Array of objects where each object represents a 
       :datalakeconf-azure:`stores` {+fdi+} store to map with the 
       collection.

   * - .. datalakeconf-azure:: databases.[n].collections.[n].dataSources.[n].storeName
     - string
     - required
     - Name of a {+fdi+} store to map to the ``<collection>``. 
       Must match the :datalakeconf-azure:`~stores.[n].name` of an object in 
       the :datalakeconf-azure:`stores` array. 

   * - .. datalakeconf-azure:: databases.[n].collections.[n].dataSources.[n].path
     - string
     - required
     - Controls how {+adf+} searches for and parses files in the
       :datalakeconf-azure:`~databases.[n].collections.[n].dataSources.[n].storeName` 
       before mapping them to the ``<collection>``. {+adf+} prepends the 
       :datalakeconf-azure:`stores.[n].prefix` to the ``path`` to build the 
       full path to search within. Specify ``/`` to capture all files and 
       directories from the ``prefix`` path.

       For example, consider an {+az-bs+} container ``metrics`` with the
       following structure:

       .. code-block:: text
          :copyable: false

           metrics
             |--hardware
               |--software
                 |--computed

       A ``path`` of ``/`` directs {+adf+} to search all files and directories
       in the ``metrics`` bucket.
 
       A ``path`` of ``/hardware`` directs {+adf+} to search only that path 
       for files to ingest.

       If the :datalakeconf-azure:`~stores.[n].prefix` is ``software``, {+adf+} 
       searches for files only in the path ``/software/computed``.

       Appending the ``*`` wildcard character to the path directs {+adf+} 
       to include all files and directories from that point in the path. For 
       example, ``/software/computed*`` would match files like 
       ``/software/computed-detailed``, ``/software/computedArchive``, and 
       ``/software/computed/errors``.

       :datalakeconf-azure:`~databases.[n].collections.[n].dataSources.[n].path`
       supports additional syntax for parsing filenames, including:

       - Generating document fields from filenames.
       - Using regular expressions to control field generation.
       - Setting boundaries for bucketing filenames by timestamp.
       
       See :ref:`adf-path-syntax` for more information.

       .. include:: /includes/data-federation/fact-path-delimiter.rst

   * - .. datalakeconf-azure:: databases.[n].collections.[n].dataSources.[n].defaultFormat
     - string
     - optional
     - Default format that Data Federation assumes if it encounters a file 
       without an extension while searching the 
       :datalakeconf-azure:`databases.[n].collections.[n].dataSources.[n].storeName`.

       The following values are valid for the defaultFormat field:

       ``.json``
       ``.json.gz``
       ``.bson``
       ``.bson.gz``
       ``.avro``
       ``.avro.gz``
       ``.orc``
       ``.tsv``
       ``.tsv.gz``
       ``.csv``
       ``.csv.gz``
       ``.parquet``

       For more information, see :ref:`adf-data-formats`

   * - .. datalakeconf-azure:: databases.[n].collections.[n].dataSources.[n].provenanceFieldName
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
            - Provider (:datalakeconf-azure:`stores.[n].provider`) in the
              {+fdi+} storage configuration.

          * - ``region``
            - |azure| region (:datalakeconf-azure:`stores.[n].region`).

          * - ``serviceURL``
            - |url| of the {+az-bs+} account that contains your blob
              containers (:datalakeconf-azure:`stores.[n].serviceURL`). 
              
          * - ``containerName`` 
            - Name of the {+az-bs+} container (:datalakeconf-azure:`stores.[n].containerName`)
              
          * - ``key`` 
            - Path
              (:datalakeconf-azure:`databases.[n].collections.[n].dataSources.[n].path`) 
              to the file.

              :gold:`IMPORTANT:` You can't configure this setting using the 
              Visual Editor in the |service| UI.

   * - .. datalakeconf-azure:: databases.[n].collections.[n].dataSources.[n].omitAttributes
     - boolean
     - required 
     - Flag that specifies whether to omit the attributes (key and value
       pairs) that {+adf+} adds to the collection. You can specify one of the
       following values: 

       - ``false`` - to add the attributes 
       - ``true`` - to omit the attributes

       If omitted, defaults to ``false`` and {+adf+} adds the attributes. 

       **For example:**
       Consider a file named ``/employees/949-555-0195.json`` for which
       you configure the :datalakeconf-aws:`~databases.[n].collections.[n].dataSources.[n].path`
       ``/employees/{phone string}``. {+adf+} adds the attribute ``phone:
       949-555-0195`` to the document if you set ``omitAttributes`` to
       ``false``. If you set ``omitAttributes`` to ``true``, {+adf+}
       doesn't add the attribute to the document in the virtual collection.

   * - .. datalakeconf-azure:: databases.[n].maxWildcardCollections 
     - integer
     - optional
     - Maximum number of wildcard * collections in the database. 
       Each wildcard collection can have only one data source. Value can be 
       between 1 and 1000, inclusive. If omitted, defaults to 100.

   * - .. datalakeconf-azure:: databases.[n].views 
     - array
     - required
     - Array of objects where each object represents an 
       :manual:`aggregation pipeline </core/aggregation-pipeline/#id1>` on 
       a collection. To learn more about views, see :manual:`Views 
       </core/views/>`.

   * - .. datalakeconf-azure:: databases.[n].views.[n].name 
     - string
     - required
     - Label that identifies the view. 

   * - .. datalakeconf-azure:: databases.[n].views.[n].source 
     - string
     - required
     - Name of the source collection for the view. If you want to create a
       view with a :ref:`$sql <adf-sql-stage>` stage, you must omit this field
       as the SQL statement will specify the source collection.

   * - .. datalakeconf-azure:: databases.[n].views.[n].pipeline 
     - array
     - optional
     - :manual:`Aggregation pipeline stage(s) 
       </core/aggregation-pipeline/#id1>` to apply to the 
       :datalakeconf-azure:`~databases.[n].views.[n].source` collection. You 
       can also create views using the :ref:`$sql <adf-sql-stage>` stage.


Example Configuration for {+az-bs+} Data Store
-------------------------------------------------------

.. example::

   Consider {+az-bs+} container ``datacenter-alpha`` containing data 
   collected from a datacenter:

   .. code-block:: none
      :copyable: false

      |--metrics
        |--hardware

   The ``/metrics/hardware`` path stores JSON files with metrics 
   derived from the datacenter hardware, where each filename is 
   the UNIX timestamp in milliseconds of the 24 hour period 
   covered by that file:

   .. code-block:: none
      :copyable: false

      /hardware/1564671291998.json

   The following configuration:

   - Defines a {+fdi+} store on the ``datacenter-alpha`` {+az-bs+}
     container in the ``eastus2`` |azure| region. The {+fdi+} store is
     specifically restricted to include only data files in the
     ``metrics`` directory path. 

   - Maps files from the ``hardware`` directory to a MongoDB database 
     ``datacenter-alpha-metrics`` and collection ``hardware``. The 
     configuration mapping includes parsing logic for capturing the 
     timestamp implied in the filename.

   .. code-block:: json

      {
        "stores" : [
          {
            "name" : "datacenter",
            "provider" : "azure",
            "region" : "eastus2",
            "containerName" : "datacenter-alpha",
            "serviceURL" : "https://mystorageaccount.blob.core.windows.net/"
          }
        ],
        "databases" : [ 
          {
            "name" : "datacenter-alpha-metrics", 
            "collections" : [
              {
                "name" : "hardware",
                "dataSources" : [
                  {
                    "storeName" : "datacenter",
                    "path" : "/hardware/{date date}"
                  }
                ]
              }
            ]
          }
        ]
      }

   {+adf+} parses the {+az-bs+} container ``datacenter-alpha`` and
   processes all files under ``/metrics/hardware/``. The ``collections``
   uses the :ref:`path parsing syntax <adf-path-syntax>` to map the
   filename to the ``date`` field, which is an ISO-8601 date, in each
   document. If a matching ``date`` field does not exist in a document,
   {+adf+} adds it.

   Users connected to the {+fdi+} can use the MongoDB Query Language 
   and supported aggregations to analyze data in the {+az-bs+} container   
   through the ``datacenter-alpha-metrics.hardware`` collection.


.. toctree::
   :titlesonly:
   :hidden:

   Deploy </data-federation/deployment/deploy-azure>
