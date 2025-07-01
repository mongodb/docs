.. setting:: User Authentication Method

   *Type*: string

   *Default*: :guilabel:`Application Database`

   
   Select whether to store authentication credentials in the |onprem|
   Application Database, a |saml| |idp|, or in an |ldap|
   directory.
   
   Accepted values are:
   
   - :guilabel:`Application Database`
   - :guilabel:`LDAP`
   - :guilabel:`SAML`
   
   
   Corresponds to :setting:`mms.userSvcClass`.
   

