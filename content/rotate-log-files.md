+++
title = "Rotate Log Files"

[tags]
+++
# Rotate Log Files


# On this page

* [Overview](#overview) 

* [Default Log Rotation Behavior](#default-log-rotation-behavior) 

* [Log Rotation with ``--logRotate reopen``](#log-rotation-with-logrotate-reopen) 

* [Syslog Log Rotation](#syslog-log-rotation) 

* [Forcing a Log Rotation with ``SIGUSR1``](#forcing-a-log-rotation-with-sigusr1) 


## Overview

When used with the [``--logpath``](#cmdoption-logpath) option or [``systemLog.path``](#systemLog.path) setting,
[``mongod``](#bin.mongod) and [``mongos``](#bin.mongos) instances report
a live account of all activity and operations to a log file.
When reporting activity data to a log file, by default, MongoDB only rotates logs
in response to the [``logRotate``](#dbcmd.logRotate) command, or when the
[``mongod``](#bin.mongod) or [``mongos``](#bin.mongos) process receives a ``SIGUSR1``
signal from the operating system.

MongoDB's standard log rotation approach archives the current
log file and starts a new one. To do this, the [``mongod``](#bin.mongod) or
[``mongos``](#bin.mongos) instance renames the current log file by appending a
UTC timestamp to the filename, in [*ISODate*](#term-isodate) format. It then
opens a new log file, closes the old log file, and sends all new log
entries to the new log file.

You can also configure MongoDB to support the Linux/Unix
logrotate utility
by setting [``systemLog.logRotate``](#systemLog.logRotate) or
[``--logRotate``](#cmdoption-logrotate) to ``reopen``. With ``reopen``, [``mongod``](#bin.mongod)
or [``mongos``](#bin.mongos) closes the log file, and
then reopens a log file with the same name, expecting that another
process renamed the file prior to rotation.

Finally, you can configure [``mongod``](#bin.mongod) to send log data to the
``syslog``. using the [``--syslog``](#cmdoption-syslog) option. In this case, you can
take advantage of alternate logrotation tools.

See also: For information on logging, see the [Process Logging](#monitoring-standard-loggging) section. 


## Default Log Rotation Behavior

By default, MongoDB uses the
[``--logRotate rename``](#cmdoption-logrotate) behavior.
With ``rename``, [``mongod``](#bin.mongod) or
[``mongos``](#bin.mongos) renames the current log file by appending a UTC
timestamp to the filename, opens a new log file, closes the old log file,
and sends all new log entries to the new log file.


### Step 1: Start a [``mongod``](#bin.mongod) instance.

```sh

mongod -v --logpath /var/log/mongodb/server1.log

```

You can also explicitly specify [``logRotate --rename``](#cmdoption-logrotate).


### Step 2: List the log files

In a separate terminal, list the matching files:

```sh

ls /var/log/mongodb/server1.log*

```

The results should include one log file, ``server1.log``.


### Step 3: Rotate the log file.

Rotate the log file by issuing the [``logRotate``](#dbcmd.logRotate) command
from the ``admin`` database in a [``mongo``](#bin.mongo) shell:

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
log file that [``mongod``](#bin.mongod) or [``mongos``](#bin.mongos) made when it
reopened  the log file, and ``server1.log.<timestamp>``, the renamed
original log file.

Rotating log files does not modify the "old" rotated log files. When
you rotate a log, you rename the ``server1.log`` file to include
the timestamp, and a new, empty ``server1.log`` file receives all
new log input.


## Log Rotation with ``--logRotate reopen``

New in version 3.0.0.

Log rotation with [``--logRotate reopen``](#cmdoption-logrotate) closes and opens
the log file following the typical Linux/Unix log rotate behavior.


### Step 1: Start a [``mongod``](#bin.mongod) instance, specifying the ``reopen`` [``--logRotate``](#cmdoption-logrotate) behavior.

```sh

mongod -v --logpath /var/log/mongodb/server1.log --logRotate reopen --logappend

```

You must use the [``--logappend``](#cmdoption-logappend) option with
[``--logRotate reopen``](#cmdoption-logrotate).


### Step 2: List the log files

In a separate terminal, list the matching files:

```sh

ls /var/log/mongodb/server1.log*

```

The results should include one log file, ``server1.log``.


### Step 3: Rotate the log file.

Rotate the log file by issuing the [``logRotate``](#dbcmd.logRotate) command
from the ``admin`` database in a [``mongo``](#bin.mongo) shell:

```sh

use admin
db.runCommand( { logRotate : 1 } )

```

You should rename the log file using an external process, following
the typical Linux/Unix log rotate behavior.


## Syslog Log Rotation

With syslog log rotation, [``mongod``](#bin.mongod) sends log data to the syslog
rather than writing it to a file.


### Step 1: Start a [``mongod``](#bin.mongod) instance with the [``--syslog``](#cmdoption-syslog) option

```sh

mongod --syslog

```

Do not include [``--logpath``](#cmdoption-logpath). Since [``--syslog``](#cmdoption-syslog) tells
[``mongod``](#bin.mongod) to send log data to the syslog, specifying a
[``--logpath``](#cmdoption-logpath) will causes an error.

To specify the facility level used when logging messages to the syslog,
use the [``--syslogFacility``](#cmdoption-syslogfacility) option or
[``systemLog.syslogFacility``](#systemLog.syslogFacility) configuration setting.


### Step 2: Rotate the log.

Store and rotate the log output using your systems default log
rotation mechanism.


## Forcing a Log Rotation with ``SIGUSR1``

For Linux and Unix-based systems, you can use the ``SIGUSR1`` signal
to rotate the logs for a single process, as in the following:

```sh

kill -SIGUSR1 <mongod process id>

```
