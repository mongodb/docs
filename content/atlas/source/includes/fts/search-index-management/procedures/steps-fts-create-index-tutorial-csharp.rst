a. Set up and initialize the .NET/C# project for the query.

   Create a new directory called ``atlas-search-quickstart`` and
   initialize your project with the dotnet new command. 

   .. code-block:: bash

      mkdir atlas-search-quickstart
      cd atlas-search-quickstart
      dotnet new console

   Then, add the .NET/C# Driver to your project as a dependency.

   .. code-block:: bash

      dotnet add package MongoDB.Driver

   For more detailed installation instructions, see the 
   :driver:`MongoDB C# Driver documentation </csharp/current/get-started>`.
   
#. Copy and paste the query into the ``Program.cs`` file.

   .. literalinclude:: /includes/fts/search-index-management/csharp/CreateIndexTutorial.cs
      :caption: Program.cs
      :language: csharp
      :copyable:

#. Specify the ``<connection-string>``.

   .. include:: /includes/steps-connection-string-drivers-hidden.rst

#. Compile and run the file to create the index.
   
   .. io-code-block::
      :copyable: true

      .. input::
         :language: shell

         dotnet run Program.cs

      .. output::

         default
