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
            model = ChatOpenAI()

            # Construct a chain to answer questions on your data
            chain = (
               { "context": retriever, "question": RunnablePassthrough()}
               | prompt   
               | model
               | StrOutputParser()
            )

            # Prompt the chain
            question = "How can I secure my MongoDB Atlas cluster?"
            answer = chain.invoke(question)

            print("Question: " + question)
            print("Answer: " + answer)

            # Return source documents
            documents = retriever.invoke(question)
            print("\nSource documents:")
            pprint.pprint(documents)

         .. output:: 

            Question: How can I secure my MongoDB Atlas cluster?
            Answer: To secure your MongoDB Atlas cluster, you can enable 
            authentication and IP address whitelisting, review the security section 
            in the MongoDB Atlas dashboard, encrypt data at rest with encrypted storage 
            volumes, optionally configure an additional layer of encryption on your 
            data, set up global clusters on Amazon Web Services, Microsoft Azure, 
            and Google Cloud Platform, and ensure operational continuity by choosing 
            appropriate instance size, storage size, and storage speed options. 
            Additionally, consider setting up a larger number of replica nodes for 
            increased protection against database downtime.

            Source documents:
            [Document(page_content='To ensure a secure system right out of the b ox,\nauthentication and I P Address whitelisting are\nautomatically enabled.\nReview the security section of the MongoD B Atlas', metadata={'_id': ObjectId('65fb4f056979cf7cbbfe0436'), 'source': 'https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE4HkJP', 'page': 17}),
            Document(page_content='MongoD B Atlas team are also monitoring the underlying\ninfrastructure, ensuring that it is always in a healthy state.\nApplication L ogs And Database L ogs', metadata={'_id': ObjectId('65fb4f056979cf7cbbfe0401'), 'source': 'https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE4HkJP', 'page': 15}),
            Document(page_content='All the user needs to do in order for MongoD B Atlas to\nautomatically deploy the cluster is to select a handful of\noptions:\n•Instance size\n•Storage size (optional)\n•Storage speed (optional)', metadata={'_id': ObjectId('65fb4f046979cf7cbbfe03ef'), 'source': 'https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE4HkJP', 'page': 14}),
            Document(page_content='MongoD B.\nMongoD B Atlas incorporates best practices to help keep\nmanaged databases healthy and optimized. T hey ensure\noperational continuity by converting comple x manual tasks', metadata={'_id': ObjectId('65fb4f046979cf7cbbfe03e4'), 'source': 'https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE4HkJP', 'page': 13}),
            Document(page_content='You can set up global clusters — available on Amazon W eb\nServices, Microsoft Azure, and Google Cloud Platform —\nwith just a f ew clic ks in the MongoD B Atlas U I. MongoD B', metadata={'_id': ObjectId('65fb4f046979cf7cbbfe03bb'), 'source': 'https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE4HkJP', 'page': 12}),
            Document(page_content='Table of Contents\n1 Introduction\n2 Preparing for a MongoD B Deployment\n9 Scaling a MongoD B Atlas Cluster\n11 Continuous A vailability & Data Consistency\n12 Managing MongoD B\n16 Security', metadata={'_id': ObjectId('65fb4f026979cf7cbbfe02d6'), 'source': 'https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE4HkJP', 'page': 1}),
            Document(page_content='Atlas provides encryption of data at rest with encrypted\nstorage volumes.\nOptionally , Atlas users can configure an additional layer of\nencryption on their data at rest using the MongoD B', metadata={'_id': ObjectId('65fb4f056979cf7cbbfe0444'), 'source': 'https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE4HkJP', 'page': 18}),
            Document(page_content='Disaster Recovery\nCreated by the engineers who develop the database,\nMongoD B Atlas is the simplest way to run MongoD B,\nmaking it easy to deploy , monitor , backup, and scale\nMongoD B.', metadata={'_id': ObjectId('65fb4f046979cf7cbbfe03e3'), 'source': 'https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE4HkJP', 'page': 13}),
            Document(page_content='Security\nAs with all software, MongoD B administrators must\nconsider security and risk e xposure for a MongoD B\ndeployment. T here are no magic solutions for risk', metadata={'_id': ObjectId('65fb4f056979cf7cbbfe0431'), 'source': 'https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE4HkJP', 'page': 17}),
            Document(page_content='A larger number of replica nodes provides increased\nprotection against database downtime in case of multiple\nmachine failures.\nMongoD B Atlas replica sets have a minimum of 3 nodes', metadata={'_id': ObjectId('65fb4f046979cf7cbbfe03ca'), 'source': 'https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE4HkJP', 'page': 12})]
                  
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
           
        - ``pre_filter`` to filter on the ``page`` field for documents that appear on page 17 only.

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
                  "pre_filter": { "page": { "$eq": 17 } }
               }
            )

            # Define a prompt template
            template = """
               Use the following pieces of context to answer the question at the end.
               {context}
               Question: {question}
            """
            prompt = PromptTemplate.from_template(template)
            model = ChatOpenAI()

            # Construct a chain to answer questions on your data
            chain = (
               { "context": retriever, "question": RunnablePassthrough()}
               | prompt   
               | model
               | StrOutputParser()
            )

            # Prompt the chain
            question = "How can I secure my MongoDB Atlas cluster?"
            answer = rag_chain.invoke(question)

            print("Question: " + question)
            print("Answer: " + answer)

            # Return source documents
            documents = retriever.invoke(question)
            print("\nSource documents:")
            pprint.pprint(documents)

         .. output:: 

            Question: How can I secure my MongoDB Atlas cluster?
            Answer: To secure your MongoDB Atlas cluster, you can enable 
            authentication and IP Address whitelisting, define permissions
            for users and applications, use VPC Peering for secure connectivity, 
            implement a Defense in Depth approach for securing deployments, and 
            consider using LDAP integration for centralized authorization
            management. It is important to regularly review the security section 
            of MongoDB Atlas and continuously monitor and update security measures 
            to mitigate risk and maintain a secure deployment.

            Source documents:
            [Document(page_content='To ensure a secure system right out of the b ox,\nauthentication and I P Address whitelisting are\nautomatically enabled.\nReview the security section of the MongoD B Atlas', metadata={'_id': ObjectId('65fb4f056979cf7cbbfe0436'), 'source': 'https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE4HkJP', 'page': 17}),
            Document(page_content='Security\nAs with all software, MongoD B administrators must\nconsider security and risk e xposure for a MongoD B\ndeployment. T here are no magic solutions for risk', metadata={'_id': ObjectId('65fb4f056979cf7cbbfe0431'), 'source': 'https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE4HkJP', 'page': 17}),
            Document(page_content='number of diff erent methods for managing risk and\nreducing risk e xposure.\nMongoD B Atlas f eatures e xtensive capabilities to def end,\ndetect, and control access to MongoD B, off ering among', metadata={'_id': ObjectId('65fb4f056979cf7cbbfe0433'), 'source': 'https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE4HkJP', 'page': 17}),
            Document(page_content='permissions for a user or application, and what data it can\naccess when querying MongoD B. MongoD B Atlas provides\nthe ability to provision users with roles specific to a', metadata={'_id': ObjectId('65fb4f056979cf7cbbfe043b'), 'source': 'https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE4HkJP', 'page': 17}),
            Document(page_content='connectivity without using public I P addresses, and without\nneeding to whitelist every client in your MongoD B Atlas\ngroup.\nAuthorization\nMongoD B Atlas allows administrators to define', metadata={'_id': ObjectId('65fb4f056979cf7cbbfe043a'), 'source': 'https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE4HkJP', 'page': 17}),
            Document(page_content='mitigation, and maintaining a secure MongoD B deployment\nis an ongoing process.\nDefense in Depth\nA Def ense in Depth approac h is recommended for\nsecuring MongoD B deployments, and it addresses a', metadata={'_id': ObjectId('65fb4f056979cf7cbbfe0432'), 'source': 'https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE4HkJP', 'page': 17}),
            Document(page_content='optimization.\nIn addition, MongoD B Atlas provides pac kaged integration\nwith the New Relic platform. K ey metrics from MongoD B\nAtlas are accessible to the AP M for visualization, enabling', metadata={'_id': ObjectId('65fb4f056979cf7cbbfe042e'), 'source': 'https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE4HkJP', 'page': 17}),
            Document(page_content='their I P address (or a C IDR covering their I P address) has\nbeen added to the IP whitelist for your MongoD B Atlas\ngroup.\nVPC P eering\nVirtual P rivate Cloud (VPC) P eering allows users to create', metadata={'_id': ObjectId('65fb4f056979cf7cbbfe0438'), 'source': 'https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE4HkJP', 'page': 17}),
            Document(page_content='dedicated A tlas clusters using credentials that are verified\nby a centralized L DAP server . Authorization management is\nsimplified by allowing control at the L DAP group level.', metadata={'_id': ObjectId('65fb4f056979cf7cbbfe043d'), 'source': 'https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE4HkJP', 'page': 17}),
            Document(page_content='database, making it possible to realize a separation of\nduties between diff erent entities accessing and managing\nthe data.\nAtlas supports L DAP integration, allowing users to login to', metadata={'_id': ObjectId('65fb4f056979cf7cbbfe043c'), 'source': 'https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE4HkJP', 'page': 17})]