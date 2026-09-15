.. procedure:: 
   :style: normal 

   .. step:: Define the {+avs+} index.
    
      Create a file named ``vector-index.go`` and paste the following code in
      the file:

      .. literalinclude:: /code-examples/tested/go/driver/vector_search/local_rag/vector_index.snippet.vector-index.go
         :language: go
         :caption: vector-index.go
         :category: usage example

      This index definition indexes the ``embeddings`` field
      in an index of the :ref:`vectorSearch <avs-types-vector-search>` type
      for the ``sample_airbnb.listingsAndReviews`` collection.
      This field contains the embeddings created using the
      embedding model. The index definition specifies ``768`` vector
      dimensions and measures similarity using ``cosine``.

   .. step:: Create the {+avs+} index.

      Save the file, and then run the following command in your terminal
      to execute the code:

      .. code-block:: sh
         :copyable: true 

         go run vector-index.go
