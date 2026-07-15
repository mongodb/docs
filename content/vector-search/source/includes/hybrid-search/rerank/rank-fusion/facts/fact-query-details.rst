The sample query uses the ``$rankFusion`` stage to execute the
semantic and full text queries independently and then de-duplicate and
combine the input query results into a final ranked results set. It
returns a ranked set of documents based on the ranks that appear in
their input pipelines and the pipeline weights. The sample query then 
uses the following stages to rerank the results from the
``$rankFusion`` stage:

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

The query results show the results reordered based on the rerank scores. 
It varies from the preceding query because the results demonstrate the 
full sentence describing intent (tone, adventurous, or comedic) from 
the movie plot. For example, "Frog" is at the top in the reranked output 
even though it had a lower ``rankFusion`` score because the rerank model 
judged its plot as semantically close to "charming animals with a fun, 
adventurous, or comedic tone," regardless of its rank-fusion score.
