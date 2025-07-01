.. procedure::
   :style: normal
      
   .. step:: Define the query.

      a. Create a new file named ``SortByDate.kt`` 
         and paste the following code:
      
         .. literalinclude:: /includes/fts/sort/date-tutorial.kt
            :language: kotlin
            :linenos:
            :emphasize-lines: 12
      
      #. Specify the ``<connection-string>``.

   .. step:: Run the query.
   
      .. io-code-block::
         :copyable: true

         .. input::
            :language: bash

            kotlin SortByDate.kt

         .. output::
            :language: json
            :visible: false
   
            Document{{title=Summer Nights, released=Tue Jan 27 19:00:00 EST 2015, score=0.348105788230896}}
            Document{{title=Summertime, released=Thu Jul 31 20:00:00 EDT 2014, score=0.5917375683784485}}
            Document{{title=Summer of Blood, released=Wed Apr 16 20:00:00 EDT 2014, score=0.9934720396995544}}
            Document{{title=Summer Games, released=Tue Feb 07 19:00:00 EST 2012, score=0.15982933342456818}}
            Document{{title=Summer of Goliath, released=Thu Jul 07 20:00:00 EDT 2011, score=0.13038821518421173}}

