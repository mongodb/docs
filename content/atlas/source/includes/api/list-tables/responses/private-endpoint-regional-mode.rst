.. list-table::
  :header-rows: 1
  :stub-columns: 1
  :widths: 20 14 66

  * - Response Parameter
    - Type
    - Description

  * - enabled
    - boolean
    - Flag that indicates whether the regionalized private endpoint
      setting is enabled for one |service| project.

      If this value is **true**, you can create more than one private
      endpoint in a cloud provider region to connect to
      multi-region and global |service| sharded clusters.

      If this value is **false**, you can't create more than one private
      endpoint in one cloud provider region if you have a private
      endpoint in a different region.

      The default value is **false**.
