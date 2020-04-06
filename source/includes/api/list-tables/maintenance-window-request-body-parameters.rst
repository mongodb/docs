.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :widths: 15 10 10 65

   * - Body Parameter
     - Type
     - Necessity
     - Description
   
   * - ``alertTypeNames``
     - string
     - Required
     - Alert types to silence during maintenance window. For example:
       ``HOST``, ``REPLICA_SET``, ``CLUSTER``, ``AGENT``, ``BACKUP``

   * - ``startDate``
     - string
     - Required
     - |iso8601-time| when the maintenance window starts.

   * - ``endDate``
     - string
     - Required
     - |iso8601-time| when the maintenance window ends.

   * - ``description``
     - string
     - Optional
     - Description of the maintenance window.
