.. procedure::
   :style: normal

   .. step:: Create a file named ``AutoEmbedQuery.java``.

   .. step:: Copy and paste the {+avs+} query into the ``AutoEmbedQuery.java`` file.

      For each of the following programs connect to your cluster, run the query, 
      and print the results.

      .. tabs::

         .. tab:: Similar Terms, Same Field
            :tabid: similar-terms-same-field

            Perform a comprehensive search of the dataset for semantically similar
            terms to determine which query term returns the best results.

            .. literalinclude:: /includes/unionwith/code-snippets/auto-embed/java/multiple-vectors-query.java
               :copyable: true
               :language: java

            .. include:: /includes/unionwith/facts/auto-embed/multiple-vectors-query.rst

         .. tab:: Same Term, Multiple Fields
            :tabid: same-term-multiple-fields

            Search multiple fields in the dataset to determine which fields return
            the best results for the same query.

            .. literalinclude:: /includes/unionwith/code-snippets/auto-embed/java/same-term-vectors-query.java
               :copyable: true
               :language: java

            .. include:: /includes/unionwith/facts/auto-embed/same-term-vectors-query.rst

         .. tab:: Same Term, Multiple Models
            :tabid: same-term-multiple-models

            Search embeddings from different embedding models for the same query 
            term to determine the semantic interpretation differences between the 
            different models.

            .. literalinclude:: /includes/unionwith/code-snippets/auto-embed/java/same-term-multiple-models-query.java
               :copyable: true
               :language: java

            .. include:: /includes/unionwith/facts/auto-embed/same-term-multiple-models-query.rst

   .. step:: Specify your connection string and save the file.

      In the ``AutoEmbedQuery.java`` file, replace the ``<connectionString>`` 
      placeholder with your connection string.

      .. include:: /includes/shared/facts/find-connection-string.rst

   .. step:: Run the {+avs+} query against the ``embedded_movies`` collection.

      Compile and run the ``AutoEmbedQuery.java`` file:

      .. tabs::
         :hidden:

         .. tab:: Similar Terms, Same Field
            :tabid: similar-terms-same-field

            .. io-code-block::
               :copyable: true

               .. input::
                  :language: shell

                  javac AutoEmbedQuery.java
                  java AutoEmbedQuery

               .. output:: /includes/unionwith/code-snippets/output/auto-embed/java/multiple-vectors.js
                  :language: shell
                  :visible: false

         .. tab:: Same Term, Multiple Fields
            :tabid: same-term-multiple-fields

            .. io-code-block::
               :copyable: true

               .. input::
                  :language: shell

                  javac VectorQuery.java
                  java VectorQuery

               .. output:: /includes/unionwith/code-snippets/output/auto-embed/java/same-term-vectors.js
                  :language: shell
                  :visible: false

         .. tab:: Same Term, Multiple Models
            :tabid: same-term-multiple-models

            .. io-code-block::
               :copyable: true

               .. input::
                  :language: shell

                  javac VectorQuery.java
                  java VectorQuery

               .. output:: /includes/unionwith/code-snippets/output/auto-embed/java/same-term-multiple-models.js
                  :language: shell
                  :visible: false
