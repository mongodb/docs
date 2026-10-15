# C++ Queryable Encryption Tutorial

This project demonstrates an example implementation of Queryable Encryption
for the MongoDB C++ driver. To learn more about Queryable Encryption, see the
[Queryable Encryption](https://www.mongodb.com/docs/manual/core/queryable-encryption/quick-start/)
section in the Server manual.

The following sections provide instructions on how to set up and run this project.

## Install Dependencies

To run this sample app, you first need to install the following
dependencies:

- MongoDB Server version 7.0 or later
- Automatic Encryption Shared Library version 7.0 or later
- [libmongocrypt](https://www.mongodb.com/docs/manual/core/queryable-encryption/install/) version 1.24.0 or later
- [mongocxx](https://www.mongodb.com/docs/languages/cpp/cpp-driver/current/) version 3.8.0 or later
- CMake version 3.15 or later

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

   > **Note:** The sample application reads these values with `std::getenv`,
   > so you must export them into your shell environment before running the
   > application, for example by running `source .env`.

1. Create a three-node replica set.

   **Note:** If you are using [mtools](https://github.com/rueckstiess/mtools),
   you can create a replica set by running the following command:

   ```sh
   mlaunch init --replicaset --nodes 3
   ```

## Build the Application

1. In a shell, navigate to the directory in which the application is saved.

1. Run the following commands to configure and build the application:

   ```sh
   cmake -S . -B build
   cmake --build build
   ```

## Run the Application

1. In `queryable_encryption_tutorial.cpp`, replace the placeholder `<KMS
   provider name>` with a valid KMS provider name.

1. Run the compiled `queryable_encryption_tutorial` binary from the `build`
   directory.

1. If successful, the application prints the sample document to the console.
