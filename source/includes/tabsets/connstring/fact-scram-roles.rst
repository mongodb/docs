.. admonition:: Necessary MongoDB Roles

   The MongoDB user that authenticates to the backing databases must
   have the following roles:

   - :authrole:`readWriteAnyDatabase`

   - :authrole:`dbAdminAnyDatabase`

   - :authrole:`clusterAdmin` if the database is a sharded
     cluster, otherwise :authrole:`clusterMonitor`
