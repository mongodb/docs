In MongoDB 4.2+, you cannot use :doc:`file system snapshots
</tutorial/backup-with-filesystem-snapshots>` for backups that involve
transactions across shards because those backups do not maintain
atomicity. Instead, use one of the following to perform the backups:

- `MongoDB Atlas <https://docs.atlas.mongodb.com/>`_,

- `MongoDB Cloud Manager <https://docs.cloudmanager.mongodb.com/>`_, or
   
- `MongoDB Ops Manager <https://docs.opsmanager.mongodb.com/>`_.
