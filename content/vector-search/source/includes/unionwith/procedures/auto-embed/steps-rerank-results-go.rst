.. procedure::
   :style: normal

   .. step:: Modify the ``auto-embed-query.go`` file to add the reranking stages.

      Copy and paste the highlighted code into your query file.

      .. tabs::
         :hidden:

         .. tab:: Similar Terms, Same Field
            :tabid: similar-terms-same-field

            .. literalinclude:: /includes/unionwith/code-snippets/auto-embed/go/rerank-multiple-vectors-query.go
               :copyable: true
               :language: go
               :linenos:
               :emphasize-lines: 65-82

            .. include:: /includes/unionwith/facts/auto-embed/rerank-multiple-vectors-query.rst

         .. tab:: Same Term, Multiple Fields
            :tabid: same-term-multiple-fields

            .. literalinclude:: /includes/unionwith/code-snippets/auto-embed/go/rerank-same-term-vectors-query.go
               :copyable: true
               :language: go
               :linenos:
               :emphasize-lines: 65-88

            .. include:: /includes/unionwith/facts/auto-embed/rerank-same-term-vectors-query.rst

         .. tab:: Same Term, Multiple Models
            :tabid: same-term-multiple-models

            .. literalinclude:: /includes/unionwith/code-snippets/auto-embed/go/rerank-same-term-multiple-models-query.go
               :copyable: true
               :language: go
               :linenos:
               :emphasize-lines: 69-87

            .. include:: /includes/unionwith/facts/auto-embed/rerank-same-term-multiple-models-query.rst

   .. step:: Save the file.

   .. step:: Reorder the results of your query.

      To reorder the results, rerun the query:

      .. tabs::
         :hidden:

         .. tab:: Similar Terms, Same Field
            :tabid: similar-terms-same-field

            .. io-code-block::
               :copyable: true

               .. input::
                  :language: bash

                  go run auto-embed-query.go

               .. output:: /includes/unionwith/code-snippets/output/auto-embed/go/rerank-multiple-vectors.js
                  :language: javascript
                  :visible: false

         .. tab:: Same Term, Multiple Fields
            :tabid: same-term-multiple-fields

            .. io-code-block::
               :copyable: true

               .. input::
                  :language: bash

                  go run auto-embed-query.go

               .. output:: /includes/unionwith/code-snippets/output/auto-embed/go/rerank-same-term-vectors.js
                  :language: javascript
                  :visible: false

         .. tab:: Same Term, Multiple Models
            :tabid: same-term-multiple-models

            .. io-code-block::
               :copyable: true

               .. input::
                  :language: bash

                  go run auto-embed-query.go

               .. output:: /includes/unionwith/code-snippets/output/auto-embed/go/rerank-same-term-multiple-models.js
                  :language: javascript
                  :visible: false