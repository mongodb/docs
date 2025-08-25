# Realm SDK Reference Manual Landing Pages

This directory contains the landing pages for the reference docs hosted at
https://docs.mongodb.com/realm-sdks.

A GitHub Action workflow uploads to the S3 bucket upon update. See
[publish-sdk-landing-pages.yml](../.github/workflows/publish-sdk-landing-pages.yml).

This directory also contains some static files we serve up on the docs from that
S3 bucket, such as the various public IP lists on the [Application
Security](https://www.mongodb.com/docs/atlas/app-services/manage-apps/secure/)
page.

The main index.html file serves as a landing page but should not be linked to
directly. Still, in case someone ends up there, it should expose links to all
available SDK reference manuals.

## Adding SDKs

Each SDK has a corresponding directory with an index.html file. That index.html
file's sole purpose is to redirect into the corresponding SDK's `latest/`
subdirectory.

You don't need to do this manually. Run the [addSdk.sh](./addSdk.sh) script with
the name of the new SDK subdirectory.
