.. tabs::

   .. tab:: Basic Semantic Search
      :tabid: semantic-search

      .. procedure::
         :style: normal

         .. step:: Add the following code to your asynchronous function and save the file. 

            The following code uses the ``similaritySearch`` method 
            to perform a basic semantic search for 
            the string ``MongoDB Atlas security``. It returns a 
            list of documents ranked by relevance with only the 
            ``pageContent`` and ``pageNumber`` fields.

            .. code-block:: javascript

               // Basic semantic search
               const basicOutput = await vectorStore.similaritySearch("MongoDB Atlas security");
               const basicResults = basicOutput.map((results => ({ 
                  pageContent: results.pageContent, 
                  pageNumber: results.metadata.loc.pageNumber,
               })))
               
               console.log("Semantic Search Results:")
               console.log(basicResults)

         .. step:: Run the following command to execute the query.

            .. io-code-block:: 
               :copyable: true 

               .. input::
                  :language: sh

                  node get-started.js
                  
               .. output:: 
                  :language: json

                  Semantic Search Results:
                  [
                    {
                      pageContent: 'Atlas free tier, or download MongoDB for local \n' +
                        'development.\n' +
                        'Review the MongoDB manuals and tutorials in our \n' +
                        'documentation. \n' +
                        'More Resources\n' +
                        'For more on getting started in MongoDB:',
                      pageNumber: 30
                    },
                    {
                      pageContent: 'read isolation.  \n' +
                        'With MongoDB Atlas, you can achieve workload isolation with dedicated analytics nodes. Visualization \n' +
                        'tools like Atlas Charts can be configured to read from analytics nodes only.',
                      pageNumber: 21
                    },
                    {
                      pageContent: '• Zoned Sharding — You can define specific rules governing data placement in a sharded cluster.\n' +
                        'Global Clusters in MongoDB Atlas allows you to quickly implement zoned sharding using a visual UI or',
                      pageNumber: 27
                    },
                    {
                      pageContent: 'are updated, associated indexes must be maintained, incurring additional CPU and disk I/O overhead. \n' +
                        'If you\'re running fully managed databases on MongoDB Atlas, the built-in Performance Advisor',
                      pageNumber: 20
                    }
                  ]

   .. tab:: Semantic Search with Filtering
      :tabid: semantic-search-filter

      You can pre-filter your data by using an
      :abbr:`MQL (MongoDB Query Language)` match expression
      that compares the indexed field with another value in 
      your collection. You must index any metadata fields that you want to 
      filter by as the ``filter`` type. To learn more, see 
      :ref:`avs-types-vector-search`.

      .. note:: 
            
         You specified the ``loc.pageNumber`` field as a filter 
         when you :ref:`created the index <langchain-create-index>`
         for this tutorial.

      .. procedure::
         :style: normal

         .. step:: Add the following code to your asynchronous function and save the file. 

            The following code uses the ``similaritySearch`` method 
            to perform a semantic search for the string ``MongoDB Atlas security``.
            It specifies the following parameters:

            - The number of documents to return as ``3``.
            - A pre-filter on the ``loc.pageNumber`` field that uses the :query:`$eq` operator
              to match documents appearing on page 17 only.

            It returns a list of documents ranked by relevance with only the 
            ``pageContent`` and ``pageNumber`` fields.

            .. code-block:: javascript

               // Semantic search with metadata filter
               const filteredOutput = await vectorStore.similaritySearch("MongoDB Atlas Search", 3, { 
                  preFilter: {
                     "loc.pageNumber": {"$eq": 22 },
                  }
               });
               const filteredResults = filteredOutput.map((results => ({ 
                  pageContent: results.pageContent, 
                  pageNumber: results.metadata.loc.pageNumber,
               })))
               
               console.log("Semantic Search with Filtering Results:")
               console.log(filteredResults)

         .. step:: Run the following command to execute the query.

            .. io-code-block:: 
               :copyable: true 

               .. input::
                  :language: sh

                  node get-started.js
                  
               .. output:: 
                  :language: json

                  Semantic Search with Filtering Results:
                  [
                    {
                      pageContent: 'Atlas Search is built for the MongoDB document data model and provides higher performance and',
                      pageNumber: 22
                    },
                    {
                      pageContent: 'Figure 9: Atlas Search queries are expressed through the MongoDB Query API and backed by the leading search engine library, \n' +
                        'Apache Lucene.',
                      pageNumber: 22
                    },
                    {
                      pageContent: 'consider using Atlas Search. The service is built on fully managed Apache Lucene but exposed to users \n' +
                        'through the MongoDB Aggregation Framework.',
                      pageNumber: 22
                    }
                  ]

   .. tab:: MMR Search
      :tabid: mmr-search

      You can also perform semantic search based on Max Marginal Relevance (MMR),
      a measure of semantic relevance optimized for diversity.

      .. procedure::
         :style: normal

         .. step:: Add the following code to your asynchronous function and save the file. 

            The following code uses the ``maxMarginalRelevanceSearch`` method 
            to search for the string ``MongoDB Atlas security``.
            It also specifies an object that defines the following 
            optional parameters:

            - ``k`` to limit the number of returned documents to ``3``.
            - ``fetchK`` to fetch only ``10`` documents before passing 
              the documents to the :abbr:`MMR (Max Marginal Relevance)` algorithm.

            It returns a list of documents ranked by relevance
            with only the ``pageContent`` and ``pageNumber`` fields. 

            .. code-block:: javascript
               
               // Max Marginal Relevance search
               const mmrOutput = await vectorStore.maxMarginalRelevanceSearch("MongoDB Atlas security", {
                  k: 3, 
                  fetchK: 10,
               });
               const mmrResults = mmrOutput.map((results => ({ 
                  pageContent: results.pageContent, 
                  pageNumber: results.metadata.loc.pageNumber,
               })))

               console.log("Max Marginal Relevance Search Results:")
               console.log(mmrResults)
               
         .. step:: Run the following command to execute the query.

            .. io-code-block:: 
               :copyable: true 

               .. input::
                  :language: sh

                  node get-started.js
                  
               .. output:: 
                  :language: json

                  Max Marginal Relevance Search Results:
                  [
                    {
                      pageContent: 'Atlas Search is built for the MongoDB document data model and provides higher performance and',
                      pageNumber: 22
                    },
                    {
                      pageContent: '• Zoned Sharding — You can define specific rules governing data placement in a sharded cluster.\n' +
                        'Global Clusters in MongoDB Atlas allows you to quickly implement zoned sharding using a visual UI or',
                      pageNumber: 27
                    },
                    {
                      pageContent: 'read isolation.  \n' +
                        'With MongoDB Atlas, you can achieve workload isolation with dedicated analytics nodes. Visualization \n' +
                        'tools like Atlas Charts can be configured to read from analytics nodes only.',
                      pageNumber: 21
                    }
                  ]
