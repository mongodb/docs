.. procedure:: 
   :style: normal

   .. step:: Construct your vector search query.

      .. include:: /includes/quick-start/facts/fact-avs-quick-start-intro.rst
    
      a. Create a file named ``atlas-vector-search-quick-start.js`` .

      #. Copy and paste the following sample query into the 
         ``atlas-vector-search-quick-start.js`` file:

         .. literalinclude:: /includes/quick-start/code-snippets/nodejs/basic-query.js
            :language: js
            :linenos:


      .. include:: /includes/quick-start/facts/fact-avs-quick-start-intro-II.rst

      To learn more about this pipeline stage, see
      :ref:`return-vector-search-results`.

   .. step:: Specify the ``<connection-string>``.

      .. include:: /includes/quick-start/procedures/steps-connection-string-drivers-hidden.rst

   .. step:: Run your query.

      Run the following command to query your collection: 
  
      .. io-code-block::
         :copyable: true

         .. input::
            :language: bash
     
            node atlas-vector-search-quick-start.js
        
         .. output:: /includes/pipeline-stage/vectorSearch/code-snippets/output/basic-query-nodejs-output.js 
            :language: js
            :linenos: 
