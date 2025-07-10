Install `MongoDB Helm Charts for Kubernetes <https://mongodb.github.io/helm-charts>`__
and set the value of ``registry.pullPolicy`` to ``IfNotPresent``.
To learn about optional |k8s-op-short| installation settings, see
:ref:`Operator Helm Installation Settings <meko-op-install-settings-helm>`.

.. code-block:: sh

   helm install mongodb-kubernetes-operator mongodb/mongodb-kubernetes \
     --set registry.pullPolicy='IfNotPresent'