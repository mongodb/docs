.. setting:: mongodb.release.modulePreference

   *Type*: string

   
   Specifies whether to use MongoDB Community or Enterprise binaries
   for :doc:`backup </tutorial/nav/backup-deployments>`.
   
   Accepted values are:
   
   - ``enterprisePreferred``
   - ``enterpriseRequired``
   - ``communityRequired``
   
   When ``enterpriseRequired`` or ``communityRequired`` is selected, |mms| only uses those
   binaries for backup. When ``enterprisePreferred`` is selected, |mms| uses
   Enterprise binaries if available and Community binaries if they are
   not.
   
   .. note::
   
      When ``enterpriseRequired`` is selected, you must either set :setting:`mongodb.release.autoDownload.enterprise` to
      ``true`` or manually place Enterprise binaries in the :setting:`automation.versions.directory`
      in :doc:`Local Mode </tutorial/configure-local-mode>`.
   
   .. warning::
   
      Backup fails when either ``enterpriseRequired`` or ``communityRequired`` is selected,
      but the :setting:`automation.versions.directory` does not contain the required binary.
   
   Corresponds to :setting:`Required Module For Backup`.
   

