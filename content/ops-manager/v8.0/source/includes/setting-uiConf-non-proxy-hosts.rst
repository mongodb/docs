.. setting:: Non Proxy Hosts

   *Type*: string

   
   Specify a pipe-separated (``|``) list of internal hosts
   to bypass the outgoing proxy that you configured.
   
   .. code-block:: ini
   
      *.foo.com|localhost
   
   
   Corresponds to :setting:`http.proxy.nonProxyHosts`.
   

