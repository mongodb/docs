.. procedure:: 
   :style: normal 

   .. step:: Set up and initialize the .NET/C# project for the query.

      a. Create a new directory called ``case-insensitive-sort`` and
         initialize your project with the dotnet new command. 
  
         .. code-block:: bash

            mkdir case-insensitive-sort
            cd case-insensitive-sort
            dotnet new console

      #. Add the .NET/C# Driver to your project as a dependency.

         .. code-block:: bash

            dotnet add package MongoDB.Driver

   .. step:: Copy and paste the query into the ``Program.cs`` file.

      .. include:: /includes/fts/extracts/fts-normalized-sort-query-desc.rst

      .. include:: /includes/fts/extracts/fts-normalized-sort-query-stages.rst

      .. literalinclude:: /includes/fts/case-insensitive/query.cs
         :language: csharp
         :linenos:
         :dedent:
         :emphasize-lines: 10, 20

   .. step:: Replace the ``<connection-string>`` in the query and then save the file.

      Ensure that your connection string includes your database user's
      credentials. To learn more, see :ref:`connect-via-driver`. 

   .. step:: Compile and run the ``Program.cs`` file.

      .. io-code-block::
         :copyable: true

         .. input::
            :language: bash
        
            dotnet run case-insensitive-sort.csproj

         .. output:: 
            :language: javascript

            { "_id" : ObjectId("573a139cf29313caabcf662c"), "title" : "Atomic Train", "awards" : { "wins" : 1, "nominations" : 1 }, "score" : 3.3035578727722168 }
            { "_id" : ObjectId("64de50ae2932de4dd3203061"), "title" : "atomic train", "awards" : { "wins" : 1, "nominations" : 1 }, "score" : 3.3035578727722168 }
            { "_id" : ObjectId("573a13bbf29313caabd52ff4"), "title" : "How to Train Your Dragon", "awards" : { "wins" : 32, "nominations" : 51 }, "score" : 2.2186923027038574 }
            { "_id" : ObjectId("64de50da2932de4dd3204393"), "title" : "how to train your dragon", "awards" : { "wins" : 32, "nominations" : 51 }, "score" : 2.2186923027038574 }
            { "_id" : ObjectId("573a13ccf29313caabd83281"), "title" : "How to Train Your Dragon 2", "awards" : { "wins" : 18, "nominations" : 52 }, "score" : 1.9997868537902832 }

      .. include:: /includes/fts/extracts/fts-normalized-sort-query-results.rst 

      .. code-block:: shell 
         :copyable: false 

         { "_id" : ObjectId("573a139cf29313caabcf662c"), "title" : "Atomic Train", "awards" : { "wins" : 1, "nominations" : 1 }, "score" : 3.3035225868225098 }
         { "_id" : ObjectId("573a13bbf29313caabd52ff4"), "title" : "How to Train Your Dragon", "awards" : { "wins" : 32, "nominations" : 51 }, "score" : 2.2186522483825684 }
         { "_id" : ObjectId("573a13ccf29313caabd83281"), "title" : "How to Train Your Dragon 2", "awards" : { "wins" : 18, "nominations" : 52 }, "score" : 1.9997482299804688 }
         { "_id" : ObjectId("573a13b1f29313caabd36490"), "title" : "Howard Zinn: You Can't Be Neutral on a Moving Train", "awards" : { "wins" : 1, "nominations" : 0 }, "score" : 1.4338588714599609 }
         { "_id" : ObjectId("573a13c8f29313caabd78a6b"), "title" : "Last Train Home", "awards" : { "wins" : 14, "nominations" : 9 }, "score" : 2.8405368328094482 }

      .. include:: /includes/fts/extracts/fts-normalized-sort-query-run-query.rst 
        