Procedure
~~~~~~~~~

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

         .. literalinclude:: /includes/avs/bson-bindata-vectors/go/get-convert-embeddings-new-data.go 
            :language: go
            :caption: GenerateAndConvertEmbeddings.go
            :linenos: 
            :copyable: true

      #. Replace the following placeholder value in the code and save
         the file. 

         .. list-table:: 
            :stub-columns: 1

            * - ``VOYAGE_API_KEY``
              - Your |voyage| |api| key only if you didn't set the
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

         .. literalinclude:: /includes/avs/bson-bindata-vectors/go/upload-create-index-new-data.go
            :language: go
            :caption: UploadDataAndCreateIndex.go
            :linenos: 
            :copyable: true

      #. Replace the following with valid values in the code and save
         the file.  

         .. list-table:: 
            :stub-columns: 1

            * - ``MONGODB_URI``
              - Your cluster connection string if you
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

      #. Log in to your cluster and verify the following:
      
         - Data in the namespace.
         - {+avs+} index for the collection.

   .. step:: Create and run query against the collection. 

      To test your embeddings, you can run a query against your
      collection. Use an embedding model provider to generate ``float32``,
      ``int8``, and ``int1`` embeddings for your query text. The
      following sample code uses Cohere's ``embed`` |api| to generate
      full-precision vectors. After generating the embeddings, use the
      :driver:`MongoDB Go driver </go/current/>` to convert your
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
              - Your |voyage| |api| key only if you didn't set the
                environment variable.

            * - ``<DATABASE-NAME>``
              - Name of the database in your cluster.  

            * - ``<COLLECTION-NAME>``
              - Name of the collection where you ingested the data. 

            * - ``<INDEX-NAME>``
              - Name of the {+avs+} index for the collection. 

            * - ``<TEXT-FIELD-NAME>``
              - Name of the field that contain the text from which you
                generated embeddings. For this example, use ``text``.

            * - ``<QUERY-TEXT>``
              - Text for the query. For this example, use ``science fact``. 

            * - ``<NUMBER-OF-CANDIDATES-TO-CONSIDER>``
              - Number of nearest neighbors to consider during the
                search. For this example, use ``5``. 

            * - ``<NUMBER-OF-DOCUMENTS-TO-RETURN>``
              - Number of documents to return in the results. For this
                example, use ``2``.  

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
               {"_id":{"$oid":"68630fc85cb353712a1c521d"},"text":"The Great Wall of China is visible from space.","score":{"$numberDouble":"0.7723928093910217"}}
               {"_id":{"$oid":"68630fc85cb353712a1c521f"},"text":"Mount Everest is the highest peak on Earth at 8,848m.","score":{"$numberDouble":"0.7363046407699585"}}
               Results from embeddings_int8 embeddings:
               {"_id":{"$oid":"68630fc85cb353712a1c521d"},"text":"The Great Wall of China is visible from space.","score":{"$numberDouble":"0.5051995515823364"}}
               {"_id":{"$oid":"68630fc85cb353712a1c521f"},"text":"Mount Everest is the highest peak on Earth at 8,848m.","score":{"$numberDouble":"0.5044659972190857"}}
               Results from embeddings_int1 embeddings:
               {"_id":{"$oid":"68630fc85cb353712a1c521d"},"text":"The Great Wall of China is visible from space.","score":{"$numberDouble":"0.6845703125"}}
               {"_id":{"$oid":"68630fc85cb353712a1c521f"},"text":"Mount Everest is the highest peak on Earth at 8,848m.","score":{"$numberDouble":"0.6650390625"}}
