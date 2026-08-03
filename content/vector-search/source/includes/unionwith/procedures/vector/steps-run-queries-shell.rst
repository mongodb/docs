.. procedure:: 
   :style: normal 

   .. step:: Create a file for the embeddings to use in the query.

      a. Create a file named ``embeddings.js``. 

         .. code-block:: shell 

            touch embeddings.js 

      #. Copy and paste the following embeddings into the
         ``embeddings.js`` file. 

         This file contains embeddings for the query terms used in the
         queries. The following table shows the query term, the variable
         that contains the embeddings for the query term, the embedding
         model used to generate the embeddings, and the number of
         dimensions. 

         .. list-table:: 
            :header-rows: 1 
            :widths: 20 40 30 10

            * - Query Phrase 
              - Variable
              - Embedding Model
              - Dimensions 

            * - light-hearted comedy with ghosts
              - COMEDY_INVOLVING_GHOSTS
              - |voyage|'s ``voyage-4-large``
              - 2048

            * - slapstick humor with paranormal events
              - HUMOR_INVOLVING_PARANORMAL
              - |voyage|'s ``voyage-4-large``
              - 2048

            * - battle between good and evil
              - BATTLE_GOOD_EVIL
              - |voyage|'s ``voyage-4-large``
              - 2048 

            * - journey across lands
              - JOURNEY_ACROSS_LANDS_VOYAGEAI
              - |voyage|'s ``voyage-4-large``
              - 2048

            * - journey across lands
              - JOURNEY_ACROSS_LANDS_OPENAI
              - OpenAI's ``text-embedding-ada-002``
              - 1536

         .. literalinclude:: /includes/unionwith/code-snippets/embeddings.js
            :language: javascript 
            :copyable: true

      #. Save and close the file.

   .. step:: Connect to your cluster in {+mongosh+}.

      Open {+mongosh+} in a terminal window and
      connect to your cluster. For detailed instructions on
      connecting, see :ref:`Connect via mongosh
      <connect-mongo-shell>`.
   
   .. step:: Use the ``sample_mflix`` database.

      Run the following command in the {+mongosh+} prompt:

      .. code-block:: javascript

         use sample_mflix

   .. step:: Load the embeddings to use in the query.

      a. Run the following command to load the embeddings in the
         ``embeddings.js`` file after replacing ``<path-to-file>`` with
         the absolute path to your ``embeddings.js`` file. 

         .. io-code-block:: 
            :copyable: true 

            .. input:: 
               :language: javascript 

               load('/<path-to-file>/embeddings.js';

            .. output:: 
               :language: javascript 

               true

      #. Verify that the embeddings loaded successfully.

         You can verify by running a command similar to the following:

         .. io-code-block:: 
            :copyable: true 

            .. input:: 
               :language: javascript 

               COMEDY_INVOLVING_GHOSTS.length

            .. output:: 
               :language: javascript  

               2048

   .. step:: Run the {+avs+} queries against the ``embedded_movies`` collection.

      .. tabs::
         
         .. tab:: Similar Terms, Same Field
            :tabid: similar-terms-same-field 

            Perform a comprehensive search of the dataset for semantically similar 
            terms to determine which query term returns the best results.

            .. io-code-block:: 
               :copyable: true 

               .. input:: /includes/unionwith/code-snippets/vector/shell/multiple-vectors-query.sh 
                  :language: shell 
                  :linenos: 

               .. output:: /includes/unionwith/code-snippets/output/vector/shell/multiple-vectors.js
                  :language: javascript
                  :visible: false

            .. include:: /includes/unionwith/facts/vector/multiple-vectors-query.rst

         .. tab:: Same Term, Multiple Fields
            :tabid: same-term-multiple-fields

            Search multiple fields in the dataset to determine which fields return 
            the best results for the same query.

            .. io-code-block:: 
               :copyable: true 

               .. input:: /includes/unionwith/code-snippets/vector/shell/same-term-vectors-query.sh 
                  :language: shell 
                  :linenos: 

               .. output:: /includes/unionwith/code-snippets/output/vector/shell/same-term-vectors.js
                  :language: javascript
                  :visible: false

            .. include:: /includes/unionwith/facts/vector/same-term-vectors-query.rst

         .. tab:: Same Term, Multiple Models
            :tabid: same-term-multiple-models

            Search embeddings from different embedding models for the same query 
            term to determine the semantic interpretation differences between the 
            different models. 

            .. io-code-block:: 
               :copyable: true 

               .. input:: /includes/unionwith/code-snippets/vector/shell/same-term-multiple-models-query.sh 
                  :language: shell 
                  :linenos: 

               .. output:: /includes/unionwith/code-snippets/output/vector/shell/same-term-multiple-models.js
                  :language: javascript
                  :visible: false

            .. include:: /includes/unionwith/facts/vector/same-term-multiple-models-query.rst 
