.. procedure:: 
   :style: normal 

   .. step:: Set up and initialize the .NET/C# project.

      .. code-block::

         # Create a new directory and initialize the project
         mkdir atlas-search-quickstart && cd atlas-search-quickstart
         dotnet new console

      .. code-block::
         
         # Add the MongoDB .NET/C# Driver to your project
         dotnet add package MongoDB.Driver

      For more detailed installation instructions, see the 
      :driver:`MongoDB .NET/C# Driver documentation </csharp/current/get-started>`.
   
   .. step:: Define the index.
   
      Paste the following code into the ``Program.cs`` file.

      .. literalinclude:: /includes/tutorial/code-snippets/csharp/CreateIndexTutorial.cs
         :caption: Program.cs
         :language: csharp
         :emphasize-lines: 5
         :linenos:
         :copyable:

      .. include:: /includes/index/shared/facts/find-connection-string.rst

   .. step:: Create the index.
   
      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            dotnet run Program.cs

         .. output::

            default
