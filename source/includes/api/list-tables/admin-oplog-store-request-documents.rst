.. list-table::
   :widths: 10 10 80
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - assignmentEnabled
     - boolean
     - Flag indicating whether this :term:`oplog store` can be assigned
       backup jobs.
   
   * - encryptedCredentials
     - boolean
     - Flag indicating whether the username and password for this 
       oplog store were encrypted using the credentialstool.
   
   * - labels
     - array of strings
     - Names used to assign oplog stores to specific projects.
   
   * - loadFactor
     - number
     - A positive integer that expresses how much backup work you want 
       this :term:`snapshot store` to perform compared to another 
       snapshot store.
   
   * - maxCapacityGB
     - number
     - The maximum amount of data in GB this :term:`oplog store` can 
       store.
   
   * - uri
     - string
     - A comma-separated list of hosts in the ``<hostname:port>``
       format that can be used to access this :term:`oplog store`.
   
   * - ssl
     - boolean
     - Flag indicating whether this oplog store only accepts 
       connections encrypted using 
       :abbr:`TLS (Transport Layer Security)`.
   
   * - writeConcern
     - string
     - The write concern used for this :term:`oplog store`.
