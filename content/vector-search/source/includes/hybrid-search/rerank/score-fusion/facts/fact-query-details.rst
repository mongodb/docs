The sample query uses the ``$scoreFusion`` stage to execute the
semantic and full text queries independently and then de-duplicate and
combine the input query results into a final scored results set. It
returns a set of documents based on the combined score from their
input pipelines and the combination weights. The sample query then uses 
the following stages to rerank the results from the ``$scoreFusion`` 
stage:

.. list-table:: 
   :widths: 30 70 

   * - :pipeline:`$rerank` 
     - Reranks the results from the ``$rankFusion`` stage using the
       ``rerank-2.5`` model. The ``query`` field specifies the same
       query as the :pipeline:`$rankFusion` query. The ``path`` field
       specifies the ``fullplot`` field as the text field to use for
       reranking. The ``numDocsToRerank`` field specifies the number of
       documents to rerank. This stage returns the reranked documents in
       the results.

   * - :pipeline:`$addFields` 
     - Adds the ``rerankScore`` field to the results. The value of the
       ``rerankScore`` field is the score returned by the ``$rerank``
       stage.

The sample query uses the following stages to limit and return the
results:

.. list-table:: 
   :widths: 30 70 

   * - :pipeline:`$limit` 
     - Limits the output to ``10`` results only.

   * - :pipeline:`$project` 
     - Includes only the following fields in the results:  

       - ``title`` 
       - ``fullplot`` 
       - ``scoreDetails``
       - ``rerankScore``