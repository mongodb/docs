# C# Queryable Encryption Tutorial

This project demonstrates an example implementation of Queryable Encryption
for the MongoDB C#/.NET driver. To learn more about Queryable Encryption, see the
[Queryable Encryption](https://www.mongodb.com/docs/manual/core/queryable-encryption/)
section in the Server manual.

## Install Dependencies

To run this sample application, you first need to install the following
dependencies:

- MongoDB Server version 7.0 (or the latest release candidate) or later
- Automatic Encryption Shared Library version 7.0 or later
- .NET SDK or .NET Core SDK
- [direnv](https://direnv.net/docs/installation.html) to assign your KMS
  credentials to environment variables.

For more information on installation requirements for Queryable Encryption, see
[Installation Requirements](https://www.mongodb.com/docs/manual/core/queryable-encryption/install/#std-label-qe-install).

## Configure Your Environment

1. Copy the `env_template` file in the root of the project directory to a file named `.envrc`.

2. Replace the placeholder values in the ``.envrc`` file with your own credentials.

3. Start a MongoDB replica set with three nodes.

   **Note:** If you are using [mtools](https://github.com/rueckstiess/mtools),
   you can create a replica set by running the following command:

   ```sh
   mlaunch init --replicaset --nodes 3
   ```

## Run the App

1. In a shell, navigate to the project root directory.

2. Run `direnv allow` to load the environment variables defined in your `.envrc`
   file into your environment.

   > **Note:** `direnv allow` only needs to be run the first time you are
   > running this application.

3. In `QueryableEncryptionTutorial.cs`, replace the placeholder `<your KMS
   provider name>` with a valid KMS provider name.

4. Run `dotnet run QueryableEncryptionExample.csproj` to run the application.

5. If successful, the application will print a document to the console.
