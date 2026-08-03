.. procedure:: 
   :style: normal 

   .. step:: Create a file for the embeddings to use in the query.

      a. Create a file named ``query-embeddings.js``. 

         .. code-block:: shell 

            touch query-embeddings.js 

      #. Copy and paste the following embeddings into the
         ``query-embeddings.js`` file. 

         .. literalinclude:: /includes/unionwith/code-snippets/auto-embed/query-embeddings.js
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

   .. step:: Run the {+avs+} queries against the ``embedded_movies`` collection.

      .. tabs::

         .. tab:: Similar Terms, Same Field
            :tabid: similar-terms-same-field

            Perform a comprehensive search of the dataset for semantically similar
            terms to determine which query term returns the best results.

            .. io-code-block::
               :copyable: true

               .. input:: /includes/unionwith/code-snippets/auto-embed/shell/multiple-vectors-query.sh
                  :language: shell
                  :linenos:

               .. output:: /includes/unionwith/code-snippets/output/auto-embed/shell/multiple-vectors.js
                  :language: shell
                  :visible: false

            .. include:: /includes/unionwith/facts/auto-embed/multiple-vectors-query.rst

         .. tab:: Same Term, Multiple Fields
            :tabid: same-term-multiple-fields

            Search multiple fields in the dataset to determine which fields return
            the best results for the same query.

            .. io-code-block::
               :copyable: true

               .. input:: /includes/unionwith/code-snippets/auto-embed/shell/same-term-vectors-query.sh
                  :language: shell
                  :linenos:

               .. output:: /includes/unionwith/code-snippets/output/auto-embed/shell/same-term-vectors.js
                  :language: shell
                  :visible: false

            .. include:: /includes/unionwith/facts/auto-embed/same-term-vectors-query.rst

         .. tab:: Same Term, Multiple Models
            :tabid: same-term-multiple-models

            Search embeddings from different embedding models for the same query 
            term to determine the semantic interpretation differences between the 
            different models.

            a. Load the embeddings for the query.

               .. code-block:: shell

                  load('/<path-to-file>/query-embeddings.js');

            #. Run the query.

               .. io-code-block::
                  :copyable: true

                  .. input:: /includes/unionwith/code-snippets/auto-embed/shell/same-term-multiple-models-query.sh
                     :language: shell
                     :linenos:

                  .. output:: /includes/unionwith/code-snippets/output/auto-embed/shell/same-term-multiple-models.js
                     :language: javascript
                     :visible: false

               .. include:: /includes/unionwith/facts/auto-embed/same-term-multiple-models-query.rst
