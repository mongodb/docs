Every :ref:`MongoDB Atlas data source <data-sources>`
linked to your app is configured as a service in the ``/services``
directory. Each data source maps to its own sub-directory with the same
name as the service.

The primary service configuration for a MongoDB Atlas data source is
``config.json``, which defines connection parameters and sync rules.

If the data source is not a :doc:`synced cluster </sync>` or
:ref:`{+adf-instance+} <data-federation-caveats>`, then you can
define collection-level rules in the ``/rules`` sub-directory.

.. code-block:: none
   :copyable: False

   yourRealmApp/
   └── services/
       └── <MongoDB Service Name>/
           ├── config.json
           └── rules/
               └── <rule name>.json

.. important::

   MongoDB Service names are not necessarily the same as their linked
   data source's name in Atlas. You define the service name for a data
   source when you link it to your application. For linked clusters, the
   default MongoDB service name is ``mongodb-atlas``. For
   {+adf-datasource+}s, the default service name is
   ``mongodb-datafederation``.

.. _mongodb-service-configuration-file:

Service Configuration
~~~~~~~~~~~~~~~~~~~~~

.. include:: /includes/data-source-configuration.rst

.. _mongodb-service-sync-rules:

Synced Cluster Configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The ``config.sync`` field of ``config.json`` determines if a cluster is
:doc:`synced </sync>` and, if it is, defines the rules for sync operations on
the cluster.

.. code-block:: json
   :caption: config.json

   {
     ...,
     "config": {
       ...,
       "sync": {
         "state": <Boolean>,
         "development_mode_enabled": <Boolean>,
         "database_name": "<Development Mode Database Name>",
         "partition": {
           "key": "<Partition Key Field Name>",
           "type": "<Partition Key Value Type>",
           "permissions": {
             "read": <JSON Expression>,
             "write": <JSON Expression>
           }
         }
       }
     }
   }

.. list-table::
   :header-rows: 1
   :widths: 10 30

   * - Field
     - Description
   
   * - | ``sync.state``
       | Boolean
     - If ``true``, :doc:`Sync </sync>` is enabled for the cluster, which means
       that client applications can sync data in the cluster with Realm Database
       and that :ref:`non-sync collection rules <mongodb-service-rules>` do not
       apply.
   
   * - | ``sync.development_mode_enabled``
       | Boolean
     - If ``true``, Development Mode is enabled for the cluster. While
       enabled, Atlas App Services stores synced objects in a specific database within 
       the cluster, and mirrors object types in that database's collection 
       schemas.

   * - | ``sync.database_name``
       | String
     - The name of the database in the synced cluster where App Services should store
       synced objects.
       
       When Development Mode is enabled, App Services stores synced objects in
       this database. Each object type maps to its own collection in the
       database with a schema that matches the synced objects.
   
   * - | ``sync.partition.key``
       | String
     - The name of the :ref:`partition key <partition-key>` field that maps data
       into individual synced realms.
   
   * - | ``sync.partition.type``
       | String
     - The type of the partition key field value.
   
   * - | ``sync.partition.permissions``
       | Document
     - A document that defines the ``read`` and ``write`` permissions for the
       synced cluster. Permissions are defined with :ref:`rule expressions
       <expressions>` that App Services evaluates per-user, per-partition. The
       expressions have access to the :json-expansion:`%%user` and
       :json-expansion:`%%partition` expansions.

.. _mongodb-service-rules:

MongoDB Collection Rules (Non-Sync)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

For non-synced clusters, you can define collection-level rules that App Services
evaluates dynamically for each request. Each collection's rules are stored in a
``rules.json`` file in that collection's configuration subdirectory, which is
``data_sources/<data-source-name>/<database-name>/<collection-name>/``.

.. include:: /includes/adf-rules-note.rst

.. code-block:: json
   :caption: <database.collection>.json
   
   {
     "id": "<Rule ID>",
     "database": "<Database Name>",
     "collection": "<Collection Name>",
     "roles": [<Role>],
     "schema": <Document Schema>,
     "filters": [<Filter>],
   }

.. list-table::
   :widths: 10 30
   :header-rows: 1

   * - Field
     - Description

   * - | ``id``
       | String
     - A string that uniquely identifies the trigger. App Services
       automatically generates a unique ID for a trigger when you create
       it.

   * - | ``database``
       | String
     - The name of the database that holds the collection.

   * - | ``collection``
       | String
     - The name of the collection.

   * - | ``roles``
       | Array<Document>
     - An array of :ref:`Role configuration documents
       <config-v20210101-role>`, which have the following form:
       
       .. include:: /mongodb/tables/role-configuration.rst

   * - | ``schema``
       | Document
     - A :ref:`document schema <schemas>`. The root level
       schema must be an :ref:`object schema <schema-type-object>`,
       which has the following form:

       .. code-block:: json
          
          {
            "bsonType": "object",
            "properties": {
              "<Field Name>": <Schema Document>
            }
          }

   * - | ``filters``
       | Array<Document>
     - An array of :ref:`Filter configuration documents
       <config-v20210101-filter>`, which have the following form:

       .. include:: /mongodb/tables/query-filter-params.rst
