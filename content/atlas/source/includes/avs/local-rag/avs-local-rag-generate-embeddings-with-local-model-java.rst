.. procedure:: 
   :style: normal 

   .. step:: Download the local embedding model.

      Run the following command to pull the `nomic-embed-text
      <https://ollama.com/library/nomic-embed-text>`__ model
      from Ollama:

      .. code-block:: shell

         ollama pull nomic-embed-text

   .. step:: Define your model and method to generate vector embeddings.

      Create a file called ``OllamaModels.java`` and paste the
      following code.

      This code defines the local Ollama embedding and chat models that you'll
      use in your project. We'll work with the chat model in a later step. You
      can adapt or create additional models as needed for your preferred setup.

      This code also defines two methods to generate embeddings for a given input
      using the embedding model that you downloaded previously:

      - **Multiple Inputs**: The ``getEmbeddings`` method accepts an
        array of text inputs (``List<String>``), allowing you to create multiple
        embeddings in a single API call. The method converts the API-provided
        arrays of floats to BSON arrays of doubles for storing in your |service|
        {+cluster+}.

      -  **Single Input**: The ``getEmbedding`` method accepts a
         single ``String``, which represents a query you want to make against
         your vector data. The method converts the API-provided array of floats
         to a BSON array of doubles to use when querying your collection.

      .. literalinclude:: /includes/avs/local-rag/OllamaModels.java
         :language: java
         :caption: OllamaModels.java

   .. step:: Define code to generate embeddings from the sample data.

      Create a file named ``EmbeddingGenerator.java`` and paste the following code.

      This code uses the ``getEmbeddings`` method and the MongoDB
      :driver:`Java Sync Driver </java/sync/>` to do the following:

      a. Connect to your local |service| deployment or |service| {+cluster+}.

      #. Get a subset of documents from the ``sample_airbnb.listingsAndReviews``
         collection that have a non-empty ``summary`` field.

         .. note::

            For demonstration purposes, we set a ``limit`` of 250 documents to
            reduce the processing time. You can adjust or remove this limit as
            needed to better suit your use case.

      #. Generate an embedding from each document's ``summary`` field
         using the ``getEmbeddings`` method that you defined previously.

      #. Update each document with a new ``embedding`` field that contains the
         corresponding embedding value.

      .. literalinclude:: /includes/avs/local-rag/EmbeddingGenerator.java
         :language: java
         :caption: EmbeddingGenerator.java

   .. step:: Generate embeddings.

      Save and run the file. The output resembles:

      .. literalinclude:: /includes/avs/tutorial/output-create-embeddings-java.sh
         :language: shell
