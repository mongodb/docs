+++
title = "Install MongoDB Enterprise on Windows"

[tags]
mongodb = "product"
+++

# Install MongoDB Enterprise on Windows

New in version 2.6.


## Overview

Use this tutorial to install [MongoDB Enterprise](https://www.mongodb.com/products/mongodb-enterprise-advanced?jmp=docs) on Windows
systems. MongoDB Enterprise is available on select platforms and contains
support for several features related to security and monitoring.


## Prerequisites

MongoDB Enterprise Server for Windows requires Windows Server 2008 R2 or
later. The ``.msi`` installer includes all other software dependencies and will
automatically upgrade any older version of MongoDB installed using an ``.msi``
file.


## Get MongoDB Enterprise

Note: To install a version of MongoDB prior to 3.2, please refer to that version's documentation. For example, see version [3.0](install-mongodb-enterprise-on-windows/).


### Step 1: Download MongoDB Enterprise for Windows.

Download the latest production release of [MongoDB Enterprise](http://www.mongodb.com/products/mongodb-enterprise?jmp=docs).

To find which version of Windows you are running, enter the following
commands in the Command Prompt or Powershell:

```powershell

wmic os get caption
wmic os get osarchitecture

```


## Install MongoDB Enterprise


### Interactive Installation


#### Step 1: Install MongoDB Enterprise for Windows.

In Windows Explorer, locate the downloaded MongoDB ``.msi`` file, which
typically is located in the default ``Downloads`` folder. Double-click
the ``.msi`` file. A set of screens will appear to guide you through the
installation process.

You may specify an installation directory if you choose the "Custom"
installation option.

Note: These instructions assume that you have installed MongoDB to ``C:\Program Files\MongoDB\Server\3.2\``.

MongoDB is self-contained and does not have any other system
dependencies. You can run MongoDB from any folder you choose. You may
install MongoDB in any folder (e.g. ``D:\test\mongodb``).


### Unattended Installation

You may install MongoDB unattended on Windows from the command line
using ``msiexec.exe``.


#### Step 1: Install MongoDB Enterprise for Windows.

Change to the directory containing the ``.msi`` installation binary of your
choice and invoke:

```powershell

msiexec.exe /q /i mongodb-win32-x86_64-2008plus-ssl-3.4.2-signed.msi ^
            INSTALLLOCATION="C:\Program Files\MongoDB\Server\3.4.2\" ^
            ADDLOCAL="all"

```

You can specify the installation location for the executable by
modifying the ``INSTALLLOCATION`` value.

By default, this method installs all MongoDB binaries. To install specific
MongoDB component sets, you can specify them in the ``ADDLOCAL`` argument
using a comma-separated list including one or more of the following
component sets:

| - | - | - |
| **Component Set** | **Binaries** |
| ``Server`` | ``mongod.exe`` |
| ``Router`` | ``mongos.exe`` |
| ``Client`` | ``mongo.exe`` |
| ``MonitoringTools`` | ``mongostat.exe``, ``mongotop.exe`` |
| ``ImportExportTools`` | ``mongodump.exe``, ``mongorestore.exe``, ``mongoexport.exe``, ``mongoimport.exe`` |
| ``MiscellaneousTools`` | ``bsondump.exe``, ``mongofiles.exe``, ``mongooplog.exe``, ``mongoperf.exe`` |

For instance, to install *only* the MongoDB utilities, invoke:

```powershell

msiexec.exe /q /i mongodb-win32-x86_64-2008plus-ssl-3.4.2-signed.msi ^
            INSTALLLOCATION="C:\Program Files\MongoDB\Server\3.4.2\" ^
            ADDLOCAL="MonitoringTools,ImportExportTools,MiscellaneousTools"

```


## Run MongoDB Enterprise

Warning: Do not make [``mongod.exe``](https://docs.mongodb.com/manual/reference/program/mongod.exe/#bin.mongod.exe) visible on public networks without running in "Secure Mode" with the ``auth`` setting. MongoDB is designed to be run in trusted environments, and the database does not enable "Secure Mode" by default.


### Step 1: Set up the MongoDB environment.

MongoDB requires a [*data directory*](https://docs.mongodb.com/manual/reference/glossary/#term-dbpath) to store all
data. MongoDB's default data directory path is the absolute path
``\data\db`` on the drive from which you start MongoDB. Create
this folder by running the following command in a
Command Prompt:

```powershell

md \data\db

```

You can specify an alternate path for data files using the
``--dbpath`` option to
[``mongod.exe``](https://docs.mongodb.com/manual/reference/program/mongod.exe/#bin.mongod.exe), for example:

```powershell

"C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe" --dbpath d:\test\mongodb\data

```

If your path includes spaces, enclose the entire path in double
quotes, for example:

```powershell

"C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe" --dbpath "d:\test\mongo db data"

```

You may also specify the ``dbpath`` in a [configuration file](https://docs.mongodb.com/manual/reference/configuration-options).


### Step 2: Start MongoDB.

To start MongoDB, run [``mongod.exe``](https://docs.mongodb.com/manual/reference/program/mongod.exe/#bin.mongod.exe). For example, from the
Command Prompt:

```powershell

"C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe"

```

This starts the main MongoDB database process. The ``waiting for
connections`` message in the console output indicates that the
[``mongod.exe``](https://docs.mongodb.com/manual/reference/program/mongod.exe/#bin.mongod.exe) process is running successfully.

Depending on the security level of your system, Windows may pop up a
Security Alert dialog box about blocking "some features" of
``C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe`` from communicating
on networks. All users should select ``Private Networks, such as my home or
work network`` and click ``Allow access``. For additional information on
security and MongoDB, please see the [Security Documentation](https://docs.mongodb.com/manual/security).


### Step 3: Connect to MongoDB.

To connect to MongoDB through the [``mongo.exe``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell,
open another Command Prompt.

```powershell

"C:\Program Files\MongoDB\Server\3.4\bin\mongo.exe

```

If you want to develop applications using .NET, see the documentation
of [C# and MongoDB](https://docs.mongodb.com/ecosystem/drivers/csharp) for more information.


### Step 4: Begin using MongoDB.

To help you start using MongoDB, MongoDB provides [Getting
Started Guides](https://docs.mongodb.com/manual/#getting-started) in various driver editions. See
[Getting Started](https://docs.mongodb.com/manual/#getting-started) for the available editions.

Before deploying MongoDB in a production environment, consider the
[Production Notes](https://docs.mongodb.com/manual/administration/production-notes) document.

Later, to stop MongoDB, press ``Control+C`` in the terminal where the
[``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instance is running.


## Configure a Windows Service for MongoDB Enterprise


### Step 1: Open an Administrator command prompt.

Press the ``Win`` key, type ``cmd.exe``, and press ``Ctrl + Shift + Enter``
to run the Command Prompt as Administrator.

Execute the remaining steps from the Administrator command prompt.


### Step 2: Create directories.

Create directories for your database and log files:

```powershell

mkdir c:\data\db
mkdir c:\data\log

```


### Step 3: Create a configuration file.

Create a configuration file. The file **must** set [``systemLog.path``](https://docs.mongodb.com/manual/reference/configuration-options/#systemLog.path).
Include additional
[configuration options](https://docs.mongodb.com/manual/reference/configuration-options) as appropriate.

For example, create a file at ``C:\Program Files\MongoDB\Server\3.4\mongod.cfg`` that specifies both
[``systemLog.path``](https://docs.mongodb.com/manual/reference/configuration-options/#systemLog.path) and [``storage.dbPath``](https://docs.mongodb.com/manual/reference/configuration-options/#storage.dbPath):

```yaml

systemLog:
    destination: file
    path: c:\data\log\mongod.log
storage:
    dbPath: c:\data\db

```


### Step 4: Install the MongoDB service.

Important: Run all of the following commands in Command Prompt with "Administrative Privileges".

Install the MongoDB service by starting [``mongod.exe``](https://docs.mongodb.com/manual/reference/program/mongod.exe/#bin.mongod.exe)
with the ``--install`` option and the ``-config``
option to specify the previously created configuration file.

```powershell

"C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe" --config "C:\Program Files\MongoDB\Server\3.4\mongod.cfg" --install

```

To use an alternate ``dbpath``, specify the path in the
configuration file (e.g. ``C:\mongodb\mongod.cfg``) or
on the command line with the ``--dbpath`` option.

If needed, you can install services for multiple instances of
[``mongod.exe``](https://docs.mongodb.com/manual/reference/program/mongod.exe/#bin.mongod.exe) or [``mongos.exe``](https://docs.mongodb.com/manual/reference/program/mongos.exe/#bin.mongos.exe). Install each service
with a unique ``--serviceName`` and
``--serviceDisplayName``. Use
multiple instances only when sufficient system resources exist and your
system design requires it.


### Step 5: Start the MongoDB service.

```powershell

net start MongoDB

```


### Step 6: Stop or remove the MongoDB service as needed.

To stop the MongoDB service use the following command:

```powershell

net stop MongoDB

```

To remove the MongoDB service use the following command:

```powershell

"C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe" --remove

```


## Manually Create a Windows Service for MongoDB Enterprise

You can set up the MongoDB server as a Windows Service that
starts automatically at boot time.

The following procedure assumes you have installed MongoDB using the
``.msi`` installer with the path ``C:\Program Files\MongoDB\Server\3.2\``.

If you have installed in an alternative directory, you will need to
adjust the paths as appropriate.


### Step 1: Open an Administrator command prompt.

Press the ``Win`` key, type ``cmd.exe``, and press ``Ctrl + Shift + Enter``
to run the Command Prompt as Administrator.

Execute the remaining steps from the Administrator command prompt.


### Step 2: Create directories.

Create directories for your database and log files:

```powershell

mkdir c:\data\db
mkdir c:\data\log

```


### Step 3: Create a configuration file.

Create a configuration file. The file **must** set [``systemLog.path``](https://docs.mongodb.com/manual/reference/configuration-options/#systemLog.path).
Include additional
[configuration options](https://docs.mongodb.com/manual/reference/configuration-options) as appropriate.

For example, create a file at ``C:\Program Files\MongoDB\Server\3.4\mongod.cfg`` that specifies both
[``systemLog.path``](https://docs.mongodb.com/manual/reference/configuration-options/#systemLog.path) and [``storage.dbPath``](https://docs.mongodb.com/manual/reference/configuration-options/#storage.dbPath):

```yaml

systemLog:
    destination: file
    path: c:\data\log\mongod.log
storage:
    dbPath: c:\data\db

```


### Step 4: Create the MongoDB service.

Create the MongoDB service.

```powershell

sc.exe create MongoDB binPath= "\"C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe\" --service --config=\"C:\Program Files\MongoDB\Server\3.4\mongod.cfg\"" DisplayName= "MongoDB" start= "auto"

```

``sc.exe`` requires a space between "=" and the configuration values
(eg "binPath= "), and a "\" to escape double quotes.

If successfully created, the following log message will display:

```powershell

[SC] CreateService SUCCESS

```


### Step 5: Start the MongoDB service.

```powershell

net start MongoDB

```


### Step 6: Stop or remove the MongoDB service as needed.

To stop the MongoDB service, use the following command:

```powershell

net stop MongoDB

```

To remove the MongoDB service, first stop the service and then
run the following command:

```powershell

sc.exe delete MongoDB

```
