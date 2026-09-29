.. setting:: LDAP Group Base Dn

   *Default*: :setting:`LDAP User Base Dn` value

   
   Base Distinguished Name (DN) that Ops Manager uses to search for
   groups. If left blank, this setting uses the default value.
   
   .. code-block:: ini
   
      OU=groups,DC=acme,DC=com
   
   
   Corresponds to :setting:`mms.ldap.group.baseDn`.
   

