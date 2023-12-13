Install `MongoDB Helm Charts for Kubernetes <https://mongodb.github.io/helm-charts>`__.
The following command installs the |k8s-crds| and the |k8s-op-short|
in the current namespace named ``default``. By default, the
|k8s-op-short| uses the ``default`` namespace.

.. code-block:: sh

   helm install enterprise-operator mongodb/enterprise-operator

The following command installs the |k8s-op-short|  in the ``mongodb``
namespace with the optional ``--create-namespace`` option.

.. code-block:: sh

   helm install enterprise-operator mongodb/enterprise-operator \
     --namespace mongodb \
     --create-namespace

To learn about optional |k8s-op-short| installation settings, see
:ref:`Operator Helm Installation Settings <meko-op-install-settings-helm>`.