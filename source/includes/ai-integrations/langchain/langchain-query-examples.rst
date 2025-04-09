.. tabs::

   .. tab:: Semantic Search
      :tabid: semantic-search

      The following query uses the ``similarity_search`` method 
      to perform a basic semantic search for 
      the string ``MongoDB acquisition``. It returns a 
      list of documents ranked by relevance.

      ..
         NOTE: If you edit this Python code, also update the Jupyter Notebook
         at https://github.com/mongodb/docs-notebooks/blob/main/ai-integrations/langchain.ipynb

      .. io-code-block:: 
         :copyable: true 

         .. input:: 
            :language: python

            query = "MongoDB acquisition"
            results = vector_store.similarity_search(query)

            pprint.pprint(results)
         
         .. output:: 
            :language: JSON

            [Document(id='67f0259b8bb2babc06924409', metadata={ ... }, page_content='SOURCE MongoDB, Inc.'),
             Document(id='67f0259b8bb2babc0692432f', metadata={ ... }, page_content='MongoDB  platform. In fiscal year 2026 we expect to see stable consumption growth in Atlas, our main growth driver," said Dev Ittycheria, President\nand Chief Executive Officer of MongoDB .'),
             Document(id='67f0259b8bb2babc06924355', metadata={ ... }, page_content='conjunction with the acquisition of Voyage, MongoDB  is announcing a stock buyback program of $200 million, to offset the\ndilutive impact of the acquisition consideration.'),
             Document(id='67f0259b8bb2babc069243a6', metadata={ ... }, page_content="MongoDB's unified, intelligent data platform was built to power the next generation of applications, and MongoDB  is the most widely available, globally")]
   
   .. tab:: Semantic Search with Score
      :tabid: semantic-search-score

      The following query uses the ``similarity_search_with_score`` 
      method to perform a semantic search for 
      the string ``MongoDB acquisition`` and specifies the
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
         at https://github.com/mongodb/docs-notebooks/blob/main/ai-integrations/langchain.ipynb

      .. io-code-block:: 
         :copyable: true 

         .. input:: 
            :language: python

            query = "MongoDB acquisition"
            results = vector_store.similarity_search_with_score(
               query = query, k = 3
            )

            pprint.pprint(results)
         
         .. output:: 
            :language: JSON

            [(Document(id='67f0259b8bb2babc06924409', metadata={ ... }, page_content='SOURCE MongoDB, Inc.'),
              0.8193451166152954),
             (Document(id='67f0259b8bb2babc0692432f', metadata={ ... }, page_content='MongoDB  platform. In fiscal year 2026 we expect to see stable consumption growth in Atlas, our main growth driver," said Dev Ittycheria, President\nand Chief Executive Officer of MongoDB .'),
              0.7815237045288086),
             (Document(id='67f0259b8bb2babc06924355', metadata={ ... }, page_content='conjunction with the acquisition of Voyage, MongoDB  is announcing a stock buyback program of $200 million, to offset the\ndilutive impact of the acquisition consideration.'),
              0.7788857221603394)]

   .. tab:: Semantic Search with Filtering
      :tabid: semantic-search-filter

      You can pre-filter your data by using an
      :abbr:`MQL (MongoDB Query Language)` match expression
      that compares the indexed field with another value in 
      your collection. You must index any metadata fields that you want to 
      filter by as the ``filter`` type. To learn more, see 
      :ref:`avs-types-vector-search`.
      
      .. note:: 

         You specified the ``page_label`` field as a filter 
         when you :ref:`created the index <langchain-create-index>`
         for this tutorial.

      The following query uses the ``similarity_search_with_score`` method 
      to perform a semantic search for 
      the string ``MongoDB acquisition``. It also specifies the following:

      - The ``k`` parameter to limit the number of documents to return
        to ``3``.
      - A pre-filter on the ``page_label`` field that uses the :query:`$eq` operator
        to match documents appearing on page 2 only.
         
      It returns the three most relevant documents from page 2
      and a :ref:`relevance score <scoring-ref>` between 
      ``0`` and ``1``.

      ..
         NOTE: If you edit this Python code, also update the Jupyter Notebook
         at https://github.com/mongodb/docs-notebooks/blob/main/ai-integrations/langchain.ipynb

      .. io-code-block:: 
         :copyable: true 

         .. input:: 
            :language: python

            query = "MongoDB acquisition"

            results = vector_store.similarity_search_with_score(
               query = query, 
               k = 3, 
               pre_filter = { "page_label": { "$eq": 2 } }
            )

            pprint.pprint(results)
         
         .. output:: 
            :language: JSON

            [(Document(id='67f0259b8bb2babc06924355', metadata={ ... 'page_label': '2'}, page_content='conjunction with the acquisition of Voyage, MongoDB  is announcing a stock buyback program of $200 million, to offset the\ndilutive impact of the acquisition consideration.'),
              0.7788857221603394),
             (Document(id='67f0259b8bb2babc06924351', metadata={ ... 'page_label': '2'}, page_content='Measures."\nFourth Quarter Fiscal 2025 and Recent Business Highlights\nMongoDB  acquired Voyage AI, a pioneer in state-of-the-art embedding and reranking models that power next-generation'),
              0.7606035470962524),
             (Document(id='67f0259b8bb2babc06924354', metadata={ ... 'page_label': '2'}, page_content='data.\nMongoDB  completed the redemption of 2026 Convertible Notes, eliminating all debt from the balance sheet. Additionally, in'),
              0.7583936452865601)]