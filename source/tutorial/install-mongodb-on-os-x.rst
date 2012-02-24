=======================
Install MongoDB on OS X
=======================

.. default-domain:: mongodb

Synopsis
--------

This tutorial outlines the basic installation process for deploying
:term:`MongoDB` on Macintosh OS X systems. This tutorial provides two
main methods of installing the MongoDB server
(i.e. ":program:`mongod`") and associated tools: first using the
community package management tools, and second using builds of MongoDB
provided by 10gen.

.. seealso:: The documentation of following related processes and
   concepts.

   Other installation tutorials:

   - :doc:`/tutorial/install-mongodb-on-redhat-centos-or-fedora-linux`
   - :doc:`/tutorial/install-mongodb-on-debian-or-ubuntu-linux`
   - :doc:`/tutorial/install-mongodb-on-linux`
   - :doc:`/tutorial/install-mongodb-on-windows`

   Documentation for getting started with MongoDB:

   - :doc:`/getting-started`
   - :doc:`/tutorial/insert-test-data-into-a-mongodb-database`

Installing with Package Management
----------------------------------

Both community package management tools, `Homebrew
<http://mxcl.github.com/homebrew/>`_ and `MacPorts
<http://www.macports.org/>`_ require some initial setup and
configuration. This configuration is beyond the scope of this
document. You only need to use one of these tools.

If you can't decide, choose homebrew in the interest of time
and simplicity.

Homebrew
~~~~~~~~

Homebrew installs binary packages based on published "formula." Issue
the following command at the system shell to update the "``brew``"
package manager:

.. code-block:: sh

   brew update

Use the following command to install the MongoDB package into your
Homebrew system.

.. code-block:: sh

   brew install mongodb

MacPorts
~~~~~~~~

MacPorts distributes build scripts that allow you to easily build
packages and their dependencies on your own system. The compilation
process can take significant period of time depending on your system's
capabilities and existing dependencies. Issue the following command in
the system shell:

.. code-block:: sh

   port install mongodb

Using MongoDB from Homebrew and MacPorts
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The packages installed with Homebrew and MacPorts contain no
:term:`control scripts <control script>` or interaction with the system's process
manager.

If you have configured Homebrew and MacPorts correctly, including
setting your ``PATH``, the MongoDB applications and utilities will be
accessible from the system shell. Start the :program:`mongod` process
in a terminal (for testing or development) or using a process
management tool. 

.. code-block:: sh

  mongod

Then open the :program:`mongo` shell by issuing the
following command at the system prompt:

.. code-block:: sh

   mongo

This will connect to the database running on the localhost interface
by default. At the :program:`mongo` prompt, issue the following two
commands to insert a record in the "test" :term:`collection` of the
(default) "test" database and then retrieve that record.

.. code-block:: javascript

   > db.test.save( { a: 1 } )
   > db.test.find()

.. seealso:: ":program:`mongo`" and ":doc:`/reference/javascript`"

Installing from 10gen Builds
----------------------------

10gen provides compiled binaries of all MongoDB software compiled for
OS X, which may provide a more straightforward installation process.

Download MongoDB
~~~~~~~~~~~~~~~~

In a terminal session, begin by downloading the latest release. In
most cases you will want to download the 64-bit version of MongoDB.

.. code-block:: sh

   curl http://downloads.mongodb.org/osx/mongodb-osx-x86_64-x.y.z.tgz > mongo.tgz

If you need to run the 32-bit version, use the following command:

.. code-block:: sh

   curl http://downloads.mongodb.org/osx/mongodb-osx-i386-x.y.z.tgz > mongo.tgz

.. note::

   Replace x.y.z with the current version such as 2.0.2 or 2.0.0

.. note::

   The :program:`mongod` process will not run on older Macintosh computers
   with PowerPC (i.e. non-Intel) processors.

   While 32-bit builds of MongoDB are fine for testing purposes, its
   impossible to use multi-gigabyte databases with 32-bit systems. All
   recent Macintosh systems (including all Intel-based systems) have
   support for 64-bit builds of MongoDB.

Once you've downloaded the release, issue the following command to
extract the files from the archive:

.. code-block:: sh

   tar -zxvf mongo.tgz

.. optional::

   You may use the following command to move the extracted folder into
   a more generic location.

   .. code-block:: sh

      mv -n mongodb-osx-[platform]-[version]/ /path/to/new/location/

You can find the :program:`mongod` binary, and the binaries all of the
associated MongoDB utilities, in the "``bin/``" directory within the
archive.

Using MongoDB from 10gen Builds
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Before you start :program:`mongod` for the first time, you will need
to create the data directory. By default, :program:`mongod` writes
data to the ``/data/db/`` directory. To create this directory, and set
the appropriate permissions use the following commands:

.. code-block:: sh

   sudo mkdir -p /data/db
   sudo chown `id -u` /data/db

You can specify an alternate path for data files using the
:option:`--dbpath <mongod --dbpath>` option to :program:`mongod`.

The 10gen builds of MongoDB contain no :term:`control scripts <control
script>` or method to control the :program:`mongod` process. You may
wish to create control scripts, modify your path, and/or create
symbolic links to the MongoDB programs in your ``/usr/local/bin``
directory for easier use.

Among the tools included with this MongoDB distribution, is the
:program:`mongo` shell. You can use this shell to connect to your
MongoDB instance by issuing the following command at the system
prompt from inside of the directory where mongo was extracted:

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
