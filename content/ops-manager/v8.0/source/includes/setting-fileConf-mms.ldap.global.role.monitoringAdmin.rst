.. setting:: mms.ldap.global.role.monitoringAdmin

   *Type*: string

   
   |ldap| group whose members have the :ref:`global monitoring
   admin role <global-monitoring-admin-role>` in |mms|.
   
   .. code-block:: ini
   
      mms.ldap.global.role.monitoringAdmin=CN\=MMS-MonitoringAdmin,OU\=MMS,OU\=acme Groups,DC\=acme,DC\=example,DC\=com
   
   
   Corresponds to :setting:`LDAP Global Role Monitoring Admin`.
   

