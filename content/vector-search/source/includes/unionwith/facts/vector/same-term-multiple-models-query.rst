This sample query uses the ``$rankFusion`` with the
following input pipeline stages: 

.. list-table:: 
   :stub-columns: 1
   :widths: 20 80

   * - :pipeline:`$vectorSearch` 
     - - Searches the ``plot_embedding`` field for the string
         *journey across lands* specified in the ``queryVector``
         field of the query as vector embeddings by using the
         ``JOURNEY_ACROSS_LANDS_OPENAI``
         variable. 
       - Specifies a search for up to ``2000`` nearest
         neighbors. 
       - Limits the results to ``100`` documents.
       - Specifies a weight of ``0.5`` to influence that
         pipeline's rank contribution to the final score. 

   * - :pipeline:`$vectorSearch`
     - - Performs a sequential vector search on the
         ``plot_embedding_voyage_4_large`` field for the string
         *journey across lands*, specified in the ``queryVector``
         field as vector embeddings by using the
         ``JOURNEY_ACROSS_LANDS_VOYAGEAI`` variable.  
       - Specifies a search for up to ``2000`` nearest
         neighbors. 
       - Limits the results to ``100`` documents.
       - Specifies a weight of ``0.5`` to influence that
         pipeline's rank contribution to the final score.

The sample query also specifies the following pipeline stages.

.. list-table:: 
   :stub-columns: 1
   :widths: 20 80

   * - :pipeline:`$project`
     - - Includes only the ``plot`` and ``title`` fields in the results.
       - Adds a field named ``scoreDetails`` in the results.

   * - :pipeline:`$limit`
     - Limits the returned results to 20 documents.

{+avs+} merges the results for both the queries into a single
result set. In the results:

- The ``scoreDetails.value`` shows the raw score from that
  pipeline before it is weighted and combined by using
  reciprocal rank fusion.  
- The ``score.details.rank`` shows the rank of the document in
  the results of the pipeline. 
- The ``scoreDetails.details.value`` contains the weighted
  reciprocal rank score, which shows the strengths and
  differences in the semantic interpretation of the query term
  by the different embedding models.  

For example, the first and fifth documents in the results suggest more
similar semantic representation by the model used in the
``vectorPipeline2`` while the second and fourth document in the
results suggest closer semantic interpretation by the model
used in the ``vectorPipeline1``.