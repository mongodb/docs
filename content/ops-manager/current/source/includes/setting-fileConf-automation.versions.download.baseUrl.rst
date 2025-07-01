.. setting:: automation.versions.download.baseUrl

   *Type*: string

   *Default*: mongodb.com, fastdl.mongodb.org

   
   HTTP(S) endpoint to fetch MongoDB binaries from. If the endpoint is 
   an HTTPS endpoint, the |certauth| file specified by 
   :setting:`httpsCAFile` will be used to validate the certificate. If 
   ``automation.versions.download.baseUrl`` is unset, the remote URLs 
   for mongodb binaries are **mongodb.com** and **fastdl.mongodb.org**.
   
   Corresponds to :setting:`Base URL`.
   

