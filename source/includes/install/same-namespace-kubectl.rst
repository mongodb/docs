.. _install-k8s-operator-kubectl:

.. note:: Use the same namespace throughout

   By default, the |k8s-op-short| deploys all resources in your |k8s| cluster 
   to the |k8s-ns| ``mongodb``. You can deploy |k8s-op-short| resources 
   to a different namespace by editing all values for
   ``metadata.namespace`` in ``mongodb-enterprise.yaml``:

   .. code-block:: yaml
      :emphasize-lines: 8, 16

      ##---
      # Source: mongodb-enterprise-operator/templates/serviceaccount.yaml
      ---
      apiVersion: v1
      kind: ServiceAccount
      metadata:
        name: mongodb-enterprise-operator
        namespace: production
      ##---
      # Source: mongodb-enterprise-operator/templates/operator.yaml
      ---
      apiVersion: apps/v1
      kind: Deployment
      metadata:
        name: mongodb-enterprise-operator
        namespace: production

      ---
      # Example truncated
      ---
      ...
