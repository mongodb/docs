Requires a Dedicated Bucket
~~~~~~~~~~~~~~~~~~~~~~~~~~~

|mms| must be the only manager on the |s3| bucket that you use for snapshots.
You also need to configure the |s3| bucket to avoid using features that
|mms| does not support.

When configuring the |s3| bucket:

- Do not create subfolders in the |s3| buckets that you use with |mms|.
  |mms| only supports using entire |s3| buckets.
- Configure |s3| bucket versioning based on your bucket type:

  - For standard |s3| snapshot stores, disable versioning. |mms|  
    does not support versioning for standard |s3| buckets used  
    for snapshots.

  - For object-lock enabled |s3| buckets, enable versioning.  
    Object-lock functionality requires versioning to be enabled.

- Do not create |s3| lifecycle rules. Lifecycle rules that expire or transition
  current versions of |mms| snapshot objects to archives results in incomplete snapshots
  that you can't use to restore the configuration.
