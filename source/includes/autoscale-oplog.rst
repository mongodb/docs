When you increase the storage capacity of a cluster, |service|
increases the cluster's :term:`oplog` size. |service| scales the
oplog to 5% of the cluster capacity, not to exceed 50 GB.
:ref:`NVMe storage <nvme-storage>` requires an oplog which is 10% of
the storage capacity. |service| doesn't change the oplog size if it
exceeds 5% of the new storage capacity (10% in the case of NVMe
storage).

As cluster storage capacity decreases, |service| doesn't change the
oplog size unless it exceeds a certain maximum determined according
to MongoDB best practices.
