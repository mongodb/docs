.. setting:: mms.ldap.group.member

   *Type*: string

   
   Field on the group entry containing user Distinguished Names (DN).
   The :rfc:`groupOfNames <4519#section-3.5>` or
   :rfc:`groupOfUniqueNames <4519#section-3.6>` object classes are
   commonly used.
   
   .. code-block:: ini
   
      mms.ldap.group.member=member
   
   
   Corresponds to :setting:`LDAP Group Member Attribute`.
   

