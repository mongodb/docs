+++
title = "Install MongoDB Community Edition on Amazon Linux"

[tags]
mongodb = "product"
+++
# Install MongoDB Community Edition on Amazon Linux


# On this page

* [Overview](#overview) 

* [Packages](#packages) 

* [Install MongoDB Community Edition](#install-mongodb-community-edition) 

* [Run MongoDB Community Edition](#run-mongodb-community-edition) 

* [Uninstall MongoDB Community Edition](#uninstall-mongodb-community-edition) 

MongoDB Atlas and AWS: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas?jmp=docs) is a
hosted MongoDB service on AWS, for launching, running, and
maintaining MongoDB clusters.


## Overview

Use this tutorial to install MongoDB Community Edition on Amazon Linux from
``.rpm`` packages.

This installation guide only supports 64-bit systems. See [Platform Support](#compatibility-platform-support) for details.


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

The default ``/etc/mongod.conf`` configuration file supplied by the
packages have ``bind_ip`` set to ``127.0.0.1`` by default. Modify
this setting as needed for your environment before initializing a
[*replica set*](#term-replica-set).


## Install MongoDB Community Edition

Note: To install a version of MongoDB prior to 3.2, please refer to that version's documentation. For example, see version [3.0](https://docs.mongodb.com/v3.0/tutorial/install-mongodb-on-amazon/). 

This installation guide only supports 64-bit systems. See [Platform Support](#compatibility-platform-support) for details.


### Step 1: Configure the package management system (``yum``).

Create a ``/etc/yum.repos.d/mongodb-org-3.4.repo`` file so that
you can install MongoDB directly, using ``yum``.

Changed in version 3.0: MongoDB Linux packages are in a new repository beginning with 3.0.


#### For the *latest* stable release of MongoDB

Use the following repository file:

```cfg

[mongodb-org-3.4]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/amazon/2013.03/mongodb-org/3.4/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-3.4.asc

```


#### For versions of MongoDB *earlier* than 3.0

To install the packages from an earlier [release series](#release-version-numbers), such as 2.4 or 2.6, you can specify
the release series in the repository configuration. For example,
to restrict your system to the 2.6 release series, create a
``/etc/yum.repos.d/mongodb-org-2.6.repo`` file to hold the
following configuration information for the MongoDB 2.6
repository:

```cfg

[mongodb-org-2.6]
name=MongoDB 2.6 Repository
baseurl=http://downloads-distro.mongodb.org/repo/redhat/os/x86_64/
gpgcheck=0
enabled=1

```

You can find ``.repo`` files for each release [in the repository itself](https://repo.mongodb.org/yum/amazon/).
Remember that odd-numbered minor release versions (e.g. 2.5) are development versions and are unsuitable
for production use.


### Step 2: Install the MongoDB packages and associated tools.

To install the latest stable version of MongoDB, issue the following
command:

```sh

sudo yum install -y mongodb-org

```


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


### Step 1: Start MongoDB.

You can start the [``mongod``](#bin.mongod) process by issuing the following
command:

```sh

sudo service mongod start

```


### Step 2: Verify that MongoDB has started successfully

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


### Step 3: Stop MongoDB.

As needed, you can stop the [``mongod``](#bin.mongod) process by issuing the
following command:

```sh

sudo service mongod stop

```


### Step 4: Restart MongoDB.

You can restart the [``mongod``](#bin.mongod) process by issuing the following
command:

```sh

sudo service mongod restart

```

You can follow the state of the process for errors or important messages
by watching the output in the ``/var/log/mongodb/mongod.log`` file.


### Step 5: Begin using MongoDB.

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

sudo yum erase $(rpm -qa | grep mongodb-org)

```


### Step 3: Remove Data Directories.

Remove MongoDB databases and log files.

```sh

sudo rm -r /var/log/mongodb
sudo rm -r /var/lib/mongo

```
