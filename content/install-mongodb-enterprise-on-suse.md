+++
title = "Install MongoDB Enterprise on SUSE"

tags = [ "mongodb-enterprise", "administration", "beginner" ]
+++

# Install MongoDB Enterprise on SUSE


## Overview

Use this tutorial to install [MongoDB Enterprise](https://www.mongodb.com/products/mongodb-enterprise-advanced?jmp=docs) on SUSE Linux 11 and 12.
MongoDB Enterprise is available on select platforms and contains support
for several features related to security and monitoring.

Platform Support: This installation guide only supports 64-bit systems. See [Platform Support](https://docs.mongodb.com/manual/release-notes/3.0-compatibility/#compatibility-platform-support) for details.

MongoDB provides officially supported Enterprise packages in their own
repository. This repository contains the following packages:

| - | - | - |
| ``mongodb-enterprise`` | A ``metapackage`` that will automatically installthe four component packages listed below. |
| ``mongodb-enterprise-server`` | Contains the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) daemon and associatedconfiguration and init scripts. |
| ``mongodb-enterprise-mongos`` | Contains the [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) daemon. |
| ``mongodb-enterprise-shell`` | Contains the [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell. |
| ``mongodb-enterprise-tools`` | Contains the following MongoDB tools: [``mongoimport``](https://docs.mongodb.com/manual/reference/program/mongoimport/#bin.mongoimport)[``bsondump``](https://docs.mongodb.com/manual/reference/program/bsondump/#bin.bsondump), [``mongodump``](https://docs.mongodb.com/manual/reference/program/mongodump/#bin.mongodump), [``mongoexport``](https://docs.mongodb.com/manual/reference/program/mongoexport/#bin.mongoexport),[``mongofiles``](https://docs.mongodb.com/manual/reference/program/mongofiles/#bin.mongofiles), [``mongooplog``](https://docs.mongodb.com/manual/reference/program/mongooplog/#bin.mongooplog),[``mongoperf``](https://docs.mongodb.com/manual/reference/program/mongoperf/#bin.mongoperf), [``mongorestore``](https://docs.mongodb.com/manual/reference/program/mongorestore/#bin.mongorestore), [``mongostat``](https://docs.mongodb.com/manual/reference/program/mongostat/#bin.mongostat),and [``mongotop``](https://docs.mongodb.com/manual/reference/program/mongotop/#bin.mongotop). |


## Considerations

MongoDB only provides Enterprise packages for 64-bit builds of SUSE
Enterprise Linux versions 11 and 12.

Use the provided distribution packages as described in this page if possible.
These packages will automatically install all of MongoDB's dependencies, and are
the recommended installation method.

Note: SUSE Linux Enterprise Server and potentially other SUSE distributions ship with virtual memory address space limited to 8 GB by default. You *must* adjust this in order to prevent virtual memory allocation failures as the database grows.The SLES packages for MongoDB adjust these limits in the default scripts, but you will need to make this change manually if you are using custom scripts and/or the tarball release rather than the SLES packages.


## Install MongoDB Enterprise

Note: To install a version of MongoDB prior to 3.2, please refer to that version's documentation. For example, see version [3.0](install-mongodb-enterprise-on-suse/).


### Step 1: Import the MongoDB public key

```sh

sudo rpm --import https://www.mongodb.org/static/pgp/server-3.4.asc

```


### Step 2: Configure the package management system (``zypper``).

Add the repository so that you can install MongoDB using ``zypper``.

Run the command appropriate for your version of SUSE:

SUSE 11
   ```sh

   sudo zypper addrepo --gpgcheck "https://repo.mongodb.com/zypper/suse/11/mongodb-enterprise/3.4/x86_64/" mongodb

   ```

SUSE 12
   ```sh

   sudo zypper addrepo --gpgcheck "https://repo.mongodb.com/zypper/suse/12/mongodb-enterprise/3.4/x86_64/" mongodb

   ```

If you'd like to install MongoDB packages from a previous [release
series](https://docs.mongodb.com/manual/release-notes/#release-version-numbers), such as 2.6, you can
specify the release series in the repository configuration. For
example, to restrict your SUSE 11 system to the 2.6 release series,
use the following command:

```sh

sudo zypper addrepo --no-gpgcheck https://repo.mongodb.com/zypper/suse/11/mongodb-enterprise/2.6/x86_64/ mongodb

```


### Step 3: Install the MongoDB packages and associated tools.

To install the latest stable version of MongoDB, issue the following
command:

```sh

sudo zypper -n install mongodb-enterprise

```

Previous versions of MongoDB packages use a different repository location.
Refer to the version of the documentation appropriate for
your MongoDB version.

<span id="install-suse-from-tarball"></span>


## Install MongoDB Enterprise From Tarball

While you should use the ``.rpm`` packages as previously
described, you may also manually install MongoDB using the tarballs. See
[Install MongoDB Enterprise From Tarball](install-mongodb-enterprise-on-linux/) for details.


## Run MongoDB Enterprise


### Prerequisites

The MongoDB instance stores its data files in ``/var/lib/mongo``
and its log files in ``/var/log/mongodb`` by default,
and runs using the ``mongod``
user account. You can specify alternate log and data file
directories in ``/etc/mongod.conf``. See [``systemLog.path``](https://docs.mongodb.com/manual/reference/configuration-options/#systemLog.path)
and [``storage.dbPath``](https://docs.mongodb.com/manual/reference/configuration-options/#storage.dbPath) for additional information.

If you change the user that runs the MongoDB process, you
**must** modify the access control rights to the ``/var/lib/mongo`` and
``/var/log/mongodb`` directories to give this user access to these
directories.

Most Unix-like operating systems limit the system resources that a
session may use. These limits may negatively impact MongoDB operation.
See [UNIX ulimit Settings](https://docs.mongodb.com/manual/reference/ulimit) for more information.


### Procedure


#### Step 1: Start MongoDB.

You can start the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) process by issuing the following
command:

```sh

sudo service mongod start

```


#### Step 2: Verify that MongoDB has started successfully

You can verify that the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) process has started
successfully by checking the contents of the log file at
``/var/log/mongodb/mongod.log``
for a line reading

```

[initandlisten] waiting for connections on port <port>

```

where ``<port>`` is the port configured in ``/etc/mongod.conf``, ``27017`` by default.

You can optionally ensure that MongoDB will start following a system
reboot by issuing the following command:

```sh

sudo chkconfig mongod on

```


#### Step 3: Stop MongoDB.

As needed, you can stop the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) process by issuing the
following command:

```sh

sudo service mongod stop

```


#### Step 4: Restart MongoDB.

You can restart the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) process by issuing the following
command:

```sh

sudo service mongod restart

```

You can follow the state of the process for errors or important messages
by watching the output in the ``/var/log/mongodb/mongod.log`` file.


#### Step 5: Begin using MongoDB.

To help you start using MongoDB, MongoDB provides [Getting
Started Guides](https://docs.mongodb.com/manual/#getting-started) in various driver editions. See
[Getting Started](https://docs.mongodb.com/manual/#getting-started) for the available editions.

Before deploying MongoDB in a production environment, consider the
[Production Notes](https://docs.mongodb.com/manual/administration/production-notes) document.

Later, to stop MongoDB, press ``Control+C`` in the terminal where the
[``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instance is running.


## Uninstall MongoDB

To completely remove MongoDB from a system, you must remove the MongoDB
applications themselves, the configuration files, and any directories containing
data and logs. The following section guides you through the necessary steps.

Warning: This process will *completely* remove MongoDB, its configuration, and *all* databases. This process is not reversible, so ensure that all of your configuration and data is backed up before proceeding.


### Step 1: Stop MongoDB.

Stop the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) process by issuing the following command:

```sh

sudo service mongod stop

```


### Step 2: Remove Packages.

Remove any MongoDB packages that you had previously installed.

```sh

sudo zypper remove $(rpm -qa | grep mongodb-enterprise)

```


### Step 3: Remove Data Directories.

Remove MongoDB databases and log files.

```sh

sudo rm -r /var/log/mongodb
sudo rm -r /var/lib/mongo

```
