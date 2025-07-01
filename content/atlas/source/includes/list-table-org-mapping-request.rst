.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :widths: 10 10 10 80

   * - Name
     - Type
     - Necessity
     - Description

   * - ``domainAllowList``
     - array
     - Optional
     - List that contains the approved domains from which organization 
       users can log in.

       If you provide a ``domainAllowList`` field in the request, the array
       that you provide replaces the current ``domainAllowList``, with the exception 
       of any SSO domains.

       .. include:: /includes/fact-connected-org-config-sso.rst

   * - ``domainRestrictionEnabled``
     - boolean
     - Required
     - Flag that indicates whether domain restriction is enabled for 
       the connected organization.

   * - ``identityProviderId``
     - string 
     - Required
     - Unique 20-hexadecimal digit string that identifies the identity 
       provider associated with the connected organization.

       If omitted or if the value is ``null``, MongoDB Cloud disconnects
       the organization specified by ``orgId`` from the |idp|.

   * - ``orgId``
     - string
     - Required
     - Unique 24-hexadecimal digit string that identifies the 
       connected organization.

   * - ``postAuthRoleGrants``
     - array
     - Optional
     - List that contains the default :ref:`roles <organization-roles>` 
       granted to users who authenticate through the |idp| in a 
       connected organization.

       If you provide a ``postAuthRoleGrants`` field in the request, the array
       that you provide replaces the current ``postAuthRoleGrants``.

   * - ``roleMappings``
     - array
     - Optional
     - List that contains the role mappings configured in this 
       organization.

       If you provide a ``roleMappings`` field in the request, the array
       that you provide replaces the current ``roleMappings``.
