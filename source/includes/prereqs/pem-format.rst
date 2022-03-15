.. important::

   For fresh |k8s-op-short| installations starting with version 1.13, 
   the |k8s-op-short| uses :k8sdocs:`kubernetes.io/tls
   </concepts/configuration/secret/#tls-secrets>` secrets
   to store |tls| certificates and private keys for |onprem| and MongoDB
   resources.

   Previous |k8s-op-short| versions required you to concatenate your
   |tls| certificates and private keys into a |pem| file and store this
   file in an
   :k8sdocs:`Opaque </concepts/configuration/secret/#opaque-secrets>` 
   secret. 

   To maintain backwards compatibility, the |k8s-op-short|
   continues to support storing |pem| files in Opaque secrets. Support
   of this feature might be removed in a future release.

   We recommend that you upgrade to |k8s-op-short| version 1.15.1 
   or later.

   .. include:: /includes/fact-broken-appdb.rst
