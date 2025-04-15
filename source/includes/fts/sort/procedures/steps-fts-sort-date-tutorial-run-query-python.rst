.. procedure:: 
   :style: normal 

   .. step:: Define the query.

      a. Create a new file named ``sort-by-date.py`` 
         and paste the following code:

         .. literalinclude:: /includes/fts/sort/date-tutorial.py
            :language: python
            :linenos:
            :emphasize-lines: 5

      #. Specify the ``<connection-string>``.
          
   .. step:: Run the query.
  
      .. io-code-block::
         :copyable: true

         .. input::
            :language: bash
        
            python sort-by-date.py

         .. output::
            :language: json
            :visible: false
        
            {'title': 'Summer Nights', 'released': datetime.datetime(2015, 1, 28, 0, 0), 'score': 0.348105788230896}
            {'title': 'Summertime', 'released': datetime.datetime(2014, 8, 1, 0, 0), 'score': 0.5917375683784485}
            {'title': 'Summer of Blood', 'released': datetime.datetime(2014, 4, 17, 0, 0), 'score': 0.9934720396995544}
            {'title': 'Summer Games', 'released': datetime.datetime(2012, 2, 8, 0, 0), 'score': 0.15982933342456818}
            {'title': 'Summer of Goliath', 'released': datetime.datetime(2011, 7, 8, 0, 0), 'score': 0.13038821518421173}
