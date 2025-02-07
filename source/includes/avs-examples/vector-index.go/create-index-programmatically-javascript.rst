.. procedure:: 
   :style: normal 

   .. step:: Define the {+avs+} index.
    
      Create a file named ``vector-index.js`` and paste the following code in
      the file:

      .. literalinclude:: /includes/avs-examples/local-rag/vector-index.js
         :language: javascript

      This index definition indexes the ``embeddings`` field
      in an index of the :ref:`vectorSearch <avs-types-vector-search>` type
      for the ``sample_airbnb.listingsAndReviews`` collection.
      This field contains the embeddings created using the
      embedding model. The index definition specifies ``1024`` vector
      dimensions and measures similarity using ``cosine``.

   .. step:: Create the {+avs+} index.

      a. Save the file, and then run the following command in your terminal
         to execute the code:

         .. code-block:: sh
            :copyable: true 

            node --env-file=.env vector-index.js
