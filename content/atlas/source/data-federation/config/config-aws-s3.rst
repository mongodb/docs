.. _adf-configuration-file-aws:

=============
AWS S3 Bucket 
=============

.. meta::
   :description: Configure Atlas Data Federation to map and query data from AWS S3 buckets using federated database instances.

.. default-domain:: mongodb


.. _aws-configuration-file-overview:

Overview
--------
{+adf+} supports |aws| |s3| buckets as {+fdi+} stores. You must define 
mappings in your {+fdi+} to your |aws| |s3| bucket to run queries against 
your data.

.. _adf-aws-configuration-format:

Configuration File Format
-------------------------
To define a {+fdi+} store for an |aws| |s3| bucket, you can specify the
configuration parameters in |json|. The configuration contains the
|aws| data store and maps it to virtual collections that you can query.

The |json| configuration for data in |aws| |s3| bucket uses the following fields:

.. literalinclude:: /includes/data-federation/s3-config-format.json
   :language: json
   :linenos:

The |json| configuration for |aws| |s3| data store contains two
top-level objects: :ref:`adf-aws-stores-reference` and :ref:`adf-aws-databases-reference`.


.. _adf-aws-stores-reference:

``stores``
~~~~~~~~~~

The ``stores`` object defines each data store associated with the 
{+fdi+}. This store captures files in an |aws| |s3| bucket. 
{+df+} can only access data stores defined within the ``stores`` object.

The ``stores`` object contains the following fields:

.. literalinclude:: /includes/data-federation/s3-stores-config-format.json
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


   * - .. datalakeconf-aws:: stores
     - array
     - required
     - Array of objects where each object represents a data store to 
       associate with the {+fdi+}. The store captures files in an 
       |aws| |s3| bucket. {+adf+} can only access data stores 
       defined in the ``stores`` object.
   

   * - .. datalakeconf-aws:: stores.[n].name
     - string
     - required
     - Name of the {+fdi+} store. The :datalakeconf-aws:`databases.[n].collections.[n].dataSources.[n].storeName`
       field references this value as part of mapping configuration.

   * - .. datalakeconf-aws:: stores.[n].provider
     - string
     - required
     - Defines where the data is stored. Value must be ``s3`` for an 
       |aws| |s3| bucket.
   
   * - .. datalakeconf-aws:: stores.[n].region
     - string
     - required
     - Name of the |aws| region in which the |aws| |s3| bucket is hosted. For a 
       list of valid region names, see :atlas:`Amazon Web Services (AWS) 
       </reference/amazon-aws/#amazon-aws>`.
 
   * - .. datalakeconf-aws:: stores.[n].bucket
     - string
     - required
     - Name of the |aws| S3 bucket. Must exactly match the name of an  |aws| |s3| 
       bucket which {+adf+} can access with the configured |aws| IAM 
       credentials.

   * - .. datalakeconf-aws:: stores.[n].additionalStorageClasses
     - array
     - optional
     - Array of |aws| |s3| `storage classes 
       <https://aws.amazon.com/s3/storage-classes/>`__. {+adf+} will 
       include the files in these storage classes in the query results. 
       Valid values are: 

       - ``INTELLIGENT_TIERING`` to include files in the `Intelligent 
         Tiering <https://aws.amazon.com/s3/storage-classes/#Unknown_or_changing_access>`__ 
         storage class
       - ``STANDARD_IA`` to include files in the `Standard-Infrequent 
         Access <https://aws.amazon.com/s3/storage-classes/#Infrequent_access>`__ 
         storage class

       :gold:`IMPORTANT:` Files in the `Standard <https://aws.amazon.com/s3/storage-classes/#General_purpose>`__ 
       storage class are supported by default.

   * - .. datalakeconf-aws:: stores.[n].prefix
     - string
     - optional
     - Adds a prefix to search paths for files in the |aws| |s3| bucket. 
       {+adf+} prepends the value of ``prefix`` to the 
       :datalakeconf-aws:`databases.[n].collections.[n].dataSources.[n].path` 
       to create the full path for files to ingest. 

       If omitted, {+adf+} searches all files from 
       the root of the |aws| |s3| bucket.

   * - .. datalakeconf-aws:: stores.[n].delimiter
     - string
     - optional
     - Sets a delimiter that separates path segments in the {+fdi+} store. 
       {+df+} uses the delimiter to efficiently traverse |aws| |s3| buckets 
       with a hierarchical directory structure. You can specify any 
       character supported by the |aws| |s3| `object keys 
       <https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingMetadata.html>`__ 
       as the delimiter. For example, you can specify an underscore 
       (``_``) or a plus sign (``+``) or multiple characters such as 
       double underscores (``__``) as the delimiter.

       If omitted, defaults to ``"/"``.

   * - .. datalakeconf-aws:: stores.[n].includeTags
     - boolean
     - optional
     - Determines whether or not to use |aws| |s3| tags on the files in the 
       given path as additional partition attributes. Valid values are 
       ``true`` and ``false``. 
   
       If omitted, defaults to ``false``.
   
       If set to ``true``, {+adf+} does the following:
   
       - Adds the |aws| |s3| tags as additional partition attributes. 
       - Adds new top level BSON elements that associate each tag to each 
         document for the tagged files.
   
       :red:`WARNING:` If set to ``true``, {+adf+} processes the files 
       for additional partition attributes by making extra calls to 
       |aws| |s3| to get the tags. This behavior might impact performance.


   * - .. datalakeconf-aws:: stores.[n].public 
     - boolean
     - optional
     - Specifies whether the bucket is public. 
        
       If set to ``true``, {+adf+} doesn't use the configured |aws| |iam| 
       role to access the |aws| |s3| bucket. If set to ``false``, the configured 
       |aws| |iam| must include permissions to access the |aws| |s3| bucket, even 
       if that bucket is public.
           
       If omitted, defaults to ``false``.


