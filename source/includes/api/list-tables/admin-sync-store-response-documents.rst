.. list-table::
   :widths: 15 15 70
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - assignmentEnabled
     - boolean
     - Flag indicating whether this sync store can be assigned
       backup jobs.
   
   * - encryptedCredentials
     - boolean
     - Flag indicating whether the username and password for this 
       sync store were encrypted using the 
       :ref:`credentialstool <encrypt-mongodb-user-credentials>`.
   
   * - id
     - string
     - The unique name that labels this sync store.
   
   * - labels
     - array of strings
     - Array of tags to manage which 
       :term:`backup jobs <backup job>` |onprem| can assign to which 
       :term:`sync stores <sync store>`. 
   
   * - links
     - object array
     - .. include:: /includes/api/links-explanation.rst
   
   * - maxCapacityGB
     - number
     - The maximum amount of data in GB this sync store can 
       store.
   
   * - uri
     - string
     - A comma-separated list of hosts in the ``<hostname:port>``
       format that can be used to access this sync store.
   
   * - ssl
     - boolean
     - Flag indicating whether this sync store only accepts 
       connections encrypted using 
       :abbr:`TLS (Transport Layer Security)`.
   
   * - usedSize
     - number
     - The amount of backup capacity in :abbr:`MB (megabytes)` that
       the existing backups consume.

   * - writeConcern
     - string
     - The write concern used for this sync store.

       The accepted values for this option are:
       
       - ``ACKNOWLEDGED``
       - ``W2``
       - ``JOURNALED``
       - ``MAJORITY``

       .. seealso::

          To learn about write acknowledgement levels in MongoDB, see 
          :manual:`Write Concern </reference/write-concern>`
