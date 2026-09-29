.. setting:: mms.ldap.user.firstName

   *Type*: string

   *Default*: ``givenName`` per :rfc:`RFC2256 <2256>`

   
   |ldap| user attribute that contains the user's first name. After
   successful |ldap| authentication, |mms| synchronizes the specified
   |ldap| attribute with the first name from the |mms| user record.
   
   .. code-block:: ini
   
      mms.ldap.user.firstName=givenName
   
   
   Corresponds to :setting:`LDAP User First Name`.
   

