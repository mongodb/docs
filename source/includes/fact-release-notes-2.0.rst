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

:program:`mongodrdl`
  This tool connects to a MongoDB instance and
  generates a :ref:`Document-Relational Definition Language (DRDL) <drdl>`
  file, which maps a given collection shape to relational schema.

:program:`mongosqld`
  Once installed and run as a daemon,
  :program:`mongosqld` responds to SQL queries, requests for DB
  information, and schema from the requesting BI tool via the MySQL
  wire protocol.

  :program:`mongosqld` requires at least one :ref:`DRDL` file to start.
  You will need to have defined your schema with
  :program:`mongodrdl` before starting :program:`mongosqld`.

SQL Compability
~~~~~~~~~~~~~~~

|bi| Version 2.0.0 is compatible with SQL-99 SELECT statements.

.. seealso:: :doc:`/supported-operations`
