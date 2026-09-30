Atlas deployments use cluster-tier default values that you cannot
change, as shown in the following table:

.. list-table:: Atlas Tier Defaults for maxIndexBuildMemoryUsageMegabytes
   :widths: 30 30 40
   :header-rows: 1

   * - **Instance RAM**
     - **Comparable Tier**
     - **maxIndexBuildMemoryUsageMegabytes Default**
   * - 256GB+
     - M200+
     - 2048 MB
   * - 128GB - 256GB
     - M80-M140
     - 1024 MB
   * - 32GB - 128GB
     - M50-M60
     - 512 MB
   * - 16GB
     - M40
     - 400 MB
   * - 8GB
     - M30
     - 250 MB
   * - 2GB - 4GB
     - M10-M20
     - 100 MB
