.. tabs::

   .. tab:: Basic RAG
      :tabid: langchain-rag

      This example does the following:

      - Instantiates {+avs+} as a `retriever 
        <https://python.langchain.com/docs/how_to/#retrievers>`__
        to query for similar documents, including the optional ``k`` 
        parameter to search for only the ``10`` most relevant documents.

      .. include:: /includes/ai-integrations/langchain/langchain-perform-qa-description.rst
      
      ..
         NOTE: If you edit this Python code, also update the Jupyter Notebook
         at https://github.com/mongodb/docs-notebooks/blob/main/ai-integrations/langchain.ipynb

      .. io-code-block:: 
         :copyable: true 

         .. input:: 
            :language: python

            # Instantiate Atlas Vector Search as a retriever
            retriever = vector_store.as_retriever(
               search_type = "similarity",
               search_kwargs = { "k": 10 }
            )

            # Define a prompt template
            template = """
               Use the following pieces of context to answer the question at the end.
               {context}
               Question: {question}
            """
            prompt = PromptTemplate.from_template(template)
            model = ChatOpenAI(model="gpt-4o")

            # Construct a chain to answer questions on your data
            chain = (
               { "context": retriever, "question": RunnablePassthrough()}
               | prompt   
               | model
               | StrOutputParser()
            )

            # Prompt the chain
            question = "What was MongoDB's latest acquisition?"
            answer = chain.invoke(question)

            print("Question: " + question)
            print("Answer: " + answer)

            # Return source documents
            documents = retriever.invoke(question)
            print("\nSource documents:")
            pprint.pprint(documents)

         .. output:: 

            Question: What was MongoDB's latest acquisition?
            Answer: MongoDB's latest acquisition was Voyage AI, a pioneer in state-of-the-art embedding and reranking models.

            Source documents:
            [Document(id='67f0259b8bb2babc06924409', metadata={'_id': '67f0259b8bb2babc06924409', ... 'page_label': '9'}, page_content='SOURCE MongoDB, Inc.'),
             Document(id='67f0259b8bb2babc06924351', metadata={'_id': '67f0259b8bb2babc06924351', ... 'page_label': '2'}, page_content='Measures."\nFourth Quarter Fiscal 2025 and Recent Business Highlights\nMongoDB  acquired Voyage AI, a pioneer in state-of-the-art embedding and reranking models that power next-generation'),
             Document(id='67f0259b8bb2babc0692432f', metadata={'_id': '67f0259b8bb2babc0692432f', ... 'page_label': '1'}, page_content='MongoDB  platform. In fiscal year 2026 we expect to see stable consumption growth in Atlas, our main growth driver," said Dev Ittycheria, President\nand Chief Executive Officer of MongoDB .'),
             Document(id='67f0259b8bb2babc06924355', metadata={'_id': '67f0259b8bb2babc06924355', ... 'page_label': '2'}, page_content='conjunction with the acquisition of Voyage, MongoDB  is announcing a stock buyback program of $200 million, to offset the\ndilutive impact of the acquisition consideration.'),
             Document(id='67f0259b8bb2babc069243a6', metadata={'_id': '67f0259b8bb2babc069243a6', ... 'page_label': '4'}, page_content="MongoDB's unified, intelligent data platform was built to power the next generation of applications, and MongoDB  is the most widely available, globally"),
             Document(id='67f0259b8bb2babc06924329', metadata={'_id': '67f0259b8bb2babc06924329', ... 'page_label': '1'}, page_content='MongoDB, Inc. Announces Fourth Quarter and Full Year Fiscal 2025 Financial Results\nMarch 5, 2025\nFourth Quarter Fiscal 2025 Total Revenue of $548.4 million, up 20% Year-over-Year'),
             Document(id='67f0259b8bb2babc069243a7', metadata={'_id': '67f0259b8bb2babc069243a7', ... 'page_label': '4'}, page_content='distributed database on the market. With integrated capabilities for operational data, search, real-time analytics, and AI-powered retrieval, MongoDB'),
             Document(id='67f0259b8bb2babc069243a5', metadata={'_id': '67f0259b8bb2babc069243a5', ... 'page_label': '4'}, page_content="Headquartered in New York, MongoDB's mission is to empower innovators to create, transform, and disrupt industries with software and data."),
             Document(id='67f0259b8bb2babc06924354', metadata={'_id': '67f0259b8bb2babc06924354', ... 'page_label': '2'}, page_content='data.\nMongoDB  completed the redemption of 2026 Convertible Notes, eliminating all debt from the balance sheet. Additionally, in'),
             Document(id='67f0259b8bb2babc069243a9', metadata={'_id': '67f0259b8bb2babc069243a9', ... 'page_label': '4'}, page_content='50,000 customers across almost every industry—including 70% of the Fortune 100—rely on MongoDB  for their most important applications. To learn\nmore, visit mongodb.com .\nInvestor Relations')]
             
   .. tab:: RAG with Filtering
      :tabid: langchain-rag-filtering

      This example does the following:

      - Instantiates {+avs+} as a `retriever 
        <https://python.langchain.com/docs/how_to/#retrievers/>`__
        to query for similar documents, including the following optional parameters:
         
        - ``k`` to search for only the ``10`` most relevant documents.
        - ``score_threshold`` to use only documents with a relevance score above ``0.75``.

          .. note::

             This parameter refers to a relevance score that Langchain uses
             to normalize your results, and not the :ref:`relevance score <scoring-ref>`
             used in |fts| queries. To use |fts| scores in your |rag| implementation,
             define a custom retriever that uses the ``similarity_search_with_score`` method 
             and filters by the |fts| score.
           
        - ``pre_filter`` to filter on the ``page_label`` field for documents that appear on page 2 only.

      .. include:: /includes/ai-integrations/langchain/langchain-perform-qa-description.rst
      
      ..
         NOTE: If you edit this Python code, also update the Jupyter Notebook
         at https://github.com/mongodb/docs-notebooks/blob/main/ai-integrations/langchain.ipynb

      .. io-code-block:: 
         :copyable: true 

         .. input:: 
            :language: python

            # Instantiate Atlas Vector Search as a retriever
            retriever = vector_store.as_retriever(
               search_type = "similarity",
               search_kwargs = {
                  "k": 10,
                  "score_threshold": 0.75,
                  "pre_filter": { "page_label": { "$eq": 2 } }
               }
            )

            # Define a prompt template
            template = """
               Use the following pieces of context to answer the question at the end.
               {context}
               Question: {question}
            """
            prompt = PromptTemplate.from_template(template)
            model = ChatOpenAI(model="gpt-4o")

            # Construct a chain to answer questions on your data
            chain = (
               { "context": retriever, "question": RunnablePassthrough()}
               | prompt   
               | model
               | StrOutputParser()
            )

            # Prompt the chain
            question = "What was MongoDB's latest acquisition?"

            answer = rag_chain.invoke(question)

            print("Question: " + question)
            print("Answer: " + answer)

            # Return source documents
            documents = retriever.invoke(question)
            print("\nSource documents:")
            pprint.pprint(documents)

         .. output:: 

            Question: What was MongoDB's latest acquisition?
            Answer: MongoDB's latest acquisition was Voyage AI, a pioneer in state-of-the-art embedding and reranking models.

            Source documents:
            [Document(id='67f0259b8bb2babc06924351', metadata={'_id': '67f0259b8bb2babc06924351', ... 'page_label': '2'}, page_content='Measures."\nFourth Quarter Fiscal 2025 and Recent Business Highlights\nMongoDB  acquired Voyage AI, a pioneer in state-of-the-art embedding and reranking models that power next-generation'),
             Document(id='67f0259b8bb2babc06924355', metadata={'_id': '67f0259b8bb2babc06924355', ... 'page_label': '2'}, page_content='conjunction with the acquisition of Voyage, MongoDB  is announcing a stock buyback program of $200 million, to offset the\ndilutive impact of the acquisition consideration.'),
             Document(id='67f0259b8bb2babc06924354', metadata={'_id': '67f0259b8bb2babc06924354', ... 'page_label': '2'}, page_content='data.\nMongoDB  completed the redemption of 2026 Convertible Notes, eliminating all debt from the balance sheet. Additionally, in'),
             Document(id='67f0259b8bb2babc06924358', metadata={'_id': '67f0259b8bb2babc06924358', ... 'page_label': '2'}, page_content='Lombard Odier, a Swiss private bank, partnered with MongoDB  to migrate and modernize its legacy banking technology'),
             Document(id='67f0259b8bb2babc06924352', metadata={'_id': '67f0259b8bb2babc06924352', ... 'page_label': '2'}, page_content="AI applications. Integrating Voyage AI's technology with MongoDB  will enable organizations to easily build trustworthy,"),
             Document(id='67f0259b8bb2babc0692435a', metadata={'_id': '67f0259b8bb2babc0692435a', ... 'page_label': '2'}, page_content='applications from a legacy relational database to MongoDB  20 times faster than previous migrations.\nFirst Quarter and Full Year Fiscal 2026 Guidance'),
             Document(id='67f0259b8bb2babc06924356', metadata={'_id': '67f0259b8bb2babc06924356', ... 'page_label': '2'}, page_content='For the third consecutive year, MongoDB  was named a Leader in the 2024 Gartner® Magic Quadrant™ for Cloud'),
             Document(id='67f0259b8bb2babc0692434d', metadata={'_id': '67f0259b8bb2babc0692434d', ... 'page_label': '2'}, page_content='compared to $121.5 million of cash from operations in the year-ago period. MongoDB  used $29.6 million of cash in capital'),
             Document(id='67f0259b8bb2babc0692434c', metadata={'_id': '67f0259b8bb2babc0692434c', ... 'page_label': '2'}, page_content='Cash Flow: During the year ended January 31, 2025, MongoDB  generated $150.2 million of cash from operations,'),
             Document(id='67f0259b8bb2babc06924364', metadata={'_id': '67f0259b8bb2babc06924364', ... 'page_label': '2'}, page_content='MongoDB  will host a conference call today, March 5, 2025, at 5:00 p.m. (Eastern Time) to discuss its financial results and business outlook. A live')]