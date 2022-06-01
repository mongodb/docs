.. list-table::
   :widths: 25 75
   :header-rows: 1

   * - Kubernetes Resources
     - Verbs

   * - Configmaps
     - Require the following permissions:
  
       - ``get``, ``list``, ``watch``. The |k8s-op-short| reads the organization
         and project data from the specified ``configmap``.
 
       - ``create``, ``update``. The |k8s-op-short| creates and updates ``configmap``
         objects for configuring the :ref:`appdb-om-arch` instances.
  
       - ``delete``. The |k8s-op-short| needs the ``delete`` ``configmap`` permission
         to support its :ref:`older versions <k8s-support-lifecycle>`.
         This permission will be deleted when older versions reach their
         End of Life Date.

   * - Secrets
     - Require the following permissions:
  
       - ``get``, ``list``, ``watch``. The |k8s-op-short| reads secret objects to
         retrieve sensitive data, such as :ref:`TLS <secure-tls>` or
         :ref:`X.509 <create-x509-certs>` access information. For example, it
         reads the credentials from a secret object to connect to the |onprem|.

       - ``create``, ``update``. The |k8s-op-short| creates secret
         objects holding :ref:`TLS <secure-tls>` or
         :ref:`X.509 <create-x509-certs>` access information.
    
       - ``delete``. The |k8s-op-short| deletes secret objects (containing passwords)
         related to the :ref:`appdb-om-arch`.
    
   * - Services
     - Require the following permissions:
   
       - ``get``, ``list``, ``watch``. The |k8s-op-short| reads and watches
         MongoDB services. For example, to communicate with the Ops Manager service,
         the |k8s-op-short| needs ``get``, ``list`` and ``watch``
         permissions to use the |onprem| service's URL.
 
       - ``create``, ``update``. To communicate with services, the |k8s-op-short|
         creates and updates service objects corresponding to |onprem|
         and MongoDB custom resources.
    
   * - StatefulSets
     - Require the following permissions:
  
       - ``get``, ``list``, ``watch``. The |k8s-op-short| reacts to the changes in the
         StatefulSets it creates for the MongoDB custom resources. It also reads
         the fields of  the StatefulSets it manages.

       - ``create``, ``update``. The |k8s-op-short| creates and updates StatefulSets
         corresponding to the mongoDB custom resources.
    
       - ``delete``. The |k8s-op-short| needs permissions to delete the StatefulSets
         when you delete the MongoDB custom resource.

   * - Pods
     - Require the following permissions:
  
       - ``get``, ``list``, ``watch``. The |k8s-op-short| queries the
         Application Database Pods to get information about its state.
  
   * - Namespaces
     - Require the following permissions:
  
       - ``list``, ``watch``. When you run the |k8s-op-short| in the cluster-wide mode,
         it needs ``list`` and ``watch`` permissions to all namespaces
         for the MongoDB custom resources.