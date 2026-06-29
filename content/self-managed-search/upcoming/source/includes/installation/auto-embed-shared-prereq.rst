If you want {+avs+} to automatically generate embeddings for text data
in your collection, create endpoint service {+api+} keys. To learn more,
see :ref:`Automated Embedding <avs-auto-embeddings>`.

.. important:: 

   Automated Embedding is in Preview. The feature and corresponding documentation 
   might change at any time during the Preview period. To learn more, see `Preview 
   Features <https://www.mongodb.com/docs/preview-features/>`__.

If you don't already have the keys, create the endpoint service
{+api+} keys from the :dochub:`{+atlas-ui+} </voyage-api-keys>`. We
recommend that you create two keys, one for generating embeddings at
index-time and another for generating embeddings at query-time, from
two |service| projects.

.. note::

   Your provider endpoint for generating embeddings depends on
   whether you create the {+api+} keys from the {+atlas-ui+} or
   directly from {+voyageai+}.