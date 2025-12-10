.. _adf-configuration-file-gcp:

========================================
{+gcs+} Bucket
========================================

.. default-domain:: mongodb


.. _gcp-configuration-file-overview:

{+adf+} supports {+gcs+} buckets as {+fdi+} stores. You must
define mappings in your {+fdi+} to your Cloud Storage bucket to run
queries against your data.

.. note:: 
   We refer to objects as files and delimiter-separated prefixes as
   directories in this page. However, these object storage services
   aren't actually file systems and don't have the same behaviors in
   all cases as files on a hard drive.


.. _adf-gcp-configuration-format:

Configuration File Format
-------------------------

To define a federated database instance store with |gcp|, you can specify the 
configuration parameters in JSON format. The configuration contains the 
|gcp| data store and maps it to virtual collections that you can query.

The JSON configuration for data in |gcp| uses the
following fields:

.. literalinclude:: /includes/data-federation/gcp-config-format.json
   :language: json
   :linenos:

The JSON configuration for |gcp| contains 
two top-level objects: :ref:`adf-gcp-stores-reference` and
:ref:`adf-gcp-databases-reference`


.. _adf-gcp-stores-reference:

``stores``
~~~~~~~~~~
The ``stores`` object defines each data store associated with the 
{+fdi+}. The {+fdi+} store captures files in |gcp|.
{+df+} can only access data stores defined in the ``stores`` object. 

The ``stores`` object contains the following fields:

.. literalinclude:: /includes/data-federation/gcp-stores-config-format.json
   :language: json
   :linenos:
  
The following table describes the fields in the stores object:

.. list-table:: 
   :header-rows: 1
   :widths: 16 18 16 60

   * - Field 
     - Type 
     - Necessity 
     - Description

   * - .. datalakeconf-gcp:: stores
     - array 
     - Required 
     - Array of objects where each object represents a data store to 
       associate with the {+fdi+}. The {+fdi+} store captures: 
   
       - Files in a {+gcs+} bucket
       - Documents in an |service| cluster
       - Files stored at publicly accessible |url|\s 
   
       {+adf+} can only access data stores 
       defined in the ``stores`` object.

   * - .. datalakeconf-gcp:: stores.[n].name
     - string
     - Required 
     - Name of the {+fdi+} store. The
       :datalakeconf-gcp:`databases.[n].collections.[n].dataSources.[n].storeName` 
       field references this value as part of mapping configuration.

   * - .. datalakeconf-gcp:: stores.[n].provider
     - string
     - Required 
     - Name of the cloud provider where the data is stored. The value must
       be ``gcs`` for a {+gcs+} bucket.

   * - .. datalakeconf-gcp:: stores.[n].region 
     - string
     - Required 
     - Name of the {+gcp+} region in which the {+gcs+} bucket is hosted.
       For a list of valid region names, see :ref:`google-gcp`.

   * - .. datalakeconf-gcp:: stores.[n].bucket
     - string
     - Required 
     - Name of the {+gcs+} bucket. Must exactly match the name of a {+gcs+}
       bucket that {+adf+} must access.

   * - .. datalakeconf-gcp:: stores.[n].prefix
     - string
     - Optional 
     - Prefix {+adf+} applies when searching for files in the {+gcs+}
       bucket. For example, consider a {+gcs+} bucket ``metrics`` with the
       following structure:

       .. code-block:: json

          metrics
          |--hardware
          |--software
            |--computed

       The {+fdi+} store prepends the value of ``prefix`` to
       :datalakeconf-gcp:`databases.[n].collections.[n].dataSources.[n].path` to create the
       full path for files to ingest. Setting ``prefix`` to ``/software``
       restricts any :datalakeconf-gcp:`databases` objects using the {+fdi+} to only subpaths
       of ``/software``.

       Defaults to the root of the {+gcs+} bucket, retrieving all files.

   * - .. datalakeconf-gcp:: stores.[n].delimiter
     - string
     - Optional 
     - Delimiter that separates
       :datalakeconf-gcp:`databases.[n].collections.[n].dataSources.[n].path` segments in
       the {+fdi+} store. {+adf+} uses the delimiter to efficiently traverse
       {+gcs+} buckets with a simulated hierarchical directory structure.


.. _adf-gcp-databases-reference:

``databases``
~~~~~~~~~~~~~

