.. procedure::
   :style: normal
      
   .. step:: Define the query.

      a. In your project, replace the contents of the ``Program.cs``  file with the
         following code.
        
         .. literalinclude:: /includes/fts/sort/numbers-query.cs
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
              
            { "title" : "12 Years a Slave", "awards" : { "wins" : 267 } }
            { "title" : "Gravity", "awards" : { "wins" : 231 } }
            { "title" : "Gravity", "awards" : { "wins" : 231 } }
            { "title" : "Birdman: Or (The Unexpected Virtue of Ignorance)", "awards" : { "wins" : 210 } }
            { "title" : "Boyhood", "awards" : { "wins" : 185 } }
      