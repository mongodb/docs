.. procedure:: 
   :style: normal 

   .. step:: Install the MongoDB Node.js Driver.

      a.  Run one of the following commands:

      .. code-block:: sh 
         :copyable: true 

         npm install mongodb

      .. code-block:: sh 
         :copyable: true 

         yarn add mongodb

      For more detailed installation instructions, see the 
      :ref:`MongoDB Node.js Driver documentation <node-quick-start-download-and-install>`.

   .. step:: Construct your vector search query.

      .. include:: /includes/fact-avs-quick-start-intro.rst
    
      a. Create a file named ``atlas-vector-search-quick-start.js`` .

      #. Copy and paste the following sample query into the 
         ``atlas-vector-search-quick-start.js`` file:

         .. literalinclude:: /includes/avs-examples/pipeline-stage-examples/basic-query.js
            :language: js
            :linenos:


      .. include:: /includes/fact-avs-quick-start-intro-II.rst

      To learn more about this pipeline stage, see
      :ref:`return-vector-search-results`.

   .. step:: Specify the ``<connection-string>``.

     a. Replace the ``<connection-string>`` in the query with your
        |service| connection string.

        Ensure that your connection string includes your database user's
        credentials. To learn more about finding your connection string, 
        see :ref:`connect-via-driver`. 

     #. Save the file.

   .. step:: Run your query.

      Run the following command to query your collection: 
  
      .. io-code-block::
         :copyable: true

         .. input::
            :language: bash
     
            node atlas-vector-search-quick-start.js
        
         .. output:: /includes/avs-examples/pipeline-stage-examples/basic-query-nodejs-output.js 
            :language: js
            :linenos: 
