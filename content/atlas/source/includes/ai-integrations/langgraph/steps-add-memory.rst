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
            {'messages': [AIMessage(content='Here are some movies that share similarities with "Titanic" in terms of themes or setting:\n\n1. **Poseidon** - On New Year\'s Eve, the luxury ocean liner Poseidon capsizes after being hit by a rogue wave. The survivors struggle to escape the sinking ship. Like "Titanic," it involves a disaster on a luxury liner.\n\n2. **Raise the Titanic** - This movie focuses on a mission to raise the Titanic to recover a rare mineral. While the story is different, it still revolves around the famous Titanic ship.\n\n3. **The Poseidon Adventure** - A group of passengers fights to survive after their ocean liner completely capsizes at sea. It’s another disaster movie set on a ship, much like "Titanic."\n\n4. **After the Storm** - Following the sinking of a luxury yacht in a violent storm, greed leads to betrayal among survivors. This film also involves a maritime disaster and the human drama that unfolds.\n\nThese movies share overlapping themes of survival, maritime catastrophe, and human relationships in the face of tragedy.', additional_kwargs={'refusal': None}, response_metadata={'token_usage': {'completion_tokens': 214, 'prompt_tokens': 467, 'total_tokens': 681, 'completion_tokens_details': {'accepted_prediction_tokens': 0, 'audio_tokens': 0, 'reasoning_tokens': 0, 'rejected_prediction_tokens': 0}, 'prompt_tokens_details': {'audio_tokens': 0, 'cached_tokens': 0}}, 'model_name': 'gpt-4o-2024-11-20', 'system_fingerprint': 'fp_ee1d74bde0', 'id': 'chatcmpl-BtFZMLYcrGfPKQVU4QMU9cR3GltIw', 'service_tier': None, 'prompt_filter_results': [{'prompt_index': 0, 'content_filter_results': {'hate': {'filtered': False, 'severity': 'safe'}, 'jailbreak': {'filtered': False, 'detected': False}, 'self_harm': {'filtered': False, 'severity': 'safe'}, 'sexual': {'filtered': False, 'severity': 'safe'}, 'violence': {'filtered': False, 'severity': 'safe'}}}], 'finish_reason': 'stop', 'logprobs': None, 'content_filter_results': {'hate': {'filtered': False, 'severity': 'safe'}, 'protected_material_code': {'filtered': False, 'detected': False}, 'protected_material_text': {'filtered': False, 'detected': False}, 'self_harm': {'filtered': False, 'severity': 'safe'}, 'sexual': {'filtered': False, 'severity': 'safe'}, 'violence': {'filtered': False, 'severity': 'safe'}}}, id='run--97e9e332-3474-4635-9618-cb2e24536f83-0', usage_metadata={'input_tokens': 467, 'output_tokens': 214, 'total_tokens': 681, 'input_token_details': {'audio': 0, 'cache_read': 0}, 'output_token_details': {'audio': 0, 'reasoning': 0}})]}

            ---FINAL ANSWER---
            Here are some movies that share similarities with "Titanic" in terms of themes or setting:

            1. **Poseidon** - On New Year's Eve, the luxury ocean liner Poseidon capsizes after being hit by a rogue wave. The survivors struggle to escape the sinking ship. Like "Titanic," it involves a disaster on a luxury liner.

            2. **Raise the Titanic** - This movie focuses on a mission to raise the Titanic to recover a rare mineral. While the story is different, it still revolves around the famous Titanic ship.

            3. **The Poseidon Adventure** - A group of passengers fights to survive after their ocean liner completely capsizes at sea. It’s another disaster movie set on a ship, much like "Titanic."

            4. **After the Storm** - Following the sinking of a luxury yacht in a violent storm, greed leads to betrayal among survivors. This film also involves a maritime disaster and the human drama that unfolds.

            These movies share overlapping themes of survival, maritime catastrophe, and human relationships in the face of tragedy.
            