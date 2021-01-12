.. list-table::
   :widths: 20 14 11 45 10
   :header-rows: 1
   :stub-columns: 1

   * - start
     - number
     - Optional
     - |Epoch-time-ms| for the first entry that |service| returns from
       the database access logs.
     - Current timestamp minus 30 days

   * - end
     - number
     - Optional
     - |Epoch-time-ms| for the last entry that |service| returns from
       the database access logs.
     - Current timestamp

   * - nLogs
     - number
     - Optional
     - Maximum number of logs to return. Valid values range between
       ``0`` and ``20000``.
     - ``20000``

   * - ipAddress
     - string
     - Optional
     - Filters the log to return authentication attempts from the
       specified IP address only. Maximum of one IP address.
     -

   * - authResult
     - Boolean
     - Optional
     - Flag that indicates whether to return either successful or
       failed authentication attempts. When set to ``true``, |service|
       filters the log to return only successful authentication
       attempts. When set to ``false``, |service| filters the log to
       return only failed authentication attempts.
     -
