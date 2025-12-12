.. procedure:: 
   :style: normal

   .. step:: Set up the embeddings to use in the query.
      
      a. Create a file named ``query-embeddings.js``.

      #. Copy and paste the following embeddings in the file.

         .. literalinclude:: /includes/avs/hybrid-search/query-embeddings.js 
            :language: javascript 
            :copyable: true

      #. Save and close the file.
   
   .. step:: Connect to your {+cluster+} using {+mongosh+}. 

      Open {+mongosh+} in a terminal window and connect to your 
      {+cluster+}. For detailed instructions on connecting, see 
      :ref:`connect-mongo-shell`.

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

      Run the following command to load the embeddings after replacing
      ``<path-to-file>`` with the absolute path to the ``embeddings.js``
      file:

      .. code-block:: shell 

         load('/<path-to-file>/embeddings.js');

      To verify that the embeddings loaded successfully, run the
      following command: 

      .. io-code-block:: 
         :copyable: true 

         .. input:: 
            :language: shell 

            STAR_WARS_EMBEDDING.length

         .. output::
            :language: shell

            2048

   .. step:: Run the following |fts| queries against the ``embedded_movies`` collection.

      .. io-code-block:: 
         :copyable: true 

         .. input:: /includes/avs/hybrid-search/score-fusion-tutorial/query-mongosh.js
            :language: js 
            :linenos:

         .. output:: /includes/avs/hybrid-search/score-fusion-tutorial/query-mongosh-output.js
            :language: js
            :visible: false
