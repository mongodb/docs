- Check the following documents for any considerations or compatibility issues
  before changing a deployment's MongoDB version:

  - :manual:`The MongoDB Release Notes </release-notes>`

  - The documentation for your driver.

  - :doc:`/reference/mongodb-compatibility`

- Plan the version change during a predefined maintenance window.

- Change the MongoDB version on a staging environment before changing a
  production environment. Your staging environment should mirror your
  production environment. This can help avoid compatibility issues that may
  result in downtime for your production deployment.

- Upgrade :term:`replica sets <replica set>` in this order:

  1. Upgrade each :term:`secondary` one at a time.
  2. Upgrade the :term:`primary`.

  If you try to upgrade the processes in a different order, the
  upgrade may fail.
  
- Upgrade :term:`sharded clusters <sharded cluster>` in this order:

  1. Upgrade the :term:`config servers <config server>` replica set.
  2. Upgrade each the :term:`replica set` for each shard.
  3. Upgrade each :program:`mongos` process.

  If you try to upgrade the processes in a different order, the
  upgrade may fail.
  
  .. example::
     If you upgrade your ``mongos`` processes to 3.4 before upgrading the
     :term:`config servers <config server>`, a :term:`sharded cluster` upgrade
     fails. The ``mongos`` running 3.4 cannot interact with config servers
     running 3.2.

- Perform any *downgrades* in *two* stages if your MongoDB configuration file
  includes options incompatible with the earlier MongoDB version:

  1. Remove the configuration settings specific to the newer MongoDB
     version. Deploy those changes.

     .. example:: 
        If you are running MongoDB version 3.0 with the :guilabel:`engine`
        option set to ``mmapv1``, and want to downgrade to MongoDB 2.6, you
        must first remove the :guilabel:`engine` option. MongoDB 2.6 does not
        support that option.

  2. Update the MongoDB version. Deploy that change.

  .. note::

     You may not downgrade a MongoDB deployment from version 3.4 to any
     version before 3.2.8. |mms| blocks users attempts to downgrade from
     ``featureCompatibilityVersion=3.4`` to
     ``featureCompatiblityVersion=3.2``.
