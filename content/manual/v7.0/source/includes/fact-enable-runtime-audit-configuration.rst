Starting in MongoDB 5.0, audit configurations for :binary:`~bin.mongod`
and :binary:`~bin.mongos` nodes can be configured at runtime. A group
of these nodes can take part in a distributed audit configuration. 

To include a node in a distributed audit configuration, update the
node's configuration file as follows and restart the server.

.. list-table::
   :header-rows: 1

   * - Parameter
     - Value
   * - :setting:`auditLog.runtimeConfiguration`
     - ``true``
   * - :setting:`auditLog.filter`
     - Unset
   * - :parameter:`auditAuthorizationSuccess`
     - Unset

The server logs an error and fails to start if:

-  ``runtimeConfiguration`` is ``true`` and
-  either :setting:`auditLog.filter` or :parameter:`auditAuthorizationSuccess` is set.

To modify audit filters and the :parameter:`auditAuthorizationSuccess` parameter at
runtime, see :dbcommand:`setAuditConfig`.

