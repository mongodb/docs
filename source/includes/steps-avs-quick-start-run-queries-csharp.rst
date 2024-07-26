.. procedure:: 
   :style: normal

   .. step:: Set up and initialize the .NET/C# project for the query.

      a. Create a new directory called ``query-quick-start`` and
         initialize your project with the dotnet new command. 
  
         .. code-block:: bash

            mkdir query-quick-start
            cd query-quick-start
            dotnet new console

      #. Add the .NET/C# Driver to your project as a dependency.

         .. code-block:: bash

            dotnet add package MongoDB.Driver

      For more detailed installation instructions, see the 
      :ref:`MongoDB C# Driver documentation <csharp-quickstart>`.

   .. step:: Construct your vector search query.

      a. Edit the ``Program.cs`` file.

      #. Copy and paste the following sample query into the 
         ``Program.cs`` file:

         .. literalinclude:: /includes/avs-examples/pipeline-stage-examples/basic-query.cs
            :language: csharp
            :linenos: 

      .. include:: /includes/fact-avs-quick-start-intro.rst
      
      To learn more about this pipeline stage, see
      :ref:`return-vector-search-results`.

   .. step:: Specify the ``<connection-string>``.

      a. Replace the ``<connection-string>`` with your |service| 
         connection string.

         Ensure that your connection string includes your database 
         user's credentials. To learn more, see 
         :ref:`connect-via-driver`. 
    
      #. Save the file.

   .. step:: Run your query.
    
      Compile and run the ``Program.cs`` file.
      
      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            dotnet run query-quick-start.csproj

         .. output:: /includes/avs-examples/pipeline-stage-examples/basic-query-csharp-output.js
            :language: js
            :linenos:
