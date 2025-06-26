.. setting:: spec.backup.autoTerminateOnDeletion

   *Type*: boolean

   
   Flag that controls whether the |k8s-op-short| stops and terminates the
   backup when you delete a MongoDB resource. If omitted, the default value is ``false``.
   Setting this flag to ``true`` is useful when you want to delete the
   MongoDB custom resource while the :setting:`spec.backup.mode` setting
   is set to ``enabled``.
   

