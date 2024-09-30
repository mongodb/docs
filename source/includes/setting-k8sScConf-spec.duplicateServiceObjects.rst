.. setting:: spec.duplicateServiceObjects

   *Type*: boolean
   
   *Optional*
   
   *Default*: ``true``

   Ignored if topology is not ``MultiCluster``. Applies to services for the all 
   sharded cluster components: ``mongos``, ``configSrv`` and ``shards``.
   
   If set to ``true``:
     The |k8s-op-short| creates all ``Pod Services`` from all member clusters in 
     each member cluster.

   If set to ``false``:
     The |k8s-op-short| creates only 

