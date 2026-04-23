Statistics are available for the following areas of query:

.. list-table::
   :header-rows: 1 
   :widths: 20 80 

   * - Option
     - Description

   * - ``context`` 
     - Statistics related to the execution of the |query-type| query. There 
       are two tasks whose invocation counts are enumerated in this 
       area: 
      
       .. list-table:: 
          :widths: 20 80 

          * - ``createScorer``
            - Scorer iterates over documents and generates a score for 
              each document. Invocations of ``createScorer`` create the 
              object responsible for scoring. Note that time associated 
              with this task is not time spent actually scoring 
              documents. Count includes the number of 
              ``scorerSupplier`` invocations.

          * - ``createWeight``
            - Weight stores state associated with a query and 
              ``IndexSearcher``. Count includes the number of 
              ``createWeight`` invocations.
      
       The |timing-ref| spent in this area is related 
       to the structure of the query, and is not based on the number of 
       results that are iterated through and scored. 

       For example: 

       .. code-block:: json 
          :copyable: false 

          "context" : {
            "millisElapsed" : NumberDouble(4.934751),
            "invocationCounts" : {
              "createWeight" : NumberLong(1),
              "createScorer" : NumberLong(10)
            }
          }

   * - ``match``
     - Statistics related to iterating over and matching result 
       documents. This statistic shows the time it takes to determine 
       which document is the next match. Time spent matching results 
       can vary significantly depending on the nature of the query. 
       There are two tasks whose invocation counts are enumerated in 
       this area: 

       .. list-table:: 
          :widths: 20 80 

          * - ``nextDoc`` 
            - Requests to advance to the next document of the result 
              set. This involves identifying and moving past skips, or 
              other tasks necessary to find the next match. Count 
              includes the number of ``nextDoc`` and ``advance`` 
              invocations.

          * - ``refineRoughMatch`` 
            - Performs a more thorough match. Some queries execute in a 
              two-phase process where a document is first "roughly" 
              matched, and is checked with a second, more thorough 
              phase only after satisfying the first rough match. The 
              ``refineRoughMatch`` task is the second phase of the 
              two-phase process. Count includes the number of ``refineRoughMatch`` invocations.

       For example: 

       .. code-block:: json 
          :copyable: false 

          "match" : {
            "millisElapsed" : NumberDouble(4.901597),
            "invocationCounts" : {
              "nextDoc" : NumberLong(541),
              "refineRoughMatch" : NumberLong(0)
            }
          }

   * - ``score``
     - Statistics related to scoring documents in the result set. There 
       are two tasks whose invocation counts are enumerated in this 
       area:

       .. list-table:: 
          :widths: 20 80 

          * - ``score``
            - Scores each document in the result set. Count includes 
              the number of ``score`` invocations.

          * - ``setMinCompetitiveScore``
            - Ignores documents whose score is less than the given 
              value. Indicates that a query may have been able to 
              reduce the number of scoring operations performed by 
              ignoring documents with scores below some uncompetitive 
              threshold. Count includes the number of 
              ``setMinCompetitiveScore`` invocations.

       For example: 

       .. code-block:: json 
          :copyable: false 

          "score" : {
            "millisElapsed" : NumberDouble(3.931312),
            "invocationCounts" : {
              "score" : NumberLong(536),
              "setMinCompetitiveScore" : NumberLong(0)
            }
          }
