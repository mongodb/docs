.. setting:: Required Module For Backup

   *Type*: string

   *Default*: Enterprise Preferred

   
   Specifies whether to use MongoDB Community or Enterprise binaries
   for :doc:`backup </tutorial/nav/backup-deployments>`.
   
   Accepted values are:
   
   - :guilabel:`Enterprise Preferred`
   - :guilabel:`Enterprise Required`
   - :guilabel:`Community Required`
   
   When :guilabel:`Enterprise Required` or :guilabel:`Community Required` is selected, |mms| only uses those
   binaries for backup. When :guilabel:`Enterprise Preferred` is selected, |mms| uses
   Enterprise binaries if available and Community binaries if they are
   not.
   
   .. note::
   
      When :guilabel:`Enterprise Required` is selected, you must either set :setting:`Backup Versions Auto Download Enterprise Builds` to
      ``true`` or manually place Enterprise binaries in the :setting:`Versions Directory`
      in :doc:`Local Mode </tutorial/configure-local-mode>`.
   
   .. warning::
   
      Backup fails when either :guilabel:`Enterprise Required` or :guilabel:`Community Required` is selected,
      but the :setting:`Versions Directory` does not contain the required binary.
   
   Corresponds to :setting:`mongodb.release.modulePreference`.
   

