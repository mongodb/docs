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

      .. io-code-block:: 
         :copyable: true 

         .. input:: 
            :language: python

         .. output:: 
            :language: JSON

   .. tab:: Semantic Search with Filtering
      :tabid: semantic-search-filter

      You can also pre-filter your data by using a match expression
      that compares the indexed field with boolean, number, or 
      string values. You must index any metadata fields that you want to 
      filter by as the ``filter`` type. To learn more, see 
      :ref:`avs-types-vector-search`.

      .. note:: 

         You specified the ``metadata.page_label`` field as a filter 
         when you :ref:`created the index <llamaindex-create-index>`
         for this tutorial.

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
        so that {+avs+} searches for documents appearing on page 17 only.

      .. io-code-block:: 
         :copyable: true 
         
         .. input:: 
            :language: python

         .. output:: 
            :language: JSON

