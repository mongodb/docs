.. procedure:: 
   :style: normal

   .. step:: Construct your vector search query.

      .. include:: /includes/avs/facts/fact-avs-quick-start-intro.rst

      a. Create a new file called ``DatabaseService.cs``.

      #. Copy and paste the following sample query into the 
         ``DatabaseService.cs`` file:

         .. literalinclude:: /includes/avs/pipeline-stage-examples/basic-query-db-service.cs
            :language: csharp
            :caption: DatabaseService.cs
            :emphasize-lines: 11
            :linenos:

      .. include:: /includes/avs/facts/fact-avs-quick-start-intro-II.rst
      
      To learn more about this pipeline stage, see
      :ref:`return-vector-search-results`.

   .. step:: Specify the ``<connection-string>``.

      .. include:: /includes/steps-connection-string-drivers-hidden.rst

   .. step:: Update your ``Program.cs`` file.

      Remove the index creation code from your ``Program.cs`` file. Instead,
      initialize the ``DatabaseService`` object and call the method to run the
      query:

      .. code-block:: csharp
         :copyable: true
         :caption: Program.cs

         using query_quick_start;

         var databaseService = new DatabaseService();
         databaseService.RunVectorQuery();

   .. step:: Run your query.
    
      Compile and run your project.
      
      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            dotnet run query-quick-start.csproj

         .. output:: /includes/avs/pipeline-stage-examples/basic-query-csharp-output.js
            :language: js
            :linenos:
