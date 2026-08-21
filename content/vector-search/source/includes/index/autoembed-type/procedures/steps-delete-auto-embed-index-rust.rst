.. procedure::
   :style: normal

   .. step:: Install the MongoDB Rust driver.

      .. include:: /includes/index/autoembed-type/facts/install-rust-driver.rst

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
           - Name of your index. If you omit the index name, defaults to
             ``vector_index``.

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
