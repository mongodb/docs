To verify that the |k8s-op-short| installed correctly, run the 
following command and verify the output:

.. tabs::

   .. tab:: Using kubectl
      :tabid: kubectl-verify

      .. code-block:: sh

         kubectl describe deployments mongodb-enterprise-operator -n <metadata.namespace>

   .. tab:: Using oc
      :tabid: oc-verify

      .. code-block:: sh

         oc describe deployments mongodb-enterprise-operator -n <metadata.namespace>

By default, deployments exist in the ``mongodb`` namespace. If the 
following error message appears, ensure you use the correct 
namespace:

.. code-block:: sh

   Error from server (NotFound): deployments.apps "mongodb-enterprise-operator" not found

.. include:: /includes/troubleshoot-k8s.rst