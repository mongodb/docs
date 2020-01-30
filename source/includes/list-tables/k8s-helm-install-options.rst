.. list-table::
   :widths: 20 80
   :header-rows: 1

   * - Setting
     - When to Use

   * - ``namespace``
     - To use a different namespace, you need to specify that
       ``namespace``.

       Default value is: ``mongodb``.

       .. example::

          .. code-block:: sh
             :emphasize-lines: 2

             # Name of the Namespace to use
             namespace: mongodb

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
             :emphasize-lines: 3

             operator:
              # Execution environment for the operator, dev or prod. Use dev for more verbose logging
              env: prod

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

       .. include:: /includes/admonitions/fact-create-service-account-namespaces.rst

       .. example::

          .. code-block:: sh
             :emphasize-lines: 2

             operator:
               watchNamespace: *

