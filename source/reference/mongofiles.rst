=============================
``mongofiles`` Utility Manual
=============================

.. default-domain:: mongodb

Synopsis
--------

The ``mongofiles`` utility makes it possible to manipulate files
stored in your MongoDB instance in :term:`GridFS` objects from the
command line. It is particularly useful as it provides an interface
between objects stored in your file system and GridFS.

All ``mongofiles`` commands take arguments in three groups:

1. :ref:`Options <mongofiles-options>`. You may use one or more of
   these options to control the behavior of ``mongofiles``.

2. :ref:`Commands <mongofiles-commands>`. Use one of these commands to
   determine the action of ``mongofiles``.

3. A file name representing either the name of a file on your system's
   file system, a GridFS object.

Like :command:`mongodump`, :command:`mongoexport`,
:command:`mongoimport`, and :command:`mongorestore` ``mongofiles`` can
access data stored in a MongoDB data directory without requiring a
running ``mongod`` instance, if no other ``mongod`` is running.

.. _mongofiles-commands:

Commands
--------

.. program:: mongofiles

.. option:: list <prefix>

   Lists the files in the GridFS store. The characters  specified
   after "``list``" (e.g. "``<prefix>``") optionally limit the list of
   returned items to files that begin with that string of
   characters.

.. option:: search <string>

   Lists the files in the GridFS store with names that match any
   portion of "``<string>``".

.. option:: put <filename>

   Copy the specified file from the local file system into GridFS
   storage.

   Here, ``<filename>`` refers to the name the object will have in
   GridFS, and ``mongofiles`` assumes that this reflects the name the
   file has on the local file system. If the local filename is
   different use the :command:`mongofiles --local` option.

.. option:: get <filename>

   Copy the specified file from GridFS storage to the local file
   system.

   Here, ``<filename>`` refers to the name the object will have in
   GridFS, and ``mongofiles`` assumes that this reflects the name the
   file has on the local file system. If the local filename is
   different use the :command:`mongofiles --local` option.

.. option:: delete <filename>

   Delete the specified file from GridFS storage.

.. _mongofiles-options:

Options
-------

.. program:: mongofiles

.. option:: --help

   Returns a basic help and usage text.

.. option:: --verbose, -v

   Increases the amount of internal reporting returned on the command
   line. Increase the verbosity with the ``-v`` form by including
   the option multiple times, (e.g. ``-vvvvv``.)

.. option:: --version

   Returns the version of the ``mongofiles`` utility.

.. option:: --host <hostname><:port>

   Specifies a resolvable hostname for the ``mongod`` from which you
   want to export data. By default ``mongofiles`` attempts to connect
   to a MongoDB process ruining on the localhost port number 27017.

   Optionally, specify a port number to connect a MongboDB instance
   running on a port other than 27017.

   To connect to a replica set, use the ``--host`` argument with a
   setname, followed by a slash and a comma separated list of host and
   port names. The ``mongo`` utility will, given the seed of at least
   one connected set member, connect to primary node of that set. this
   option would resemble: ::

        --host repl0 mongo0.example.net,mongo0.example.net,27018,mongo1.example.net,mongo2.example.net

   You can always connect directly to a single MongoDB instance by
   specifying the host and port number directly.

.. option:: --port <port>

   Specifies the port number, if the MongoDB instance is not running on
   the standard port. (i.e. ``27017``) You may also specify a port
   number using the :command:`mongofiles --host` command.

.. option:: --ipv6

   Enables IPv6 support to allow ``mongofiles`` to connect to the
   MongoDB instance using IPv6 connectivity. IPv6 support is disabled
   by default in the ``mongofiles`` utility.

.. option:: --username <username>, -u <username>

   Specifies a username to authenticate to the MongoDB instance, if your
   database requires authentication. Use in conjunction with the
   :option:`mongofiles --password` option to supply a password.

.. option:: --password [password]

   Specifies a password to authenticate to the MongoDB instance. Use
   in conjunction with the :option:`mongofiles --username` option to
   supply a username.

.. option:: --dbpath [path]

   Specifies the directory of the MongoDB data files. If used, the
   ``--dbpath`` option enables ``mongofiles`` to attach directly to
   local data files interact with the GridFS data without the
   ``mongod``. To run with ``--dbpath``, ``mongofiles`` needs to lock
   access to the data directory: as a result, no ``mongod`` can access
   the same path while the process runs.

.. option:: --directoryperdb

   Use the ``--directoryperdb`` in conjunction with the corresponding
   option to :option:`mongod`, which allows :option:`mongofiles` to
   operate when MongoDB is configured to use an on-disk format where
   each database is located in a distinct directory. This option is
   only relevant when specifying the :option:`--dbpath` option.

.. option:: --journal

   Allows :option:`files` operations to use the durability
   :term:`journal <journaling>` to ensure that the database maintains
   a recoverable state, and that all data is recorded on disk
   regularly.

.. option:: --db [db], -d [db]

TODO in the help but doesn't makes sense in this context

.. option:: --collection [collection], -c [collection]

TODO in the help but doesn't makes sense in this context

.. option:: --local <filename>, -l <filename>

   Specifies the local filesystem name of a file for get and put
   operations.

   In the :command:`mongofiles put` and :command:`mongofiles get`
   commands the required ``<filename>`` modifier refers to the name
   the object will have in GridFS, and ``mongofiles`` assumes that
   this reflects the name the file has on the local file
   system unless this option is set.

.. option:: --type <MIME>, t <MIME>

   Provides the ability to specify a :term:`MIME` type describe the
   file being inserted into GridFS storage. In default operation,
   this is omitted.

   Use only with :command:`mongofiles put` operations.

.. option:: --replace, -r

   Alters the behavior of :command:`mongofiles put` to replace
   existing GridFS objects with the specified local file, rather than
   adding an additional object with the same name.

   In the default operation, files will not be overwritten by a
   :command:`mongofiles put` option.
