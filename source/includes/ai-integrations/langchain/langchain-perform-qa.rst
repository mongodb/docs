.. io-code-block:: 
   :copyable: true 

   .. input:: 
      :language: python

      # Instantiate Atlas Vector Search as a retriever
      qa_retriever = vector_search.as_retriever(
          search_type = "similarity",
          search_kwargs = {"k": 10, "score_threshold": 0.75}
      )

      # Define a basic question-answering prompt template
      prompt_template = """

      Use the following pieces of context to answer the question at the end.
      If you don't know the answer, just say that you don't know, don't try to make up an answer.

      {context}

      Question: {question}
      """
      PROMPT = PromptTemplate(
          template=prompt_template, input_variables=["context", "question"]
      )

      # Create the question-answering model
      qa = RetrievalQA.from_chain_type(
          llm=OpenAI(),
          retriever=qa_retriever,
          return_source_documents=True,
          chain_type="stuff",
          chain_type_kwargs={"prompt": PROMPT},
      )

      # Prompt the LLM
      query = "How can I secure my MongoDB Atlas cluster?"
      docs = qa({"query": query})

      print(docs["result"])
      print("\nSource documents: ")
      pprint.pprint(docs["source_documents"])

   .. output:: 

      Answer: You can secure your MongoDB Atlas cluster by enabling authentication
      and IP address whitelisting, regularly reviewing the security section of
      MongoDB Atlas, and utilizing global clusters for added protection.
      Additionally, you can configure encryption for data at rest and set up disaster
      recovery measures. It is also recommended to have a larger number of replica
      nodes in your cluster for increased protection against downtime.

      Source documents: 
      [Document(page_content='To ensure a secure system right out of the b ox,\nauthentication and I P Address whitelisting are\nautomatically enabled.\nReview the security section of the MongoD B Atlas', metadata={'_id': ObjectId('65c3e0042db09349e662f686'), 'source': 'https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE4HkJP', 'page': 17}),
       Document(page_content='MongoD B Atlas team are also monitoring the underlying\ninfrastructure, ensuring that it is always in a healthy state.\nApplication L ogs And Database L ogs', metadata={'_id': ObjectId('65c3e0042db09349e662f651'), 'source': 'https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE4HkJP', 'page': 15}),
       Document(page_content='All the user needs to do in order for MongoD B Atlas to\nautomatically deploy the cluster is to select a handful of\noptions:\n•Instance size\n•Storage size (optional)\n•Storage speed (optional)', metadata={'_id': ObjectId('65c3e0022db09349e662f63f'), 'source': 'https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE4HkJP', 'page': 14}),
       Document(page_content='MongoD B.\nMongoD B Atlas incorporates best practices to help keep\nmanaged databases healthy and optimized. T hey ensure\noperational continuity by converting comple x manual tasks', metadata={'_id': ObjectId('65c3e0022db09349e662f634'), 'source': 'https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE4HkJP', 'page': 13}),
       Document(page_content='You can set up global clusters — available on Amazon W eb\nServices, Microsoft Azure, and Google Cloud Platform —\nwith just a f ew clic ks in the MongoD B Atlas U I. MongoD B', metadata={'_id': ObjectId('65c3e0022db09349e662f60b'), 'source': 'https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE4HkJP', 'page': 12}),
       Document(page_content='Table of Contents\n1 Introduction\n2 Preparing for a MongoD B Deployment\n9 Scaling a MongoD B Atlas Cluster\n11 Continuous A vailability & Data Consistency\n12 Managing MongoD B\n16 Security', metadata={'_id': ObjectId('65c3dffc2db09349e662f526'), 'source': 'https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE4HkJP', 'page': 1}),
       Document(page_content='Atlas provides encryption of data at rest with encrypted\nstorage volumes.\nOptionally , Atlas users can configure an additional layer of\nencryption on their data at rest using the MongoD B', metadata={'_id': ObjectId('65c3e0042db09349e662f694'), 'source': 'https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE4HkJP', 'page': 18}),
       Document(page_content='Disaster Recovery\nCreated by the engineers who develop the database,\nMongoD B Atlas is the simplest way to run MongoD B,\nmaking it easy to deploy , monitor , backup, and scale\nMongoD B.', metadata={'_id': ObjectId('65c3e0022db09349e662f633'), 'source': 'https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE4HkJP', 'page': 13}),
       Document(page_content='Security\nAs with all software, MongoD B administrators must\nconsider security and risk e xposure for a MongoD B\ndeployment. T here are no magic solutions for risk', metadata={'_id': ObjectId('65c3e0042db09349e662f681'), 'source': 'https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE4HkJP', 'page': 17}),
       Document(page_content='A larger number of replica nodes provides increased\nprotection against database downtime in case of multiple\nmachine failures.\nMongoD B Atlas replica sets have a minimum of 3 nodes', metadata={'_id': ObjectId('65c3e0022db09349e662f61a'), 'source': 'https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE4HkJP', 'page': 12})]