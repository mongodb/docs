.. procedure::
   :style: normal
      
   .. step:: Define the query.

      a. Create a new file named ``SortByDate.java`` 
         and paste the following code:
      
         .. literalinclude:: /includes/fts/sort/date-tutorial.java
            :language: java
            :linenos:
            :emphasize-lines: 33
      
         .. note:: 
      
            To run the sample code in your Maven environment, add the 
            following code above the import statements in your file.
      
            .. code-block:: 
      
               package com.mongodb.drivers;
      
      #. Specify the ``<connection-string>``.

   .. step:: Run the query.

      .. io-code-block::
         :copyable: true
   
         .. input::
            :language: bash
   
            javac SortByDate.java
            java SortByDate
   
         .. output::
            :language: json
            :visible: false
         
            {"title": "Summer Nights", "released": {"$date": "2015-01-28T00:00:00Z"}, "score": 0.348105788230896}
            {"title": "Summertime", "released": {"$date": "2014-08-01T00:00:00Z"}, "score": 0.5917375683784485}
            {"title": "Summer of Blood", "released": {"$date": "2014-04-17T00:00:00Z"}, "score": 0.9934720396995544}
            {"title": "Summer Games", "released": {"$date": "2012-02-08T00:00:00Z"}, "score": 0.15982933342456818}
            {"title": "Summer of Goliath", "released": {"$date": "2011-07-08T00:00:00Z"}, "score": 0.13038821518421173}

