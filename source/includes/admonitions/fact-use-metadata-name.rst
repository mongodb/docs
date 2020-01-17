.. admonition:: Use namespace and name of admin user secret
   :class: note

   This value must match the ``metadata.name`` specified in your admin 
   user |k8s| secret.

   If the secret is in a different |k8s-ns|, set this value to the 
   ``namespace`` and ``name`` of the secret using this format: 
   ``<namespace>/<name>``  