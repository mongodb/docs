Requires a Dedicated Bucket
~~~~~~~~~~~~~~~~~~~~~~~~~~~

|mms| must be the only manager on the |s3| bucket that you use for snapshots.
You also need to configure the |s3| bucket to avoid using features that
|mms| does not support.

When configuring the |s3| bucket:

- Do not create subfolders in the |s3| buckets that you use with |mms|.
  |mms| only supports using entire |s3| buckets.
- Disable AWS |s3| bucket versioning. Versioning is not supported in |mms| for
  the |s3| buckets used for snapshots.
- Do not create AWS |s3| lifecycle rules. Lifecycle rules that expire or transition
  current versions of |mms| snapshot objects to archives results in incomplete snapshots
  that you can't use to restore the configuration.

 