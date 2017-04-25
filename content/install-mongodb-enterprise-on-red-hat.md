+++
title = "Install MongoDB Enterprise on Red Hat Enterprise or CentOS"

[tags]
mongodb = "product"
+++

# Install MongoDB Enterprise on Red Hat Enterprise or CentOS


## Overview

Use this tutorial to install [MongoDB Enterprise](https://www.mongodb.com/products/mongodb-enterprise-advanced?jmp=docs) on Red Hat Enterprise Linux or CentOS
Linux versions 6 and 7 from ``.rpm`` packages.

Platform Support: This installation guide only supports 64-bit systems. See [Platform Support](https://docs.mongodb.com/manual/release-notes/3.0-compatibility/#compatibility-platform-support) for details.MongoDB 3.2 deprecates support for Red Hat Enterprise Linux 5.

MongoDB provides officially supported Enterprise packages in their own
repository. This repository contains the following packages:

| - | - | - |
| ``mongodb-enterprise`` | A ``metapackage`` that will automatically installthe four component packages listed below. |
| ``mongodb-enterprise-server`` | Contains the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) daemon and associatedconfiguration and init scripts. |
| ``mongodb-enterprise-mongos`` | Contains the [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) daemon. |
| ``mongodb-enterprise-shell`` | Contains the [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell. |
| ``mongodb-enterprise-tools`` | Contains the following MongoDB tools: [``mongoimport``](https://docs.mongodb.com/manual/reference/program/mongoimport/#bin.mongoimport)[``bsondump``](https://docs.mongodb.com/manual/reference/program/bsondump/#bin.bsondump), [``mongodump``](https://docs.mongodb.com/manual/reference/program/mongodump/#bin.mongodump), [``mongoexport``](https://docs.mongodb.com/manual/reference/program/mongoexport/#bin.mongoexport),[``mongofiles``](https://docs.mongodb.com/manual/reference/program/mongofiles/#bin.mongofiles), [``mongooplog``](https://docs.mongodb.com/manual/reference/program/mongooplog/#bin.mongooplog),[``mongoperf``](https://docs.mongodb.com/manual/reference/program/mongoperf/#bin.mongoperf), [``mongorestore``](https://docs.mongodb.com/manual/reference/program/mongorestore/#bin.mongorestore), [``mongostat``](https://docs.mongodb.com/manual/reference/program/mongostat/#bin.mongostat),and [``mongotop``](https://docs.mongodb.com/manual/reference/program/mongotop/#bin.mongotop). |

The default ``/etc/mongod.conf`` configuration file supplied by the
packages have ``bind_ip`` set to ``127.0.0.1`` by default. Modify
this setting as needed for your environment before initializing a
[*replica set*](https://docs.mongodb.com/manual/reference/glossary/#term-replica-set).


## Install MongoDB Enterprise

Note: To install a version of MongoDB prior to 3.2, please refer to that version's documentation. For example, see version [3.0](install-mongodb-enterprise-on-red-hat/).

Use the provided distribution packages as described in this page if possible.
These packages will automatically install all of MongoDB's dependencies, and are
the recommended installation method.


### Step 1: Configure repository.

Create an ``/etc/yum.repos.d/mongodb-enterprise.repo`` file so that
you can install MongoDB enterprise directly, using ``yum``.


#### For the *latest* stable release of MongoDB Enterprise

Use the following repository file:

```cfg

[mongodb-enterprise]
name=MongoDB Enterprise Repository
baseurl=https://repo.mongodb.com/yum/redhat/$releasever/mongodb-enterprise/3.4/$basearch/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-3.4.asc

```

``.repo`` files for each release can also be found [in the repository itself](https://repo.mongodb.com/yum/redhat/).
Remember that odd-numbered minor release versions (e.g. 2.5) are development versions and are unsuitable
for production deployment.


### Step 2: Install the MongoDB Enterprise packages and associated tools.

To install the latest stable version of MongoDB Enterprise, issue the following command:

```sh

sudo yum install -y mongodb-enterprise

```


### Step 3: When the install completes, you can run MongoDB.

<span id="install-redhat-from-tarball"></span>


## Install MongoDB Enterprise From Tarball

While you should use the ``.rpm`` packages as previously
described, you may also manually install MongoDB using the tarballs. See
[Install MongoDB Enterprise From Tarball](install-mongodb-enterprise-on-linux/) for details.


## Run MongoDB Enterprise


### Prerequisites

<span id="install-enterprise-rhel-configure-selinux"></span>


#### Configure SELinux

Important: If you are using SELinux, you must configure SELinux to allow MongoDB to start on Red Hat Linux-based systems (Red Hat Enterprise Linux or CentOS Linux).

To configure SELinux, administrators have three options:

* If SELinux is in ``enforcing`` mode, enable access to the relevant ports that the MongoDB deployment will use (e.g. ``27017``). See [Default MongoDB Port](https://docs.mongodb.com/manual/reference/default-mongodb-port) for more information on MongoDB's default ports. For default settings, this can be accomplished by running

  ```sh

  semanage port -a -t mongod_port_t -p tcp 27017

  ```

* Disable SELinux by setting the ``SELINUX`` setting to ``disabled`` in ``/etc/selinux/config``.

  ```sh

  SELINUX=disabled

  ```

  You must reboot the system for the changes to take effect.

* Set SELinux to ``permissive`` mode in ``/etc/selinux/config`` by setting the ``SELINUX`` setting to ``permissive``.

  ```sh

  SELINUX=permissive

  ```

  You must reboot the system for the changes to take effect.

  You can instead use ``setenforce`` to change to ``permissive`` mode.
  ``setenforce`` does not require a reboot but is **not** persistent.

Alternatively, you can choose not to install the SELinux packages when you are
installing your Linux operating system, or choose to remove the relevant
packages. This option is the most invasive and is not recommended.

<span id="install-enterprise-selinux-data-directory"></span>


#### Data Directories and Permissions

Warning: On RHEL 7.0, if you change the data path, the *default* SELinux policies will prevent [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) from having write access on the new data path if you do not change the security context.

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


#### ulimit

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

sudo yum erase $(rpm -qa | grep mongodb-enterprise)

```


### Step 3: Remove Data Directories.

Remove MongoDB databases and log files.

```sh

sudo rm -r /var/log/mongodb
sudo rm -r /var/lib/mongo

```
