Time, in seconds, the |k8s-op-short| attempts to connect to a cluster's `Kubernetes API server <https://kubernetes.io/docs/concepts/overview/components/#kube-apiserver>`__ endpoint. This timeout is set for all |k8s| clusters in |multi-clusters|. If
the |k8s-op-short| doesn't get a response from the |k8s| API server within the specified time, it logs the cluster's status as "unhealthy". To learn more, see `Troubleshooting Kubernetes Clusters <https://kubernetes.io/docs/tasks/debug/debug-cluster/>`__.

The default value is **10**.