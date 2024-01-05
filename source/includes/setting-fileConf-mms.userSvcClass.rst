.. setting:: mms.userSvcClass

   *Type*: string

   *Default*: ``com.xgen.cloud.user._private.svc.UserSvcDb``

   
   Select whether to store authentication credentials in the |onprem|
   Application Database or in an |ldap| directory.
   
   Accepted values are:
   
   
   .. list-table::
      :widths: 40 60
      :header-rows: 1
   
      * - Auth Method
        - Accepted Value
   
      * - Application Database
        - ``com.xgen.cloud.user._private.svc.UserSvcDb``
          
          .. important::
   
             If you use the old accepted value,
             ``UserSvcDb``, your |mms|
             instance will not start during preflight checks.
   
      * - |ldap|
        - ``UserSvcLdap``
   
      * - |saml|
        - ``UserSvcSaml``
   
   
   Corresponds to :setting:`User Authentication Method`.
   

