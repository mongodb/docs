.. procedure::
   :style: normal

   .. step:: Define a tool for vector search.

      This tool uses the vector store object as a `retriever 
      <https://python.langchain.com/docs/how_to/vectorstore_retriever/>`__.
      Under the hood, the retriever runs an {+avs+} query 
      to retrieve semantically similar documents. The tool then
      returns the titles and plots of the retrieved movie documents.

      .. io-code-block::
         :copyable: true

         .. input:: /includes/ai-integrations/langgraph/vector-search-tool.py
           :language: python
      
         .. output:: 
            :visible: false

            20,000 Leagues Under the Sea: In the 19th century, an expert marine biologist is hired by the government to determine what's sinking ships all over the ocean. His daughter follows him. They are intercepted by a mysterious captain Nemo and his incredible submarine.

            Deep Rising: A group of heavily armed hijackers board a luxury ocean liner in the South Pacific Ocean to loot it, only to do battle with a series of large-sized, tentacled, man-eating sea creatures who have taken over the ship first.

            Lost River: A single mother is swept into a dark underworld, while her teenage son discovers a road that leads him to a secret underwater town.

            Waterworld: In a future where the polar ice-caps have melted and Earth is almost entirely submerged, a mutated mariner fights starvation and outlaw "smokers," and reluctantly helps a woman and a young girl try to find dry land.

            Poseidon: On New Year's Eve, the luxury ocean liner Poseidon capsizes after being swamped by a rogue wave. The survivors are left to fight for their lives as they attempt to escape the sinking ship.

   .. step:: Define a tool for full-text search.

      This tool uses the :ref:`full-text search retriever
      <langchain-fts-retriever>` to retrieve movie documents that
      match the specified movie title. Then, the tool returns the
      plot of the specified movie.

      .. io-code-block::
         :copyable: true

         .. input:: /includes/ai-integrations/langgraph/fts-tool.py
           :language: python
      
         .. output:: 
            :visible: false

            "The plot focuses on the romances of two couples upon the doomed ship's maiden voyage. Isabella Paradine (Catherine Zeta-Jones) is a wealthy woman mourning the loss of her aunt, who reignites a romance with former flame Wynn Park (Peter Gallagher). Meanwhile, a charming ne'er-do-well named Jamie Perse (Mike Doyle) steals a ticket for the ship, and falls for a sweet innocent Irish girl on board. But their romance is threatened by the villainous Simon Doonan (Tim Curry), who has discovered about the ticket and makes Jamie his unwilling accomplice, as well as having sinister plans for the girl."
            
   .. step:: Prepare the |llm|.
       
      The following code prepares the |llm| for the agent
      by doing the following:

      - Specifies which |llm| to use. By default, the ``ChatOpenAI`` class uses
        ``gpt-3.5-turbo``.
      - Defines a LangChain `prompt template 
        <https://python.langchain.com/docs/how_to/#prompt-templates>`__
        to instruct the |llm| on how to generate responses, including
        how to handle tool calls.
      - Binds the tools and prompt template to the |llm|.

      .. literalinclude:: /includes/ai-integrations/langgraph/configure-llm.py
         :language: python
         :copyable:

   .. step:: Test the tool calls.

      You can run the following code snippets to test that the |llm| makes the
      correct tool calls based on the query by checking the 
      name of the tool that the LLM is calling:

      .. io-code-block:: 
         :copyable: true

         .. input:: 
            :language: python

            # Here, we expect the LLM to use the 'vector_search' tool.
            llm_with_tools.invoke(["What are some movies that take place in the ocean?"]).tool_calls
            
         .. output::
            :visible: false

            [{'name': 'vector_search',
             'args': {'user_query': 'movies that take place in the ocean'},
             'id': 'call_gBrzDrB35i3bafwWMt5YJQ3E',
             'type': 'tool_call'}]

      .. io-code-block:: 
         :copyable: true

         .. input:: 
            :language: python
            
            # Here, we expect the LLM to use the 'full_text_search' tool.
            llm_with_tools.invoke(["What's the plot of Titanic?"]).tool_calls
                        
         .. output::
            :visible: false

            [{'name': 'full_text_search',
              'args': {'user_query': 'Titanic'},
              'id': 'call_rxrOG8DuHWzhVvaai7NHMNTU',
              'type': 'tool_call'}]
