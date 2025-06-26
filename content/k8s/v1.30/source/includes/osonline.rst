Install `MongoDB Helm Charts for Kubernetes <https://mongodb.github.io/helm-charts>`__:

.. code-block:: sh

   helm install enterprise-operator mongodb/enterprise-operator \
     --values https://raw.githubusercontent.com/mongodb/helm-charts/main/charts/enterprise-operator/values-openshift.yaml

Use the `values-openshift.yaml <https://raw.githubusercontent.com/mongodb/helm-charts/main/charts/enterprise-operator/values-openshift.yaml>`__
settings. To learn about optional |k8s-op-short| installation settings,
see :ref:`Operator Helm Installation Settings <meko-op-install-settings-helm>`.