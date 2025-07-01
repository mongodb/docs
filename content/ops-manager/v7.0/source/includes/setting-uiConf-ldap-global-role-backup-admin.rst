.. setting:: LDAP Global Role Backup Admin

   *Type*: string

   
   |ldap| group whose members have the :ref:`global backup admin
   role <global-backup-admin-role>` in |mms|.
   
   .. code-block:: ini
   
      CN=MMS-BackupAdmin,OU=MMS,OU=acme Groups,DC=acme,DC=example,DC=com
   
   
   Corresponds to :setting:`mms.ldap.global.role.backupAdmin`.
   

