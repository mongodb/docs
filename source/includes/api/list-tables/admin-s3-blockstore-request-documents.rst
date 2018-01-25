.. list-table::
   :widths: 15 15 70
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - assignmentEnabled
     - boolean
     - *Optional.* Flag indicating whether this data store can be 
       assigned backup jobs.
 
   * - awsAccessKey
     - string
     - The AWS Access Key ID that can access the S3 bucket specified in
       ``<s3BucketName>``.
 
   * - awsSecretKey
     - string
     - The AWS Secret Access Key that can access the S3 bucket  
       specified in ``<s3BucketName>``.
 
   * - encryptedCredentials
     - boolean
     - *Optional.* Flag indicating whether the username and password for 
       this S3 blockstore were encrypted using the
       :ref:`credentialstool <encrypt-mongodb-user-credentials>`.
 
   * - labels
     - array of strings
     - *Optional.* Array of tags to manage which 
       :term:`backup jobs <backup job>` |onprem| can assign to which 
       :term:`S3 blockstores <S3 blockstore>`. 

       Setting these tags limits which backup jobs this S3 blockstore 
       can process. If omitted, this S3 blockstore can only process 
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
          :doc:`Edit an Existing S3 Blockstore </tutorial/manage-s3-blockstore-storage>`
 
   * - s3BucketEndpoint
     - string
     - The URL used to access this AWS S3 or S3-compatible bucket.
 
   * - s3BucketName
     - string
     - The name of the S3 bucket that hosts the S3 blockstore.
 
   * - uri
     - string
     - A comma-separated list of hosts in the ``<hostname:port>`` format  
       that can be used to access this S3 blockstore.
 
   * - ssl
     - boolean
     - *Optional.* Flag indicating whether this S3 blockstore only 
       accepts connections encrypted using
       :abbr:`TLS (Transport Layer Security)`.
 
   * - writeConcern
     - string
     - *Optional.* The write concern used for this blockstore.
 
        The accepted values for this option are:
       
       - ``ACKNOWLEDGED``
       - ``W2``
       - ``JOURNALED``
       - ``MAJORITY``

       .. seealso::

          To learn about write acknowledgement levels in MongoDB, see 
          :manual:`Write Concern </reference/write-concern>`
