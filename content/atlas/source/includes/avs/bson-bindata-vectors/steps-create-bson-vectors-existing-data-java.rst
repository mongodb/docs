Procedure
~~~~~~~~~

Create a Java project in your IDE with the dependencies configured
for the :driver:`MongoDB Java Driver
</java/sync/current/quick-start/>`, and then perform the following
steps in the project. To try the example, replace the placeholders
with valid values.

.. procedure:: 
   :style: normal 

   .. include:: /includes/avs/bson-bindata-vectors/steps-shared-java.rst

   .. step:: (Conditional) Generate embeddings from your data. 

      You can use an embedding model provider to generate ``float``,
      ``int8``, and ``int1`` embeddings for your data and then use the
      :driver:`MongoDB Java Driver </java/sync/current/>` to
      convert your native vector embedding to |bson| vectors. The
      following sample code uses |voyage|'s REST |api| to generate
      full-precision vectors from the data in the
      ``sample_airbnb.listingsAndReviews`` namespace.

      a. Create a new file named ``GenerateAndConvertEmbeddings.java``
         in your Java project. 

         .. code-block:: shell 

            touch GenerateAndConvertEmbeddings.java

      #. Copy and paste the following code in the
         ``GenerateAndConvertEmbeddings.java`` file. 
      
         This code does the following:

         - Gets the ``summary`` field from 50 documents in the
           ``sample_airbnb.listingsAndReviews`` namespace.
         - Generates the ``float32``, ``int8``, and ``ubinary`` vector
           embeddings by using |voyage|'s ``voyage-3-large`` embedding model.
         - Converts the embeddings to |bson| ``binData`` vectors by using the
           :driver:`MongoDB Java Driver </java/sync/current/>`. 
         - Creates a file named ``embeddings.json`` and saves
           the data with embeddings in the file. 

         .. literalinclude:: /includes/avs/bson-bindata-vectors/java/get-convert-embeddings-existing-data.java 
            :language: java
            :caption: GenerateAndConvertEmbeddings.java
            :linenos: 
            :copyable: true

      #. Compile and run the file using your application run
         configuration.
         
         If you are using a terminal, run the following commands to
         compile and execute your program.

         .. io-code-block:: 
            :copyable: true 

            .. input:: 
               :language: shell 

               javac GenerateAndConvertEmbeddings.java 
               java GenerateAndConvertEmbeddings

            .. output:: 
               :language: shell 

               [main] INFO GenerateAndConvertEmbeddings - Connecting to MongoDB at URI: <CONNECTION-STRING>
               ...
               [main] INFO GenerateAndConvertEmbeddings - Retrieved 50 summaries from MongoDB.
               [main] INFO GenerateAndConvertEmbeddings - Embeddings with BSON vectors have been saved to embeddings.json

      #. Verify the embeddings in the ``embeddings.json`` file.

      To learn more about generating embeddings and converting the
      embeddings to ``binData`` vectors, see :ref:`create-vector-embeddings`.

   .. step:: Ingest the data and create a {+avs+} index. 

      You must upload your data and embeddings to a collection in your cluster and create a {+avs+} index on the data to
      run :pipeline:`$vectorSearch` queries against the data. 

      a. Create a new file named ``UploadDataAndCreateIndex.java``
         in your Java project. 

         .. code-block:: shell 

            touch UploadDataAndCreateIndex.java

      #. Copy and paste the following code in the
         ``UploadDataAndCreateIndex.java`` file. 
      
         This code does the following:

         - Uploads the ``float32``, ``int8``, and ``int1`` embeddings in
           the ``embeddings.json`` file to your cluster. 
         - Creates a {+avs+} index on the ``embeddings.float32``,
           ``embeddings.int8``, and ``embeddings.int1`` fields.  

         .. literalinclude:: /includes/avs/bson-bindata-vectors/java/upload-create-index-existing-data.java
            :language: java
            :caption: UploadDataAndCreateIndex.java
            :linenos: 
            :copyable: true

      #. Replace the following placeholder value in the code and save
         the file. 

         .. list-table:: 
            :stub-columns: 1

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

               javac UploadDataAndCreateIndex.java 
               java UploadDataAndCreateIndex

            .. output:: 
               :language: shell 

               Processed document with summary: ...
               ...
               Successfully created vector index named: <INDEX_NAME>
               It may take up to a minute for the index to leave the BUILDING status and become queryable.
               Polling to confirm the index has changed from the BUILDING status.
               <INDEX_NAME> index is ready to query

      #. Log in to your cluster and verify the following:
      
         - Data in the namespace.
         - {+avs+} index for the collection.

   .. step:: Create and run query against the collection. 

      To test your embeddings, you can run a query against your
      collection. Use an embedding model provider to generate ``float``,
      ``int8``, and ``int1`` embeddings for your query text. The
      following sample code uses |voyage|'s REST |api| to generate
      full-precision vectors. After generating the embeddings, use the
      :driver:`MongoDB Java Driver </java/sync/current/>` to 
      convert your native vector embedding to |bson| vectors and run
      :pipeline:`$vectorSearch` query against the collection.

      a. Create a new file named ``CreateEmbeddingsAndRunQuery.java``
         in your Java project. 

         .. code-block:: shell 

            touch CreateEmbeddingsAndRunQuery.java

      #. Copy and paste the following code in the
         ``CreateEmbeddingsAndRunQuery.java`` file. 
      
         This code does the following:

         - Generates the ``float32``, ``int8``, and ``ubinary`` vector
           embeddings by using |voyage|'s ``voyage-3-large`` embedding model.
         - Converts the embeddings to |bson| ``binData`` vectors by using
           :driver:`MongoDB Java Driver </java/sync/current/>`. 
         - Runs the query against your collection and returns the
           results. 

         .. literalinclude:: /includes/avs/bson-bindata-vectors/java/create-embeddings-run-query.java
            :language: java
            :caption: CreateEmbeddingsAndRunQuery.java
            :linenos: 
            :copyable: true

      #. Replace the following placeholder values in the code and save
         the file. 

         .. list-table:: 
            :stub-columns: 1

            * - ``<DATABASE-NAME>``
              - Name of the database in your cluster. For this example, use ``sample_airbnb``.

            * - ``<COLLECTION-NAME>``
              - Name of the collection where you ingested the data. For this example, use ``listingsAndReviews``.

            * - ``<INDEX-NAME>``
              - Name of the {+avs+} index for the collection. 

            * - ``<DATA-FIELD-NAME>``
              - Name of the field that contain the text from which you
                generated embeddings. For this example, use ``summary``. 

            * - ``<QUERY-TEXT>``
              - Text for the query. For this example, use ``ocean view``. 

      #. Compile and run the file using your application run
         configuration.
         
         If you are using a terminal, run the following commands to
         compile and execute your program. 

         .. io-code-block:: 
            :copyable: true 

            .. input:: 
               :language: shell 

               javac CreateEmbeddingsAndRunQuery.java 
               java CreateEmbeddingsAndRunQuery

            .. output:: 
               :language: shell 

               Fetching embeddings...
               Using embeddings in vector search queries...
               Results from float32 embeddings:
               {"summary": "Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube) - UNESCO World Heritage Site. Centenary building fully rehabilitated, without losing their original character.", "vectorSearchScore": 0.5}
               {"summary": "One bedroom + sofa-bed in quiet and bucolic neighbourhood right next to the Botanical Garden. Small garden, outside shower, well equipped kitchen and bathroom with shower and tub. Easy for transport with many restaurants and basic facilities in the area.", "vectorSearchScore": 0.5}
               Results from int8 embeddings:
               {"summary": "A beautiful and comfortable 1 Bedroom Air Conditioned Condo in Makaha Valley - stunning Ocean & Mountain views All the amenities of home, suited for longer stays. Full kitchen & large bathroom.  Several gas BBQ's for all guests to use & a large heated pool surrounded by reclining chairs to sunbathe.  The Ocean you see in the pictures is not even a mile away, known as the famous Makaha Surfing Beach. Golfing, hiking,snorkeling  paddle boarding, surfing are all just minutes from the front door.", "vectorSearchScore": 0.5056195259094238}
               {"summary": "THIS IS A VERY SPACIOUS 1 BEDROOM FULL CONDO (SLEEPS 4) AT THE BEAUTIFUL VALLEY ISLE RESORT ON THE BEACH IN LAHAINA, MAUI!! YOU WILL LOVE THE PERFECT LOCATION OF THIS VERY NICE HIGH RISE! ALSO THIS SPACIOUS FULL CONDO, FULL KITCHEN, BIG BALCONY!!", "vectorSearchScore": 0.5048412084579468}
               Results from int1 embeddings:
               {"summary": "A beautiful and comfortable 1 Bedroom Air Conditioned Condo in Makaha Valley - stunning Ocean & Mountain views All the amenities of home, suited for longer stays. Full kitchen & large bathroom.  Several gas BBQ's for all guests to use & a large heated pool surrounded by reclining chairs to sunbathe.  The Ocean you see in the pictures is not even a mile away, known as the famous Makaha Surfing Beach. Golfing, hiking,snorkeling  paddle boarding, surfing are all just minutes from the front door.", "vectorSearchScore": 0.7119140625}
               {"summary": "A short distance from Honolulu's billion dollar mall, and the same distance to Waikiki. Parking included. A great location that work perfectly for business, education, or simple visit. Experience Yacht Harbor views and 5 Star Hilton Hawaiian Village.", "vectorSearchScore": 0.6787109375}


      To learn more about generating embeddings and converting the
      embeddings to ``binData`` vectors, see :ref:`create-vector-embeddings`.


