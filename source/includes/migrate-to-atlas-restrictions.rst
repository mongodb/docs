- You cannot select an ``M0`` free cluster or ``M2/M5`` shared cluster
  as the source or target for Live Migration. To migrate data from
  an ``M0`` free cluster or ``M2/M5`` shared cluster to a paid cluster,
  see :atlas:`Modify a Cluster </scale-cluster>`.

- Live Migration does not support :atlas:`VPC peering </security-vpc-peering>`
  or :atlas:`private endpoints </security-private-endpoint>` for either
  the source or target cluster.