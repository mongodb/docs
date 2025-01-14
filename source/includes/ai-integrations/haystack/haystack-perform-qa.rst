The following code defines and runs a 
`pipeline <https://docs.haystack.deepset.ai/docs/pipelines>`__
with the follow components:

- The `OpenAITextEmbedder <https://docs.haystack.deepset.ai/docs/openaitextembedder>`__
  `embedder <https://docs.haystack.deepset.ai/docs/embedders>`__ 
  to create embeddings from your query.
- The `MongoDBAtlasEmbeddingRetriever <https://docs.haystack.deepset.ai/docs/mongodbatlasembeddingretriever>`__
  `retriever <https://docs.haystack.deepset.ai/docs/retrievers>`__
  to retrieve embeddings from your document store
  that are similar to the query embedding.
- A `PromptBuilder <https://docs.haystack.deepset.ai/docs/promptbuilder>`__ that passes
  a prompt template to instruct the |llm| to use the retrieved document as context for your prompt. 
- The `OpenAIGenerator <https://docs.haystack.deepset.ai/docs/openaigenerator>`__
  `generator <https://docs.haystack.deepset.ai/docs/generators>`__
  to generate a context-aware response using an |llm| from OpenAI.

In this example, you prompt the |llm| with the sample query 
``Where does Mark live?``. The |llm| generates an accurate,
context-aware response from the custom data you stored 
in |service|.

..
   NOTE: If you edit this Python code, also update the Jupyter Notebook
   at https://github.com/mongodb/docs-notebooks/blob/main/integrations/haystack.ipynb

.. io-code-block:: 
    :copyable: true 

    .. input:: 
       :language: python

       # Template for generating prompts for a movie recommendation engine.
       prompt_template = """
           You are an assistant allowed to use the following context documents.\nDocuments:
           {% for doc in documents %}
               {{ doc.content }}
           {% endfor %}

           \nQuery: {{query}}
           \nAnswer:
       """

       # Setting up a retrieval-augmented generation (RAG) pipeline for generating responses.
       rag_pipeline = Pipeline()
       rag_pipeline.add_component("text_embedder", OpenAITextEmbedder())

       # Adding a component for retrieving related documents from MongoDB based on the query embedding.
       rag_pipeline.add_component(instance=MongoDBAtlasEmbeddingRetriever(document_store=document_store,top_k=15), name="retriever")

       # Building prompts based on retrieved documents to be used for generating responses.
       rag_pipeline.add_component(instance=PromptBuilder(template=prompt_template), name="prompt_builder")

       # Adding a language model generator to produce the final text output.
       rag_pipeline.add_component(instance=OpenAIGenerator(), name="llm")

       # Connecting the components of the RAG pipeline to ensure proper data flow.
       rag_pipeline.connect("text_embedder.embedding", "retriever.query_embedding")
       rag_pipeline.connect("retriever", "prompt_builder.documents")
       rag_pipeline.connect("prompt_builder", "llm")

       # Run the pipeline
       query = "Where does Mark live?"
       result = rag_pipeline.run(
         {
             "text_embedder": {"text": query},
             "prompt_builder": {"query": query},
         });
       print(result['llm']['replies'][0])

    .. output:: 

       Mark lives in Berlin.
