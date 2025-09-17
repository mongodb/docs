.. procedure::
   :style: normal

   .. step:: Install the Rust driver for MongoDB.

      For more detailed installation instructions, see the 
      `MongoDB Rust Driver documentation <https://www.mongodb.com/docs/drivers/rust/upcoming/quick-start/download-and-install/>`__.

   .. step:: Define your index in a new file.

      This example uses a file named ``vector_index.rs`` with the following
      index definition:

      .. tabs::
         
         .. tab:: 
            :tabid: Asynchronous API

            .. literalinclude:: /includes/search-in-community/basic-example-async.rs
               :language: rust
               :copyable: true
               :caption: vector_index.rs
               :emphasize-lines: 11
               :linenos:
         
         .. tab:: 
            :tabid: Synchronous API

            .. literalinclude:: /includes/search-in-community/basic-example-sync.rs
               :language: rust
               :copyable: true
               :caption: vector_index.rs
               :emphasize-lines: 13
               :linenos:

      .. include:: /includes/search-in-community/vs-quick-start-basic-index-description.rst

      This code also includes a polling mechanism to check if the index is ready to use.

   .. step:: Specify your ``<connection-string>``.

      .. include:: /includes/search-in-community/steps-connection-string-drivers-hidden.rst

   .. step:: Call the function from your ``main.rs``.

      .. code-block:: rust

         mod vector_index;

         fn main() {
            vector_index::vector_index();
         }

   .. step:: Run your index creation file. 
   
      Run the file in your IDE, or execute a command similar to the following
      from the command line to create your index. 

      .. io-code-block::
         :copyable: true 

         .. input:: 
            :language: shell 

            cargo run

         .. output:: /includes/search-in-community/create-index-output.sh
            :language: console

   .. step:: Define your query in a new file.

      This example uses a file named ``basic_query.rs`` with the following
      sample query:
      
      .. tabs::
         :hidden: true
      
         .. tab:: 
            :tabid: Asynchronous API

            .. literalinclude:: /includes/search-in-community/basic-query-async.rs
               :language: rust
               :copyable: true
               :caption: basic_query.rs
               :emphasize-lines: 11
               :linenos:
         
         .. tab:: 
            :tabid: Synchronous API

            .. literalinclude:: /includes/search-in-community/basic-query-sync.rs
               :language: rust
               :copyable: true
               :caption: basic_query.rs
               :emphasize-lines: 9
               :linenos:

      .. include:: /includes/search-in-community/fact-vs-quick-start-intro-II.rst

      To learn more about this pipeline stage, see
      :ref:`return-vector-search-results`.

   .. step:: Specify your ``<connection-string>``.

      .. include:: /includes/search-in-community/steps-connection-string-drivers-hidden.rst

   .. step:: Run your query.

      a. Call the function from your ``main.rs``.

         .. code-block:: rust
            :copyable: true
            :caption: main.rs

            fn main() {
               basic_query().unwrap();
            }

      #. Run the file in your IDE, or execute a command from the command line to
         run the query.

         .. io-code-block::
            :copyable: true

            .. input::
               :language: bash
      
               cargo run
         
            .. output:: /includes/search-in-community/basic-query-python-output.js
               :language: js
               :linenos: 
