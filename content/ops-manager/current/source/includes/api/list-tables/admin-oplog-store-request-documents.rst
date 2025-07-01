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
     - *Optional.* Flag indicating whether this :opsmgr:`oplog store  </reference/glossary/#std-term-Oplog-Store-Database>` can 
       be assigned backup jobs.
   
   * - encryptedCredentials
     - boolean
     - *Optional.* Flag indicating whether the username and password for 
       this oplog store were encrypted using the
       :doc:`credentialstool </tutorial/encrypt-user-credentials>`.
   
   * - labels
     - array of strings
     - *Optional.* Array of tags to manage which 
       :term:`backup jobs <backup job>` |onprem| can assign to which 
       :opsmgr:`oplog stores  </reference/glossary/#std-term-Oplog-Store-Database>`. 

       Setting these tags limits which backup jobs this oplog
       store can process. If omitted, this oplog store can only
       process backup jobs for projects that do not use labels to filter
       their jobs.
   
   * - maxCapacityGB
     - number
     - .. include:: /includes/api/maxCapacityGB-description.rst
   
   * - uri
     - string
     - A comma-separated list of hosts in the ``<hostname:port>``
       format that can be used to access this :opsmgr:`oplog store  </reference/glossary/#std-term-Oplog-Store-Database>`.
   
   * - ssl
     - boolean
     - *Optional.* Flag indicating whether this oplog store only accepts 
       connections encrypted using 
       :abbr:`TLS (Transport Layer Security)`.
   
   * - writeConcern
     - string
     - *Optional.* The write concern used for this :opsmgr:`oplog store  </reference/glossary/#std-term-Oplog-Store-Database>`.

       The accepted values for this option are:
       
       - ``ACKNOWLEDGED``
       - ``W2``
       - ``JOURNALED``
       - ``MAJORITY``

       To learn about write acknowledgement levels in MongoDB, see 
       :manual:`Write Concern </reference/write-concern>`.
