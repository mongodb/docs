.. list-table::
   :widths: 15 15 70
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - assignmentEnabled
     - boolean
     - Flag indicating whether this :term:`blockstore` can be assigned
       backup jobs.
   
   * - encryptedCredentials
     - boolean
     - Flag indicating whether the username and password for this 
       blockstore were encrypted using the 
       :ref:`credentialstool <encrypt-mongodb-user-credentials>`.
   
   * - id
     - string
     - The unique name that labels this :term:`blockstore`.
   
   * - labels
     - array of strings
     - Array of tags to manage which 
       :term:`backup jobs <backup job>` |onprem| can assign to which 
       :term:`blockstores <blockstore>`. 

   * - links
     - object array
     - .. include:: /includes/api/links-explanation.rst
   
   * - loadFactor
     - number
     - A positive, non-zero integer that expresses how much backup work
       this :term:`snapshot store` should perform compared to another
       snapshot store. This option is needed only if more than one 
       snapshot store is in use.

       .. seealso::

          To learn more about :guilabel:`Load Factor`, see 
          :doc:`Edit an Existing Blockstore </tutorial/manage-blockstore-storage>`
   
   * - maxCapacityGB
     - number
     - The maximum amount of data in GB this :term:`blockstore` can 
       store.
   
   * - uri
     - string
     - A comma-separated list of hosts in the ``<hostname:port>``
       format that can be used to access this :term:`blockstore`.
   
   * - ssl
     - boolean
     - Flag indicating whether this blockstore only accepts 
       connections encrypted using 
       :abbr:`TLS (Transport Layer Security)`.
   
   * - usedSize
     - number
     - The amount of backup capacity in :abbr:`MB (megabytes)` that
       the existing backups consume.
   
   * - writeConcern
     - string
     - The write concern used for this :term:`blockstore`.

       The accepted values for this option are:
       
       - ``ACKNOWLEDGED``
       - ``W2``
       - ``JOURNALED``
       - ``MAJORITY``

       .. seealso::

          To learn about write acknowledgement levels in MongoDB, see 
          :manual:`Write Concern </reference/write-concern>`