.. _adf-aws-databases-reference:

``databases``
~~~~~~~~~~~~~

The ``databases`` object defines the mapping between each
{+fdi+} store defined in ``stores`` and MongoDB collections 
in the databases. 

The ``database`` object contains the following fields:
  
.. literalinclude:: /includes/data-federation/s3-databases-config-format.json
   :language: json
   :linenos:

   The following table describes the fields in the ``database`` object:

.. list-table:: 
   :header-rows: 1
   :widths: 28 10 12 50

   * - Field 
     - Type 
     - Necessity 
     - Description

   * - .. datalakeconf-aws:: databases
     - array
     - required
     - Array of objects where each object represents a database, its 
       collections, and, optionally, any :manual:`views </core/views/>` on 
       the collections. Each database can have multiple ``collections`` and 
       ``views`` objects.

   * - .. datalakeconf-aws:: databases.[n].name
     - string
     - required
     - Name of the database to which {+adf+} maps the data contained in the 
       data store.

   * - .. datalakeconf-aws:: databases.[n].collections
     - array
     - required
     - Array of objects where each object represents a collection and data 
       sources that map to a :datalakeconf-aws:`stores` {+fdi+} store. 

   * - .. datalakeconf-aws:: databases.[n].collections.[n].name
     - string
     - required
     - Name of the collection to which {+adf+} maps the data contained in 
       each :datalakeconf-aws:`databases.[n].collections.[n].dataSources.[n].storeName`. 
       Each object in the array represents the mapping between the 
       collection and an object in the :datalakeconf-aws:`stores` array. 

       You can generate collection names dynamically from file paths by 
       specifying ``*`` for the collection name and the 
       ``collectionName()`` function in the 
       :datalakeconf-aws:`~databases.[n].collections.[n].dataSources.[n].path`
       field. See :ref:`adf-advanced-path-generate-collection` for 
       examples. 

   * - .. datalakeconf-aws:: databases.[n].collections.[n].dataSources 
     - array
     - required
     - Array of objects where each object represents a 
       :datalakeconf-aws:`stores` {+fdi+} store to map with the 
       collection.

   * - .. datalakeconf-aws:: databases.[n].collections.[n].dataSources.[n].storeName
     - string
     - required
     - Name of a {+fdi+} store to map to the ``<collection>``. 
       Must match the :datalakeconf-aws:`~stores.[n].name` of an object in 
       the :datalakeconf-aws:`stores` array. 

   * - .. datalakeconf-aws:: databases.[n].collections.[n].dataSources.[n].path
     - string
     - required
     - Controls how {+adf+} searches for and parses files in the
       :datalakeconf-aws:`~databases.[n].collections.[n].dataSources.[n].storeName` 
       before mapping them to the ``<collection>``. {+fdi+} prepends the 
       :datalakeconf-aws:`stores.[n].prefix` to the ``path`` to build the 
       full path to search within. Specify ``/`` to capture all files and 
       folders from the ``prefix`` path.

       For example, consider an S3 bucket ``metrics`` with the following 
       structure:

       .. code-block:: text
         :copyable: false

          metrics
          |--hardware
           |--software
            |--computed

       A ``path`` of ``/`` directs {+adf+} to search all files and folders 
       in the ``metrics`` bucket.

       A ``path`` of ``/hardware`` directs {+adf+} to search only that path 
       for files to ingest.

       If the :datalakeconf-aws:`~stores.[n].prefix` is ``software``, {+adf+} 
       searches for files only in the path ``/software/computed``.

       Appending the ``*`` wildcard character to the path directs {+adf+} 
       to include all files and folders from that point in the path. For 
       example, ``/software/computed*`` would match files like 
       ``/software/computed-detailed``, ``/software/computedArchive``, and 
       ``/software/computed/errors``.

       :datalakeconf-aws:`~databases.[n].collections.[n].dataSources.[n].path`
       supports additional syntax for parsing filenames, including:
 
       - Generating document fields from filenames.
       - Using regular expressions to control field generation.
       - Setting boundaries for bucketing filenames by timestamp.
   
       See :ref:`adf-path-syntax` for more information.

       .. include:: /includes/data-federation/fact-path-delimiter.rst

       .. datalakeconf-aws:: databases.[n].collections.[n].dataSources.[n].defaultFormat
      
       .. include:: /includes/extracts/param-default-format.rst

       For more information, see :ref:`adf-data-formats`.

   * - .. datalakeconf-aws:: databases.[n].collections.[n].dataSources.[n].provenanceFieldName
     - string
     - optional
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
            - Provider (:datalakeconf-aws:`stores.[n].provider`) in the
              {+fdi+} storage configuration 

          * - ``region``
            - |aws| region (:datalakeconf-aws:`stores.[n].region`)
         
          * - ``bucket`` 
            - Name of the |aws| |s3| bucket (:datalakeconf-aws:`stores.[n].bucket`)
         
          * - ``key`` 
            - Path
              (:datalakeconf-aws:`databases.[n].collections.[n].dataSources.[n].path`) 
              to the document

          * - ``lastModified``
            - Date and time the document was last modified. 

       You can't configure this setting using the Visual Editor in the 
       |service| UI.

   * - .. datalakeconf-aws:: databases.[n].collections.[n].dataSources.[n].omitAttributes
     - boolean
     - optional
     - Flag that specifies whether to omit the attributes (key and value
       pairs) that {+adf+} adds to documents in the collection. You can specify one of the
       following values: 

       - ``false`` - to add the attributes 
       - ``true`` - to omit the attributes

       If omitted, defaults to ``false`` and {+adf+} adds the attributes. 

       For example:

       Consider a file named ``/employees/949-555-0195.json`` for which
       you configure the :datalakeconf-aws:`~databases.[n].collections.[n].dataSources.[n].path`
       ``/employees/{phone string}``. {+adf+} adds the attribute ``phone:
       949-555-0195`` to documents in this file if ``omitAttributes`` is
       ``false``, regardless of whether the key-value pair already exists in the document. If you set ``omitAttributes`` to ``true``, {+adf+}
       doesn't add the attribute to the document in the virtual collection.

   * - .. datalakeconf-aws:: databases.[n].maxWildcardCollections 
     - integer
     - optional
     - .. include:: /includes/extracts/param-max-wildcard-collections.rst 

   * - .. datalakeconf-aws:: databases.[n].views 
     - array
     - optional
     - Array of objects where each object represents an 
       :manual:`aggregation pipeline </core/aggregation-pipeline/#id1>` on 
       a collection. To learn more about views, see :manual:`Views 
       </core/views/>`.

   * - .. datalakeconf-aws:: databases.[n].views.[n].name 
     - string
     - required
     - Name of the view. 

   * - .. datalakeconf-aws:: databases.[n].views.[n].source 
     - string
     - required
     - Name of the source collection for the view. If you want to create a
       view with a :ref:`$sql <adf-sql-stage>` stage, you must omit this field
       as the SQL statement will specify the source collection.

   * - .. datalakeconf-aws:: databases.[n].views.[n].pipeline 
     - array
     - optional
     - Array of :manual:`Aggregation pipeline stage(s) 
       </core/aggregation-pipeline/#id1>` to apply to the 
       :datalakeconf-aws:`~databases.[n].views.[n].source` collection. You 
       can also create views using the :ref:`$sql <adf-sql-stage>` stage.



