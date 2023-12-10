.. setting:: mms.centralUrl

   *Type*: string

   
   |fqdn| and port number of the |application|.
   
   To use a port other than ``8080``, see
   :doc:`/tutorial/manage-ports`.
   
   .. important::
   
      If you plan on accessing your |application| using its |ipv6|
      address, you must enclose the |ipv6| address in square brackets
      (``[ ]``) to separate it from its port number.
   
      .. example::
   
         .. code-block:: ini
   
            http://[2600:1f16:777:8700:93c2:b99c:a875:2b10]:8080
   
   .. code-block:: ini
   
      mms.centralUrl=http://mms.example.com:8080
   
   
   Corresponds to :setting:`URL to Access Ops Manager`.
   

