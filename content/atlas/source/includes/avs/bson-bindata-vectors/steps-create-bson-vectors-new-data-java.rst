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
    
   .. step:: Generate embeddings from your data. 

      You can use an embedding model provider to generate ``float``,
      ``int8``, and ``int1`` embeddings for your data and then use the
      :driver:`MongoDB Java Driver </java/sync/current/>` to
      convert your native vector embedding to |bson| vectors. The
      following sample code uses |voyage|'s ``voyage-3-large`` |api| to
      generate full-precision vectors.  

      a. Create a new file named ``GenerateAndConvertEmbeddings.java``
         in your Java project. 

         .. code-block:: shell 

            touch GenerateAndConvertEmbeddings.java

      #. Copy and paste the following code in the
         ``GenerateAndConvertEmbeddings.java`` file. 
      
         This code does the following:

         - Generates the ``float32``, ``int8``, and ``ubinary`` vector
           embeddings by using |voyage|'s ``voyage-3-large`` embedding
           model. 
         - Converts the embeddings to |bson| ``binData`` vectors by using
           the :driver:`MongoDB Java Driver </java/sync/current/>`. 
         - Creates a file named ``embeddings.json`` and saves the data
           with embeddings in the file to upload to |service|.  

         .. literalinclude:: /includes/avs/bson-bindata-vectors/java/get-convert-embeddings-new-data.java
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

               Embeddings saved to embeddings.json

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

         - Uploads the data in the ``embeddings.json`` file to your cluster. 
         - Creates a {+avs+} index on the ``embeddings_float32``,
           ``embeddings_int8``, and ``embeddings_int1`` fields. 

         .. literalinclude:: /includes/avs/bson-bindata-vectors/java/upload-create-index-new-data.java
            :language: java
            :caption: UploadDataAndCreateIndex.java
            :linenos: 
            :copyable: true

      #. Replace the following placeholder values in the code and save
         the file. 

         .. list-table:: 
            :stub-columns: 1

            * - ``<DATABASE-NAME>``
              - Name of the database in your cluster. 

            * - ``<COLLECTION-NAME>``
              - Name of the collection where you want to upload the data. 

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

               Inserted documents into MongoDB
               Successfully created vector index named: <INDEX_NAME>
               It may take up to a minute for the index to leave the BUILDING status and become queryable.
               Polling to confirm the index has changed from the BUILDING status.
               <INDEX_NAME> index is ready to query

      #. Log in to your cluster and verify the following:
      
         - Data in the namespace.
         - {+avs+} index for the collection.

   .. step:: Create and run a query against the collection. 

      To test your embeddings, you can run a query against your
      collection. Use an embedding model provider to generate ``float``,
      ``int8``, and ``int1`` embeddings for your query text. The
      following sample code uses |voyage|'s ``voyage-3-large`` REST
      |api| to generate full-precision vectors. After generating the
      embeddings, use the :driver:`MongoDB Java Driver
      </java/sync/current/>` to convert your native vector
      embedding to |bson| vectors and run :pipeline:`$vectorSearch`
      query against the collection. 

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
         - Runs the query against your collection.

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
              - Name of the database in your cluster. 

            * - ``<COLLECTION-NAME>``
              - Name of the collection where you ingested the data. 

            * - ``<INDEX-NAME>``
              - Name of the {+avs+} index for the collection. 

            * - ``<DATA-FIELD-NAME>``
              - Name of the field that contain the text from which you
                generated embeddings. For this example, use ``text``. 

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

               javac CreateEmbeddingsAndRunQuery.java 
               java CreateEmbeddingsAndRunQuery

            .. output:: 
               :language: shell 

               Fetching embeddings...
               Using embeddings in vector search queries...
               {"text": "The Great Wall of China is visible from space.", "vectorSearchScore": 0.5}
               {"text": "The Eiffel Tower was completed in Paris in 1889.", "vectorSearchScore": 0.5}
               Results from int8 embeddings:
               {"text": "The Great Wall of China is visible from space.", "vectorSearchScore": 0.5051995515823364}
               {"text": "Mount Everest is the highest peak on Earth at 8,848m.", "vectorSearchScore": 0.5044659972190857}
               Results from int1 embeddings:
               {"text": "The Great Wall of China is visible from space.", "vectorSearchScore": 0.6845703125}
               {"text": "Mount Everest is the highest peak on Earth at 8,848m.", "vectorSearchScore": 0.6650390625}
      
      To learn more about generating embeddings and converting the
      embeddings to ``binData`` vectors, see :ref:`create-vector-embeddings`.
