.. list-table::
   :widths: 15 15 70
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - assignmentEnabled
     - boolean
     - *Optional.* Flag indicating whether this :term:`blockstore` can 
       be assigned backup jobs.
   
   * - encryptedCredentials
     - boolean
     - *Optional.* Flag indicating whether the username and password 
       for this blockstore were encrypted using the
       :ref:`credentialstool <encrypt-mongodb-user-credentials>`.
   
   * - labels
     - array of strings
     - *Optional.* Array of tags to manage which 
       :term:`backup jobs <backup job>` |onprem| can assign to which 
       :term:`blockstores <blockstore>`. 

       Setting these tags limits which backup jobs this blockstore 
       can process. If omitted, this blockstore can only process 
       backup jobs for projects that do not use labels to filter their 
       jobs. 

   * - loadFactor
     - number
     - *Optional.* A positive, non-zero integer that expresses how much 
       backup work this :term:`snapshot store` should perform compared 
       to another snapshot store. This option is needed only if more 
       than one snapshot store is in use.

       .. seealso::

          To learn more about :guilabel:`Load Factor`, see 
          :doc:`Edit an Existing Blockstore </tutorial/manage-blockstore-storage>`
   
   * - maxCapacityGB
     - number
     - *Optional.* The maximum amount of data in GB this 
       :term:`blockstore` can store.
   
   * - uri
     - string
     - A comma-separated list of hosts in the ``<hostname:port>``
       format that can be used to access this :term:`blockstore`.
   
   * - ssl
     - boolean
     - *Optional.* Flag indicating whether this blockstore only accepts 
       connections encrypted using 
       :abbr:`TLS (Transport Layer Security)`.
   
   * - writeConcern
     - string
     - *Optional.* The write concern used for this :term:`blockstore`.

       The accepted values for this option are:
       
       - ``ACKNOWLEDGED``
       - ``W2``
       - ``JOURNALED``
       - ``MAJORITY``

       .. seealso::

          To learn about write acknowledgement levels in MongoDB, see 
          :manual:`Write Concern </reference/write-concern>`
