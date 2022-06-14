# Sample CSFLE Applications

1. Run `cp envrc_template .envrc` and then fill out your `.envrc` file. You can fill out the `.envrc` file by using
   the DBX team's test credentials, or by creating accounts
   on KMS each KMS provider and filling in the file.

2. Use `direnv` to load the environment variables defined in your `.envrc` file into your environment.

3. Install python packages by running `pip install -r requirements.txt`

> **_NOTE:_** If you must test new QE/FLE fetures in python, run `source python-fle-2 requirements.sh` to build and install `pymongo` and `pymongo-crypt` from source.

4. Install bluehawk by running `npm install -g bluehawk`

5. Run `python build.py` to generate scripts to create a DEK and insert a sample document in all combinations of the following languages and KMS providers:

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

The `reader` directories contains the code to use in docs code snippets, and the `test` directories contains runnable examples for testing.

6. Install the following languages and tools necessary
   to run sample applications:

- [JDK](https://dotnet.microsoft.com/en-us/download) and [Maven](https://maven.apache.org/download.cgi)
- [Dotnet SDK](https://dotnet.microsoft.com/en-us/download)
- [Node](https://nodejs.org/en/download/)
- [Go](https://go.dev/dl/)

7. Run `python -m unittest test.py` to test the generated scripts using the KMS credentials in your `.envrc` file.
