To open a realm with Partition-Based Sync, call :js-sdk:`Realm.open() <classes/Realm-1.html#open>`. 
Pass in a :js-sdk:`Configuration <types/BaseConfiguration.html>`
object, which must include the ``sync`` property defining a 
:js-sdk:`SyncConfiguration <types/PartitionSyncConfiguration.html>` object. 
In the SyncConfiguration, you must include include ``user`` and ``partitionValue``.