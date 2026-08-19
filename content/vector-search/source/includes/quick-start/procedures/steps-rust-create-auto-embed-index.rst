.. note:: Vector Search Index supports both asynchronous and
   synchronous runtimes. In the following steps, select your
   preferred runtime to learn how to create a Vector Search Index
   for it.

.. procedure::
   :style: normal

   .. step:: Add the Rust driver and runtime dependencies to your project.

      Select the tab for the runtime that you use and run the
      following commands to add the required dependencies:

      .. tabs::

         .. tab:: Asynchronous API
            :tabid: async

            .. code-block:: sh
               :copyable: true

               cargo add mongodb
               cargo add tokio --features full
               cargo add futures

         .. tab:: Synchronous API
            :tabid: sync

            .. code-block:: sh
               :copyable: true

               cargo add mongodb --features sync

      For further information about Rust with MongoDB, see the
      :ref:`MongoDB Rust Driver documentation <rust-quick-start-download-and-install>`.

   .. step:: Define the index.

      In the ``/src`` directory of your project, create a file named
      ``vector_index.rs``, then copy and paste the following code
      into the file.

      .. include:: /includes/quick-start/facts/avs-quick-start-auto-embed-index-description.rst

      For details on all the {+avs+} index settings for Automated
      Embedding, see :ref:`avs-types-vector-search-options`.

      This code also includes a polling mechanism to check if the index
      is ready to use.

      .. tabs::

         .. tab::
            :tabid: Asynchronous API

            .. literalinclude:: /includes/quick-start/code-snippets/auto-embed/rust/auto-embed-create-index-async.rs
               :language: rust
               :copyable: true
               :caption: vector_index.rs
               :emphasize-lines: 24
               :linenos:

         .. tab::
            :tabid: Synchronous API

            .. literalinclude:: /includes/quick-start/code-snippets/auto-embed/rust/auto-embed-create-index-sync.rs
               :language: rust
               :copyable: true
               :caption: vector_index.rs
               :emphasize-lines: 27
               :linenos:

   .. step:: Specify the ``<connection-string>``.

      .. include:: /includes/quick-start/procedures/steps-connection-string-drivers-hidden.rst

   .. step:: Call the function from your ``main.rs``.

      .. code-block:: rust

         mod vector_index;

         fn main() {
            vector_index::vector_index();
         }

   .. step:: Run the file in your IDE, or run the following command in your terminal.

      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            cargo run

         .. output:: /includes/quick-start/code-snippets/output/autoembed-rust-create-index-output.sh
            :language: console
