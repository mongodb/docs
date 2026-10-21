.. note::

   The Python client routes requests based on your
   {+model-api-key+} format. Keys created in |service| route to the
   ``https://ai.mongodb.com/`` endpoints, and keys created on the
   {+voyage+} platform route to the ``https://api.voyageai.com/``
   endpoints. To override this behavior, pass the ``base_url``
   parameter when you instantiate the ``VoyageAIEmbeddings`` class.
