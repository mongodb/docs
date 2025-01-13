.. procedure:: 
   :style: normal 

   .. step:: Initialize your .NET project.

      Run the following commands in your terminal 
      to create a new directory named ``MyCompany.RAG.Local`` and
      initialize your project:

      .. code-block:: console

         dotnet new console -o MyCompany.RAG.Local
         cd MyCompany.RAG.Local

   .. step:: Install and import dependencies.

      .. tabs::

         .. tab:: .NET 9.x+
            :tabid: dotnet-nine

            Run the following commands:

            .. code-block:: console

               dotnet add package MongoDB.Driver --version 3.1.0
               dotnet add package Microsoft.Extensions.AI.Ollama --prerelease

         .. tab:: .NET 8.x
            :tabid: dotnet-eight

            Run the following commands:

            .. code-block:: console

               dotnet add package MongoDB.Driver --version 3.1.0
               dotnet add package Microsoft.Extensions.Configuration
               dotnet add package Microsoft.Extensions.Configuration.Json
               dotnet add package Microsoft.Extensions.AI --prerelease
               dotnet add package Microsoft.Extensions.AI.Ollama --prerelease

   .. step:: Set your connection string as an environment variable.

      Export your connection string, ``set`` it in PowerShell, or use your
      IDE's environment variable manager to make the connection string
      available to your project.
      
      .. code-block:: shell

         export ATLAS_CONNECTION_STRING="<connection-string>"
      
      Replace the ``<connection-string>`` placeholder value with your |service|
      connection string.

      .. tabs::

         .. tab:: Local {+Deployment+}
            :tabid: local

            If you're using a local |service| {+deployment+}, 
            your connection string follows this format, replacing
            ``<port-number>`` with the port for your local {+deployment+}.
            
            .. code-block::

               export ATLAS_CONNECTION_STRING="mongodb://localhost:<port-number>/?directConnection=true"

         .. tab:: Cloud {+Deployment+}
            :tabid: cloud

            If you're using an |service| {+cluster+}, your connection string
            follows this format, replacing ``"<connection-string>";``
            with your |service| {+cluster+}'s |srv| :manual:`connection string 
            </reference/connection-string/#find-your-mongodb-atlas-connection-string>`:
            
            .. code-block::

               export ATLAS_CONNECTION_STRING="<connection-string>"

            .. note:: 

               Your connection string should use the following format:

               .. code-block::

                  mongodb+srv://<db_username>:<db_password>@<clusterName>.<hostname>.mongodb.net
