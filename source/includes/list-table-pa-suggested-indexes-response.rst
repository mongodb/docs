.. list-table::
   :header-rows: 1
   :widths: 10 20 70

   * - Name
     - Type
     - Description

   * - ``shapes``
     - array of documents
     - Documents with information about the :manual:`query shapes
       </reference/glossary/#term-query-shape>` that are served by the
       suggested indexes.

   * - ``shapes[n].avgMs``
     - long
     - Average duration in milliseconds for the queries examined that
       match this shape.

   * - ``shapes[n].count``
     - long
     - The number of queries examined that match this shape.

   * - ``shapes[n].id``
     - objectId
     - Unique id for this shape. Exists only for the duration of the
       API request.

   * - ``shapes[n].inefficiencyScore``
     - long
     - The average number of documents read for every document returned
       by the query. For more information, see :ref:`Understanding the
       Query Inefficiency Score <query-inefficiency-score>`.

   * - ``shapes[n].namespace``
     - string
     - The namespace searched by the queries in this shape.

   * - ``shapes[n].operations``
     - array of documents
     - Documents with specific information and log lines for individual
       queries.

   * - ``shapes[n].operations[n].predicates``
     - array of documents
     - Documents containing the search criteria used by the query.
       Values in key-value pairs will be redacted in these predicates
       unless the user has :doc:`Project Data Access Read Only
       </reference/user-roles>` permissions or higher.

   * - ``shapes[n].operations[n].raw``
     - string
     - The raw log line produced by the query.

   * - ``shapes[n].operations[n].stats``
     - document
     - Query statistics.

   * - ``shapes[n].operations[n].stats.ms``
     - long
     - Duration in milliseconds of the query.

   * - ``shapes[n].operations[n].stats.nReturned``
     - long
     - Number of results returned by the query.

   * - ``shapes[n].stats.nScanned``
     - long
     - Number of documents read by the query.

   * - ``shapes[n].stats.ts``
     - long
     - Query timestamp, in seconds since epoch.

   * - ``suggestedIndexes``
     - array of documents
     - Documents with information about the indexes suggested by the
       Performance Advisor.

   * - ``suggestedIndexes[n].id``
     - objectId
     - Unique id for this suggested index.

   * - ``suggestedIndexes[n].impact``
     - array of objectIds
     - A list of objectIds which identify the shapes in this response
       which pertain to this suggested index.

   * - ``suggestedIndexes[n].index``
     - array of documents
     - Each array element is a document that specifies a key in the
       index and its sort order, ascending or descending.

       - A value of 1 indicates an ascending sort order.
       - A value of -1 indicates a descending sort order.

       Keys in indexes with multiple keys appear in the same order
       that they appear in the index.

   * - ``suggestedIndexes[n].index.<fieldname>``
     - string
     - The specific field to be indexed.

   * - ``suggestedIndexes[n].namespace``
     - string
     - The namespace of the suggested index.