.. setting:: spec.security.authentication.ldap.authzQueryTemplate

   *Type*: string

   
   *Required for LDAP authorization.*
   
   An `RFC4515 <https://tools.ietf.org/html/rfc4515>`_ and `RFC4516
   <https://tools.ietf.org/html/rfc4516>`_ LDAP-formatted query URL
   template executed by MongoDB to obtain the LDAP groups that the user
   belongs to. The query is relative to the host or hosts
   specified in :setting:`spec.security.authentication.ldap.servers`.
   You can use the following tokens in the template:
   
   - ``{USER}`` 
         Substitutes the authenticated username, or the
         :setting:`transformed <security.ldap.userToDNMapping>`
         username, into the LDAP query.
   - ``{PROVIDED_USER}``
         Substitutes the supplied username, before either
         authentication or LDAP transformation, into the LDAP query.
         (*Available starting in MongoDB version 4.2*)
   
   .. seealso::
   
      :manual:`LDAP Query Templates </core/security-ldap-external/#ldap-query-template>` in the MongoDB Manual   

