.. setting:: LDAP SSL CA File

   *Type*: string

   
   A file containing one or more trusted certificates in PEM format.
   Use this setting if you are using |ldaps| and the server is using a
   certificate that is not from a well-known |certauth|.
   
   .. code-block:: ini
   
      /opt/CA.pem
   
   
   Corresponds to :setting:`mms.ldap.ssl.CAFile`.
   

