.. step:: Run the application.

   Run the following command in your terminal. Your output will vary depending on the LLM used.

   .. io-code-block::

      .. input::
         :language: bash

         python quickstart.py

      .. output::
         :language: text

         Semantic search result: This quarter, our company is focused on building n...
         Similarity score: 0.6812

         Reranked results:
         1. Score: 0.8477 - This quarter, our company is focused on building n...
         2. Score: 0.2695 - Photosynthesis in plants converts light energy int...
         3. Score: 0.2490 - 20th-century innovations, from radios to smartphon...

         Question: What are my company's goals this quarter?
         Answer: Your company's goals this quarter are:

         1. **Building new products**
         2. **Increasing market share**
         3. **Cutting costs**
         
   By using semantic search and reranking, you provide the LLM with
   relevant context that it otherwise would not have access to.
   As a result, the LLM generates a more grounded response,
   correctly responding to the user query.

