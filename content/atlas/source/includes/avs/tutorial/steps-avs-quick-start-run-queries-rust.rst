.. procedure:: 
   :style: normal

   .. step:: Construct your vector search query.

      .. include:: /includes/avs/facts/fact-avs-quick-start-intro.rst
    
      a. Create a file named ``basic_query.rs``.

      #. Copy and paste the following sample query into the 
         ``basic_query.rs`` file:
      
         .. tabs::
            :hidden: true
         
            .. tab:: 
               :tabid: Asynchronous API

               .. literalinclude:: /includes/avs/pipeline-stage-examples/basic-query-async.rs 
                  :language: rust
                  :copyable: true
                  :caption: basic_query.rs
                  :emphasize-lines: 11
                  :linenos:
            
            .. tab:: 
               :tabid: Synchronous API

               .. literalinclude:: /includes/avs/pipeline-stage-examples/basic-query-sync.rs 
                  :language: rust
                  :copyable: true
                  :caption: basic_query.rs
                  :emphasize-lines: 9
                  :linenos:

      .. include:: /includes/avs/facts/fact-avs-quick-start-intro-II.rst

      To learn more about this pipeline stage, see
      :ref:`return-vector-search-results`.

   .. step:: Specify the ``<connection-string>``.

      .. include:: /includes/steps-connection-string-drivers-hidden.rst

   .. step:: Run your query.
    

      a. Call the function from your ``main.rs``.

         .. code-block:: rust
            :copyable: true
            :caption: main.rs

            fn main() {
               basic_query().unwrap();
            }

      #. Run the file in your IDE, or execute a command from the command line to
         run the code.

         .. io-code-block::
            :copyable: true

            .. input::
               :language: bash
      
               cargo run
         
            .. output:: /includes/avs/pipeline-stage-examples/basic-query-python-output.js
               :language: js
               :linenos: 
