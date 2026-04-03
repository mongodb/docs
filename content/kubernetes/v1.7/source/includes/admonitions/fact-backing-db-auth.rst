The Oplog database only supports the ``SCRAM`` authentication mechanism.
You cannot enable other authentication mechanisms.

If you enable ``SCRAM`` authentication on the oplog database, you
must: 

- Create a MongoDB user resource to connect |onprem| to the oplog 
  database.
- Specify the :opsmgrkube:`~spec.backup.opLogStores.mongodbUserRef.name`
  of the user in the |onprem| resource definition.
