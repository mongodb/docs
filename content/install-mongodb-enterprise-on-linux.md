+++
title = "Install MongoDB Enterprise From Tarball"

tags = [ "mongodb-enterprise", "administration", "beginner" ]
+++

# Install MongoDB Enterprise From Tarball


## Overview

MongoDB Enterprise tarballs provide an option for installing
MongoDB Enterprise Edition if the distribution packages are not
appropriate for your deployment.

Installing the tarballs on a platform not listed on
[Supported Platforms](https://docs.mongodb.com/manual/administration/production-notes/#prod-notes-supported-platforms) may result in unpredictable
behavior.

Note: Starting in MongoDB 3.6, MongoDB binaries, [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) and [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos), bind to localhost by default. Previously, starting in MongoDB 2.6, only the binaries from the official MongoDB RPM (Red Hat, CentOS, Fedora Linux, and derivatives) and DEB (Debian, Ubuntu, and derivatives) packages bind to localhost by default. For more details, see [Localhost Binding Compatibility Changes](https://docs.mongodb.com/manual/release-notes/3.6-compatibility/#bind-ip-compatibility).


## Install MongoDB

Note: To install a different version of MongoDB, please refer to that version's documentation. For example, see version [3.2](../install-mongodb-enterprise-on-linux/).


### Step 1: Install any missing dependencies.

To manually install MongoDB Enterprise, first install any dependencies
as appropriate for your operating system:

Red Hat Enterprise Linux/CentOS
   Version 6
      ```sh

      yum install cyrus-sasl cyrus-sasl-plain cyrus-sasl-gssapi krb5-libs libcurl libpcap net-snmp openldap openssl

      ```

   Version 7
      ```sh

      yum install cyrus-sasl cyrus-sasl-gssapi cyrus-sasl-plain krb5-libs libcurl libpcap lm_sensors-libs net-snmp net-snmp-agent-libs openldap openssl rpm-libs tcp_wrappers-libs

      ```

Ubuntu & Debian
   ```sh

   sudo apt-get install libcurl3 libgssapi-krb5-2 libkrb5-dbg libldap-2.4-2 libpcap0.8 libpci3 libsasl2-2 libsensors4 libsnmp30 libssl1.0.0 libwrap0

   ```

SUSE
   ```sh

   zypper install cyrus-sasl cyrus-sasl-plain cyrus-sasl-gssapi krb5 libcurl4 libldap-2_4-2 libopenssl1_0_0 libsensors4 libsnmp30 libpcap1 libwrap0 rpm

   ```

Amazon Linux
   ```sh

   yum install cyrus-sasl cyrus-sasl-plain cyrus-sasl-gssapi krb5-libs libcurl libpcap net-snmp openldap openssl

   ```


### Step 2: Download and extract the MongoDB Enterprise packages.

After you have installed the required prerequisite packages, download
and extract the MongoDB Enterprise tarball for your system from the
[MongoDB Download Center](https://www.mongodb.com/download-center#enterprise).


### Step 3: Ensure that the MongoDB binaries are in your ``PATH``.

The MongoDB binaries are in the ``bin/`` directory of the tarball.
You must either:

* Copy these binaries into a directory listed in your ``PATH`` variable such as ``/usr/local/bin``,

* Create symbolic links to each of these binaries from a directory listed in your ``PATH`` variable, or

* Modify your user's ``PATH`` environment variable to include this directory.


## Run MongoDB

Most Unix-like operating systems limit the system resources that a
session may use. These limits may negatively impact MongoDB operation.
See [UNIX ulimit Settings](https://docs.mongodb.com/manual/reference/ulimit) for more information.


### Step 1: Create the data directory.

Before you start MongoDB for the first time, create the directory to
which the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) process will write data. By default, the
[``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) process uses the ``/data/db`` directory. If you create
a directory other than this one, you must specify that directory in the
``dbpath`` option when starting the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) process
later in this procedure.

The following example command creates the default ``/data/db`` directory:

```sh

mkdir -p /data/db

```


### Step 2: Set permissions for the data directory.

Before running [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) for the first time, ensure that the
user account running [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) has read and write permissions
for the directory.


### Step 3: Run MongoDB.

To run MongoDB, run the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) process at the system prompt.
If necessary, specify the path of the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) or the data
directory. See the following examples.


#### Run without specifying paths

If your system ``PATH`` variable includes the location of the
[``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) binary and if you use the default data directory
(i.e., ``/data/db``), simply enter ``mongod`` at the system prompt:

```sh

mongod

```


#### Specify the path of the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod)

If your ``PATH`` does not include the location of the
[``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) binary, enter the full path to the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod)
binary at the system prompt:

```sh

<path to binary>/mongod

```


#### Specify the path of the data directory

If you do not use the default data directory (i.e., ``/data/db``),
specify the path to the data directory using the ``--dbpath`` option:

```sh

mongod --dbpath <path to data directory>

```


### Step 4: Begin using MongoDB.

To help you start using MongoDB, MongoDB provides [Getting
Started Guides](https://docs.mongodb.com/manual/tutorial/getting-started/#getting-started) in various driver editions. See
[Getting Started](https://docs.mongodb.com/manual/tutorial/getting-started/#getting-started) for the available editions.

Before deploying MongoDB in a production environment, consider the
[Production Notes](https://docs.mongodb.com/manual/administration/production-notes) document.

Later, to stop MongoDB, press ``Control+C`` in the terminal where the
[``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instance is running.
