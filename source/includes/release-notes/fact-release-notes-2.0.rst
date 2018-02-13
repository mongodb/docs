Improved Server-Side Execution
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The |bi| delivers significant performance and scalability improvements
by moving as much execution as possible to the underlying MongoDB
instance. Pushing execution down to the server reduces network
latency and reduces bandwidth consumption.

This approach also reduces memory and CPU consumption in the |bi| itself.

Pass-through Authentication
~~~~~~~~~~~~~~~~~~~~~~~~~~~

The user authentication process is now passed through the |bi| to the
underlying MongoDB instance. Users now authenticate as a user already
created within MongoDB.

Simplified Architecture
~~~~~~~~~~~~~~~~~~~~~~~

The |bi| package is now trimmed down from four separate components to
two:

:binary:`~bin.mongodrdl`
  This tool connects to a MongoDB instance and
  generates a :ref:`Document-Relational Definition Language (DRDL) <drdl>`
  file, which maps a given collection shape to relational schema.

:binary:`~bin.mongosqld`
  Once installed and run as a daemon,
  :binary:`~bin.mongosqld` responds to SQL queries, requests for DB
  information, and schema from the requesting BI tool via the MySQL
  wire protocol.

  :binary:`~bin.mongosqld` requires at least one :ref:`DRDL <drdl>` file to start.
  You will need to have defined your schema with   :binary:`~bin.mongodrdl` before
  starting :binary:`~bin.mongosqld`.

SQL Compatibility
~~~~~~~~~~~~~~~~~

|bi| Version 2.x is compatible with SQL-99 SELECT statements, and uses
the MySQL wire protocol.

.. seealso:: :doc:`/supported-operations`
