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
      - - Performs a sequential vector search on the
          ``fullplot`` field for the phrase *slapstick humor with 
          paranormal events*.
        - Specifies a search for up to ``2000`` nearest neighbors.
        - Limits the results from this stage to ``50`` documents.
        - Specifies a weight of ``0.5`` to influence that
          pipeline's rank contribution to the final score.

The sample query also specifies the following pipeline stages.

..  list-table:: 
    :stub-columns: 1
    :widths: 20 80

    * - :pipeline:`$project`
      - - Includes only the ``fullplot`` and ``title`` fields in 
          the results.
        - Adds a field named ``scoreDetails`` in the results.

    * - :pipeline:`$limit`
      - Limits the returned results to 50 documents.

{+avs+} merges the results for both the queries into a single
result set. It then reorders the results by using the
:pipeline:`$rerank` stage. The ``$rerank`` stage reorders the 
results by relevance to the query term ``light-hearted comedy 
with ghosts``. In the results, the :pipeline:`$rerank` stage 
adds a field named ``rerankScore`` that shows the score after 
reordering. The reordered results are more relevant to the query 
term.