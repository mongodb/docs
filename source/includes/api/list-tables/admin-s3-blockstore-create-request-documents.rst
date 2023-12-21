.. list-table::
   :widths: 20 14 11 55
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Necessity
     - Description

   * - acceptedTos
     - boolean
     - Required
     - Flag that indicates whether or not you accepted the terms of
       service for using |s3|\-compatible stores with |onprem|. You
       must set this to ``true`` to create an |s3|\-compatible store.

       If you set this to ``false``, |onprem| returns an error. The
       error states that |onprem| can't create the |s3|\-compatible
       store.

   * - assignmentEnabled
     - boolean
     - Optional
     - Flag that indicates whether you can assign backup jobs to this
       data store.

   * - awsAccessKey
     - string
     - Conditional
     - |aws| Access Key ID that can access the |s3| bucket specified in
       **s3BucketName**.

       If ``"s3AuthMethod" : "IAM_ROLE"``, then you don't need to
       include **awsAccessKey**.

   * - awsSecretKey
     - string
     - Conditional
     - |aws| Secret Access Key that can access the |s3| bucket
       specified in ``<s3BucketName>``.

       If ``"s3AuthMethod" : "IAM_ROLE"``, then you don't need to
       include **awsSecretKey**.

   * - customCertificates
     - array
     - Optional
     - List of valid |certauth| certificates that apply to the
       associated |s3| bucket.

   * - customCertificates[n].filename
     - string
     - Optional
     - Name that identifies the |certauth| |pem| file.

   * - customCertificates[n].certString
     - string
     - Optional
     - Contents of the |certauth| |pem| file that comprise your
       |certauth| chain.

   * - disableProxyS3
     - boolean
     - Optional
     - Flag that indicates whether the
       :doc:`HTTP proxy </tutorial/use-with-http-proxy>` should be used
       when connecting to |s3|. You don't need to set this value
       unless you configured |onprem| to use the HTTP proxy.

   * - encryptedCredentials
     - boolean
     - Optional
     - Flag that indicates whether the username and password for this 
       |s3| blockstore were encrypted using the
       :doc:`credentialstool </tutorial/encrypt-user-credentials>`.

   * - id
     - string
     - Required
     - Name that uniquely identifies this :opsmgr:`S3 Snapshot Store </reference/glossary/#std-term-S3-Snapshot-Store>`.

   * - labels
     - array of strings
     - Optional
     - Array of tags to manage which
       :term:`backup jobs <backup job>` |onprem| can assign to which
       :opsmgr:`S3 blockstores  </reference/glossary/#std-term-S3-Snapshot-Store>`.

       Setting these tags limits which backup jobs this |s3| blockstore
       can process. If omitted, this |s3| blockstore can only process
       backup jobs for projects that do not use labels to filter their
       jobs.

   * - loadFactor
     - number
     - Optional
     - Positive, non-zero integer that expresses how much backup work
       this :opsmgr:`snapshot store </reference/glossary/#std-term-snapshot-store>` performs compared to another
       snapshot store. This option is needed only if more than one
       snapshot store is in use.

       .. seealso::

          To learn more about :guilabel:`Load Factor`, see
          :doc:`Edit an Existing S3 Blockstore </tutorial/manage-s3-blockstore-storage>`

   * - pathStyleAccessEnabled
     - boolean
     - Required
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
     - Optional
     - Method used to authorize access to the |s3| bucket specified in
       **s3BucketName**.

       Accepted values for this option are: ``KEYS``, ``IAM_ROLE``.

       .. list-table::
          :widths: 20 80
          :stub-columns: 1

          * - ``KEYS`` or None
            - |mms| uses **awsAccessKey** and **awsSecretKey** to
              authorize access to |s3| bucket specified in
              **s3BucketName**.
          * - ``IAM_ROLE``
            - |mms| uses an |aws| |iam| role to authorize access to
              |s3| bucket specified in **s3BucketName**.
              **awsAccessKey** and **awsSecretKey** fields are
              ignored. To learn more, see the
              :aws:`AWS documentation </AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html#attach-iam-role>`

   * - s3BucketEndpoint
     - string
     - Required
     - |url| used to access this |aws| |s3| or |s3|\-compatible bucket.

   * - s3BucketName
     - string
     - Required
     - Name of the |s3| bucket that hosts the |s3| blockstore.

   * - s3MaxConnections
     - number
     - Required
     - Positive integer indicating the maximum number of connections
       to this |s3| blockstore.

   * - s3RegionOverride
     - string
     - Conditional
     - Region where your |s3| bucket resides.

       Use this field only if your |s3|\-compatible store's 
       **s3BucketEndpoint** doesn't support region scoping. Don't use 
       this field with |aws| |s3| buckets.

   * - sseEnabled
     - boolean
     - Required
     - Flag that indicates whether this |s3| blockstore enables
       :aws:`server-side encryption </AmazonS3/latest/dev/UsingServerSideEncryption.html>`.

   * - ssl
     - boolean
     - Optional
     - Flag that indicates whether this |s3| blockstore only accepts
       connections encrypted using |tls|.

   * - uri
     - string
     - Required
     - :manual:`Connection String </reference/connection-string/>`
       that connects to the metadata database for this |s3| blockstore.
       This database stores the locations of the blocks in the |aws|
       |s3| bucket.

   * - writeConcern
     - string
     - Optional
     - Write concern used for this blockstore.

       |onprem| accepts the following values:

       - ``ACKNOWLEDGED``
       - ``W2``
       - ``JOURNALED``
       - ``MAJORITY``

       .. seealso::

          To learn about write acknowledgement levels in MongoDB, see
          :manual:`Write Concern </reference/write-concern>`
