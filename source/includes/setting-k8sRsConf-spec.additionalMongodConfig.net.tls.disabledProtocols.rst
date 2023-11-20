.. setting:: spec.additionalMongodConfig.net.tls.disabledProtocols

   *Type*: string

   *New in MongoDB version 4.2.*
   
   Prevents a MongoDB server running with |tls| from accepting incoming connections 
   that use a specific protocol or protocols. To specify multiple protocols, enter 
   a comma separated list of protocols. For example, ``TLS1_0,TLS1_1``.
   
   This setting recognizes the following protocols: ``TLS1_0``, ``TLS1_1``, ``TLS1_2``, 
   and starting in MongoDB 4.0.4 (and 3.6.9), ``TLS1_3``. If you specify an unrecognized protocol, the 
   server won't start.
   
   On macOS, you can't disable ``TLS1_1`` and enable both ``TLS1_0`` and ``TLS1_2``. 
   You must disable at least ``TLS1_0`` or ``TLS1_2`` also. For example, ``TLS1_0,TLS1_1`` 
   disables ``TLS1_2`` on macOS. 
   
   The list of protocols that you disable replaces the default list of disabled protocols.
   
   Starting in MongoDB version 4.0, MongoDB disables the use of |tls| 1.0 if |tls| 1.1+ 
   is available on the system. To enable the disabled |tls| 1.0, specify ``none`` as the value for  
   :setting:`spec.additionalMongodConfig.net.tls.disabledProtocols`. 
   To learn more about this setting, see :manual:`Disable TLS 1.0 </release-notes/4.0/#disable-tls-1.0>`.
   
   Members of replica sets and sharded clusters must speak at least one protocol in common.
   

