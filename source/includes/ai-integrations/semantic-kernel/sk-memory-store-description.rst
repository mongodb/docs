This code performs the following actions:

- Imports Semantic Kernel and all the required packages.

- Connects to your |service| {+cluster+} by retrieving your |srv| :manual:`connection string 
  </reference/connection-string/#find-your-mongodb-atlas-connection-string>` from the environment.

- Retrieves your OpenAI API key from the environment
  and creates an instance of OpenAI's ``text-embedding-ada-002`` embedding model.

- Initializes the Kernel then adds the following AI service to the Kernel:
   
  - OpenAI's ``gpt-3.5-turbo`` as the chat model used to generate responses for the :ref:`answer-questions` section.

- Instantiates |service| as a memory store and specifies the following parameters:

  - ``semantic_kernel_db.test`` as the collection to store the documents.
  - ``vector_index`` as the index to use for querying the memory store.

- Initializes a class called ``SemanticTextMemory``, which provides a group of native methods
  to help you store and retrieve text in memory.

- Populates the ``semantic_kernel_db.test`` collection with sample documents by calling the 
  ``PopulateMemoryAsync`` method. 
