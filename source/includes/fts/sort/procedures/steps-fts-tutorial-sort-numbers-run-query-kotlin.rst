.. procedure::
   :style: normal
      
   .. step:: Define the query.

      a. Create a new file named ``SortByNumbers.kt`` 
         and paste the following code:
          
         .. literalinclude:: /includes/fts/sort/numbers-query.kt
            :language: kotlin
            :linenos:
            :emphasize-lines: 10
      
      #. Specify the ``<connection-string>``.

   .. step:: Run the query.
          
      .. io-code-block::
         :copyable: true

         .. input::
            :language: bash

            kotlin SortByNumbers.kt
         
         .. output::
            :language: json
            :visible: false
   
            Document{{title=12 Years a Slave, awards=Document{{wins=267}}}}
            Document{{title=Gravity, awards=Document{{wins=231}}}}
            Document{{title=Gravity, awards=Document{{wins=231}}}}
            Document{{title=Birdman: Or (The Unexpected Virtue of Ignorance), awards=Document{{wins=210}}}}
            Document{{title=Boyhood, awards=Document{{wins=185}}}}

