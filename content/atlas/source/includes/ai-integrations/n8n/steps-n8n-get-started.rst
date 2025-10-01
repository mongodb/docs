
.. procedure::
   :style: normal

   .. step:: Create a new n8n workflow.

      Open n8n where you are hosting it, then create a new workflow:

      - If you have no workflows or are using n8n for the first time, use the empty workflow that is displayed.
      - If you have existing workflows, click :guilabel:`Create Workflow`.

   .. step:: Add a Chat Trigger node.

      All workflows in n8n start with a trigger node.
      For this workflow, you use a chat trigger node so that the AI agent workflow is 
      triggered by a user message.

      a. Select :guilabel:`Add first step` or press :guilabel:`Tab` to open the node menu.
      #. Search for :guilabel:`Chat Trigger`. n8n displays a list of nodes that match the search.
      #. Select :guilabel:`Chat Trigger` to add the node to the canvas.
      #. Click :guilabel:`Back to canvas` in the upper-left corner of your screen.
         You can skip testing this node at this stage. Click :guilabel:`Save`.

   .. step:: Add an AI Agent node.

      In the AI Agent node, you configure the chat model, memory, and tools.
      These are required components of the AI Agent node where you 
      add additional nodes and sub-nodes.

      a. Select the :guilabel:`+` connector on the trigger node.
      #. Search for the :guilabel:`AI Agent` node and add it to the workflow.
         The editing view of the AI agent displays.
      #. Click :guilabel:`Back to canvas` in the upper-left corner of your screen.
         You can skip testing this node at this stage. Click :guilabel:`Save`.
      
   .. step:: Configure the chat model.

      Configure the chat model to attach the node to process incoming prompts:

      a. Click the :guilabel:`+` connector next to the :guilabel:`Chat Model` label on the AI Agent node.
         The search panel appears, filtered on :guilabel:`Language Models`.
      #. Select :guilabel:`OpenAI Chat Model` from the list, or your preferred LLM provider.
      #. Click :guilabel:`Credential to connect with`.
      #. After selecting your credentials, choose a model from the drop-down menu (for example, ``gpt-4o``).
      #. Click :guilabel:`Back to canvas` in the upper-left corner of your screen.
         You can skip testing this node at this stage. Click :guilabel:`Save`.
      #. Click the AI Agent icon at the top of the dialog box to return to the AI Agent node configuration.

   .. step:: Add the MongoDB Chat Memory sub-node.

      Configure the :ref:`MongoDB Chat Memory sub-node <n8n-chat-memory>` to enable persistent conversation context.

      a. Click the :guilabel:`+` connector next to the :guilabel:`Memory` label on the AI Agent node.
      #. From the side panel, select :guilabel:`MongoDB Chat Memory`.
      #. Click :guilabel:`Select credential`, then select your MongoDB credentials.
      #. Use the default configurations for the MongoDB Chat Memory node. By default,
         n8n creates a collection called ``n8n_chat_histories`` in the specified database.
      #. Click :guilabel:`Back to canvas` in the upper-left corner of your screen.
         You can skip testing this node at this stage. Click :guilabel:`Save`.
      #. Click the AI Agent icon to return to the AI Agent node configuration.

   .. step:: Add the MongoDB Atlas Vector Store node as a tool.

      Configure the :ref:`MongoDB Atlas Vector Store node <n8n-vector-store>` to 
      enable document retrieval.

      a. Click the :guilabel:`+` connector next to the :guilabel:`Tool` label on the AI Agent node.
      #. In the search panel, select :guilabel:`MongoDB Atlas Vector Store`.
      #. Select the MongoDB credentials that you configured, and then specify the following values:

         .. list-table::
            :widths: 35 65
            :header-rows: 1

            * - Setting
              - Value
            * - :guilabel:`Operation Mode`
              - :guilabel:`Retrieve Documents (As Tool for AI Agent)`
            * - :guilabel:`Description`
              - ``"Search through documents about movies to find relevant information"``
            * - :guilabel:`MongoDB Collection`
              - ``embedded_movies``
            * - :guilabel:`Embedding`
              - ``plot_embedding``
            * - :guilabel:`Metadata Field`
              - ``plot``
            * - :guilabel:`Vector Index Name`
              - ``vector_index``
            * - :guilabel:`Limit`
              - ``4``
            * - :guilabel:`Include Metadata`
              - Toggle to :guilabel:`Off`

                :gold:`IMPORTANT:`

                If you don't toggle this setting to :guilabel:`Off`, the AI agent might not run
                as the documents might be too large to load into the context window.

            * - :guilabel:`Rerank Results`
              - Toggle to :guilabel:`Off`

   .. step:: Configure the embedding model.

      Configure the embedding model for the MongoDB Atlas Vector Store node:

      a. Click the :guilabel:`+` connector next to the :guilabel:`Embedding` label on the MongoDB Atlas Vector Store node.
      #. From the side panel, select :guilabel:`Embeddings OpenAI`.
      #. Select your OpenAI credentials, and then specify the ``text-embedding-ada-002`` model.
      #. Click :guilabel:`Back to canvas` in the upper-left corner of your screen.
         Click :guilabel:`Save`.

   .. step:: Test the workflow.

      Now that you've configured the AI Agent node, you can test the complete workflow.
      After you send a message, the workflow runs in real-time on the canvas.

      a. Click the :guilabel:`Open chat` button near the bottom of the canvas.
      #. Test the memory functionality by running a few initial prompts. For example:
       
         .. io-code-block::
            :copyable:

            .. input::
               :language: text

               Hi, my name is Mongo

            .. output::
               :language: text
               :visible: false

               Hello Mongo! Nice to meet you. How can I help you today?

         .. io-code-block::
            :copyable:

            .. input::
               :language: text

               What is my name?

            .. output::
               :language: text
               :visible: false

               Your name is Mongo, as you mentioned when you introduced yourself earlier.

      #. Test the vector search and |rag| functionality by running the following prompt.

         .. io-code-block::
            :copyable:

            .. input::
               :language: text

               Recommend me a few movies about time travel

            .. output::
               :language: text
               :visible: false

               Here are a few movies about time travel that you might enjoy:

               The Time Traveler's Wife - A romantic drama about a Chicago librarian with a gene that causes him to involuntarily time travel, leading to complications in his marriage.

               Timecop - An officer working for a security agency that regulates time travel must battle for his life against a corrupt politician tied to his past.

               We Are from the Future (My iz budushchego) - Four modern-day treasure seekers are unexpectedly transported into the midst of a World War II battle set in Russia.

               About Time - A young man discovers at the age of 21 that he can travel back in time. He attempts to improve his life, including finding love, but things don't turn out to be as simple as they seem.

               Let me know if you'd like any additional information about these films!

   .. step:: Save the workflow.

      a. Click the :guilabel:`Save` button in the top right of the editor window.
      #. Give your workflow a descriptive name. For example, name it "AI Agent with MongoDB".

      You can return to this workflow at any time.
