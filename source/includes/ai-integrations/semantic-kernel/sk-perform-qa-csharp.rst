This code performs the following actions:

- Imports the ``TextMemoryPlugin`` class's functions into the kernel's ``textMemory``. 

- Builds a prompt template that uses the ``recall`` function from the ``TextMemoryPlugin`` 
  class to perform a semantic search over the kernel's ``textMemory`` for the string ``When did I start using MongoDB?``.

- Creates a function named ``settings`` from the chat prompt using the kernel's ``CreateFunctionFromPrompt`` function.

- Calls the kernel's ``InvokeAsync`` function to generate a response from the chat model using the following parameters:

  - The ``settings`` function that configures the prompt template and ``OpenAIPromptExecutionSettings``.
  - The question ``When did I start using MongoDB?`` as the value for the ``{{$input}}`` variable in the prompt template.
  - ``semantic_kernel_db.test`` as the collection to retrieve information from.

- Prints the question and generated response.

.. code-block:: csharp
   :copyable: true 
   :linenos: 
   
    kernel.ImportPluginFromObject(new TextMemoryPlugin(textMemory));
    const string promptTemplate = @"
    Answer the following question based on the given context.
    Question: {{$input}}
    Context: {{recall 'When did I start using MongoDB?'}}
    ";

    // Create and Invoke function from the prompt template
    var settings = kernel.CreateFunctionFromPrompt(promptTemplate, new OpenAIPromptExecutionSettings());
    var ragResults = await kernel.InvokeAsync(settings, new()
    {
        [TextMemoryPlugin.InputParam] = "When did I start using MongoDB?",
        [TextMemoryPlugin.CollectionParam] = "test"
    });

    // Print RAG Search Results
    Console.WriteLine("Question: When did I start using MongoDB?");
    Console.WriteLine($"Answer: {ragResults.GetValue<string>()}");

Save the file, then run the following command to generate a response:

.. io-code-block::
   :copyable: true

   .. input:: 
      :language:  shell

      dotnet run

   .. output:: 

      Question: When did I start using MongoDB?
      Answer: You started using MongoDB two years ago.

.. tip:: 

      You can add your own data and replace the following parts of the code 
      to generate responses on a different question:

      - ``{{recall '<question>'}}`` ,
      - ``[TextMemory.InputParam] = "<question>"`` ,
      - ``Console.WriteLine("Question: <question>")`` .