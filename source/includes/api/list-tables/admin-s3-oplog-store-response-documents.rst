.. list-table::
   :widths: 20 14 66
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - acceptedTos
     - boolean
     - Flag that indicates whether or not you accepted the terms of 
       service for using |s3|\-compatible stores with |onprem|. You must
       set this to ``true`` to create an |s3|\-compatible store. 

   * - assignmentEnabled
     - boolean
     - Flag that indicates whether you can assign backup jobs to this data
       store.
 
   * - awsAccessKey
     - string
     - |aws| Access Key ID that can access the |s3| bucket specified in
       **s3BucketName**.
 
   * - awsSecretKey
     - string
     - |aws| Secret Access Key that can access the |s3| bucket
       specified in **s3BucketName**.
 
   * - disableProxyS3
     - boolean
     - Flag that indicates whether the
       :doc:`HTTP proxy </tutorial/use-with-http-proxy>` should be
       used when connecting to |s3|.

   * - encryptedCredentials
     - boolean
     - Flag that indicates whether the username and password for this |s3|
       oplog store were encrypted using the
       :doc:`credentialstool </tutorial/encrypt-user-credentials>`.
 
   * - id
     - string
     - Name that uniquely identifies this |s3| oplog store.
 
   * - labels
     - array of strings
     - Array of tags to manage which
       :term:`backup jobs <backup job>` |onprem| can assign to which
       |s3| oplog stores.
 
   * - links
     - object array
     - .. include:: /includes/api/links-explanation.rst
 
   * - pathStyleAccessEnabled
     - boolean
     - Flag that indicates the style of this endpoint.

       .. list-table::
          :widths: 20 40 40
          :header-rows: 1
          :stub-columns: 1

          * - Value
            - S3 Oplog Store Endpoint Style
            - Example
          * - ``true``
            - Path-style |url| endpoint
            - ``s3.amazonaws.com/<bucket>``
          * - ``false``
            - Virtual-host-style |url| endpoint
            - ``<bucket>.s3.amazonaws.com``

       To review the |s3| bucket |url| conventions, see the
       :aws:`AWS S3 documentation </AmazonS3/latest/dev/UsingBucket.html#access-bucket-intro>`.

   * - s3BucketEndpoint
     - string
     - |url| that |onprem| uses to access this |aws| |s3| or
       |s3|\-compatible bucket.

   * - s3BucketName
     - string
     - Name of the |s3| bucket that hosts the |s3| oplog store.

   * - s3RegionOverride
     - string
     - Region where your |s3| bucket resides. This field applies only if
       your |s3|\-compatible store's **s3BucketEndpoint** doesn't 
       support region scoping.

       |mms| returns this field only if you included it when you
       :ref:`created <create-one-s3-oplog-configuration>` or
       :ref:`updated <create-one-s3-oplog-configuration>` this |s3|
       oplog store.
  
   * - sseEnabled
     - boolean
     - Flag that indicates whether this |s3| oplog store enables
       :aws:`server-side encryption </AmazonS3/latest/dev/UsingServerSideEncryption.html>`.

   * - uri
     - string
     - Comma-separated list of hosts in the ``<hostname:port>`` format
       that can access this |s3| oplog store.

   * - ssl
     - boolean
     - Flag that indicates whether this |s3| oplog store only accepts
       connections encrypted using |tls|.

   * - writeConcern
     - string
     - Write concern used for this oplog store.

       |onprem| returns one of the following values:

       - ``ACKNOWLEDGED``
       - ``W2``
       - ``JOURNALED``
       - ``MAJORITY``

       .. seealso::

          To learn about write acknowledgement levels in MongoDB, see
          :manual:`Write Concern </reference/write-concern>`
