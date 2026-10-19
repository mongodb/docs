.. setting:: spec.security.authentication.ldap.transportSecurity

   *Type*: string

   *Required for LDAP authentication.* 
   
   Specifies whether the |ldap| server accepts |tls|.
   
   If the |ldap| server accepts |tls|, set the value to ``tls``. If 
   the |ldap| server doesn't accept |tls|, leave this value blank or set 
   the value to ``none``.
   
   .. note::
      
      If you specify a string other than ``none`` or ``tls``, 
      |k8s-op-short| still sets the setting to ``tls``.
   

