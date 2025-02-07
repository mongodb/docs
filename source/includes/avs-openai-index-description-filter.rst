The following index definition indexes the ``plot_embedding``
field as the ``vector`` type and the ``genres`` and ``year``
fields as the ``filter`` type in an {+avs+} index. The
``plot_embedding`` field contains embeddings created using
OpenAI's ``text-embedding-ada-002`` embeddings model. The index 
definition specifies ``1536`` vector dimensions and measures
similarity using ``dotProduct`` function. 