.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :widths: 10 10 80

   * - Name
     - Type
     - Description

   * - ``domainAllowList``
     - array
     - List that contains the approved domains from which organization 
       users can log in.

   * - ``domainRestrictionEnabled``
     - boolean
     - Flag that indicates whether domain restriction is enabled for 
       the connected organization.

       .. note::

          ``userConflicts`` returns ``null`` when 
          ``"domainRestrictionEnabled": false``.

   * - ``identityProviderId``
     - string 
     - Unique 20-hexadecimal digit string that identifies the identity 
       provider associated with the connected organization.

   * - ``orgId``
     - string
     - Unique 24-hexadecimal digit string that identifies the 
       connected organization.

   * - ``postAuthRoleGrants``
     - array
     - List that contains the default :ref:`roles <organization-roles>` 
       granted to users who authenticate through the |idp| in a 
       connected organization.

   * - ``roleMappings``
     - array
     - List that contains the role mappings configured in this 
       organization.

   * - ``userConflicts``
     - array 
     - List that contains the usernames that don't match any domain on 
       the allowed list.

       .. note::

          ``userConflicts`` returns ``null`` when 
          ``"domainRestrictionEnabled": false``.
