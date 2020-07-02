.. list-table::
   :widths: 15 75 10
   :header-rows: 1
   :stub-columns: 1

   * - Setting
     - Purpose
     - Default

   * - ``namespace``

     - To use a different namespace, specify that ``namespace``.

       .. example::

          .. code-block:: yaml
             :emphasize-lines: 2

             # Name of the Namespace to use
             namespace: mongodb

     - ``mongodb``

   * - ``managedSecurityContext``

     - Flag that determines if the |k8s-op-short| inherits the
       ``securityContext`` settings that your |k8s| cluster manages.

       For OpenShift, ``managedSecurityContext`` must always be
       ``true``.

       .. example::

          .. code-block:: yaml
             :emphasize-lines: 2

             # OpenShift manages security context on its own
             managedSecurityContext: true

     - ``true``

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

       .. example::

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

       .. example::

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

       .. example::

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

       .. example::

          .. code-block:: yaml
             :emphasize-lines: 2

             registry:
               appDb: registry.connect.redhat.com/mongodb
     -

   * - | ``registry``
       | ``.imagePullSecrets``

     - |k8s-secret| that contains the credentials required to pull
       imagePullSecrets from the repository.

       .. important::

          OpenShift requires this setting. Define it in this file or
          pass it when you install the |k8s-op-short| using Helm.

       .. example::

          .. code-block:: yaml
             :emphasize-lines: 2

             registry:
               imagePullSecrets: <openshift-pull-secret>
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
               operator: registry.connect.redhat.com/mongodb
     -

   * - | ``registry``
       | ``.opsManager``

     - Repository from which OpenShift pulls the |onprem| image.
       Specify this value if you want to pull the |onprem| image from a
       private repository.

       .. example::

          .. code-block:: yaml
             :emphasize-lines: 2

             registry:
               opsManager: registry.connect.redhat.com/mongodb
     -

   * - | ``registry``
       | ``.initAppDb``

     - Repository from which the Application Database ``initContainer``
       image is pulled. This image contains the start-up scripts and
       readiness probe for the Application Database.

       Specify this value if you want to pull the Application Database
       ``initContainer`` image from a private repository.

       .. example::

          .. code-block:: yaml
             :emphasize-lines: 2

             registry:
               initAppDb: registry.connect.redhat.com/mongodb
     -

   * - | ``registry``
       | ``.initOpsManager``

     - Repository from which the |onprem| ``initContainer`` image is
       pulled. This image contains the start-up scripts and readiness
       probe for |onprem|.

       Specify this value if you want to pull the |onprem|
       ``initContainer`` image from a private repository.

       .. example::

          .. code-block:: yaml
             :emphasize-lines: 2

             registry:
               initOpsManager: registry.connect.redhat.com/mongodb
     -
