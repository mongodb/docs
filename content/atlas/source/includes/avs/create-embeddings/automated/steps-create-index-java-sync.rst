.. procedure:: 
   :style: normal 

   .. step:: Define the index in a file. 

      To define a {+avs+} index: 

      a. Create a ``.java`` file. 

         .. code-block:: java

            touch vectorIndex.java

      #. Copy and paste the following index definition in to the file.
      
         .. literalinclude:: /includes/avs/create-embeddings/automated/createIndex.java
            :language: java
            :copyable: true 
            :caption: vectorIndex.java
            :linenos:

      #. Replace the ``<connectionString>`` in the index definition and
         save the file.

         To learn more, see :ref:`connect-via-driver`.

   .. step:: Create the index.

      To create the index, run the following commands:

      .. code-block:: shell 

         javac vectorIndex.java
         java vectorIndex