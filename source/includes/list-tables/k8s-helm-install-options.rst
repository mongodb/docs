.. list-table::
   :widths: 15 70 15
   :header-rows: 1
   :stub-columns: 1

   * - Setting
     - Purpose
     - Default

   * - ``namespace``

     - To use a different namespace, specify that ``namespace``.

       .. code-block:: yaml
          :emphasize-lines: 2

          # Name of the Namespace to use
          namespace: mongodb

     - ``mongodb``

   * - ``managedSecurityContext``

     - Flag that determines if the |k8s-op-short| inherits the
       ``securityContext`` settings that your |k8s| cluster manages.

       Set this field to ``true`` if your cluster manages the
       ``securityContext`` for your |k8s| resources.

       .. example::

          .. code-block:: yaml
             :emphasize-lines: 3

             # Set this to true if your cluster is managing SecurityContext for you.
             # If running OpenShift (Cloud, Minishift, etc.), set this to true.
             managedSecurityContext: false

     - ``false``

   * - | ``operator``
       | ``.env``

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

       .. code-block:: yaml
          :emphasize-lines: 3

          operator:
            # Execution environment for the operator, dev or prod.
            # Use dev for more verbose logging
            env: prod

     - ``prod``

   * - | ``operator``
       | ``.watchNamespace``

     - Namespace that the Operator watches for |k8s-mdbrsc| changes.
       If this |k8s-ns| differs from the default, ensure that the
       Operator's ServiceAccount
       :k8sdocs:`can access </reference/access-authn-authz/rbac/#rolebinding-and-clusterrolebinding>`
       that different namespace.

       ``*`` means *all namespaces* and requires the
       `ClusterRole <https://kubernetes.io/docs/reference/access-authn-authz/rbac/#role-and-clusterrole>`__
       assigned to the ``mongodb-enterprise-operator`` ServiceAccount
       which is the ServiceAccount used to run the |k8s-op-short|.

       .. code-block:: yaml
          :emphasize-lines: 2

          operator:
            watchNamespace: *

       .. include:: /includes/admonitions/fact-create-service-account-namespaces.rst

     - ``<metadata.namespace>``

   * - | ``operator``
       | ``.watchedResources``

     - Custom resources that the |k8s-op-short| watches.

       The |k8s-op-short| installs the |k8s-crds| for and watches only
       the resources you specify.

       Accepted values are:

       .. include:: /includes/list-tables/crds.rst

       .. code-block:: yaml
          :emphasize-lines: 2

          operator:
            watchedResources:
              - mongodbusers
              - mongodb
              - opsmanagers


     -
       - ``mongodbusers``
       - ``mongodb``
       - ``opsmanagers``

   * - | ``registry``
       | ``.appDb``

     - Repository from which the Application Database image is pulled.
       Specify this value if you want to pull the |onprem| image from a
       private repository.

       .. code-block:: yaml
          :emphasize-lines: 2

          registry:
            appDb: quay.io/mongodb

     -

   * - | ``registry``
       | ``.initAppDb``

     - Repository from which the Application Database initContainer
       image is pulled. This image contains the start-up scripts and
       readiness probe for the Application Database.

       Specify this value if you want to pull the Application Database
       initContainer image from a private repository.

       .. example::

          .. code-block:: yaml
             :emphasize-lines: 2

             registry:
               initAppDb: quay.io/mongodb

     -

   * - | ``registry``
       | ``.initOpsManager``

     - Repository from which the |onprem| initContainer image is
       pulled. This image contains the start-up scripts and readiness
       probe for |onprem|.

       Specify this value if you want to pull the |onprem|
       ``initContainer`` image from a private repository.

       .. example::

          .. code-block:: yaml
             :emphasize-lines: 2

             registry:
               initOpsManager: quay.io/mongodb

     -

   * - | ``registry``
       | ``.operator``

     - Repository from which the |k8s-op-short| image is pulled.
       Specify this value if you want to pull the |k8s-op-short| image
       from a private repository.

       .. example::

          .. code-block:: yaml
             :emphasize-lines: 2

             registry:
               operator: quay.io/mongodb

     -

   * - | ``registry``
       | ``.opsManager``

     - Repository from which the |onprem| image is pulled. Specify this
       value if you want to pull the |onprem| image from a private
       repository.

       .. example::

          .. code-block:: yaml
             :emphasize-lines: 2

             registry:
               opsManager: quay.io/mongodb

     -


