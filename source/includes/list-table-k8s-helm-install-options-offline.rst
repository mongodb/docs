.. list-table:: 
   :widths: 20 40 40
   :header-rows: 1

   * - ``--set`` option
     - When to Use
     - Example
   * - ``namespace``
     - ``helm`` uses the ``mongodb`` namespace by
       default. To use a different namespace,
       you need to specify that ``namespace``.
     - 
       .. code-block:: sh

          helm install helm_chart/ \
            --name mongodb-enterprise \
            --set database.pullPolicy=IfNotPresent \
            --set operator.pullPolicy=IfNotPresent \
            --set namespace=<namespaceName>

   * - ``managedSecurityContext``
     - If you use
       `OpenShift <https://www.openshift.com/>`__ 
       as your |k8s| orchestrator, you need to
       allow OpenShift to manage the Security
       Context for the |k8s-op-short|.
     - 
       .. code-block:: sh

          helm install helm_chart/ \
            --name mongodb-enterprise \
            --set database.pullPolicy=IfNotPresent \
            --set operator.pullPolicy=IfNotPresent \
            --set managedSecurityContext=false
