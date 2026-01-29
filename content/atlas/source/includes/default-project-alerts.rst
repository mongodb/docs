|service| provides the following default alerts and alert values for a new
project:

- :alert:`Cluster is missing an active mongos`
- :alert:`Connections % of configured limit is`, ``above 80``
- :alert:`Credit card is about to expire`
- :alert:`Disk space % used on Data Partition is`, ``above 90`` 
- :alert:`Host has index suggestions`
- :alert:`Query Targeting: Scanned Objects / Returned`, ``above 1000``
     
  .. note::

     The default configuration sends an alert only if the 
     ratio of documents scanned to documents returned meets or 
     exceeds the specified threshold for at least 10 minutes.

- :alert:`Replica set has no primary`
- :alert:`Replication Oplog Window is`, ``below 1 hours``
- :alert:`System: CPU (User) % is`, ``above 95``
- :alert:`Total Namespaces is`, ``above 10000``
- :alert:`User joined the project`

|service| provides the following default alert for projects
using :ref:`security-aws-kms`:

- :alert:`AWS encryption key elapsed time since last rotation is above 90 days <AWS encryption key elapsed time since last rotation is above (n) days>`

|service| provides the following default |fts| alerts:

- :alert:`Atlas Search: Max Number of Fields Indexed is`   
- :alert:`Atlas Search: Max Number of nGram Fields Indexed is`
- :alert:`Atlas Search: Max Number of Lucene Docs is <Atlas Search: Max Number of Lucene Docs is>`
- :alert:`Insufficient disk space to support rebuilding search indexes <Insufficient disk space to support rebuilding search indexes>`
- :alert:`Atlas Search: Mongot stopped replication <Atlas Search: Mongot stopped replication>`
- :alert:`Search Process: Ran out of memory <Search Process: Ran out of memory>`
- - :alert:`Atlas Search: Mongot paused initial sync <Atlas Search: Mongot paused initial sync>`

For a full list of |fts| alerts, see :ref:`Alert Conditions for {+fts+} <alert-conditions-atlas-search>`.

{+service+} provides the following default {+atlas-sp+} alerts:

- :alert:`Stream Processor State is failed <Stream Processor State is failed>`

|service| provides default alerts for projects with clusters that experience 
auto-scaling events. To learn more about all auto-scaling alert events, see 
:ref:`Auto-scaling <alert-conditions-autoscaling>`.