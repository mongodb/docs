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

      npm install mongodb langchain @langchain/community @xenova/transformers @huggingface/inference pdf-parse

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
      ATLAS_CONNECTION_STRING = "<connection-string>"

   Replace the ``<access-token>`` 
   and ``<connection-string>`` placeholder values with your Hugging Face
   access token and the |srv| :manual:`connection string 
   </reference/connection-string/#find-your-mongodb-atlas-connection-string>`
   for your |service| {+cluster+}. Your connection string should use
   the following format:

   .. code-block::

      mongodb+srv://<db_username>:<db_password>@<clusterName>.<hostname>.mongodb.net

   .. include:: /includes/note-node-js-env-minimum-requirement.rst
