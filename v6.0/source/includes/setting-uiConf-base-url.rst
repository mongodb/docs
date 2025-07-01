.. setting:: Base URL

   *Type*: string

   *Default*: mongodb.com, fastdl.mongodb.org

   
   HTTP(S) endpoint to fetch MongoDB binaries from. If the endpoint is 
   an HTTPS endpoint, the |certauth| file specified by 
   :setting:`httpsCAFile` will be used to validate the certificate. If 
   :guilabel:`Base URL` is unset, the remote URLs for mongodb binaries 
   are **mongodb.com** and **fastdl.mongodb.org**.
   
   Corresponds to :setting:`automation.versions.download.baseUrl`.
   

