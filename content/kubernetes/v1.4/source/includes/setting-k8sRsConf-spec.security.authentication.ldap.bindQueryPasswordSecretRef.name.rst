.. setting:: spec.security.authentication.ldap.bindQueryPasswordSecretRef.name

   *Type*: string

   *Required for LDAP authentication.* 
   
   Name of the |k8s-secret| that contains the password with which MongoDB
   binds when connecting to the |ldap| server.
   
   The |k8s-secret| must contain only one ``password`` field which stores
   the password.
   

