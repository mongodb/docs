========================
Install MongoDB on Linux
========================

.. default-domain:: mongodb

Synopsis
--------

10gen provides compiled versions of :term:`MongoDB` for use on Linux
that provides an simple option for users who cannot use packages. This
tutorial outlines the basic installation of MongoDB using these
packages and an initial usage guide.

.. seealso:: The documentation of following related processes and
   concepts.

   Other installation tutorials:

   - :doc:`/tutorial/install-mongodb-on-redhat-centos-or-fedora-linux`
   - :doc:`/tutorial/install-mongodb-on-debian-or-ubuntu-linux`
   - :doc:`/tutorial/install-mongodb-on-os-x`
   - :doc:`/tutorial/install-mongodb-on-windows`

   Documentation for getting started with MongoDB:

   - :doc:`/getting-started`
   - :doc:`/tutorial/insert-test-data-into-a-mongodb-database`

Download MongoDB
----------------

.. note::

   You should place the MongoDB binaries in a central location on the
   file system that is easy to access and control. Consider ``/opt``
   or ``/usr/local/bin``.

In a terminal session, begin by downloading the latest release. In
most cases you will want to download the 64-bit version of MongoDB.

.. code-block:: sh

   curl http://downloads.mongodb.org/linux/mongodb-linux-x86_64-latest.tgz > mongo.tgz

If you need to run the 32-bit version, use the following command.

.. code-block:: sh

   curl http://downloads.mongodb.org/linux/mongodb-linux-i686-latest.tgz > mongo.tgz

Once you've downloaded the release, issue the following command to
extract the files from the archive:

.. code-block:: sh

   tar -zxvf mongo.tgz

.. optional::

   You may use the following command to move the extracted folder into
   a more generic location.

   .. code-block:: sh

      mv -n mongodb-osx-20??-??-??/ mongodb

You can find the :program:`mongod` binary, and the binaries all of the
associated MongoDB utilities, in the "``bin/``" directory within the
archive.

Using MongoDB
~~~~~~~~~~~~~

Before you start :program:`mongod` for the first time, you will need
to create the data directory. By default, :program:`mongod` writes
data to the ``/data/db/`` directory. To create this directory, use the
following command:

.. code-block:: sh

   mkdir -p /data/db

You can specify, and create, an alternate path using the
:option:`--dbpath <mongod>` option to :program:`mongod` and the above
command.

The 10gen builds of MongoDB contain no :term:`control scripts <control
script>` or method to control the :program:`mongod` process. You may
wish to create control scripts, modify your path, and/or create
symbolic links to the MongoDB programs in your ``/usr/local/bin`` or
"``/usr/bin``" directory for easier use.

Among the tools included with this MongoDB distribution, is the
:program:`mongo` shell. You can use this shell to connect to your
MongoDB instance by issuing the following command at the system
prompt:

.. code-block:: sh

   ./bin/mongo

This will connect to the database running on the localhost interface
by default. At the :program:`mongo` prompt, issue the following two
commands to insert a record in the "test" :term:`collection` of the
(default) "test" database and then retrieve that record:

.. code-block:: javascript

   > db.test.save( { a: 1 } )
   > db.test.find()

.. seealso:: ":program:`mongo`" and ":doc:`/reference/javascript`"
