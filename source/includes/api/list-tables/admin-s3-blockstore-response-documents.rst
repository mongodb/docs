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
       blockstore were encrypted using the
       :doc:`credentialstool </tutorial/encrypt-user-credentials>`.

   * - id
     - string
     - Name that uniquely identifies this |s3| blockstore.

   * - labels
     - array of strings
     - Array of tags to manage which
       :term:`backup jobs <backup job>` |onprem| can assign to which
       :term:`S3 blockstores <S3 Snapshot Store>`.

   * - links
     - object array
     - .. include:: /includes/api/links-explanation.rst

   * - loadFactor
     - integer
     - Positive, non-zero integer that expresses how much backup work
       this :term:`snapshot store` performs compared to another
       snapshot store. This option is needed only if more than one
       snapshot store is in use.

       .. seealso::

          To learn more about :guilabel:`Load Factor`, see
          :doc:`Edit an Existing |s3| Blockstore </tutorial/manage-s3-blockstore-storage>`

   * - pathStyleAccessEnabled
     - boolean
     - Flag that indicates the style of this endpoint.

       .. list-table::
          :widths: 20 40 40
          :header-rows: 1
          :stub-columns: 1

          * - Value
            - S3 Blockstore Endpoint Style
            - Example
          * - ``true``
            - Path-style |url| endpoint
            - ``s3.amazonaws.com/<bucket>``
          * - ``false``
            - Virtual-host-style |url| endpoint
            - ``<bucket>.s3.amazonaws.com``

       To review the |s3| bucket |url| conventions, see the
       :aws:`AWS S3 documentation </AmazonS3/latest/dev/UsingBucket.html#access-bucket-intro>`.

   * - s3AuthMethod
     - string
     - Method used to authorize access to the |s3| bucket specified in ``s3BucketName``.

       Accepted values for this option are: ``KEYS``, ``IAM_ROLE``.

       .. list-table::
          :widths: 20 80
          :stub-columns: 1

          * - ``KEYS`` or None
            - |mms| uses ``awsAccessKey`` and ``awsSecretKey`` to
              authorize access to |s3| bucket specified in
              ``s3BucketName``.
          * - ``IAM_ROLE``
            - |mms| uses an |aws| |iam| role to authorize access to
              |s3| bucket specified in ``s3BucketName``.
              ``awsAccessKey`` and ``awsSecretKey`` fields are
              ignored. To learn more, see the
              :aws:`AWS documentation </AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html#attach-iam-role>`

   * - s3BucketEndpoint
     - string
     - |url| that |onprem| uses to access this |aws| |s3| or
       |s3|\-compatible bucket.

   * - s3BucketName
     - string
     - Name of the |s3| bucket that hosts the |s3| blockstore.

   * - s3MaxConnections
     - integer
     - Positive integer indicating the maximum number of connections
       to this |s3| blockstore.

   * - s3RegionOverride
     - string
     - Region where your |s3| bucket resides. This field applies only if
       your |s3|\-compatible store's **s3BucketEndpoint** doesn't 
       support region scoping.

       |mms| returns this field only if you included it when you
       :ref:`created <om-create-s3-blockstore-api>` or :ref:`updated
       <om-create-s3-blockstore-api>` this |s3| blockstore.

   * - sseEnabled
     - boolean
     - Flag that indicates whether this |s3| blockstore enables
       :aws:`server-side encryption </AmazonS3/latest/dev/UsingServerSideEncryption.html>`.

   * - uri
     - string
     - Comma-separated list of hosts in the ``<hostname:port>`` format
       that can access this |s3| blockstore.

   * - ssl
     - boolean
     - Flag that indicates whether this |s3| blockstore only accepts
       connections encrypted using |tls|.

   * - writeConcern
     - string
     - Write concern used for this blockstore.

       |onprem| returns one of the following values:

       - ``ACKNOWLEDGED``
       - ``W2``
       - ``JOURNALED``
       - ``MAJORITY``

       .. seealso::

          To learn about write acknowledgement levels in MongoDB, see
          :manual:`Write Concern </reference/write-concern>`
