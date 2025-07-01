.. list-table:: 
   :widths: 20 80
   :header-rows: 1

   * - ``--set`` option
     - When to Use

   * - ``namespace``
     - To use a different namespace, you need to specify that
       ``namespace``.

       Default value is: ``mongodb``.

       .. example::

          .. code-block:: sh
             :emphasize-lines: 2

             helm template \
               --set namespace=<testNamespace> \
               public/helm_chart > operator.yaml
             kubectl apply -f operator.yaml 

   * - ``operator.env``
     - Label for the Operator's deployment environment. The ``env``
       value affects default timeouts and the format and level of
       logging.

       .. list-table:: 
          :widths: 40 30 30
          :header-rows: 1

          * - If ``operator.env`` is
            - Log Level is set to
            - Log Format is set to
          * - ``dev``
            - debug
            - text
          * - ``prod``
            - info
            - json

       Accepted values are:  ``dev``, ``prod``.

       Default value is: ``prod``.

       .. example::

          .. code-block:: sh
             :emphasize-lines: 2

             helm template \
               --set operator.env=dev \
               public/helm_chart > operator.yaml
             kubectl apply -f operator.yaml

   * - ``operator.watchNamespace``
     - Namespace that the Operator watches for |k8s-mdbrsc| changes.
       If this |k8s-ns| differs from the default, ensure that the
       Operator's ServiceAccount
       `can access <https://kubernetes.io/docs/reference/access-authn-authz/rbac/#rolebinding-and-clusterrolebinding>`__
       that different namespace.

       ``*`` means *all namespaces* and requires the
       `ClusterRole <https://kubernetes.io/docs/reference/access-authn-authz/rbac/#role-and-clusterrole>`__
       assigned to the ``mongodb-enterprise-operator`` ServiceAccount
       which is the ServiceAccount used to run the |k8s-op-short|.

       Default value is: ``<metadata.namespace>``.

       .. example::

          .. code-block:: sh
             :emphasize-lines: 2

             helm template \
               --set operator.watchNamespace=<testNamespace> \
               public/helm_chart > operator.yaml
             kubectl apply -f operator.yaml

   * - ``managedSecurityContext``
     - If you use `OpenShift <https://www.openshift.com/>`__ as your
       |k8s| orchestrator, set this to ``true`` to allow OpenShift to
       manage the Security Context for the |k8s-op-short|.

       Accepted values are: ``true``, ``false``.

       Default value is: ``false``.

       .. example::

          .. code-block:: sh
             :emphasize-lines: 2

             helm template \
               --set managedSecurityContext=false \
               public/helm_chart > operator.yaml
             kubectl apply -f operator.yaml

   * - ``operator.podWaitSeconds``
     - Time in seconds that the Operator waits for |k8s-statefulsets|
       to start when |k8s-mdbrscs| are being created or updated before
       retrying.

       Default values depend upon ``operator.env``:

       .. list-table:: 
          :widths: 50 50
          :header-rows: 1

          * - If ``operator.env`` is
            - ``operator.podWaitSeconds`` is set to
          * - ``dev``
            - 3
          * - ``prod``
            - 5

       .. example::

          .. code-block:: sh
             :emphasize-lines: 2-3

             helm template \
               --set operator.env=dev \
               --set operator.podWaitSeconds=10 \
               public/helm_chart > operator.yaml
             kubectl apply -f operator.yaml

   * - ``operator.podSetWaitRetries``
     - Maximum number of retries that the Operator attempts when
       waiting for |k8s-statefulsets| to start after |k8s-mdbrscs| are
       created or updated.

       Default values depend upon ``operator.env``:

       .. list-table:: 
          :widths: 50 50
          :header-rows: 1

          * - If ``operator.env`` is
            - ``operator.podSetWaitRetries`` is set to
          * - ``dev``
            - 60
          * - ``prod``
            - 180

       .. example::

          .. code-block:: sh
             :emphasize-lines: 2-4

             helm template 
               --set operator.env=dev \
               --set operator.podWaitSeconds=10 \
               --set operator.podSetWaitRetries=20 \
               public/helm_chart > operator.yaml
             kubectl apply -f operator.yaml
