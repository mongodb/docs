# C# Queryable Encryption Tutorial

This project demonstrates an example implementation of Queryable Encryption
for the MongoDB C#/.NET driver. To learn more about Queryable Encryption, see the
[Queryable Encryption](https://www.mongodb.com/docs/manual/core/queryable-encryption/)
section in the Server manual.

## Install Dependencies

To run this sample application, you first need to install the following
dependencies:

- MongoDB Server version 7.0 or later
- Automatic Encryption Shared Library version 7.0 or later
- [.NET version 7.0 or later](https://dotnet.microsoft.com/en-us/download/dotnet)

For more information on installation requirements for Queryable Encryption, see
[Installation Requirements](https://www.mongodb.com/docs/manual/core/queryable-encryption/install/#std-label-qe-install).

## Configure Your Environment

1. Copy the `appsettings_template.json` file in the root of the project directory to a file named `appsettings.json`.

2. Replace the placeholder values in the `appsettings.json` file with your own credentials.

3. Start a MongoDB replica set with three nodes.

   **Note:** If you are using [mtools](https://github.com/rueckstiess/mtools),
   you can create a replica set by running the following command:

   ```sh
   mlaunch init --replicaset --nodes 3
   ```

## Run the App

1. In a shell, navigate to the project root directory.

2. In `QueryableEncryptionTutorial.cs`, replace the placeholder `<your KMS
provider name>` with a valid KMS provider name.

3. Run `dotnet run QueryableEncryptionExample.csproj` to run the application.

4. If successful, the application will print a document to the console.
