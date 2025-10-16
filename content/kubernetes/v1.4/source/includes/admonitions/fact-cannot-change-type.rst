.. note::

   The |k8s-op-short| does not support changing the type of an existing
   configuration even though it will accept a valid configuration for a
   different type.

   For example, if your MongoDB resource is a
   standalone, you cannot set the value of ``spec.type`` to
   ``ReplicaSet`` and set ``spec.members``. If you do, the
   |k8s-op-short| throws an error and requires you to revert to the
   previously working configuration.
