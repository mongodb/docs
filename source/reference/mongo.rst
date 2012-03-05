.. _mongo:

.. default-domain:: mongodb

.. binary:: mongo

=======================
:program:`mongo` Manual
=======================

Synopsis
--------

:program:`mongo` is an interactive JavaScript shell interface to
MongoDB. :program:`mongo` provides a powerful administrative interface
for systems administrators as well as an way to test queries and
operations directly with the database. To increase the flexibility of
:program:`mongo`, the shell provides a fully functional JavaScript
environment. This manual page, addresses the basic invocation of the
:program:`mongo` shell and an overview of its usage.

.. STUB -- This manual contains more extensive documentation of :program:`mongo` in the ":doc:`/mongo`" document.

Options
-------

.. program:: mongo

.. option:: --shell

   If you invoke the :program:`mongo` and specify a :term:`JavaScript`
   file as an argument, or ":option:`mongo --eval`" the
   :option:`--shell` provides the user with a shell prompt after the
   file finishes executing.

.. option:: --nodb

   Use this option to prevent the shell from connecting to any
   database instance.

.. option:: --norc

   By default :program:`mongo` runs the ``~/.mongorc.js`` file when it
   starts. Use this option to prevent the shell from sourcing this
   file on start up.

.. option:: --quiet

   Silences output from the shell during the connection process.

.. option:: --port <PORT>

   Specify the port where the :program:`mongod` or :program:`mongos`
   instance is listening. Unless specified :program:`mongo` connects
   to :program:`mongod` instances on port 27017, which is the default
   :program:`mongod` port.

.. option:: --host <HOSTNAME>

   Specific the host where the :program:`mongod` or :program:`mongos` is running to
   connect to as "``<HOSTNAME>``". By default :program:`mongo` will attempt
   to connect to MongoDB process running on the localhost.

.. option:: --eval <JAVASCRIPT>

   Evaluates a JavaScript specified as an argument to this
   option. :program:`mongo` does not load its own environment when evaluating
   code: as a result many convinces of the shell environment are not
   available.

.. option:: --username <USERNAME>, -u <USERNAME>

   Specify a username to authenticate to the MongoDB instance, if your
   database requires authentication. Use in conjunction with the
   :option:`mongo --password` option to supply a password.

.. option:: --password <password>, -p <password>

   Specify a password to authenticate to the MongoDB instance, if your
   database requires authentication. Use in conjunction with the
   :option:`mongo --username` option to supply a username.

.. option:: --help,  -h

   Returns a basic help and usage text.

.. option:: --version

   Returns the version of the shell.

.. option:: --verbose

   Increases the verbosity of the output of the shell during the
   connection process.

.. option:: --ipv6

   Enables IPv6 support to allow :program:`mongo` to connect to the
   MongoDB instance using IPv6 connectivity. All MongoDB programs and
   processes, including :program:`mongo`, disable IPv6 support by
   default.

.. option:: <db address>

   Specify the "database address" of the database to connect to. For
   example: ::

        mongo admin

   The above command will connect the :program:`mongo` shell to the
   administrative database on the local machine. You may specify a
   remote database instance, with the resolvable hostname or IP
   address. Separate the database name from the hostname using a
   "``/``" character. See the following examples: ::

         mongo mongodb1.example.net
         mongo mongodb1/admin
         mongo 10.8.8.10/test

.. _mongo-shell-file:

.. option:: <file.js>

   Optionally, specify a JavaScript file as the final argument to the
   shell. The shell will run the file and then exit. Use the
   :option:`mongo --shell` to return to a shell after the file
   finishes running.

   This should be the last address

Usage
-----

Typically users invoke the shell with the :program:`mongo` command at
the system prompt. Consider the following examples for other
scenarios.

To connect to a database on a remote host using authentication and a
non-standard port, use the following form:

.. code-block:: sh

   mogno --username <user> --password <pass> --hostname <host> --port 28015

Alternatively, consider the following short form:

.. code-block:: sh

   mogno -u <user> -p <pass> --host <host> --port 28015

Replace ``<user>``, ``<pass>``, and ``<host>`` with the appropriate
values for your situation and substitute or omit the :option:`--port`
as needed.

To execute a JavaScript file without evaluating the ``~/.mongorc.js``
file before starting a sell session, use the following form:

.. code-block:: sh

   mongo --shell --norc alternate-environment.js

To print return a query as :term:`JSON`, from the system prompt using
the :option:`--eval <mongo --eval>` option, use the following form:

.. code-block:: sh

   mongo --eval 'db.collection.find().forEach(printJson)'

Note the use of single quotes (e.g. ``'``) to enclose the JavaScript,
as well as the additional JavaScript required to generate this
output.
