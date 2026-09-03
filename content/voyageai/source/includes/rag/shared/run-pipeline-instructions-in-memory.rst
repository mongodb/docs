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
      MongoDB's latest AI announcements include the launch of several new Voyage AI models, such as voyage-context-3 and rerank-2.5. Additionally, MongoDB expanded its AI partner ecosystem with major providers, including LangChain, and added new members like Temporal and Galileo. These innovations aim to make it faster and easier for customers to build accurate, trustworthy, and reliable AI applications at scale.

The application retrieves relevant documents from the provided PDF
and generates an accurate response based on the context.