.. setting:: mms.ldap.user.baseDn

   *Type*: string

   
   Base Distinguished Name (DN) that |mms| uses to search for
   users.
   
   Escape the ``=`` sign with ``\``.
   
   
   .. code-block:: ini
   
      mms.ldap.user.baseDn=DC\=acme,DC\=example,DC\=com
   
   
   Corresponds to :setting:`LDAP User Base Dn`.
   

