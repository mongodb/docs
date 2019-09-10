.. list-table::
   :widths: 10 10 70 10
   :stub-columns: 1
   :header-rows: 1

   * - Name
     - Type
     - Description
     - Default

   * - ``start``

     - long

     - UNIX timestamp in milliseconds of the first date to return
       database access logs from.

     - Current timestamp minus 30 days

   * - ``end``

     - long

     - UNIX timestamp in milliseconds of the last date to return
       database access logs from.

     - Current timestamp

   * - ``nLogs``

     - integer

     - Maximum number of logs to return. Valid values are ``0`` -
       ``20000``.

     - ``20000``

   * - ``ipAddress``

     - string

     - Filters the log to return authentication attempts from the
       specified IP address only. Maximum of one IP address.

     -

   * - ``authResult``

     - boolean

     - Specifies whether to return either successful or
       failed authentication attempts. When set to ``true``, filters
       the log to return only successful authentication attempts. When
       set to ``false``, filters the log to return only failed
       authentication attempts.

     -
