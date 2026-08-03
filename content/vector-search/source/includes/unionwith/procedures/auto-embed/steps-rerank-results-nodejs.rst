.. procedure::
   :style: normal

   .. step:: Modify the ``auto-embed-query.js`` file to add the reranking stages.

      Copy and paste the highlighted code into your query file.

      .. tabs::
         :hidden:

         .. tab:: Similar Terms, Same Field
            :tabid: similar-terms-same-field

            .. literalinclude:: /includes/unionwith/code-snippets/auto-embed/nodejs/rerank-multiple-vectors-query.js
               :copyable: true
               :language: javascript
               :linenos:
               :emphasize-lines: 57-80

            .. include:: /includes/unionwith/facts/auto-embed/rerank-multiple-vectors-query.rst

         .. tab:: Same Term, Multiple Fields
            :tabid: same-term-multiple-fields

            .. literalinclude:: /includes/unionwith/code-snippets/auto-embed/nodejs/rerank-same-term-vectors-query.js
               :copyable: true
               :language: javascript
               :linenos:
               :emphasize-lines: 57-85

            .. include:: /includes/unionwith/facts/auto-embed/rerank-same-term-vectors-query.rst

         .. tab:: Same Term, Multiple Models
            :tabid: same-term-multiple-models

            .. literalinclude:: /includes/unionwith/code-snippets/auto-embed/nodejs/rerank-same-term-multiple-models-query.js
               :copyable: true
               :language: javascript
               :linenos:
               :emphasize-lines: 61-85

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

                  node auto-embed-query.js

               .. output:: /includes/unionwith/code-snippets/output/auto-embed/nodejs/rerank-multiple-vectors.js
                  :language: javascript
                  :visible: false

         .. tab:: Same Term, Multiple Fields
            :tabid: same-term-multiple-fields

            .. io-code-block::
               :copyable: true

               .. input::
                  :language: bash

                  node auto-embed-query.js

               .. output:: /includes/unionwith/code-snippets/output/auto-embed/nodejs/rerank-same-term-vectors.js
                  :language: javascript
                  :visible: false

         .. tab:: Same Term, Multiple Models
            :tabid: same-term-multiple-models

            .. io-code-block::
               :copyable: true

               .. input::
                  :language: bash

                  node auto-embed-query.js

               .. output:: /includes/unionwith/code-snippets/output/auto-embed/nodejs/rerank-same-term-multiple-models.js
                  :language: javascript
                  :visible: false
