+++
title = "Configure MongoDB for FIPS"

[tags]
mongodb = "product"
+++
# Configure MongoDB for FIPS


# On this page

* [Overview](#overview) 

* [Prerequisites](#prerequisites) 

* [Considerations](#considerations) 

* [Procedure](#procedure) 

New in version 2.6.


## Overview

The Federal Information Processing Standard (FIPS) is a U.S. government
computer security standard used to certify software modules and
libraries that encrypt and decrypt data securely.  You can configure
MongoDB to run with a FIPS 140-2 certified library
for OpenSSL. Configure FIPS to run by default or as needed from the
command line.


## Prerequisites

Important: A full description of FIPS and TLS/SSL is beyond the scope of this document. This tutorial assumes prior knowledge of FIPS and TLS/SSL. 

Only [MongoDB Enterprise](http://www.mongodb.com/products/mongodb-enterprise?jmp=docs) edition supports FIPS mode. See
[Install MongoDB Enterprise](#) to download and install
[MongoDB Enterprise](http://www.mongodb.com/products/mongodb-enterprise?jmp=docs).

Your system must have an OpenSSL library configured with the FIPS 140-2
module. At the command line, type ``openssl version`` to confirm your
OpenSSL software includes FIPS support.

For Red Hat Enterprise Linux 6.x (RHEL 6.x) or its derivatives such as
CentOS 6.x, the OpenSSL toolkit must be at least
``openssl-1.0.1e-16.el6_5`` to use FIPS mode. To upgrade the toolkit for
these platforms, issue the following command:

```sh

sudo yum update openssl

```

Some versions of Linux periodically execute a process to *prelink* dynamic
libraries with pre-assigned addresses. This process modifies the OpenSSL
libraries, specifically ``libcrypto``. The OpenSSL FIPS mode will
subsequently fail the signature check performed upon startup to ensure
``libcrypto`` has not been modified since compilation.

To configure the Linux prelink process to not prelink ``libcrypto``:

```sh

sudo bash -c "echo '-b /usr/lib64/libcrypto.so.*' >>/etc/prelink.conf.d/openssl-prelink.conf"

```


## Considerations

FIPS is property of the encryption system and not the access control
system. However, if your environment requires FIPS compliant encryption
*and* access control, you must ensure that the access control system
uses only FIPS-compliant encryption.

MongoDB's FIPS support covers the way that MongoDB uses OpenSSL for
network encryption, ``SCRAM-SHA-1`` authentication, and x.509
authentication. If you use Kerberos or LDAP authentication, you must
ensure that these external mechanisms are FIPS-compliant.
``MONGODB-CR`` authentication is **not** FIPS compliant.


## Procedure


### Configure MongoDB to use TLS/SSL

See [Configure mongod and mongos for TLS/SSL](#) for details about configuring
OpenSSL. For FIPS mode, ensure that your certificate is FIPS compliant.


### Run ``mongod`` or ``mongos`` instance in FIPS mode

Perform these steps after you [Configure mongod and mongos for TLS/SSL](#).


#### Step 1: Change configuration file.

To configure your [``mongod``](#bin.mongod) or [``mongos``](#bin.mongos) instance to use
FIPS mode, shut down the instance and update the configuration file with
the following setting:

```yaml

net:
   ssl:
      FIPSMode: true

```


#### Step 2: Start [``mongod``](#bin.mongod) or [``mongos``](#bin.mongos) instance with configuration file.

For example, run this command to start the  [``mongod``](#bin.mongod) instance with its configuration file:

```javascript

mongod --config /etc/mongod.conf

```


### Confirm that FIPS mode is running

Check the server log file for a message that FIPS is active:

```sh

FIPS 140-2 mode activated

```
