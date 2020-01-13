.. admonition:: Data Transfer Costs Might Increase 
   :class: important

   With :doc:`Continuous Backups </backup/continuous-backups>` enabled, 
   your data transfer costs might increase when you upgrade |service| 
   clusters from MongoDB 4.0 to 4.2. The continuous backup service 
   that facilitates snapshot creation sends more data over the wire on
   4.2.

   Consider switching to :doc:`/backup/cloud-provider-snapshots` if you
   notice a large increase in data transfer after you upgrade your 
   |service| clusters. Backing up clusters using Cloud Provider 
   Snapshots sends much less data over the wire.