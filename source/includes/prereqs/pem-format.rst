.. important::

   The |k8s-op-short| uses :k8sdocs:`kubernetes.io/tls
   </concepts/configuration/secret/#tls-secrets>` secrets
   to store |tls| certificates and private keys for |onprem| and MongoDB
   resources. Starting in |k8s-op-short| version 1.17, the 
   |k8s-op-short| doesn't support concatenated |pem| files stored as    :k8sdocs:`Opaque secrets </concepts/configuration/secret/#opaque-secrets>`. 

   To migrate your |pem| files stored as Opaque secrets |tls| secrets to :k8sdocs:`kubernetes.io/tls 
   </concepts/configuration/secret/#tls-secrets>` secrets, see
   :ref:`migrate-to-new-tls-format`.

   .. include:: /includes/fact-broken-appdb.rst
