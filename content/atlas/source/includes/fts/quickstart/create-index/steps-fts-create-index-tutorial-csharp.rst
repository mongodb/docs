a. Set up and initialize the .NET/C# project.

   .. code-block::

      # Create a new directory and initialize the project
      mkdir atlas-search-quickstart && cd atlas-search-quickstart
      dotnet new console

   .. code-block::
      
      # Add the MongoDB .NET/C# Driver to your project
      dotnet add package MongoDB.Driver

   For more detailed installation instructions, see the 
   :driver:`MongoDB C# Driver documentation </csharp/current/get-started>`.
   
#. Define the index.
   
   Paste the following code into the ``Program.cs`` file.

   .. literalinclude:: /includes/fts/search-index-management/csharp/CreateIndexTutorial.cs
      :caption: Program.cs
      :language: csharp
      :emphasize-lines: 5
      :linenos:
      :copyable:

   .. include:: /includes/steps-connection-string-drivers-hidden.rst

#. Create the index.
   
   .. io-code-block::
      :copyable: true

      .. input::
         :language: shell

         dotnet run Program.cs

      .. output::

         default
