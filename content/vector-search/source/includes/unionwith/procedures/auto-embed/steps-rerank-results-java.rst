.. procedure::
   :style: normal

   .. step:: Modify the ``AutoEmbedQuery.java`` file to add the reranking stages.

      Copy and paste the highlighted code into your query file.

      .. tabs::
         :hidden:

         .. tab:: Similar Terms, Same Field
            :tabid: similar-terms-same-field

            .. literalinclude:: /includes/unionwith/code-snippets/auto-embed/java/rerank-multiple-vectors-query.java
               :copyable: true
               :language: java
               :linenos:
               :emphasize-lines: 47-61

            .. include:: /includes/unionwith/facts/auto-embed/rerank-multiple-vectors-query.rst

         .. tab:: Same Term, Multiple Fields
            :tabid: same-term-multiple-fields

            .. literalinclude:: /includes/unionwith/code-snippets/auto-embed/java/rerank-same-term-vectors-query.java
               :copyable: true
               :language: java
               :linenos:
               :emphasize-lines: 47-63

            .. include:: /includes/unionwith/facts/auto-embed/rerank-same-term-vectors-query.rst

         .. tab:: Same Term, Multiple Models
            :tabid: same-term-multiple-models

            .. literalinclude:: /includes/unionwith/code-snippets/auto-embed/java/rerank-same-term-multiple-models-query.java
               :copyable: true
               :language: java
               :linenos:
               :emphasize-lines: 51-66

            .. include:: /includes/unionwith/facts/auto-embed/rerank-same-term-multiple-models-query.rst

   .. step:: Save the file.

   .. step:: Reorder the results of your query.

      To reorder the results, recompile and rerun the query:

      .. tabs::
         :hidden:

         .. tab:: Similar Terms, Same Field
            :tabid: similar-terms-same-field

            .. io-code-block::
               :copyable: true

               .. input::
                  :language: bash

                  javac AutoEmbedQuery.java
                  java AutoEmbedQuery

               .. output:: /includes/unionwith/code-snippets/output/auto-embed/java/rerank-multiple-vectors.js
                  :language: javascript
                  :visible: false

         .. tab:: Same Term, Multiple Fields
            :tabid: same-term-multiple-fields

            .. io-code-block::
               :copyable: true

               .. input::
                  :language: bash

                  javac AutoEmbedQuery.java
                  java AutoEmbedQuery

               .. output:: /includes/unionwith/code-snippets/output/auto-embed/java/rerank-same-term-vectors.js
                  :language: javascript
                  :visible: false

         .. tab:: Same Term, Multiple Models
            :tabid: same-term-multiple-models

            .. io-code-block::
               :copyable: true

               .. input::
                  :language: bash

                  javac AutoEmbedQuery.java
                  java AutoEmbedQuery

               .. output:: /includes/unionwith/code-snippets/output/auto-embed/java/rerank-same-term-multiple-models.js
                  :language: javascript
                  :visible: false
