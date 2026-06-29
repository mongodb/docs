The sample query boosts the :pipeline:`$search` results based on
:pipeline:`$vectorSearch` result scores to return the most relevant
documents. For semantic boosting, you perform the following steps:

1. Run the :pipeline:`$vectorSearch` query.

   Use an *over request* value to specify the number of candidates
   more than the specified limit to consider. The *over request* allows
   you to accomplish the following:

   - Include a large number and broad pool of documents to consider in
     the initial search.
   - Refine scoring computation in subsequent stages.

   The query uses the following calculation to determine the number of
   candidates to consider during the vector search:

   .. code-block:: shell
      :copyable: false

      numCandidates = limit * over request

   The results are filtered based on a minimum score threshold
   (``vectorCutoff``).

#. Scale the vector search score to adjust the influence of the vector
   search results on the scoring and ranking of documents.

   Use the ``vectorWeight`` parameter to set the weight and multiply
   the vector search scores by the ``vectorWeight``. This controls the
   importance of the vector search results and ensures that only the
   most semantically relevant documents are considered.

#. Run the :pipeline:`$search` query and boost the score of the
   documents that match the results from the vector search.
