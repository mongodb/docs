.. setting:: spec.configSrv.additionalMongodConfig

   *Type*: collection

   Additional :opsmgr:`configuration options
   </reference/deployment-advanced-options/>` with
   which you want to start each :term:`config server` member.
   
   The |k8s-op-short| supports all configuration options that the MongoDB
   version you deploy through the {+mdbagent+} supports, except that the 
   |k8s-op-short| overrides values that you provide for any of the 
   following options:
   
   - :setting:`net.tls.certificateKeyFile`
   - :setting:`net.tls.clusterFile`
   - ``net.tls.PEMKeyFile``
   - :setting:`replication.replSetName`
   - :setting:`security.clusterAuthMode`
   - :setting:`sharding.clusterRole`
   - :setting:`storage.dbPath`
   - :setting:`systemLog.destination`
   - :setting:`systemLog.path`
   
   To learn more about the configuration options that the |k8s-op-short|
   owns, see :ref:`k8s-exclusive-settings`.
   
   To learn which configuration options you can use, see
   :opsmgr:`Advanced Options for MongoDB Deployments
   </reference/deployment-advanced-options/>` in the |onprem| 
   documentation.

