.. procedure:: 
   :style: normal 

   .. include:: /includes/avs/bson-bindata-vectors/steps-shared-go.rst 

   .. step:: (Conditional) Generate embeddings from your data. 

      You can use an embedding model provider to generate ``float32``,
      ``int8``, and ``int1`` embeddings for your data and then use the
      :driver:`MongoDB Go driver </go/current/>` to convert your native
      vector embedding to |bson| vectors. The following sample code uses
      Cohere's ``embed`` |api| to generate full-precision vectors.

      a. Create a new file named ``GenerateAndConvertEmbeddings.go``
         in your Go project. 

         .. code-block:: shell 

            touch GenerateAndConvertEmbeddings.go

      #. Copy and paste the following code in the
         ``GenerateAndConvertEmbeddings.go`` file. 
      
         This code does the following:

         - Generates the ``float32``, ``int8``, and ``ubinary`` vector
           embeddings by using Cohere's ``embed`` |api|.
         - Converts the embeddings to |bson| ``binData`` vectors by using
           :driver:`MongoDB Go driver </go/current/>`. 
         - Creates a file named ``embeddings.json`` and saves the data
           with embeddings in the file.  

         .. literalinclude:: /includes/avs/bson-bindata-vectors/get-convert-embeddings-new-data.go 
            :language: go
            :caption: GenerateAndConvertEmbeddings.go
            :linenos: 
            :copyable: true

      #. Replace the following placeholder value in the code and save
         the file. 

         .. list-table:: 
            :stub-columns: 1

            * - ``COHERE_API_KEY``
              - You Cohere |api| key only if you didn't set the
                environment variable.

      #. Run the program using the following command.
         
         If you are using a terminal, run the following commands to
         compile and execute your program.

         .. io-code-block:: 
            :copyable: true 

            .. input:: 
               :language: shell 

               go run GenerateAndConvertEmbeddings.go 

            .. output:: 
               :language: shell 

               Embeddings successfully stored in embeddings.json

      #. Verify the embeddings in the ``embeddings.json`` file.

      To learn more about generating embeddings and converting the
      embeddings to ``binData`` vectors, see
      :ref:`create-vector-embeddings`. 

   .. step:: Ingest the data and create an {+avs+} index. 

      You must upload your data and embeddings to a collection in your
      |service| {+cluster+} and create an {+avs+} index on the data to
      run :pipeline:`$vectorSearch` queries against the data. 

      a. Create a new file named ``UploadDataAndCreateIndex.go``
         in your Go project. 

         .. code-block:: shell 

            touch UploadDataAndCreateIndex.go

      #. Copy and paste the following code in the
         ``UploadDataAndCreateIndex.go`` file. 
      
         This code does the following:

         - Uploads the ``float32``, ``int8``, and ``int1`` embeddings in
           the ``embeddings.json`` file to your |service| {+cluster+}. 
         - Creates an {+avs+} index on the ``embeddings.float32``,
           ``embeddings.int8``, and ``embeddings.int1`` fields.  

         .. literalinclude:: /includes/avs/bson-bindata-vectors/upload-create-index-new-data.go
            :language: go
            :caption: UploadDataAndCreateIndex.go
            :linenos: 
            :copyable: true

      #. Replace the following with valid values in the code and save
         the file.  

         .. list-table:: 
            :stub-columns: 1

            * - ``MONGODB_URI``
              - Your |service| {+cluster+} connection string if you
                didn't set the environment variable. 

            * - ``<DATABASE-NAME>``
              - Name of the {+avs+} index for the collection. 

            * - ``<COLLECTION-NAME>``
              - Name of the {+avs+} index for the collection. 

            * - ``<INDEX-NAME>``
              - Name of the {+avs+} index for the collection. 

      #. Run the program using the following command.
         
         If you are using a terminal, run the following commands to
         compile and execute your program. 

         .. io-code-block:: 
            :copyable: true 

            .. input:: 
               :language: shell 

               go run UploadDataAndCreateIndex.go 

            .. output:: 
               :language: shell 

               Inserted documents into MongoDB
               Creating the index.
               Polling to confirm successful index creation.
               NOTE: This may take up to a minute.
               Name of Index Created: <INDEX-NAME>

      #. Log in to your |service| {+cluster+} and verify the following:
      
         - Data in the namespace.
         - {+avs+} index for the collection.

   .. step:: Create and run query against the collection. 

      To test your embeddings, you can run a query against your
      collection. Use an embedding model provider to generate ``float32``,
      ``int8``, and ``int1`` embeddings for your query text. The
      following sample code uses Cohere's ``embed`` |api| to generate
      full-precision vectors. After generating the embeddings, use the
      :driver:`MongoDB Go driver </drivers/go/current/>` to convert your
      native vector embedding to |bson| binary vectors and run
      :pipeline:`$vectorSearch` query against the collection.

      a. Create a new file named ``CreateEmbeddingsAndRunQuery.go``
         in your Go project. 

         .. code-block:: shell 

            touch CreateEmbeddingsAndRunQuery.go

      #. Copy and paste the following code in the
         ``CreateEmbeddingsAndRunQuery.go`` file. 
      
         This code does the following:

         - Generates the ``float32``, ``int8``, and ``ubinary`` vector
           embeddings by using Cohere's ``embed`` |api|.
         - Converts the embeddings to |bson| ``binData`` vectors by using
           :driver:`MongoDB Go driver </drivers/go/current/>`. 
         - Runs the query against your collection and returns the
           results. 

         .. literalinclude:: /includes/avs/bson-bindata-vectors/create-embeddings-run-query.go 
            :language: go
            :caption: CreateEmbeddingsAndRunQuery.go
            :linenos: 
            :copyable: true

      #. Replace the following placeholder values in the code and save
         the file. 

         .. list-table:: 
            :stub-columns: 1

            * - ``MONGODB_URI``
              - Your |service| {+cluster+} connection string if you
                didn't set the environment variable. 

            * - ``COHERE_API_KEY``
              - You Cohere |api| key only if you didn't set the
                environment variable.

            * - ``<DATABASE-NAME>``
              - Name of the database in your |service| {+cluster+}.  

            * - ``<COLLECTION-NAME>``
              - Name of the collection where you ingested the data. 

            * - ``<INDEX-NAME>``
              - Name of the {+avs+} index for the collection. 

            * - ``<TEXT-FIELD-NAME>``
              - Name of the field that contain the text from which you
                generated embeddings.  

            * - ``<QUERY-TEXT>``
              - Text for the query. For this example, use ``science fact``. 

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

               Results from embeddings_int1 embeddings:
               {"_id":{"$oid":"68129070e7f516cc19658bc9"},"text":"Mount Everest is the highest peak on Earth at 8,848m.","score":{"$numberDouble":"0.642578125"}}
               {"text":"The Great Wall of China is visible from space.","score":{"$numberDouble":"0.61328125"},"_id":{"$oid":"68129070e7f516cc19658bc7"}}
               Results from embeddings_float32 embeddings:
               {"_id":{"$oid":"68129070e7f516cc19658bc9"},"text":"Mount Everest is the highest peak on Earth at 8,848m.","score":{"$numberDouble":"0.6583383083343506"}}
               {"_id":{"$oid":"68129070e7f516cc19658bc7"},"text":"The Great Wall of China is visible from space.","score":{"$numberDouble":"0.6536108255386353"}}
               Results from embeddings_int8 embeddings:
               {"_id":{"$oid":"68129070e7f516cc19658bc9"},"text":"Mount Everest is the highest peak on Earth at 8,848m.","score":{"$numberDouble":"0.5149773359298706"}}
               {"_id":{"$oid":"68129070e7f516cc19658bc7"},"text":"The Great Wall of China is visible from space.","score":{"$numberDouble":"0.5146723985671997"}}
