.. procedure::
   :style: normal

   .. step:: Define code to run the local |llm|.

      Create a new file called ``LocalLLM.java`` and paste the following code.

      This code uses the ``getEmbedding`` and ``retrieveDocuments`` methods and
      the Ollama ``chatmodel`` to do the following:

      a. Connect to your local |service| {+deployment+} or your |service| {+cluster+}

      #. Generate an embedding for the query string using the ``getEmbedding``
         method you defined previously.

      #. Query the collection for relevant documents using the
         ``retrieveDocuments`` method.

         Our query includes an aggregation pipeline with a projection stage to
         return only the ``listing_url``, ``summary``, and vector ``score``
         fields. You can modify or remove this pipeline to better suit your data
         and use case.

      #. Create a context by concatenating a question with the retrieved
         documents using the ``createPrompt`` method.

      #. Feed the created prompt to the |llm| ``chatmodel`` you defined
         previously to generate a response.

      #. Print the question and generated response to the console.

         .. note::

            For demonstration purposes, we also print the filled-in prompt with
            context information. You should remove this line in a production
            environment.

      .. literalinclude:: /includes/avs/local-rag/LocalLLM.java
         :language: java
         :caption: LocalLLM.java

   .. step:: Download the local |llm| model.

      Run the following command to pull the generative model:

      .. code-block:: shell

         ollama pull mistral

   .. step:: Generate a response to a question on your data.

      Save and run the file to complete your |rag| implementation. The output
      resembles the following, although your generated response may vary:

      .. literalinclude:: /includes/avs/local-rag/llm-output-java.sh
         :language: shell
         :caption: Response output
