.. code-block:: json
   :caption: sync/config.json

   {
     "type": "flexible",
     "development_mode_enabled": <Boolean>,
     "service_name": "<Data Source Name>",
     "database_name": "<Development Mode Database Name>",
     "state": <"enabled" | "disabled">,
     "client_max_offline_days": <Number>,
     "is_recovery_mode_disabled": <Boolean>,
     "queryable_fields_names": ["<Field Name>", ...],
     "indexed_queryable_fields_names": ["<Field Name>", ...],
     "collection_queryable_fields_names": {
       "<Collection Name>": ["<Field Name>", ...],
       ...
     }
   }

.. list-table::
   :header-rows: 1
   :widths: 10 40

   * - Field
     - Description

   * - | ``type``
       | ``string``

     - The sync mode. There are two Sync modes: Flexible Sync and the older
       Partition-Based Sync. We recommend using Flexible Sync. For more
       information about Partition-Based Sync, refer to
       :ref:`partition-based-sync`.

       Valid Options for a Flexible Sync Configuration:

       - ``"flexible"``

   * - | ``development_mode_enabled``
       | ``boolean``

     - If ``true``, :ref:`Development Mode <development-mode>` is enabled
       for the application. While enabled, App Services automatically stores synced
       objects in a specific database (specified in ``database_name``) and
       mirrors objects types in that database's collection schemas.

   * - | ``service_name``
       | ``string``

     - The name of the Atlas cluster :ref:`data source <appconfig-data_sources>`
       to sync. You cannot use sync with a :ref:`serverless instance
       <serverless-caveats>`.

   * - | ``database_name``
       | ``string``

     - The name of a database in the synced cluster where App Services stores data in
       :ref:`Development Mode <development-mode>`. App Services automatically
       generates a schema for each synced type and maps each object type to a
       collection within the database.

   * - | ``state``
       | ``string``

     - The current state of the sync protocol for the application.

       Valid Options:

       - ``"enabled"``
       - ``"disabled"``

   * - | ``client_max_offline_days``
       | ``number``

     - The number of days that the :ref:`backend compaction <optimize-sync-atlas-usage>`
       process waits before aggressively pruning metadata that some clients
       require to synchronize from an old version of a realm.

   * - | ``is_recovery_mode_disabled``
       | ``boolean``
     - If ``false``, :ref:`Recovery Mode <recover-unsynced-changes>` is enabled
       for the application. While enabled, Realm SDKs that support this feature
       attempt to recover unsynced changes upon performing a client reset.
       Recovery mode is enabled by default.

   * - | ``queryable_fields_names``
       | ``string[]``

     - A list of field names to use as :ref:`global queryable fields
       <queryable-fields>`.

   * - | ``indexed_queryable_fields_names``
       | ``string[]``

     - A list of field names to use as the :ref:`indexed queryable field
       <fs-indexed-queryable-fields>`. While this property is an array,
       Sync currently supports only one one indexed queryable field.
       Therefore, this array may contain at most one element.

       The indexed queryable field must be present in the schema and be
       the same :ref:`eligible field type
       <flexible-sync-eligible-field-types>` in every collection you
       sync. The indexed queryable field name must *also* appear in
       ``queryable_fields_names`` since this is a global queryable
       field.

   * - | ``collection_queryable_fields_names``
       | ``{ [collectionName: string]: string[] }``

     - A map from collection names to a list of :ref:`collection-level
       queryable fields <queryable-field-scopes>` for each collection.

   * - | ``last_disabled``
       | ``number``

     - The date and time that sync was last paused or disabled, represented by
       the number of seconds since the Unix epoch (January 1, 1970, 00:00:00
       UTC).

   * - | ``asymmetric_tables``
       | ``string[]``

     - An array of the names of collections that are defined as asymmetric 
       with :ref:`Data Ingest <optimize-data-ingest>`, where clients can write 
       data but not read. 
