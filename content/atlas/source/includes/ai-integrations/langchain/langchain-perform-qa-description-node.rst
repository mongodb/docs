- Defines a LangChain `prompt template 
  <https://js.langchain.com/docs/concepts#prompt-templates>`__
  to instruct the LLM to use 
  these documents as context for your query.
  LangChain passes these documents to the ``{context}`` input
  variable and your query to the ``{question}`` variable.

- Constructs a `chain 
  <https://js.langchain.com/docs/concepts#langchain-expression-language>`__
  that uses OpenAI's chat model
  to generate context-aware responses based on
  your prompt.

- Prompts the chain with a sample query about |service| security 
  recommendations.

- Returns the |llm|'s response and the documents used as context.
