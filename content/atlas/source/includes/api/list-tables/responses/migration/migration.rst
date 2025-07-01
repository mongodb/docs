.. list-table::
   :widths: 20 14 66
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - _id
     - string
     - Unique 24-hexadecimal digit string that identifies the migration.

   * - status
     - string
     - State of the migration when you submitted this request. Returns
       one of the following values:

       - ``"NEW"``
       - ``"WORKING"``
       - ``"FAILED"``
       - ``"COMPLETE"``
       - ``"EXPIRED"``

   * - migrationHosts
     - array
     - List of hosts running the MongoDB Agent that can transfer your
       MongoDB data from the source (|com|) to destination
       (|service|) deployments. Each live migration process uses its
       own dedicated migration host.

   * - readyForCutover
     - boolean
     - Flag that indicates whether the live migration process is ready
       to start the cutover process.
