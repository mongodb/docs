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
              - |voyage|'s ``voyage-3-large``
              - 2048

            * - slapstick humor with paranormal events
              - HUMOR_INVOLVING_PARANORMAL
              - |voyage|'s ``voyage-3-large``
              - 2048

            * - battle between good and evil
              - BATTLE_GOOD_EVIL
              - |voyage|'s ``voyage-3-large``
              - 2048 

            * - journey across lands
              - JOURNEY_ACROSS_LANDS_VOYAGEAI
              - |voyage|'s ``voyage-3-large``
              - 2048

            * - journey across lands
              - JOURNEY_ACROSS_LANDS_OPENAI
              - OpenAI's ``text-embedding-ada-002``
              - 1536

         .. literalinclude:: /includes/avs/unionwith-rankfusion/embeddings.js 
            :language: javascript 
            :copyable: true

      #. Save and close the file.

   .. step:: Connect to your {+cluster+} in {+mongosh+}.

      Open {+mongosh+} in a terminal window and
      connect to your {+cluster+}. For detailed instructions on 
      connecting, see :doc:`/mongo-shell-connection`.
   
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

      .. collapsible::
         :heading: Multiple Query Vectors Against a Single Document Vector 
         :sub_heading: Perform a comprehensive search of the dataset for semantically similar terms to determine which query term returns the best results.
         :expanded: false 

         .. io-code-block:: 
            :copyable: true 

            .. input:: /includes/avs/unionwith-rankfusion/multiple-vectors-query.sh 
               :language: shell 
               :linenos: 

            .. output:: /includes/avs/unionwith-rankfusion/multiple-vectors-query-results.sh
               :language: shell 
               :visible: false

         This sample query uses the ``$rankFusion`` with the
         following input pipeline stages: 

         ..  list-table:: 
             :stub-columns: 1
             :widths: 20 80

             * - :pipeline:`$vectorSearch` 
               - - Searches the ``plot_embedding_voyage_3_large`` field
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
                   ``plot_embedding_voyage_3_large`` field for the
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
               - Limits the returned results to 20 documents.

         {+avs+} merges the results for both the queries into a single
         result set. In the results:
         
         - The ``scoreDetails.value`` shows the raw score from that
           pipeline before it is weighted and combined by using
           reciprocal rank fusion.  
         - The ``score.details.rank`` shows the rank of the document in
           the results of the pipeline. 
         - The ``scoreDetails.details.value`` contains the weighted
           reciprocal rank score. 
           
         You can do the following: 
         
         - Adjust the weights assigned to each pipeline in the query to
           further refine the results. 
         - Increase the number of documents in the results if you see
           disjoint results. 

      .. collapsible::
         :heading: Same Term Query Vector Against Multiple Document Vectors
         :sub_heading: Search multiple fields in the dataset to determine which fields return the best results for the same query.
         :expanded: false 

         .. io-code-block:: 
            :copyable: true 

            .. input:: /includes/avs/unionwith-rankfusion/same-term-vectors-query.sh 
               :language: shell 
               :linenos: 

            .. output:: /includes/avs/unionwith-rankfusion/same-term-vectors-query-results.sh
               :language: shell 
               :visible: false

         This sample query uses the ``$rankFusion`` with the
         following input pipeline stages: 

         ..  list-table:: 
             :stub-columns: 1
             :widths: 20 80

             * - :pipeline:`$vectorSearch` 
               - - Searches the ``plot_embedding_voyage_3_large`` field
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
                   ``title_voyageai_embedding`` field for the string
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
               - Limits the returned results to 20 documents.

         {+avs+} merges the results for both the queries into a single
         result set. In the results:
         
         - The ``scoreDetails.value`` shows the raw score from that
           pipeline before it is weighted and combined by using
           reciprocal rank fusion.  
         - The ``score.details.rank`` shows the rank of the document in
           the results of the pipeline. 
         - The ``scoreDetails.details.value`` contains the weighted
           reciprocal rank score, which shows which fields return the
           most relevant result for the query term.  
         
         For example, the first and fourth documents in the results
         suggest a significant match for the term in the ``plot``
         field while the second and fifth documents suggest a
         significant match in the ``title`` field. You can do the
         following: 
         
         - Adjust the weights assigned to each pipeline in the query to
           further refine the results. 
         - Increase the number of documents in the results if you see
           disjoint results.  

      .. collapsible::
         :heading: Same Term Query Using Multiple Models
         :sub_heading: Search embeddings from different embedding models to determine the semantic interpretation differences between the different models. 
         :expanded: false 

         .. io-code-block:: 
            :copyable: true 

            .. input:: /includes/avs/unionwith-rankfusion/same-term-multiple-models-query.sh 
               :language: shell 
               :linenos: 

            .. output:: /includes/avs/unionwith-rankfusion/same-term-multiple-models-query-results.sh
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
                   ``plot_embedding_voyage_3_large`` field for the string
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
               - Limits the returned results to 20 documents.

         {+avs+} merges the results for both the queries into a single
         result set. In the results:
         
         - The ``scoreDetails.value`` shows the raw score from that
           pipeline before it is weighted and combined by using
           reciprocal rank fusion.  
         - The ``score.details.rank`` shows the rank of the document in
           the results of the pipeline. 
         - The ``scoreDetails.details.value`` contains the weighted
           reciprocal rank score, which shows the strengths and
           differences in the semantic interpretation of the query term
           by the different embedding models.  
         
         For example, the first and fifth documents in the results suggest more
         similar semantic representation by the model used in the
         ``vectorPipeline2`` while the second and fourth document in the
         results suggest closer semantic interpretation by the model
         used in the ``vectorPipeline1``. 
