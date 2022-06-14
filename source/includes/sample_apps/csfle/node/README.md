These are the source files to build Node sample
applications that use CSFLE with the following KMS providers:

- AWS
- GCP
- Azure
- Local KMS

To build Node applications, run the following command from the parent of this directory:

    python build.py --langs node

To test your build applications, run the following
command from the parent of this directory:

    python -m unittest test.TestNode
