The Oplog database only supports the ``SCRAM`` authentication mechanism.
You cannot enable other authentication mechanisms.

If you enable ``SCRAM`` authentication on the oplog database, you
must: 

- Create a MongoDB user resource to connect |onprem| to the oplog 
  database.
- Specify the :opsmgrkube:`~spec.backup.opLogStores.mongodbUserRef.name`
  of the user in the |onprem| resource definition.

.. note:: 

   If you deploy |onprem| 4.2 with ``SCRAM`` authentication enabled, you 
   must specify a MongoDB version earlier than than 4.0 in the oplog 
   :ref:`database resource definition <k8s-specification>`. 
