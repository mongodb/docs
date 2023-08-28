# mongosh Queryable Encryption Tutorial

This `README` details how to set up and run the sample application for the
mongosh Queryable Encryption tutorial.

## Install Dependencies

To run this sample application, you first need to install the following
dependencies:

- MongoDB Server version 7.0 or later
- [mongosh](https://www.mongodb.com/try/download/shell)
- [direnv](https://direnv.net/docs/installation.html) to assign your KMS
  credentials to environment variables.

Do not install mongosh via homebrew on Mac OS. See 
https://jira.mongodb.org/browse/MONGOSH-1216 for details.

For more information on installation requirements for {+qe+}, see [Installation Requirements](https://www.mongodb.com/docs/manual/core/queryable-encryption/install/#std-label-qe-install).

## Configure Your Environment

1. Create a file in the root of your directory named `.envrc`.

1. Copy the contents of `envrc_template` into the `.envrc` file.

1. Replace the placeholder values in the ``.envrc`` file with your own credentials.

1. Create a three-node replica set.

   > **Note:** If you are using `mtools`, you can create a replica set with the
   > following command:
   >
   > `mlaunch init --replicaset --nodes 3`

## Run the Application

1. In a shell, navigate to the directory in which the application
   is saved.

1. Run `direnv allow` to load the environment variables defined in your `.envrc`
   file into your environment.

   > **Note:** `direnv allow` only needs to be run the first time you are
   > running this application.

1. In `queryable-encryption-tutorial.js`, Replace the placeholder `<Your KMS
Provider Name>` with a valid KMS provider name.

1. Run `mongosh -f queryable-encryption-tutorial.js` to run the application.

1. If successful, the application will print a document to the console.
