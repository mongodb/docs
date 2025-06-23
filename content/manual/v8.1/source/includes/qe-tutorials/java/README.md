# Java Queryable Encryption Tutorial

This project demonstrates an example implementation of Queryable Encryption
for the MongoDB Java driver. To learn more about Queryable Encryption, see the
[Queryable Encryption](https://www.mongodb.com/docs/manual/core/queryable-encryption/)
section in the Server manual.

The following sections provide instructions on how to
set up and run this project.

## Install Dependencies

To run this sample app, you first need to install the following
dependencies:

- MongoDB Server version 7.0 or later
- Automatic Encryption Shared Library version 7.0 or later
- Java 11 or later

For more information on installation requirements for Queryable Encryption,
see [Installation Requirements](https://www.mongodb.com/docs/manual/core/queryable-encryption/install/#std-label-qe-install).

## Configure Your Environment

1. Copy the `env_template` file in the root of the project directory to a file named `.env`.

1. Replace the placeholder values in the `.env` file with your own credentials.
   For more information on setting credentials, see
   [Queryable Encryption Tutorials](https://www.mongodb.com/docs/manual/core/queryable-encryption/tutorials/)
   for KMS credentials or the
   [Quick Start](https://www.mongodb.com/docs/manual/core/queryable-encryption/quick-start/)
   for local key provider credentials.

1. Start a MongoDB replica set with three nodes.

   **Note:** If you are using [mtools](https://github.com/rueckstiess/mtools),
   you can create a replica set by running the following command:

   ```sh
   mlaunch init --replicaset --nodes 3
   ```

## Run the App

> **Note:** We recommend you use an IDE such as IntelliJ to manage your
> project, its dependencies and JVM options.

1. Download the project dependencies.

   - If you use Maven, you can use the
     `pom.xml` file included in the project directory.
   - If you use Gradle, you can use the `gradle.build` file included in the project directory.

   Otherwise, make sure you
   include dependencies for `mongodb-driver-sync`, `mongodb-driver-core`, `bson`
   and `mongodb-crypt` that are compatible with Queryable Encryption. This
   project also uses the `dotenv-java` package to read your credentials from a
   file.

   For more information on compatible package versions, see the
   [Driver Compatibility Table](https://www.mongodb.com/docs/manual/core/queryable-encryption/reference/compatibility/).

1. (Optional) If you are using KMIP for key management, you need to add
   the location of your keystore and truststore to the JVM options.

   - If you are using Maven, open the `maven.config.tpl` file in the project
     directory to view the JVM options. Assign the appropriate values and add
     these JVM options to your run configuration.

   - If you are using Gradle, open the `gradle.build` file in the project
     directory, uncomment the `applicationDefaultJvmArgs` array. Assign the
     appropriate values to the placeholders.

1. In `QueryableEncryptionTutorial.java`, which you can find in the
   `/java/src/main/com/mongodb/tutorials/qe/` directory, replace the placeholder
   `<Your KMS Provider Name>` with a valid KMS provider name.

1. Compile the project and run the `QueryableEncryptionTutorial.java` class in
   the `/java/src/main/java/com/mongodb/tutorials/qe/` directory.

   - If you are using `maven` on the command line, you can run the following
     commands from the project root that contains the `pom.xml` to build and run
     it.

     > **Note:** If you are using KMIP for key management, add the VM options to the `java` command.

     ```
     mvn clean package
     java -jar target/queryable-encryption-tutorial.jar
     ```

   - If you are using `gradle` on the command line, you can run the following
     command from the project root that contains the `gradle.build` file to
     build and run the project.

     ```
     gradle clean build run
     ```

   Otherwise, follow the procedure for running a project in your IDE.

1. If successful, the application will print the sample document to the console.
