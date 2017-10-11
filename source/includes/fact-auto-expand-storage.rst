- :guilabel:`Auto-Expand Storage`: When disk usage reaches 90%,
  automatically increase storage. For AWS and GCP, increase
  storage by an amount necessary to achieve 70% utilization.
  For Azure, scale the cluster to the next available size. This
  option is available only for ``M10`` and larger clusters.

  .. note::

     If the size of the cluster :term:`oplog` is small, |service|
     may be unable to automatically expand disk capacity.