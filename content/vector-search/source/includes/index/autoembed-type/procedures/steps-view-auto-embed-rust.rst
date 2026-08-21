.. procedure::
   :style: normal

   .. step:: Install the MongoDB Rust driver.

      .. include:: /includes/index/autoembed-type/facts/install-rust-driver.rst

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
