.. list-table::
   :widths: 20 14 11 45 10
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
     - Maximum number of log entries to return. |service| accepts
       values between ``0`` and ``20000``, inclusive.
     - ``20000``

   * - ipAddress
     - string
     - Optional
     - Single IP address that attempted to authenticate with the
       database. |service| filters the returned logs to include
       documents with only this IP address.
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
