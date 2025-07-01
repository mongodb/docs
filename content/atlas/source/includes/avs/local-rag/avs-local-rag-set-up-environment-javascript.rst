.. procedure:: 
   :style: normal 

   .. step:: Initialize your Node.js project.

      Run the following commands in your terminal 
      to create a new directory named ``local-rag-mongodb`` and
      initialize your project:

      .. code-block:: console

         mkdir local-rag-mongodb
         cd local-rag-mongodb
         npm init -y

   .. step:: Install and import dependencies.

      Run the following command:

      .. code-block:: console

         npm install mongodb @xenova/transformers node-gyp gpt4all

   .. step:: Update your ``package.json`` file.

      In your project's ``package.json`` file, specify the 
      ``type`` field as shown in the following example,
      and then save the file.

      .. code-block:: json
         :emphasize-lines: 3
         :caption: package.json

         {
            "name": "local-rag-mongodb",
            "type": "module",
            ...
         }

   .. step:: Create a ``.env`` file.

      In your project, create a ``.env`` file to store your connection string.
      
      .. code-block:: javascript
         :caption: .env

         ATLAS_CONNECTION_STRING = "<connection-string>"
      
      Replace the ``<connection-string>`` placeholder value with your |service|
      connection string.

      .. tabs::

         .. tab:: Local {+Deployment+}
            :tabid: local

            If you're using a local |service| {+deployment+}, 
            your connection string follows this format, replacing
            ``<port-number>`` with the port for your local {+deployment+}.
            
            .. code-block:: javascript

               ATLAS_CONNECTION_STRING = "mongodb://localhost:<port-number>/?directConnection=true";

         .. tab:: Cloud {+Deployment+}
            :tabid: cloud

            If you're using an |service| {+cluster+}, your connection string
            follows this format, replacing ``"<connection-string>";``
            with your |service| {+cluster+}'s |srv| :manual:`connection string 
            </reference/connection-string/#find-your-mongodb-atlas-connection-string>`:
            
            .. code-block:: javascript

               ATLAS_CONNECTION_STRING = "<connection-string>";

            .. note:: 

               Your connection string should use the following format:

               .. code-block::

                  mongodb+srv://<db_username>:<db_password>@<clusterName>.<hostname>.mongodb.net
                  
      .. include:: /includes/avs/shared/note-node-js-env-minimum-requirement.rst
