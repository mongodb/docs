.. list-table::
   :header-rows: 1
   :widths: 20 80

   * - Field
     - Description

   * - ``_id``
     - Name of the shard.

   * - ``host``
     - Hostname of the shard. If the shard is a replica set,
       ``host`` lists the hostname of each mongod instance in the
       replica set.

   * - ``draining``
     - If true, indicates that :ref:`sharding-remove-shard`
       has been called for this shard and it is in the process of
       being drained.

   * - ``tags``
     - List of :term:`zones <zone>` to which the shard belongs.

   * - ``state``
     - Internal field used during the 
       :ref:`sharding-add-shard` sequence to ensure that all
       steps and configuration necessary to add the shard to the
       cluster are completed.