.. setting:: spec.shardSpecificPodSpec.persistence.multiple.logs

   *Type*: collection

   Has |k8s-op-short| create a |k8s-pvc| and mount a
   directory for logs to its own |k8s-pv|.
   
   .. note::
   
      - You must set the values in this collection if
        :setting:`spec.persistent` ``: true``.
      - You may set this collection or the ``persistence.single``
        collection but not both.
   
   .. list-table::
      :widths: 20 20 60
      :header-rows: 1
   
      * - Scalar
        - Data Type
        - Description
   
      * - ``labelSelector``
        - string
        - `Tag
          <https://kubernetes.io/docs/concepts/storage/persistent-volumes/#selector>`__
          used to bind mounted volumes to directories.
   
      * - ``storage``
        - string
        - Minimum storage capacity that must be available on a |k8s|
          |k8s-node| to host the specific shard on |k8s|. This value is
          expressed as an integer followed by a unit of storage in
          |jedec| notation.
   
          Default value is 3Gi.
   
          For example, if this |k8s-mdbrsc| requires 60 gigabytes of storage
          space, set this value to ``60Gi``.
   
      * - ``storageClass``
        - string
        - Type of storage needed for the specific shard. You may create
          this storage type as a |k8s-sc| object before using it in this
          |k8s-obj| specification.
   
          .. include:: /includes/admonitions/fact-reclaimpolicy-to-retain.rst

