Additional Connection String Examples
-------------------------------------

The following examples show connection strings for common connection
targets.

admin Database Running Locally
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following example connects and logs in to the ``admin`` database as
user ``myDatabaseUser`` with the password ``D1fficultP%40ssw0rd``:

.. code-block:: bash

   mongodb://myDatabaseUser:D1fficultP%40ssw0rd@localhost

records Database Running Locally
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following example connects and logs in to the ``records`` database
as user ``myDatabaseUser`` with the password ``D1fficultP%40ssw0rd``:

.. code-block:: bash

   mongodb://myDatabaseUser:D1fficultP%40ssw0rd@localhost/records

UNIX Domain Socket
~~~~~~~~~~~~~~~~~~

When you connect to a UNIX domain socket, use a URL-encoded connection
string.

The following example connects to a UNIX domain socket with file path
``/tmp/mongodb-27017.sock`` as user ``myDatabaseUser`` with the password
``D1fficultP%40ssw0rd``:

.. code-block:: bash

   mongodb://myDatabaseUser:D1fficultP%40ssw0rd@%2Ftmp%2Fmongodb-27017.sock

Replica Set with Members on Different Hosts
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following example connects to a :term:`replica set` with two
members, one on ``db1.example.net`` and the other on
``db2.example.net``, as user ``myDatabaseUser`` with the password
``D1fficultP%40ssw0rd``:

.. note::

   .. include:: /includes/fact-uri-rs-hostnames.rst

.. code-block:: bash

   mongodb://myDatabaseUser:D1fficultP%40ssw0rd@db1.example.net,db2.example.com/?replicaSet=test

Replica Set with Members on localhost
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following example connects to a replica set with three members
running on ``localhost`` on ports ``27017``, ``27018``, and ``27019`` as
user ``myDatabaseUser`` with the password ``D1fficultP%40ssw0rd``:

.. code-block:: bash

   mongodb://myDatabaseUser:D1fficultP%40ssw0rd@localhost:27017,localhost:27018,localhost:27019/?replicaSet=myRepl

Replica Set with Read Distribution
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following example connects to a replica set with three members and
distributes reads to the :term:`secondaries <secondary>` as user
``myDatabaseUser`` with the password ``D1fficultP%40ssw0rd``:

.. code-block:: bash

   mongodb://myDatabaseUser:D1fficultP%40ssw0rd@mongodb0.example.com:27017,mongodb1.example.com:27017,mongodb2.example.com:27017/?replicaSet=myRepl&readPreference=secondary

Replica Set with a High Level of Write Concern
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following example connects to a replica set with write concern
configured to wait for replication to succeed across a majority of the
data-bearing voting members, with a two-second timeout. It authenticates
as user ``myDatabaseUser`` with the password ``D1fficultP%40ssw0rd``.

.. code-block:: bash

   mongodb://myDatabaseUser:D1fficultP%40ssw0rd@mongodb0.example.com:27017,mongodb1.example.com:27017,mongodb2.example.com:27017/?replicaSet=myRepl&w=majority&wtimeoutMS=2000

Sharded Cluster
~~~~~~~~~~~~~~~

The following example connects to a sharded cluster with three
:binary:`~bin.mongos` instances as user ``myDatabaseUser`` with the
password ``D1fficultP%40ssw0rd``:

.. code-block:: bash

   mongodb://myDatabaseUser:D1fficultP%40ssw0rd@router1.example.com:27017,router2.example2.com:27017,router3.example3.com:27017/
