- The {+cluster+} is either :guilabel:`General` or :guilabel:`Low-CPU` class
- The {+cluster+} is single-region.
- Extended storage is available for ``M40`` tier and higher clusters with
  the following limitations:

  - ``M40``: up to 4TB
  - ``M50``/``M60``: up to 8TB
  - ``M80+``: up to 14TB

  To change your cluster's tier, see :ref:`Modify a Cluster <modify-cluster>`.

If you enable extended storage, this slows down initial syncs and cross-project
snapshot restores, and can reduce high availability. Enabling extended
storage is a temporary solution for {+clusters+} that might require additional
storage capacity in the future. We recommend that you enable :manual:`sharding </sharding>`
for long-term expanded storage capacity.