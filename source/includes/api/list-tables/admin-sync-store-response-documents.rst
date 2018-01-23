.. list-table::
   :widths: 10 10 80
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
       sync store were encrypted using the credentialstool.
   
   * - id
     - string
     - The Unique Identifier that represents this sync store.
   
   * - labels
     - array of strings
     - Names used to assign sync stores to specific projects.
   
   * - links
     - array of objects
     - .. include:: /includes/api/links-explanation.rst
   
   * - loadFactor
     - number
     - A positive integer that expresses how much backup work you want 
       this :term:`snapshot store` to perform compared to another 
       snapshot store.
   
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
