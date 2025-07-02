|service| enforces the following minimum ratios for given cluster
tiers. This keeps cluster performance consistent with large datasets.

Instance sizes **M10** to **M40** have a ratio of disk capacity to
system memory of 60:1. Instance sizes greater than **M40** have a ratio
of 120:1.

.. example::

   To support 3 TB (or 3,072 GB) of disk capacity, select a cluster
   tier with a minimum of 32 GB of RAM. This would be **M50** or
   greater.
