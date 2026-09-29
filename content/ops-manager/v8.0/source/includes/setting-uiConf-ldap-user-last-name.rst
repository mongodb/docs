.. setting:: LDAP User Last Name

   *Type*: string

   *Default*: ``surname`` per :rfc:`RFC2256 <2256>`

   
   |ldap| user attribute that contains the user's last name. After
   successful |ldap| authentication, |mms| synchronizes the specified
   |ldap| attribute with the last name from the |mms| user record.
   
   .. code-block:: ini
   
      sn
   
   
   Corresponds to :setting:`mms.ldap.user.lastName`.
   

