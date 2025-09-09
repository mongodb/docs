a. Initialize your Node.js project.

   Run the following commands in your terminal 
   to create a new directory named ``rag-mongodb`` and
   initialize your project:

   .. code-block::

      mkdir rag-mongodb
      cd rag-mongodb
      npm init -y

#. Install and import dependencies.

   Run the following command:

   .. code-block::

      npm install mongodb voyageai openai @huggingface/inference @xenova/transformers langchain @langchain/community pdf-parse

#. Update your ``package.json`` file.

   In your project's ``package.json`` file, specify the 
   ``type`` field as shown in the following example,
   and then save the file.

   .. code-block:: javascript
      :emphasize-lines: 3

      {
         "name": "rag-mongodb",
         "type": "module",
         ...

#. Create a ``.env`` file.

   In your project, create a ``.env`` file to store your MongoDB connection
   string and API keys for the models that you want to use:

   .. code-block::

      MONGODB_URI = "<connection-string>"
      VOYAGE_API_KEY = "<voyage-api-key>"       # If using Voyage AI embedding model
      HUGGING_FACE_ACCESS_TOKEN = "<hf-token>"  # If using Hugging Face embedding or generative model
      OPENAI_API_KEY = "<openai-api-key>"       # If using OpenAI generative model

   .. include:: /includes/search-shared/find-connection-string.rst

   .. include:: /includes/avs/shared/note-node-js-env-minimum-requirement.rst
