.. |product| replace:: oplog store
.. |field| replace:: ``maxCapacityGB``

.. list-table::
   :widths: 15 15 70
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - assignmentEnabled
     - boolean
     - Flag indicating whether this :opsmgr:`oplog store  </reference/glossary/#std-term-Oplog-Store-Database>` can be assigned
       backup jobs.
   
   * - encryptedCredentials
     - boolean
     - Flag indicating whether the username and password for this 
       oplog store were encrypted using the 
       :doc:`credentialstool </tutorial/encrypt-user-credentials>`.
   
   * - id
     - string
     - The unique name that labels this :opsmgr:`oplog store  </reference/glossary/#std-term-Oplog-Store-Database>`.
   
   * - labels
     - array of strings
     - Array of tags to manage which 
       :term:`backup jobs <backup job>` |onprem| can assign to which 
       :opsmgr:`oplog stores  </reference/glossary/#std-term-Oplog-Store-Database>`. 
   
   * - links
     - object array
     - .. include:: /includes/api/links-explanation.rst
 
   * - maxCapacityGB
     - number
     - .. include:: /includes/api/maxCapacityGB-description.rst
   
   * - uri
     - string
     - A comma-separated list of hosts in the ``<hostname:port>``
       format that can be used to access this :opsmgr:`oplog store  </reference/glossary/#std-term-Oplog-Store-Database>`.
   
   * - ssl
     - boolean
     - Flag indicating whether this oplog store only accepts 
       connections encrypted using 
       :abbr:`TLS (Transport Layer Security)`.

   * - usedSize
     - number
     - The amount of backup capacity in :abbr:`MB (megabytes)` that
       the existing backups consume.

   * - writeConcern
     - string
     - The write concern used for this :opsmgr:`oplog store  </reference/glossary/#std-term-Oplog-Store-Database>`.

       The accepted values for this option are:
       
       - ``ACKNOWLEDGED``
       - ``W2``
       - ``JOURNALED``
       - ``MAJORITY``

       To learn about write acknowledgement levels in MongoDB, see 
       :manual:`Write Concern </reference/write-concern>`.
