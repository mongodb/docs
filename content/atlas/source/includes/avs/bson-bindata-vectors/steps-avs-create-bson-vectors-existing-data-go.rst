Procedure
~~~~~~~~~

.. procedure:: 
   :style: normal 

   .. include:: /includes/avs/bson-bindata-vectors/steps-shared-go.rst 

   .. step:: (Conditional) Generate embeddings from your data. 

      You can use an embedding model provider to generate ``float``,
      ``int8``, and ``int1`` embeddings for your data and then use the
      :driver:`MongoDB Go driver </go/current/>` to convert your
      native vector embedding to |bson| vectors. The following sample
      code uses |voyage|'s ``voyage-3-large`` embedding model to
      generate full-precision vectors from the data in the
      ``sample_airbnb.listingsAndReviews`` namespace. 

      a. Create a new file named ``GenerateAndConvertEmbeddings.go``
         in your Go project. 

         .. code-block:: shell 

            touch GenerateAndConvertEmbeddings.go

      #. Copy and paste the following code in the
         ``GenerateAndConvertEmbeddings.go`` file. 
      
         This code does the following:

         - Gets the ``summary`` field from 50 documents in the
           ``sample_airbnb.listingsAndReviews`` namespace.
         - Generates the ``float32``, ``int8``, and ``ubinary`` vector
           embeddings by using |voyage|'s |api|.
         - Converts the embeddings to |bson| ``binData`` vectors by using
           :driver:`MongoDB Go driver </go/current/>`. 
         - Creates a file named ``embeddings.json`` and saves
           the data with embeddings in the file. 

         .. literalinclude:: /includes/avs/bson-bindata-vectors/go/get-convert-embeddings-existing-data.go 
            :language: go
            :caption: GenerateAndConvertEmbeddings.go
            :linenos: 
            :copyable: true
     
      #. Replace the following placeholder values in the code if
         you didn't set the environment variables and save the file.

         .. list-table:: 
            :stub-columns: 1

            * - ``MONGODB_URI``
              - Your cluster connection string if you
                didn't set the environment variable. 

            * - ``VOYAGE_API_KEY``
              - Your |voyage| |api| key if you didn't set the environment variable. 

      #. Compile and run the file using your application run
         configuration.
         
         If you are using a terminal, run the following commands to
         compile and execute your program.

         .. io-code-block:: 
            :copyable: true 

            .. input:: 
               :language: shell 

               go run GenerateAndConvertEmbeddings.go 

            .. output:: 
               :language: shell 

               Embeddings successfully saved to embeddings.json

      #. Verify the embeddings in the ``embeddings.json`` file.

      To learn more about generating embeddings and converting the
      embeddings to ``binData`` vectors, see :ref:`create-vector-embeddings`.

   .. step:: Ingest the data and create a {+avs+} index. 

      You must upload your data and embeddings to a collection in your
      cluster and create a {+avs+} index on the data to
      run :pipeline:`$vectorSearch` queries against the data. 

      a. Create a new file named ``UploadDataAndCreateIndex.go``
         in your Go project. 

         .. code-block:: shell 

            touch UploadDataAndCreateIndex.go

      #. Copy and paste the following code in the
         ``UploadDataAndCreateIndex.go`` file. 
      
         This code does the following:

         - Uploads the ``float32``, ``int8``, and ``int1`` embeddings in
           the ``embeddings.json`` file to your cluster. 
         - Creates a {+avs+} index on the ``embeddings.float32``,
           ``embeddings.int8``, and ``embeddings.int1`` fields.  

         .. literalinclude:: /includes/avs/bson-bindata-vectors/go/upload-create-index-existing-data.go
            :language: go
            :caption: UploadDataAndCreateIndex.go
            :linenos: 
            :copyable: true

      #. Replace the following placeholder values in the code and save
         the file. 

         .. list-table:: 
            :stub-columns: 1

            * - ``MONGODB_URI``
              - Your cluster connection string if you
                didn't set the environment variable. 

            * - ``<INDEX-NAME>``
              - Name of the {+avs+} index for the collection. 

      #. Compile and run the file using your application run
         configuration.
         
         If you are using a terminal, run the following commands to
         compile and execute your program. 

         .. io-code-block:: 
            :copyable: true 

            .. input:: 
               :language: shell 

               go run UploadDataAndCreateIndex.go 

            .. output:: 
               :language: shell 

               Creating the index.
               Polling to confirm successful index creation.
               NOTE: This may take up to a minute.
               Name of Index Created: <INDEX-NAME>

      #. Log in to your cluster and verify the following:
      
         - Data in the namespace.
         - {+avs+} index for the collection.

   .. step:: Create and run query against the collection. 

      To test your embeddings, you can run a query against your
      collection. Use an embedding model provider to generate ``float``,
      ``int8``, and ``int1`` embeddings for your query text. The
      following sample code uses |voyage|'s |api| to generate
      full-precision vectors. After generating the embeddings, use the
      :driver:`MongoDB Go driver </go/current/>` to convert your native
      vector embedding to |bson| vectors and run
      :pipeline:`$vectorSearch` query against the collection.

      a. Create a new file named ``CreateEmbeddingsAndRunQuery.go``
         in your Go project. 

         .. code-block:: shell 

            touch CreateEmbeddingsAndRunQuery.go

      #. Copy and paste the following code in the
         ``CreateEmbeddingsAndRunQuery.go`` file. 
      
         This code does the following:

         - Generates the ``float32``, ``int8``, and ``ubinary`` vector
           embeddings by using |voyage|'s |api|.
         - Converts the embeddings to |bson| ``binData`` vectors by using
           :driver:`MongoDB Go driver </go/current/>`. 
         - Runs the query against your collection and returns the
           results. 

         .. literalinclude:: /includes/avs/bson-bindata-vectors/go/create-embeddings-run-query.go
            :language: go
            :caption: CreateEmbeddingsAndRunQuery.go
            :linenos: 
            :copyable: true

      #. Replace the following placeholder values in the code and save
         the file. 

         .. list-table:: 
            :stub-columns: 1

            * - ``MONGODB_URI``
              - Your cluster connection string if you
                didn't set the environment variable. 

            * - ``VOYAGE_API_KEY``
              - Your |voyage| |api| key if you didn't set the environment variable. 

            * - ``<DATABASE-NAME>``
              - Name of the database in your cluster. For
                this example, use ``sample_airbnb``. 

            * - ``<COLLECTION-NAME>``
              - Name of the collection where you ingested the data. For
                this example, use ``listingsAndReviews``. 

            * - ``<INDEX-NAME>``
              - Name of the {+avs+} index for the collection. 

            * - ``<TEXT-FIELD-NAME>``
              - Name of the field that contain the text from which you
                generated embeddings. For this example, use ``summary``. 

            * - ``<QUERY-TEXT>``
              - Text for the query. For this example, use ``ocean view``. 

            * - ``<NUMBER-OF-CANDIDATES-TO-CONSIDER>``
              - Number of nearest neighbors to consider during the
                search. For this example, use ``20``. 

            * - ``<NUMBER-OF-DOCUMENTS-TO-RETURN>``
              - Number of documents to return in the results. For this
                example, use ``5``.  


      #. Compile and run the file using your application run
         configuration.
         
         If you are using a terminal, run the following commands to
         compile and execute your program. 

         .. io-code-block:: 
            :copyable: true 

            .. input:: 
               :language: shell 

               go run CreateEmbeddingsAndRunQuery.go 

            .. output:: 
               :language: shell 

               Results from embeddings_float32 embeddings:
               {"_id":"10266175","summary":"A beautiful and comfortable 1 Bedroom Air Conditioned Condo in Makaha Valley - stunning Ocean & Mountain views All the amenities of home, suited for longer stays. Full kitchen & large bathroom.  Several gas BBQ's for all guests to use & a large heated pool surrounded by reclining chairs to sunbathe.  The Ocean you see in the pictures is not even a mile away, known as the famous Makaha Surfing Beach. Golfing, hiking,snorkeling  paddle boarding, surfing are all just minutes from the front door.","score":{"$numberDouble":"0.7278661131858826"}}
               {"summary":"A short distance from Honolulu's billion dollar mall, and the same distance to Waikiki. Parking included. A great location that work perfectly for business, education, or simple visit. Experience Yacht Harbor views and 5 Star Hilton Hawaiian Village.","score":{"$numberDouble":"0.688639760017395"},"_id":"1001265"}
               Results from embeddings_int8 embeddings:
               {"_id":"10266175","summary":"A beautiful and comfortable 1 Bedroom Air Conditioned Condo in Makaha Valley - stunning Ocean & Mountain views All the amenities of home, suited for longer stays. Full kitchen & large bathroom.  Several gas BBQ's for all guests to use & a large heated pool surrounded by reclining chairs to sunbathe.  The Ocean you see in the pictures is not even a mile away, known as the famous Makaha Surfing Beach. Golfing, hiking,snorkeling  paddle boarding, surfing are all just minutes from the front door.","score":{"$numberDouble":"0.5215557217597961"}}
               {"_id":"1001265","summary":"A short distance from Honolulu's billion dollar mall, and the same distance to Waikiki. Parking included. A great location that work perfectly for business, education, or simple visit. Experience Yacht Harbor views and 5 Star Hilton Hawaiian Village.","score":{"$numberDouble":"0.5179016590118408"}}
               Results from embeddings_int1 embeddings:
               {"_id":"10266175","summary":"A beautiful and comfortable 1 Bedroom Air Conditioned Condo in Makaha Valley - stunning Ocean & Mountain views All the amenities of home, suited for longer stays. Full kitchen & large bathroom.  Several gas BBQ's for all guests to use & a large heated pool surrounded by reclining chairs to sunbathe.  The Ocean you see in the pictures is not even a mile away, known as the famous Makaha Surfing Beach. Golfing, hiking,snorkeling  paddle boarding, surfing are all just minutes from the front door.","score":{"$numberDouble":"0.6591796875"}}
               {"_id":"1001265","summary":"A short distance from Honolulu's billion dollar mall, and the same distance to Waikiki. Parking included. A great location that work perfectly for business, education, or simple visit. Experience Yacht Harbor views and 5 Star Hilton Hawaiian Village.","score":{"$numberDouble":"0.6337890625"}}

      To learn more about generating embeddings and converting the
      embeddings to ``binData`` vectors, see :ref:`create-vector-embeddings`.



    