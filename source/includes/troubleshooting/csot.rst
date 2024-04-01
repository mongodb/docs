ServerSelectionTimeoutError
~~~~~~~~~~~~~~~~~~~~~~~~~~~

This error indicates that the client couldn't find an available server to run the operation
within the given timeout:

.. code-block:: python

   pymongo.errors.ServerSelectionTimeoutError: No servers found yet, Timeout: -0.00202266700216569s, Topology Description: <TopologyDescription id: 63698e87cebfd22ab1bd2ae0, topology_type: Unknown, servers: [<ServerDescription ('localhost', 27017) server_type: Unknown, rtt: None>]>

NetworkTimeout
~~~~~~~~~~~~~~

This error indicates either that the client couldn't establish a connection within the given
timeout or that the operation was sent but the server didn't respond in time:

.. code-block:: python

   pymongo.errors.NetworkTimeout: localhost:27017: timed out

ExecutionTimeout
~~~~~~~~~~~~~~~~

This error might indicate that the server cancelled the operation because it exceeded the
given timeout. Even if {+driver-short+} raises this exception, the operation might have
partially completed on the server.

.. code-block:: python

   pymongo.errors.ExecutionTimeout: operation exceeded time limit, full error: {'ok': 0.0, 'errmsg': 'operation exceeded time limit', 'code': 50, 'codeName': 'MaxTimeMSExpired'}

It also might indicate that the client cancelled the operation because it wasn't possible
to complete it within the given timeout:

.. code-block:: python

   pymongo.errors.ExecutionTimeout: operation would exceed time limit, remaining timeout:0.00196 <= network round trip time:0.00427

WTimeoutError
~~~~~~~~~~~~~

This error indicates that the server couldn't complete the requested write operation
within the given timeout and following the specified write concern:

.. code-block:: python

   pymongo.errors.WTimeoutError: operation exceeded time limit, full error: {'code': 50, 'codeName': 'MaxTimeMSExpired', 'errmsg': 'operation exceeded time limit', 'errInfo': {'writeConcern': {'w': 1, 'wtimeout': 0}}}

BulkWriteError
~~~~~~~~~~~~~~

This error indicates that the server couldn't complete an ``insert_many()``
or ``bulk_write()`` method within the given timeout and following the specified
write concern:

.. code-block:: python

   pymongo.errors.BulkWriteError: batch op errors occurred, full error: {'writeErrors': [], 'writeConcernErrors': [{'code': 50, 'codeName': 'MaxTimeMSExpired', 'errmsg': 'operation exceeded time limit', 'errInfo': {'writeConcern': {'w': 1, 'wtimeout': 0}}}], 'nInserted': 2, 'nUpserted': 0, 'nMatched': 0, 'nModified': 0, 'nRemoved': 0, 'upserted': []}