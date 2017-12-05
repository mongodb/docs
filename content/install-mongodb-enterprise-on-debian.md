+++
title = "Install MongoDB Enterprise on Debian"

tags = [ "mongodb-enterprise", "administration", "beginner" ]
+++

# Install MongoDB Enterprise on Debian


## Overview

Use this tutorial to install [MongoDB Enterprise](https://www.mongodb.com/products/mongodb-enterprise-advanced?jmp=docs) from ``.deb`` packages on
Debian 7 "Wheezy" or Debian 8 "Jessie".

Platform Support: This installation guide only supports 64-bit systems. See [Platform Support](https://docs.mongodb.com/manual/release-notes/3.0-compatibility/#compatibility-platform-support) for details.

MongoDB provides officially supported Enterprise packages in their own
repository. This repository contains the following packages:

| Package Name | Description |
| - | - | - |
| ``mongodb-enterprise`` | A ``metapackage`` that will automatically installthe four component packages listed below. |
| ``mongodb-enterprise-server`` | Contains the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) daemon and associatedconfiguration and init scripts. |
| ``mongodb-enterprise-mongos`` | Contains the [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) daemon. |
| ``mongodb-enterprise-shell`` | Contains the [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell. |
| ``mongodb-enterprise-tools`` | Contains the following MongoDB tools: [``mongoimport``](https://docs.mongodb.com/manual/reference/program/mongoimport/#bin.mongoimport)[``bsondump``](https://docs.mongodb.com/manual/reference/program/bsondump/#bin.bsondump), [``mongodump``](https://docs.mongodb.com/manual/reference/program/mongodump/#bin.mongodump), [``mongoexport``](https://docs.mongodb.com/manual/reference/program/mongoexport/#bin.mongoexport),[``mongofiles``](https://docs.mongodb.com/manual/reference/program/mongofiles/#bin.mongofiles),[``mongoperf``](https://docs.mongodb.com/manual/reference/program/mongoperf/#bin.mongoperf), [``mongorestore``](https://docs.mongodb.com/manual/reference/program/mongorestore/#bin.mongorestore), [``mongostat``](https://docs.mongodb.com/manual/reference/program/mongostat/#bin.mongostat),and [``mongotop``](https://docs.mongodb.com/manual/reference/program/mongotop/#bin.mongotop). |


## Install MongoDB Enterprise

Note: To install a different version of MongoDB, please refer to that version's documentation. For example, see version [3.2](../install-mongodb-enterprise-on-debian/).

This installation guide only supports 64-bit systems. See [Platform Support](https://docs.mongodb.com/manual/release-notes/3.0-compatibility/#compatibility-platform-support) for details.

Use the provided distribution packages as described in this page if possible.
These packages will automatically install all of MongoDB's dependencies, and are
the recommended installation method.


### Step 1: Import the public key used by the package management system.

The Ubuntu package management tools (i.e. ``dpkg`` and ``apt``) ensure
package consistency and authenticity by requiring that distributors
sign packages with GPG keys. Issue the following command to import the
[MongoDB public GPG Key](https://www.mongodb.org/static/pgp/server-3.6.asc):

```sh

sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5

```


### Step 2: Create a ``/etc/apt/sources.list.d/mongodb-enterprise.list`` file for MongoDB.

Create the list file using the command appropriate for your version
of Debian:

Debian 7 "Wheezy"
   ```sh

   echo "deb http://repo.mongodb.com/apt/debian wheezy/mongodb-enterprise/testing main" | sudo tee /etc/apt/sources.list.d/mongodb-enterprise.list

   ```

Debian 8 "Jessie"
   ```sh

   echo "deb http://repo.mongodb.com/apt/debian jessie/mongodb-enterprise/testing main" | sudo tee /etc/apt/sources.list.d/mongodb-enterprise.list

   ```

If you'd like to install MongoDB Enterprise packages from a
particular [release series](https://docs.mongodb.com/manual/release-notes/#release-version-numbers), such as
2.6, you can specify the release series in the repository
configuration. For example, to restrict your system to the 2.6
release series, add the following repository:

```sh

echo "deb http://repo.mongodb.com/apt/debian wheezy/mongodb-enterprise/2.6 main" | sudo tee /etc/apt/sources.list.d/mongodb-enterprise-2.6.list

```

Currently packages are available for Debian 7 "Wheezy" and Debian 8 "Jessie".


### Step 3: Reload local package database.

Issue the following command to reload the local package database:

```sh

sudo apt-get update

```


### Step 4: Install the MongoDB Enterprise packages.


#### Install the 3.6 release candidate version of MongoDB Enterprise.

Issue the following command:

```sh

sudo apt-get install -y mongodb-enterprise

```

Versions of the MongoDB packages before 2.6 use a different repository
location. Refer to the version of the documentation appropriate for
your MongoDB version.

<span id="install-debian-from-tarball"></span>


## Install MongoDB Enterprise From Tarball

While you should use the ``.deb`` packages as previously
described, you may also manually install MongoDB using the tarballs. See
[Install MongoDB Enterprise From Tarball](../install-mongodb-enterprise-on-linux/) for details.


## Run MongoDB Enterprise

The MongoDB instance stores its data files in ``/var/lib/mongodb``
and its log files in ``/var/log/mongodb`` by default,
and runs using the ``mongodb``
user account. You can specify alternate log and data file
directories in ``/etc/mongod.conf``. See [``systemLog.path``](https://docs.mongodb.com/manual/reference/configuration-options/#systemLog.path)
and [``storage.dbPath``](https://docs.mongodb.com/manual/reference/configuration-options/#storage.dbPath) for additional information.

If you change the user that runs the MongoDB process, you
**must** modify the access control rights to the ``/var/lib/mongodb`` and
``/var/log/mongodb`` directories to give this user access to these
directories.

Most Unix-like operating systems limit the system resources that a
session may use. These limits may negatively impact MongoDB operation.
See [UNIX ulimit Settings](https://docs.mongodb.com/manual/reference/ulimit) for more information.


### Step 1: Start MongoDB.

Issue the following command to start [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod):

```sh

sudo service mongod start

```


### Step 2: Verify that MongoDB has started successfully

Verify that the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) process has started successfully by
checking the contents of the log file at
``/var/log/mongodb/mongod.log``
for a line reading

```

[initandlisten] waiting for connections on port <port>

```

where ``<port>`` is the port configured in ``/etc/mongod.conf``, ``27017`` by default.


### Step 3: Stop MongoDB.

As needed, you can stop the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) process by issuing the
following command:

```sh

sudo service mongod stop

```


### Step 4: Restart MongoDB.

Issue the following command to restart [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod):

```sh

sudo service mongod restart

```


### Step 5: Begin using MongoDB.

To help you start using MongoDB, MongoDB provides [Getting
Started Guides](https://docs.mongodb.com/manual/tutorial/getting-started/#getting-started) in various driver editions. See
[Getting Started](https://docs.mongodb.com/manual/tutorial/getting-started/#getting-started) for the available editions.

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

sudo apt-get purge mongodb-enterprise*

```


### Step 3: Remove Data Directories.

Remove MongoDB databases and log files.

```sh

sudo rm -r /var/log/mongodb
sudo rm -r /var/lib/mongodb

```
