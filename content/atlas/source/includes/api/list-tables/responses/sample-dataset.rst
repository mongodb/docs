.. list-table::
   :widths: 20 14 66
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - clusterName
     - string
     - Label that identifies the cluster into which you loaded the
       sample dataset.

   * - completeDate
     - string
     - |iso8601-time| when the dataset load job completed.

   * - createDate
     - string
     - |iso8601-time| when you created the dataset load job.

   * - errorMessage
     - string
     - Description of any issue that arose in loading the data. This
       endpoint returns ``null`` if **state** has a value other than
       **FAILED**.

   * - id
     - string
     - Unique 24-hexadecimal string that identifies this sample
       dataset.

   * - state
     - string
     - Condition in which the loading dataset currently exists.

       Allowable values include **WORKING**, **COMPLETED**, and
       **FAILED**

