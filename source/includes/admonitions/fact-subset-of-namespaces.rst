Watching a subset of namespaces is useful in deployments where a single
|k8s-op-short| instance watches a different cluster resource type.
For example, you can configure the |k8s-op-short| to watch |k8s-mdbrscs|
in one subset of namespaces, and to watch |mongodb-multis| in another
subset of namespaces. To avoid race conditions during resource reconciliation,
for each custom resource type that you want the |k8s-op-short| to watch,
ensure that you set scope to a distinct subset of namespaces.