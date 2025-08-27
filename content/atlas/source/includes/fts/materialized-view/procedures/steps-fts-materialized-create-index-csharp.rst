.. procedure:: 
   :style: normal 

   .. step:: Define the index.
   
      Paste the following code into the ``Program.cs`` file:

      .. literalinclude:: /includes/fts/materialized-view/CreateIndexExample.cs
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

            New index name: monthlySalesIndex
