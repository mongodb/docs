+++
title = "Install MongoDB Community Edition on Windows"

[tags]
mongodb = "product"
+++
# Install MongoDB Community Edition on Windows


# On this page

* [Overview](#overview)

* [Requirements](#requirements)

* [Get MongoDB Community Edition](#get-mongodb-community-edition)

* [Install MongoDB Community Edition](#install-mongodb-community-edition)

* [Run MongoDB Community Edition](#run-mongodb-community-edition)

* [Configure a Windows Service for MongoDB Community Edition](#configure-a-windows-service-for-mongodb-community-edition)

* [Manually Create a Windows Service for MongoDB Community Edition](#manually-create-a-windows-service-for-mongodb-community-edition)

* [Additional Resources](#additional-resources)


## Overview

Use this tutorial to install MongoDB Community Edition on Windows systems.

Platform Support: Starting in version 2.2, MongoDB does not support Windows XP. Please
use a more recent version of Windows to use more recent releases of
MongoDB.

Important: If you are running any edition of Windows Server 2008 R2 or Windows 7, please install [a hotfix to resolve an issue with memory mapped files on Windows](http://support.microsoft.com/kb/2731284).


## Requirements

MongoDB Community Edition requires Windows Server 2008 R2, Windows Vista, or
later. The ``.msi`` installer includes all other software dependencies
and will automatically upgrade any older version of MongoDB installed
using an ``.msi`` file.


## Get MongoDB Community Edition

Note: To install a version of MongoDB prior to 3.2, please refer to that version's documentation. For example, see version [3.0](https://docs.mongodb.com/v3.0/tutorial/install-mongodb-on-windows/).


### Step 1: Determine which MongoDB build you need.

The following MongoDB builds are available for Windows:

**MongoDB for Windows 64-bit** runs only
on Windows Server 2008 R2, Windows 7 64-bit, and newer versions of
Windows. This build takes advantage of recent enhancements to the
Windows Platform and cannot operate on older versions of Windows.

**MongoDB for Windows 64-bit Legacy** runs on Windows Vista, and
Windows Server 2008 and does not include recent performance
enhancements.

To find which version of Windows you are running, enter the following
commands in the Command Prompt or Powershell:

```powershell

wmic os get caption
wmic os get osarchitecture

```


### Step 2: Download MongoDB for Windows.

Download the latest production release of MongoDB from the [MongoDB
downloads page](http://www.mongodb.org/downloads). Ensure you download
the correct version of MongoDB for your Windows system. The 64-bit
versions of MongoDB do not work with 32-bit Windows.


## Install MongoDB Community Edition


### Interactive Installation


#### Step 1: Install MongoDB for Windows.

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

You may install MongoDB Community unattended on Windows from the command line
using ``msiexec.exe``.


#### Step 1: Open an Administrator command prompt.

Press the ``Win`` key, type ``cmd.exe``, and press ``Ctrl + Shift + Enter``
to run the Command Prompt as Administrator.

Execute the remaining steps from the Administrator command prompt.


#### Step 2: Install MongoDB for Windows.

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

| Component Set | Binaries
| ------------- | -----------
| ``Server``            | ``mongod.exe``
| ``Router``            | ``mongos.exe``
| ``Client``            | ``mongo.exe``
| ``MonitoringTools``   | ``mongostat.exe``, ``mongotop.exe``
| ``ImportExportTools`` | ``mongodump.exe``, ``mongorestore.exe``, ``mongoexport.exe``, ``mongoimport.exe``
| ``MiscellaneousTools`` | ``bsondump.exe``, ``mongofiles.exe``, ``mongooplog.exe``, ``mongoperf.exe``

For instance, to install *only* the MongoDB utilities, invoke:

```powershell

msiexec.exe /q /i mongodb-win32-x86_64-2008plus-ssl-3.4.2-signed.msi ^
            INSTALLLOCATION="C:\Program Files\MongoDB\Server\3.4.2\" ^
            ADDLOCAL="MonitoringTools,ImportExportTools,MiscellaneousTools"

```


## Run MongoDB Community Edition

Warning: Do not make [``mongod.exe``](#bin.mongod.exe) visible on public networks without running in "Secure Mode" with the ``auth`` setting. MongoDB is designed to be run in trusted environments, and the database does not enable "Secure Mode" by default.


### Step 1: Set up the MongoDB environment.

MongoDB requires a [*data directory*](#term-dbpath) to store all
data. MongoDB's default data directory path is the absolute path
``\data\db`` on the drive from which you start MongoDB. Create
this folder by running the following command in a
Command Prompt:

```powershell

md \data\db

```

You can specify an alternate path for data files using the
``--dbpath`` option to
[``mongod.exe``](#bin.mongod.exe), for example:

```powershell

"C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe" --dbpath d:\test\mongodb\data

```

If your path includes spaces, enclose the entire path in double
quotes, for example:

```powershell

"C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe" --dbpath "d:\test\mongo db data"

```

You may also specify the ``dbpath`` in a [configuration file](#).


### Step 2: Start MongoDB.

To start MongoDB, run [``mongod.exe``](#bin.mongod.exe). For example, from the
Command Prompt:

```powershell

"C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe"

```

This starts the main MongoDB database process. The ``waiting for
connections`` message in the console output indicates that the
[``mongod.exe``](#bin.mongod.exe) process is running successfully.

Depending on the security level of your system, Windows may pop up a
Security Alert dialog box about blocking "some features" of
``C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe`` from communicating
on networks. All users should select ``Private Networks, such as my home or
work network`` and click ``Allow access``. For additional information on
security and MongoDB, please see the [Security Documentation](#).


### Step 3: Connect to MongoDB.

To connect to MongoDB through the [``mongo.exe``](#bin.mongo) shell,
open another Command Prompt.

```powershell

"C:\Program Files\MongoDB\Server\3.4\bin\mongo.exe

```

If you want to develop applications using .NET, see the documentation
of [C# and MongoDB](https://docs.mongodb.com/ecosystem/drivers/csharp) for more information.


### Step 4: Begin using MongoDB.

To help you start using MongoDB, MongoDB provides [Getting
Started Guides](#getting-started) in various driver editions. See
[Getting Started](#getting-started) for the available editions.

Before deploying MongoDB in a production environment, consider the
[Production Notes](#) document.

Later, to stop MongoDB, press ``Control+C`` in the terminal where the
[``mongod``](#bin.mongod) instance is running.


## Configure a Windows Service for MongoDB Community Edition


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

Create a configuration file. The file **must** set [``systemLog.path``](#systemLog.path).
Include additional
[configuration options](#) as appropriate.

For example, create a file at ``C:\Program Files\MongoDB\Server\3.4\mongod.cfg`` that specifies both
[``systemLog.path``](#systemLog.path) and [``storage.dbPath``](#storage.dbPath):

```yaml

systemLog:
    destination: file
    path: c:\data\log\mongod.log
storage:
    dbPath: c:\data\db

```


### Step 4: Install the MongoDB service.

Important: Run all of the following commands in Command Prompt with "Administrative Privileges".

Install the MongoDB service by starting [``mongod.exe``](#bin.mongod.exe)
with the ``--install`` option and the ``-config``
option to specify the previously created configuration file.

```powershell

"C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe" --config "C:\Program Files\MongoDB\Server\3.4\mongod.cfg" --install

```

To use an alternate ``dbpath``, specify the path in the
configuration file (e.g. ``C:\mongodb\mongod.cfg``) or
on the command line with the ``--dbpath`` option.

If needed, you can install services for multiple instances of
[``mongod.exe``](#bin.mongod.exe) or [``mongos.exe``](#bin.mongos.exe). Install each service
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


## Manually Create a Windows Service for MongoDB Community Edition

You can set up the MongoDB server as a Windows Service that
starts automatically at boot time.

The following procedure assumes you have installed MongoDB Community using the
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

Create a configuration file. The file **must** set [``systemLog.path``](#systemLog.path).
Include additional
[configuration options](#) as appropriate.

For example, create a file at ``C:\Program Files\MongoDB\Server\3.4\mongod.cfg`` that specifies both
[``systemLog.path``](#systemLog.path) and [``storage.dbPath``](#storage.dbPath):

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


## Additional Resources

* [MongoDB for Developers Free Course](https://university.mongodb.com/courses/M101P/about?jmp=docs)

* [MongoDB for .NET Developers Free Online Course](https://university.mongodb.com/courses/M101N/about?jmp=docs)

* [MongoDB Architecture Guide](https://www.mongodb.com/lp/white-paper/architecture-guide?jmp=docs)
