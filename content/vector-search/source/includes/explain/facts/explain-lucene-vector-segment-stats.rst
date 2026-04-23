The ``luceneVectorSegmentStats`` array of objects contain per-Lucene
segment breakdown of the :pipeline:`$vectorSearch` query execution.
Each segment is identified by a number and includes the parameters
that describe the query execution details. 

.. code-block:: javascript
   :copyable: false 

   {
     "0": {
       "executionType": "Approximate",
       "approximateTimeMillis": 0.10825,
       "filterMatchedDocsCount": 0,
       "docCount": 100
     },
     "1": {
       "executionType": "Exact",
       "exactTimeMillis": 0.10825,
       "filterMatchedDocsCount": 0,
       "docCount": 55
     },
     "2": {
       "executionType": "ApproximateToExactFallback",
       "approximateTimeMillis": 0.10825,
       "exactTimeMillis": 0.10825,
       "filterMatchedDocsCount": 0,
       "docCount": 55
     }
   }

.. list-table:: 
   :header-rows: 1
   :widths: 15 15 10 60

   * - Field 
     - Type 
     - Necessity 
     - Purpose

   * - ``executionType``
     - String
     - Required
     - The execution strategy. Value can be one of the following: 

       - ``Approximate`` 
       - ``Exact`` 
       - ``ApproximateToExactFallback`` 

   * - ``approximateStage``
     - Float
     - Conditional
     - Time (in milliseconds) for the approximate phase. This is
       returned only for ``Approximate`` and
       ``ApproximateFallbackToExact`` execution types. 

   * - ``exactStage``
     - Float
     - Conditional
     - Time (in milliseconds) for the Exact phase. This is returned
       only for ``Exact`` and ``ApproximateFallbackToExact`` execution
       types.  

   * - ``filterMatchedDocsCount``
     - Integer
     - Optional
     - The number of documents that matched the query filter if you
       specified a prefilter in the query. 

   * - ``docCount``
     - Integer
     - Required
     - Total number of documents in the segment.
