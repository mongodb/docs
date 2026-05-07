The following example uses the ``voyage-4-large`` model to query the index 
that was built using the ``voyage-4`` model. The query automatically generates
vector embeddings for the string *young heroes caught in epic struggles between 
light and darkness* using the ``voyage-4-large`` embedding model, which is 
compatible with the ``voyage-4`` model used to index the ``fullplot`` field. 
The query specifies the following criteria to pre-filter the documents for the 
semantic search:

- Include only movies released between the years ``1980`` to ``2020``,
  both inclusive.
- Include only movies in the genres ``Action``, ``Adventure``, and
  ``Family``.