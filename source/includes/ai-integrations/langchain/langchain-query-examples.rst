.. tabs::

   .. tab:: Semantic Search
      :tabid: semantic-search

      The following query uses the ``similarity_search`` method 
      to perform a basic semantic search for 
      the string ``MongoDB Atlas security``. It returns a 
      list of documents ranked by relevance.

      ..
         NOTE: If you edit this Python code, also update the Jupyter Notebook
         at https://github.com/mongodb/docs-notebooks/blob/main/integrations/langchain.ipynb

      .. io-code-block:: 
         :copyable: true 

         .. input:: 
            :language: python

            query = "MongoDB Atlas security"
            results = vector_store.similarity_search(query)

            pprint.pprint(results)
         
         .. output:: 
            :language: JSON

            [Document(page_content='To ensure a secure system right out of the b ox,\nauthentication and I P Address whitelisting are\nautomatically enabled.\nReview the security section of the MongoD B Atlas', metadata={'_id': ObjectId('65c2e8f480f26794dedad8d5'), 'source': 'https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE4HkJP', 'page': 17}),
             Document(page_content='MongoD B Atlas team are also monitoring the underlying\ninfrastructure, ensuring that it is always in a healthy state.\nApplication L ogs And Database L ogs', metadata={'_id': ObjectId('65c2e8f480f26794dedad8a0'), 'source': 'https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE4HkJP', 'page': 15}),
             Document(page_content='MongoD B.\nMongoD B Atlas incorporates best practices to help keep\nmanaged databases healthy and optimized. T hey ensure\noperational continuity by converting comple x manual tasks', metadata={'_id': ObjectId('65c2e8f380f26794dedad883'), 'source': 'https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE4HkJP', 'page': 13}),
             Document(page_content='Atlas provides encryption of data at rest with encrypted\nstorage volumes.\nOptionally , Atlas users can configure an additional layer of\nencryption on their data at rest using the MongoD B', metadata={'_id': ObjectId('65c2e8f480f26794dedad8e3'), 'source': 'https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE4HkJP', 'page': 18})]

   .. tab:: Semantic Search with Score
      :tabid: semantic-search-score

      The following query uses the ``similarity_search_with_score`` 
      method to perform a semantic search for 
      the string ``MongoDB Atlas security`` and specifies the
      ``k`` parameter to limit the number of documents to return
      to ``3``.

      .. note:: 

         The ``k`` parameter in this example refers to the 
         ``similarity_search_with_score`` method option, not the 
         :ref:`knn-beta-ref` operator option of the same name.
         
      It returns the three most relevant documents 
      and a :ref:`relevance score <scoring-ref>` between 
      ``0`` and ``1``.

      ..
         NOTE: If you edit this Python code, also update the Jupyter Notebook
         at https://github.com/mongodb/docs-notebooks/blob/main/integrations/langchain.ipynb

      .. io-code-block:: 
         :copyable: true 

         .. input:: 
            :language: python

            query = "MongoDB Atlas security"
            results = vector_store.similarity_search_with_score(
               query = query, k = 3
            )

            pprint.pprint(results)
         
         .. output:: 
            :language: JSON

            [(Document(page_content='To ensure a secure system right out of the b ox,\nauthentication and I P Address whitelisting are\nautomatically enabled.\nReview the security section of the MongoD B Atlas', metadata={'_id': ObjectId('65c2e8f480f26794dedad8d5'), 'source': 'https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE4HkJP', 'page': 17}),
              0.935082197189331),
             (Document(page_content='MongoD B Atlas team are also monitoring the underlying\ninfrastructure, ensuring that it is always in a healthy state.\nApplication L ogs And Database L ogs', metadata={'_id': ObjectId('65c2e8f480f26794dedad8a0'), 'source': 'https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE4HkJP', 'page': 15}),
              0.9335962533950806),
             (Document(page_content='MongoD B.\nMongoD B Atlas incorporates best practices to help keep\nmanaged databases healthy and optimized. T hey ensure\noperational continuity by converting comple x manual tasks', metadata={'_id': ObjectId('65c2e8f380f26794dedad883'), 'source': 'https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE4HkJP', 'page': 13}),
              0.9317940473556519)]

   .. tab:: Semantic Search with Filtering
      :tabid: semantic-search-filter

      You can pre-filter your data by using an
      :abbr:`MQL (MongoDB Query Language)` match expression
      that compares the indexed field with boolean, number, or 
      string values. You must index any metadata fields that you want to 
      filter by as the ``filter`` type. To learn more, see 
      :ref:`avs-types-vector-search`.
      
      .. note:: 

         You specified the ``page`` field as a filter 
         when you :ref:`created the index <langchain-create-index>`
         for this tutorial.

      The following query uses the ``similarity_search_with_score`` method 
      to perform a semantic search for 
      the string ``MongoDB Atlas security``. It also specifies the following:

      - The ``k`` parameter to limit the number of documents to return
        to ``3``.
      - A pre-filter on the ``page`` field that uses the :query:`$eq` operator
        to match documents appearing on page 17 only.
         
      It returns the three most relevant documents from page 17
      and a :ref:`relevance score <scoring-ref>` between 
      ``0`` and ``1``.

      ..
         NOTE: If you edit this Python code, also update the Jupyter Notebook
         at https://github.com/mongodb/docs-notebooks/blob/main/integrations/langchain.ipynb

      .. io-code-block:: 
         :copyable: true 

         .. input:: 
            :language: python

            query = "MongoDB Atlas security"

            results = vector_store.similarity_search_with_score(
               query = query, 
               k = 3, 
               pre_filter = { "page": { "$eq": 17 } }
            )

            pprint.pprint(results)
         
         .. output:: 
            :language: JSON

            [(Document(page_content='To ensure a secure system right out of the b ox,\nauthentication and I P Address whitelisting are\nautomatically enabled.\nReview the security section of the MongoD B Atlas', metadata={'_id': ObjectId('65c2e8f480f26794dedad8d5'), 'source': 'https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE4HkJP', 'page': 17}),
              0.935082197189331),
             (Document(page_content='Security\nAs with all software, MongoD B administrators must\nconsider security and risk e xposure for a MongoD B\ndeployment. T here are no magic solutions for risk', metadata={'_id': ObjectId('65c2e8f480f26794dedad8d0'), 'source': 'https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE4HkJP', 'page': 17}),
              0.920635461807251),
             (Document(page_content='number of diff erent methods for managing risk and\nreducing risk e xposure.\nMongoD B Atlas f eatures e xtensive capabilities to def end,\ndetect, and control access to MongoD B, off ering among', metadata={'_id': ObjectId('65c2e8f480f26794dedad8d2'), 'source': 'https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE4HkJP', 'page': 17}),
              0.9206267595291138)]
