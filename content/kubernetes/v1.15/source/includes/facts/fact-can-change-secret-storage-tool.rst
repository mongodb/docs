.. note::

   To avoid storing secrets in single-cluster |k8s| deployments, you can
   migrate all |k8s-secrets| to a :ref:`secret storage tool <k8s-set-secret-storage-tool>`.
   Deployments on multiple |k8s| clusters don't support storing secrets
   in secret storage tools, such as |hashicorp-vault|.
