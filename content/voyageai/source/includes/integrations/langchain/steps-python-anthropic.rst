.. procedure::
   :style: normal

   .. step:: Initialize the project and install dependencies.

      Run the following commands in your terminal to create a new
      project directory and install the required dependencies:

      .. code-block:: bash

         mkdir langchain-voyageai
         cd langchain-voyageai
         pip install --quiet --upgrade langchain langchain-community langchain-core langchain-mongodb langchain-voyageai langchain-anthropic langchain-text-splitters pymongo pypdf python-dotenv

      Then, create a file named ``langchain_get_started.py`` in the
      ``langchain-voyageai`` directory and add the following import
      statements. You add code to this file throughout the tutorial.

      .. literalinclude:: /includes/integrations/langchain/python-anthropic/langchain_get_started.py
         :language: python
         :start-after: # start-imports
         :end-before: # end-imports

   .. step:: Define your environment variables.

      Create a ``.env`` file in the ``langchain-voyageai`` directory
      and paste the following code:

      .. code-block:: none

         MONGODB_URI=<connection-string>
         VOYAGE_API_KEY=<voyage-api-key>
         ANTHROPIC_API_KEY=<anthropic-api-key>

      Replace the placeholder values with your {+voyageai+}
      {+model-api-key+}, your Anthropic API key, and your MongoDB
      cluster's connection string. To learn how to find your connection
      string, see :ref:`mongodb-uri`.

      Then, add the following code to the ``langchain_get_started.py``
      file to load your environment variables:

      .. literalinclude:: /includes/integrations/langchain/python-anthropic/langchain_get_started.py
         :language: python
         :start-after: # start-env
         :end-before: # end-env

      After you call ``load_dotenv()``, the ``VoyageAIEmbeddings`` and
      ``ChatAnthropic`` classes read API keys from the
      environment when instantiated, so you don't need to pass
      the keys explicitly.

      .. include:: /includes/integrations/langchain/note-python-key-routing.rst

   .. include:: /includes/integrations/langchain/shared-python-steps.rst

   .. step:: Answer questions about your data.

      Add the following code to the ``langchain_get_started.py`` file
      to implement RAG with your vector store. This code performs the
      following tasks:

      - Instantiates your vector store as a LangChain retriever,
        including the ``k`` parameter to retrieve only the ``10`` most
        relevant documents.
      - Defines a prompt template that instructs the LLM to use the
        retrieved documents as context for the question.
      - Chains the retriever, the prompt, and the Anthropic chat model
        together, then prompts the chain with a sample question.

      .. literalinclude:: /includes/integrations/langchain/python-anthropic/langchain_get_started.py
         :language: python
         :start-after: # start-answer
         :end-before: # end-answer

   .. step:: Run the file.

      Run the following command to run your application:

      .. code-block:: bash

         python langchain_get_started.py

      If successful, your application output resembles the following:

      .. code-block:: none
         :copyable: false

         Waiting for initial sync...
         Semantic search results without pre-filtering:
         [(Document(id='6a874703a0316ae762a8b1b8', metadata={ ... 'page': 1, 'page_label': '2'}, page_content="providers including LangChain, and the addition of new members to MongoDB's AI partner ecosystem including Temporal\nand Galileo."),
           0.7424870729446411),
          (Document(id='6a874703a0316ae762a8b1b7', metadata={ ... 'page': 0, 'page_label': '1'}, page_content="Voyage AI models— including voyage-context-3 and rerank-2.5—the expansion of MongoDB's partnerships with major AI"),
           0.7193199396133423),
          (Document(id='6a874703a0316ae762a8b1b6', metadata={ ... 'page': 0, 'page_label': '1'}, page_content='customers to build accurate, trustworthy, and reliable AI applications at scale. This includes the launch of several new'),
           0.7121007442474365)]

         Semantic search results with pre-filtering:
         [(Document(id='6a874703a0316ae762a8b1b8', metadata={ ... 'page': 1, 'page_label': '2'}, page_content="providers including LangChain, and the addition of new members to MongoDB's AI partner ecosystem including Temporal\nand Galileo."),
           0.7424870729446411),
          (Document(id='6a874703a0316ae762a8b1de', metadata={ ... 'page': 1, 'page_label': '2'}, page_content='of new and evolving technologies, such as artificial intelligence, in our offerings or partnerships; our ability to effectively expand our sales and'),
           0.6821725368499756),
          (Document(id='6a874703a0316ae762a8b1bf', metadata={ ... 'page': 1, 'page_label': '2'}, page_content='experience to build for the future, the skills to drive AI-powered execution, and the opportunity to connect with experts for\n1:1 consulting and product demos.'),
           0.675220251083374)]

         Question: Which AI providers have partnerships with MongoDB?
         Answer: # MongoDB's AI Provider Partnerships

         Based on the provided context, MongoDB has partnerships with the following AI providers:

         1. **LangChain** - mentioned as a major AI provider partner
         2. **Voyage AI** - partnership that includes their models such as:
            - voyage-context-3
            - rerank-2.5
         3. **Temporal** - listed as a new member of MongoDB's AI partner ecosystem
         4. **Galileo** - listed as a new member of MongoDB's AI partner ecosystem

         The document indicates that MongoDB has "expanded partnerships with major AI providers" and is actively growing its "AI partner ecosystem" to make it faster and easier for customers to build accurate, trustworthy, and reliable AI applications at scale.

      .. note:: Code Output

         Your code output might differ from the sample output
         provided. LLM responses vary between requests, so the
         wording changes each time you run the file. The document
         IDs also differ on each run.
