- :guilabel:`Auto-Expand Storage`: Available on clusters of size M10
  and larger. When disk usage reaches 90%,
  automatically increase storage by an amount necessary to achieve 70%
  utilization. To enable this feature, check the box marked
  :guilabel:`Auto-expand storage when disk usage reaches 90%`.
  
  Changes to storage capacity affect :ref:`cost <instance-size-costs>`.

  Contact |service| support for guidance on oplog sizing for clusters
  with automatic storage expansion enabled. For details on how
  |service| handles reaching database storage limits, refer to the
  :ref:`FAQ page <faq-storage limit>`.

  .. note::

     AWS clusters with local :ref:`NVMe SSDs <nvme-storage>` cannot
     expand incrementally. When disk usage reaches 90%, NVMe clusters
     scale to the next available cluster tier, if any.

     .. include:: /includes/fact-nvme-fcbis.rst
