.. procedure::
   :style: normal

   .. step:: Install the MongoDB Rust driver.

      Add the driver to your project's ``Cargo.toml`` file:

      .. code-block:: toml

         [dependencies]
         tokio = { version = "1", features = ["full"] }

         [dependencies.mongodb]
         version = "3.1.0"
         features = ["sync"]

      The ``sync`` feature is required only for the synchronous API. To
      learn more about installing the driver, see
      :ref:`rust-quick-start-download-and-install`. To learn more about
      the synchronous API, see :ref:`rust-runtimes-configure-sync`.

   .. step:: Delete the index.

      In the ``/src`` directory of your project, create a file named
      ``delete_index.rs``. Copy and paste the following code into the
      file to delete the index by using the ``drop_search_index()``
      method.

      .. tabs::

         .. tab:: Asynchronous API
            :tabid: async

            .. literalinclude:: /includes/index/vector-type/code-snippets/delete-index/rust/delete-index-async.rs
               :language: rust
               :copyable: true
               :caption: delete_index.rs
               :linenos:

         .. tab:: Synchronous API
            :tabid: sync

            .. literalinclude:: /includes/index/vector-type/code-snippets/delete-index/rust/delete-index-sync.rs
               :language: rust
               :copyable: true
               :caption: delete_index.rs
               :linenos:

   .. step:: Replace the following values and save the file.

      .. list-table::
         :stub-columns: 1

         * - ``<connectionString>``
           - Cluster connection string. To learn more, see
             :ref:`connect-via-driver`.

         * - ``<databaseName>``
           - Database that contains the collection for which you want to
             delete the index.

         * - ``<collectionName>``
           - Collection for which you want to delete the index.

         * - ``<indexName>``
           - Name of the index that you want to delete.

   .. step:: Call the function from your ``main.rs`` file.

      .. tabs::

         .. tab:: Asynchronous API
            :tabid: async

            .. code-block:: rust
               :caption: main.rs

               mod delete_index;

               #[tokio::main]
               async fn main() -> mongodb::error::Result<()> {
                   delete_index::delete_index().await
               }

         .. tab:: Synchronous API
            :tabid: sync

            .. code-block:: rust
               :caption: main.rs

               mod delete_index;

               fn main() -> mongodb::error::Result<()> {
                   delete_index::delete_index()
               }

   .. step:: Run the following command to delete the index.

      .. code-block:: shell

         cargo run
