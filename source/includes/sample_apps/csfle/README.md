# Sample CSFLE Applications

This README details how to build and test the sample applications
for In Use encryption (Client-Side Field Level Encryption (CSFLE) and Queryable Encryption (QE)).

## Install Packages:

1. Download and set up `direnv`. Follow these links for instructions:

   - [Download](https://direnv.net/)
   - [Setup](https://direnv.net/docs/hook.html)

1. Install bluehawk by running `npm install -g bluehawk`

1. Download the following tools necessary to run FLE/QE:

   - libmongocrypt (latest, experimental version). Run:

     ```
     brew uninstall libmongocrypt
     brew install libmongocrypt --head
     ```

   - enterprise server and mongocryptd

     - Install from the [downloads](https://www.mongodb.com/try/download/enterprise) site

   - crypt_shared

     - Install from the [downloads](https://www.mongodb.com/try/download/enterprise) site

   > **_NOTE:_** Ensure you are running/using MongoDB Enterprise, mongocryptd, and `crypt_shared` versions 6.0.0-rc8 or greater. If you run any of these tools with a release less than 6.0.0-rc8, Queryable Encryption will fail.

1. Install [`mlaunch`](http://blog.rueckstiess.com/mtools/mlaunch.html)

1. Install the following languages and tools necessary
   to run and format the sample applications:

   - [JDK](https://www.oracle.com/java/technologies/downloads/) and [Maven](https://maven.apache.org/download.cgi)
   - [Dotnet SDK](https://dotnet.microsoft.com/en-us/download)
   - [Node](https://nodejs.org/en/download/) and [Prettier](https://prettier.io/docs/en/install.html)
   - [Go](https://go.dev/dl/)

   > **_TIP:_** If you do not yet have a Java and Maven environment setup, this may be the hardest to get working. Ensure you set your `$JAVA_HOME` environment variable.

   Run the following commands to test that you installed all tools:

   ```
   dotnet --version
   node --version
   java --version
   mvn --version
   python --version
   go version
   prettier --version
   ```

## Configure Environment

1. Create a three-node replica set with the following command:

   ```
   mlaunch --replicaset --nodes 3
   ```

1. Clone the `docs_mongodb_internal` repository and `cd` into the directory that contains this `README` file.

1. Run `cp envrc_template .envrc` and then fill out your `.envrc` file. You can fill out the `.envrc` file by using the DBX team's test credentials, or by creating accounts on each KMS provider. Ask someone who already has these credentials to send them to you over 0bin. If you do not know anyone with these credentials, contact the DBX team and request these credentials.

   > **_NOTE:_** Do not fill out the `envrc_template` file. File out the `.envrc` file you create with the `cp` command.

   > **_TIP:_** Your `MONGODB_URI` environment variable must contain the URI of the replica set you started with the `mlaunch` command.

   > **_TIP:_** Your `SHARED_LIB_PATH` environment variable must point to the location of `mongo_crypt_v1.dylib` included in your `crypt_shared` download.

1. Run `direnv allow` from the directory that contains this `README` file to load the environment variables defined in your `.envrc` file into your environment.

   > **_NOTE:_** When `direnv` is working, you will see the environment variables echoed back to you when entering into the sample app directory:
   >
   > ```
   > ...
   > direnv: loading .../.envrc
   > direnv: export +AWS_ACCESS_KEY_ID +AWS_KEY_ARN ...
   > ```

1. Create a python virtual environment to install dependencies and ensure you are running python 3.6 or greater:

   ```
   python3.6 -m venv in_use_encryption_env && source in_use_encryption_env/bin/activate
   pip install --upgrade pip
   ```

1. Install python packages by running `pip install -r requirements.txt`

   > **_NOTE:_** If you must test new QE/FLE features in python, run `source python-fle-2/requirements.sh` to build and install `pymongo` and `pymongo-crypt` from source.

## Build Applications

1. Run `python build.py` to generate scripts to create a DEK and insert a sample document in all combinations of the following languages and KMS providers:

   - Local Key Provider
   - AWS KMS
   - GCP KMS
   - Azure Key Vault

   - Dotnet
   - Node
   - Python
   - Java
   - Go

   Once you build the files, you should see a `build` directory with the following structure:

   ```
   build
   ├── dotnet
   │   ├── aws
   │   │   ├── reader
   │   │   └── test
   │   ├── azure
   │   │   ├── reader
   │   │   └── test
   │   ├── gcp
   │   │   ├── reader
   │   │   └── test
   │   └── local
   │       ├── reader
   │       └── test
   ├── go
   │   ├── aws
   │   │   ├── reader
   │   │   └── test
   │   ├── azure
   │   │   ├── reader
   │   │   └── test
   │   ├── gcp
   │   │   ├── reader
   │   │   └── test
   │   └── local
   │       ├── reader
   │       └── test
   ├── java
   │   ├── aws
   │   │   ├── reader
   │   │   └── test
   │   ├── azure
   │   │   ├── reader
   │   │   └── test
   │   ├── gcp
   │   │   ├── reader
   │   │   └── test
   │   └── local
   │       ├── reader
   │       └── test
   ...
   ```

   The `reader` directories contain the code to use in docs code snippets, and the `test` directories contain runnable examples for testing.

   > **_TIP:_** To see all options available in the `build.py` script, run `python build.py --help`.

## Test Applications

1. Run `python -m unittest test.py` to test the generated scripts using the KMS credentials in your `.envrc` file.

   > **_TIP:_** To test an individual language, run the following command: `python -m unittest test.<test class name>`. For example to, test the Python CSFLE application, run `python -m unittest test.TestPython`. You can see a list of all test classes in the `test.py` file.
