**Optionally**, to configure |vector-search| to automatically generate 
vector embeddings for text data in your collections and queries, you 
must create |api| keys for the embedding service. We recommend creating 
two keys, one for generating embeddings at index-time for text data in 
your collection and another for generating embeddings at query-time for 
your query text. If you don't have the keys, you can create the keys 
from the :ref:`Atlas UI <voyage-api-keys>`.