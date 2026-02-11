.. setting:: spec.security.authentication.agents.automationPasswordSecretRef

   *Type*: collection

   
   Details of the |k8s-secret| that contains the password for the
   :setting:`spec.security.authentication.agents.automationUserName`
   user.
   
   This setting is required if 
   :setting:`spec.security.authentication.agents.mode` is ``LDAP``.
   

