a. Initialize your Rust project.

   .. code-block::
    
      # Create a new Rust project
      cargo new atlas-search-quickstart && cd atlas-search-quickstart

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

#. Define the index.

   Paste the following code into ``src/main.rs``.
   
   .. literalinclude:: /includes/fts/search-index-management/create-index-tutorial.rs
      :caption: src/main.rs
      :language: rust
      :emphasize-lines: 8
      :copyable:
      :linenos:

   .. include:: /includes/steps-connection-string-drivers-hidden.rst

#. Create the index.

   .. io-code-block::
      :copyable: true

      .. input::
         :language: shell

         cargo run

      .. output::

         search_idx