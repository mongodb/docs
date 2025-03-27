.. procedure:: 
   :style: normal 

   .. step:: Create a file named ``sort-by-date.py``. 

   .. step:: Copy and paste the following code into the ``sort-by-date.py`` file.

      The following code example:

      - Imports ``pymongo``, MongoDB's Python driver, and the ``dns``
        module, which is required to connect ``pymongo`` to ``Atlas`` 
        using a |dns| seed list connection string. 

      - Creates an instance of the ``MongoClient`` class to establish a 
        connection to your |service| cluster.

      - .. include:: /includes/fts/extracts/fts-sort-by-date-constant-desc.rst 

        .. include:: /includes/fts/extracts/fts-sort-by-date-stage.rst

      - Iterates over the cursor to print the documents that match the 
        query.

      .. literalinclude:: /includes/fts/sort/date-tutorial.py
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
        
            python sort-date-for-speed.py

         .. output::
            :language: python
            :visible: true
        
            {'title': 'Summer Nights', 'released': datetime.datetime(2015, 1, 28, 0, 0), 'score': 0.348105788230896}
            {'title': 'Summertime', 'released': datetime.datetime(2014, 8, 1, 0, 0), 'score': 0.5917375683784485}
            {'title': 'Summer of Blood', 'released': datetime.datetime(2014, 4, 17, 0, 0), 'score': 0.9934720396995544}
            {'title': 'Summer Games', 'released': datetime.datetime(2012, 2, 8, 0, 0), 'score': 0.15982933342456818}
            {'title': 'Summer of Goliath', 'released': datetime.datetime(2011, 7, 8, 0, 0), 'score': 0.13038821518421173}
