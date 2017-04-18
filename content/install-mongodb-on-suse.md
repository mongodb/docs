+++
title = "Install MongoDB Community Edition on SUSE"

[tags]
mongodb = "product"
+++
# Install MongoDB Community Edition on SUSE


# On this page

* [Overview](#overview) 

* [Packages](#packages) 

* [Install MongoDB Community Edition](#install-mongodb-community-edition) 

* [Run MongoDB Community Edition](#run-mongodb-community-edition) 

* [Uninstall MongoDB Community Edition](#uninstall-mongodb-community-edition) 


## Overview

Use this tutorial to install MongoDB Community Edition on SUSE Linux 11
and 12 using ``.rpm`` packages. While SUSE includes its own MongoDB
packages, use the official MongoDB Community Edition packages to ensure
that you have the latest release.

Platform Support: This installation guide only supports 64-bit systems. See [Platform Support](#compatibility-platform-support) for details.


## Packages

MongoDB provides officially supported packages in their own repository. This
repository contains the following packages:

+---------------------------+----------------------------------------------------------------------------------------------------------+
| ``mongodb-org``           | A ``metapackage`` that will automatically install                                                        |
|                           | the four component packages listed below.                                                                |
|                           |                                                                                                          |
+---------------------------+----------------------------------------------------------------------------------------------------------+
| ``mongodb-org-server``    | Contains the [``mongod``](#bin.mongod) daemon and associated                                             |
|                           | configuration and init scripts.                                                                          |
|                           |                                                                                                          |
+---------------------------+----------------------------------------------------------------------------------------------------------+
| ``mongodb-org-mongos``    | Contains the [``mongos``](#bin.mongos) daemon.                                                           |
|                           |                                                                                                          |
+---------------------------+----------------------------------------------------------------------------------------------------------+
| ``mongodb-org-shell``     | Contains the [``mongo``](#bin.mongo) shell.                                                              |
|                           |                                                                                                          |
+---------------------------+----------------------------------------------------------------------------------------------------------+
| ``mongodb-org-tools``     | Contains the following MongoDB tools: [``mongoimport``](#bin.mongoimport)                                |
|                           | [``bsondump``](#bin.bsondump), [``mongodump``](#bin.mongodump), [``mongoexport``](#bin.mongoexport),     |
|                           | [``mongofiles``](#bin.mongofiles), [``mongooplog``](#bin.mongooplog),                                    |
|                           | [``mongoperf``](#bin.mongoperf), [``mongorestore``](#bin.mongorestore), [``mongostat``](#bin.mongostat), |
|                           | and [``mongotop``](#bin.mongotop).                                                                       |
|                           |                                                                                                          |
+---------------------------+----------------------------------------------------------------------------------------------------------+

The ``mongodb-org-server`` package provides an initialization script
that starts [``mongod``](#bin.mongod) with the ``/etc/mongod.conf``
configuration file.

See [Run MongoDB Community Edition](#run-mongodb-community-edition) for details on using this
initialization script.

These packages conflict with the  ``mongodb``, ``mongodb-server``, and
``mongodb-clients`` packages provided by Ubuntu.

The default ``/etc/mongod.conf`` configuration file supplied by the
packages have ``bind_ip`` set to ``127.0.0.1`` by default. Modify
this setting as needed for your environment before initializing a
[*replica set*](#term-replica-set).

Note: SUSE Linux Enterprise Server and potentially other SUSE distributions ship with virtual memory address space limited to 8 GB by default. You *must* adjust this in order to prevent virtual memory allocation failures as the database grows.The SLES packages for MongoDB adjust these limits in the default scripts, but you will need to make this change manually if you are using custom scripts and/or the tarball release rather than the SLES packages. 


## Install MongoDB Community Edition

Note: To install a version of MongoDB prior to 3.2, please refer to that version's documentation. For example, see version [3.0](https://docs.mongodb.com/v3.0/tutorial/install-mongodb-on-suse/). 

This installation guide only supports 64-bit systems. See [Platform Support](#compatibility-platform-support) for details.


### Step 1: Import the MongoDB public key

```sh

sudo rpm --import https://www.mongodb.org/static/pgp/server-3.4.asc

```


### Step 2: Configure the package management system (``zypper``).

Add the repository so that you can install MongoDB using ``zypper``.

Changed in version 3.0: MongoDB Linux packages are in a new repository beginning with 3.0.


#### For the *latest* stable release of MongoDB

Run the command appropriate for your version of SUSE:

SUSE 11
   ```sh

   sudo zypper addrepo --gpgcheck "https://repo.mongodb.org/zypper/suse/11/mongodb-org/3.4/x86_64/" mongodb

   ```

SUSE 12
   ```sh

   sudo zypper addrepo --gpgcheck "https://repo.mongodb.org/zypper/suse/12/mongodb-org/3.4/x86_64/" mongodb

   ```


#### For versions of MongoDB *earlier* than 3.4

To install MongoDB packages from a previous [release
series](#release-version-numbers), such as 3.0, you can
specify the release series in the repository configuration.

For example, to restrict your SUSE 11 system to the 3.0 release
series, use the following command:

```sh

sudo zypper addrepo --no-gpgcheck https://repo.mongodb.org/zypper/suse/11/mongodb-org/3.0/x86_64/ mongodb

```


### Step 3: Install the MongoDB packages and associated tools.

To install the latest stable version of MongoDB, issue the following
command:

```sh

sudo zypper -n install mongodb-org

```

Previous versions of MongoDB packages use a different repository location.
Refer to the version of the documentation appropriate for
your MongoDB version.


## Run MongoDB Community Edition

Most Unix-like operating systems limit the system resources that a
session may use. These limits may negatively impact MongoDB operation.
See [UNIX ulimit Settings](#) for more information.

The MongoDB instance stores its data files in ``/var/lib/mongo``
and its log files in ``/var/log/mongodb`` by default,
and runs using the ``mongod``
user account. You can specify alternate log and data file
directories in ``/etc/mongod.conf``. See [``systemLog.path``](#systemLog.path)
and [``storage.dbPath``](#storage.dbPath) for additional information.

If you change the user that runs the MongoDB process, you
**must** modify the access control rights to the ``/var/lib/mongo`` and
``/var/log/mongodb`` directories to give this user access to these
directories.


### Procedure


#### Step 1: Start MongoDB.

You can start the [``mongod``](#bin.mongod) process by issuing the following
command:

```sh

sudo service mongod start

```


#### Step 2: Verify that MongoDB has started successfully

You can verify that the [``mongod``](#bin.mongod) process has started
successfully by checking the contents of the log file at
``/var/log/mongodb/mongod.log``
for a line reading

```none

[initandlisten] waiting for connections on port <port>

```

where ``<port>`` is the port configured in ``/etc/mongod.conf``, ``27017`` by default.

You can optionally ensure that MongoDB will start following a system
reboot by issuing the following command:

```sh

sudo chkconfig mongod on

```


#### Step 3: Stop MongoDB.

As needed, you can stop the [``mongod``](#bin.mongod) process by issuing the
following command:

```sh

sudo service mongod stop

```


#### Step 4: Restart MongoDB.

You can restart the [``mongod``](#bin.mongod) process by issuing the following
command:

```sh

sudo service mongod restart

```

You can follow the state of the process for errors or important messages
by watching the output in the ``/var/log/mongodb/mongod.log`` file.


#### Step 5: Begin using MongoDB.

To help you start using MongoDB, MongoDB provides [Getting
Started Guides](#getting-started) in various driver editions. See
[Getting Started](#getting-started) for the available editions.

Before deploying MongoDB in a production environment, consider the
[Production Notes](#) document.

Later, to stop MongoDB, press ``Control+C`` in the terminal where the
[``mongod``](#bin.mongod) instance is running.


## Uninstall MongoDB Community Edition

To completely remove MongoDB from a system, you must remove the MongoDB
applications themselves, the configuration files, and any directories containing
data and logs. The following section guides you through the necessary steps.

Warning: This process will *completely* remove MongoDB, its configuration, and *all* databases. This process is not reversible, so ensure that all of your configuration and data is backed up before proceeding. 


### Step 1: Stop MongoDB.

Stop the [``mongod``](#bin.mongod) process by issuing the following command:

```sh

sudo service mongod stop

```


### Step 2: Remove Packages.

Remove any MongoDB packages that you had previously installed.

```sh

sudo zypper remove $(rpm -qa | grep mongodb-org)

```


### Step 3: Remove Data Directories.

Remove MongoDB databases and log files.

```sh

sudo rm -r /var/log/mongodb
sudo rm -r /var/lib/mongo

```
