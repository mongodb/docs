.. procedure:: 
   :style: normal 

   .. step:: Set up and initialize the .NET/C# project.

      In your terminal, navigate to where you want to create your application, 
      then run the following command to create a directory called 
      ``atlas-search-project`` and initialize your project in that directory: 

      .. literalinclude:: /includes/fts/field-types/initialize-project-csharp.sh
         :language: shell
         :copyable: true

      For more detailed installation instructions, see the 
      :driver:`MongoDB C# Driver documentation </csharp/current/get-started>`.
   
   .. step:: Define the index.
   
      Paste the following code into the ``Program.cs`` file.

      .. literalinclude:: /includes/fts/field-types/vector/CreateIndex.cs
         :caption: Program.cs
         :language: csharp
         :linenos:
         :copyable:

      .. include:: /includes/search-shared/find-connection-string.rst
   
   .. step:: Create the index.
   
      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            dotnet run Program.cs

         .. output::
            :visible: false

            New index name: default