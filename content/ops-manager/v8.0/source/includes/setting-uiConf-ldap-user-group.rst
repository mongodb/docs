.. setting:: LDAP User Group

   *Type*: string

   
   |ldap| user attribute that contains the list of |ldap| groups
   the user belongs to. The |ldap| attribute can use any format to list
   the projects, including Common Name (``cn``) or Distinguished Name
   (``dn``). All |mms| settings in this configuration file that specify
   projects must match the chosen format.
   
   .. important::
   
      |mms| deprecated :setting:`LDAP User Group`. Use :setting:`LDAP Group Member Attribute`.
   
      If you provide values for:
   
      - Both :setting:`LDAP User Group` and :setting:`LDAP Group Member Attribute`, |mms| uses
        :setting:`LDAP Group Member Attribute` and ignores :setting:`LDAP User Group`.
      - :setting:`LDAP User Group` only, |mms| doesn't recognize
        the user's membership in nested LDAP groups.
   
   .. code-block:: ini
   
      memberOf
   
   
   Corresponds to :setting:`mms.ldap.user.group`.
   

