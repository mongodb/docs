.. procedure:: 
   :style: normal 

   .. step:: Install the Rust driver for MongoDB.

      For more detailed installation instructions, see the 
      :ref:`MongoDB Rust Driver documentation <rust-quick-start-download-and-install>`.

   .. step:: Construct your vector search query.

      .. include:: /includes/fact-avs-quick-start-intro.rst
    
      In the ``main.rs`` file for your project, paste the following code:
      
      .. tabs::
        
         .. tab:: 
            :tabid: Asynchronous API

            .. literalinclude:: /includes/avs-examples/pipeline-stage-examples/basic-query-async.rs 
               :language: rust
         
         .. tab:: 
            :tabid: Synchronous API

            .. literalinclude:: /includes/avs-examples/pipeline-stage-examples/basic-query-sync.rs 
               :language: rust

      .. include:: /includes/fact-avs-quick-start-intro-II.rst

      To learn more about this pipeline stage, see
      :ref:`return-vector-search-results`.

   .. step:: Specify the ``<connection-string>``.

      .. include:: /includes/steps-connection-string-drivers.rst

   .. step:: Run your query.
    
      Run the following command to query your collection:

      .. io-code-block::
         :copyable: true

         .. input::
            :language: bash
     
            cargo run
        
         .. output:: /includes/avs-examples/pipeline-stage-examples/basic-query-python-output.js
            :language: js
            :linenos: 
