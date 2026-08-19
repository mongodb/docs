.. procedure::
   :style: normal

   .. step:: Install the MongoDB Rust driver.

      Add the driver to your project's ``Cargo.toml`` file:

      .. code-block:: toml

         [dependencies]
         futures = "0.3"
         tokio = { version = "1", features = ["full"] }

         [dependencies.mongodb]
         version = "3.1.0"
         features = ["sync"]

      The ``futures`` crate is required only for the asynchronous API,
      and the ``sync`` feature only for the synchronous API. To
      learn more about installing the driver, see
      :ref:`rust-quick-start-download-and-install`. To learn more about
      the synchronous API, see :ref:`rust-runtimes-configure-sync`.

   .. step:: Define the index.

      In the ``/src`` directory of your project, create a file named
      ``create_index.rs``. Copy and paste the following code into the
      file.

      .. tabs::

         .. tab:: Asynchronous API
            :tabid: async

            .. literalinclude:: /includes/index/vector-type/code-snippets/create-index/rust/create-index-async.rs
               :language: rust
               :copyable: true
               :caption: create_index.rs
               :linenos:

         .. tab:: Synchronous API
            :tabid: sync

            .. literalinclude:: /includes/index/vector-type/code-snippets/create-index/rust/create-index-sync.rs
               :language: rust
               :copyable: true
               :caption: create_index.rs
               :linenos:

   .. step:: Replace the following values and save the file.

      .. list-table::
         :stub-columns: 1

         * - ``<connectionString>``
           - Cluster connection string. To learn more, see
             :ref:`connect-via-driver`.

         * - ``<databaseName>``
           - Database that contains the collection for which you want to
             create the index.

         * - ``<collectionName>``
           - Collection for which you want to create the index.

         * - ``<indexName>``
           - Name of your index. If you omit the index name, defaults to
             ``vector_index``.

         * - ``<fieldToIndex>``
           - Vector field to index.

         * - ``<numberOfDimensions>``
           - Number of vector dimensions that {+avs+} enforces at
             index-time and query-time.

         * - ``<vectorSimilarity>``
           - Vector similarity function to use to search for the top
             K-nearest neighbors.

      For example, copy and paste one of the following index definitions
      into the ``create_index.rs`` file and replace the
      ``<connectionString>`` placeholder value.

      .. collapsible::
         :heading: Basic Example
         :expanded: false

         .. include:: /includes/index/vector-type/facts/avs-create-index-basic-eg.rst

         .. tabs::

            .. tab:: Asynchronous API
               :tabid: async

               .. literalinclude:: /includes/index/vector-type/code-snippets/create-index/rust/basic-vector-example-async.rs
                  :language: rust
                  :copyable: true
                  :linenos:

            .. tab:: Synchronous API
               :tabid: sync

               .. literalinclude:: /includes/index/vector-type/code-snippets/create-index/rust/basic-vector-example-sync.rs
                  :language: rust
                  :copyable: true
                  :linenos:

      .. collapsible::
         :heading: Filter Example
         :expanded: false

         .. include:: /includes/index/vector-type/facts/avs-create-index-filter-eg.rst

         .. tabs::

            .. tab:: Asynchronous API
               :tabid: async

               .. literalinclude:: /includes/index/vector-type/code-snippets/create-index/rust/filter-example-async.rs
                  :language: rust
                  :copyable: true
                  :linenos:

            .. tab:: Synchronous API
               :tabid: sync

               .. literalinclude:: /includes/index/vector-type/code-snippets/create-index/rust/filter-example-sync.rs
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
