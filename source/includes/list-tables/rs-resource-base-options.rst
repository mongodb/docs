.. list-table::
   :widths: 20 20 40 20
   :header-rows: 1

   * - Key
     - Type
     - Description
     - Example

   * - :setting:`metadata.name`
     - string
     - Label for this |k8s| :term:`replica set` |k8s-obj|.

       .. include:: /includes/fact-resource-name-char-limit.rst

       .. seealso::

          - :setting:`metadata.name`
          - Kubernetes documentation on
            :k8sdocs:`names </docs/concepts/overview/working-with-objects/names/>`.

     - ``myproject``

   * - :setting:`spec.members`
     - integer
     - Number of members of the :term:`replica set`.
     - ``3``

   * - :setting:`spec.version`
     - string
     - Version of MongoDB that this :term:`replica set` should run.

       The format should be ``X.Y.Z`` for the Community edition and
       ``X.Y.Z-ent`` for the Enterprise edition.

       To learn more about MongoDB versioning, see
       :ref:`release-version-numbers` in the MongoDB Manual.
     - ``3.6.7``

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

     - ``<myconfigmap>`` or
       ``<namespace>/<myconfigmap>``

   * - :setting:`spec.credentials`
     - string
     - Name of the |k8s| |k8s-secret| you
       :ref:`created <create-k8s-secret>` as |mms| |api|
       authentication credentials for the |k8s-op-short| to
       communicate with |onprem|.

       .. include:: /includes/admonitions/note-namespace-match-secret.rst

       .. include:: /includes/admonitions/fact-k8s-operator-manages-secret.rst

     - ``<mycredentials>`` or
       ``<namespace>/<mycredentials>``

   * - :setting:`spec.type`
     - string
     - Type of |k8s-mdbrsc| to create.

     - ``ReplicaSet``

   * - :setting:`spec.persistent`
     - string
     - *Optional.*

       Flag indicating if this |k8s-mdbrsc| should use |k8s-pvs| for
       storage. Persistent volumes are not deleted when the
       |k8s-mdbrsc| is stopped or restarted.

       If this value is ``true``, then
       :setting:`spec.podSpec.persistence.single` is set to its
       default value of ``16Gi``.

       To change your |k8s-pvcs| configuration, configure the
       following collections to meet your deployment requirements:

       - If you want one |k8s-pv| for each |k8s-pod|, configure the
         :setting:`spec.podSpec.persistence.single` collection.

       - If you want separate |k8s-pvs| for data, journals, and
         logs for each |k8s-pod|, configure the following
         collections:

         - :setting:`spec.podSpec.persistence.multiple.data`
         - :setting:`spec.podSpec.persistence.multiple.journal`
         - :setting:`spec.podSpec.persistence.multiple.logs`

       .. include:: /includes/admonitions/k8s-persistent-volumes.rst

     - ``true``
