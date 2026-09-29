.. setting:: mms.ldap.user.email

   *Type*: string

   *Default*: ``mail`` per :rfc:`RFC2256 <2256>`

   
   |ldap| user attribute that contains the user's email address.
   After successful |ldap| authentication, |mms| synchronizes the
   specified |ldap| attribute with the email address from the |mms|
   user record.
   
   .. code-block:: ini
   
      mms.ldap.user.email=mail
   
   
   Corresponds to :setting:`LDAP User Email`.
   

