.. procedure::
   :style: normal

   .. step:: Create a new directory and initialize your .NET/C# project.

      Create a directory for your project. This example uses a directory called
      ``query-quick-start``. 

      .. code-block:: bash

         mkdir query-quick-start
         cd query-quick-start
         dotnet new console

   .. step::  Add the .NET/C# Driver to your project as a dependency.

      The following code adds the .NET/C# Driver to your project.

      .. code-block:: bash

         dotnet add package MongoDB.Driver

      For more detailed installation instructions, see the 
      `MongoDB C# Driver documentation <https://www.mongodb.com/docs/drivers/csharp/current/quick-start/>`__.

   .. step:: Define your index in a new file.

      This example uses a file named ``IndexService.cs`` with the following
      index definition:

      .. literalinclude:: /includes/search-in-community/basic-example.cs
         :language: csharp
         :copyable: true
         :caption: IndexService.cs
         :emphasize-lines: 11
         :linenos:

      .. include:: /includes/search-in-community/vs-quick-start-basic-index-description.rst

      This code also includes a polling mechanism to check if the index is ready to use.

   .. step:: Specify your ``<connection-string>``.

      .. include:: /includes/search-in-community/steps-connection-string-drivers-hidden.rst

   .. step:: Initialize the class and call the method to create the index in your ``Program.cs`` file:

      .. code-block:: csharp
         :copyable: true
         :caption: Program.cs

         using query_quick_start;

         var indexService = new IndexService();
         indexService.CreateVectorIndex();

   .. step:: Create your index.

      Compile and run your project to create the search index. 

      For example, the following operation compiles the search index specified
      in ``IndexService.cs``. 
   
      .. io-code-block::
         :copyable: true

         .. input::
            :language: bash

            dotnet run query-quick-start.csproj

         .. output:: /includes/search-in-community/create-index-output.sh
            :language: sh
            :linenos:

   .. step:: Define your query in a new file.

      This example uses new file called ``DatabaseService.cs`` with
      the following sample query:

      .. literalinclude:: /includes/search-in-community/basic-query-db-service.cs
         :language: csharp
         :caption: DatabaseService.cs
         :emphasize-lines: 11
         :linenos:

      .. include:: /includes/search-in-community/fact-vs-quick-start-intro-II.rst
      
      To learn more about this pipeline stage, see
      :ref:`return-vector-search-results`.

   .. step:: Specify your ``<connection-string>``.

      .. include:: /includes/search-in-community/steps-connection-string-drivers-hidden.rst

   .. step:: Update your ``Program.cs`` file.

      Remove the index creation code from your ``Program.cs`` file and replace
      it with your query file. 
      
      For example, the following operation initializes the ``DatabaseService``
      object and calls the method to run the query:

      .. code-block:: csharp
         :copyable: true
         :caption: Program.cs

         using query_quick_start;

         var databaseService = new DatabaseService();
         databaseService.RunVectorQuery();

   .. step:: Run your query.

      Compile and run your project.

      The following code compiles and runs the ``query-quick-start.csproj`` project.
      
      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            dotnet run query-quick-start.csproj

         .. output:: /includes/search-in-community/basic-query-csharp-output.js
            :language: js
            :linenos: