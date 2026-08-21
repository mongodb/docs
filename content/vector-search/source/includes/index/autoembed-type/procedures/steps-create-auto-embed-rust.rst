.. procedure::
   :style: normal

   .. step:: Install the MongoDB Rust driver.

      .. include:: /includes/index/autoembed-type/facts/install-rust-driver.rst

   .. step:: Define the index.

      In the ``/src`` directory of your project, create a file named
      ``create_index.rs``. Copy and paste the following code into the
      file.

      .. tabs::

         .. tab:: Asynchronous API
            :tabid: async

            .. literalinclude:: /includes/index/autoembed-type/code-snippets/create-index/rust/create-auto-embed-index-async.rs
               :language: rust
               :copyable: true
               :caption: create_index.rs
               :linenos:

         .. tab:: Synchronous API
            :tabid: sync

            .. literalinclude:: /includes/index/autoembed-type/code-snippets/create-index/rust/create-auto-embed-index-sync.rs
               :language: rust
               :copyable: true
               :caption: create_index.rs
               :linenos:

   .. step:: Replace the following values and save the file.

      .. list-table::
         :stub-columns: 1

         * - ``<connection-string>``
           - Cluster connection string. To learn more, see
             :ref:`connect-via-driver`.

         * - ``<database-name>``
           - Database that contains the collection for which you want to
             create the index.

         * - ``<collection-name>``
           - Collection for which you want to create the index.

         * - ``<index-name>``
           - Name of your index. If you omit the index name, defaults to
             ``vector_index``.

         * - ``<embedding-model>``
           - Name of the |voyage| embedding model to use for generating
             embeddings.

         * - ``<field-to-index>``
           - Vector and filter fields to index.

      For example, copy and paste one of the following index definitions
      into the ``create_index.rs`` file and replace the
      ``<connection-string>`` placeholder value.

      .. collapsible::
         :heading: Basic Example
         :expanded: false

         The following index definition enables automated embedding
         vector search for the ``fullplot`` text field.

         .. tabs::

            .. tab:: Asynchronous API
               :tabid: async

               .. literalinclude:: /includes/index/autoembed-type/code-snippets/create-index/rust/basic-auto-embed-example-async.rs
                  :language: rust
                  :copyable: true
                  :linenos:

            .. tab:: Synchronous API
               :tabid: sync

               .. literalinclude:: /includes/index/autoembed-type/code-snippets/create-index/rust/basic-auto-embed-example-sync.rs
                  :language: rust
                  :copyable: true
                  :linenos:

      .. collapsible::
         :heading: Filter Example
         :expanded: false

         The following index definition indexes these fields:

         - String field (``genres``) and numeric field (``year``) for
           pre-filtering the data
         - Text field (``fullplot``) for automated embedding vector
           search

         .. tabs::

            .. tab:: Asynchronous API
               :tabid: async

               .. literalinclude:: /includes/index/autoembed-type/code-snippets/create-index/rust/filter-auto-embed-example-async.rs
                  :language: rust
                  :copyable: true
                  :linenos:

            .. tab:: Synchronous API
               :tabid: sync

               .. literalinclude:: /includes/index/autoembed-type/code-snippets/create-index/rust/filter-auto-embed-example-sync.rs
                  :language: rust
                  :copyable: true
                  :linenos:

   .. step:: Call the function from your ``main.rs`` file.

      .. tabs::

         .. tab:: Asynchronous API
            :tabid: async

            .. code-block:: rust
               :caption: main.rs

               mod create_index;

               #[tokio::main]
               async fn main() -> mongodb::error::Result<()> {
                   create_index::create_index().await
               }

         .. tab:: Synchronous API
            :tabid: sync

            .. code-block:: rust
               :caption: main.rs

               mod create_index;

               fn main() -> mongodb::error::Result<()> {
                   create_index::create_index()
               }

   .. step:: Run the following command to create the index.

      .. code-block:: shell

         cargo run
