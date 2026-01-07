.. _atlasdatafederation: 

AtlasDataFederation
-------------------

AtlasDataFederation is the Schema for the Atlas Data Federation API.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``apiVersion``
     - string
     - atlas.mongodb.com/v1
     - true

   * -  ``kind``
     - string
     - ``AtlasDataFederation``
     - true

   * -  ``metadata``
     - object
     - Refer to the Kubernetes ``API`` documentation for the fields of the ``metadata`` field.
     - true

   * -  ``spec``
     - object
     -  
     - false

   * -  ``status``
     - object
     -  
     - false

.. _atlasdatafederation-spec: 

AtlasDataFederation.spec
~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``name``
     - string
     - Human-readable label that identifies the Federated Database Instance.
     - true

   * -  ``projectRef``
     - object
     - Project is a reference to ``AtlasProject`` resource the deployment belongs to.
     - true

   * -  ``cloudProviderConfig``
     - object
     - Configuration for the cloud provider where this Federated Database Instance is hosted.
     - false

   * -  ``dataProcessRegion``
     - object
     - Information about the cloud provider region to which the Federated Database Instance routes client connections.
     - false

   * -  ``privateEndpoints``
     - []object
     - Private endpoint for Federated Database Instances and Online Archives to add to the specified project.
     - false

   * -  ``storage``
     - object
     - Configuration information for each data store and its mapping to ``MongoDB`` Atlas databases.
     - false

.. _atlasdatafederation-spec-projectref: 

AtlasDataFederation.spec.projectRef
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Project is a reference to AtlasProject resource the deployment belongs to.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``name``
     - string
     - Name of the Kubernetes Resource
     - true

   * -  ``namespace``
     - string
     - Namespace of the Kubernetes Resource
     - false

.. _atlasdatafederation-spec-cloudproviderconfig: 

AtlasDataFederation.spec.cloudProviderConfig
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Configuration for the cloud provider where this Federated Database Instance is hosted.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``aws``
     - object
     - Configuration for running Data Federation in ``AWS``.
     - false

.. _atlasdatafederation-spec-cloudproviderconfig-aws: 

AtlasDataFederation.spec.cloudProviderConfig.aws
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Configuration for running Data Federation in AWS.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``roleId``
     - string
     - Unique identifier of the role that the data lake can use to access the data stores.Required if specifying ``cloudProviderConfig``.
     - false

   * -  ``testS3Bucket``
     - string
     - Name of the ``S3`` data bucket that the provided role ``ID`` is authorized to access.Required if specifying ``cloudProviderConfig``.
     - false

.. _atlasdatafederation-spec-dataprocessregion: 

AtlasDataFederation.spec.dataProcessRegion
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Information about the cloud provider region to which the Federated Database Instance routes client connections.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``cloudProvider``
     - enum
     - Name of the cloud service that hosts the Federated Database Instance's infrastructure.
       *Enum*: ``AWS``
     - false

   * -  ``region``
     - enum
     - Name of the ``region`` to which the data lake routes client connections.
       *Enum*: ``SYDNEY_AUS``, ``MUMBAI_IND``, ``FRANKFURT_DEU``, ``DUBLIN_IRL``, ``LONDON_GBR``, ``VIRGINIA_USA``, ``OREGON_USA``, ``SAOPAULO_BRA``, ``SINGAPORE_SGP``
     - false

.. _atlasdatafederation-spec-privateendpoints: 

AtlasDataFederation.spec.privateEndpoints
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``endpointId``
     - string
     - Unique 22-character alphanumeric string that identifies the private endpoint.
     - false

   * -  ``provider``
     - string
     - Human-readable label that identifies the cloud service provider. Atlas Data Lake supports Amazon Web Services only.
     - false

   * -  ``type``
     - string
     - Human-readable label that identifies the resource ``type`` associated with this private endpoint.
     - false

.. _atlasdatafederation-spec-storage: 

AtlasDataFederation.spec.storage
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Configuration information for each data store and its mapping to MongoDB Atlas databases.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``databases``
     - []object
     - Array that contains the queryable ``databases`` and collections for this data lake.
     - false

   * -  ``stores``
     - []object
     - Array that contains the data ``stores`` for the data lake.
     - false

.. _atlasdatafederation-spec-storage-databases: 

AtlasDataFederation.spec.storage.databases
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Database associated with this data lake. Databases contain collections and views.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``collections``
     - []object
     - Array of ``collections`` and data sources that map to a stores data store.
     - false

   * -  ``maxWildcardCollections``
     - integer
     - Maximum number of wildcard collections in the database. This only applies to ``S3`` data sources.
       Minimum value is 1, maximum value is 1000. Default value is 100.
     - false

   * -  ``name``
     - string
     - Human-readable label that identifies the database to which the data lake maps data.
     - false

   * -  ``views``
     - []object
     - Array of aggregation pipelines that apply to the collection. This only applies to ``S3`` data sources.
     - false

.. _atlasdatafederation-spec-storage-databases-collections: 

AtlasDataFederation.spec.storage.databases.collections
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Collection maps to a stores data store.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``dataSources``
     - []object
     - Array that contains the data stores that map to a collection for this data lake.
     - false

   * -  ``name``
     - string
     - Human-readable label that identifies the collection to which ``MongoDB`` Atlas maps the data in the data stores.
     - false

.. _atlasdatafederation-spec-storage-databases-collections-datasources: 

AtlasDataFederation.spec.storage.databases.collections.dataSources
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``allowInsecure``
     - boolean
     - Flag that validates the scheme in the specified URLs.
       If true, allows insecure ``HTTP`` scheme, doesn't verify the server's certificate chain and hostname, and accepts any certificate with any hostname presented by the server.
       If false, allows secure ``HTTPS`` scheme only.
     - false

   * -  ``collection``
     - string
     - Human-readable label that identifies the ``collection`` in the database. For creating a wildcard (*) collection, you must omit this parameter.
     - false

   * -  ``collectionRegex``
     - string
     - Regex pattern to use for creating the wildcard (*) collection.
     - false

   * -  ``database``
     - string
     - Human-readable label that identifies the database, which contains the collection in the cluster. You must omit this parameter to generate wildcard (*) collections for dynamically generated databases.
     - false

   * -  ``databaseRegex``
     - string
     - Regex pattern to use for creating the wildcard (*) database.
     - false

   * -  ``defaultFormat``
     - enum
     - File format that ``MongoDB`` Cloud uses if it encounters a file without a file extension while searching ``storeName``.
       *Enum*: .avro, .avro.bz2, .avro.gz, .bson, .bson.bz2, .bson.gz, .bsonx, .csv, .csv.bz2, .csv.gz, .json, .json.bz2, .json.gz, .orc, .parquet, .tsv, .tsv.bz2, .tsv.gz
     - false

   * -  ``path``
     - string
     - File ``path`` that controls how ``MongoDB`` Cloud searches for and parses files in the ``storeName`` before mapping them to a collection.
       Specify / to capture all files and folders from the prefix path.
     - false

   * -  ``provenanceFieldName``
     - string
     - Name for the field that includes the provenance of the documents in the results. ``MongoDB`` Atlas returns different fields in the results for each supported provider.
     - false

   * -  ``storeName``
     - string
     - Human-readable label that identifies the data store that ``MongoDB`` Cloud maps to the collection.
     - false

   * -  ``urls``
     - []string
     - URLs of the publicly accessible data files. You can't specify URLs that require authentication.
       Atlas Data Lake creates a partition for each ``URL``. If empty or omitted, Data Lake uses the URLs from the store specified in the ``storeName`` parameter.
     - false

.. _atlasdatafederation-spec-storage-databases-views: 

AtlasDataFederation.spec.storage.databases.views
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``name``
     - string
     - Human-readable label that identifies the view, which corresponds to an aggregation pipeline on a collection.
     - false

   * -  ``pipeline``
     - string
     - Aggregation ``pipeline`` stages to apply to the source collection.
     - false

   * -  ``source``
     - string
     - Human-readable label that identifies the ``source`` collection for the view.
     - false

.. _atlasdatafederation-spec-storage-stores: 

