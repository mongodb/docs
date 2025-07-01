
.. procedure::
   :style: normal

   .. step:: Query the database for relevant documents.
   
      Create a file called ``retrieve-documents.js`` and paste the following
      code into it:
      
      .. literalinclude:: /includes/avs/local-rag/retrieve-documents.js
         :language: javascript
         :caption: retrieve-documents.js

      This code performs a vector query on your local |service|
      {+deployment+} or your |service| {+cluster+}.

      Run a test query to confirm you're getting the expected results. Create
      a new file called ``test-query.js``, and paste the following code into it:

      .. literalinclude: /includes/avs/local-rag/test-query.js
         :language: javascript
         :caption: test-query.js

      Run the following code to execute the query:

      .. io-code-block:: 
         :copyable: true 

         .. input:: 
            :language: console

            node --env-file=.env test-query.js

         .. output:: /includes/avs/local-rag/test-query-output.sh
            :visible: false

   .. step:: Download the local |llm| and model information mapping.

      a. Click the following button to download the Mistral 7B model
         from GPT4All. To explore other models, refer to the 
         `GPT4All website <https://gpt4all.io/index.html>`__.

         .. button:: Download
            :uri: https://gpt4all.io/models/gguf/mistral-7b-openorca.gguf2.Q4_0.gguf

      #. Move this model into your ``local-rag-mongodb`` project directory.

      #. In your project directory, download the file that contains the model
         information.

         .. code-block:: console

            curl -L https://gpt4all.io/models/models3.json -o ./models3.json

   .. step:: Answer questions on your data.

      Create a file called ``local-llm.js`` and paste the following code:

      .. literalinclude:: /includes/avs/local-rag/local-llm.js
         :language: javascript
         :caption: local-llm.js
    
      This code does the following:

      - Creates an embedding for your query string.

      - Queries for relevant documents.

      - Prompts the |llm| and returns the response. The generated response
        might vary.

      Run the following code to complete your |rag| implementation:
   
      .. io-code-block:: 
         :copyable: true 

         .. input:: 
            :language: console

            node --env-file=.env local-llm.js

         .. output:: /includes/avs/local-rag/llm-output.sh
