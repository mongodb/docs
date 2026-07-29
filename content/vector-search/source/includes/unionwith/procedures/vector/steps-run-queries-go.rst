.. procedure::
   :style: normal

   .. step:: Create a file named ``vector-query.go``.

   .. step:: Copy and paste the {+avs+} query in the ``vector-query.go`` file.

      .. tabs::

         .. tab:: Similar Terms, Same Field
            :tabid: similar-terms-same-field

            Perform a comprehensive search of the dataset for semantically similar
            terms to determine which query term returns the best results.

            .. literalinclude:: /includes/unionwith/code-snippets/vector/go/multiple-vectors-query.go
               :copyable: true
               :language: go

            .. include:: /includes/unionwith/facts/vector/multiple-vectors-query.rst

         .. tab:: Same Term, Multiple Fields
            :tabid: same-term-multiple-fields

            Search multiple fields in the dataset to determine which fields return
            the best results for the same query.

            .. literalinclude:: /includes/unionwith/code-snippets/vector/go/same-term-vectors-query.go
               :copyable: true
               :language: go

            .. include:: /includes/unionwith/facts/vector/same-term-vectors-query.rst

         .. tab:: Same Term, Multiple Models
            :tabid: same-term-multiple-models

            Search embeddings from different embedding models for the same query 
            term to determine the semantic interpretation differences between the 
            different models.

            .. literalinclude:: /includes/unionwith/code-snippets/vector/go/same-term-multiple-models-query.go
               :copyable: true
               :language: go

            .. include:: /includes/unionwith/facts/vector/same-term-multiple-models-query.rst

   .. step:: Specify your connection string and save the file.

      In ``vector-query.go`` file, replace the ``<connectionString>`` 
      placeholder with your connection string.

      .. include:: /includes/shared/facts/find-connection-string.rst

   .. step:: Run the {+avs+} query against the ``embedded_movies`` collection.

      .. tabs::
         :hidden:

         .. tab:: Similar Terms, Same Field
            :tabid: similar-terms-same-field

            .. io-code-block::
               :copyable: true

               .. input::
                  :language: shell

                  go run vector-query.go

               .. output:: /includes/unionwith/code-snippets/output/vector/go/multiple-vectors-query-results.js
                  :language: javascript
                  :visible: false

         .. tab:: Same Term, Multiple Fields
            :tabid: same-term-multiple-fields

            .. io-code-block::
               :copyable: true

               .. input::
                  :language: shell

                  go run vector-query.go

               .. output:: /includes/unionwith/code-snippets/output/vector/go/same-term-vectors-query-results.js
                  :language: javascript
                  :visible: false

         .. tab:: Same Term, Multiple Models
            :tabid: same-term-multiple-models

            .. io-code-block::
               :copyable: true

               .. input::
                  :language: shell

                  go run vector-query.go

               .. output:: /includes/unionwith/code-snippets/output/vector/go/same-term-multiple-models-query-results.js
                  :language: javascript
                  :visible: false
