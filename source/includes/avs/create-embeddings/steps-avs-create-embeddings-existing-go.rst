.. procedure::
   :style: normal

   .. step:: Create a file named ``create-embeddings.go`` and paste the following code.
            
      Use the following code to generate embeddings from an existing
      collection in |service|. Specifically, this code does the following:

      - Connects to your |service| {+cluster+}.

      - Gets a subset of documents from the 
        ``sample_airbnb.listingsAndReviews`` collection that 
        have a non-empty ``summary`` field.

      - Generates embeddings from each document's ``summary`` field
        by using the ``GetEmbeddings`` function that you defined.

      - Updates each document with a new ``embeddings`` field 
        that contains the embedding value by using the MongoDB 
        :driver:`Go Driver </go/>`.

      .. literalinclude:: /includes/avs/tutorial/create-embeddings-existing.go
         :language: go
         :copyable:
         :caption: create-embeddings.go

   .. step:: Create a file that contains Go models for the collection.

      To simplify marshalling and unmarshalling Go objects to and from BSON,
      create a file that contains models for the documents in this collection.

      a. Move into the ``common`` directory.

         .. code-block:: console

            cd common

      #. Create a file named ``models.go``, and paste the following code into
         it:

         .. tabs::
            :hidden:
         
            .. tab:: Open-Source
               :tabid: open-source
                     
               .. literalinclude:: /includes/avs/tutorial/airbnb-listings-models-open-source.go
                  :language: go
                  :copyable:
                  :caption: models.go

            .. tab:: OpenAI
               :tabid: openai

               .. literalinclude:: /includes/avs/tutorial/airbnb-listings-models-open-ai.go
                  :language: go
                  :copyable:
                  :caption: models.go

      #. Move back into the project root directory.

         .. code-block:: console

            cd ../

   .. step:: Generate embeddings.

      .. io-code-block:: 
         :copyable: true 
         
         .. input:: 

            go run create-embeddings.go

         .. output:: 
            :language: sh

            2024/10/10 09:58:03 Generating embeddings.
            2024/10/10 09:58:12 Successfully added embeddings to 50 documents 

      .. include:: /includes/avs/facts/fact-view-embeddings-atlas-ui-airbnb.rst
       