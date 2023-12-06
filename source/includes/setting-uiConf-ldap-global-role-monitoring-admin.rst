.. setting:: LDAP Global Role Monitoring Admin

   *Type*: string

   
   |ldap| group whose members have the :ref:`global monitoring
   admin role <global-monitoring-admin-role>` in |mms|.
   
   .. code-block:: ini
   
      CN=MMS-MonitoringAdmin,OU=MMS,OU=acme Groups,DC=acme,DC=example,DC=com
   
   
   Corresponds to :setting:`mms.ldap.global.role.monitoringAdmin`.
   

