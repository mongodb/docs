Install `MongoDB Helm Charts for Kubernetes <https://mongodb.github.io/helm-charts>`__:

.. code-block:: sh

   helm install enterprise-operator mongodb/enterprise-operator \
     --set registry.pullPolicy='IfNotPresent' \
     --set registry.imagePullSecrets='<openshift-pull-secret>' \
     --values https://raw.githubusercontent.com/mongodb/helm-charts/main/charts/enterprise-operator/values-openshift.yaml

Use the `values-openshift.yaml <https://raw.githubusercontent.com/mongodb/helm-charts/main/charts/enterprise-operator/values-openshift.yaml>`__
settings, ``registry.pullPolicy=IfNotPresent``, and
``registry.imagePullSecrets=<openshift-pull-secret>``. To learn
about optional |k8s-op-short| installation settings, see
:ref:`Operator Helm Installation Settings <meko-op-install-settings-helm>`.