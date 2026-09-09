Procedure
~~~~~~~~~

.. procedure::
   :style: normal

   .. include:: /includes/bson-bindata-vectors/procedures/steps-shared-csharp.rst

   .. step:: Generate embeddings from your data.

      You can use an embedding model provider to generate ``float32``,
      ``int8``, and ``int1`` embeddings for your data and then use the
      :driver:`MongoDB .NET/C# Driver </csharp/current/>` to convert
      your native vector embedding to |bson| vectors. The following
      sample code uses |voyage|'s ``voyage-3-large`` |api| to generate
      full-precision vectors.

      a. Add the following classes to your project. They define the
         shape of the documents that the code writes to your cluster.

         .. literalinclude:: /code-examples/tested/csharp/driver/VectorSearch/Quantization/QuantizationExistingData.snippet.quantization-embedding-document.cs
            :language: csharp
            :copyable: true
            :category: usage example

      #. Add the following method to your project.

         This code does the following:

         - Generates the ``float32``, ``int8``, and ``ubinary`` vector
           embeddings by using |voyage|'s ``voyage-3-large`` embedding
           model.
         - Converts the embeddings to |bson| ``binData`` vectors by
           using the :driver:`MongoDB .NET/C# Driver </csharp/current/>`.
         - Creates a file named ``embeddings.json`` and saves the data
           with embeddings in the file to upload to |service|.

         .. literalinclude:: /code-examples/tested/csharp/driver/VectorSearch/Quantization/QuantizationNewData.snippet.generate-convert-embeddings-new-data.cs
            :language: csharp
            :linenos:
            :copyable: true
            :category: usage example

      #. Replace the ``<voyageApiKey>`` placeholder value in the code
         with your |voyage| |api| key, then call
         ``GenerateAndConvertEmbeddingsAsync()``.

         .. code-block:: shell
            :caption: Example output

            Embeddings saved to embeddings.json

      #. Verify the embeddings in the ``embeddings.json`` file.

      To learn more about generating embeddings and converting the
      embeddings to ``binData`` vectors, see :ref:`create-vector-embeddings`.

   .. step:: Ingest the data and create a {+avs+} index.

      You must upload your data and embeddings to a collection in your
      cluster and create a {+avs+} index on the data to
      run :pipeline:`$vectorSearch` queries against the data.

      a. Add the following methods to your project.

         This code does the following:

         - Uploads the data in the ``embeddings.json`` file to your
           cluster.
         - Creates a {+avs+} index on the ``embeddings_float32``,
           ``embeddings_int8``, and ``embeddings_int1`` fields.

         .. literalinclude:: /code-examples/tested/csharp/driver/VectorSearch/Quantization/QuantizationNewData.snippet.upload-create-index-new-data.cs
            :language: csharp
            :linenos:
            :copyable: true
            :category: usage example

      #. Replace the ``<connectionString>`` placeholder value in the
         code, then call ``StoreEmbeddings(dbName, collectionName)``
         followed by
         ``SetupVectorSearchIndex(dbName, collectionName, indexName)``
         with the following arguments.

         .. list-table::
            :header-rows: 1

            * - Parameter
              - Value

            * - ``dbName``
              - Name of the database in your cluster.

            * - ``collectionName``
              - Name of the collection where you want to upload the data.

            * - ``indexName``
              - Name of the {+avs+} index for the collection.

         .. code-block:: shell
            :caption: Example output

            Inserted documents into MongoDB
            Successfully created vector index named: <indexName>
            It may take up to a minute for the index to leave the BUILDING status and become queryable.
            Polling to confirm the index has changed from the BUILDING status.
            <indexName> index is ready to query

      #. Connect to your cluster and verify the following:

         - Data in the namespace.
         - {+avs+} index for the collection.

   .. step:: Create and run a query against the collection.

      To test your embeddings, you can run a :pipeline:`$vectorSearch` query against your
      collection.

      a. Add the following class to your project. It defines the shape
         of the query results.

         .. literalinclude:: /code-examples/tested/csharp/driver/VectorSearch/Quantization/QuantizationQuery.snippet.quantization-query-result.cs
            :language: csharp
            :copyable: true
            :category: usage example

      #. Add the following method to your project.

         This code does the following:

         - Generates the ``float32``, ``int8``, and ``ubinary`` vector
           embeddings by using |voyage|'s ``voyage-3-large`` embedding
           model.
         - Converts the embeddings to |bson| ``binData`` vectors by
           using the :driver:`MongoDB .NET/C# Driver </csharp/current/>`.
         - Runs the query against your collection.

         .. literalinclude:: /code-examples/tested/csharp/driver/VectorSearch/Quantization/QuantizationQuery.snippet.create-embeddings-run-query.cs
            :language: csharp
            :linenos:
            :copyable: true
            :category: usage example

      #. Replace the ``<connectionString>`` and ``<voyageApiKey>``
         placeholder values in the code, then call ``RunQueriesAsync()``
         with the following arguments.

         .. list-table::
            :header-rows: 1

            * - Parameter
              - Value

            * - ``dbName``
              - Name of the database in your cluster.

            * - ``collectionName``
              - Name of the collection where you ingested the data.

            * - ``indexName``
              - Name of the {+avs+} index for the collection.

            * - ``dataFieldName``
              - Name of the field that contains the text from which you
                generated embeddings. For this example, use ``text``.

            * - ``queryText``
              - Text for the query. For this example, use ``science fact``.

            * - ``numberOfCandidates``
              - Number of nearest neighbors to consider during the
                search. For this example, use ``5``.

            * - ``numberOfDocuments``
              - Number of documents to return in the results. For this
                example, use ``2``.

         Results from ``embeddings_float32`` embeddings:

         .. literalinclude:: /code-examples/tested/csharp/driver/VectorSearch/Quantization/QuantizationNewDataFloat32Output.txt
            :language: none
            :copyable: false

         Results from ``embeddings_int8`` embeddings:

         .. literalinclude:: /code-examples/tested/csharp/driver/VectorSearch/Quantization/QuantizationNewDataInt8Output.txt
            :language: none
            :copyable: false

         Results from ``embeddings_int1`` embeddings:

         .. literalinclude:: /code-examples/tested/csharp/driver/VectorSearch/Quantization/QuantizationNewDataInt1Output.txt
            :language: none
            :copyable: false

      To learn more about generating embeddings and converting the
      embeddings to ``binData`` vectors, see :ref:`create-vector-embeddings`.
