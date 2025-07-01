.. |product| replace:: blockstore
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
     - Flag indicating whether this :opsmgr:`blockstore </reference/glossary/#std-term-backup-blockstore-database>` can be assigned
       backup jobs.
   
   * - encryptedCredentials
     - boolean
     - Flag indicating whether the username and password for this 
       blockstore were encrypted using the 
       :doc:`credentialstool </tutorial/encrypt-user-credentials>`.
   
   * - id
     - string
     - The unique name that labels this :opsmgr:`blockstore </reference/glossary/#std-term-backup-blockstore-database>`.
   
   * - labels
     - array of strings
     - Array of tags to manage which 
       :term:`backup jobs <backup job>` |onprem| can assign to which 
       :opsmgr:`blockstores </reference/glossary/#std-term-backup-blockstore-database>`. 

   * - links
     - object array
     - .. include:: /includes/api/links-explanation.rst
   
   * - loadFactor
     - number
     - A positive, non-zero integer that expresses how much backup work
       this :opsmgr:`snapshot store </reference/glossary/#std-term-snapshot-store>` should perform compared to another
       snapshot store. This option is needed only if more than one 
       snapshot store is in use.

       To learn more about :guilabel:`Load Factor`, see :ref:`Edit One Existing Blockstore <edit-blockstore>`.
   
   * - maxCapacityGB
     - number
     - .. include:: /includes/api/maxCapacityGB-description.rst
   
   * - uri
     - string
     - A comma-separated list of hosts in the ``<hostname:port>``
       format that can be used to access this :opsmgr:`blockstore </reference/glossary/#std-term-backup-blockstore-database>`.
   
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
     - The write concern used for this :opsmgr:`blockstore </reference/glossary/#std-term-backup-blockstore-database>`.

       The accepted values for this option are:
       
       - ``ACKNOWLEDGED``
       - ``W2``
       - ``JOURNALED``
       - ``MAJORITY``

       To learn about write acknowledgement levels in MongoDB, see 
       :manual:`Write Concern </reference/write-concern>`.
