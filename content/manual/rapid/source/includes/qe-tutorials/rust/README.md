# Rust Queryable Encryption Tutorial

This project demonstrates an example implementation of Queryable Encryption
for the Rust driver. To learn more about Queryable Encryption, see the
[Queryable Encryption](https://www.mongodb.com/docs/manual/core/queryable-encryption/quick-start/)
section in the Server manual.

The following sections provide instructions on how to set up and run this project.

## Install Dependencies

To run this sample app, you first need to install the following
dependencies:

- MongoDB Server version 7.0 or later
- Automatic Encryption Shared Library version 7.0 or later
- [libmongocrypt](https://www.mongodb.com/docs/manual/core/queryable-encryption/reference/libmongocrypt/)
- Rust v1.17.1 or later
- Cargo

To learn how to install Rust and Cargo, see [Install Rust](https://www.rust-lang.org/tools/install)
in the Rust documentation.

For more information on installation requirements for Queryable Encryption,
see [Installation Requirements](https://www.mongodb.com/docs/manual/core/queryable-encryption/install/#std-label-qe-install).

## Configure Your Environment

1. Create a file in the root of your directory named `.env`.

1. Copy the contents of `env_template` into the `.env` file.

1. Replace the placeholder values in the `.env` file with your own credentials.
   For more information on setting credentials, see
   [Queryable Encryption Tutorials](https://www.mongodb.com/docs/manual/core/queryable-encryption/tutorials/)
   for KMS credentials or the
   [Quick Start](https://www.mongodb.com/docs/manual/core/queryable-encryption/quick-start/)
   for local key provider credentials.

   > **Note:** The sample application uses the `dotenv` crate to access
   > the credentials as if they were defined as environment variables, but
   > does not overwrite any environment variables you currently have set.

1. Create a three-node replica set.

   **Note:** If you are using [mtools](https://github.com/rueckstiess/mtools),
   you can create a replica set by running the following command:

   ```sh
   mlaunch init --replicaset --nodes 3
   ```

## Run the Application

1. In a shell, navigate to the directory in which the application
   is saved.

1. In your project directory, run `export MONGOCRYPT_LIB_DIR=/path/to/libmongocrypt/`
   to set the path to your `libmongocrypt` library.

1. In `queryable-encryption-tutorial.rs`, replace the placeholder `<KMS
   provider name>` with a valid KMS provider name.

1. Run `cargo run --bin queryable_encryption_tutorial` to run the application.

1. If successful, the application will print the sample document to the console.
