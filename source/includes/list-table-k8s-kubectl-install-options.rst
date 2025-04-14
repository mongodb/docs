.. list-table:: 
   :widths: 20 80
   :header-rows: 1

   * - Environment Variable
     - When to Use

   * - ``OPERATOR_ENV``
     - Label for the Operator's deployment environment. The ``env``
       value affects default timeouts and the format and level of
       logging.

       .. list-table:: 
          :widths: 40 30 30
          :header-rows: 1

          * - If ``OPERATOR_ENV`` is
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

       You can set the following pair of values:
       
       .. code-block:: yaml

          spec.template.spec.containers.name.env.name: OPERATOR_ENV
          spec.template.spec.containers.name.env.value: prod

       .. example::

          .. code-block:: yaml
             :emphasize-lines: 9-11

             spec:
               template:
                 spec:
                   serviceAccountName: mongodb-enterprise-operator
                   containers:
                   - name: mongodb-enterprise-operator
                     image: <operatorVersionUrl>
                     imagePullPolicy: <policyChoice>
                     env:
                     - name: OPERATOR_ENV
                       value: prod

   * - ``WATCH_NAMESPACE``
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

       .. admonition:: One Namespace or All Namespaces
          :class: note

          If you need to watch more than one namespace, set the value
          of ``WATCH_NAMESPACE`` to ``*`` (all). This environment
          variable can watch one namespace or all namespaces.

       You can set the following pair of values:
       
       .. code-block:: yaml

          spec.template.spec.containers.name.env.name: WATCH_NAMESPACE
          spec.template.spec.containers.name.env.value: "<testNamespace>"

       .. example::

          .. code-block:: yaml
             :emphasize-lines: 9-11

             spec:
               template:
                 spec:
                   serviceAccountName: mongodb-enterprise-operator
                   containers:
                   - name: mongodb-enterprise-operator
                     image: <operatorVersionUrl>
                     imagePullPolicy: <policyChoice>
                     env:
                     - name: WATCH_NAMESPACE
                       value: "<testNamespace>"

   * - ``MANAGED_SECURITY_CONTEXT``
     - If you use `OpenShift <https://www.openshift.com/>`__ as your
       |k8s| orchestrator, set this to ``'true'`` to allow OpenShift to
       manage the Security Context for the |k8s-op-short|.

       Accepted values are: ``'true'``, ``'false'``.

       Default value is: ``'false'``.

       You can set the following pair of values:

       .. code-block:: yaml

          spec.template.spec.containers.name.env.name: MANAGED_SECURITY_CONTEXT
          spec.template.spec.containers.name.env.value: 'true'

       .. example::

          .. code-block:: yaml
             :emphasize-lines: 9-11

             spec:
               template:
                 spec:
                   serviceAccountName: mongodb-enterprise-operator
                   containers:
                   - name: mongodb-enterprise-operator
                     image: <operatorVersionUrl>
                     imagePullPolicy: <policyChoice>
                     env:
                     - name: MANAGED_SECURITY_CONTEXT
                       value: 'true'
