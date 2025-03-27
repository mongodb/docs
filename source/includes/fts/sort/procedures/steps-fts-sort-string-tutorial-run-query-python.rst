.. procedure:: 
   :style: normal 

   .. step:: Create a file named ``sort-by-strings.py``. 
   .. step:: Copy and paste the following code into the ``sort-by-strings.py`` file.

      The following code example:

      - Imports ``pymongo``, MongoDB's Python driver, and the ``dns``
        module, which is required to connect ``pymongo`` to ``Atlas`` 
        using a |dns| seed list connection string. 
      - Creates an instance of the ``MongoClient`` class to establish a 
        connection to your |service| cluster.
      - .. include:: /includes/fts/extracts/fts-sort-by-string-desc.rst
           
        .. include:: /includes/fts/extracts/fts-sort-by-string-stage.rst

      - Iterates over the cursor to print the documents that match the 
        query.

      .. literalinclude:: /includes/fts/sort/strings-query.py
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
     
            python sort-by-strings.py

         .. output::
            :language: python
            :visible: true

            {'title': 'Prancer', 'score': 1.0}
            {'title': 'Prancer Returns', 'score': 1.0}
            {'title': 'Prince', 'score': 1.0}
            {'title': 'Prince Avalanche', 'score': 1.0}
            {'title': 'Prince of Broadway', 'score': 1.0}

      .. include:: /includes/fts/extracts/fts-sort-by-string-results.rst
