.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :widths: 10 10 20

   * - Field
     - Data Type
     - Description

   * - ``_id``
     - String
     - The hostname and port where the
       :binary:`~bin.mongos` is running. The ``_id`` is formatted as
       ``<hostname>:<port>``.

   * - ``advisoryHostFQDNs``
     - Array of strings
     - Array of the :binary:`~bin.mongos`'s fully qualified domain
       names (FQDNs).

   * - ``created``
     - Date
     - When the :binary:`~bin.mongos` was started.

       .. versionadded:: 5.2

   * - ``mongoVersion``
     - String
     - Version of MongoDB that the :binary:`~bin.mongos` is running.

   * - ``ping``
     - Date
     - :binary:`~bin.mongos` instances send pings to the
       :ref:`config server <sharding-config-server>` every 30
       seconds. This field indicates the last ping time.

   * - ``up``
     - NumberLong
     - Number of seconds the :binary:`~bin.mongos` has been up as of
       the last ping.

   * - ``waiting``
     - Boolean
     - As of MongoDB 3.4, this field is always ``true`` and is
       only present for backward compatibility.
