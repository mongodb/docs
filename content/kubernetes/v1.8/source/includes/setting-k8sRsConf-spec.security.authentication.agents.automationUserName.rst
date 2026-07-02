.. setting:: spec.security.authentication.agents.automationUserName

   *Type*: string

   
   Name of the user that the {+mdbagent+}s use to interact with your
   MongoDB deployment. The username is mapped to an LDAP Distinguished
   Name (DN) according to
   :setting:`spec.security.authentication.ldap.userToDNMapping`. The
   resulting DN must already exist in your LDAP deployment.
   
   This setting is required if 
   :setting:`spec.security.authentication.agents.mode` is ``LDAP``.
   

