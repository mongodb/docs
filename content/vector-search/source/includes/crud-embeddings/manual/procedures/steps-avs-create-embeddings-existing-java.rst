.. procedure::
   :style: normal

   .. step:: Write a script that generates embeddings from an existing collection.

      Create a file named ``CreateEmbeddings.java`` and paste the following code.

      This code uses the ``getEmbeddings()`` method and the MongoDB :driver:`Java Sync Driver </java/sync/>`
      to do the following:

      a. Connect to your MongoDB deployment.

      #. Get a subset of documents from the
         ``sample_airbnb.listingsAndReviews`` collection that
         have a non-empty ``summary`` field.

      #. Generate embeddings from each document's ``summary`` field
         using the ``getEmbeddings()`` method that you defined previously.

      #. Update each document with a new ``embeddings`` field
         that contains the embedding value.

      .. literalinclude:: /includes/quick-start/code-snippets/java/CreateEmbeddingsExisting.java
         :language: java
         :caption: CreateEmbeddings.java

   .. step:: Generate the embeddings.

      Save and run the file. The output resembles:

      .. literalinclude:: /includes/quick-start/code-snippets/output/output-create-embeddings-existing-java.sh
         :language: shell

      .. include:: /includes/crud-embeddings/manual/facts/fact-view-embeddings-atlas-ui-airbnb.rst
