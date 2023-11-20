.. setting:: spec.security.authentication.agents.automationPasswordSecretRef.key

   *Type*: string

   
   Key in the
   :setting:`spec.security.authentication.agents.automationPasswordSecretRef.name`
   |k8s-secret| that contains the password for the user in
   :setting:`spec.security.authentication.agents.automationUserName`.
   
   This setting is required if 
   :setting:`spec.security.authentication.agents.mode` is
   ``LDAP``.
   

