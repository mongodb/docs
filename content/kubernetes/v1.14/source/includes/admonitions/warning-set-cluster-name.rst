.. warning::

   You must set :setting:`spec.clusterDomain` if your |k8s| cluster has
   a :k8sdocs:`default domain
   </concepts/services-networking/dns-pod-service#what-things-get-dns-names>`
   other than the default ``cluster.local``. If you neither use the
   default nor set the :setting:`spec.clusterDomain` option, the
   |k8s-op-short| might not function as expected. 
