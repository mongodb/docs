.. setting:: automation.versions.download.baseUrl

   *Type*: string

   *Default*: downloads.mongodb.com, downloads.mongodb.org, fastdl.mongodb.org, opsmanager.mongodb.com

   
   HTTP(S) endpoint to fetch MongoDB binaries from. If the endpoint is 
   an HTTPS endpoint, the |certauth| file specified by 
   :setting:`httpsCAFile` will be used to validate the certificate. If 
   ``automation.versions.download.baseUrl`` is unset, MongoDB uses the 
   default remote URLs for MongoDB binaries.
   
   Corresponds to :setting:`Base URL`.
   

