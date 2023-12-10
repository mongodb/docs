.. setting:: mms.ldap.group.baseDn

   *Type*: string

   *Default*: :setting:`LDAP User Base Dn` value

   
   Base Distinguished Name (DN) that Ops Manager uses to search for
   groups. If left blank, this setting uses the default value.
   
   .. code-block:: ini
   
      mms.ldap.group.baseDn=OU\=groups,DC\=acme,DC\=com
   
   
   Corresponds to :setting:`LDAP Group Base Dn`.
   

