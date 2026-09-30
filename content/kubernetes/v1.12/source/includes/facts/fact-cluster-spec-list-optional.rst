- When you set :opsmgrkube:`spec.topology` to ``MultiCluster``, you must
  specify the value for :opsmgrkube:`spec.clusterSpecList.members`. All
  other parameters under :opsmgrkube:`spec.clusterSpecList` are optional.

- When you set :opsmgrkube:`spec.topology` to ``SingleCluster``,
  the |k8s-op-short| ignores all parameters under :opsmgrkube:`spec.clusterSpecList`.
