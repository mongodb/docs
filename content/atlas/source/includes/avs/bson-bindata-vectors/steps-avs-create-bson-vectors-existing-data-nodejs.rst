Procedure
~~~~~~~~~

.. procedure:: 
   :style: normal 

   .. include:: /includes/avs/bson-bindata-vectors/steps-shared-nodejs.rst 

   .. step:: Fetch the data from your cluster.

      a. Create a file named ``get-data.js``.

         .. code-block:: shell 

            touch get-data.js

      #. Copy and paste the following sample code to fetch the data from
         the ``sample_airbnb.listingsAndReviews`` namespace in your
         cluster.

         The sample code does the following: 

         - Connects to your cluster and finds documents
           with the ``summary`` field. 
         - Creates a file named ``subset.json`` to which it writes the
           data from the collection.

         .. literalinclude:: /includes/avs/bson-bindata-vectors/nodejs/get-data.js
            :caption: get-data.js
            :copyable: 
            :language: javascript
            :linenos:

      #. Replace the ``<CONNECTION-STRING>`` placeholder if you didn't
         set the environment variable for your |service| connection
         string and then save the file. 
         
      #. Run the following command to fetch the data:

         .. io-code-block::
            :copyable: true 

            .. input:: 
               :language: shell 

               node get-data.js

            .. output:: 
               :language: shell 

               Subset of documents written to: ./subset.json

   .. step:: Generate the vector embeddings for your data. 

      If you already have ``float32``, ``int8``, or ``int1`` vector
      embeddings in your collection, skip this step. 

      a. Create a file named ``get-embeddings.js`` to generate ``float32``,
         ``int8``, and ``int1`` vector embeddings by using |voyage|'s
         ``embed`` |api|.

         .. code-block:: shell 

            touch get-embeddings.js

      #. Copy and paste the following code in the ``get-embeddings.js``
         file. 

         This code does the following:

         - Generates ``float32``, ``int8``, and ``int1`` embeddings for
           the given data by using |voyage|'s ``embed-english-v3.0``
           embedding model. 
         - Stores the ``float32``, ``int8``, and ``int1`` embeddings in
           fields named ``float``, ``int8``, and ``ubinary``
           respectively.
         - Creates a file named ``embeddings.json`` and saves the
           embeddings in the file.

         .. literalinclude:: /includes/avs/bson-bindata-vectors/nodejs/get-embeddings-for-existing-data.js 
            :language: javascript
            :caption: get-embeddings.js
            :copyable: true
            :linenos:

      #. If you didn't set the environment variable for your 
         |voyage| API Key, replace the ``<VOYAGEAI-API-KEY>``
         placeholder and save the file. 

      #. Run the code to generate the embeddings.

         .. io-code-block::
            :copyable: true 

            .. input:: 
               :language: shell 

               node get-embeddings.js 

            .. output::
              :language: shell

               Embeddings saved to embeddings.json

      #. Verify the generated embeddings by opening the generated
         ``embeddings.json`` file. 

   .. step:: Convert the vector embeddings to ``binData`` vectors.

      a. Create a file named ``convert-embeddings.js`` to convert the
         ``float32``, ``int8``, and ``int1`` vector embeddings from
         |voyage| to |bson| ``binData`` vectors.

         .. code-block:: shell 

            touch convert-embeddings.js

      #. Copy and paste the following code in the ``convert-embeddings.js``
         file. 

         This code does the following:

         - Generates |bson| ``binData`` vectors for the ``float32``,
           ``int8``, and ``int1`` embeddings. 
         - Appends the ``float32``, ``int8``, and ``ubinary`` |bson|
           ``binData`` vectors to the ``embeddings.json`` file.

         .. literalinclude:: /includes/avs/bson-bindata-vectors/nodejs/convert-embeddings.js 
            :language: javascript
            :caption: convert-embeddings.js
            :copyable: true
            :linenos:

      #. Run the program to generate the |bson| ``binData`` vectors.

         .. io-code-block:: 
            :copyable: true 
            
            .. input:: 
               :language: shell 

               node convert-embeddings.js 

            .. output:: 
               :language: shell 

               Embeddings with BSON vectors have been saved to embeddings.json

      #. Verify the generated |bson| embeddings in the ``embeddings.json`` file.

   .. step:: Connect to the cluster and upload the data to the namespace.

      a. Create a file named ``upload-data.js`` to connect to 
         your cluster and upload the data to the
         ``sample_airbnb.listingsAndReviews`` namespace. 

         .. code-block:: shell 

            touch upload-data.js

      #. Copy and paste the following code in the ``upload-data.js``
         file. 

         This code does the following:

         - Connects to your cluster and creates a
           namespace with the database and collection name that you
           specify.  
         - Uploads the data including the embeddings into the
           ``sample_airbnb.listingsAndReviews`` namespace.

         .. literalinclude:: /includes/avs/bson-bindata-vectors/nodejs/upload-data-existing.js
            :language: javascript
            :caption: upload-data.js
            :copyable: true
            :linenos:

      #. Replace the ``<CONNECTION-STRING>`` placeholder if you didn't
         set the environment variable for your |service| connection
         string and then save the file. 

      #. Run the following command to upload the data. 

         .. io-code-block:: 
            :copyable: true 
            
            .. input:: 
               :language: shell 

               node upload-data.js

            .. output:: 
               :language: shell
              
               Connected to MongoDB
               Updated document with text: ...
               ...
               Embeddings stored in MongoDB successfully.

      #. Verify by logging into your cluster and checking
         the namespace in the :guilabel:`Data Explorer`.

   .. step:: Create the {+avs+} index on the collection.

      a. Create a file named ``create-index.js``.

         .. code-block:: shell 

            touch create-index.js

      #. Copy and paste the following code to create the index in the
         ``create-index.js`` file.

         The code does the following:

         - Connects to the cluster and creates an index
           with the specified name for the specified namespace. 
         - Indexes the ``bsonEmbeddings.float32`` and 
           ``bsonEmbeddings.int8`` fields as ``vector`` type by using
           the ``dotProduct`` similarity function, and the
           ``bsonEmbeddings.int1`` field also as ``vector`` type by
           using the ``euclidean`` function.
 
         .. literalinclude:: /includes/avs/bson-bindata-vectors/nodejs/create-index.js 
            :language: javascript
            :caption: create-index.js
            :copyable: true
            :linenos:

      #. Replace the following settings and save the file.

         .. list-table:: 

            * - ``<CONNECTION-STRING>``
              - Connection string to connect to your |service|
                {+cluster+} that you want to create the database and
                collection. 
                
                Replace this value only if you didn't set the
                ``MONGODB_URI`` environment variable. 

            * - ``<DB-NAME>``
              - Name of the collection, which is ``sample_airbnb``. 

            * - ``<COLLECTION-NAME>``
              - Name of the collection, which is ``listingsAndReviews``. 

            * - ``<INDEX-NAME>``
              - Name of the index for the collection. 

      #. Create the index. 

         .. io-code-block:: 
            :copyable: true 

            .. input:: 
               :language: shell 

               node create-index.js

            .. output:: 
               :language: shell 

               New search index named vector_index is building.
               Polling to check if the index is ready. This may take up to a minute.
               <INDEX-NAME> is ready for querying.

   .. step:: Generate the embeddings for the query text.

      a. Create a file named ``get-query-embeddings.js``. 

         .. code-block:: shell 
            
            touch get-query-embeddings.js 

      #. Copy and paste the code in the ``get-query-embedding.js`` file. 

         The sample code does the following: 

         - Generates ``float32``, ``int8``, and ``int1`` embeddings for the
           query text by using |voyage|.
         - Converts the generated embeddings to |bson| ``binData``
           vectors by using PyMongo. 
         - Saves the generated embeddings to a file named
           ``query-embeddings.json``. 

         .. literalinclude:: /includes/avs/bson-bindata-vectors/nodejs/get-query-embeddings.js 
            :language: javascript
            :caption: get-query-embedding.js
            :copyable: true
            :linenos:

      #. Replace the following settings and save the file.

         .. list-table:: 

            * - ``<VOYAGEAI-API-KEY>``
              - Your API Key for |voyage|. Only replace this value if you didn't
                set the key as an environment variable.
      
            * - ``<QUERY-TEXT>``
              - Your query text. For this example, use ``ocean view``. 

      #. Run the code to generate the embeddings for the query text.

         .. io-code-block:: 
            :copyable: true 

            .. input:: 
               :language: shell 

               node get-query-embeddings.js 

            .. output:: 
               :language: shell 
            
               Embeddings with BSON vectors have been saved to query-embeddings.json

   .. step:: Run a {+avs+} query.

      a. Create a file named ``run-query.js``.

         .. code-block:: shell 

            touch run-query.js

      #. Copy and paste the following sample :pipeline:`$vectorSearch`
         query in the ``run-query.js`` file.

         The sample query does the following:

         - Connects to your cluster and runs the
           :pipeline:`$vectorSearch` query against the
           ``bsonEmbeddings.float32``, ``bsonEmbeddings.int8``, and
           ``bsonEmbeddings.int1`` fields in the ``sample_airbnb.listingsAndReviews``
           namespace by using the embeddings in the
           ``query-embeddings.json`` file.
         - Prints the results from Float32, Int8, and Packed Binary
           (Int1) embeddings to the console.

         .. literalinclude:: /includes/avs/bson-bindata-vectors/nodejs/run-query.js
            :language: javascript
            :caption: run-query.js
            :copyable: true
            :linenos:

      #. Replace the following settings and save the ``run-query.js``
         file. 

         .. list-table:: 

            * - ``<CONNECTION-STRING>``
              - Connection string to connect to the cluster where
                you want to create the index. 
                
                Replace this value only if you didn't set the 
                ``MONGODB_URI`` environment variable.
      
            * - ``<DB-NAME>``
              - Name of the database where you want to create the
                collection. For this example, specify ``sample_airbnb``.
      
            * - ``<COLLECTION-NAME>``
              - Name of the collection where you want to store the
                generated embeddings. For this example, specify
                ``listingsAndReviews``. 

            * - ``<INDEX-NAME>``
              - Name of the index for the collection. 

            * - ``<NUMBER-OF-CANDIDATES-TO-CONSIDER>``
              - Number of nearest neighbors to consider. For this
                example, specify ``20``.

            * - ``<NUMBER-OF-DOCUMENTS-TO-RETURN>``
              - Number of documents to return in the results. For this
                example, specify ``5``.

            * - ``<DATA-FIELD-NAME>``
              - Name of the field that contains text data. For this
                example, specify ``summary``.

      #. Run the query. 

         To execute the query, run the following command: 

         .. io-code-block:: 
            :copyable: true 

            .. input:: 
               :language: shell 

               node run-query.js 

            .. output:: 
               :language: shell 

               Results from embeddings_float32 embeddings:
               {"_id":"10266175","summary":"A beautiful and comfortable 1 Bedroom Air Conditioned Condo in Makaha Valley - stunning Ocean & Mountain views All the amenities of home, suited for longer stays. Full kitchen & large bathroom.  Several gas BBQ's for all guests to use & a large heated pool surrounded by reclining chairs to sunbathe.  The Ocean you see in the pictures is not even a mile away, known as the famous Makaha Surfing Beach. Golfing, hiking,snorkeling  paddle boarding, surfing are all just minutes from the front door.","score":{"$numberDouble":"0.799713134765625"}}
               {"_id":"10227000","summary":"THIS IS A VERY SPACIOUS 1 BEDROOM FULL CONDO (SLEEPS 4) AT THE BEAUTIFUL VALLEY ISLE RESORT ON THE BEACH IN LAHAINA, MAUI!! YOU WILL LOVE THE PERFECT LOCATION OF THIS VERY NICE HIGH RISE! ALSO THIS SPACIOUS FULL CONDO, FULL KITCHEN, BIG BALCONY!!","score":{"$numberDouble":"0.7568193078041077"}}
               {"_id":"1001265","summary":"A short distance from Honolulu's billion dollar mall, and the same distance to Waikiki. Parking included. A great location that work perfectly for business, education, or simple visit. Experience Yacht Harbor views and 5 Star Hilton Hawaiian Village.","score":{"$numberDouble":"0.7500505447387695"}}
               {"summary":"Quarto com vista para a Lagoa Rodrigo de Freitas, cartão postal do Rio de Janeiro. Linda Vista.  1 Quarto e 1 banheiro  Amplo, arejado, vaga na garagem. Prédio com piscina, sauna e playground.  Fácil acesso, próximo da praia e shoppings.","score":{"$numberDouble":"0.7367454171180725"},"_id":"10030955"}
               {"_id":"10220130","summary":"Cozy and comfortable apartment. Ideal for families and vacations.  3 bedrooms, 2 of them suites.  Located 20-min walk to the beach and close to the Rio 2016 Olympics Venues. Situated in a modern and secure condominium, with many entertainment available options around.","score":{"$numberDouble":"0.7315733432769775"}}
               Results from embeddings_int8 embeddings:
               {"_id":"10266175","summary":"A beautiful and comfortable 1 Bedroom Air Conditioned Condo in Makaha Valley - stunning Ocean & Mountain views All the amenities of home, suited for longer stays. Full kitchen & large bathroom.  Several gas BBQ's for all guests to use & a large heated pool surrounded by reclining chairs to sunbathe.  The Ocean you see in the pictures is not even a mile away, known as the famous Makaha Surfing Beach. Golfing, hiking,snorkeling  paddle boarding, surfing are all just minutes from the front door.","score":{"$numberDouble":"0.5056195259094238"}}
               {"_id":"10227000","summary":"THIS IS A VERY SPACIOUS 1 BEDROOM FULL CONDO (SLEEPS 4) AT THE BEAUTIFUL VALLEY ISLE RESORT ON THE BEACH IN LAHAINA, MAUI!! YOU WILL LOVE THE PERFECT LOCATION OF THIS VERY NICE HIGH RISE! ALSO THIS SPACIOUS FULL CONDO, FULL KITCHEN, BIG BALCONY!!","score":{"$numberDouble":"0.5048412084579468"}}
               {"summary":"A short distance from Honolulu's billion dollar mall, and the same distance to Waikiki. Parking included. A great location that work perfectly for business, education, or simple visit. Experience Yacht Harbor views and 5 Star Hilton Hawaiian Village.","score":{"$numberDouble":"0.5047098398208618"},"_id":"1001265"}
               {"_id":"10030955","summary":"Quarto com vista para a Lagoa Rodrigo de Freitas, cartão postal do Rio de Janeiro. Linda Vista.  1 Quarto e 1 banheiro  Amplo, arejado, vaga na garagem. Prédio com piscina, sauna e playground.  Fácil acesso, próximo da praia e shoppings.","score":{"$numberDouble":"0.5043320655822754"}}
               {"_id":"10220130","summary":"Cozy and comfortable apartment. Ideal for families and vacations.  3 bedrooms, 2 of them suites.  Located 20-min walk to the beach and close to the Rio 2016 Olympics Venues. Situated in a modern and secure condominium, with many entertainment available options around.","score":{"$numberDouble":"0.5043137073516846"}}
               Results from embeddings_int1 embeddings:
               {"_id":"10266175","summary":"A beautiful and comfortable 1 Bedroom Air Conditioned Condo in Makaha Valley - stunning Ocean & Mountain views All the amenities of home, suited for longer stays. Full kitchen & large bathroom.  Several gas BBQ's for all guests to use & a large heated pool surrounded by reclining chairs to sunbathe.  The Ocean you see in the pictures is not even a mile away, known as the famous Makaha Surfing Beach. Golfing, hiking,snorkeling  paddle boarding, surfing are all just minutes from the front door.","score":{"$numberDouble":"0.7119140625"}}
               {"_id":"1001265","summary":"A short distance from Honolulu's billion dollar mall, and the same distance to Waikiki. Parking included. A great location that work perfectly for business, education, or simple visit. Experience Yacht Harbor views and 5 Star Hilton Hawaiian Village.","score":{"$numberDouble":"0.6787109375"}}
               {"summary":"A friendly apartment block where everyone knows each other and there is a strong communal vibe. Property has a huge backyard with vege garden and skate ramp. 7min walk to the beach and 2min to buses.","score":{"$numberDouble":"0.671875"},"_id":"10209136"}
               {"_id":"10227000","summary":"THIS IS A VERY SPACIOUS 1 BEDROOM FULL CONDO (SLEEPS 4) AT THE BEAUTIFUL VALLEY ISLE RESORT ON THE BEACH IN LAHAINA, MAUI!! YOU WILL LOVE THE PERFECT LOCATION OF THIS VERY NICE HIGH RISE! ALSO THIS SPACIOUS FULL CONDO, FULL KITCHEN, BIG BALCONY!!","score":{"$numberDouble":"0.6669921875"}}
               {"_id":"10264100","summary":"Having a large airy living room. The apartment is well divided. Fully furnished and cozy. The building has a 24h doorman and camera services in the corridors. It is very well located, close to the beach, restaurants, pubs and several shops and supermarkets. And it offers a good mobility being close to the subway.","score":{"$numberDouble":"0.6669921875"}}

         Your results might be different because the generated
         embeddings can vary depending on your environment. 
