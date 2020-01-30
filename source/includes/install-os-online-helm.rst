.. _install-op-oc-helm:

If you have not already installed Helm, follow the
instructions on :gh:`GitHub </kubernetes/helm>` to install it.

1. Change to the directory in which you cloned the repository.

#. Add the name of your ``<openshift-pull-secret>`` to the 
   ``registry.imagePullSecrets`` setting in the 
   ``helm_chart/values-openshift.yaml`` file:

   .. code-block:: sh
      :emphasize-lines: 3

      registry:
      # The pull secret must be specified
        imagePullSecrets: <openshift-pull-secret>

#. Install the |k8s-op-short| using the following
   ``helm`` command:

   .. code-block:: sh

      helm template helm_chart > operator.yaml \
      -- values helm_chart/values-openshift.yaml
      kubectl apply -f operator.yaml

   You can customize your Chart before installing it by modifying 
   the ``values-openshift.yaml`` file. For this Chart, you may need to 
   add one or more of the following options:

   .. include:: /includes/list-tables/os-helm-install-options.rst

   .. note:: 

      You can also pass these values as options when you apply the helm
      chart:

      .. code-block:: sh
         
         helm template --set namespace=<testNamespace> \
         helm_chart > operator.yaml \
         -- values helm_chart/values-openshift.yaml
         kubectl apply -f operator.yaml

To troubleshoot your |k8s-op-short|, see
:ref:`review-k8s-op-logs`.

.. include:: /includes/admonitions/fact-remove-k8s-resources-first.rst