.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :widths: 20 14 66

   * - Name
     - Type
     - Description

   * - createdAt
     - string
     - |iso8601-time| when |service| took the snapshot. |service| sorts 
       the **results** document in descending order based on this date.

   * - expiresAt
     - string
     - |iso8601-time| when |service| deletes the snapshot.

   * - id
     - string
     - Unique 24-hexadecimal digit string that identifies your
       snapshot.

   * - mongodVersion
     - string
     - Version of the MongoDB server.

   * - serverlessInstanceName
     - string
     - Human-readable label given to the {+serverless-instance+} from
       which |service| took this snapshot.

   * - snapshotType
     - string
     - Type of snapshot. |service| returns **scheduled**.

   * - status
     - string
     - Current status of the snapshot. |service| can return one of the
       following values:

       - **queued**
       - **inProgress**
       - **completed**
       - **failed**

   * - storageSizeBytes
     - integer
     - Size of the snapshot in bytes.
