# Golang Queryable Encryption Tutorial

This project demonstrates an example implementation of Queryable Encryption
for the MongoDB Golang driver. To learn more about Queryable Encryption, see the
[Queryable Encryption](https://www.mongodb.com/docs/manual/core/queryable-encryption/)
section in the Server manual.

The following sections provide instructions on how to set up and run this project.

## Install Dependencies

To run this sample app, you first need to install the following
dependencies:

- MongoDB Server version 7.0 or later
- Automatic Encryption Shared Library version 7.0 or later
- Golang v1.13 or later
- libmongocrypt v1.8.0 or later

For more information on installation requirements for Queryable Encryption,
see [Installation Requirements](https://www.mongodb.com/docs/manual/core/queryable-encryption/install/#std-label-qe-install).

## Configure Your Environment

1. Copy the `env_template` file in the root of the project directory to a file named `.env`.

1. Replace the placeholder values in the `.env` file with your own credentials.

1. Start a MongoDB replica set with three nodes.

   **Note:** If you are using [mtools](https://github.com/rueckstiess/mtools),
   you can create a replica set by running the following command:

   ```sh
   mlaunch init --replicaset --nodes 3
   ```

## Run the App

1. In the `queryable-encryption-tutorial.go` file, replace the value
   of `<Your KMS Provider Name>` with the name of your KMS provider.

1. From the project root, run the following build command which
   downloads the dependencies defined in the `go.mod` file:

   ```golang
   go get go-qe-tutorial
   ```

1. Run the following command to compile the application:

   ```golang
   go build -tags cse
   ```

   **_Note:_**
   The `cse` build tag specifies support for Client-Side Encryption.

   For more information on compatible package versions, see the
   [Driver Compatibility Table](https://www.mongodb.com/docs/manual/core/queryable-encryption/reference/compatibility/).

1. Run the compiled app with the following command:

   ```sh
   ./go-qe-tutorial
   ```

1. If successful, the application will print the sample document to the console.
