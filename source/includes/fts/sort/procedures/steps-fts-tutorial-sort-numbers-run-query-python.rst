.. procedure:: 
   :style: normal 

   .. step:: Create a file named ``sort-by-numbers.py``. 

   .. step:: Copy and paste the following code into the ``sort-by-numbers.py`` file.

      The following code example:

      - Imports ``pymongo``, MongoDB's Python driver, and the ``dns``
        module, which is required to connect ``pymongo`` to ``Atlas`` 
        using a |dns| seed list connection string. 

      - Creates an instance of the ``MongoClient`` class to establish a 
        connection to your |service| cluster.

      - .. include:: /includes/fts/extracts/fts-sort-by-numbers-constant-desc.rst 

        .. include:: /includes/fts/extracts/fts-sort-by-numbers-stage.rst

      - Iterates over the cursor to print the documents that match the 
        query.

      .. literalinclude:: /includes/fts/sort/numbers-query.py
         :language: python
         :linenos:
         :dedent:
         :emphasize-lines: 5

      .. note:: 
        
         .. include:: /includes/fts/facts/fact-fts-driver-connection-string.rst
         
   .. step:: Run the following command to query your collection: 
  
      .. io-code-block::
         :copyable: true

         .. input::
            :language: bash
        
            python sort-by-numbers.py

         .. output::
            :language: python
            :visible: true
        
            {'title': '12 Years a Slave', 'awards': {'wins': 267}}
            {'title': 'Gravity', 'awards': {'wins': 231}}
            {'title': 'Gravity', 'awards': {'wins': 231}}
            {'title': 'Birdman: Or (The Unexpected Virtue of Ignorance)', 'awards': {'wins': 210}}
            {'title': 'Boyhood', 'awards': {'wins': 185}}
