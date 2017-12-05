+++
title = "Verify Integrity of MongoDB Packages"

tags = [
"mongodb",
"administration",
"beginner" ]
+++

# Verify Integrity of MongoDB Packages


## Overview

The MongoDB release team digitally signs all software packages to
certify that a particular MongoDB package is a valid and unaltered
MongoDB release. Before installing MongoDB, you should validate the package
using either the provided PGP signature or SHA-256 checksum.

PGP signatures provide the strongest guarantees by checking both the
authenticity and integrity of a file to prevent tampering.

Cryptographic checksums only validate file integrity to prevent network
transmission errors.


## Procedures


### Use PGP/GPG

MongoDB signs each release branch with a different PGP key. The public key files
for each release branch since MongoDB 2.2 are available for download
from the [key server](https://www.mongodb.org/static/pgp/) in both textual
``.asc`` and binary ``.pub`` formats.


#### Step 1: Download the MongoDB installation file.

Download the binaries from ``https://www.mongodb.org/downloads``
based on your environment.

For example, to download the ``3.4.9`` release for macOS through the
shell, run this command:

```sh

curl -LO https://fastdl.mongodb.org/osx/mongodb-osx-ssl-x86_64-3.4.9.tgz

```


#### Step 2: Download the public signature file.

```sh

curl -LO https://fastdl.mongodb.org/osx/mongodb-osx-ssl-x86_64-3.4.9.tgz.sig

```


#### Step 3: Download then import the key file.

If you have not downloaded and imported the MongoDB 3.4 public key,
run these commands:

```sh

curl -LO https://www.mongodb.org/static/pgp/server-3.4.asc
gpg --import server-3.4.asc

```

PGP should return this response:

```sh

gpg: key BC711F9BA15703C6: public key "MongoDB 3.4 Release Signing Key <packaging@mongodb.com>" imported
gpg: Total number processed: 1
gpg:               imported: 1

```


#### Step 4: Verify the MongoDB installation file.

Run this command:

```sh

gpg --verify mongodb-osx-ssl-x86_64-3.4.9.tgz.sig mongodb-osx-ssl-x86_64-3.4.9.tgz

```

GPG should return this response:

```sh

gpg: Signature made Mon Sep 11 12:03:48 2017 EDT
gpg:                using RSA key BC711F9BA15703C6
gpg: Good signature from "MongoDB 3.4 Release Signing Key <packaging@mongodb.com>" [unknown]

```

If you receive a message this error message, confirm that you imported the correct
public key:

```sh

gpg: Signature made Mon Sep 11 12:03:48 2017 EDT using RSA key BC711F9BA15703C6
gpg: Can't check signature: public key not found

```

``gpg`` will return the following message if the package is
properly signed, but you do not currently trust the signing key
in your local ``trustdb``.

```sh

gpg: WARNING: This key is not certified with a trusted signature!
gpg:          There is no indication that the signature belongs to the owner.
Primary key fingerprint: 0C49 F373 0359 A145 1858  5931 BC71 1F9B A157 03C6

```


### Use SHA-256


#### Step 1: Download the MongoDB installation file.

Download the binaries from ``https://www.mongodb.org/downloads``
based on your environment.

For example, to download the ``3.4.9`` release for macOS through the
shell, type this command:

```sh

curl -LO https://fastdl.mongodb.org/osx/mongodb-osx-ssl-x86_64-3.4.9.tgz

```


#### Step 2: Download the SHA256 file.

```sh

curl -LO https://fastdl.mongodb.org/osx/mongodb-osx-ssl-x86_64-3.4.9.tgz.sha256

```


#### Step 3: Use the SHA-256 checksum to verify the MongoDB package file.

Compute the checksum of the package file:

```sh

shasum -c mongodb-osx-ssl-x86_64-3.4.9.tgz.sha256

```

which should return the following if the checksum matched the downloaded
package:

```sh

mongodb-osx-ssl-x86_64-3.4.9.tgz: OK

```
