This sample query uses the ``$rankFusion`` with the
following input pipeline stages: 

..  list-table:: 
    :stub-columns: 1
    :widths: 20 80

    * - :pipeline:`$vectorSearch` 
      - - Searches the ``fullplot`` field for the phrase *battle 
          between good and evil*.
        - Specifies a search for up to ``2000`` nearest
          neighbors. 
        - Limits the results to ``200`` documents only.
        - Specifies a weight of ``0.5`` to influence that
          pipeline's rank contribution to the final score. 

    * - :pipeline:`$vectorSearch`
      - - Performs a sequential vector search on the ``title`` field 
          for the string *battle between good and evil*. 
        - Specifies a search for up to ``2000`` nearest neighbors.
        - Limits the results to ``200`` documents only.
        - Specifies a weight of ``0.5`` to influence that
          pipeline's rank contribution to the final score.

The sample query also specifies the following pipeline stages.

..  list-table:: 
    :stub-columns: 1
    :widths: 20 80

    * - :pipeline:`$project`
      - - Includes only the ``fullplot`` and ``title`` fields in the 
          results.
        - Adds a field named ``scoreDetails`` in the results.

    * - :pipeline:`$limit`
      - Limits the returned results to 200 documents.

{+avs+} merges the results for both queries into a single
result set. It then reorders the results by using the
:pipeline:`$rerank` stage. The :pipeline:`$match` stage filters the
documents to include only documents that have a ``plot`` field of
type ``string``. The ``$rerank`` stage reorders the results by 
relevance to the query term ``battle between good and evil``. In the 
results, the :pipeline:`$rerank` stage adds a field named 
``rerankScore`` that shows the score after reordering.