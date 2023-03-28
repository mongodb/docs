.. list-table::
   :widths: 20 10 50 20
   :header-rows: 1

   * - Key
     - Type
     - Description
     - Example

   * - :setting:`metadata.name`
     - string
     - Label for the |mongodb-multi|.

       .. include:: /includes/fact-resource-name-char-limit.rst

       See also :setting:`metadata.name` and :k8sdocs:`names </concepts/overview/working-with-objects/names/>`
       in the |k8s| documentation.

     - ``multi-replica-set``

   * - :setting:`spec.version`
     - string
     - Version of MongoDB that this |mongodb-multi| should run.

       The format should be ``X.Y.Z`` for the Community edition and
       ``X.Y.Z-ent`` for the Enterprise edition.

       .. include:: /includes/admonitions/ubi-8-min-db-versions.rst

       To learn more about MongoDB versioning, see
       :ref:`release-version-numbers` in the MongoDB Manual.
     - ``4.4.0-ent``

   * - | ``spec``
       | ``.opsManager``
       | ``.configMapRef``
       | :setting:`.name <spec.opsManager.configMapRef.name>`
     - string
     - Name of the |k8s-configmap| with the |onprem| connection
       configuration. The
       :setting:`spec.cloudManager.configMapRef.name` setting is an
       alias for this setting and can be used in its place.
       
       .. include:: /includes/admonitions/note-namespace-match-configmap.rst

       .. include:: /includes/admonitions/fact-k8s-operator-manages-configmap.rst

     - ``<my-project>``

   * - | ``spec``
       | ``.clusterSpecList``
       | ``.clusterName``
     - string
     - Name of the cluster in the |mongodb-multi|.

     - ``cluster1.example.com``

   * - | ``spec``
       | ``.clusterSpecList``
       | ``.members``
     - integer
     - The number of members in this cluster.

     - ``2``

   * - | ``spec``
       | ``.clusterSpecList``
       | ``.statefulSet``
       | ``.spec``
     - collection
     - *Optional.*
  
       Provides the configuration for the |k8s-statefulset| override for each of
       the cluster's StatefulSets in a |multi-cluster|. If specified at an individual
       cluster level under ``clusterSpecList``, overrides the global configuration for
       the StatefulSet for the entire |multi-cluster|. See :ref:`multi-cluster-specification`
       and :k8sdocs:`StatefulSet v1 apps Kubernetes documentation </reference/generated/kubernetes-api/{+k8s-api-version+}/#statefulset-v1-apps>`.

     - See the example.

   * - | ``spec``
       | ``.clusterSpecList``
       | ``.statefulSet``
       | ``.spec``
       | ``.volumeClaimTemplates``
       | ``.spec``
     - collection
     - *Optional.* If specified, provides a per-cluster override for the default
       storage size of the :k8sdocs:`volumeClaimtemplates </concepts/workloads/controllers/statefulset/#volume-claim-templates>`, for the persistent volume that stores the data.
     - See the example.

   * - :setting:`spec.credentials`
     - string
     - Name of the secret you
       :ref:`created <create-k8s-secret>` as |mms| |api|
       authentication credentials for the |k8s-op-short| to
       communicate with |onprem|.

       .. include:: /includes/admonitions/note-namespace-match-secret.rst

       .. include:: /includes/admonitions/fact-k8s-operator-manages-secret.rst

     - ``<mycredentials>``

   * - :setting:`spec.type`
     - string
     - Type of |k8s-mdbrsc| to create. The only supported value for this
       field is ``ReplicaSet``. See :ref:`Limitations <multi-cluster-limitations>`.

     - ``ReplicaSet``

   
