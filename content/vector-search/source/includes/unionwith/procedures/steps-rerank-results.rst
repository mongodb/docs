**Run the following query to reorder the results.**

.. collapsible::
   :heading: Multiple Query Vectors Against a Single Document Vector 
   :sub_heading: Reorder the results of your comprehensive search of the dataset for semantically similar terms to determine which query term returns the best results.
   :expanded: false 

   .. io-code-block:: 
      :copyable: true 

      .. input:: /includes/unionwith/code-snippets/shell/rerank-multiple-vectors-query.sh 
         :language: shell 
         :linenos: 

      .. output:: /includes/unionwith/code-snippets/output/rerank-multiple-vectors-query-results.sh
         :language: shell 
         :visible: false

   This sample query uses the ``$rankFusion`` with the
   following input pipeline stages: 

   ..  list-table:: 
       :stub-columns: 1
       :widths: 20 80

       * - :pipeline:`$vectorSearch` 
         - - Searches the ``plot_embedding_voyage_4_large`` field
             for the phrase *light-hearted comedy with ghosts*,
             specified in the ``queryVector`` field of the query
             as vector embeddings by using the
             ``COMEDY_INVOLVING_GHOSTS`` variable. 
           - Specifies a search for up to ``2000`` nearest neighbors.
           - Limits the results from this stage to ``50`` documents.
           - Specifies a weight of ``0.5`` to influence that
             pipeline's rank contribution to the final score. 

       * - :pipeline:`$vectorSearch`
         - - Performs a sequential vector search on the
             ``plot_embedding_voyage_4_large`` field for the
             phrase *slapstick humor with paranormal events*,
             specified in the ``queryVector`` field as vector
             embeddings by using the
             ``HUMOR_INVOLVING_PARANORMAL`` variable.
           - Specifies a search for up to ``2000`` nearest neighbors.
           - Limits the results from this stage to ``50`` documents.
           - Specifies a weight of ``0.5`` to influence that
             pipeline's rank contribution to the final score.

   The sample query also specifies the following pipeline stages.

   ..  list-table:: 
       :stub-columns: 1
       :widths: 20 80

       * - :pipeline:`$project`
         - - Includes only the ``plot`` and ``title`` fields in the results.
           - Adds a field named ``scoreDetails`` in the results.

       * - :pipeline:`$limit`
         - Limits the returned results to 50 documents.

   {+avs+} merges the results for both the queries into a single
   result set. It then reorders the results by using the
   :pipeline:`$rerank` stage. The ``$rerank`` stage reorders the 
   results by relevance to the query term ``light-hearted comedy 
   with ghosts``. In the results, the :pipeline:`$rerank` stage 
   adds a field named ``rerankScore`` that shows the score after 
   reordering. The reordered results are more relevant to the query 
   term.

