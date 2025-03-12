.. procedure:: 
   :style: normal 

   .. step:: Initialize your Go project.

      Run the following commands in your terminal 
      to create a new directory named ``local-rag-mongodb`` and
      initialize your project:

      .. code-block:: console

         mkdir local-rag-mongodb
         cd local-rag-mongodb
         go mod init local-rag-mongodb

   .. step:: Install and import dependencies.

      Run the following commands:

      .. code-block:: console

         go get github.com/joho/godotenv
         go get go.mongodb.org/mongo-driver/v2/mongo
         go get github.com/tmc/langchaingo/llms
         go get github.com/tmc/langchaingo/llms/ollama
         go get github.com/tmc/langchaingo/prompts

   .. step:: Create a ``.env`` file.

      In your project, create a ``.env`` file to store your connection string.
      
      .. code-block::
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
            
            .. code-block::

               ATLAS_CONNECTION_STRING = "mongodb://localhost:<port-number>/?directConnection=true"

         .. tab:: Cloud {+Deployment+}
            :tabid: cloud

            If you're using an |service| {+cluster+}, your connection string
            follows this format, replacing ``"<connection-string>";``
            with your |service| {+cluster+}'s |srv| :manual:`connection string 
            </reference/connection-string/#find-your-mongodb-atlas-connection-string>`:
            
            .. code-block::

               ATLAS_CONNECTION_STRING = "<connection-string>"

            .. note:: 

               Your connection string should use the following format:

               .. code-block::

                  mongodb+srv://<db_username>:<db_password>@<clusterName>.<hostname>.mongodb.net
