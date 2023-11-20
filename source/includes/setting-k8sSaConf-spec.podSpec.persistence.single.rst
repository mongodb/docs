.. setting:: spec.podSpec.persistence.single

   *Type*: collection

   
   Has |k8s-op-short| create one |k8s-pvc| and mount all
   three directories for data, journal, and logs to the same |k8s-pv|.
   
   .. note::
   
      - You must set the values in this collection if
        :setting:`spec.persistent` ``: true``.
      - You may set this collection or the ``persistence.multiple``
        collections but not both.
   
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
        - Minimum size of |k8s-pv| that should be mounted. This value is
          expressed as an integer followed by a unit of storage in
          |jedec| notation.
   
          Default value is 16Gi.
   
          .. example::
   
             If :term:`standalone deployment <standalone>` in requires 60 gigabytes of
             storage space, set this value to ``60Gi``.
   
      * - ``storageClass``
        - string
        - Type of storage specified in a |k8s-pvc|. You may create
          this storage type as a |k8s-sc| object before using it in this
          |k8s-obj| specification.
   
          .. note::
   
             .. include:: /includes/admonitions/fact-reclaimpolicy-to-retain.rst

