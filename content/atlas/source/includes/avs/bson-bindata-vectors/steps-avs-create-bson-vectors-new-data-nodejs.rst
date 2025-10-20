Procedure
~~~~~~~~~

.. procedure:: 
   :style: normal 

   .. include:: /includes/avs/bson-bindata-vectors/steps-shared-nodejs.rst 

   .. step:: Generate the vector embeddings for your data. 

      a. Create a file named ``get-embeddings.js`` to generate ``float32``,
         ``int8``, and ``int1`` vector embeddings by using |voyage|'s
         ``embed`` |api|.

         .. code-block:: shell 

            touch get-embeddings.js

      #. Copy and paste the following code in the ``get-embeddings.js``
         file. 

         This code does the following:

         - Generates ``float32``, ``int8``, and ``int1`` embeddings for
           the given data by using |voyage|'s ``voyage-3-large``
           embedding model. 
         - Stores the ``float32``, ``int8``, and ``int1`` embeddings in
           fields named ``float``, ``int8``, and ``ubinary``
           respectively.
         - Creates a file named ``embeddings.json`` and saves the
           embeddings in the file.

         .. literalinclude:: /includes/avs/bson-bindata-vectors/nodejs/get-embeddings-for-new-data.js 
            :language: javascript
            :caption: get-embeddings.js
            :copyable: true
            :linenos:

      #. Replace the ``<VOYAGE_API_KEY>`` placeholder if you didn't set
         your API Key for |voyage| as an environment variable and then
         save the file.  

      #. Run the code to generate embeddings.

         .. io-code-block::
            :copyable: true 

            .. input:: 
               :language: shell 

               node get-embeddings.js 

            .. output::
              :language: shell

               Embeddings saved to embeddings.json

      #. Verify the generated embeddings in the generated ``embeddings.json`` file. 

   .. step:: Convert the vector embeddings to ``binData`` vectors.

      a. Create a file named ``convert-embeddings.js`` to convert the
         ``float32``, ``int8``, and ``int1`` vector embeddings from
         |voyage| to |bson| ``binData`` vectors by using the
         :driver:`MongoDB Node.js </node/current/>` driver.

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
            :copyable: true
            :caption: convert-embeddings.js
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

   .. step:: Connect to the cluster and upload the data to a collection.

      a. Create a file named ``upload-data.js`` to connect to your cluster and create a collection  in a database
         for the data in the ``embeddings.json`` file.

         .. code-block:: shell 

            touch upload-data.js

      #. Copy and paste the following code in the ``upload-data.js``
         file. 

         This code does the following:

         - Connects to your cluster and creates a
           namespace with the database and collection name that you
           specify.  
         - Uploads the data including the embeddings in the
           ``embeddings.json`` file to the specified namespace.

         .. literalinclude:: /includes/avs/bson-bindata-vectors/nodejs/upload-new-data.js 
            :language: javascript
            :caption: upload-data.js
            :copyable: true
            :linenos:

      #. Replace the following settings and save the file.

         .. list-table:: 

            * - ``<CONNECTION-STRING>``
              - Connection string to connect to the cluster where
                you want to create the database and collection. 
                
                Replace this value only if you didn't
                set the ``MONGODB_URI`` environment variable.
      
            * - ``<DB-NAME>``
              - Name of the database where you want to create the
                collection. 
      
            * - ``<COLLECTION-NAME>``
              - Name of the collection where you want to store the
                generated embeddings. 

      #. Run the following command to upload the data. 

         .. code-block:: shell 

            node upload-data.js

      #. Verify that the documents exist in the collection on your cluster. 

   .. step:: Create the {+avs+} index on the collection.

      a. Create a file named ``create-index.js`` to define a {+avs+}
         index on the collection.

         .. code-block:: shell 

            touch create-index.js

      #. Copy and paste the following code to create the index in the
         ``create-index.js`` file.

         The code does the following:

         - Connects to the cluster and creates an index
           with the specified name for the specified namespace. 
         - Indexes the ``bsonEmbeddings.float32`` and 
           ``bsonEmbeddings.int8`` fields as ``vector`` type that uses 
           the ``dotProduct`` similarity function, and the
           ``bsonEmbeddings.int1`` field also as ``vector`` type that
           uses the ``euclidean`` function.
 
         .. literalinclude:: /includes/avs/bson-bindata-vectors/nodejs/create-index.js 
            :language: javascript
            :caption: create-index.js
            :copyable: true
            :linenos:

      #. Replace the following settings and save the file.

         .. list-table:: 

            * - ``<CONNECTION-STRING>``
              - Connection string to connect to the cluster where
                you want to create the index. 
                
                Replace this value only if you didn't set the 
                ``MONGODB_URI`` environment variable.
      
            * - ``<DB-NAME>``
              - Name of the database where you want to create the
                collection. 
      
            * - ``<COLLECTION-NAME>``
              - Name of the collection where you want to store the
                generated embeddings. 

            * - ``<INDEX-NAME>``
              - Name of the index for the collection. 

      #. Create the index. 

         .. code-block:: shell 

            node create-index.js

   .. step:: Generate the embeddings for the query text.

      a. Create a file named ``get-query-embedding.js``. 

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

            * - ``<VOYAGE-API-KEY>``
              - Your API Key for |voyage|. Only replace this value if you didn't set the
                environment variable. 
      
            * - ``<QUERY-TEXT>``
              - Your query text. For this tutorial, use ``science fact``. 

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
           ``bsonEmbeddings.int1`` fields in the specified collection by
           using the embeddings in the ``query-embeddings.json`` file.
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
              - Connection string to connect to the |service| 
                {+cluster+} where you want to run the query. 
                
                Replace this value only if you didn't set the
                ``MONGODB_URI`` environment variable.

            * - ``<DB-NAME>``
              - Name of the database which contains the collection. 

            * - ``<COLLECTION-NAME>``
              - Name of the collection that you want to query. 

            * - ``<INDEX-NAME>``
              - Name of the index for the collection. 

            * - ``<NUMBER-OF-CAANDIDATES-TO-CONSIDER>``
              - Number of nearest neighbors to consider during the
                search. For this example, specify ``5``. 

            * - ``<NUMBER-OF-DOCUMENTS-TO-RETURN>``
              - Number of results to return. For this example, specify
                ``2``.  

            * - ``<TEXT-FIELD-NAME>``
              - Name of the field that contains the text data. For this
                example, specify ``text``.

      #. Run the following command to execute the query.

         .. io-code-block:: 
            :copyable: true 

            .. input:: 
               :language: shell 

               node run-query.js 

            .. output:: 
               :language: shell

               Connected to MongoDB
               Running vector search using "float32" embedding...
               Running vector search using "int8" embedding...
               Running vector search using "int1" embedding...
               MongoDB connection closed
               Results from Float32 embeddings:
               Result 1: {
                 text: 'The Great Wall of China is visible from space.',
                 score: 0.7719700336456299
               }
               Result 2: {
                 text: 'Mount Everest is the highest peak on Earth at 8,848m.',
                 score: 0.735608696937561
               }
               Results from Int8 embeddings:
               Result 1: {
                 text: 'The Great Wall of China is visible from space.',
                 score: 0.5051995515823364
               }
               Result 2: {
                 text: 'Mount Everest is the highest peak on Earth at 8,848m.',
                 score: 0.5044659972190857
               }
               Results from Int1 (PackedBits) embeddings:
               Result 1: {
                 text: 'The Great Wall of China is visible from space.',
                 score: 0.6845703125
               }
               Result 2: {
                 text: 'Mount Everest is the highest peak on Earth at 8,848m.',
                 score: 0.6650390625
               }
