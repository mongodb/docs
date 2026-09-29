.. setting:: mms.ldap.global.role.userAdmin

   *Type*: string

   
   |ldap| group whose members have the :ref:`global user admin role
   <global-user-admin-role>` in |mms|.
   
   .. code-block:: ini
   
      mms.ldap.global.role.userAdmin=CN\=MMS-UserAdmin,OU\=MMS,OU\=acme Groups,DC\=acme,DC\=example,DC\=com
   
   
   Corresponds to :setting:`LDAP Global Role User Admin`.
   

