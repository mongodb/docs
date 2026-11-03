.. setting:: spec.mongos.clusterSpecList

   .. include:: /includes/admonitions/note-mcsc-fields-public-preview.rst

   *Type*: array of objects

   *Required* if ``topology=MultiCluster``
   
   An array of objects for use in multi-cluster sharded cluster deployments 
   with the following top-level fields:

   .. include:: /includes/setting-k8s-spec.clusterSpecList.clusterName.rst

   .. include:: /includes/setting-k8s-spec.clusterSpecList.externalAccess.rst

   .. include:: /includes/setting-k8s-spec.clusterSpecList.members.rst
   
   .. include:: /includes/setting-k8s-spec.clusterSpecList.memberConfig.rst

   .. include:: /includes/setting-k8s-spec.clusterSpecList.statefulSet.rst
