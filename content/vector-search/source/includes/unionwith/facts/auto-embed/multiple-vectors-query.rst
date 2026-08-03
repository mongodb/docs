This sample query uses the ``$rankFusion`` stage with the
following input pipeline stages: 

..  list-table:: 
    :stub-columns: 1
    :widths: 20 80

    * - :pipeline:`$vectorSearch` 
      - - Searches the ``fullplot`` field for the phrase 
          *light-hearted comedy with ghosts*. 
        - Specifies a search for up to ``2000`` nearest neighbors.
        - Limits the results from this stage to ``50`` documents.
        - Specifies a weight of ``0.5`` to influence that
          pipeline's rank contribution to the final score. 

    * - :pipeline:`$vectorSearch`
      - - Performs a sequential vector search on the ``fullplot`` 
          field for the phrase *slapstick humor with paranormal 
          events*.
        - Specifies a search for up to ``2000`` nearest neighbors.
        - Limits the results from this stage to ``50`` documents.
        - Specifies a weight of ``0.5`` to influence that
          pipeline's rank contribution to the final score.

The sample query also specifies the following pipeline stages:

..  list-table:: 
    :stub-columns: 1
    :widths: 20 80

    * - :pipeline:`$project`
      - - Includes only the ``fullplot`` and ``title`` fields in the results.
        - Adds a field named ``scoreDetails`` in the results.

    * - :pipeline:`$limit`
      - Limits the returned results to 20 documents.

{+avs+} merges the results for both queries into a single
result set. In the results:

- The ``scoreDetails.value`` shows the raw score from that
  pipeline before it is weighted and combined by using
  reciprocal rank fusion.  
- The ``score.details.rank`` shows the rank of the document in
  the results of the pipeline. 
- The ``scoreDetails.details.value`` contains the weighted
  reciprocal rank score. 

You can do the following: 

- Adjust the weights assigned to each pipeline in the query to
  further refine the results. 
- Increase the number of documents in the results if you see
  disjoint results. 