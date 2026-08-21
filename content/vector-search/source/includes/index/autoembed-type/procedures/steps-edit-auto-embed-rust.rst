.. procedure::
   :style: normal

   .. step:: Install the MongoDB Rust driver.

      .. include:: /includes/index/autoembed-type/facts/install-rust-driver.rst

   .. step:: Define the index changes.

      In the ``/src`` directory of your project, create a file named
      ``edit_index.rs``. Copy and paste the following code into the file
      to update the index by using the ``update_search_index()`` method.

      .. tabs::

         .. tab:: Asynchronous API
            :tabid: async

            .. literalinclude:: /includes/index/autoembed-type/code-snippets/update-index/rust/edit-auto-embed-index-async.rs
               :language: rust
               :copyable: true
               :caption: edit_index.rs
               :linenos:

         .. tab:: Synchronous API
            :tabid: sync

            .. literalinclude:: /includes/index/autoembed-type/code-snippets/update-index/rust/edit-auto-embed-index-sync.rs
               :language: rust
               :copyable: true
               :caption: edit_index.rs
               :linenos:

   .. step:: Replace the following values and save the file.

      .. list-table::
         :stub-columns: 1

         * - ``<connection-string>``
           - Cluster connection string. To learn more, see
             :ref:`connect-via-driver`.

         * - ``<database-name>``
           - Database that contains the collection for which you want to
             update the index.

         * - ``<collection-name>``
           - Collection for which you want to update the index.

         * - ``<index-name>``
           - Name of your index. If you omit the index name, defaults to
             ``vector_index``.

         * - ``<indexed-field>``
           - Name of the field indexed as the ``autoEmbed`` type.

         * - ``<embedding-model>``
           - Name of the |voyage| embedding model to use for generating
             embeddings.

         * - ``<field-to-index>``
           - Vector and filter fields to index.

   .. step:: Call the function from your ``main.rs`` file.

      .. tabs::

         .. tab:: Asynchronous API
            :tabid: async

            .. code-block:: rust
               :caption: main.rs

               mod edit_index;

               #[tokio::main]
               async fn main() -> mongodb::error::Result<()> {
                   edit_index::edit_index().await
               }

         .. tab:: Synchronous API
            :tabid: sync

            .. code-block:: rust
               :caption: main.rs

               mod edit_index;

               fn main() -> mongodb::error::Result<()> {
                   edit_index::edit_index()
               }

   .. step:: Run the following command to update the index.

      .. code-block:: shell

         cargo run
