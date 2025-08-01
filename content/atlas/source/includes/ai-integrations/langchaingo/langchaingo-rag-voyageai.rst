This section demonstrates a |rag| implementation using {+avs+} and LangChainGo.
Now that you've used {+avs+} to retrieve semantically similar documents, use the
following code example to prompt the LLM to answer questions against the
documents returned by {+avs+}.

.. procedure::
   :style: normal

   .. step:: Import the following dependencies.

      Add the following imports to the top of your ``main.go`` file.

      .. code-block:: go

         import (
           // Other imports...
           "strings"

           "github.com/tmc/langchaingo/llms/openai"
           "github.com/tmc/langchaingo/chains"
           "github.com/tmc/langchaingo/prompts"
           "github.com/tmc/langchaingo/vectorstores"
         )

   .. step:: Add the following code to the end of your main function and save the file.

      This code does the following:

      - Instantiates {+avs+} as a retriever to query for semantically similar
        documents.

      - Defines a LangChainGo prompt template to instruct the LLM to use the
        retrieved documents as context for your query. LangChainGo populates
        these documents into the ``{{.context}}`` input variable and your query
        into the ``{{.question}}`` variable.
    
      - Constructs a chain that uses OpenAI's chat model to generate
        context-aware responses based on the provided prompt template.

      - Sends a sample query about painting for beginners to the chain, using
        the prompt and the retriever to gather relevant context.

      - Returns and prints the |llm|'s response and the documents used as
        context.

      .. literalinclude:: /includes/ai-integrations/langchaingo/langchaingo-perform-qa-voyageai.go
         :language: go
         :copyable:
         :dedent:

   .. step:: Run the following command to execute your file.

      After you save the file, run the following command. The generated response
      might vary.

      .. io-code-block::
         :copyable: true

         .. input::
            :language: sh

            go run main.go

         .. output::
            :language: json
            :visible: false

            Source documents: 
            Document 1: "Successful oil painting necessitates patience,
            proper equipment, and technique. Begin with a carefully
            prepared, primed canvas. Sketch your composition lightly before
            applying paint. Use high-quality brushes and oils to create
            vibrant, long-lasting artworks. Remember to paint 'fat over
            lean,' meaning each subsequent layer should contain more oil to
            prevent cracking. Allow each layer to dry before applying
            another. Clean your brushes often and avoid solvents that might
            damage them. Finally, always work in a well-ventilated space."
            Question: How do I get started painting? 
            Generated Answer: To get started painting, you should begin with a
            carefully prepared, primed canvas. Sketch your composition lightly
            before applying paint. Use high-quality brushes and oils to create
            vibrant, long-lasting artworks. Remember to paint 'fat over lean,'
            meaning each subsequent layer should contain more oil to prevent
            cracking. Allow each layer to dry before applying another. Clean
            your brushes often and avoid solvents that might damage them.
            Finally, always work in a well-ventilated space.
