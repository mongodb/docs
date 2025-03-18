.. procedure:: 
   :style: normal 

   .. step:: Create your .NET application.

      Run the following commands in your terminal 
      to create a new directory named ``sk-mongodb`` and
      initialize your application:

      .. code-block:: shell

         mkdir sk-mongodb
         cd sk-mongodb
         dotnet new console

   .. step:: Install dependencies.

      In your terminal, run the following commands to install the packages for this tutorial.

      .. code-block:: shell

         dotnet add package Microsoft.SemanticKernel
         dotnet add package Microsoft.SemanticKernel.Connectors.MongoDB --prerelease
         dotnet add package Microsoft.SemanticKernel.Connectors.OpenAI
         dotnet add package Microsoft.SemanticKernel.Memory
         dotnet add package Microsoft.SemanticKernel.Plugins.Memory --prerelease

   .. step:: Define environment variables.

      In your terminal, run the following commands to add your |service| {+cluster+}'s |srv| :manual:`connection string 
      </reference/connection-string/#find-your-mongodb-atlas-connection-string>` and OpenAI API Key to your environment.

      .. code-block:: shell

         export OPENAI_API_KEY="<Your OpenAI API Key>"
         export ATLAS_CONNECTION_STRING="<Your MongoDB Atlas SRV Connection String>"

      .. note:: 

         .. include:: /includes/fact-connection-string-format-drivers.rst