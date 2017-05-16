+++
title = "Install MongoDB Enterprise on OS X"

tags = [ "mongodb-enterprise", "administration", "beginner" ]
+++

# Install MongoDB Enterprise on OS X


## Overview

Use this tutorial to install [MongoDB Enterprise](https://www.mongodb.com/products/mongodb-enterprise-advanced?jmp=docs) on OS X systems. MongoDB Enterprise
is available on select platforms and contains support for several features
related to security and monitoring.

Platform Support: MongoDB only supports OS X versions 10.7 (Lion) and later on Intel x86-64.
Versions of MongoDB Enterprise prior to 3.2 did not support OS X.


## Install MongoDB Enterprise


### Step 1

Download the latest production release of [MongoDB Enterprise](http://www.mongodb.com/products/mongodb-enterprise?jmp=docs).


### Step 2: Extract the files from the downloaded archive.

For example, from a system shell, you can extract through the ``tar`` command:

```sh

tar -zxvf mongodb-osx-x86_64-enterprise-3.4.2.tgz

```


### Step 3: Copy the extracted archive to the target directory.

Copy the extracted folder to the location from which MongoDB will run.

```sh

mkdir -p mongodb
cp -R -n mongodb-osx-x86_64-enterprise-3.4.2/ mongodb

```


### Step 4: Ensure the location of the binaries is in the ``PATH`` variable.

The MongoDB binaries are in the ``bin/`` directory of the archive. To
ensure that the binaries are in your ``PATH``, you can modify your
``PATH``.

For example, you can add the following line to your shell's
``rc`` file (e.g. ``~/.bashrc``):

```sh

export PATH=<mongodb-install-directory>/bin:$PATH

```

Replace ``<mongodb-install-directory>`` with the path to the extracted
MongoDB archive.


## Run MongoDB Enterprise


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
Started Guides](https://docs.mongodb.com/manual/#getting-started) in various driver editions. See
[Getting Started](https://docs.mongodb.com/manual/#getting-started) for the available editions.

Before deploying MongoDB in a production environment, consider the
[Production Notes](https://docs.mongodb.com/manual/administration/production-notes) document.

Later, to stop MongoDB, press ``Control+C`` in the terminal where the
[``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instance is running.
