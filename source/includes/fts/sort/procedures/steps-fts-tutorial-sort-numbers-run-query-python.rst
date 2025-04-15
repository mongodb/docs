.. procedure:: 
   :style: normal 

   .. step:: Define the query.

      a. Create a new file named ``sort-by-numbers.py`` 
         and paste the following code:

         .. literalinclude:: /includes/fts/sort/numbers-query.py
            :language: python
            :linenos:
            :emphasize-lines: 5

      #. Specify the ``<connection-string>``.

   .. step:: Run the query.
  
      .. io-code-block::
         :copyable: true

         .. input::
            :language: bash
        
            python sort-by-numbers.py

         .. output::
            :language: json
            :visible: false
        
            {'title': '12 Years a Slave', 'awards': {'wins': 267}}
            {'title': 'Gravity', 'awards': {'wins': 231}}
            {'title': 'Gravity', 'awards': {'wins': 231}}
            {'title': 'Birdman: Or (The Unexpected Virtue of Ignorance)', 'awards': {'wins': 210}}
            {'title': 'Boyhood', 'awards': {'wins': 185}}
