Make sure to set the |k8s-sc| ``reclaimPolicy`` to
`Retain <https://kubernetes.io/docs/concepts/storage/persistent-volumes/#retain>`__.
This ensures that data is retained when a |k8s-pvc| is removed.
