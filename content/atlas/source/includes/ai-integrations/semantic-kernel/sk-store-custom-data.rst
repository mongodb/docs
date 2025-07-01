.. procedure::
   :style: normal

   .. step:: Initialize the kernel. 
    
      Run the following code to initialize the kernel.

      ..
         NOTE: If you edit this Python code, also update the Jupyter Notebook
         at https://github.com/mongodb/docs-notebooks/blob/main/ai-integrations/semantic-kernel.ipynb

      .. code-block:: python

         kernel = sk.Kernel()

   .. step:: Add the AI services to the kernel.

      Run the following code to configure the OpenAI embedding model and 
      chat model used in this tutorial and add these services to the kernel. 
      This code specifies the following:

      - OpenAI's ``text-embedding-ada-002`` as the embedding model used to convert text into 
        vector embeddings.      
      - OpenAI's ``gpt-3.5-turbo`` as the chat model used to generate responses.

      ..
         NOTE: If you edit this Python code, also update the Jupyter Notebook
         at https://github.com/mongodb/docs-notebooks/blob/main/ai-integrations/semantic-kernel.ipynb

      .. code-block:: python

         chat_service = OpenAIChatCompletion(
            service_id="chat", 
            ai_model_id="gpt-3.5-turbo", 
            api_key=OPENAI_API_KEY
         )
         embedding_service = OpenAITextEmbedding(
            ai_model_id="text-embedding-ada-002", 
            api_key=OPENAI_API_KEY
         )
         kernel.add_service(chat_service)
         kernel.add_service(embedding_service)

   .. step:: Instantiate |service| as a memory store.

      Run the following code to instantiate |service| as a memory store and 
      add it to the kernel. This code establishes a connection to your 
      |service| {+cluster+} and specifies the following:
      
      - ``semantic_kernel_db`` as the |service| database used to store the documents.
      - ``vector_index`` as the index used to run semantic search queries.

      It also imports a `plugin <https://learn.microsoft.com/en-us/semantic-kernel/agents/plugins/>`__
      called ``TextMemoryPlugin``, which provides a group of native functions 
      to help you store and retrieve text in memory.

      ..
         NOTE: If you edit this Python code, also update the Jupyter Notebook
         at https://github.com/mongodb/docs-notebooks/blob/main/ai-integrations/semantic-kernel.ipynb

      .. code-block:: python

         mongodb_atlas_memory_store = MongoDBAtlasMemoryStore(
            connection_string=ATLAS_CONNECTION_STRING, 
            database_name="semantic_kernel_db", 
            index_name="vector_index"
         )

         memory = SemanticTextMemory(
            storage=mongodb_atlas_memory_store, 
            embeddings_generator=embedding_service
         )
         kernel.add_plugin(TextMemoryPlugin(memory), "TextMemoryPlugin")

   .. step:: Load sample data on your |service| {+cluster+}.

      This code defines and runs a function to populate the ``semantic_kernel_db.test``
      collection with some sample documents. These documents
      contain personalized data that the |llm| did not originally have access to.

      ..
         NOTE: If you edit this Python code, also update the Jupyter Notebook
         at https://github.com/mongodb/docs-notebooks/blob/main/ai-integrations/semantic-kernel.ipynb

      .. io-code-block:: 
         :copyable: true 

         .. input:: 
            :language: python
               
             async def populate_memory(kernel: sk.Kernel) -> None:
                await memory.save_information(
                   collection="test", id="1", text="I am a developer"
                )
                await memory.save_information(
                   collection="test", id="2", text="I started using MongoDB two years ago"
                )
                await memory.save_information(
                   collection="test", id="3", text="I'm using MongoDB Vector Search with Semantic Kernel to implement RAG"
                )
                await memory.save_information(
                   collection="test", id="4", text="I like coffee"
                )

             print("Populating memory...")
             await populate_memory(kernel)
             print(kernel)

         .. output::

            Populating memory...
            plugins=KernelPluginCollection(plugins={'TextMemoryPlugin': KernelPlugin(name='TextMemoryPlugin', description=None, functions={'recall': KernelFunctionFromMethod(metadata=KernelFunctionMetadata(name='recall', plugin_name='TextMemoryPlugin', description='Recall a fact from the long term memory', parameters=[KernelParameterMetadata(name='ask', description='The information to retrieve', default_value=None, type_='str', is_required=True, type_object=<class 'str'>), KernelParameterMetadata(name='collection', description='The collection to search for information.', default_value='generic', type_='str', is_required=False, type_object=<class 'str'>), KernelParameterMetadata(name='relevance', description='The relevance score, from 0.0 to 1.0; 1.0 means perfect match', default_value=0.75, type_='float', is_required=False, type_object=<class 'float'>), KernelParameterMetadata(name='limit', description='The maximum number of relevant memories to recall.', default_value=1, type_='int', is_required=False, type_object=<class 'int'>)], is_prompt=False, is_asynchronous=True, return_parameter=KernelParameterMetadata(name='return', description='', default_value=None, type_='str', is_required=True, type_object=None)), method=<bound method TextMemoryPlugin.recall of TextMemoryPlugin(memory=SemanticTextMemory())>, stream_method=None), 'save': KernelFunctionFromMethod(metadata=KernelFunctionMetadata(name='save', plugin_name='TextMemoryPlugin', description='Save information to semantic memory', parameters=[KernelParameterMetadata(name='text', description='The information to save.', default_value=None, type_='str', is_required=True, type_object=<class 'str'>), KernelParameterMetadata(name='key', description='The unique key to associate with the information.', default_value=None, type_='str', is_required=True, type_object=<class 'str'>), KernelParameterMetadata(name='collection', description='The collection to save the information.', default_value='generic', type_='str', is_required=False, type_object=<class 'str'>)], is_prompt=False, is_asynchronous=True, return_parameter=KernelParameterMetadata(name='return', description='', default_value=None, type_='', is_required=True, type_object=None)), method=<bound method TextMemoryPlugin.save of TextMemoryPlugin(memory=SemanticTextMemory())>, stream_method=None)})}) services={'chat': OpenAIChatCompletion(ai_model_id='gpt-3.5-turbo', service_id='chat', client=<openai.AsyncOpenAI object at 0x7999971c8fa0>, ai_model_type=<OpenAIModelTypes.CHAT: 'chat'>, prompt_tokens=0, completion_tokens=0, total_tokens=0), 'text-embedding-ada-002': OpenAITextEmbedding(ai_model_id='text-embedding-ada-002', service_id='text-embedding-ada-002', client=<openai.AsyncOpenAI object at 0x7999971c8fd0>, ai_model_type=<OpenAIModelTypes.EMBEDDING: 'embedding'>, prompt_tokens=32, completion_tokens=0, total_tokens=32)} ai_service_selector=<semantic_kernel.services.ai_service_selector.AIServiceSelector object at 0x7999971cad70> retry_mechanism=PassThroughWithoutRetry() function_invoking_handlers={} function_invoked_handlers={}

      .. tip:: 

         After running the sample code, you can
         view your vector embeddings :ref:`in the {+atlas-ui+} <atlas-ui-view-collections>`
         by navigating to the ``semantic_kernel_db.test`` collection in your {+cluster+}.
