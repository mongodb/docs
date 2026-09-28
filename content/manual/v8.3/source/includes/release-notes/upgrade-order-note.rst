.. important::
   
   Upgrade all config server replica set (CSRS) instances
   first, followed by all shard members and, finally, the
   ``mongos`` instances. Upgrading ``mongos`` before completing
   these upgrades can result in compatibility issues.