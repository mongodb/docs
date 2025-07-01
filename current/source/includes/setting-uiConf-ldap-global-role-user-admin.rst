.. setting:: LDAP Global Role User Admin

   *Type*: string

   
   |ldap| group whose members have the :ref:`global user admin role
   <global-user-admin-role>` in |mms|.
   
   .. code-block:: ini
   
      CN=MMS-UserAdmin,OU=MMS,OU=acme Groups,DC=acme,DC=example,DC=com
   
   
   Corresponds to :setting:`mms.ldap.global.role.userAdmin`.
   

