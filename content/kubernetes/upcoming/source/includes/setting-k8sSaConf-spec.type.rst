.. setting:: spec.type

   *Type*: string

   Type of |k8s-mdbrsc| to create. Accepted values are:

   - ``Standalone``
   - ``ReplicaSet``
   - ``ShardedCluster``

   .. important::

      Starting in |k8s-op-short| 1.15, the ``Standalone`` value is
      deprecated and loses support in the next major version. Use
      ``ReplicaSet`` with :setting:`spec.members` set to ``1``
      instead. To migrate an existing standalone deployment, see
      :ref:`migrate-standalone-to-replica-set`.


