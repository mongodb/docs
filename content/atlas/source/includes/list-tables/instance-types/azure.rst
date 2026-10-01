.. list-table::
   :header-rows: 1
   :stub-columns: 1

   * - Cluster Tiers
     - Storage Range
     - Default Storage
     - Default RAM
     - Default vCPU

   * - M0
     - .5 GB
     - .5 GB
     - Shared
     - Shared

   * - Flex
     - 5 GB
     - 5 GB
     - Flex
     - Flex

   * - M10 :icon-fa5:`star`
     - 8 GB to 128 GB
     - 8 GB
     - 2 GB
     - 1

   * - M20 :icon-fa5:`star`
     - 8 GB to 256 GB
     - 16 GB
     - 4 GB
     - 1 or 2

   * - M30 :icon-fa5:`star`
     - 8 GB to 512 GB
     - 32 GB
     - 8 GB
     - 2

   * - M40 :icon-fa5:`star`
     - 8 GB to 1 TB
     - 64 GB
     - 16 GB
     - 4

   * - M40 Low-CPU :icon-fa5:`star`
     - 8 GB to 1 TB
     - 64 GB
     - 16 GB
     - 2

   * - M50 :icon-fa5:`star`
     - 8 GB to 4 TB
     - 128 GB
     - 32 GB
     - 8

   * - M50 Low-CPU :icon-fa5:`star`
     - 8 GB to 4 TB
     - 128 GB
     - 32 GB
     - 4

   * - M60 :icon-fa5:`star`
     - 8 GB to 4 TB
     - 128 GB
     - 64 GB
     - 16

   * - M60_NVME
     - 1600 GB
     - 1600 GB
     - 64 GB
     - 8

   * - M60 Low-CPU :icon-fa5:`star`
     - 8 GB to 4 TB
     - 128 GB
     - 64 GB
     - 8

   * - M80 :icon-fa5:`star`
     - 8 GB to 4 TB
     - 256 GB
     - 128 GB
     - 32

   * - M80 Low-CPU :icon-fa5:`star`
     - 8 GB to 4 TB
     - 256 GB
     - 128 GB
     - 16

   * - M80_NVME
     - 1600 GB
     - 1600 GB
     - 128 GB
     - 16

   * - M200 :icon-fa5:`star`
     - 8 GB to 4 TB
     - 256 GB
     - 256 GB
     - 64

   * - M200 Low-CPU :icon-fa5:`star`
     - 8 GB to 4 TB
     - 256 GB
     - 256 GB
     - 32

   * - M200_NVME
     - 3100 GB
     - 3100 GB
     - 256 GB
     - 32

   * - M300 Low-CPU :icon-fa4:`times-circle` :icon-fa5:`star`
     - 8 GB to 4 TB
     - 512 GB
     - 384 GB
     - 48

   * - M300_NVME
     - 3600 GB
     - 3600 GB
     - 384 GB
     - 48

   * - M400 Low-CPU :icon-fa5:`star`
     - 8 GB to 4 TB
     - 512 GB
     - 512 GB
     - 64

   * - M400_NVME
     - 4000 GB
     - 4000 GB
     - 512 GB
     - 64

   * - M600_NVME
     - 4000 GB
     - 4000 GB
     - 640 GB
     - 80

:icon-fa5:`star` Can use this tier for a multi-cloud cluster.

The ``M20`` tier includes 1 or 2 vCPUs depending on the |azure| virtual
machine series available in the region.

:icon-fa4:`times-circle` Not available in the following regions:

- **germanywestcentral**
- **switzerlandnorth**
- **switzerlandwest**
