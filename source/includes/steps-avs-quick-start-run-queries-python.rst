.. procedure:: 
   :style: normal 

   .. step:: Install ``pymongo``, the Python driver for MongoDB.

      a. Run the following command:

      .. code-block:: sh 
         :copyable: true 

         pip install pymongo

      For more detailed installation instructions, see the 
      :ref:`MongoDB Python Driver documentation <pymongo-get-started-download-and-install>`.

   .. step:: Construct your vector search query.
    
      a. Create a file named ``atlas-vector-search-quick-start.py`` .

      #. Copy and paste the following sample query into the 
         ``atlas-vector-search-quick-start.py`` file:

         .. literalinclude:: /includes/avs-examples/pipeline-stage-examples/basic-query.py 
            :language: python
            :linenos:

      .. include:: /includes/fact-avs-quick-start-intro.rst

      To learn more about this pipeline stage, see
      :ref:`return-vector-search-results`.

   .. step:: Specify the ``<connection-string>``.

      a. Replace the ``<connection-string>`` in the query with your
         |service| connection string.

         Ensure that your connection string includes your database 
         user's credentials. To learn more, see 
         :ref:`connect-via-driver`.

      #. Save the file.

   .. step:: Run your query.
    
      Run the following command to query your collection:

      .. io-code-block::
         :copyable: true

         .. input::
            :language: bash
     
            python atlas-vector-search-quick-start.py
        
         .. output:: /includes/avs-examples/pipeline-stage-examples/basic-query-python-output.js
            :language: js
            :linenos: 
