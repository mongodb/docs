Before you run the following examples, add the driver to your project's
``Cargo.toml`` file:

.. code-block:: toml

   [dependencies]
   futures = "0.3"
   tokio = { version = "1", features = ["full"] }

   [dependencies.mongodb]
   version = "3.1.0"
   features = ["sync"]

The ``futures`` crate is required only for the asynchronous API, while
the ``sync`` feature is only for the synchronous API. To learn more
about the Rust driver installation, see
:ref:`rust-quick-start-download-and-install`. To learn more about the
synchronous API, see :ref:`rust-runtimes-configure-sync`.
