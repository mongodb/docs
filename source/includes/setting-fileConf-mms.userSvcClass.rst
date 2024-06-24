.. setting:: mms.userSvcClass

   *Type*: string

   *Default*: ``UserSvcDb``

   
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
          
          .. important::
   
             In |onprem| 6.0, the accepted value is 
             ``com.xgen.svc.mms.svc.user.UserSvcDb``. 
             If you use this old accepted value, your |mms|
             instance will not start during preflight checks.
              
      * - |ldap|
        - ``UserSvcLdap``
   
      * - |saml|
        - ``UserSvcSaml``
   
   
   Corresponds to :setting:`User Authentication Method`.
   

