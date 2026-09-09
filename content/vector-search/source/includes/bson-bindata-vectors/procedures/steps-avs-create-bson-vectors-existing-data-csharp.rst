Procedure
~~~~~~~~~

.. procedure::
   :style: normal

   .. include:: /includes/bson-bindata-vectors/procedures/steps-shared-csharp.rst

   .. step:: (Conditional) Generate embeddings from your data.

      If you already have ``float32``, ``int8``, or ``int1`` vector
      embeddings in your collection, skip this step.

      You can use an embedding model provider to generate ``float32``,
      ``int8``, and ``int1`` embeddings for your data and then use the
      :driver:`MongoDB .NET/C# Driver </csharp/current/>` to convert
      your native vector embedding to |bson| vectors. The following
      sample code uses |voyage|'s ``voyage-3-large`` |api| to generate
      full-precision vectors from the data in the
      ``sample_airbnb.listingsAndReviews`` namespace.

      a. Add the following classes to your project. They define the
         shape of the documents that the code reads from and writes to
         your cluster.

         .. literalinclude:: /code-examples/tested/csharp/driver/VectorSearch/Quantization/QuantizationExistingData.snippet.quantization-source-document.cs
            :language: csharp
            :copyable: true
            :category: usage example

         .. literalinclude:: /code-examples/tested/csharp/driver/VectorSearch/Quantization/QuantizationExistingData.snippet.quantization-embedding-document.cs
            :language: csharp
            :copyable: true
            :category: usage example

      #. Add the following method to your project.

         This code does the following:

         - Gets the ``summary`` field from 50 documents in the
           ``sample_airbnb.listingsAndReviews`` namespace.
         - Generates the ``float32``, ``int8``, and ``ubinary`` vector
           embeddings by using |voyage|'s ``voyage-3-large`` embedding
           model.
         - Converts the embeddings to |bson| ``binData`` vectors by
           using the :driver:`MongoDB .NET/C# Driver </csharp/current/>`.
           The ``ToFloatArray``, ``ToSByteArray``, and ``ToByteArray``
           helper functions convert the raw ``double`` values that
           |voyage| returns to the numeric types that these vector
           constructors require.
         - Creates a file named ``embeddings.json`` and saves the data
           with embeddings in the file.

         .. literalinclude:: /code-examples/tested/csharp/driver/VectorSearch/Quantization/QuantizationExistingData.snippet.generate-convert-embeddings-existing-data.cs
            :language: csharp
            :linenos:
            :copyable: true
            :category: usage example

      #. Replace the following placeholder values in the code and call
         ``GenerateAndConvertEmbeddingsAsync()``.

         .. list-table::
            :header-rows: 1

            * - Placeholder
              - Value

            * - ``<connectionString>``
              - Connection string for your cluster.

            * - ``<voyageApiKey>``
              - Your |voyage| |api| key.

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

         - Uploads the ``float32``, ``int8``, and ``int1`` embeddings
           in the ``embeddings.json`` file to your cluster.
         - Creates a {+avs+} index on the ``embeddings_float32``,
           ``embeddings_int8``, and ``embeddings_int1`` fields.

         .. literalinclude:: /code-examples/tested/csharp/driver/VectorSearch/Quantization/QuantizationExistingData.snippet.upload-create-index-existing-data.cs
            :language: csharp
            :linenos:
            :copyable: true
            :category: usage example

      #. Replace the following placeholder value in the code, then call
         ``UploadEmbeddingsData()`` followed by
         ``SetupVectorSearchIndex(indexName)``, passing the name you
         want to use for the {+avs+} index.

         - ``<connectionString>``: Connection string for your cluster.

         .. code-block:: shell
            :caption: Example output

            Processed document with summary: ...
            ...
            Successfully created vector index named: <indexName>
            It may take up to a minute for the index to leave the BUILDING status and become queryable.
            Polling to confirm the index has changed from the BUILDING status.
            <indexName> index is ready to query

      #. Connect to your cluster and verify the following:

         - Data in the namespace.
         - {+avs+} index for the collection.

   .. step:: Create and run a query against the collection.

      To test your embeddings, you can run a query against your
      collection. Use an embedding model provider to generate ``float``,
      ``int8``, and ``int1`` embeddings for your query text. The
      following sample code uses |voyage|'s ``voyage-3-large`` REST
      |api| to generate full-precision vectors. After generating the
      embeddings, use the :driver:`MongoDB .NET/C# Driver
      </csharp/current/>` to convert your native vector embedding to
      |bson| vectors and run :pipeline:`$vectorSearch` query against
      the collection.

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
         - Runs the query against your collection and returns the
           results.

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
              - Name of the database in your cluster. For this example, use ``sample_airbnb``.

            * - ``collectionName``
              - Name of the collection where you ingested the data. For this example, use ``listingsAndReviews``.

            * - ``indexName``
              - Name of the {+avs+} index for the collection.

            * - ``dataFieldName``
              - Name of the field that contains the text from which you
                generated embeddings. For this example, use ``summary``.

            * - ``queryText``
              - Text for the query. For this example, use ``ocean view``.

            * - ``numberOfCandidates``
              - Number of nearest neighbors to consider during the
                search. For this example, use ``5``.

            * - ``numberOfDocuments``
              - Number of documents to return in the results. For this
                example, use ``2``.

         .. code-block:: shell
            :caption: Example output

            Results from embeddings_float32 embeddings:
            { "text" : "A beautiful and comfortable 1 Bedroom Air Conditioned Condo in Makaha Valley - stunning Ocean & Mountain views All the amenities of home, suited for longer stays. Full kitchen & large bathroom. Several gas BBQ's for all guests to use & a large heated pool surrounded by reclining chairs to sunbathe. The Ocean you see in the pictures is not even a mile away, known as the famous Makaha Surfing Beach. Golfing, hiking, snorkeling, paddle boarding, surfing are all just minutes from the front door.", "score" : 0.79996156692504883 }
            { "text" : "THIS IS A VERY SPACIOUS 1 BEDROOM FULL CONDO (SLEEPS 4) AT THE BEAUTIFUL VALLEY ISLE RESORT ON THE BEACH IN LAHAINA, MAUI!! YOU WILL LOVE THE PERFECT LOCATION OF THIS VERY NICE HIGH RISE! ALSO THIS SPACIOUS FULL CONDO, FULL KITCHEN, BIG BALCONY!!", "score" : 0.75682300329208374 }
            Results from embeddings_int8 embeddings:
            { "text" : "A beautiful and comfortable 1 Bedroom Air Conditioned Condo in Makaha Valley - stunning Ocean & Mountain views All the amenities of home, suited for longer stays. Full kitchen & large bathroom. Several gas BBQ's for all guests to use & a large heated pool surrounded by reclining chairs to sunbathe. The Ocean you see in the pictures is not even a mile away, known as the famous Makaha Surfing Beach. Golfing, hiking, snorkeling, paddle boarding, surfing are all just minutes from the front door.", "score" : 0.50563144683837891 }
            { "text" : "THIS IS A VERY SPACIOUS 1 BEDROOM FULL CONDO (SLEEPS 4) AT THE BEAUTIFUL VALLEY ISLE RESORT ON THE BEACH IN LAHAINA, MAUI!! YOU WILL LOVE THE PERFECT LOCATION OF THIS VERY NICE HIGH RISE! ALSO THIS SPACIOUS FULL CONDO, FULL KITCHEN, BIG BALCONY!!", "score" : 0.50484549999237061 }
            Results from embeddings_int1 embeddings:
            { "text" : "A beautiful and comfortable 1 Bedroom Air Conditioned Condo in Makaha Valley - stunning Ocean & Mountain views All the amenities of home, suited for longer stays. Full kitchen & large bathroom. Several gas BBQ's for all guests to use & a large heated pool surrounded by reclining chairs to sunbathe. The Ocean you see in the pictures is not even a mile away, known as the famous Makaha Surfing Beach. Golfing, hiking, snorkeling, paddle boarding, surfing are all just minutes from the front door.", "score" : 0.712890625 }
            { "text" : "A short distance from Honolulu's billion dollar mall, and the same distance to Waikiki. Parking included. A great location that work perfectly for business, education, or simple visit. Experience Yacht Harbor views and 5 Star Hilton Hawaiian Village.", "score" : 0.6787109375 }

      To learn more about generating embeddings and converting the
      embeddings to ``binData`` vectors, see :ref:`create-vector-embeddings`.
