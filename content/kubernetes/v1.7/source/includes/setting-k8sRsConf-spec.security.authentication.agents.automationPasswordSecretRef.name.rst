.. setting:: spec.security.authentication.agents.automationPasswordSecretRef.name

   *Type*: string

   
   Name of the |k8s-secret| that contains the password for the
   :setting:`spec.security.authentication.agents.automationUserName`
   user. You must create this secret in the same namespace to which you
   deploy the |k8s-op-short|:
   
   .. code-block:: sh
   
      kubectl create secret generic ldap-agent-user \
      --from-literal="password=<password>" -n <metadata.namespace>
   
   This secret must contain one key, the value of which matches the
   password of the
   :setting:`spec.security.authentication.agents.automationUserName` user
   in your LDAP deployment.
   
   This setting is required if 
   :setting:`spec.security.authentication.agents.mode` is ``LDAP``.
   

