.. procedure::
   :style: normal

   .. step:: Instantiate |service| as a document store.

      Run the following code to instantiate |service| as a document store. 
      This code establishes a connection to your 
      |service| {+cluster+} and specifies the following:
      
      - ``haystack_db`` and ``test`` as the |service| database and collection
        used to store the documents.
      - ``vector_index`` as the index used to run semantic search queries.

      ..
         NOTE: If you edit this Python code, also update the Jupyter Notebook
         at https://github.com/mongodb/docs-notebooks/blob/main/integrations/haystack.ipynb

      .. code-block:: python

         document_store = MongoDBAtlasDocumentStore(
            database_name="haystack_db",
            collection_name="test",
            vector_search_index="vector_index",
         )

   .. step:: Load sample data on your |service| {+cluster+}.

      This code defines a few sample documents and runs a 
      `pipeline <https://docs.haystack.deepset.ai/docs/pipelines>`__ 
      with the following components:

      - An `embedder <https://docs.haystack.deepset.ai/docs/embedders>`__ from OpenAI to
        convert your document into vector embeddings.
      - A `document writer <https://docs.haystack.deepset.ai/docs/documentwriter>`__ to 
        populate your document store with the sample documents
        and their embeddings.

      ..
         NOTE: If you edit this Python code, also update the Jupyter Notebook
         at https://github.com/mongodb/docs-notebooks/blob/main/integrations/haystack.ipynb

      .. io-code-block:: 
         :copyable: true 

         .. input:: 
            :language: python
               
            # Create some example documents
            documents = [
               Document(content="My name is Jean and I live in Paris."),
               Document(content="My name is Mark and I live in Berlin."),
               Document(content="My name is Giorgio and I live in Rome."),
            ]

            # Initializing a document embedder to convert text content into vectorized form.
            doc_embedder = OpenAIDocumentEmbedder()

            # Setting up a document writer to handle the insertion of documents into the MongoDB collection.
            doc_writer = DocumentWriter(document_store=document_store, policy=DuplicatePolicy.SKIP)

            # Creating a pipeline for indexing documents. The pipeline includes embedding and writing documents.
            indexing_pipe = Pipeline()
            indexing_pipe.add_component(instance=doc_embedder, name="doc_embedder")
            indexing_pipe.add_component(instance=doc_writer, name="doc_writer")

            # Connecting the components of the pipeline for document flow.
            indexing_pipe.connect("doc_embedder.documents", "doc_writer.documents")

            # Running the pipeline with the list of documents to index them in MongoDB.
            indexing_pipe.run({"doc_embedder": {"documents": documents}})

         .. output::

            Calculating embeddings: 100%|██████████| 1/1 [00:00<00:00,  4.16it/s]
            {'doc_embedder': {'meta': {'model': 'text-embedding-ada-002',
               'usage': {'prompt_tokens': 32, 'total_tokens': 32}}},
             'doc_writer': {'documents_written': 3}}

      .. tip:: 

         After running the sample code, you can
         view your vector embeddings :ref:`in the {+atlas-ui+} <atlas-ui-view-collections>`
         by navigating to the ``haystack_db.test`` collection in your {+cluster+}.
