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

   .. step:: Retrieve the indexes.

      In the ``/src`` directory of your project, create a file named
      ``get_index.rs``. Copy and paste the following code into the file
      to retrieve the indexes for the collection by using the
      ``list_search_indexes()`` method.

      .. tabs::

         .. tab:: Asynchronous API
            :tabid: async

            .. literalinclude:: /includes/index/vector-type/code-snippets/return-index/rust/get-index-async.rs
               :language: rust
               :copyable: true
               :caption: get_index.rs
               :linenos:

         .. tab:: Synchronous API
            :tabid: sync

            .. literalinclude:: /includes/index/vector-type/code-snippets/return-index/rust/get-index-sync.rs
               :language: rust
               :copyable: true
               :caption: get_index.rs
               :linenos:

   .. step:: Replace the following values and save the file.

      .. list-table::
         :stub-columns: 1

         * - ``<connectionString>``
           - Cluster connection string. To learn more, see
             :ref:`connect-via-driver`.

         * - ``<databaseName>``
           - Database that contains the collection.

         * - ``<collectionName>``
           - Collection for which you want to retrieve the indexes.

   .. step:: Call the function from your ``main.rs`` file.

      .. tabs::

         .. tab:: Asynchronous API
            :tabid: async

            .. code-block:: rust
               :caption: main.rs

               mod get_index;

               #[tokio::main]
               async fn main() -> mongodb::error::Result<()> {
                   get_index::get_index().await
               }

         .. tab:: Synchronous API
            :tabid: sync

            .. code-block:: rust
               :caption: main.rs

               mod get_index;

               fn main() -> mongodb::error::Result<()> {
                   get_index::get_index()
               }

   .. step:: Run the following command to retrieve the indexes.

      .. code-block:: shell

         cargo run
