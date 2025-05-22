.. Note to author: This page duplicates the content from the github.io page:
.. https://mongodb.github.io/node-mongodb-native/6.5/interfaces/FindOptions.html
.. All the options defined here also work in mongosh

.. list-table::
    :header-rows: 1
    :widths: 25 75

    * - Option
      - Description

    * - allowDiskUse
      - Whether or not pipelines that require more than 100 megabytes of
        memory to execute write to temporary files on disk. For details, 
        see :method:`cursor.allowDiskUse()`.

    * - allowPartialResults
      - For queries against a sharded collection, allows the command 
        (or subsequent getMore commands) to return partial results, 
        rather than an error, if one or more queried shards are 
        unavailable.

    * - awaitData
      - If the cursor is a a tailable-await cursor. 
        Requires ``tailable`` to be ``true``.

    * - collation
      - Collation settings for update operation.

    * - comment
      - Adds a ``$comment`` to the query that shows in the 
        :ref:`profiler <profiler>` logs.

    * - explain
      - Adds explain output based on the verbosity mode provided.

    * - hint
      - Forces the query optimizer to use specific indexes in the 
        query. 

    * - limit
      - Sets a limit of documents returned in the result set.

    * - max
      - The exclusive upper bound for a specific index.

    * - maxAwaitTimeMS
      - The maximum amount of time for the server to wait on 
        new documents to satisfy a tailable cursor query. Requires 
        ``tailable`` and ``awaitData`` to be ``true``.

    * - maxTimeMS
      - The maximum amount of time (in milliseconds) the 
        server should allow the query to run.

    * - min
      - The inclusive lower bound for a specific index.

    * - noCursorTimeout
      - Whether the server should timeout the cursor 
        after a period of inactivity (by default 10 minutes).

    * - readConcern
      - Specifies the read concern level for the query.

    * - readPreference
      - Specifies the read preference level for the query.

    * - returnKey
      - Whether only the index keys are returned for a 
        query.

    * - showRecordId
      - If the ``$recordId`` field is added to the returned 
        documents. The ``$recordId`` indicates the position of the 
        document in the result set.

    * - skip
      - How many documents to skip before returning the 
        first document in the result set.

    * - sort
      - The order of the documents returned in the result 
        set. Fields specified in the sort, must have an index.

    * - tailable
      - Indicates if the cursor is tailable. Tailable cursors remain 
        open after the intial results of the query are exhausted. 
        Tailable cursors are only available on 
        :ref:`manual-capped-collection`.