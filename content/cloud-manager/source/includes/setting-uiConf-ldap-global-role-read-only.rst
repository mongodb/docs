.. setting:: LDAP Global Role Read Only

   *Type*: string

   
   |ldap| group whose members have the
   :ref:`global read-only role <global-read-only-role>` in |mms|.
   
   .. code-block:: ini
   
      CN=MMS-ReadOnly,OU=MMS,OU=acme Groups,DC=acme,DC=example,DC=com
   
   
   Corresponds to :setting:`mms.ldap.global.role.readOnly`.
   

