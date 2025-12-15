
Before you begin |operation| your collection, ensure that you meet the
following requirements:

- .. include:: /includes/resharding-time-reqs.rst

- Your database meets these resource requirements:

  - .. include:: /includes/reshard-storage-space.rst
  - .. include:: /includes/resharding-mc-io.rst
  - .. include:: /includes/resharding-mc-cpu.rst

  .. include:: /includes/resharding-mc-important.rst

- No index builds are in progress. To check for running index builds, 
  use ``$currentOp``:

  .. code-block:: javascript
     
     db.getSiblingDB("admin").aggregate( [
        { $currentOp : { idleConnections: true } },
        { $match: {
              $or: [
                  { "op": "command", "command.createIndexes": { $exists: true } },
                  { "op": "none", "msg": /^Index Build/ }
              ]
           }
        }
     ] )

  In the result document, if the ``inprog`` field value is an empty
  array, there are no index builds in progress:

  .. code-block:: javascript
     :copyable: false

     {
        inprog: [],
        ok: 1,
        '$clusterTime': { ... },
        operationTime: <timestamp>
     }

