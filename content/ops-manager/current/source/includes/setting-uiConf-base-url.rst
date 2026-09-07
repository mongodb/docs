.. setting:: Base URL

   *Type*: string

   *Default*: downloads.mongodb.com, downloads.mongodb.org, fastdl.mongodb.org, opsmanager.mongodb.com

   
   HTTP(S) endpoint to fetch MongoDB binaries from. If the endpoint is 
   an HTTPS endpoint, the |certauth| file specified by 
   :setting:`httpsCAFile` will be used to validate the certificate. If 
   :guilabel:`Base URL` is unset, MongoDB uses the default remote URLs 
   for MongoDB binaries.
   
   Corresponds to :setting:`automation.versions.download.baseUrl`.
   

