.. setting:: spec.security.tls.enabled

   *Type*: boolean

   *Default*: ``false``

   
   .. important::
   
      :setting:`spec.security.tls.enabled` is deprecated starting in |k8s-op-short| version 1.19. 
      To enable |tls|, provide a value for 
      the :setting:`spec.security.certsSecretPrefix` setting.
   
   Encrypts communications using TLS certificates between:
   
   - MongoDB hosts in a replica set or sharded cluster configuration
   - Clients (|mongo| shell, drivers, |compass|, and others)
     and the MongoDB deployment
   
   By default, :setting:`net.ssl.mode` is set to ``requireSSL``. To change the
   |tls| mode used for client and database connections, see
   :setting:`spec.additionalMongodConfig.net.ssl.mode`.
   