Example Configuration for S3 Data Store
---------------------------------------

.. example::

   Consider a S3 bucket ``datacenter-alpha`` containing data 
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

   - Defines a {+fdi+} store on the ``datacenter-alpha`` S3 bucket in 
     the ``us-east-1`` AWS region. The {+fdi+} store is specifically 
     restricted to only datafiles in the ``metrics`` folder path.

   - Maps files from the ``hardware`` folder to a MongoDB database 
     ``datacenter-alpha-metrics`` and collection ``hardware``. The 
     configuration mapping includes parsing logic for capturing the 
     timestamp implied in the filename.

   .. code-block:: json

      {
        "stores" : [
          {
            "name" : "datacenter-alpha",
            "provider" : "s3",
            "region" : "us-east-1",
            "bucket" : "datacenter-alpha",
            "additionalStorageClasses" : [
              "STANDARD_IA"
            ],
            "prefix" : "/metrics",
            "delimiter" : "/"
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
                    "storeName" : "datacenter-alpha",
                    "path" : "/hardware/{date date}"
                  }
                ]
              }
            ]
          }
        ]
      }

   {+adf+} parses the S3 bucket ``datacenter-alpha`` and processes all 
   files under ``/metrics/hardware/``. The ``collections`` uses the 
   :ref:`path parsing syntax <adf-path-syntax>` to map the filename to 
   the ``date`` field, which is an ISO-8601 date, in each document. If 
   a matching ``date`` field does not exist in a document, it will be 
   added.

   Users connected to the {+fdi+} can use the MongoDB Query Language 
   and supported aggregations to analyze data in the |aws| |s3| bucket 
   through the ``datacenter-alpha-metrics.hardware`` collection.


.. seealso:: 

   - :ref:`Querying Data in S3 <query-s3>`
   - `Tutorial: Federated Queries and $out to S3 
     <https://www.mongodb.com/developer/products/atlas/atlas-data-lake-federated-queries-out-aws-s3/>`__