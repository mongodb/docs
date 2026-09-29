|onprem| must authenticate to the backing
databases as a MongoDB user with appropriate access. The user must have
the following roles:

- :authrole:`readWriteAnyDatabase`

- :authrole:`dbAdminAnyDatabase`.

- :authrole:`clusterAdmin` if the database is a sharded cluster, otherwise
  :authrole:`clusterMonitor`
