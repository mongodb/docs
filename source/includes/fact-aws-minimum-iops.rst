|service| enforces the following minimum ratios  by cluster tier
to facilitate consistent network performance with large datasets.

Disk Capacity to RAM:

* ``-M40``: 3:1
* ``M40+``: 50:1
* ``M50+``: 100 to 1 

For example, a cluster with 50 GB storage requires a value for IOPS of at least 150.
To support 3 TB of disk capacity, you must select a cluster tier with at least 32 GB
of RAM (M50 or higher).