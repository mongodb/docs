Always use the :ref:`Atlas-provided connection string
<atlas-connection-string>` and rely on :ref:`driver discovery
<connections-dns-seedlist>` when you build a well-architected
application. Don't hard-code node hostnames. To learn more, see
:ref:`arch-center-network-security`.

On {+atlas-infinite-cluster+}s, the cluster nodes and their hostnames
aren't guaranteed to stay the same. Node hostnames can change before
and after routine events, such as :ref:`cluster maintenance
<configure-maintenance-window>`, :ref:`manual cluster tier changes
<atlas-infinite-modify-cluster>`, and :ref:`cluster tier auto-scaling
<cluster-autoscaling-compute-infinite>`.
