|service| enforces the following minimum ratios for given cluster tiers. This keeps cluster performance consistent with large datasets.

.. list-table::
   :header-rows: 1
   :widths: 30 70

   * - Tier
     - Ratio of Disk Capacity : System Memory

   * - ``M10`` - ``M40``
     - 60:1
   * - => ``M50``
     - 120:1

.. example::

   To support 3 TB (or 3,072 GB) of disk capacity, select a cluster
   tier with a minimum of 32 GB of RAM. This would be ``M50`` or greater.




