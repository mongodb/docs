.. setting:: mongodb.release.autoDownload.enterprise

   *Type*: boolean

   
   Flag indicating whether the Backup Daemons automatically install the
   Enterprise editions of the versions of MongoDB that the Backup
   Daemons need. Requires :setting:`mongodb.release.autoDownload` be set to ``true``.
   
   .. warning::
   
      If you plan on running
      :product:`MongoDB Enterprise <mongodb-enterprise-advanced>` on
      Linux hosts, then you must manually install a set of dependencies
      to each host *before installing MongoDB*. The MongoDB manual
      provides the appropriate command to install the dependencies.
   
      See :doc:`/tutorial/configure-local-mode`.
   
   Corresponds to :setting:`Backup Versions Auto Download Enterprise Builds`
   

