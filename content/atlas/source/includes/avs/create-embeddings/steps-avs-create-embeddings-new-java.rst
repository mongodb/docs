.. procedure::
   :style: normal

   .. step:: Write a script that generates embeddings from an existing collection.

      Create a file named ``CreateEmbeddings.java`` and paste the following code.

      This code uses the ``getEmbeddings()`` method and the MongoDB
      :driver:`Java Sync Driver </java/sync/>` to do the following:

      a. Connect to your MongoDB deployment.

      #. Get the array of sample texts.

      #. Generate embeddings from each text using the ``getEmbeddings()`` method
         that you defined previously.

      #. Ingest the embeddings into the ``sample_db.embeddings`` collection.

      .. literalinclude:: /includes/avs/tutorial/CreateEmbeddings.java
         :language: java
         :caption: CreateEmbeddings.java

   .. step:: Generate the embeddings.

      Save and run the file. The output resembles:

      .. literalinclude:: /includes/avs/tutorial/output-create-embeddings-new-java.sh
         :language: shell

      .. include:: /includes/avs/facts/fact-view-embeddings-atlas-ui-new-data.rst
