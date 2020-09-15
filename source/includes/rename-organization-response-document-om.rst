.. list-table::
   :header-rows: 1
   :widths: 10 10 80

   * - Name
     - Type
     - Description

   * - ``id``
     - :ref:`ObjectId <document-bson-type-object-id>`
     - Unique identifier for the organization.
       
   * - ``links``
     - document array
     - One or more links to sub-resources and/or related resources. The
       relations between URLs are explained in the `Web Linking Specification
       <https://tools.ietf.org/html/rfc5988>`_.

   * - ``name``
     - string
     - New name of the organization.

   * - ldapGroupMappings
     - object array
     - For LDAP-backed |onprem|, the mappings of
       :doc:`LDAP groups </tutorial/enable-ldap-authentication-for-group>`
       to |onprem| organization roles. Only present for LDAP-backed
       |onprem|.

   * - | ldapGroupMappings
       | .roleName
     - string
     - |onprem| organization role. Possible values include:

       - ``ORG_OWNER``
       - ``ORG_MEMBER``
       - ``ORG_GROUP_CREATOR``
       - ``ORG_READ_ONLY``

   * - | ldapGroupMappings
       | .ldapGroups
     - string array
     - LDAP project(s) that map to the |onprem| role.
