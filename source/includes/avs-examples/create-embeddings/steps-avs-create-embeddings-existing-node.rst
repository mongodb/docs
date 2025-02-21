.. procedure::
   :style: normal
      
   .. step:: Create a file named ``create-embeddings.js`` and paste the following code.
            
      Use the following code to generate embeddings from an existing
      collection in |service|. Specifically, this code does the following:

      - Connects to your |service| {+cluster+}.

      - Gets a subset of documents from the 
        ``sample_airbnb.listingsAndReviews`` collection that 
        have a non-empty ``summary`` field.

      - Generates embeddings from each document's ``summary`` field
        by using the ``getEmbedding`` function that you defined.

      - Updates each document with a new ``embedding`` field 
        that contains the embedding value by using the MongoDB 
        :driver:`Node.js Driver </nodejs/>`.

      .. literalinclude:: /includes/avs-examples/tutorial/create-embeddings-existing.js
         :language: javascript
         :copyable:
         :caption: create-embeddings.js

   .. step:: Save and run the file.

      .. io-code-block:: 
         :copyable: true 
         
         .. input:: 

            node --env-file=.env create-embeddings.js

         .. output:: 
            :language: sh

            Generating embeddings and updating documents...
            Count of documents updated: 50

      You can view your vector embeddings as they generate by 
      navigating to the ``sample_airbnb.listingsAndReviews`` collection 
      :ref:`in the {+atlas-ui+} <atlas-ui-view-collections>` and expanding 
      the fields in a document.
