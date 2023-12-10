.. setting:: mms.backupCentralUrl

   *Type*: string

   
   |fqdn| of the |application| to which the legacy Backup Agents or
   MongoDB Agents use to send backup data.
   
   Uses the value of :setting:`mms.centralUrl` if not set.
   
   .. important::
   
      If you plan on accessing your |application| using its |ipv6|
      address, you must enclose the |ipv6| address in square brackets
      (``[ ]``) to separate it from its port number.
   
      .. example::
   
         .. code-block:: ini
   
            http://[2600:1f16:777:8700:93c2:b99c:a875:2b10]:8080
   

