.. setting:: spec.security.certsSecretPrefix

   *Type*: string

   
   Text to prefix to the |k8s| |k8s-secrets| that you
   created that contain your replica set's or sharded cluster's |tls| 
   keys and certificates.
   
   .. include:: /includes/fact-req-secret-prefix.rst
   
   .. include:: /includes/fact-example-secret-prefix-cluster-file.rst
   
   To learn more about naming the secrets that contain your |tls| 
   certificates, see the topic in :ref:`secure-tls` that applies to your 
   deployment.
   

