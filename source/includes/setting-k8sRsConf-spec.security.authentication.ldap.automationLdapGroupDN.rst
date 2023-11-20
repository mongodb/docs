.. setting:: spec.security.authentication.ldap.automationLdapGroupDN

   *Type*: string

   
   The Distinguished Name (DN) of the LDAP group to which the
   {+mdbagent+} user belongs.
   
   This setting is required if:
   
   - :setting:`spec.security.authentication.ldap.authzQueryTemplate` is
     present, and
   - :setting:`spec.security.authentication.agents.mode` is ``LDAP`` or
     ``X509``.
   

