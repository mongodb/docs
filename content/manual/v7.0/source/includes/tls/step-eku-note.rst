.. note:: 

   If you want intra-cluster mTLS between
   nodes in your deployment, set ``extendedKeyUsage = serverAuth, clientAuth``
   in your CSR configuration file so that your nodes can authenticate
   as both TLS servers and clients.