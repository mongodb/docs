.. warning::

   You must set :setting:`spec.clusterName` if your |k8s| cluster has a
   :k8sdocs:`default domain </concepts/services-networking/dns-pod-service#what-things-get-dns-names>`
   different from default ``cluster.local``. If you neither use the
   default nor set this option, the |k8s-op-short| may not function as
   expected.
