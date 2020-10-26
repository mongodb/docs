.. option:: --httpStatusPort <num>

   
   Directs :program:`mongomirror` to start an HTTP server on the specified port.
   You can retrieve the current status of :program:`mongomirror` by
   issuing an HTTP ``GET`` request to ``http://localhost:<num>``.
   
   When running with :option:`--httpStatusPort`, :program:`mongomirror` does not exit when it encounters an
   error. Instead, it logs the error as normal and reports the error over HTTP to the specified port.
   
   :program:`mongomirror` returns a document in response to the HTTP request. The following
   example syntax represents all the possible output fields - the actual
   response may only return a subset of these fields. See the subsequent table
   for a description of the fields and when to expect them.
   
   .. code-block:: none
   
      {
         "stage" : "<stage Name>",
         "phase" : "<phase Name>",
         "details" : {
            "currentTimestamp" : "<BSON timestamp>",
            "latestTimestamp" : "<BSON timestamp>",
            "lastWriteOnSourceTimestamp" : "<BSON timestamp>",
            "<namespace>" : {
               "complete" : <boolean>,
               "copiedBytes" : <integer>,
               "totalBytes" : <integer>,
               "createIndexes" : <integer>
            },
            ...
         },
         "errorMessage" : "<error message>"
      }
   
   The following table describes each field and its possible values:
   
   .. list-table::
      :header-rows: 1
      :widths: 40 60
   
      * - Field
        - Description
   
      * - ``stage``
        - The name of the stage in progress. Possible values are:
   
          - ``initializing``
   
            :program:`mongomirror` has started but is not yet copying
            any data.
          - ``initial sync``
   
            :program:`mongomirror` is copying documents and indexes that
            already exist on the source deployment. :program:`mongomirror` also tails and
            applies entries from the oplog.
          - ``oplog sync``
   
            :program:`mongomirror` is tailing and applying entries from
            the oplog.
      * - ``phase``
        - The name of the phase. Provides more specific details about what part
          of the ``stage`` is in progress.
      * - ``details``
        - A document providing a detailed description of the progress of the
          current phase.
   
          During the ``initial sync`` stage, each subdocument in ``details``
          represents a single collection being copied by :program:`mongomirror`.
   
          Depending on the ``stage`` or ``phase``, :program:`mongomirror` may not include
          this field in the response.
   
      * - ``details.<namespace>``
        - The full namespace of the collection being copied, displayed as
          ``<database>.<collection>``.
   
          Only displays during the ``initial sync`` phase when copying
          documents or indexes.
   
      * - ``details.<namespace>.complete``
        - Displays ``true`` or ``false`` depending on whether or not
          :program:`mongomirror` has copied all documents or indexes from the collection
          to the target |service| cluster.
   
          Only displays during the ``initial sync`` phase when copying
          documents or indexes.
   
      * - ``details.<namespace>.copiedBytes``
        - The number of bytes copied so far. Note that this is a different
          measurement from the :program:`mongomirror` logs, which report the current/total
          number of *documents* copied.
   
          Only displays during the ``initial sync`` phase when copying
          non-index data.
   
      * - ``details.<namespace>.totalBytes``
        - The total size (in bytes) of the collection.
   
          Only displays during the ``initial sync`` phase when copying
          non-index data.
   
      * - ``details.<namespace>.createIndexes``
        - The number of indexes that have been or will be created.
   
          Only displays during the ``initial sync`` stage when copying
          indexes.
   
      * - ``details.currentTimestamp``
        - The :manual:`BSON timestamp </reference/bson-types/#timestamps>`
          value of the oplog entry most recently processed.
          :program:`mongomirror` only refreshes this data point every 10 seconds, so
          :program:`mongomirror` may be slightly further ahead of the reported time.
   
          Only displays during the ``initial sync`` or ``oplog sync``
          stages when tailing or applying oplog entries.
   
      * - ``details.latestTimestamp``
        - During the ``initial sync`` stage, this represents the
          :manual:`BSON timestamp </reference/bson-types/#timestamps>`
          value of the latest oplog entry available after the initial data was
          copied during initial sync.
   
          During the ``oplog sync`` stage, this represents the BSON timestamp
          value of the latest oplog entry available on the source deployment.
   
          Only displays during the ``initial sync`` or ``oplog sync`` stages
          when tailing or applying oplog entries.

      * - | ``details``
          | ``.lastWriteOnSourceTimestamp``
        - The :manual:`BSON timestamp </reference/bson-types/#timestamps>`
          value of the most recent oplog entry that is
          not a no-op. No-op entries are generally system-level operations
          such as heartbearts that do not write or edit data in the database.
          :program:`mongomirror` refreshes this value every 10 seconds.
          Operations which write or edit data in the database may not be
          reported until the next refresh occurs.

          The ``lastWriteOnSourceTimestamp`` field is useful as a
          confirmation that no new writes are occurring on the source
          deployment before cutting over during a migration.
   
      * - ``errorMessage``
        - A string that describes any error encountered by :program:`mongomirror`.
