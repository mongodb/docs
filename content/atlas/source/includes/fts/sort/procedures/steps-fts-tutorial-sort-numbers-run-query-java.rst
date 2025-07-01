.. procedure::
   :style: normal
      
   .. step:: Define the query.

      a. Create a new file named ``SortByNumbers.java`` 
         and paste the following code:
      
         .. literalinclude:: /includes/fts/sort/numbers-query.java
            :language: java
            :linenos:
            :emphasize-lines: 27
      
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
   
            javac SortByNumbers.java
            java SortByNumbers
   
         .. output::
            :language: json
            :visible: false
   
            {"title": "12 Years a Slave", "awards": {"wins": 267}}
            {"title": "Gravity", "awards": {"wins": 231}}
            {"title": "Gravity", "awards": {"wins": 231}}
            {"title": "Birdman: Or (The Unexpected Virtue of Ignorance)", "awards": {"wins": 210}}
            {"title": "Boyhood", "awards": {"wins": 185}}
