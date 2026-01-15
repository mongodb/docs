Run the following command in your terminal:

.. io-code-block::
   :copyable: true

   .. input::
      :language: bash

      python rag.py

   .. output:: 
      :language: markdown

      Query: What are MongoDB's latest AI announcements?

      Response:
      MongoDB's latest AI announcements include:

      1. Launching new **Voyage AI models**, including *voyage-context-3* and *rerank-2.5*.
      2. Expanding partnerships with major AI providers such as **LangChain**.
      3. Adding new members to MongoDB's AI partner ecosystem, including **Temporal** and **Galileo**.

The application retrieves relevant documents from the provided PDF
and generates an accurate response based on the context.