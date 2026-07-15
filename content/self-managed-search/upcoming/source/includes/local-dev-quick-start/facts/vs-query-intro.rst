The following query uses the :pipeline:`$vectorSearch` stage to:

- Search the ``plot_embedding_voyage_4_large`` field for approximate 
  nearest neighbors by using vector embeddings for the string 
  ``courtroom lawyer``.   
- Consider up to ``100`` nearest neighbors, but limit the output to only 
  3 results.