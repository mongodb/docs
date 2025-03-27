.. procedure:: 
   :style: normal 

   .. step:: Set up and initialize the .NET/C# project for the query.

      a. Create a new directory called ``create-index-tutorial`` and
         initialize your project with the dotnet new command. 
  
         .. code-block:: bash

            mkdir create-index-tutorial
            cd create-index-tutorial
            dotnet new console

      #. Add the .NET/C# Driver to your project as a dependency.

         .. code-block:: bash

            dotnet add package MongoDB.Driver

   .. step:: Copy and paste the query into the ``Program.cs`` file.

      .. literalinclude:: /includes/fts/search-index-management/csharp/CreateIndexTutorial.cs
         :caption: Program.cs
         :language: csharp
         :copyable:

   .. step:: Replace the ``<connection-string>`` in the query and then save the file.

      Ensure that your connection string includes your database user's
      credentials. To learn more, see :ref:`connect-via-driver`. 

   .. step:: Compile and run the ``Program.cs`` file.
      
      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            dotnet run csharp-create-index.csproj

         .. output::

            default