The ``databases`` object defines the mapping between each
{+fdi+} store defined in ``stores`` and MongoDB collections 
in the databases. 
  
The ``databases`` object contains the following fields:

.. literalinclude:: /includes/data-federation/gcp-databases-config-format.json
   :language: json
   :linenos:

The following table describes the fields in the databases object:

.. list-table:: 
   :header-rows: 1
   :widths: 16 18 16 60

   * - Field 
     - Type 
     - Necessity 
     - Description
    
   * - .. datalakeconf-gcp:: databases
     - array 
     - Required 
     - Array of objects where each object represents a database, its 
       collections, and, optionally, any :manual:`views </core/views/>`
       on the collections. Each database can have multiple
       ``collections`` and ``views`` objects.

   * - .. datalakeconf-gcp:: databases.[n].name
     - string
     - Required 
     - Name of the database to which {+adf+} maps the
       data contained in the data store.

   * - .. datalakeconf-gcp:: databases.[n].collections
     - array
     - Required 
     - Array of objects where each object represents a collection
       and data sources that map to a :datalakeconf-gcp:`stores` federated database
       instance store.

   * - .. datalakeconf-gcp:: databases.[n].collections.[n].name
     - string
     - Required 
     - Name of the collection to which {+adf+} maps
       the data contained in each
       :datalakeconf-gcp:`databases.[n].collections.[n].dataSources.[n].storeName`.
       Each object in the array represents the mapping between
       the collection and an object in the :datalakeconf-gcp:`stores` array.

       You can generate collection names dynamically from file paths
       by specifying ``*`` for the collection name and the
       ``collectionName()`` function in the path field. See
       :ref:`adf-advanced-path-generate-collection` for examples.

   * - .. datalakeconf-gcp:: databases.[n].collections.[n].dataSources
     - array
     - Required 
     - Array of objects where each object represents a 
       :datalakeconf-gcp:`stores` {+fdi+} store to map with the 
       collection.

   * - .. datalakeconf-gcp:: databases.[n].collections.[n].dataSources.[n].storeName
     - string 
     - Required 
     - Name of a {+fdi+} store to map to the ``<collection>``. 
       Must match the ``name`` of an object in the :datalakeconf-gcp:`stores`
       array.

   * - .. datalakeconf-gcp:: databases.[n].collections.[n].dataSources.[n].path
     - string 
     - Required 
     - Controls how {+adf+} searches for and parses files in
       the :datalakeconf-gcp:`databases.[n].collections.[n].dataSources.[n].storeName`      
       before mapping them to the ``<collection>``. {+fdi+}
       prepends the :datalakeconf-gcp:`stores.[n].prefix` to the ``path`` to
       build the full path to search within. Specify ``/``
       to capture all files and folders from the ``prefix``
       path.

       For example, consider a {+gcs+} bucket named ``metrics`` with
       the following structure:

       .. code-block:: text
          :copyable: false

          metrics
          |--hardware
          |--software
            |--computed

       A ``path`` of ``/`` directs {+adf+} to search all
       files and folders in the ``metrics`` bucket.

       A ``path`` of ``/hardware`` directs {+adf+} to search
       only that path for files to ingest.

       If the :datalakeconf-gcp:`stores.[n].prefix` is ``software``, {+adf+} 
       searches for files only in the path
       ``/software/computed``.

       Appending the ``*`` wildcard character to the path
       directs {+adf+} to include all files and folders from
       that point in the path. For example,
       ``/software/computed*`` would match files like 
       ``/software/computed-detailed``,
       ``/software/computedArchive``, and
       ``/software/computed/errors``.

       :datalakeconf-gcp:`databases.[n].collections.[n].dataSources.[n].path`
       supports additional syntax for parsing filenames,
       including:

       - Generating document fields from filenames.
       - Using regular expressions to control field
         generation.
       - Setting boundaries for bucketing filenames by
         timestamp.

       See :ref:`adf-path-syntax` for more information.

       .. include:: /includes/data-federation/fact-path-delimiter.rst

   * - .. datalakeconf-gcp:: databases.[n].collections.[n].dataSources.[n].defaultFormat
     - string
     - Optional 
     - Default format that {+df+} assumes if it encounters
       a file without an extension while searching the
       :datalakeconf-gcp:`databases.[n].collections.[n].dataSources.[n].storeName`.

       The following values are valid for the
       ``defaultFormat`` field:

       ``.json``, ``.json.gz``, ``.bson``, ``.bson.gz``, ``.avro,``
       ``.avro.gz``, ``.orc``, ``.tsv``, ``.tsv.gz``, 
       ``.csv``, ``.csv.gz``, ``.parquet``

       If your file format is ``CSV`` or ``TSV``, you must 
       include a header row in your data. See :ref:`adf-csv-tsv-data` 
       for more information.

       If omitted, {+df+} attempts to detect the file type by 
       processing a few bytes of the file.

       **See also:**
       :ref:`adf-data-formats`

   * - .. datalakeconf-gcp:: databases.[n].collections.[n].dataSources.[n].provenanceFieldName

     - string
     - Optional
     - Name for the field that includes the provenance of the
       documents in the results. If you specify this setting in the
       storage configuration, {+adf+} returns the following fields for
       each document in the result:

       .. list-table:: 
	  :widths: 20 80
	  :header-rows: 1

	  * - Field Name 
	    - Description

	  * - ``provider`` 
	    - Provider (:datalakeconf-gcp:`stores.[n].provider`) in the
	      {+fdi+} storage configuration 

	  * - ``region``
	    - {+gcp+} region (:datalakeconf-gcp:`stores.[n].region`)

	  * - ``bucket`` 
	    - Name of the {+gcs+} bucket (:datalakeconf-gcp:`stores.[n].bucket`)

	  * - ``key`` 
	    - Path
	      (:datalakeconf-gcp:`databases.[n].collections.[n].dataSources.[n].path`) 
	      to the document

	  * - ``lastModified``
	    - Date and time the document was last modified. 

       You can't configure this setting using the Visual Editor in the 
       |service| UI.

   * - .. datalakeconf-gcp:: databases.[n].collections.[n].dataSources.[n].omitAttributes
     - boolean 
     - Optional 
     - Flag that specifies whether to omit the attributes
       (key and value pairs) that {+adf+} adds to documents
       in the collection. You can specify one of the
       following values: 

       - ``false`` - to add the attributes 
       - ``true`` - to omit the attributes

       If omitted, defaults to ``false`` and {+adf+} adds
       the attributes. 

       For example, consider a file named
       ``/employees/949-555-0195.json`` for which you
       configure the
       :datalakeconf-gcp:`databases.[n].collections.[n].dataSources.[n].path`
       ``/employees/{phone string}``. {+adf+} adds the
       attribute ``phone: 949-555-0195`` to documents in
       this file if ``omitAttributes`` is ``false``,
       regardless of whether the key-value pair already
       exists in the document. If you set ``omitAttributes``
       to ``true``, {+adf+} doesn't add the attribute to
       the document in the virtual collection.

