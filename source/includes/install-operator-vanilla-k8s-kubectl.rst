.. _install-k8s-operator-kubectl:

.. admonition:: Use the same namespace throughout
   :class: note

   The following examples assume that you created a |k8s-ns|
   using the default |k8s-op-short| namespace of ``mongodb``.
   If you specified a different label for your namespace when
   you :ref:`created it <k8s-prerequisites>`, change all
   values for ``metadata.namespace`` to that namespace.

   To change the label for the namespace for the following
   deployment to ``production``, edit all values for
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

1. Change to the directory in which you cloned the repository.

#. Install the |k8s-crds| for MongoDB deployments using the
   following |kubectl| command:

   .. code-block:: sh

      kubectl apply -f crds.yaml

#. You can edit the Operator |yaml| file to further customize
   your Operator before installing it.

   a. Open your ``mongodb-enterprise.yaml`` in your preferred
      text editor.

   #. You may need to add one or more of the following
      options:

      .. include:: /includes/list-tables/k8s-kubectl-install-options.rst

#. Install the |k8s-op-short| using the following
   |kubectl| command:

   .. code-block:: sh

      kubectl apply -f mongodb-enterprise.yaml
