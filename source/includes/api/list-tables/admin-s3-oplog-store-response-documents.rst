.. list-table::
   :widths: 15 15 70
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - assignmentEnabled
     - boolean
     - Flag indicating whether this data store can be assigned
       backup jobs.
 
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
     - Flag indicating whether the username and password for this S3 
       oplog store were encrypted using the 
       :ref:`credentialstool <encrypt-mongodb-user-credentials>`.
 
   * - id
     - string
     - The unique identifier that represents this S3 oplog store.
 
   * - labels
     - array of strings
     - Array of tags to manage which 
       :term:`backup jobs <backup job>` |onprem| can assign to which 
       S3 oplog stores. 
 
   * - links
     - array of objects
     - .. include:: /includes/api/links-explanation.rst
 
   * - s3BucketEndpoint
     - string
     - The URL used to access this AWS S3 or S3-compatible bucket.
 
   * - s3BucketName
     - string
     - The name of the S3 bucket that hosts the S3 oplog store.
 
   * - uri
     - string
     - A comma-separated list of hosts in the ``<hostname:port>`` format  
       that can be used to access this S3 oplog store.
 
   * - ssl
     - boolean
     - Flag indicating whether this S3 oplog store only accepts 
       connections encrypted using 
       :abbr:`TLS (Transport Layer Security)`.
 
   * - writeConcern
     - string
     - The write concern used for this oplog store.
 
        The accepted values for this option are:
       
       - ``ACKNOWLEDGED``
       - ``W2``
       - ``JOURNALED``
       - ``MAJORITY``

       .. seealso::

          To learn about write acknowledgement levels in MongoDB, see 
          :manual:`Write Concern </reference/write-concern>`

