.. list-table::
   :widths: 15 10 75
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - ``id``
     - string
     - Unique identifier of the maintenance window.

   * - ``groupId``
     - string
     - Unique identifier of the project to which this maintenance window
       applies.

   * - ``created``
     - string
     - |iso8601-time| when the maintenance window was created. 

   * - ``updated``
     - string
     - |iso8601-time| when the maintenance window was last updated.

   * - ``startDate``
     - string
     - |iso8601-time| when the maintenance window starts.

   * - ``endDate``
     - string
     - |iso8601-time| when the maintenance window ends.

   * - ``alertTypeNames``
     - array of strings
     - Alert types to silence during maintenance window. For example:
       ``HOST``, ``REPLICA_SET``, ``CLUSTER``, ``AGENT``, ``BACKUP``

   * - ``description``
     - string
     - Description of the maintenance window. This field is returned 
       only if you provided a description of the maintenance window.
