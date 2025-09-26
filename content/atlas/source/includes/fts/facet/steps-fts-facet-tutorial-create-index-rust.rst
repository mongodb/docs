.. procedure::
   :style: normal 

   .. step:: Initialize your Rust project.

      .. code-block::
         
         # Create a new Rust project
         cargo new atlas-search-facet-tutorial && cd atlas-search-facet-tutorial

      Add the following dependencies to your ``Cargo.toml`` file:

      .. code-block::

         [dependencies]
         serde = "1.0"
         futures = "0.3"
         tokio = {version = "1.0", features = ["full"]}

         [dependencies.mongodb]
         version = "3.0"

      For detailed installation instructions, see the
      :ref:`MongoDB Rust Driver Download and Install <rust-quick-start-download-and-install>` guide.

   .. step:: Define the index.

      You can create a |fts| index that uses :ref:`dynamic mappings 
      <static-dynamic-mappings>` or :ref:`static mappings 
      <static-dynamic-mappings>`. To learn more about dynamic and static 
      mappings, see :ref:`static-dynamic-mappings`.
      
      The following index definition statically indexes the ``genres`` field as 
      ``token`` type and dynamically indexes the other fields of 
      :ref:`supported types <bson-data-chart>` in each document in the ``movies``
      collection.

      Paste the following code into ``src/main.rs``.
         
      .. literalinclude:: /includes/fts/facet/tutorial-create-index.rs
         :caption: src/main.rs
         :language: rust
         :emphasize-lines: 7
         :copyable:
         :linenos:

      The index definition specifies the following:

      - Uses :ref:`dynamic mappings <static-dynamic-mappings>` to automatically 
        index fields of :ref:`supported types <bson-data-chart>` in each document
      - Statically indexes the ``genres`` field as ``token`` type to enable
        faceted search

      .. include:: /includes/steps-connection-string-drivers-hidden.rst

   .. step:: Create the index.

      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            cargo run

         .. output::

            facet-tutorial
