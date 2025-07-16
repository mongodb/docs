.. procedure:: 
   :style: normal 

   .. step:: Create the file for the embeddings.

      a. Create a file named ``query-embeddings.js``. 

         .. code-block:: shell 

            touch query-embeddings.js

      #. Copy and paste the following embeddings into the file. 

         .. literalinclude:: /includes/fts/hybrid-search/embeddings.js 
            :language: javascript 
            :copyable: true

      #. Save and close the file.

   .. step:: Connect to your {+cluster+} using {+mongosh+}. 

      Open {+mongosh+} in a terminal window and connect to your 
      {+cluster+}. For detailed instructions on connecting, see 
      :doc:`/mongo-shell-connection`.

   .. step:: Use the ``sample_mflix`` database. 

      Run the following command at {+mongosh+} prompt:

      .. io-code-block::
         :copyable: true 

         .. input:: 
            :language: sh

            use sample_mflix 

         .. output:: 
            :language: sh
            :emphasize-lines: 1 

            switched to db sample_mflix

   .. step:: Load the embeddings to use in the query.

      Load the ``query-embeddings.js`` file into ``mongosh``.

      .. code-block:: shell 

         load('<path-to-file>/query-embeddings.js');

   .. step:: Run the following |fts| queries against the ``embedded_movies`` collection.

      .. io-code-block:: 
         :copyable: true 

         .. input:: /includes/fts/hybrid-search/query.sh
            :language: js 
            :linenos:

         .. output:: /includes/fts/hybrid-search/query-output.sh
            :language: shell
            :visible: false
