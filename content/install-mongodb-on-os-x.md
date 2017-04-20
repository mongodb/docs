+++
title = "Install MongoDB Community Edition on OS X"

[tags]
mongodb = "product"
+++

## Overview

Use this tutorial to install MongoDB Community Edition on OS X systems.

Platform Support: Starting in version 3.0, MongoDB only supports OS X versions 10.7 (Lion)
and later on Intel x86-64.

You may download MongoDB Community Edition through either the [MongoDB
Download site](https://www.mongodb.com/download-center) or the
popular OS X package manager [Homebrew](http://brew.sh/).


## Install MongoDB Community Edition

Note: To install a version of MongoDB prior to 3.2, please refer to that version's documentation. For example, see version [3.0](https://docs.mongodb.com/v3.0/tutorial/install-mongodb-on-os-x/). 


### Install MongoDB Community Edition Manually


#### Step 1: Download the binary files for the desired release of MongoDB.

Download the binaries from ``https://www.mongodb.com/download-center``.

For example, to download the latest release through the shell, issue
the following:

```sh

curl -O https://fastdl.mongodb.org/osx/mongodb-osx-x86_64-3.4.2.tgz

```


#### Step 2: Extract the files from the downloaded archive.

For example, from a system shell, you can extract through the ``tar`` command:

```sh

tar -zxvf mongodb-osx-x86_64-3.4.2.tgz

```


#### Step 3: Copy the extracted archive to the target directory.

Copy the extracted folder to the location from which MongoDB will run.

```sh

mkdir -p mongodb
cp -R -n mongodb-osx-x86_64-3.4.2/ mongodb

```


#### Step 4: Ensure the location of the binaries is in the ``PATH`` variable.

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


### Install MongoDB Community Edition with Homebrew

[Homebrew](http://brew.sh/) installs binary packages based on published
"formulae." This section describes how to update ``brew`` to the latest
packages and install MongoDB Community Edition. Homebrew requires some initial
setup and configuration, which is beyond the scope of this document.


#### Step 1: Update Homebrew's package database.

In a system shell, issue the following command:

```sh

brew update

```


#### Step 2: Install MongoDB.

You can install MongoDB via ``brew`` with several different options. Use
one of the following operations:


##### Install the MongoDB Binaries

To install the MongoDB binaries, issue the following command in a
system shell:

```sh

brew install mongodb

```


##### Install the MongoDB Binaries with TLS/SSL Support

To install the MongoDB binaries that have TLS/SSL support,
issue the following from a system shell:

```sh

brew install mongodb --with-openssl

```


##### Install the Latest Development Release of MongoDB

To install the latest development release for use in testing and
development, issue the following command in a system shell:

```sh

brew install mongodb --devel

```


## Run MongoDB


### Step 1: Create the data directory.

Before you start MongoDB for the first time, create the directory to
which the [``mongod``](#bin.mongod) process will write data. By default, the
[``mongod``](#bin.mongod) process uses the ``/data/db`` directory. If you create
a directory other than this one, you must specify that directory in the
``dbpath`` option when starting the [``mongod``](#bin.mongod) process
later in this procedure.

The following example command creates the default ``/data/db`` directory:

```sh

mkdir -p /data/db

```


### Step 2: Set permissions for the data directory.

Before running [``mongod``](#bin.mongod) for the first time, ensure that the
user account running [``mongod``](#bin.mongod) has read and write permissions
for the directory.


### Step 3: Run MongoDB.

To run MongoDB, run the [``mongod``](#bin.mongod) process at the system prompt.
If necessary, specify the path of the [``mongod``](#bin.mongod) or the data
directory. See the following examples.


#### Run without specifying paths

If your system ``PATH`` variable includes the location of the
[``mongod``](#bin.mongod) binary and if you use the default data directory
(i.e., ``/data/db``), simply enter ``mongod`` at the system prompt:

```sh

mongod

```


#### Specify the path of the [``mongod``](#bin.mongod)

If your ``PATH`` does not include the location of the
[``mongod``](#bin.mongod) binary, enter the full path to the [``mongod``](#bin.mongod)
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
Started Guides](#getting-started) in various driver editions. See
[Getting Started](#getting-started) for the available editions.

Before deploying MongoDB in a production environment, consider the
[Production Notes](#) document.

Later, to stop MongoDB, press ``Control+C`` in the terminal where the
[``mongod``](#bin.mongod) instance is running.
