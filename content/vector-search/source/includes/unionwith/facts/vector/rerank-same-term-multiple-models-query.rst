This sample query uses the ``$rankFusion`` with the
following input pipeline stages: 

..  list-table:: 
    :stub-columns: 1
    :widths: 20 80

    * - :pipeline:`$vectorSearch` 
      - - Searches the ``plot_embedding`` field for the string
          *journey across lands* specified in the ``queryVector``
          field of the query as vector embeddings by using the
          ``JOURNEY_ACROSS_LANDS_OPENAI`` variable. 
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

..  list-table:: 
    :stub-columns: 1
    :widths: 20 80

    * - :pipeline:`$project`
      - - Includes only the ``plot`` and ``title`` fields in the results.
        - Adds a field named ``scoreDetails`` in the results.

    * - :pipeline:`$limit`
      - Limits the returned results to 100 documents.

{+avs+} merges the results for both the queries into a single
result set. It then reorders the results by using the
:pipeline:`$rerank` stage. The ``$rerank`` stage reorders the
results by relevance to the query term ``journey across
lands``. In the results, the :pipeline:`$rerank` stage adds a
field named ``rerankScore`` that shows the score after
reordering.