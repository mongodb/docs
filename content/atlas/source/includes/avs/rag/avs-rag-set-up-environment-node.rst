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

      npm install mongodb voyageai langchain @langchain/community @xenova/transformers @huggingface/inference pdf-parse

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

   In your project, create a ``.env`` file to store your |service| connection
   string and Hugging Face access token.

   .. code-block::

      HUGGING_FACE_ACCESS_TOKEN = "<access-token>"
      VOYAGE_API_KEY = "<api-key>" # optional
      ATLAS_CONNECTION_STRING = "<connection-string>"

   Replace the ``<access-token>`` placeholder value with your Hugging Face access token.
   Optionally, you can replace the ``<api-key>`` placeholder value with your
   `Voyage API key <https://docs.voyageai.com/docs/api-key-and-installation>`__
   if you have one.

   .. include:: /includes/avs/shared/avs-replace-connection-string.rst

   .. include:: /includes/avs/shared/note-node-js-env-minimum-requirement.rst
