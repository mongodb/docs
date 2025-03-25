.. procedure::
   :style: normal

   .. step:: Define code to generate embeddings from an existing collection in |service|.

      Create a file named ``CreateEmbeddings.java`` and paste the following code.

      This code uses the ``getEmbeddings`` method and the MongoDB
      :driver:`Java Sync Driver </java/sync/>` to do the following:

      a. Connect to your |service| {+cluster+}.

      #. Get the array of sample texts.

      #. Generate embeddings from each text using the ``getEmbeddings`` method
         that you defined previously.

      #. Ingest the embeddings into the ``sample_db.embeddings`` collection in
         |service|.

      .. literalinclude:: /includes/avs/tutorial/CreateEmbeddingsNew.java
         :language: java
         :caption: CreateEmbeddings.java

   .. step:: Generate the embeddings.

      Save and run the file. The output resembles:

      .. literalinclude:: /includes/avs/tutorial/output-create-embeddings-new-java.sh
         :language: shell

      You can also view your vector embeddings in the :ref:`{+atlas-ui+}
      <atlas-ui-view-collections>` by navigating to the ``sample_db.embeddings``
      collection in your {+cluster+}.
