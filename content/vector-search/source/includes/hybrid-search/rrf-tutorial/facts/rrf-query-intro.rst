The sample query retrieves the sorted search results from the
semantic search and the full-text search, and assigns a reciprocal rank
score to the documents in the results based on their position in the
results array. The reciprocal rank score is calculated by using the
following formula:  

.. code-block:: 
   :copyable: false 

   1.0/{document position in the results + constant value} 

The query then adds the scores from both the searches for each document,
ranks the documents based on the combined score, and sorts the documents
to return a single result. The value for constant is always ``60``.
