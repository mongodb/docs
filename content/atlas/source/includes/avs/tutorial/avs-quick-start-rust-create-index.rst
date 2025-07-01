a. Install the Rust driver for MongoDB.

   For more detailed installation instructions, see the 
   :ref:`MongoDB Rust Driver documentation <rust-quick-start-download-and-install>`.

#. Define the index.

   In the ``/src`` directory of your project, create a file named
   ``vector_index.rs``. Copy and paste the following code into the file.

   .. tabs::
        
      .. tab:: 
         :tabid: Asynchronous API

         .. literalinclude:: /includes/avs/index-management/create-index/basic-example-async.rs 
            :language: rust
            :copyable: true
            :caption: vector_index.rs
            :emphasize-lines: 11
            :linenos:
      
      .. tab:: 
         :tabid: Synchronous API

         .. literalinclude:: /includes/avs/index-management/create-index/basic-example-sync.rs 
            :language: rust
            :copyable: true
            :caption: vector_index.rs
            :emphasize-lines: 13
            :linenos:

   .. include:: /includes/avs/tutorial/avs-quick-start-basic-index-description.rst

   This code also includes a polling mechanism to check if the index is ready to use.

#. Specify the ``<connection-string>``.

   .. include:: /includes/steps-connection-string-drivers-hidden.rst

#. Call the function from your ``main.rs``.

   .. code-block:: rust

      mod vector_index;

      fn main() {
         vector_index::vector_index();
      }

#. Run the file in your IDE, or execute a command from the command line to
   run the code.

   .. io-code-block::
      :copyable: true 

      .. input:: 
         :language: shell 

         cargo run

      .. output:: /includes/avs/index-management/create-index/create-index-output.sh
         :language: console
