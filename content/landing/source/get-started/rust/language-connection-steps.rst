.. procedure::

   .. step:: Load sample data

      .. include:: /get-started/includes/load-sample-data.rst

   .. step:: Initialize your application

      Before you begin, ensure you have Rust 1.71.1 or later, and
      Cargo, the Rust package manager, installed in your development
      environment. 

      For information about how to install Rust and Cargo, see the
      official Rust guide on `downloading and installing Rust
      <https://www.rust-lang.org/tools/install>`__. 

   .. step:: Initialize your application

      Run the following commands in your shell to create a new Rust
      project:

      .. code-block:: shell

         cargo new rust-get-started
         cd rust-get-started

      Then, add the following code to your ``Cargo.toml`` file to
      install the necessary dependencies:

      .. code-block:: none

         [dependencies]
         serde = "1.0.188"
         futures = "0.3.28"
         tokio = {version = "1.32.0", features = ["full"]}

         [dependencies.mongodb]
         version = "{+rust-driver-version+}"

   .. step:: Create your Rust application

      Replace the contents of ``src/main.rs`` with the following code.
      This code connects to your cluster and queries the sample data.

      .. literalinclude:: /shared/drivers-get-started/rust/get-started-connect.rs
         :language: rust

   .. step:: Add your connection string

      .. include:: /get-started/includes/connection-string-note.rst

   .. step:: Run your Rust application

      In your project directory, run the following command to start the application:

      .. code-block:: shell

         cargo run

      The application output contains details about the retrieved
      movie document:

      .. code-block:: none

         Found a movie:
         Some(
             Document({
                 "_id": ObjectId(...),
                 "title": String(
                     "The Perils of Pauline",
                 ),
                 "plot": String(
                     "Young Pauline is left a lot of money ...",
                 ),
                 "runtime": Int32(
                     199,
                 ),
                 "cast": Array([
                     String(
                         "Pearl White",
                     ),
                     String(
                         "Crane Wilbur",
                     ),
                     ...
                 ]),
             }),
         )
