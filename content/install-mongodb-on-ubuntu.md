+++
title = "Install MongoDB Community Edition on Ubuntu"

tags = [
"mongodb",
"administration",
"beginner" ]
+++

# Install MongoDB Community Edition on Ubuntu


## Overview

Use this tutorial to install MongoDB Community Edition on LTS Ubuntu Linux systems from
``.deb`` packages. While Ubuntu includes its own MongoDB packages, the official
MongoDB Community Edition packages are generally more up-to-date.

Platform Support: MongoDB only provides packages for 64-bit LTS (long-term support) Ubuntu releases.
For example, 12.04 LTS (precise), 14.04 LTS (trusty), 16.04 LTS (xenial), and so on.
These packages may work with other Ubuntu releases, however, they are not supported. MongoDB 3.6 deprecates support for Ubuntu 12.04 LTS (precise).

Package Updates required on Ubuntu 16.04 for IBM POWER Systems: Due to a lock elision bug present in older versions of the ``glibc``
package on Ubuntu 16.04 for POWER, you must upgrade the ``glibc``
package to at least ``glibc 2.23-0ubuntu5`` before running MongoDB.
Systems with older versions of the ``glibc`` package will experience
database server crashes and misbehavior due to random memory
corruption, and are unsuitable for production deployments of MongoDB


## Packages

MongoDB provides officially supported packages in their own repository. This
repository contains the following packages:

| Package Name | Description |
| - | - | - |
| ``mongodb-org`` | A ``metapackage`` that will automatically installthe four component packages listed below. |
| ``mongodb-org-server`` | Contains the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) daemon and associatedconfiguration and init scripts. |
| ``mongodb-org-mongos`` | Contains the [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) daemon. |
| ``mongodb-org-shell`` | Contains the [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell. |
| ``mongodb-org-tools`` | Contains the following MongoDB tools: [``mongoimport``](https://docs.mongodb.com/manual/reference/program/mongoimport/#bin.mongoimport)[``bsondump``](https://docs.mongodb.com/manual/reference/program/bsondump/#bin.bsondump), [``mongodump``](https://docs.mongodb.com/manual/reference/program/mongodump/#bin.mongodump), [``mongoexport``](https://docs.mongodb.com/manual/reference/program/mongoexport/#bin.mongoexport),[``mongofiles``](https://docs.mongodb.com/manual/reference/program/mongofiles/#bin.mongofiles),[``mongoperf``](https://docs.mongodb.com/manual/reference/program/mongoperf/#bin.mongoperf), [``mongorestore``](https://docs.mongodb.com/manual/reference/program/mongorestore/#bin.mongorestore), [``mongostat``](https://docs.mongodb.com/manual/reference/program/mongostat/#bin.mongostat),and [``mongotop``](https://docs.mongodb.com/manual/reference/program/mongotop/#bin.mongotop). |

The ``mongodb-org-server`` package provides an initialization script
that starts [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) with the ``/etc/mongod.conf``
configuration file.

See [Run MongoDB Community Edition](#run-mongodb-community-edition) for details on using this
initialization script.

These packages conflict with the  ``mongodb``, ``mongodb-server``, and
``mongodb-clients`` packages provided by Ubuntu.

The default ``/etc/mongod.conf`` configuration file supplied by the
packages have ``bind_ip`` set to ``127.0.0.1`` by default. Modify
this setting as needed for your environment before initializing a
[*replica set*](https://docs.mongodb.com/manual/reference/glossary/#term-replica-set).


## Install MongoDB Community Edition

Note: To install a different version of MongoDB, please refer to that version's documentation. For example, see version [3.2](../install-mongodb-on-ubuntu/).

MongoDB only provides packages for 64-bit LTS (long-term support) Ubuntu releases.
For example, 12.04 LTS (precise), 14.04 LTS (trusty), 16.04 LTS (xenial), and so on.
These packages may work with other Ubuntu releases, however, they are not supported.

MongoDB 3.6 deprecates support for Ubuntu 12.04 LTS (precise).


### Step 1: Import the public key used by the package management system.

The Ubuntu package management tools (i.e. ``dpkg`` and ``apt``) ensure
package consistency and authenticity by requiring that distributors
sign packages with GPG keys. Issue the following command to import the
[MongoDB public GPG Key](https://www.mongodb.org/static/pgp/server-3.6.asc):

```sh

sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5

```


### Step 2: Create a list file for MongoDB.

Create the ``/etc/apt/sources.list.d/mongodb-org-3.6.list`` list file using
the command appropriate for your version of Ubuntu:

Ubuntu 12.04 (deprecated)
   ```sh

   echo "deb [ arch=amd64 ] http://repo.mongodb.org/apt/ubuntu precise/mongodb-org/testing multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.6.list

   ```

Ubuntu 14.04
   ```sh

   echo "deb [ arch=amd64 ] http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/testing multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.6.list

   ```

Ubuntu 16.04
   ```sh

   echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/testing multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.6.list

   ```


### Step 3: Reload local package database.

Issue the following command to reload the local package database:

```sh

sudo apt-get update

```


### Step 4: Install the MongoDB packages.


#### Install the latest stable version of MongoDB.

Issue the following command:

```sh

sudo apt-get install -y mongodb-org

```


## Run MongoDB Community Edition

Most Unix-like operating systems limit the system resources that a
session may use. These limits may negatively impact MongoDB operation.
See [UNIX ulimit Settings](https://docs.mongodb.com/manual/reference/ulimit) for more information.

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


## Uninstall MongoDB Community Edition

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

sudo apt-get purge mongodb-org*

```


### Step 3: Remove Data Directories.

Remove MongoDB databases and log files.

```sh

sudo rm -r /var/log/mongodb
sudo rm -r /var/lib/mongodb

```
