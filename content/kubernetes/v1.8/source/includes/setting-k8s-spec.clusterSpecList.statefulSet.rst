.. _spec-clusterspeclist-statefulset:

``statefulSet``
  *Type*: collection

  Provides the configuration for the |k8s-statefulset| override for each of
  the cluster's StatefulSets in a |multi-cluster|. To set the global configuration that
  applies to all clusters in your |multi-cluster|, see :ref:`spec.statefulSet.spec <multi-spec-statefulset-spec>`.

  This setting applies only to replica set resource types in |multi-clusters|.
