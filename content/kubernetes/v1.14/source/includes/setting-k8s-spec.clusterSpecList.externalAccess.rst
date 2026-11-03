
``externalAccess``
  *Type*: collection

  Specification to expose your |multi-cluster| for external connections. 
  To learn how to connect to your |multi-cluster| from outside 
  of the |k8s| cluster, see :ref:`multi-cluster-connect-from-outside-k8s`.
  
  These settings apply to services across all clusters. 
  To override these global settings in a specific cluster, use 
  :ref:`spec.clusterSpecList.externalAccess.externalService 
  <multi-spec-clusterspeclist-externalservice>`.
  
  .. include:: /includes/facts/fact-external-access-spec.rst

  .. note:: 

     If you set :ref:`spec.clusterSpecList.externalAccess.externalDomain <multi-spec-clusterspeclist-externaldomain>`,
     the external service adds another port (``Port Number + 1``) for backups.