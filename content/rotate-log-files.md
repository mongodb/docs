+++
title = "Rotate Log Files"

[tags]
mongodb = "product"
+++

# Rotate Log Files


## Overview

When used with the [``--logpath``](https://docs.mongodb.com/manual/reference/program/mongos/#cmdoption-logpath) option or [``systemLog.path``](https://docs.mongodb.com/manual/reference/configuration-options/#systemLog.path) setting,
[``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) and [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) instances report
a live account of all activity and operations to a log file.
When reporting activity data to a log file, by default, MongoDB only rotates logs
in response to the [``logRotate``](https://docs.mongodb.com/manual/reference/command/logRotate/#dbcmd.logRotate) command, or when the
[``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) or [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) process receives a ``SIGUSR1``
signal from the operating system.

MongoDB's standard log rotation approach archives the current
log file and starts a new one. To do this, the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) or
[``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) instance renames the current log file by appending a
UTC timestamp to the filename, in [*ISODate*](https://docs.mongodb.com/manual/reference/glossary/#term-isodate) format. It then
opens a new log file, closes the old log file, and sends all new log
entries to the new log file.

You can also configure MongoDB to support the Linux/Unix
logrotate utility
by setting [``systemLog.logRotate``](https://docs.mongodb.com/manual/reference/configuration-options/#systemLog.logRotate) or
[``--logRotate``](https://docs.mongodb.com/manual/reference/program/mongod/#cmdoption-logrotate) to ``reopen``. With ``reopen``, [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod)
or [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) closes the log file, and
then reopens a log file with the same name, expecting that another
process renamed the file prior to rotation.

Finally, you can configure [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) to send log data to the
``syslog``. using the [``--syslog``](https://docs.mongodb.com/manual/reference/program/mongos/#cmdoption-syslog) option. In this case, you can
take advantage of alternate logrotation tools.

See also: For information on logging, see the [Process Logging](https://docs.mongodb.com/manual/administration/monitoring/#monitoring-standard-loggging) section.


## Default Log Rotation Behavior

By default, MongoDB uses the
[``--logRotate rename``](https://docs.mongodb.com/manual/reference/program/mongod/#cmdoption-logrotate) behavior.
With ``rename``, [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) or
[``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) renames the current log file by appending a UTC
timestamp to the filename, opens a new log file, closes the old log file,
and sends all new log entries to the new log file.


### Step 1: Start a [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instance.

```sh

mongod -v --logpath /var/log/mongodb/server1.log

```

You can also explicitly specify [``logRotate --rename``](https://docs.mongodb.com/manual/reference/program/mongod/#cmdoption-logrotate).


### Step 2: List the log files

In a separate terminal, list the matching files:

```sh

ls /var/log/mongodb/server1.log*

```

The results should include one log file, ``server1.log``.


### Step 3: Rotate the log file.

Rotate the log file by issuing the [``logRotate``](https://docs.mongodb.com/manual/reference/command/logRotate/#dbcmd.logRotate) command
from the ``admin`` database in a [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell:

```sh

use admin
db.runCommand( { logRotate : 1 } )

```


### Step 4: View the new log files

List the new log files to view the newly-created log:

```sh

ls /var/log/mongodb/server1.log*

```

There should be two log files listed: ``server1.log``, which is the
log file that [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) or [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) made when it
reopened  the log file, and ``server1.log.<timestamp>``, the renamed
original log file.

Rotating log files does not modify the "old" rotated log files. When
you rotate a log, you rename the ``server1.log`` file to include
the timestamp, and a new, empty ``server1.log`` file receives all
new log input.


## Log Rotation with ``--logRotate reopen``

New in version 3.0.0.

Log rotation with [``--logRotate reopen``](https://docs.mongodb.com/manual/reference/program/mongod/#cmdoption-logrotate) closes and opens
the log file following the typical Linux/Unix log rotate behavior.


### Step 1: Start a [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instance, specifying the ``reopen`` [``--logRotate``](https://docs.mongodb.com/manual/reference/program/mongod/#cmdoption-logrotate) behavior.

```sh

mongod -v --logpath /var/log/mongodb/server1.log --logRotate reopen --logappend

```

You must use the [``--logappend``](https://docs.mongodb.com/manual/reference/program/mongos/#cmdoption-logappend) option with
[``--logRotate reopen``](https://docs.mongodb.com/manual/reference/program/mongod/#cmdoption-logrotate).


### Step 2: List the log files

In a separate terminal, list the matching files:

```sh

ls /var/log/mongodb/server1.log*

```

The results should include one log file, ``server1.log``.


### Step 3: Rotate the log file.

Rotate the log file by issuing the [``logRotate``](https://docs.mongodb.com/manual/reference/command/logRotate/#dbcmd.logRotate) command
from the ``admin`` database in a [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell:

```sh

use admin
db.runCommand( { logRotate : 1 } )

```

You should rename the log file using an external process, following
the typical Linux/Unix log rotate behavior.


## Syslog Log Rotation

With syslog log rotation, [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) sends log data to the syslog
rather than writing it to a file.


### Step 1: Start a [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instance with the [``--syslog``](https://docs.mongodb.com/manual/reference/program/mongos/#cmdoption-syslog) option

```sh

mongod --syslog

```

Do not include [``--logpath``](https://docs.mongodb.com/manual/reference/program/mongos/#cmdoption-logpath). Since [``--syslog``](https://docs.mongodb.com/manual/reference/program/mongos/#cmdoption-syslog) tells
[``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) to send log data to the syslog, specifying a
[``--logpath``](https://docs.mongodb.com/manual/reference/program/mongos/#cmdoption-logpath) will causes an error.

To specify the facility level used when logging messages to the syslog,
use the [``--syslogFacility``](https://docs.mongodb.com/manual/reference/program/mongos/#cmdoption-syslogfacility) option or
[``systemLog.syslogFacility``](https://docs.mongodb.com/manual/reference/configuration-options/#systemLog.syslogFacility) configuration setting.


### Step 2: Rotate the log.

Store and rotate the log output using your systems default log
rotation mechanism.


## Forcing a Log Rotation with ``SIGUSR1``

For Linux and Unix-based systems, you can use the ``SIGUSR1`` signal
to rotate the logs for a single process, as in the following:

```sh

kill -SIGUSR1 <mongod process id>

```
