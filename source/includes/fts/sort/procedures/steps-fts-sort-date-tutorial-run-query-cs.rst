.. procedure::
   :style: normal
   
   .. step:: Define the query.

      a. Replace the contents of the ``Program.cs`` file with the
         following code.
      
         .. literalinclude:: /includes/fts/sort/date-tutorial.cs
            :language: csharp
            :linenos:
            :dedent:
            :emphasize-lines: 9
      
      #. Specify the ``<connection-string>``.
      
   .. step:: Run the query.
      
      .. io-code-block::
         :copyable: true
      
         .. input::
            :language: bash
      
            dotnet run Program.cs
      
         .. output::
            :language: json
            :visible: false
      
            { "released" : ISODate("2015-01-28T00:00:00Z"), "title" : "Summer Nights", "score" : 0.348105788230896 }
            { "released" : ISODate("2014-08-01T00:00:00Z"), "title" : "Summertime", "score" : 0.59173756837844849 }
            { "released" : ISODate("2014-04-17T00:00:00Z"), "title" : "Summer of Blood", "score" : 0.99347203969955444 }
            { "released" : ISODate("2014-01-17T00:00:00Z"), "title" : "Summer in February", "score" : 0.62580311298370361 }
            { "released" : ISODate("2012-02-08T00:00:00Z"), "title" : "Summer Games", "score" : 0.15982933342456818 }
            