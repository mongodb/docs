This sample query uses the ``$rankFusion`` with the following input 
pipeline stages: 

.. list-table:: 
   :stub-columns: 1
   :widths: 20 80

   * - :pipeline:`$vectorSearch` 
     - - Searches the ``plot_embedding_voyage_4_large`` field
         for the phrase *battle between good and evil*,
         specified in the ``queryVector`` field of the query
         as vector embeddings by using the
         ``BATTLE_GOOD_EVIL`` variable.
       - Specifies a search for up to ``2000`` nearest
         neighbors. 
       - Limits the results to ``200`` documents only.
       - Specifies a weight of ``0.5`` to influence that
         pipeline's rank contribution to the final score. 

   * - :pipeline:`$vectorSearch`
     - - Performs a sequential vector search on the
         ``title_embedding_voyage_4_large`` field for the string
         *battle between good and evil*, specified in the
         ``queryVector`` field as vector embeddings by using
         the ``BATTLE_GOOD_EVIL`` variable. 
       - Specifies a search for up to ``2000`` nearest neighbors.
       - Limits the results to ``200`` documents only.
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
  reciprocal rank score, which shows which fields return the
  most relevant result for the query term.  

For example, the first and fourth documents in the results
suggest a significant match for the term in the ``plot``
field while the second and fifth documents suggest a
significant match in the ``title`` field. You can do the
following: 

- Adjust the weights assigned to each pipeline in the query to
  further refine the results. 
- Increase the number of documents in the results if you see
  disjoint results.