.. _install-k8s-operator-oc:

.. note:: Use the same namespace throughout

   By default, the |k8s-op-short| deploys all resources in your |k8s| cluster 
   to the |k8s-ns| ``mongodb``. You can deploy |k8s-op-short| resources 
   to a different namespace by editing all values for
   ``metadata.namespace`` in ``mongodb-kubernetes-openshift.yaml``:

   .. code-block:: yaml
      :emphasize-lines: 6, 13

      ---
      apiVersion: v1
      kind: ServiceAccount
      metadata:
        name: mongodb-kubernetes-operator
        namespace: production

      ---
      apiVersion: apps/v1
      kind: Deployment
      metadata:
        name: mongodb-kubernetes-operator
        namespace: production

      ---
      # Example truncated
      ---
      ...
