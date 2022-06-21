These are the source files to build Python sample
applications that use CSFLE with the following KMS providers:

- AWS
- GCP
- Azure
- Local KMS

To build Python applications, run the following command from the parent of this directory:

    python build.py --project python

To test your built applications, run the following
command from the parent of this directory:

    python -m unittest test.TestPython
