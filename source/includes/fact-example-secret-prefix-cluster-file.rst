.. example::

   If you call your deployment ``my-replica-set`` and you set the 
   prefix to ``mdb``, you must name the |tls| secret for the
   client |tls| communications ``mdb-my-replica-set-cert``. Also, 
   you must name the |tls| secret for internal cluster authentication 
   (if enabled) ``mdb-my-replica-set-clusterfile``.
