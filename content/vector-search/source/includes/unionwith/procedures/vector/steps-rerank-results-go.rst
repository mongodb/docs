
.. procedure::
   :style: normal

   .. step:: Modify the ``vector-query.go`` file and save the file.

      Copy and paste the highlighted code to your query.

      .. tabs::
         :hidden:

         .. tab:: Similar Terms, Same Field
            :tabid: similar-terms-same-field

            .. literalinclude:: /includes/unionwith/code-snippets/vector/go/rerank-multiple-vectors-query.go
               :copyable: true
               :language: go
               :linenos:
               :emphasize-lines: 71-88

            .. include:: /includes/unionwith/facts/vector/rerank-multiple-vectors-query.rst

         .. tab:: Same Term, Multiple Fields
            :tabid: same-term-multiple-fields

            .. literalinclude:: /includes/unionwith/code-snippets/vector/go/rerank-same-term-vectors-query.go
               :copyable: true
               :language: go
               :linenos:
               :emphasize-lines: 68-91

            .. include:: /includes/unionwith/facts/vector/rerank-same-term-vectors-query.rst

         .. tab:: Same Term, Multiple Models
            :tabid: same-term-multiple-models

            .. literalinclude:: /includes/unionwith/code-snippets/vector/go/rerank-same-term-multiple-models-query.go
               :copyable: true
               :language: go
               :linenos:
               :emphasize-lines: 71-88

            .. include:: /includes/unionwith/facts/vector/rerank-same-term-multiple-models-query.rst

   .. step:: Save the file.
   
   .. step:: Reorder the results of your query.

      To reorder, rerun the query:

      .. tabs::
         :hidden:

         .. tab:: Similar Terms, Same Field
            :tabid: similar-terms-same-field

            .. io-code-block::
               :copyable: true

               .. input::
                  :language: bash

                  go run vector-query.go

               .. output:: /includes/unionwith/code-snippets/output/vector/go/rerank-multiple-vectors-query-results.js
                  :language: javascript
                  :visible: false

         .. tab:: Same Term, Multiple Fields
            :tabid: same-term-multiple-fields

            .. io-code-block::
               :copyable: true

               .. input::
                  :language: bash

                  go run vector-query.go

               .. output:: /includes/unionwith/code-snippets/output/vector/go/rerank-same-term-vectors-query-results.js
                  :language: javascript
                  :visible: false

         .. tab:: Same Term, Multiple Models
            :tabid: same-term-multiple-models

            .. io-code-block::
               :copyable: true

               .. input::
                  :language: bash

                  go run vector-query.go

               .. output:: /includes/unionwith/code-snippets/output/vector/go/rerank-same-term-multiple-models-query-results.js
                  :language: javascript
                  :visible: false

