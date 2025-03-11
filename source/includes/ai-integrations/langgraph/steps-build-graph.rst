.. procedure::
   :style: normal

   .. step:: Define the graph state.
     
      The `graph state <https://langchain-ai.github.io/langgraph/concepts/low_level/#graphs>`__
      maintains the state of the graph throughout the workflow. It can contain any shared data 
      that needs to be tracked and modified across different nodes. In this example, 
      the ``GraphState`` component uses a dictionary that tracks the agent's `messages 
      <https://langchain-ai.github.io/langgraph/concepts/low_level/#working-with-messages-in-graph-state>`__, 
      which includes the user query, the |llm|\'s responses, and the results of tool calls.
      However, you can customize your graph state to include any data relevant to your application.

      .. literalinclude:: /includes/ai-integrations/langgraph/graph-state.py
         :language: python
         :copyable:

   .. step:: Define the nodes.

      For this agent, you define two custom
      `nodes <https://langchain-ai.github.io/langgraph/concepts/low_level/#nodes>`__
      :

      a. Add the **agent node**.

         This node processes the messages in the current state,
         invokes the |llm| with these messages, and updates the state 
         with the |llm|\'s response, which includes any tool calls.

         .. literalinclude:: /includes/ai-integrations/langgraph/agent-node.py
            :language: python
            :copyable:

      #. Add the **tools node**.

         This node processes tool calls, determines the appropriate tool 
         to use based on the current state, and updates the message history 
         with the results of the tool call.

         .. literalinclude:: /includes/ai-integrations/langgraph/tool-node.py
            :language: python
            :copyable:

   .. step:: Define the edges.

      `Edges <https://langchain-ai.github.io/langgraph/concepts/low_level/#edges>`__
      connect the nodes in the graph and define the flow of the agent.
      In this code, you define the following edges:

      - The following `normal edges <https://langchain-ai.github.io/langgraph/concepts/low_level/#normal-edges>`__
        that route:
      
        - Start node to agent node.
        - Agent node to tools node.

      - A `conditional edge <https://langchain-ai.github.io/langgraph/concepts/low_level/#conditional-edges>`__
        that routes the tools node to the agent node if the state contains tool calls. 
        Otherwise, routes to the end node.

      .. literalinclude:: /includes/ai-integrations/langgraph/add-edges.py
         :language: python
         :copyable:

   .. step:: Compile the graph.
    
      Run the following code to compile the graph:

      .. code-block:: python

         app = graph.compile()

      Optionally, you can also run the following code 
      to visualize the graph:

      .. literalinclude:: /includes/ai-integrations/langgraph/visualize-graph.py
         :language: python
         :copyable:

   .. step:: Define the execution function.

      Define the execution function to run the agent's 
      workflow. The following execution function
      streams outputs from the graph as they progress
      through the nodes, so you can see the agent's
      outputs in real time:
      
      .. literalinclude:: /includes/ai-integrations/langgraph/run-graph.py
         :language: python
         :copyable:    

   .. step:: Test the agent.

      Run the following sample queries to test the agent. 
      Your generated responses might vary.

      .. io-code-block:: 
         :copyable: true

         .. input:: 
            :language: python

            execute_graph("What are some movies that take place in the ocean?")
                        
         .. output::

            Node agent:
            {'messages': [AIMessage(content='', additional_kwargs={'tool_calls': [{'id': 'call_ubFQjnq0s4GKoRAuumpaLxSV', 'function': {'arguments': '{"user_query":"movies that take place in the ocean"}', 'name': 'vector_search'}, 'type': 'function'}], 'refusal': None}, response_metadata={'token_usage': {'completion_tokens': 22, 'prompt_tokens': 241, 'total_tokens': 263, 'completion_tokens_details': {'accepted_prediction_tokens': 0, 'audio_tokens': 0, 'reasoning_tokens': 0, 'rejected_prediction_tokens': 0}, 'prompt_tokens_details': {'audio_tokens': 0, 'cached_tokens': 0}}, 'model_name': 'gpt-3.5-turbo-0125', 'system_fingerprint': None, 'finish_reason': 'tool_calls', 'logprobs': None}, id='run-d2cd95a6-27b1-4f1e-a173-51535209c99d-0', tool_calls=[{'name': 'vector_search', 'args': {'user_query': 'movies that take place in the ocean'}, 'id': 'call_ubFQjnq0s4GKoRAuumpaLxSV', 'type': 'tool_call'}], usage_metadata={'input_tokens': 241, 'output_tokens': 22, 'total_tokens': 263, 'input_token_details': {'audio': 0, 'cache_read': 0}, 'output_token_details': {'audio': 0, 'reasoning': 0}})]}
            Node tools:
            {'messages': [ToolMessage(content='20,000 Leagues Under the Sea: In the 19th century, an expert marine biologist is hired by the government to determine what\'s sinking ships all over the ocean. His daughter follows him. They are intercepted by a mysterious captain Nemo and his incredible submarine.\n\nDeep Rising: A group of heavily armed hijackers board a luxury ocean liner in the South Pacific Ocean to loot it, only to do battle with a series of large-sized, tentacled, man-eating sea creatures who have taken over the ship first.\n\nLost River: A single mother is swept into a dark underworld, while her teenage son discovers a road that leads him to a secret underwater town.\n\nWaterworld: In a future where the polar ice-caps have melted and Earth is almost entirely submerged, a mutated mariner fights starvation and outlaw "smokers," and reluctantly helps a woman and a young girl try to find dry land.\n\nDagon: A boating accident runs a young man and woman ashore in a decrepit Spanish fishing town which they discover is in the grips of an ancient sea god and its monstrous half human offspring.', id='11001e4d-fef1-4abe-8700-d720876b5dce', tool_call_id='call_ubFQjnq0s4GKoRAuumpaLxSV')]}
            Node agent:
            {'messages': [AIMessage(content='Some movies that take place in the ocean are:\n1. 20,000 Leagues Under the Sea\n2. Deep Rising\n3. Lost River\n4. Waterworld\n5. Dagon', additional_kwargs={'refusal': None}, response_metadata={'token_usage': {'completion_tokens': 43, 'prompt_tokens': 495, 'total_tokens': 538, 'completion_tokens_details': {'accepted_prediction_tokens': 0, 'audio_tokens': 0, 'reasoning_tokens': 0, 'rejected_prediction_tokens': 0}, 'prompt_tokens_details': {'audio_tokens': 0, 'cached_tokens': 0}}, 'model_name': 'gpt-3.5-turbo-0125', 'system_fingerprint': None, 'finish_reason': 'stop', 'logprobs': None}, id='run-7832ca28-bac1-4e80-a7b9-76cc85034ce7-0', usage_metadata={'input_tokens': 495, 'output_tokens': 43, 'total_tokens': 538, 'input_token_details': {'audio': 0, 'cache_read': 0}, 'output_token_details': {'audio': 0, 'reasoning': 0}})]}

            ---FINAL ANSWER---
            Some movies that take place in the ocean are:
            1. 20,000 Leagues Under the Sea
            2. Deep Rising
            3. Lost River
            4. Waterworld
            5. Dagon

      .. io-code-block:: 
         :copyable: true

         .. input:: 
            :language: python

            execute_graph("What's the plot of Titanic?")
                        
         .. output::

            Node agent:
            {'messages': [AIMessage(content='', additional_kwargs={'tool_calls': [{'id': 'call_FovVlygLymvbxDzNeEfQGedG', 'function': {'arguments': '{"user_query":"Titanic"}', 'name': 'full_text_search'}, 'type': 'function'}], 'refusal': None}, response_metadata={'token_usage': {'completion_tokens': 18, 'prompt_tokens': 237, 'total_tokens': 255, 'completion_tokens_details': {'accepted_prediction_tokens': 0, 'audio_tokens': 0, 'reasoning_tokens': 0, 'rejected_prediction_tokens': 0}, 'prompt_tokens_details': {'audio_tokens': 0, 'cached_tokens': 0}}, 'model_name': 'gpt-3.5-turbo-0125', 'system_fingerprint': None, 'finish_reason': 'tool_calls', 'logprobs': None}, id='run-6ee12cbd-0c4a-451f-b56b-83851359d0bb-0', tool_calls=[{'name': 'full_text_search', 'args': {'user_query': 'Titanic'}, 'id': 'call_FovVlygLymvbxDzNeEfQGedG', 'type': 'tool_call'}], usage_metadata={'input_tokens': 237, 'output_tokens': 18, 'total_tokens': 255, 'input_token_details': {'audio': 0, 'cache_read': 0}, 'output_token_details': {'audio': 0, 'reasoning': 0}})]}
            Node tools:
            {'messages': [ToolMessage(content="The plot focuses on the romances of two couples upon the doomed ship's maiden voyage. Isabella Paradine (Catherine Zeta-Jones) is a wealthy woman mourning the loss of her aunt, who reignites a romance with former flame Wynn Park (Peter Gallagher). Meanwhile, a charming ne'er-do-well named Jamie Perse (Mike Doyle) steals a ticket for the ship, and falls for a sweet innocent Irish girl on board. But their romance is threatened by the villainous Simon Doonan (Tim Curry), who has discovered about the ticket and makes Jamie his unwilling accomplice, as well as having sinister plans for the girl.", id='2cd41281-d195-44af-9ae1-f3ff099194a9', tool_call_id='call_FovVlygLymvbxDzNeEfQGedG')]}
            Node agent:
            {'messages': [AIMessage(content='The plot of "Titanic" focuses on the romances of two couples on the doomed ship\'s maiden voyage. Isabella Paradine, a wealthy woman, reunites with her former flame, Wynn Park. Meanwhile, a charming ne\'er-do-well named Jamie Perse falls for an innocent Irish girl on board, but their romance is threatened by a villainous character named Simon Doonan.', additional_kwargs={'refusal': None}, response_metadata={'token_usage': {'completion_tokens': 83, 'prompt_tokens': 395, 'total_tokens': 478, 'completion_tokens_details': {'accepted_prediction_tokens': 0, 'audio_tokens': 0, 'reasoning_tokens': 0, 'rejected_prediction_tokens': 0}, 'prompt_tokens_details': {'audio_tokens': 0, 'cached_tokens': 0}}, 'model_name': 'gpt-3.5-turbo-0125', 'system_fingerprint': None, 'finish_reason': 'stop', 'logprobs': None}, id='run-cdf65abe-7ce0-417a-8f5b-84989521f47e-0', usage_metadata={'input_tokens': 395, 'output_tokens': 83, 'total_tokens': 478, 'input_token_details': {'audio': 0, 'cache_read': 0}, 'output_token_details': {'audio': 0, 'reasoning': 0}})]}

            ---FINAL ANSWER---
            The plot of "Titanic" focuses on the romances of two couples on the doomed ship's maiden voyage. Isabella Paradine, a wealthy woman, reunites with her former flame, Wynn Park. Meanwhile, a charming ne'er-do-well named Jamie Perse falls for an innocent Irish girl on board, but their romance is threatened by a villainous character named Simon Doonan.
