.. setting:: mms.ldap.global.role.automationAdmin

   *Type*: string

   
   |ldap| group whose members have the :ref:`global automation
   admin role <global-automation-admin-role>` in |mms|. Specify projects
   using the format used by the |ldap| attribute specified in the
   :setting:`LDAP User Group` setting. You can specify multiple projects
   using the ``;;`` delimiter. To change the default delimiter, use the
   ``mms.ldap.project.separator`` setting.
   
   .. code-block:: ini
   
      mms.ldap.global.role.automationAdmin=CN\=MMS-AutomationAdmin,OU\=MMS,OU\=acme Groups,DC\=acme,DC\=example,DC\=com
   
   
   Each |mms| global role provides its level of access to all the |mms|
   :doc:`projects </tutorial/manage-projects>` in the deployment. To
   provide access to specific projects, use :ref:`group-level roles
   <global-roles>`.
   
   Corresponds to :setting:`LDAP Global Role Automation Admin`.
   