AtlasDataFederation.spec.storage.stores
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Store is a group of settings that define where the data is stored.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``additionalStorageClasses``
     - []string
     - Collection of ``AWS`` ``S3`` storage classes. Atlas Data Lake includes the files in these storage classes in the query results.
     - false

   * -  ``bucket``
     - string
     - Human-readable label that identifies the ``AWS`` ``S3`` bucket.
       This label must exactly match the name of an ``S3`` ``bucket`` that the data lake can access with the configured ``AWS`` Identity and Access Management (``IAM``) credentials.
     - false

   * -  ``delimiter``
     - string
     - The ``delimiter`` that separates path segments in the data store.
       ``MongoDB`` Atlas uses the ``delimiter`` to efficiently traverse ``S3`` buckets with a hierarchical directory structure. You can specify any character supported by the ``S3`` object keys as the delimiter.
     - false

   * -  ``includeTags``
     - boolean
     - Flag that indicates whether to use ``S3`` tags on the files in the given path as additional partition attributes.
       If set to true, data lake adds the ``S3`` tags as additional partition attributes and adds new top-level ``BSON`` elements associating each tag to each document.
     - false

   * -  ``name``
     - string
     - Human-readable label that identifies the data store. The ``storeName`` field references this values as part of the mapping configuration.
       To use ``MongoDB`` Atlas as a data store, the data lake requires a serverless instance or an ``M10`` or higher cluster.
     - false

   * -  ``prefix``
     - string
     - Prefix that ``MongoDB`` Cloud applies when searching for files in the ``S3`` bucket.
       The data store prepends the value of ``prefix`` to the path to create the full path for files to ingest.
       If omitted, ``MongoDB`` Cloud searches all files from the root of the ``S3`` bucket.
     - false

   * -  ``provider``
     - string
     - The ``provider`` used for data stores.
     - false

   * -  ``public``
     - boolean
     - Flag that indicates whether the bucket is public.
       If set to true, ``MongoDB`` Cloud doesn't use the configured ``AWS`` Identity and Access Management (``IAM``) role to access the ``S3`` bucket.
       If set to false, the configured ``AWS`` ``IAM`` role must include permissions to access the ``S3`` bucket.
     - false

   * -  ``region``
     - string
     - Physical location where ``MongoDB`` Cloud deploys your ``AWS``-hosted ``MongoDB`` cluster nodes. The ``region`` you choose can affect network latency for clients accessing your databases.
       When ``MongoDB`` Atlas deploys a dedicated cluster, it checks if a ``VPC`` or ``VPC`` connection exists for that provider and region. If not, ``MongoDB`` Atlas creates them as part of the deployment.
       To limit a new ``VPC`` peering connection to one ``CIDR`` block and region, create the connection first. Deploy the cluster after the connection starts.
     - false

.. _atlasdatafederation-status: 

AtlasDataFederation.status
~~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``conditions``
     - []object
     - Conditions is the list of statuses showing the current state of the Atlas Custom Resource
     - true

   * -  ``mongoDBVersion``
     - string
     - ``MongoDBVersion`` is the version of ``MongoDB`` the cluster runs, in . format.
     - false

   * -  ``observedGeneration``
     - integer
     - ``ObservedGeneration`` indicates the generation of the resource specification that the Atlas Operator is aware of.
       The Atlas Operator updates this field to the 'metadata.generation' as soon as it starts reconciliation of the resource.
       *Format*: int64
     - false

.. _atlasdatafederation-status-conditions: 

AtlasDataFederation.status.conditions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Condition describes the state of an Atlas Custom Resource at a certain point.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``status``
     - string
     - Status of the condition, one of True, False, Unknown.
     - true

   * -  ``type``
     - string
     - Type of Atlas Custom Resource condition.
     - true

   * -  ``lastTransitionTime``
     - string
     - Last time the condition transitioned from one status to another.
       Represented in ``ISO`` 8601 format.
       *Format*: date-time
     - false

   * -  ``message``
     - string
     - A human readable ``message`` indicating details about the transition.
     - false

   * -  ``reason``
     - string
     - The ``reason`` for the condition's last transition.
     - false
