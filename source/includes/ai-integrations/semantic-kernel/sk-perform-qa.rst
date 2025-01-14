The following code defines a `prompt 
<https://learn.microsoft.com/en-us/semantic-kernel/prompts/your-first-prompt>`__
to instruct the |llm| to use the retrieved document as context for your query. 
In this example, you prompt the |llm| with the sample query 
``When did I start using MongoDB?``. Because you augmented
the knowledge base of the |llm| with custom data,
the chat model is able to generate a more accurate, 
context-aware response.

..
   NOTE: If you edit this Python code, also update the Jupyter Notebook
   at https://github.com/mongodb/docs-notebooks/blob/main/integrations/semantic-kernel.ipynb

.. io-code-block:: 
    :copyable: true 

    .. input:: 
       :language: python

       service_id = "chat"
       settings = kernel.get_service(service_id).instantiate_prompt_execution_settings(
          service_id=service_id
       )

       prompt_template = """
          Answer the following question based on the given context.

          Question: {{$input}}
          Context: {{$context}}
       """

       chat_prompt_template_config = PromptTemplateConfig(
          execution_settings=settings,
          input_variables=[
              InputVariable(name="input"),
              InputVariable(name="context")
          ],
          template=prompt_template
       )

       prompt = kernel.add_function(
          function_name="RAG",
          plugin_name="TextMemoryPlugin",
          prompt_template_config=chat_prompt_template_config,
       )

       question = "When did I start using MongoDB?"
       results = await memory.search("test", question)
       retrieved_document = results[0].text
       answer = await prompt.invoke(
          kernel=kernel, input=question, context=retrieved_document
       )
       print(answer)

    .. output:: 

       You started using MongoDB two years ago.
