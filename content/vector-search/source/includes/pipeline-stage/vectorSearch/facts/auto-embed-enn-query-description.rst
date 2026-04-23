The following query uses the :pipeline:`$vectorSearch` stage to search
the ``fullplot`` field for movies. The query automatically generates
vector embeddings for the string *solo traveler discovering new
cultures* using the ``voyage-4`` model, which is the model used in the 
index for the ``fullplot`` field, to perform semantic search. It requests 
exact matches and limits the results to ``10`` documents only. The query 
also specifies a :pipeline:`$project` stage to do the following:

- Exclude the ``_id`` field and include only the ``fullplot`` and
  ``title`` fields in the results.
- Add a field named ``score`` that shows the vector search score
  of the documents in the results.
