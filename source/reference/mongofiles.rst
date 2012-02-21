.. _mongofiles:

.. default-domain:: mongodb

.. binary:: mongofiles

====================================
:program:`mongofiles` Utility Manual
====================================

Synopsis
--------

The :program:`mongofiles` utility makes it possible to manipulate files
stored in your MongoDB instance in :term:`GridFS` objects from the
command line. It is particularly useful as it provides an interface
between objects stored in your file system and GridFS.

All :program:`mongofiles` commands take arguments in three groups:

1. :ref:`Options <mongofiles-options>`. You may use one or more of
   these options to control the behavior of :program:`mongofiles`.

2. :ref:`Commands <mongofiles-commands>`. Use one of these commands to
   determine the action of :program:`mongofiles`.

3. A file name representing either the name of a file on your system's
   file system, a GridFS object.

Like :program:`mongodump`, :program:`mongoexport`,
:program:`mongoimport`, and :program:`mongorestore` :program:`mongofiles` can
access data stored in a MongoDB data directory without requiring a
running :program:`mongod` instance, if no other :program:`mongod` is running.

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
   GridFS, and :program:`mongofiles` assumes that this reflects the name the
   file has on the local file system. If the local filename is
   different use the :option:`mongofiles --local` option.

.. option:: get <filename>

   Copy the specified file from GridFS storage to the local file
   system.

   Here, ``<filename>`` refers to the name the object will have in
   GridFS, and :program:`mongofiles` assumes that this reflects the name the
   file has on the local file system. If the local filename is
   different use the :option:`mongofiles --local` option.

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

   Returns the version of the :program:`mongofiles` utility.

.. option:: --host <hostname><:port>

   Specifies a resolvable hostname for the :program:`mongod` from which you
   want to export data. By default :program:`mongofiles` attempts to connect
   to a MongoDB process ruining on the localhost port number 27017.

   Optionally, specify a port number to connect a MongboDB instance
   running on a port other than 27017.

   To connect to a replica set, use the :option:`--host` argument with
   a setname, followed by a slash and a comma separated list of host
   and port names. The :program:`mongo` utility will, given the seed
   of at least one connected set member, connect to primary node of
   that set. this option would resemble:

   .. code-block:: sh

      --host repl0 mongo0.example.net,mongo0.example.net,27018,mongo1.example.net,mongo2.example.net

   You can always connect directly to a single MongoDB instance by
   specifying the host and port number directly.

.. option:: --port <port>

   Specifies the port number, if the MongoDB instance is not running on
   the standard port. (i.e. ``27017``) You may also specify a port
   number using the :option:`mongofiles --host` command.

.. option:: --ipv6

   Enables IPv6 support to allow :program:`mongofiles` to connect to
   the MongoDB instance using IPv6 connectivity. All MongoDB programs
   and processes, including :program:`mongofiles`, disable IPv6 support by
   default.

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
   :option:`--dbpath` option enables :program:`mongofiles` to attach directly to
   local data files interact with the GridFS data without the
   :program:`mongod`. To run with :option:`--dbpath`, :program:`mongofiles` needs to lock
   access to the data directory: as a result, no :program:`mongod` can access
   the same path while the process runs.

.. option:: --directoryperdb

   Use the :option:`--directoryperdb` in conjunction with the corresponding
   option to :program:`mongod`, which allows :program:`mongofiles` when
   running with the :option:`--dbpath` option and MongoDB uses an
   on-disk format where every database has a distinct
   directory. This option is only relevant when specifying the
   :option:`--dbpath` option.

.. option:: --journal

   Allows :program:`mongofiles` operations to use the durability
   :term:`journal <journaling>` when running with :option:`--dbpath`
   to ensure that the database maintains a recoverable state. This
   forces :program:`mongofiles` to record all data on disk regularly.

.. option:: --db [db], -d [db]

   Use the :option:`--db` option to specify the MongoDB database that stores
   or will store the GridFS files.

.. option:: --collection [collection], -c [collection]

   This option has no use in this context and a future release may
   remove it. See :issue:`SERVER-4931` for more information.

.. option:: --local <filename>, -l <filename>

   Specifies the local filesystem name of a file for get and put
   operations.

   In the :command:`mongofiles put` and :command:`mongofiles get`
   commands the required ``<filename>`` modifier refers to the name
   the object will have in GridFS. :program:`mongofiles` assumes that
   this reflects the file's name on the local file
   system. This setting overrides this default.

.. option:: --type <MIME>, t <MIME>

   Provides the ability to specify a :term:`MIME` type to describe the
   file inserted into GridFS storage. :program:`mongofiles` omits this
   option in the default operation.

   Use only with :command:`mongofiles put` operations.

.. option:: --replace, -r

   Alters the behavior of :command:`mongofiles put` to replace
   existing GridFS objects with the specified local file, rather than
   adding an additional object with the same name.

   In the default operation, files will not be overwritten by a
   :command:`mongofiles put` option.