.. collapsible::
   :heading: Same Term Query Vector Against Multiple Document Vectors
   :sub_heading: Reorder the results of the search on multiple fields in the dataset to determine which fields return the best results for the same query.
   :expanded: false 

   .. io-code-block:: 
      :copyable: true 

      .. input:: /includes/unionwith/code-snippets/shell/rerank-same-term-vectors-query.sh 
         :language: shell 
         :linenos: 

      .. output:: /includes/unionwith/code-snippets/output/rerank-same-term-vectors-query-results.sh
         :language: shell 
         :visible: false

   This sample query uses the ``$rankFusion`` with the
   following input pipeline stages: 

   ..  list-table:: 
       :stub-columns: 1
       :widths: 20 80

       * - :pipeline:`$vectorSearch` 
         - - Searches the ``plot_embedding_voyage_4_large`` field
             for the phrase *battle between good and evil*,
             specified in the ``queryVector`` field of the query
             as vector embeddings by using the
             ``BATTLE_GOOD_EVIL`` variable.
           - Specifies a search for up to ``2000`` nearest
             neighbors. 
           - Limits the results to ``200`` documents only.
           - Specifies a weight of ``0.5`` to influence that
             pipeline's rank contribution to the final score. 

       * - :pipeline:`$vectorSearch`
         - - Performs a sequential vector search on the
             ``title_embedding_voyage_4_large`` field for the string
             *battle between good and evil*, specified in the
             ``queryVector`` field as vector embeddings by using
             the ``BATTLE_GOOD_EVIL`` variable. 
           - Specifies a search for up to ``2000`` nearest neighbors.
           - Limits the results to ``200`` documents only.
           - Specifies a weight of ``0.5`` to influence that
             pipeline's rank contribution to the final score.

   The sample query also specifies the following pipeline stages.

   ..  list-table:: 
       :stub-columns: 1
       :widths: 20 80

       * - :pipeline:`$project`
         - - Includes only the ``plot`` and ``title`` fields in the results.
           - Adds a field named ``scoreDetails`` in the results.

       * - :pipeline:`$limit`
         - Limits the returned results to 200 documents.

   {+avs+} merges the results for both the queries into a single
   result set. It then reorders the results by using the
   :pipeline:`$rerank` stage. The :pipeline:`$match` stage filters the
   documents to include only documents that have a ``plot`` field of
   type ``string``. The ``$rerank`` stage reorders the results by 
   relevance to the query term ``battle between good and evil``. In the 
   results, the :pipeline:`$rerank` stage adds a field named 
   ``rerankScore`` that shows the score after reordering.

.. collapsible::
   :heading: Same Term Query Using Multiple Models
   :sub_heading: Reorder the results of the search on embeddings from different embedding models to determine the semantic interpretation differences between the different models. 
   :expanded: false 

   .. io-code-block:: 
      :copyable: true 

      .. input:: /includes/unionwith/code-snippets/shell/rerank-same-term-multiple-models-query.sh 
         :language: shell 
         :linenos: 

      .. output:: /includes/unionwith/code-snippets/output/rerank-same-term-multiple-models-query-results.sh
         :language: shell 
         :visible: false

   This sample query uses the ``$rankFusion`` with the
   following input pipeline stages: 

   ..  list-table:: 
       :stub-columns: 1
       :widths: 20 80

       * - :pipeline:`$vectorSearch` 
         - - Searches the ``plot_embedding`` field for the string
             *journey across lands* specified in the ``queryVector``
             field of the query as vector embeddings by using the
             ``JOURNEY_ACROSS_LANDS_OPENAI``
             variable. 
           - Specifies a search for up to ``2000`` nearest
             neighbors. 
           - Limits the results to ``100`` documents.
           - Specifies a weight of ``0.5`` to influence that
             pipeline's rank contribution to the final score. 

       * - :pipeline:`$vectorSearch`
         - - Performs a sequential vector search on the
             ``plot_embedding_voyage_4_large`` field for the string
             *journey across lands*, specified in the ``queryVector``
             field as vector embeddings by using the
             ``JOURNEY_ACROSS_LANDS_VOYAGEAI`` variable.  
           - Specifies a search for up to ``2000`` nearest
             neighbors. 
           - Limits the results to ``100`` documents.
           - Specifies a weight of ``0.5`` to influence that
             pipeline's rank contribution to the final score.

   The sample query also specifies the following pipeline stages.

   ..  list-table:: 
       :stub-columns: 1
       :widths: 20 80

       * - :pipeline:`$project`
         - - Includes only the ``plot`` and ``title`` fields in the results.
           - Adds a field named ``scoreDetails`` in the results.

       * - :pipeline:`$limit`
         - Limits the returned results to 100 documents.

   {+avs+} merges the results for both the queries into a single
   result set. It then reorders the results by using the
   :pipeline:`$rerank` stage. The ``$rerank`` stage reorders the
   results by relevance to the query term ``journey across
   lands``. In the results, the :pipeline:`$rerank` stage adds a
   field named ``rerankScore`` that shows the score after
   reordering.