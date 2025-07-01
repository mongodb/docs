.. list-table::
   :widths: 20 14 66
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - _id
     - string
     - Unique 24-hexadecimal digit string that identifies this
       process validating the live migration.

   * - groupId
     - string
     - Unique 24-hexadecimal digit string that identifies the |service|
       project to validate.

   * - status
     - string
     - State of the validation job when you submitted this request.
       Returns ``"PENDING"``, ``"SUCCESS"``, or ``"FAILED"``.

   * - sourceGroupId
     - string
     - Unique 24-hexadecimal digit string that identifies the source
       (|com|) project.

   * - errorMessage
     - string
     - Reason why the validation job failed.
