.. procedure::
   :style: normal

   .. step:: Initialize your Go project.

      Run the following commands in your terminal 
      to create a new directory named ``langchaingo-mongodb`` and
      initialize your project:

      .. code-block::

         mkdir langchaingo-mongodb
         cd langchaingo-mongodb
         go mod init langchaingo-mongodb

   .. step:: Install dependencies.

      Run the following commands:

      .. code-block::

         go get github.com/joho/godotenv
         go get github.com/tmc/langchaingo/chains
         go get github.com/tmc/langchaingo/llms
         go get github.com/tmc/langchaingo/prompts
         go get github.com/tmc/langchaingo/vectorstores/mongovector
         go get go.mongodb.org/mongo-driver/v2/mongo

   .. step:: Initialize your environment variables.

      In your ``langchaingo-mongodb`` project directory, create a ``.env`` file
      and add the following lines:

      .. code-block::

         OPENAI_API_KEY="<api-key>"
         ATLAS_CONNECTION_STRING="<connection-string>"

      Replace the placeholder values with your OpenAI API Key and the |srv|
      :manual:`connection string
      </reference/connection-string/#find-your-mongodb-atlas-connection-string>` for your |service|
      {+cluster+}. Your connection string should use the following format:

      .. code-block::

         mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/<dbname>

   .. step:: Create your main file.

      In your ``langchaingo-mongodb`` project directory, create a file named
      ``main.go`` and then copy and paste the following code into the file. You
      will add code to this file throughout the tutorial.