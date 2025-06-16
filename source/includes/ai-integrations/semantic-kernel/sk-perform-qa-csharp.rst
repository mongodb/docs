This code performs the following actions:

- Creates a new kernel using OpenAI's ``gpt-4o`` as the chat model to generate responses.

- Creates a new text search instance using the vector store.

- Defines a question to ask the chat model and initializes the variable
  ``retrievedContext`` to hold context from the vector store.

- Performs a semantic search in the ``recordCollection`` for the question ``When did I
  start using MongoDB?`` and returns the most relevant search result.

- Builds a prompt template that instructs the AI model to answer the question based only
  on the retrieved context.

- Creates a function named ``ragFunction`` from the chat prompt using the kernel's
  ``CreateFunctionFromPrompt`` function.

- Prepares arguments for the RAG prompt by creating a new object to hold the question and context.

- Calls the kernel's ``InvokeAsync`` function to generate a response from the chat model using the following parameters:

  - The ``ragFunction`` that configures the prompt template.
  - The ``ragArguments`` that contains the question and context.

- Prints the question and generated response.

.. literalinclude:: /includes/ai-integrations/semantic-kernel/sk-perform-qa-code.cs
      :language: csharp
      :copyable:

Save the file, then run the following command to generate a response:

.. io-code-block::
   :copyable: true

   .. input:: 
      :language:  shell

      dotnet run

   .. output:: 

      Question: When did I start using MongoDB?
      Retrieved Context: I started using MongoDB two years ago
      Answer: Two years ago.

.. tip:: 

      You can add your own data and replace the following part of the code 
      to generate responses on a different question:

      - ``var userQuestion = "When did I start using MongoDB?"``