.. list-table::
   :widths: 10 10 80
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - assignmentEnabled
     - boolean
     - Flag indicating whether this data store can be assigned backups.
 
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
       blockstore were encrypted using the credentialstool.
 
   * - id
     - string
     - The Unique Identifier that represents this S3 blockstore.
 
   * - labels
     - array of strings
     - Names used to assign s3 blockstores to specific projects.
 
   * - links
     - array of objects
     - .. include:: /includes/api/links-explanation.rst
 
   * - loadFactor
     - number
     - A positive integer that expresses how much backup work you want
       this snapshot store to perform compared to another snapshot 
       store.
 
   * - s3BucketEndpoint
     - string
     - The URL used to access this AWS S3 or S3-compatible bucket.
 
   * - s3BucketName
     - string
     - The name of the S3 bucket that hosts the S3 blockstore.
 
   * - uri
     - string
     - A comma-separated list of hosts in the <hostname:port> format  
       that can be used to access this S3 blockstore.
 
   * - ssl
     - boolean
     - Flag indicating whether this S3 blockstore only accepts 
       connections encrypted using TLS.
 
   * - writeConcern
     - string
     - The write concern used for this blockstore.
 