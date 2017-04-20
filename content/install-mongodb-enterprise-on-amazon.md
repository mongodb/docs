+++
title = "Install MongoDB Enterprise on Amazon Linux"

[tags]
mongodb = "product"
+++

MongoDB Atlas and AWS: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas?jmp=docs) is a
hosted MongoDB service on AWS, for launching, running, and
maintaining MongoDB clusters.


## Overview

Use this tutorial to install [MongoDB Enterprise](https://www.mongodb.com/products/mongodb-enterprise-advanced?jmp=docs) on Amazon Linux
AMI. MongoDB Enterprise is available on select platforms and contains
support for several features related to security and monitoring.

This installation guide only supports 64-bit systems. See [Platform Support](#compatibility-platform-support) for details.

MongoDB provides officially supported Enterprise packages in their own
repository. This repository contains the following packages:

| Package | Description
| ------- | -----------
| ``mongodb-enterprise``        | A ``metapackage`` that will automatically install the four component packages listed below.
| ``mongodb-enterprise-server`` | Contains the [``mongod``](#bin.mongod) daemon and associated configuration and init scripts.
| ``mongodb-enterprise-mongos`` | Contains the [``mongos``](#bin.mongos) daemon.
| ``mongodb-enterprise-shell``  | Contains the [``mongo``](#bin.mongo) shell.
| ``mongodb-enterprise-tools``  | Contains the following MongoDB tools: [``mongoimport``](#bin.mongoimport), [``bsondump``](#bin.bsondump), [``mongodump``](#bin.mongodump), [``mongoexport``](#bin.mongoexport), [``mongofiles``](#bin.mongofiles), [``mongooplog``](#bin.mongooplog), [``mongoperf``](#bin.mongoperf), [``mongorestore``](#bin.mongorestore), [``mongostat``](#bin.mongostat), and [``mongotop``](#bin.mongotop).


## Install MongoDB Enterprise

Note: To install a version of MongoDB prior to 3.2, please refer to that version's documentation. For example, see version [3.0](https://docs.mongodb.com/v3.0/tutorial/install-mongodb-enterprise-on-amazon/).


### Step 1: Configure repository.

Create an ``/etc/yum.repos.d/mongodb-enterprise.repo`` file so that
you can install MongoDB enterprise directly, using ``yum``.


#### For the *latest* stable release of MongoDB Enterprise

Use the following repository file:

```cfg

[mongodb-enterprise]
name=MongoDB Enterprise Repository
baseurl=https://repo.mongodb.com/yum/amazon/2013.03/mongodb-enterprise/3.4/$basearch/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-3.4.asc

```

``.repo`` files for each release can also be found [in the repository itself](https://repo.mongodb.com/yum/amazon/).
Remember that odd-numbered minor release versions (e.g. 2.5) are development versions and are unsuitable
for production deployment.


### Step 2: Install the MongoDB Enterprise packages and associated tools.

To install the latest stable version of MongoDB Enterprise, issue the following command:

```sh

sudo yum install -y mongodb-enterprise

```


### Step 3: When the install completes, you can run MongoDB.


## Install MongoDB Enterprise From Tarball

While you should use the ``.rpm`` packages as previously
described, you may also manually install MongoDB using the tarballs. See
[Install MongoDB Enterprise From Tarball](#) for details.


## Run MongoDB Enterprise

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

Most Unix-like operating systems limit the system resources that a
session may use. These limits may negatively impact MongoDB operation.
See [UNIX ulimit Settings](#) for more information.


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


## Uninstall MongoDB

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

sudo yum erase $(rpm -qa | grep mongodb-enterprise)

```


### Step 3: Remove Data Directories.

Remove MongoDB databases and log files.

```sh

sudo rm -r /var/log/mongodb
sudo rm -r /var/lib/mongo

```
