You can use |k8s-annotations| to specify 
placeholder values for external services used by
|k8s-op-short| deployments. The |k8s-op-short| automatically 
replaces these values with the correct values as described in 
the following table. Using placeholders allows you to provide specific 
annotations in each service for a specific Pod.

.. list-table::
   :header-rows: 1
   :widths: 20 80

   * - Value
     - Description

   * - ``{resourceName}``
     - Equal to :setting:`metadata.name`.

   * - ``{namespace}``
     - Equal to :setting:`metadata.namespace`.

   * - ``{podIndex}``
     - Index of the Pod assigned by the |k8s-statefulset| and 
       targeted by the current external service.

   * - ``{podName}``
     - Equal to ``{resourceName}-{clusterIndex}-{podIndex}``.
    
   * - ``{clusterName}``
     - The current cluster name set in 
       :ref:`spec.clusterSpecList.clusterName 
       <multi-spec-agent-clusterspeclist-clustername>`.

   * - ``{clusterIndex}``
     - The index initially assigned by the |k8s-op-short|
       for the current cluster name set in 
       :ref:`spec.clusterSpecList.clusterName 
       <multi-spec-agent-clusterspeclist-clustername>`.

       .. note:: 
       
          This value might not reflect the order of the member clusters 
          defined in :ref:`spec.clusterSpecList <multi-spec-clusterspeclist>`. 
          Although you can change the order of
          member clusters in :ref:`spec.clusterSpecList <multi-spec-clusterspeclist>`, 
          the |k8s-op-short| still uses the index that it initially assigned 
          for the current cluster name.

   * - ``{statefulSetName}``
     - The |k8s-statefulset|. Equal to ``{resourceName}-{clusterIndex}``.

   * - ``{externalServiceName}``
     - Generated name of the external service, based on the placeholder values that you specified.
       Equal to ``{resourceName}-{clusterIndex}-{podIndex}-svc-external``.

   * - ``{mongodProcessDomain}``
     - The domain name of the server that is hosting the mongod process.
       Equal to :ref:`spec.externalAccess.externalDomain
       <multi-spec-clusterspeclist-externaldomain>` if specified.
       Otherwise, equal to the domain used for the |mongod| process |fqdn|.

       For example, for the process hostname ``mdb-rs-1.example.com``, 
       ``example.com`` is the domain name.

   * - ``{mongodProcessFQDN}``
     - The |mongod| process hostname set in 
       the :opsmgr:`automation configuration </reference/cluster-configuration>`.
       
       The process hostname depends on your deployment configuration.
       If you've configured your |multi-cluster| to use :ref:`external domains
       <multi-spec-clusterspeclist-externaldomain>`, 
       such as for a deployment without service mesh, 
       the process hostname uses the following format:

       ``{resourceName}-{clusterIndex}-{podIndex}.{mongodProcessDomain}``

       For example:
       ``mdb-rs-0-1.example.com``
       
       If your deployment doesn't use external 
       domains, the process hostname uses the following format:

       ``{resourceName}-{clusterIndex}-{podIndex}-svc.{namespace}.svc.cluster.local``

       For example: 
       ``mdb-rs-1-svc.ns.svc.cluster.local``

.. note::

   You must use only known placeholder values as specified in the table 
   and ensure that your placeholders don't use empty or null values. Otherwise, 
   |k8s-op-short| returns an error. For example, you might
   encounter the following error message:
   
   .. code::
        
      error replacing placeholders in map with key=external-dns.alpha.kubernetes.io/hostname, value={resourceName}-{podIndex}-{unknownPlaceholder}.{clusterName}-{clusterIndex}.example.com: missing values for the following placeholders: {clusterName}, {clusterIndex}, {unknownPlaceholder}``
