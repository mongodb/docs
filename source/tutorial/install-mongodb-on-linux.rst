========================
Install MongoDB on Linux
========================

.. default-domain:: mongodb

Synopsis
--------

10gen provides compiled versions of :term:`MongoDB` for use on Linux
that provides a simple option for users who cannot use packages. This
tutorial outlines the basic installation of MongoDB using these
compiled versions and an initial usage guide.

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

   //TODO: this is an installation guide for linux hence the package that will be downloaded
           will probably have name like mongodb-linux-x86_64?-20??-??-?? 
           and not mongdo-osx-20??-??-?? that you have mentioned below.

   .. code-block:: sh

      mv -n mongodb-osx-20??-??-??/ mongodb

You can find the :program:`mongod` binary, and the binaries all of the
associated MongoDB utilities, in the "``bin/``" directory within the
extracted directory.

Using MongoDB
~~~~~~~~~~~~~

Before you start :program:`mongod` for the first time, you will need
to create the data directory. By default, :program:`mongod` writes
data to the ``/data/db/`` directory. To create this directory, use the
following command:

.. code-block:: sh

   mkdir -p /data/db

// TODO: you might want to mention that the users should also give write permissions
         to the directory /data/db or wherever they want the dbpath to point to.

You can specify, and create, an alternate path using the
:option:`--dbpath <mongod>` option to :program:`mongod` and the above
command.

// TODO : the part to start mongod is completely missing. I think we should add a few lines
          on how to  start the mongod process. The previous step tells how to create a directory,
          the next step tells how to use the mongo shell. We should definitely have a line on how to start
          the mongod process.

The 10gen builds of MongoDB contain no :term:`control scripts <control
script>` or method to control the :program:`mongod` process. You may
wish to create control scripts, modify your path, and/or create
symbolic links to the MongoDB programs in your ``/usr/local/bin`` or
"``/usr/bin``" directory for easier use.

Among the tools included with this MongoDB distribution, is the
:program:`mongo` shell. You can use this shell to connect to your
MongoDB instance by issuing the following command at the system
prompt:
  
   TODO : You might want to add that the following command is to be issued
         from the directory in which mongodb was extracted to. './bin' is not very descritpive.

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
