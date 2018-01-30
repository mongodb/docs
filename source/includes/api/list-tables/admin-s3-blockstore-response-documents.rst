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
       blockstore were encrypted using the 
       :ref:`credentialstool <encrypt-mongodb-user-credentials>`.
 
   * - id
     - string
     - The unique name that labels this S3 blockstore.
 
   * - labels
     - array of strings
     - Array of tags to manage which 
       :term:`backup jobs <backup job>` |onprem| can assign to which 
       :term:`S3 blockstores <S3 blockstore>`. 
 
   * - links
     - array of objects
     - .. include:: /includes/api/links-explanation.rst
 
   * - loadFactor
     - number
     - A positive, non-zero integer that expresses how much backup work
       this :term:`snapshot store` should perform compared to another
       snapshot store. This option is needed only if more than one 
       snapshot store is in use.

       .. seealso::

          To learn more about :guilabel:`Load Factor`, see 
          :doc:`Edit an Existing S3 Blockstore </tutorial/manage-s3-blockstore-storage>`
  
   * - pathStyleAccessEnabled
     - boolean
     - *Optional.* Flag indicating whether this S3 blockstore 
       uses a path-style :abbr:`URL (Uniform Resource Locator)` 
       endpoint (``s3.amazonaws.com/<bucket>``) instead of a
       virtual-host-style :abbr:`URL (Uniform Resource Locator)` 
       endpoint (``<bucket>.s3.amazonaws.com``).

   * - s3BucketEndpoint
     - string
     - The URL used to access this AWS S3 or S3-compatible bucket.
 
   * - s3BucketName
     - string
     - The name of the S3 bucket that hosts the S3 blockstore.
 
   * - sseEnabled
     - boolean
     - *Optional.* Flag indicating whether this S3 blockstore 
        enables `server-side encryption <http://docs.aws.amazon.com/AmazonS3/latest/dev/UsingServerSideEncryption.html>`_.

   * - uri
     - string
     - A comma-separated list of hosts in the ``<hostname:port>`` format  
       that can be used to access this S3 blockstore.
 
   * - ssl
     - boolean
     - Flag indicating whether this S3 blockstore only accepts 
       connections encrypted using 
       :abbr:`TLS (Transport Layer Security)`.
 
   * - writeConcern
     - string
     - The write concern used for this blockstore.
 
       The accepted values for this option are:
       
       - ``ACKNOWLEDGED``
       - ``W2``
       - ``JOURNALED``
       - ``MAJORITY``

       .. seealso::

          To learn about write acknowledgement levels in MongoDB, see 
          :manual:`Write Concern </reference/write-concern>`
