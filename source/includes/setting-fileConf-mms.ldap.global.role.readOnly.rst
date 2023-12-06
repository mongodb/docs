.. setting:: mms.ldap.global.role.readOnly

   *Type*: string

   
   |ldap| group whose members have the
   :ref:`global read-only role <global-read-only-role>` in |mms|.
   
   .. code-block:: ini
   
      mms.ldap.global.role.readOnly=CN\=MMS-ReadOnly,OU\=MMS,OU\=acme Groups,DC\=acme,DC\=example,DC\=com
   
   
   Corresponds to :setting:`LDAP Global Role Read Only`.
   

