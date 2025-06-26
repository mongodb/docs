.. setting:: spec.backup.mode

   *Type*: string

   
   Enables continuous backups for a MongoDB resource.
   Possible values are ``enabled``, ``disabled``, and
   ``terminated``.
   
   .. note::
   
       The :setting:`spec.backup.mode`
       setting relies on :ref:`Backup <om-rsrc-backup>` that is
       enabled in the |onprem| and requires that
       :opsmgrkube:`spec.backup.enabled`
       value in the |onprem| :ref:`resource specification
       <k8s-om-specification>` is set to ``true``.
   
   
   After you enable continuous backups for your MongoDB resource with
   :setting:`spec.backup.mode`, you can :ref:`check the backup status
   <get-resource-status>`.
   

