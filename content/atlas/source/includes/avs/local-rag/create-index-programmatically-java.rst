.. procedure::
   :style: normal

   .. step:: Define a method to create the {+avs+} index.

      Create a file named ``VectorIndex.java`` and paste the following
      code.

      This code calls a ``createSearchIndexes()`` helper
      method, which takes your ``MongoCollection`` object and creates an {+avs+}
      index on your collection using the following index definition:

      - Index the ``embedding`` field in a :ref:`vectorSearch
        <avs-types-vector-search>` index type for the
        ``sample_airbnb.listingsAndReviews`` collection.
        This field contains the embedding created using the embedding model.
      - Enforce ``768`` vector dimensions and measure similarity between
        vectors using ``cosine``.

      .. literalinclude:: /includes/avs/local-rag/VectorIndex.java
         :language: java
         :caption: VectorIndex.java

   .. step:: Create the {+avs+} index.

      Save and run the file. The output resembles:

      .. literalinclude:: /includes/avs/tutorial/output-vector-index-creation.sh
         :language: shell