Example Configuration for {+gcs+} Bucket
-----------------------------------------------------

Consider a {+gcs+} bucket ``datacenter-alpha`` containing data
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

- Defines a {+fdi+} store on the ``datacenter-alpha`` {+gcs+} bucket
  in the ``us-central1`` {+gcp+} region. The {+fdi+} store is
  specifically restricted to include only data files in the
  ``metrics`` directory path. A delimiter of ``/`` is defined to
  simulate a file system hierarchy for ease of navigation and
  retrieval.

- Maps files from the ``hardware`` directory to a MongoDB database 
  ``datacenter-alpha-metrics`` and collection ``hardware``. The 
  configuration mapping includes parsing logic for capturing the 
  timestamp implied in the filename.

.. code-block:: json

   {
     "stores" : [
       {
         "name" : "datacenter-alpha",
         "provider" : "gcs",
         "region" : "us-central1",
         "bucket" : "datacenter-alpha",
         "prefix": "metrics",
         "delimiter": "/"
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

{+adf+} parses the {+gcs+} bucket ``datacenter-alpha`` and processes
all files under ``/metrics/hardware/``. The ``collections`` object
uses the :ref:`path parsing syntax <adf-path-syntax>` to map the
filename to the ``date`` field, which is an ISO-8601 date, in each
document. If a matching ``date`` field does not exist in a document,
{+adf+} adds it.

Users connected to the {+fdi+} can use the MongoDB Query Language and
supported aggregations to analyze data in the {+gcs+} bucket through
the ``datacenter-alpha-metrics.hardware`` collection.



.. toctree::
   :titlesonly:
   :hidden:

   Deploy </data-federation/deployment/deploy-gcp>
