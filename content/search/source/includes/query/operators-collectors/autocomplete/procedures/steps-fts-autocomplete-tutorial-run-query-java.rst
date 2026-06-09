.. procedure::
   :style: normal
      
   .. step:: Ensure that your ``CLASSPATH`` contains the following libraries.
      
      .. list-table::
         :widths: 30 70 
      
         * - ``junit``
           - 4.11 or higher version 
      
         * - ``mongodb-driver-sync``
           - 4.3.0 or higher version
      
         * - ``slf4j-log4j12``
           - 1.7.30 or higher version
      
   .. step:: Run a |fts| query with the ``autocomplete`` operator on the ``movies`` collection.
      
      a. Create a file named ``AutocompleteQuery.java``.
      #. Copy and paste the following code into the ``AutocompleteQuery.java`` file.
      
         The code example performs the following tasks:
      
         .. include:: /includes/query/operators-collectors/autocomplete/facts/fts-autocomplete-query-tasks.rst 
         
         .. literalinclude:: /includes/query/operators-collectors/autocomplete/code-snippets/java/tutorial.java
            :language: java
            :linenos:
            :dedent:
            :emphasize-lines: 17
      
         .. note:: 
      
            To run the sample code in your Maven environment, add the 
            following above the import statements in your file.
      
            .. code-block:: 
      
               package com.mongodb.drivers;
      
      #. .. include:: /includes/shared/facts/fact-fts-driver-connection-string.rst
      #. Compile and run ``AutocompleteQuery.java`` file.
      
         .. io-code-block::
            :copyable: true
      
            .. input::
               :language: bash
      
               javac AutocompleteQuery.java
               java AutocompleteQuery
            
            .. output::
               :language: json
               :visible: true
               
               {"title": "Gertie the Dinosaur"}
               {"title": "Germany Year Zero"}
               {"title": "Germany in Autumn"}
               {"title": "Germany Pale Mother"}
               {"title": "Gerhard Richter - Painting"}
               {"title": "Geronimo: An American Legend"}
               {"title": "How to Live in the German Federal Republic"}
               {"title": "Geri's Game"}
               {"title": "The Gerson Miracle"}
               {"title": "The German Doctor"}
               {"title": "From Caligari to Hitler: German Cinema in the Age of the Masses"}
               {"title": "From Caligari to Hitler: German Cinema in the Age of the Masses"}
               {"title": "Gèraldine"}
               {"title": "Gervaise"}
               {"title": "Gertrud"}
               {"title": "Germinal"}
               {"title": "Gerry"}
               {"title": "Gerontophilia"}
               {"title": "Pionery-geroi"}
               {"title": "The Good German"}
      
