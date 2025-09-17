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