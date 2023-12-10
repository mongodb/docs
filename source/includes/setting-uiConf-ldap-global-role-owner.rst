.. setting:: LDAP Global Role Owner

   *Type*: string

   
   |ldap| group that has full privileges for the |mms| deployment,
   including full access to all |mms|
   :doc:`projects </tutorial/manage-projects>` and all administrative
   permissions. Users in the specified |ldap| group receive the
   :ref:`global owner <global-owner-role>` role in |mms|. Specify the
   project using the format that is used by the |ldap| attribute
   specified in the :setting:`LDAP User Group` setting.
   
   .. code-block:: ini
   
      CN=MMSGlobalOwner,OU=MMS,OU=acme Groups,DC=acme,DC=example,DC=com
   
   
   Corresponds to :setting:`mms.ldap.global.role.owner`.
   

