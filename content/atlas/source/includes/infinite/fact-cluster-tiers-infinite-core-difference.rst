On {+atlas-core-cluster+}s, the cluster tier sets the RAM, vCPUs, |iops|
and storage for each :term:`data-bearing node` in the cluster. Depending
on your cluster tier and cloud provider, you can customize storage
capacity and |iops| beyond the defaults for your cluster tier. To learn
more, see :ref:`create-cluster-storage`.

On {+atlas-infinite-cluster+}s, the cluster tier sets the RAM and vCPUs
for each :term:`compute node <compute node>` in the cluster. The tier
also fixes the storage |iops| and storage throughput values. Storage
scales independently of the cluster tier, and these values don't change
as storage scales. To review the values for each tier, see
:ref:`atlas-infinite-storage-iops-throughput-values`. To learn more
about storage, see :ref:`atlas-infinite-storage`.