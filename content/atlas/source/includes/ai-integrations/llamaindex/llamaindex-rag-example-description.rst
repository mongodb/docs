- Instantiates the ``RetrieverQueryEngine`` query engine to 
  answer questions on your data. When prompted, the query engine 
  performs the following actions:
  
  - Uses {+avs+} as a retriever to query for semantically similar documents 
    based on the prompt.
    
  - Calls the LLM that you specified when you set up your environment
    to generate a context-aware response based on the retrieved
    documents.
  
- Prompts the LLM with a sample query about |service| security 
  recommendations. 

- Returns the |llm|'s response and the documents used as context. 
  The generated response might vary.
