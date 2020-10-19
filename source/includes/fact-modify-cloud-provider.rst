You can only modify the cloud provider backing your cluster when you
upgrade from an |service| ``M0`` Free Tier or ``M2/M5`` Shared Tier
cluster to a larger cluster. Transitioning to a different provider
changes your cluster connection string. Consider scheduling a
maintenance window to update your applications with the new connection
string to resume connectivity to the cluster. |service| migrates data
to the new cluster.
