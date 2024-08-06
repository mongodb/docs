
.. procedure::
   :style: normal

   .. step:: Instantiate |service| as a vector database.
   
      The following code uses the LangChain integration for 
      {+avs+} to instantiate your local |service| {+deployment+} 
      or your |service| {+cluster+} as a vector database, also 
      called a `vector store 
      <https://python.langchain.com/docs/modules/data_connection/vectorstores/>`__.

      .. code-block:: python

         from langchain_mongodb import MongoDBAtlasVectorSearch

         # Instantiate vector store
         vector_store = MongoDBAtlasVectorSearch(
            collection=collection,
            embedding=model,
            index_name="vector_index",
            embedding_key="embeddings",
            text_key="summary")

      You can also run the following code to execute a sample 
      semantic search query:

      .. io-code-block:: 
         :copyable: true 

         .. input:: 
            :language: python

            import pprint

            query = "beach house"
            results = vector_store.similarity_search(query)
            pprint.pprint(results)
         
         .. output:: 
            :language: JSON

            [Document(page_content='Beach house with contemporary interior', metadata={'_id': '22123688', 'listing_url': 'https://www.airbnb.com/rooms/22123688', 'name': 'Bungan Beach House', ... }),
            Document(page_content="Well done !!! you won't find a better location in Manly. The “Beach House” Apartments overlook Cabbage Tree Bay Aquatic Reserve between Manly and Shelly Beach, in one of Manly's premier locations  Swim, dive, snorkel, surf, paddle board, coastal walkways, ocean pool, restaurants, all literally at your doorstep, or simply chill and unwind. Manly is amazing, I look forward to welcoming you", metadata={'_id': '18917022', 'listing_url': 'https://www.airbnb.com/rooms/18917022', 'name': 'Beach House Manly Apartment 4', ... }]}),
            Document(page_content='Beautiful spacious two story beach house that has an amazing private gated grass area fronting Makaha beach. Perfect for family BBQ,s while watching the sun set into the ocean. Room for 10 people. Four night minimum stay required', metadata={'_id': '7099038', 'listing_url': 'https://www.airbnb.com/rooms/7099038', 'name': 'Ocean front Beach House in Makaha', ... }]}),
            Document(page_content='Beautifully finished, newly renovated house with pool. The ultimate in indoor/outdoor living. Excellent finishes and a short stroll to the beach.', metadata={'_id': '19768051', 'listing_url': 'https://www.airbnb.com/rooms/19768051', 'name': 'Ultra Modern Pool House Maroubra', ... }]})]
      
      .. seealso::

         - :ref:`langchain-run-queries`

   .. step:: Download and configure the local |llm|.

      a. Click the following button to download the Mistral 7B model
         from GPT4All. To explore other models, refer to the 
         `GPT4All website <https://gpt4all.io/index.html>`__.

         .. button:: Download
            :uri: https://gpt4all.io/models/gguf/mistral-7b-openorca.gguf2.Q4_0.gguf

      #. Paste the following code in your notebook to configure the |llm|.
         Before running, replace ``<path-to-model>`` with 
         the path where you saved the |llm| locally.

         .. code-block:: python

            from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler
            from langchain_community.llms import GPT4All

            # Configure the LLM
            local_path = "<path-to-model>"

            # Callbacks support token-wise streaming
            callbacks = [StreamingStdOutCallbackHandler()]

            # Verbose is required to pass to the callback manager
            llm = GPT4All(model=local_path, callbacks=callbacks, verbose=True)

   .. step:: Answer questions on your data.

      Run the following code to complete your |rag| implementation.
      This code does the following:

      - Instantiates {+avs+} as a `retriever 
        <https://python.langchain.com/docs/modules/data_connection/retrievers/>`__
        to query for similar documents.
      
      - Creates the following LangChain-specific components:
       
        - A `prompt template 
          <https://python.langchain.com/docs/modules/model_io/prompts/quick_start#prompttemplate>`__
          to instruct the |llm| to use 
          the retrieved documents as context for your query.
          LangChain passes these documents to the ``{context}`` input
          variable and your query to the ``{question}`` variable.
       
        - A `chain <https://python.langchain.com/docs/modules/chains>`__
          that specifies {+avs+} as the retriever, the prompt 
          template that you wrote, and the local |llm| that you configured 
          to generate a context-aware response.

      - Prompts the |llm| with a sample query and returns the response. 
        The generated response might vary.
   
      .. io-code-block:: 
         :copyable: true 

         .. input:: 
            :language: python

            from langchain_core.prompts import PromptTemplate
            from langchain_core.output_parsers import StrOutputParser
            from langchain_core.runnables import RunnablePassthrough

            # Instantiate Atlas Vector Search as a retriever
            retriever = vector_store.as_retriever()

            # Define prompt template
            template = """
            Use the following pieces of context to answer the question at the end.
            {context}
            Question: {question}
            """
            custom_rag_prompt = PromptTemplate.from_template(template)

            def format_docs(docs):
               return "\n\n".join(doc.page_content for doc in docs)

            # Create chain   
            rag_chain = (
               {"context": retriever | format_docs, "question": RunnablePassthrough()}
               | custom_rag_prompt
               | llm
               | StrOutputParser()
            )

            # Prompt the chain
            question = "Can you recommend me a few AirBnBs that are beach houses? Include a link to the listings."
            answer = rag_chain.invoke(question)

            # Return source documents
            documents = retriever.invoke(question)
            print("\nSource documents:")
            pprint.pprint(documents)

         .. output:: 

            Answer: Yes, I can recommend a few AirBnBs that are beach houses. Here are some links to their respective listings:
            1. Oceanfront home on private, gated property - https://www.airbnb.com/rooms/15073739
            2. Ground Floor, Oceanfront condo with complete remodeling - https://www.airbnb.com/rooms/14687148
            3. 4 bedroom house in a great location with ocean views and free salt water pool - https://www.airbnb.ca/s?host_id=740644

            Source documents:
            [Document(page_content='Please look for Airbnb numb (Phone number hidden by Airbnb) to book with us.  We do not take bookings through this one.  It is live for others to read reviews.  Oceanfront home on private, gated property.  This unique property offers year-round swimming, private beach access and astounding ocean and mountain views.  Traveling with a large group? Another 3 bedroom home is available for rent on this spacious property. Visit https://www.airbnb.com/rooms/15073739 or contact us for more information.', metadata={'_id': '14827972', 'listing_url': 'https://www.airbnb.com/rooms/14827972', 'name': 'Oceanfront Beach House Makai', ... }]}),
            Document(page_content='This GROUND FLOOR, OCEANFRONT condo is just feet from ocean access. Completely remodeled kitchen, bathroom and living room, with queen size bed in the bedroom, and queen size convertible sofa bed in the living room. Relax with the 55" SMART blue ray DVD, cable, and free WiFi. With ceiling fans in each room and trade winds, this condo rarely need the air conditioning unit in the living room. Airbnb charges a reservation fee to all guests at the time of booking. Please see "Other Things to Note"', metadata={'_id': '18173803', 'listing_url': 'https://www.airbnb.com/rooms/18173803', 'name': 'Papakea A108', ... }]}),
            Document(page_content='2 minutes to bus stop, beach - Cafes, Sun, Surf & Sand. 4 Secure rooms in older style, 4 bedroom house. Can squeeze in up to 15 guests (9 beds, 2 sofa beds in lounge & a single sofa mattress) BUT is best suited to 10-12 people Wireless Internet, under cover parking, unlimited street parking.', metadata={'_id': '2161945', 'listing_url': 'https://www.airbnb.com/rooms/2161945', 'name': 'Sand Sun Surf w Parking. City 9km', ... }]}),
            Document(page_content='High Quality for a third of the price! Great Location & Ocean Views! FREE Salt Water Roof-Deck Pool, Activities & Rental Car Desk! Hassle-Free Self Check-In via Lockbox. Located In Famous Waikiki: Easily walk to Beaches, Shops/all Restaurants! Hawaiian Convention Center is only 2 Blocks Away!  On-Site Garage $. See my similar listings if your dates are not available. https://www.airbnb.ca/s?host_id=740644', metadata={'_id': '13146333', 'listing_url': 'https://www.airbnb.com/rooms/13146333', 'name': '~TROPICAL DREAM VACATION~ Ocean View', ... }]})]
