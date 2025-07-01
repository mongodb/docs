.. setting:: mms.userSvcClass

   *Type*: string

   *Default*: ``com.xgen.svc.mms.svc.user.UserSvcDb``

   
   Select whether to store authentication credentials in the |onprem|
   Application Database or in an |ldap| directory.
   
   Accepted values are:
   
   
   .. list-table::
      :widths: 40 60
      :header-rows: 1
   
      * - Auth Method
        - Accepted Value
   
      * - Application Database
        - ``UserSvcDb``
          
          :gold:`IMPORTANT:` In |onprem| 6.0, the accepted value is 
          ``com.xgen.svc.mms.svc.user.UserSvcDb``. 
          If you use this old accepted value, your |mms|
          instance will not start during preflight checks.
              
      * - |ldap|
        - ``com.xgen.svc.mms.svc.user.UserSvcLdap``
   
      * - |saml|
        - ``com.xgen.svc.mms.svc.user.UserSvcSaml``
   
   
   Corresponds to :setting:`User Authentication Method`.
   

