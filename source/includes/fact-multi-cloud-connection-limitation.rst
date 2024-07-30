If you're connecting to replica sets hosted in a multi-cloud {+deployment+} 
through a :ref:`private connection <conn-string-options>`, you can access 
only the nodes in the same cloud provider and the same region that you're connecting 
from. This cloud provider might not have the :term:`primary` node in its region. 
When this happens, you must specify the :manual:`secondary read preference </core/read-preference/>` 
mode in the connection string to access the {+deployment+}. If you need access 
to all nodes for your multi-cloud {+deployment+} from your current provider through 
a private connection, you must:

- Configure a VPN in the current provider to each of the remaining 
  providers.
- Configure a :ref:`private endpoint <private-endpoint>` to |service| 
  for each of the remaining providers.

As an alternative, we suggest creating sharded clusters for multi-cloud {+deployment+}s accessed 
through a :ref:`private endpoint <private-endpoint>`. When you deploy a sharded 
cluster, whether single shard or multiple shards, you can connect to the cluster 
through the local private endpoints and perform read and write operations. You are not required 
to specify the secondary read preference mode, even if the cluster primary node(s) are located 
in a different region. The ``mongos`` in the cloud provider region you connect to will route the 
request to the primary node in a different region if needed. To learn more, see 
:ref:`deploying a sharded cluster <create-cluster-sharding>`. 
