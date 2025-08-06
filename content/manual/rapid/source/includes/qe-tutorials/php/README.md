# PHP Queryable Encryption Tutorial

This project demonstrates an example implementation of Queryable Encryption
for the PHP library. To learn more about Queryable Encryption, see the
[Queryable Encryption](https://www.mongodb.com/docs/manual/core/queryable-encryption/quick-start/)
section in the Server manual.

The following sections provide instructions on how to set up and run this project.

## Install Dependencies

To run this sample app, you first need to install the following
dependencies:

- MongoDB Server version 7.0 or later
- [Automatic Encryption Shared Library](https://www.mongodb.com/docs/manual/core/queryable-encryption/install-library/) version 7.0 or later
- MongoDB PHP Library version 1.16 or later
- MongoDB PHP Extension version 1.16 or later
- [Symfony Dotenv](https://packagist.org/packages/symfony/dotenv) package. Optional, for reading the `.env` file.

To learn how to install the PHP library and extension, see [Get Started](https://www.mongodb.com/docs/php-library/current/get-started/)
in the PHP library documentation.

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

   > **Note:** The sample application uses the `Dotenv` package to access
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

1. Run `php queryable-encryption-tutorial.php` to run the application.

1. If successful, the application will print the sample document to the console.