.. procedure::
   :style: normal

   .. step:: Initialize the checkpointer.

      To `persist <https://langchain-ai.github.io/langgraph/concepts/persistence/>`__
      the state of the graph execution, you can use **checkpointers** to save 
      the state to a specific ``thread``, which can be accessed even 
      after the graph execution ends.

      The ``MongoDBSaver`` checkpointer allows you to use MongoDB as the 
      backing database for persisting the checkpoint state. Run the following code 
      in your notebook to initialize the checkpointer and use it in your graph:

      .. literalinclude:: /includes/ai-integrations/langgraph/mongodb-checkpointer.py
         :language: python
         :copyable:

   .. step:: Update the execution function.

      You must also update the execution function to reference
      the ``thread_id``, which is the unique identifier for the
      thread that you want to persist. Run the following code in your
      notebook to update the execution function:

      .. literalinclude:: /includes/ai-integrations/langgraph/checkpointer-execution.py
         :language: python
         :copyable:

   .. step:: Test the agent.

      Run the following code snippets in your notebook to test the agent.
      Your generated responses might vary.

      - The first code snippet runs a query and saves the response to a
        thread with the specified ``thread_id`` of ``1``.

      - The second code snippet runs a query about the previous interaction,
        loading the state from the thread with the specified ``thread_id`` of ``1``.
        It generates a response that is aware of the previous interaction.

      .. io-code-block:: 
         :copyable: true

         .. input:: 
            :language: python

            execute_graph("1", "What's the plot of Titanic?")
                        
         .. output::

            Node agent:
            {'messages': [AIMessage(content='', additional_kwargs={'tool_calls': [{'id': 'call_ZgBYIdPqV720s3oN7TC61Sjn', 'function': {'arguments': '{"user_query":"Titanic"}', 'name': 'full_text_search'}, 'type': 'function'}], 'refusal': None}, response_metadata={'token_usage': {'completion_tokens': 18, 'prompt_tokens': 860, 'total_tokens': 878, 'completion_tokens_details': {'accepted_prediction_tokens': 0, 'audio_tokens': 0, 'reasoning_tokens': 0, 'rejected_prediction_tokens': 0}, 'prompt_tokens_details': {'audio_tokens': 0, 'cached_tokens': 0}}, 'model_name': 'gpt-3.5-turbo-0125', 'system_fingerprint': None, 'finish_reason': 'tool_calls', 'logprobs': None}, id='run-91a84f0d-ddba-4753-8de6-6db1d059f238-0', tool_calls=[{'name': 'full_text_search', 'args': {'user_query': 'Titanic'}, 'id': 'call_ZgBYIdPqV720s3oN7TC61Sjn', 'type': 'tool_call'}], usage_metadata={'input_tokens': 860, 'output_tokens': 18, 'total_tokens': 878, 'input_token_details': {'audio': 0, 'cache_read': 0}, 'output_token_details': {'audio': 0, 'reasoning': 0}})]}
            Node tools:
            {'messages': [ToolMessage(content="The plot focuses on the romances of two couples upon the doomed ship's maiden voyage. Isabella Paradine (Catherine Zeta-Jones) is a wealthy woman mourning the loss of her aunt, who reignites a romance with former flame Wynn Park (Peter Gallagher). Meanwhile, a charming ne'er-do-well named Jamie Perse (Mike Doyle) steals a ticket for the ship, and falls for a sweet innocent Irish girl on board. But their romance is threatened by the villainous Simon Doonan (Tim Curry), who has discovered about the ticket and makes Jamie his unwilling accomplice, as well as having sinister plans for the girl.", id='20507bc4-383f-4478-8ffc-9386e423509c', tool_call_id='call_ZgBYIdPqV720s3oN7TC61Sjn')]}
            Node agent:
            {'messages': [AIMessage(content='The plot of "Titanic" focuses on the romances of two couples aboard the doomed ship\'s maiden voyage. It tells the story of Isabella Paradine, who rekindles a romance with Wynn Park, and Jamie Perse, who falls in love with an Irish girl on board. Their romances are jeopardized by the villainous Simon Doonan\'s sinister plans.', additional_kwargs={'refusal': None}, response_metadata={'token_usage': {'completion_tokens': 80, 'prompt_tokens': 1018, 'total_tokens': 1098, 'completion_tokens_details': {'accepted_prediction_tokens': 0, 'audio_tokens': 0, 'reasoning_tokens': 0, 'rejected_prediction_tokens': 0}, 'prompt_tokens_details': {'audio_tokens': 0, 'cached_tokens': 0}}, 'model_name': 'gpt-3.5-turbo-0125', 'system_fingerprint': None, 'finish_reason': 'stop', 'logprobs': None}, id='run-8b1916d2-b5b4-4d17-be04-589a701e17dc-0', usage_metadata={'input_tokens': 1018, 'output_tokens': 80, 'total_tokens': 1098, 'input_token_details': {'audio': 0, 'cache_read': 0}, 'output_token_details': {'audio': 0, 'reasoning': 0}})]}
           
            ---FINAL ANSWER---
            The plot of "Titanic" focuses on the romances of two couples aboard the doomed ship's maiden voyage. It tells the story of Isabella Paradine, who rekindles a romance with Wynn Park, and Jamie Perse, who falls in love with an Irish girl on board. Their romances are jeopardized by the villainous Simon Doonan's sinister plans.

      .. io-code-block:: 
         :copyable: true

         .. input:: 
            :language: python

            execute_graph("1", "What movies are similar to the one I just asked about?")
                        
         .. output::

            Node agent:
            {'messages': [AIMessage(content='', additional_kwargs={'tool_calls': [{'id': 'call_7hzNqOU0hZBHrm7wihISMrEz', 'function': {'arguments': '{"user_query": "Movies similar to Titanic"}', 'name': 'vector_search'}, 'type': 'function'}, {'id': 'call_OHAkJsyjPGKcCpqye2M56Moy', 'function': {'arguments': '{"user_query": "Titanic"}', 'name': 'vector_search'}, 'type': 'function'}], 'refusal': None}, response_metadata={'token_usage': {'completion_tokens': 50, 'prompt_tokens': 1394, 'total_tokens': 1444, 'completion_tokens_details': {'accepted_prediction_tokens': 0, 'audio_tokens': 0, 'reasoning_tokens': 0, 'rejected_prediction_tokens': 0}, 'prompt_tokens_details': {'audio_tokens': 0, 'cached_tokens': 0}}, 'model_name': 'gpt-3.5-turbo-0125', 'system_fingerprint': None, 'finish_reason': 'tool_calls', 'logprobs': None}, id='run-e48b75c7-4493-4dcd-af2e-afb556882052-0', tool_calls=[{'name': 'vector_search', 'args': {'user_query': 'Movies similar to Titanic'}, 'id': 'call_7hzNqOU0hZBHrm7wihISMrEz', 'type': 'tool_call'}, {'name': 'vector_search', 'args': {'user_query': 'Titanic'}, 'id': 'call_OHAkJsyjPGKcCpqye2M56Moy', 'type': 'tool_call'}], usage_metadata={'input_tokens': 1394, 'output_tokens': 50, 'total_tokens': 1444, 'input_token_details': {'audio': 0, 'cache_read': 0}, 'output_token_details': {'audio': 0, 'reasoning': 0}})]}
            Node tools:
            {'messages': [ToolMessage(content="The Poseidon Adventure: A group of passengers struggle to survive and escape when their ocean liner completely capsizes at sea.\n\nPoseidon: On New Year's Eve, the luxury ocean liner Poseidon capsizes after being swamped by a rogue wave. The survivors are left to fight for their lives as they attempt to escape the sinking ship.\n\nLife of Pi: A young man who survives a disaster at sea is hurtled into an epic journey of adventure and discovery. While cast away, he forms an unexpected connection with another survivor: a fearsome Bengal tiger.\n\nTraffickers: A thriller about the passengers with different objectives on board a cruiser headed for China, being chased over and over again and unexpected happening of things.\n\nAfter the Storm: When a luxury yacht goes down in a violent storm the race is on to salvage the bounty at any cost, causing two couples to commit the ultimate betrayal.", id='f1b40d2d-eaf9-4dca-8f4d-0f69eb4b4f3d', tool_call_id='call_7hzNqOU0hZBHrm7wihISMrEz'), ToolMessage(content="Titanic: The story of the 1912 sinking of the largest luxury liner ever built, the tragedy that befell over two thousand of the rich and famous as well as of the poor and unknown passengers aboard the doomed ship.\n\nThe Poseidon Adventure: A group of passengers struggle to survive and escape when their ocean liner completely capsizes at sea.\n\nRaise the Titanic: To obtain a supply of a rare mineral, a ship raising operation is conducted for the only known source, the Titanic.\n\nPoseidon: On New Year's Eve, the luxury ocean liner Poseidon capsizes after being swamped by a rogue wave. The survivors are left to fight for their lives as they attempt to escape the sinking ship.\n\nAll Is Lost: After a collision with a shipping container at sea, a resourceful sailor finds himself, despite all efforts to the contrary, staring his mortality in the face.", id='3551a58d-44d7-4055-a997-97c09dc563ef', tool_call_id='call_OHAkJsyjPGKcCpqye2M56Moy')]}
            Node agent:
            {'messages': [AIMessage(content='Movies similar to "Titanic" include:\n1. The Poseidon Adventure\n2. Poseidon\n3. Life of Pi\n4. Traffickers\n5. After the Storm\n\nThese movies feature themes of survival, disasters at sea, and unexpected events similar to those in "Titanic."', additional_kwargs={'refusal': None}, response_metadata={'token_usage': {'completion_tokens': 62, 'prompt_tokens': 1827, 'total_tokens': 1889, 'completion_tokens_details': {'accepted_prediction_tokens': 0, 'audio_tokens': 0, 'reasoning_tokens': 0, 'rejected_prediction_tokens': 0}, 'prompt_tokens_details': {'audio_tokens': 0, 'cached_tokens': 0}}, 'model_name': 'gpt-3.5-turbo-0125', 'system_fingerprint': None, 'finish_reason': 'stop', 'logprobs': None}, id='run-8332baba-75d3-4d18-baf6-75b3cf68b552-0', usage_metadata={'input_tokens': 1827, 'output_tokens': 62, 'total_tokens': 1889, 'input_token_details': {'audio': 0, 'cache_read': 0}, 'output_token_details': {'audio': 0, 'reasoning': 0}})]}
           
            ---FINAL ANSWER---
            Movies similar to "Titanic" include:
            1. The Poseidon Adventure
            2. Poseidon
            3. Life of Pi
            4. Traffickers
            5. After the Storm

            These movies feature themes of survival, disasters at sea, and unexpected events similar to those in "Titanic."