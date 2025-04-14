If you set the ``enforceUserClusterSeparation`` parameter to ``false``,
the server doesn't distinguish between client certificates, which
applications use to authenticate, and intra-cluster certificates, which
have privileged access. This has no effect if your ``clusterAuthMode``
is ``keyFile``. However, if your ``clusterAuthMode`` is ``x509``, user
certificates that use the allowed scheme are conflated with cluster
certificates and granted privileged access. 
   
Your existing certificates are granted internal privileges if you do the
following:  
      
1. Create a user, with a name allowed by this parameter.
#. Set the ``enforceUserClusterSeparation`` parameter to ``false``.
#. Set ``clusterAuthMode`` to ``x509``.
   
You must not upgrade from ``keyFile`` to ``x509`` without validating
that you've removed users with elevated privileges that the
``enforceUserClusterSeparation`` flag allowed you to create. 