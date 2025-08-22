.. procedure::
   :style: normal
   
   .. step:: Initialize your Rust project.

      .. code-block::
         
         # Create a new Rust project
         cargo new atlas-search-partial-match-tutorial && cd atlas-search-partial-match-tutorial

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

      Paste the following code into ``src/main.rs`` based on the operator 
      you intend to use for your partial match queries.

      .. tabs::

         .. tab:: autocomplete
            :tabid: autocomplete

            .. literalinclude:: /includes/fts/partial-match/tutorial-create-index-autocomplete.rs
               :caption: src/main.rs
               :language: rust
               :emphasize-lines: 7
               :copyable:
               :linenos:

            The index definition specifies the following:

            - Uses :ref:`static mappings <static-dynamic-mappings>` with 
              ``dynamic: false`` to only index specified fields
            - Indexes the ``plot`` field as :ref:`autocomplete <autocomplete-ref>` 
              type to enable search-as-you-type functionality
            - Configures ``edgeGram`` tokenization with 2-15 character grams
            - Enables diacritic folding for broader matching

         .. tab:: phrase
            :tabid: phrase

            .. literalinclude:: /includes/fts/partial-match/tutorial-create-index-phrase.rs
               :caption: src/main.rs
               :language: rust
               :emphasize-lines: 7
               :copyable:
               :linenos:

            The index definition specifies the following:

            - Uses :ref:`static mappings <static-dynamic-mappings>` to only 
              index specified fields
            - Indexes the ``plot`` field as :ref:`string <bson-data-types-string>` 
              type with standard analyzer for phrase queries
            - Uses ``lucene.standard`` analyzer for tokenization and text processing

         .. tab:: regex
            :tabid: regex

            .. literalinclude:: /includes/fts/partial-match/tutorial-create-index-regex.rs
               :caption: src/main.rs
               :language: rust
               :emphasize-lines: 7
               :copyable:
               :linenos:

            The index definition specifies the following:

            - Uses :ref:`static mappings <static-dynamic-mappings>` to only 
              index specified fields
            - Indexes the ``plot`` field as :ref:`string <bson-data-types-string>` 
              type with keyword analyzer for regex queries
            - Uses ``lucene.keyword`` analyzer to preserve exact text for pattern matching

         .. tab:: wildcard
            :tabid: wildcard

            .. literalinclude:: /includes/fts/partial-match/tutorial-create-index-wildcard.rs
               :caption: src/main.rs
               :language: rust
               :emphasize-lines: 7
               :copyable:
               :linenos:

            The index definition specifies the following:

            - Uses :ref:`static mappings <static-dynamic-mappings>` to only 
              index specified fields
            - Indexes the ``plot`` field as :ref:`string <bson-data-types-string>` 
              type with keyword analyzer for wildcard queries
            - Uses ``lucene.keyword`` analyzer to preserve exact text for pattern matching

      .. include:: /includes/steps-connection-string-drivers-hidden.rst

   .. step:: Create the index.

      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            cargo run

         .. output::

            partial-match-tutorial