.. list-table::
   :widths: 15 85
   :header-rows: 1

   * - Environment Variable
     - Purpose

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

   * - ``MONGODB_ENTERPRISE_DATABASE_IMAGE``
     - |url| of the MongoDB Enterprise Database image the
       |k8s-op-short| deploys.

       Default value is
       ``registry.connect.redhat.com/mongodb/mongodb-enterprise-database``.

       .. code-block:: yaml

          spec.template.spec.containers.name.env.name:
          MONGODB_ENTERPRISE_DATABASE_IMAGE
          spec.template.spec.containers.name.env.value:
          registry.connect.redhat.com/mongodb/mongodb-enterprise-database

       .. example::

          .. code-block:: yaml
             :linenos:
             :emphasize-lines: 10-13

             spec:
               template:
                 spec:
                   serviceAccountName: mongodb-enterprise-operator
                   containers:
                   - name: mongodb-enterprise-operator
                     image: <operatorVersionUrl>
                     imagePullPolicy: <policyChoice>
                     env:
                     - name: MONGODB_ENTERPRISE_DATABASE_IMAGE
                       value: registry.connect.redhat.com/mongodb/mongodb-enterprise-database
                     - name: IMAGE_PULL_POLICY
                       value: Always

   * - ``IMAGE_PULL_POLICY``
     - :k8sdocs:`Pull policy </concepts/configuration/overview/#container-images>`
       for the MongoDB Enterprise database image the |k8s-op-short|
       deploys.

       Accepted values are ``Always``, ``IfNotPresent``, ``Never``.

       Default value is ``Always``.

       .. code-block:: yaml

          spec.template.spec.containers.name.env.name:
          IMAGE_PULL_POLICY
          spec.template.spec.containers.name.env.value:
          <policy>

       .. example::

          .. code-block:: yaml
             :linenos:
             :emphasize-lines: 10-13

             spec:
               template:
                 spec:
                   serviceAccountName: mongodb-enterprise-operator
                   containers:
                   - name: mongodb-enterprise-operator
                     image: <operatorVersionUrl>
                     imagePullPolicy: <policyChoice>
                     env:
                     - name: MONGODB_ENTERPRISE_DATABASE_IMAGE
                       value: registry.connect.redhat.com/mongodb/mongodb-enterprise-database
                     - name: IMAGE_PULL_POLICY
                       value: Always

   * - ``OPS_MANAGER_IMAGE_REPOSITORY``
     - |url| of the repository from which the image for an
       :doc:`Ops Manager resource </tutorial/deploy-om-container>` is
       downloaded.

       Default value is
       ``registry.connect.redhat.com/mongodb/mongodb-enterprise-ops-manager``.

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
     - :k8sdocs:`Pull policy </concepts/configuration/overview/#container-images>`
       for the image deployed to an
       :doc:`Ops Manager resource </tutorial/deploy-om-container>`.

       Accepted values are ``Always``, ``IfNotPresent``, ``Never``.

       Default value is ``Always``.

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

   * - ``INIT_OPS_MANAGER_IMAGE_REPOSITORY``
     - |url| of the repository from which the initContainer image that
       contains |onprem| start-up scripts and the readiness probe is
       downloaded.

       Default value is
       ``registry.connect.redhat.com/mongodb/mongodb-enterprise-ops-manager-init``.

       .. code-block:: yaml

          spec.template.spec.containers.name.env.name:
          INIT_OPS_MANAGER_IMAGE_REPOSITORY
          spec.template.spec.containers.name.env.value:
          registry.connect.redhat.com/mongodb/mongodb-enterprise-ops-manager-init

       .. example::

          .. code-block:: yaml
             :linenos:
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
                     - name: INIT_OPS_MANAGER_IMAGE_REPOSITORY
                       value: registry.connect.redhat.com/mongodb/mongodb-enterprise-ops-manager-init

   * - ``INIT_OPS_MANAGER_VERSION``
     - Version of the initContainer image that contains |onprem|
       start-up scripts and the readiness probe.

       Default value is ``latest``.

       .. code-block:: yaml

          spec.template.spec.containers.name.env.name:
          INIT_OPS_MANAGER_VERSION
          spec.template.spec.containers.name.env.value:
          latest

       .. example::

          .. code-block:: yaml
             :linenos:
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
                     - name: INIT_APPDB_VERSION
                       value: latest

   * - ``APPDB_IMAGE_REPOSITORY``
     - |url| of the repository from which the Application Database
       image is downloaded.

       Default value is
       ``registry.connect.redhat.com/mongodb/mongodb-enterprise-appdb``.

       .. code-block:: yaml

          spec.template.spec.containers.name.env.name:
          APPDB_IMAGE_REPOSITORY
          spec.template.spec.containers.name.env.value:
          registry.connect.redhat.com/mongodb/mongodb-enterprise-appdb

       .. example::

          .. code-block:: yaml
             :linenos:
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
                     - name: APPDB_IMAGE_REPOSITORY
                       value: registry.connect.redhat.com/mongodb/mongodb-enterprise-appdb

   * - ``INIT_APPDB_IMAGE_REPOSITORY``
     - |url| of the repository from which the ``initContainer`` image
       that contains Application Database start-up scripts and the
       readiness probe is downloaded.

       Default value is
       ``registry.connect.redhat.com/mongodb/mongodb-enterprise-appdb-init``.

       .. code-block:: yaml

          spec.template.spec.containers.name.env.name:
          INIT_APPDB_IMAGE_REPOSITORY
          spec.template.spec.containers.name.env.value:
          registry.connect.redhat.com/mongodb/mongodb-enterprise-init-appdb

       .. example::

          .. code-block:: yaml
             :linenos:
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
                     - name: INIT_APPDB_IMAGE_REPOSITORY
                       value: registry.connect.redhat.com/mongodb/mongodb-enterprise-init-appdb

   * - ``INIT_APPDB_VERSION``
     - Version of the ``initContainer`` image that contains |onprem|
       start-up scripts and the readiness probe.

       Default value is ``latest``.

       .. code-block:: yaml

          spec.template.spec.containers.name.env.name:
          INIT_APPDB_VERSION
          spec.template.spec.containers.name.env.value:
          latest

       .. example::

          .. code-block:: yaml
             :linenos:
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
                     - name: INIT_APPDB_VERSION
                       value: latest
