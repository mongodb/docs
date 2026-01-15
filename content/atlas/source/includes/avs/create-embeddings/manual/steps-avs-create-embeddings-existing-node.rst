.. procedure::
   :style: normal
      
   .. step:: Create a file named ``create-embeddings.js`` and paste the following code.
            
      Use the following code to generate embeddings from an existing
      collection. Specifically, this code does the following:

      - Connects to your MongoDB deployment.

      - Gets a subset of documents from the 
        ``sample_airbnb.listingsAndReviews`` collection that 
        have a non-empty ``summary`` field.

      - Generates embeddings from each document's ``summary`` field
        by using the ``getEmbedding()`` function that you defined.

      - Updates each document with a new ``embedding`` field 
        that contains the embedding value by using the MongoDB 
        :driver:`Node.js Driver </node/current/>` 

      .. collapsible::
         :heading: (Advanced) Compress your embeddings.
         :sub_heading: Expand this section if you defined the function to convert your embeddings to BSON binary format.
         :expanded: false

         If you defined the ``convertEmbeddingsToBSON`` function,  
         uncomment lines ``3`` and ``29``-``30``  to convert your 
         embeddings to |bson| ``binData`` vectors.

      .. literalinclude:: /includes/avs/tutorial/create-embeddings-existing.js
         :language: javascript
         :copyable:
         :linenos:
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

      .. include:: /includes/avs/facts/fact-view-embeddings-atlas-ui-airbnb.rst
       