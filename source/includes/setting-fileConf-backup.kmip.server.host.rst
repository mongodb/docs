.. setting:: backup.kmip.server.host

   *Type*: string

   *Default*: None

   
   Specifies the hostname of a |kmip| server. 
   
   Starting in MongoDB 4.2.1 (and 4.0.14),
   you can specify more than one |kmip| server 
   in a comma-seperated list. 
   
   .. important::
   
      In MongoDB versions earlier than 4.0.14 or 4.2.1,
      |mms| uses only the first |kmip| hostname in a list of |kmip|
      server hostnames. 
   
   
   
   Corresponds to :setting:`KMIP Server Host`.
   

