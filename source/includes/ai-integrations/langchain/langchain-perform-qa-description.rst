- Defines a LangChain `prompt template 
  <https://python.langchain.com/docs/how_to/#prompt-templates>`__
  to instruct the |llm| to use 
  these documents as context for your query.
  LangChain passes these documents to the ``{context}`` input
  variable and your query to the ``{question}`` variable.

- Constructs a `chain 
  <https://python.langchain.com/docs/concepts/#langchain-expression-language-lcel>`__
  that specifies the following:

  - {+avs+} as the retriever to search for documents 
    to use as context.
    
  - The prompt template that you defined.

  - The ``gpt-4o`` chat model from OpenAI to generate a 
    context-aware response.

- Invokes the chain with a sample query.

- Returns the |llm|'s response and the documents used as context. 
  The generated response might vary.
  