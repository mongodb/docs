.. procedure::
   :style: normal

   .. step:: Run a vector search query.

      To see the most relevant documents for a given query, paste and 
      run the following code to perform a sample vector search query on the
      collection. The retriever searches for relevant child documents 
      that are semantically similar to the string ``AI technology``, and then 
      returns the corresponding parent documents of the child documents.

      .. io-code-block::
         :copyable: true 

         .. input:: 
            :language: python
          
            parent_doc_retriever.invoke("AI technology")
            
         .. output::
            :visible: false

            [Document(metadata={'_id': '492a138c-1309-4791-a0d0-282d34ea1e55', 'source': 'https://investors.mongodb.com/node/12881/pdf', 'page': 1, 'page_label': '2'}, page_content='downturns and/or the effects of rising interest rates, inflation and volatility in the global economy and financial markets on our business and future\noperating results; our potential failure to meet publicly announced guidance or other expectations about our business and future operating results; our\nlimited operating history; our history of losses; failure of our platform to satisfy customer demands; the effects of increased competition; our\ninvestments in new products and our ability to introduce new features, services or enhancements; our ability to effectively expand our sales and\nmarketing organization; our ability to continue to build and maintain credibility with the developer community; our ability to add new customers or\nincrease sales to our existing customers; our ability to maintain, protect, enforce and enhance our intellectual property; the effects of social, ethical and\nregulatory issues relating to the use of new and evolving technologies, such as artificial intelligence, in our offerings or partnerships; the growth and\nexpansion of the market for database products and our ability to penetrate that market; our ability to integrate acquired businesses and technologies\nsuccessfully or achieve the expected benefits of such acquisitions; our ability to maintain the security of our software and adequately address privacy\nconcerns; our ability to manage our growth effectively and successfully recruit and retain additional highly-qualified personnel; and the price volatility of'),
             Document(metadata={'_id': 'a937204a-0e85-4827-ac63-124735529d51', 'source': 'https://investors.mongodb.com/node/12881/pdf', 'page': 1, 'page_label': '2'}, page_content='that it obtained the AWS Modernization Competency designation and launched a MongoDB University course focused on\nbuilding AI applications with MongoDB  and AWS. At Microsoft Ignite, MongoDB  announced new technology integrations for\nAI, data analytics, and automating database deployments across on-premises, cloud, and edge environments.\nLaunched in July 2024, the MongoDB AI Applications Program (MAAP) is designed to help companies unleash the power\nof their data and to take advantage of rapidly advancing AI technologies. We recently announced that Capgemini,\nConfluent, IBM, Unstructured, and QuantumBlack, AI by McKinsey have joined the MAAP ecosystem, offering customers\nadditional integration and solution options.\nExecutive Leadership Update\nMichael Gordon, MongoDB\'s Chief Operating Officer and Chief Financial Officer, will be stepping down at the end of the Company\'s fiscal year on\nJanuary 31, 2025, and afterwards will serve as an advisor to ensure a smooth transition. The Company has commenced an executive search process\nfor a new CFO and will evaluate internal and external candidates.\xa0 Serge Tanjga, MongoDB\'s Senior Vice President of Finance, will serve as interim\nCFO starting February 1st if a permanent successor has not been named by that date.\nDev Ittycheria commented, "On behalf of everyone at MongoDB , I want to thank Michael for everything he has done to contribute to our success in his\nnearly 10 years with the company.\xa0 In Michael\'s time here, MongoDB  had a successful IPO, has grown revenue nearly 50x and has successfully\nscaled the business model to generate meaningful operating leverage. Michael has also built out a world-class finance team that I am confident will\ndeliver a smooth transition to a new CFO in the coming months."\nMichael Gordon said, "I am incredibly proud of what we have accomplished as a team in my almost ten years with the company.\xa0 While we have')]

      To learn more about vector search query examples with LangChain,
      see :ref:`langchain-run-queries`.

   .. step:: Create and run a RAG pipeline.

      To create and run a RAG pipeline with the parent document retriever, 
      paste and run the following code. This code does the following:

      - Defines a LangChain `prompt template 
        <https://python.langchain.com/docs/how_to/#prompt-templates>`__
        to instruct the |llm| to use 
        the retrieved parent documents as context for your query.
        LangChain passes these documents to the ``{context}`` input
        variable and your query to the ``{query}`` variable.

      - Constructs a `chain 
        <https://python.langchain.com/docs/concepts/#langchain-expression-language-lcel>`__
        that specifies the following:

        - The parent document retriever you configured to 
          retrieve relevant parent documents.
          
        - The prompt template that you defined.

        - An |llm| from OpenAI to generate a 
          context-aware response. By default, this is the 
          ``gpt-3.5-turbo`` model.

      - Prompts the chain with a sample query and returns the response.
        The generated response might vary.

      .. io-code-block::
         :copyable: true 

         .. input:: /includes/ai-integrations/langchain/parent-document-rag.py
            :language: python
 
         .. output:: 

            1. MongoDB obtained the AWS Modernization Competency designation.
            2. MongoDB launched a MongoDB University course focused on building AI applications with MongoDB and AWS.
            3. MongoDB announced new technology integrations for AI, data analytics, and automating database deployments across various environments.
            4. MongoDB launched the MongoDB AI Applications Program (MAAP) to help companies harness the power of data and future AI technologies.
            5. Capgemini, Confluent, IBM, Unstructured, and QuantumBlack joined the MAAP ecosystem to offer customers additional integration and solution options.
