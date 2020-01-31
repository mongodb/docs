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
       :k8sdocs:`can access </reference/access-authn-authz/rbac/#rolebinding-and-clusterrolebinding>`
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

       .. include:: /includes/admonitions/fact-create-service-account-namespaces.rst

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
                   serviceAccountName: enterprise-operator
                   containers:
                   - name: enterprise-operator
                     image: <operatorVersionUrl>
                     imagePullPolicy: <policyChoice>
                     env:
                     - name: WATCH_NAMESPACE
                       value: "<testNamespace>"

   * - ``OPS_MANAGER_IMAGE_REPOSITORY``
     - |url| of the repository from which the image for an :doc:`Ops
       Manager resource </tutorial/deploy-om-container>` is downloaded.

       Default value is:
       ``registry.connect.redhat.com/mongodb/mongodb-enterprise-ops-manager``

       .. code-block:: yaml

          spec.template.spec.containers.name.env.name: 
          OPS_MANAGER_IMAGE_REPOSITORY
          spec.template.spec.containers.name.env.value:
          registry.connect.redhat.com/mongodb/mongodb-enterprise-ops-manager
      
       .. example::

          .. code-block:: yaml
             :linenos:
             :emphasize-lines: 10-13

             spec:
               template:
                 spec:
                   serviceAccountName: enterprise-operator
                   containers:
                   - name: enterprise-operator
                     image: <operatorVersionUrl>
                     imagePullPolicy: <policyChoice>
                     env:
                     - name: OPS_MANAGER_IMAGE_REPOSITORY
                       value: registry.connect.redhat.com/mongodb/mongodb-enterprise-ops-manager
                     - name: OPS_MANAGER_IMAGE_PULL_POLICY
                       value: Always
       
   * - ``OPS_MANAGER_IMAGE_PULL_POLICY``
     - :k8sdocs:`Pull policy
       </concepts/configuration/overview/#container-images>` for the
       image deployed to an :doc:`Ops Manager resource
       </tutorial/deploy-om-container>`.
       
       Accepted values are: ``Always``, ``IfNotPresent``, ``Never``

       Default value is: ``Always``

       .. code-block:: yaml

          spec.template.spec.containers.name.env.name: 
          OPS_MANAGER_IMAGE_PULL_POLICY
          spec.template.spec.containers.name.env.value: 
          <policy>

       .. example::

          .. code-block:: yaml
             :linenos:
             :emphasize-lines: 10-13

             spec:
               template:
                 spec:
                   serviceAccountName: enterprise-operator
                   containers:
                   - name: enterprise-operator
                     image: <operatorVersionUrl>
                     imagePullPolicy: <policyChoice>
                     env:
                     - name: OPS_MANAGER_IMAGE_REPOSITORY
                       value: registry.connect.redhat.com/mongodb/mongodb-enterprise-ops-manager
                     - name: OPS_MANAGER_IMAGE_PULL_POLICY
                       value: Always
