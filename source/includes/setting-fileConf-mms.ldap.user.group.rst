.. setting:: mms.ldap.user.group

   *Type*: string

   
   |ldap| user attribute that contains the list of |ldap| groups
   the user belongs to. The |ldap| attribute can use any format to list
   the projects, including Common Name (``cn``) or Distinguished Name
   (``dn``). All |mms| settings in this configuration file that specify
   projects must match the chosen format.
   
   .. important::
   
      |mms| deprecated :setting:`mms.ldap.user.group`. Use :setting:`mms.ldap.group.member`.
   
      If you provide values for:
   
      - Both :setting:`mms.ldap.user.group` and :setting:`mms.ldap.group.member`, |mms| uses
        :setting:`mms.ldap.group.member` and ignores :setting:`mms.ldap.user.group`.
      - :setting:`mms.ldap.user.group` only, |mms| doesn't recognize
        the user's membership in nested LDAP groups.
   
   .. code-block:: ini
   
      mms.ldap.user.group=memberOf
   
   
   Corresponds to :setting:`LDAP User Group`.
   

