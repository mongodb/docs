Type of the input text. Defaults to ``None``. Valid values: 
``None``, ``query``, ``document``.

For semantic search and retrieval tasks, always specify
``input_type`` as either ``query`` or ``document`` for optimal results.

When ``input_type`` is ``None``, the embedding model directly 
converts the inputs into numerical vectors. If you use a 
"query" to search for relevant information among a collection 
of data (referred to as "documents"), we recommend specifying 
whether your inputs are intended as queries or documents by 
setting ``input_type`` to ``query`` or ``document``, 
{+voyageai+} automatically prepends the following 
prompts to your inputs before vectorizing them, creating 
vectors more tailored for search and retrieval tasks: 

- For ``query``, the prompt is "Represent the query for 
  retrieving supporting documents: ".
- For ``document``, the prompt is "Represent the document for 
  retrieval: ".

While embeddings generated with and without the ``input_type`` 
argument are technically compatible for comparison, specifying 
``input_type`` significantly improves retrieval accuracy.
