.. _install-k8s-operator-oc:

.. note:: Use the same namespace throughout

   By default, the |k8s-op-short| deploys all resources in your |k8s|
   cluster to the |k8s-ns| ``mongodb``. You can deploy |k8s-op-short|
   resources to a different namespace by editing all values for
   ``metadata.namespace`` in ``mongodb-kubernetes-openshift.yaml``. You
   must also update the ``subjects[0].namespace`` value in every
   ``RoleBinding`` and ``ClusterRoleBinding`` in the same file. If you
   omit this value, the bindings look for the ``ServiceAccount`` in the
   default ``mongodb`` namespace and can't find it:

   .. code-block:: yaml
      :emphasize-lines: 6, 13, 21, 28

      ---
      apiVersion: v1
      kind: ServiceAccount
      metadata:
        name: mongodb-kubernetes-operator
        namespace: production

      ---
      apiVersion: rbac.authorization.k8s.io/v1
      kind: RoleBinding
      metadata:
        name: mongodb-kubernetes-operator
        namespace: production
      roleRef:
        apiGroup: rbac.authorization.k8s.io
        kind: Role
        name: mongodb-kubernetes-operator
      subjects:
        - kind: ServiceAccount
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
