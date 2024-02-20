.. expression:: Large Language Models (LLMs)

   You can integrate {+avs+}  with |llm|\s and |llm|
   frameworks to build AI-powered applications. 
   When developing with |llm|\s, you might encounter 
   the following limitations:

   - Stale data: |llm|\s are trained on a static dataset up to a 
     certain point in time.

   - No access to local data: |llm|\s don't have access to 
     local or personal data.

   - Hallucinations: |llm|\s sometimes generate inaccurate information.

.. expression:: Retrieval-Augmented Generation (RAG)

   Retrieval-Augmented Generation (RAG) is an architecture for |llm|
   applications that's designed to address these limitations. In |rag|, 
   you perform the following actions:
   
   1. Store your custom data in an external vector database as 
      vector embeddings.

   #. Use vector search to retrieve semantically similar documents 
      from the vector database. These documents augment the existing 
      training data that |llm|\s have access to. 
   
   #. Prompt the |llm|. The |llm| uses these documents as context to 
      generate a more informed and accurate response.
   
   To learn more, see :website:`What is retrieval-augmented generation (RAG)?
   </basics/retrieval-augmented-generation>`.
