.. procedure::
   :style: normal

   .. step:: Load your data.

      The following code defines an array of sample texts.

      .. code-block:: python

         # Sample data
         texts = [
           "Titanic: The story of the 1912 sinking of the largest luxury liner ever built",
           "The Lion King: Lion cub and future king Simba searches for his identity",
           "Avatar: A marine is dispatched to the moon Pandora on a unique mission"
         ]

   .. step:: Generate embeddings from your data.
            
      Use the ``get_embedding`` function to generate 
      embeddings from your data. Use the following code 
      generates embeddings from the sample texts.

      If you defined the ``generate_bson_vector`` function, 
      uncomment the line that calls this function to compress 
      your embeddings to ``binData`` vectors. Your embeddings
      will appear in binary format.
            
      .. io-code-block:: 
         :copyable: true
         
         .. input:: 
            :language: python

            # Generate embeddings from the sample data
            embeddings = []
            for text in texts:
             embedding = get_embedding(text)

             # Uncomment the following line to convert to BSON
             # embedding = generate_bson_vector(embedding, BinaryVectorDtype.FLOAT32)
             
             embeddings.append(embedding)

             # Print the embeddings
             print(f"\nText: {text}")
             print(f"Embedding: {embedding[:3]}... (truncated)")

         .. output:: 
            :language: shell
            :visible: false

            Generated embeddings:

            Text: Titanic: The story of the 1912 sinking of the largest luxury liner ever built
            Embedding: [-0.01089042  0.05926645 -0.00291325]... (truncated)

            Text: The Lion King: Lion cub and future king Simba searches for his identity
            Embedding: [-0.05607051 -0.01360618  0.00523855]... (truncated)

            Text: Avatar: A marine is dispatched to the moon Pandora on a unique mission
            Embedding: [-0.0275258   0.01144342 -0.02360895]... (truncated)

   .. step:: Ingest the embeddings into |service|.

      Perform the following steps to create documents with the
      embeddings and ingest them into your |service| {+cluster+}:
      
      a. Define a function to create documents.

         .. code-block:: python 

            def create_docs_with_embeddings(embeddings, data):  
               docs = []  
               for i, (embedding, text) in enumerate(zip(embeddings, data)):  
                  doc = {  
                        "_id": i,  
                        "text": text,  
                        "embedding": embedding,
                  }  
                  docs.append(doc)  
               return docs  

      #. Create the documents with your embeddings.

         .. code-block:: python 

            # Create documents with embeddings and sample data
            docs = create_docs_with_embeddings(embeddings, texts)

      #. Ingest the documents into |service|.

         Paste and run the following code in your notebook, replacing
         ``<connection-string>`` with your |service| {+cluster+}'s |srv|
         :manual:`connection string </reference/connection-string/#find-your-mongodb-atlas-connection-string>`.

         .. note::
            
            .. include:: /includes/fact-connection-string-format-drivers.rst
             
         This code does the following:

         - Connects to your |service| {+cluster+}.
         - Inserts the documents into the specified database 
           and collection.

         .. io-code-block:: 
            :copyable: true 

            .. input::
               :language: python

               import pymongo

               # Connect to your Atlas cluster
               mongo_client = pymongo.MongoClient("<connection-string>")
               db = mongo_client["sample_db"]
               collection = db["embeddings"]

               # Ingest data into Atlas
               collection.insert_many(docs)

            .. output:: 

               InsertManyResult([0, 1, 2], acknowledged=True)
        
         You can verify your vector embeddings by viewing them :ref:`in the
         {+atlas-ui+} <atlas-ui-view-collections>` for the
         ``sample_db.embeddings`` namespace in your {+cluster+}. 
