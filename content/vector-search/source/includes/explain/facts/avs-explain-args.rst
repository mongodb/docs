The :ref:`explain response <avs-explain-response>` 
contains information how the query was executed internally. The 
``args`` field includes the following details:

- Query type
- A structured summary example for each query type
- Query options in the structured summary 

The following sections describe the query types and the fields in the 
structured summaries:

.. expression:: WrappedKnnQuery

   A wrapper query used for |ann| vector search that combines multiple queries. The 
   structured summary includes details on the following option:

   .. list-table::
      :header-rows: 1
      :widths: 15 15 10 50

      * - Field
        - Type
        - Necessity
        - Description
       
      * - ``query`` 
        - Array 
        - Required
        - Array of sub-queries used in the vector search, typically containing 
          ``KnnFloatVectorQuery`` and ``DocAndScoreQuery``.

.. expression:: KnnFloatVectorQuery

   A query type specific to |ann| search on float vectors. The structured summary 
   includes details on the following options:

   .. list-table::
      :header-rows: 1
      :widths: 15 15 10 50

      * - Field
        - Type
        - Necessity
        - Description
        
      * - ``field`` 
        - String 
        - Required
        - The vector field path being searched.
        
      * - ``k`` 
        - Integer 
        - Required
        - Number of nearest neighbors to retrieve.

.. expression:: DocAndScoreQuery

   A query type that handles document matching and scoring. The structured summary 
   typically includes statistics about query execution.

.. expression:: ExactVectorSearchQuery

   A query type for |enn| vector searches. The structured summary 
   includes details on the following options:

   .. list-table::
      :header-rows: 1
      :widths: 15 15 10 50

      * - Field
        - Type
        - Necessity
        - Description
        
      * - ``field`` 
        - String 
        - Required
        - The vector field path being searched.
        
      * - ``similarityFunction`` 
        - String 
        - Required
        - The similarity function used (``dotProduct``, ``cosine``, or ``euclidean``).
        
      * - ``filter`` 
        - Document 
        - Optional
        - Pre-filter query that limits the vector search scope.

.. expression:: BooleanQuery

   If you use a pre-filter in your vector search query,
   your explain results include the ``BooleanQuery`` type.
   To learn more about the fields for this type and  
   other query types specific to your pre-filter query, 
   refer to the Query Types on the
   :ref:`{+fts+} Explain Page <explain-lucene-query>`.

.. expression:: DefaultQuery

   Queries that are not explicitly defined by another 
   query are serialized using the default query. The 
   structured summary includes details on the following option: 

   .. list-table::
      :header-rows: 1
      :widths: 15 15 10 50

      * - Field
        - Type
        - Necessity
        - Description
        
      * - ``queryType`` 
        - String 
        - Required
        - Type of query.
