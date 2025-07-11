.. tabs::

   .. tab:: Basic Semantic Search
      :tabid: semantic-search

      This example performs a basic semantic search for the
      string ``MongoDB Atlas security`` and returns a 
      list of documents ranked by :ref:`relevance score <scoring-ref>`. 
      It also specifies the following:

      - {+avs+} as a `retriever 
        <https://docs.llamaindex.ai/en/stable/module_guides/querying/retriever/>`__
        to perform semantic search.
      - The  ``similarity_top_k`` parameter to return 
        only the three most relevant documents.

      ..
         NOTE: If you edit this Python code, also update the Jupyter Notebook
         at https://github.com/mongodb/docs-notebooks/blob/main/ai-integrations/llamaindex.ipynb

      .. io-code-block:: 
         :copyable: true 

         .. input:: 
            :language: python

            retriever = vector_store_index.as_retriever(similarity_top_k=3)
            nodes = retriever.retrieve("MongoDB acquisition")  

            for node in nodes:
                print(node)
         
         .. output:: 
            :language: JSON

            Node ID: 479446ef-8a32-410d-a5e0-8650bd10d78d
            Text: MongoDB  completed the redemption of 2026 Convertible Notes,
            eliminating all debt from the balance sheet. Additionally, in
            conjunction with the acquisition of Voyage, MongoDB  is announcing a
            stock buyback program of $200 million, to offset the dilutive impact
            of the acquisition consideration.
            Score:  0.914

            Node ID: 453137d9-8902-4fae-8d81-5f5d9b0836eb
            Text: "Looking ahead, we remain incredibly excited about our long-term
            growth opportunity. MongoDB  removes the constraints of legacy
            databases, enabling businesses to innovate at AI speed with our
            flexible document model and seamless scalability. Following the Voyage
            AI acquisition, we combine real-time data, sophisticated embedding and
            retrieval mod...
            Score:  0.914

            Node ID: f3c35db6-43e5-4da7-a297-d9b009b9d300
            Text: Lombard Odier, a Swiss private bank, partnered with MongoDB  to
            migrate and modernize its legacy banking technology systems on MongoDB
            with generative AI. The initiative enabled the bank to migrate code
            50-60 times quicker and move applications from a legacy relational
            database to MongoDB  20 times faster than previous migrations.
            Score:  0.912


   .. tab:: Semantic Search with Filtering
      :tabid: semantic-search-filter

      You can pre-filter your data by using an
      :abbr:`MQL (MongoDB Query Language)` match expression
      that compares the indexed field with another value in 
      your collection. You must index any metadata fields that you want to 
      filter by as the ``filter`` type. To learn more, see 
      :ref:`avs-types-vector-search`.

      .. note:: 

         You specified the ``metadata.page_label`` field as a filter 
         when you created the index for this tutorial.

      This example performs a semantic search for the
      string ``MongoDB Atlas security`` and returns a 
      list of documents ranked by :ref:`relevance score <scoring-ref>`. 
      It also specifies the following:

      - {+avs+} as a `retriever 
        <https://docs.llamaindex.ai/en/stable/module_guides/querying/retriever/>`__
        to perform semantic search.
      - The  ``similarity_top_k`` parameter to return 
        only the three most relevant documents.
      - A filter on the ``metadata.page_label`` field 
        so that {+avs+} searches for documents appearing on page two only.

      ..
         NOTE: If you edit this Python code, also update the Jupyter Notebook
         at https://github.com/mongodb/docs-notebooks/blob/main/ai-integrations/llamaindex.ipynb

      .. io-code-block:: 
         :copyable: true 
         
         .. input:: 
            :language: python

            # Specify metadata filters
            metadata_filters = MetadataFilters(
               filters=[ExactMatchFilter(key="metadata.page_label", value="2")]
            )
            retriever = vector_store_index.as_retriever(similarity_top_k=3, filters=metadata_filters)
            nodes = retriever.retrieve("MongoDB acquisition")

            for node in nodes:
                print(node)

         .. output:: 
            :language: JSON

            Node ID: 479446ef-8a32-410d-a5e0-8650bd10d78d
            Text: MongoDB  completed the redemption of 2026 Convertible Notes,
            eliminating all debt from the balance sheet. Additionally, in
            conjunction with the acquisition of Voyage, MongoDB  is announcing a
            stock buyback program of $200 million, to offset the dilutive impact
            of the acquisition consideration.
            Score:  0.914

            Node ID: f3c35db6-43e5-4da7-a297-d9b009b9d300
            Text: Lombard Odier, a Swiss private bank, partnered with MongoDB  to
            migrate and modernize its legacy banking technology systems on MongoDB
            with generative AI. The initiative enabled the bank to migrate code
            50-60 times quicker and move applications from a legacy relational
            database to MongoDB  20 times faster than previous migrations.
            Score:  0.912

            Node ID: 82a2a0c0-80b9-4a9e-a848-529b4ff8f301
            Text: Fourth Quarter Fiscal 2025 and Recent Business Highlights
            MongoDB  acquired Voyage AI, a pioneer in state-of-the-art embedding
            and reranking models that power next-generation AI applications.
            Integrating Voyage AI's technology with MongoDB  will enable
            organizations to easily build trustworthy, AI-powered applications by
            offering highly accurate...
            Score:  0.911




