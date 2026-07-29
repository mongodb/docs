.. procedure::
   :style: normal

   .. step:: Modify your query file to add the reranking stages.

      Copy and paste the highlighted code into your query file.

      .. tabs::
         :hidden:

         .. tab:: Similar Terms, Same Field
            :tabid: similar-terms-same-field

            .. literalinclude:: /includes/unionwith/code-snippets/vector/java/rerank-multiple-vectors-query.java
               :copyable: true
               :language: java
               :linenos:
               :emphasize-lines: 53-67

            .. include:: /includes/unionwith/facts/vector/rerank-multiple-vectors-query.rst

         .. tab:: Same Term, Multiple Fields
            :tabid: same-term-multiple-fields

            .. literalinclude:: /includes/unionwith/code-snippets/vector/java/rerank-same-term-vectors-query.java
               :copyable: true
               :language: java
               :linenos:
               :emphasize-lines: 53-69

            .. include:: /includes/unionwith/facts/vector/rerank-same-term-vectors-query.rst

         .. tab:: Same Term, Multiple Models
            :tabid: same-term-multiple-models

            .. literalinclude:: /includes/unionwith/code-snippets/vector/java/rerank-same-term-multiple-models-query.java
               :copyable: true
               :language: java
               :linenos:
               :emphasize-lines: 51-67

            .. include:: /includes/unionwith/facts/vector/rerank-same-term-multiple-models-query.rst

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

                  javac VectorQuery.java
                  java VectorQuery

               .. output:: /includes/unionwith/code-snippets/output/vector/java/rerank-multiple-vectors-query-results.js
                  :language: javascript
                  :visible: false

         .. tab:: Same Term, Multiple Fields
            :tabid: same-term-multiple-fields

            .. io-code-block::
               :copyable: true

               .. input::
                  :language: bash

                  javac VectorQuery.java
                  java VectorQuery

               .. output:: /includes/unionwith/code-snippets/output/vector/java/rerank-same-term-vectors-query-results.js
                  :language: javascript
                  :visible: false

         .. tab:: Same Term, Multiple Models
            :tabid: same-term-multiple-models

            .. io-code-block::
               :copyable: true

               .. input::
                  :language: bash

                  javac VectorQuery.java
                  java VectorQuery

               .. output:: /includes/unionwith/code-snippets/output/vector/java/rerank-same-term-multiple-models-query-results.js
                  :language: javascript
                  :visible: false
