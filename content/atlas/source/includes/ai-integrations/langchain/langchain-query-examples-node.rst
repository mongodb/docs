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

                  ...

                  Semantic Search Results:
                  [
                     {
                        pageContent: 'MongoDB Atlas features extensive capabilities to defend,\n' +
                           'detect, and control access to MongoDB, offering among\n' +
                           'the most complete security controls of any modern\n' +
                           'database:',
                        pageNumber: 18
                     },
                     {
                        pageContent: 'Atlas provides encryption of data at rest with encrypted\n' +
                           'storage volumes.\n' +
                           'Optionally, Atlas users can configure an additional layer of\n' +
                           'encryption on their data at rest using the MongoDB',
                        pageNumber: 19
                     },
                     {
                        pageContent: 'automatically enabled.\n' +
                           'Review thesecurity section of the MongoDB Atlas\n' +
                           'documentationto learn more about each of the security\n' +
                           'features discussed below.\n' +
                           'IP Whitelisting',
                        pageNumber: 18
                     },
                     {
                        pageContent: '16Security\n' +
                           '17Business Intelligence with MongoDB Atlas\n' +
                           '18Considerations for Proofs of Concept\n' +
                           '18MongoDB Stitch: Serverless Platform from MongoDB\n' +
                           '19We Can Help\n' +
                           '19Resources',
                        pageNumber: 2
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
               const filteredOutput = await vectorStore.similaritySearch("MongoDB Atlas security", 3, { 
               preFilter: {
                  "loc.pageNumber": {"$eq": 17 },
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

                  ...

                  Semantic Search with Filter Results:
                  [
                     {
                        pageContent: 'BSON database dumps produced bymongodump.\n' +
                           'In the vast majority of cases, MongoDB Atlas backups\n' +
                           'delivers the simplest, safest, and most efficient backup',
                        pageNumber: 17
                     },
                     {
                        pageContent: 'Monitoring Solutions\n' +
                           'The MongoDB Atlas API provides integration with external\n' +
                           'management frameworks through programmatic access to\n' +
                           'automation features and alerts.\n' +
                           'APM Integration',
                        pageNumber: 17
                     },
                     {
                        pageContent: 'MongoDB Atlas backups are maintained continuously, just\n' +
                           'a few seconds behind the operational system. If the\n' +
                           'MongoDB cluster experiences a failure, the most recent',
                        pageNumber: 17
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

                  ...

                  Max Marginal Relevance Search Results:

                  [
                     {
                        pageContent: 'MongoDB Atlas features extensive capabilities to defend,\n' +
                           'detect, and control access to MongoDB, offering among\n' +
                           'the most complete security controls of any modern\n' +
                           'database:',
                        pageNumber: 18
                     },
                     {
                        pageContent: 'automatically enabled.\n' +
                           'Review thesecurity section of the MongoDB Atlas\n' +
                           'documentationto learn more about each of the security\n' +
                           'features discussed below.\n' +
                           'IP Whitelisting',
                        pageNumber: 18
                     },
                     {
                        pageContent: '16Security\n' +
                           '17Business Intelligence with MongoDB Atlas\n' +
                           '18Considerations for Proofs of Concept\n' +
                           '18MongoDB Stitch: Serverless Platform from MongoDB\n' +
                           '19We Can Help\n' +
                           '19Resources',
                        pageNumber: 2
                     }
                  ]
