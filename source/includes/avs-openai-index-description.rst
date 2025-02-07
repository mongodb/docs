The following index definition indexes the ``plot_embedding``
field as the ``vector`` type. The ``plot_embedding`` field 
contains embeddings created using
OpenAI's ``text-embedding-ada-002`` embeddings model. The
index definition specifies ``1536`` vector dimensions and
measures similarity using ``dotProduct`` function. 