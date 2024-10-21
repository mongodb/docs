``$filter`` : array|object
  The filter criteria that specifies the documents to query.

``$options`` : array
  An array specifying the desired options.

  .. list-table::
     :header-rows: 1
     :widths: 20 20 80

     * - Name
       - Type
       - Description

     * - allowDiskUse
       - boolean
       - Enables writing to temporary files. When set to ``true``, queries can
         write data to the ``_tmp`` sub-directory in the ``dbPath`` directory.

     * - allowPartialResults
       - boolean
       - For queries against a sharded collection, returns partial results from
         the :program:`mongos` if some shards are unavailable instead of
         throwing an error.

     * - codec
       - MongoDB\\Codec\\DocumentCodec
       - .. include:: /includes/extracts/collection-option-codec.rst

         .. versionadded:: 1.17

     * - collation
       - array|object
       - .. include:: /includes/extracts/collection-option-collation.rst

     * - comment
       - mixed
       - .. include:: /includes/extracts/common-option-comment.rst

         .. include:: /includes/extracts/common-option-comment-string-before-4.4.rst

     * - hint
       - string|array|object
       - .. include:: /includes/extracts/common-option-hint.rst

         .. versionadded:: 1.2

     * - let
       - array|object
       - .. include:: /includes/extracts/common-option-let.rst

         .. versionadded:: 1.13

     * - max
       - array|object
       - The exclusive upper bound for a specific index.

         .. versionadded:: 1.2

     * - maxTimeMS
       - integer
       - .. include:: /includes/extracts/common-option-maxTimeMS.rst

     * - min
       - array|object
       - The inclusive lower bound for a specific index.

         .. versionadded:: 1.2

     * - projection
       - array|object
       - The :ref:`projection specification <projections>` to determine which
         fields to include in the returned documents. See
         :manual:`Project Fields to Return from Query </tutorial/project-fields-from-query-results>`
         and :manual:`Projection Operators </reference/operator/projection>` in
         the MongoDB manual.

     * - readConcern
       - :php:`MongoDB\Driver\ReadConcern <class.mongodb-driver-readconcern>`
       - .. include:: /includes/extracts/collection-option-readConcern.rst

         .. include:: /includes/extracts/common-option-readConcern-transaction.rst

     * - readPreference
       - :php:`MongoDB\Driver\ReadPreference <class.mongodb-driver-readpreference>`
       - .. include:: /includes/extracts/collection-option-readPreference.rst

     * - returnKey
       - boolean
       - If true, returns only the index keys in the resulting documents.

         .. versionadded:: 1.2

     * - session
       - :php:`MongoDB\Driver\Session <class.mongodb-driver-session>`
       - .. include:: /includes/extracts/common-option-session.rst

         .. versionadded:: 1.3

     * - showRecordId
       - boolean
       - Determines whether to return the record identifier for each document.
         If true, adds a field ``$recordId`` to the returned documents.

         .. versionadded:: 1.2

     * - skip
       - integer
       - Number of documents to skip. Defaults to ``0``.

     * - sort
       - array|object
       - The sort specification for the ordering of the results.

     * - typeMap
       - array
       - .. include:: /includes/extracts/collection-option-typeMap.rst

         This will be used for the returned result document.
