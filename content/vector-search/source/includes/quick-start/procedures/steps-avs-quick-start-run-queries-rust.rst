.. procedure::
   :style: normal

   .. step:: Install the Rust driver for MongoDB.

      For more detailed installation instructions, see the
      :ref:`MongoDB Rust Driver documentation <rust-quick-start-download-and-install>`.

   .. step:: Construct your vector search query.

      .. include:: /includes/quick-start/facts/fact-avs-quick-start-intro.rst

      a. In the ``/src`` directory of your project, create a file named
         ``vector_search_query.rs``.

      #. Copy and paste the following sample query into the
         ``vector_search_query.rs`` file:

         .. tabs::

            .. tab::
               :tabid: Asynchronous API

               .. literalinclude:: /includes/quick-start/code-snippets/vector/rust/basic-query-async.rs
                  :language: rust
                  :copyable: true
                  :caption: vector_search_query.rs
                  :emphasize-lines: 14
                  :linenos:

            .. tab::
               :tabid: Synchronous API

               .. literalinclude:: /includes/quick-start/code-snippets/vector/rust/basic-query-sync.rs
                  :language: rust
                  :copyable: true
                  :caption: vector_search_query.rs
                  :emphasize-lines: 12
                  :linenos:

      .. include:: /includes/quick-start/facts/fact-avs-quick-start-intro-II.rst

      To learn more about this pipeline stage, see
      :ref:`return-vector-search-results`.

   .. step:: Specify the ``<connection-string>``.

      .. include:: /includes/quick-start/procedures/steps-connection-string-drivers-hidden.rst

   .. step:: Call the function from your ``main.rs``.

      Since the query vector is a large inline array, add the
      ``#![recursion_limit]`` attribute at the top of your ``main.rs``
      file. This crate-level attribute and takes effect
      only in the crate root, not in the ``vector_search_query.rs``
      module file.

      .. code-block:: rust

         #![recursion_limit = "2560"]

         mod vector_search_query;

         fn main() -> mongodb::error::Result<()> {
            vector_search_query::basic_query()
         }

   .. step:: Run the file in your IDE, or run the following command in your terminal.

      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            cargo run

         .. output:: /includes/pipeline-stage/vectorSearch/code-snippets/output/basic-query-nodejs-output.js
            :language: js
            :linenos:
