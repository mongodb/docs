- Defines a LangChain `prompt template 
  <https://python.langchain.com/docs/modules/model_io/prompts/quick_start#prompttemplate>`__
  to instruct the |llm| to use 
  these documents as context for your query.
  LangChain passes these documents to the ``{context}`` input
  variable and your query to the ``{question}`` variable.

- Constructs a `chain 
  <https://python.langchain.com/docs/modules/chains>`__
  that specifies the following:

  - {+avs+} as the retriever to search for documents 
    that are used as context by the |llm|.
    
  - The prompt template that you constructed.

  - OpenAI's chat model as the |llm| used to generate a 
    context-aware response.

- Prompts the chain with a sample query about |service| security 
  recommendations.

- Returns the |llm|'s response and the documents used as context. 
  The generated response might vary.
  