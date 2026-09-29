.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :widths: 10 10 80

   * - Name
     - Type
     - Description

   * - ``federatedDomains``
     - array of strings
     - List that contains the domains associated with the organization's
       identity provider.

   * - ``hasRoleMappings``
     - boolean
     - Flag that indicates whether this organization has role mappings
       configured.

       To learn more about role mapping, see 
       :ref:`cm-manage-fed-auth-roles`.

   * - ``id``
     - string
     - Unique 24-hexadecimal digit string that identifies this
       federation.

   * - ``identityProviderId``
     - string
     - Unique 20-hexadecimal digit string that identifies the identity
       provider connected to this organization.

   * - ``identityProviderStatus``
     - string
     - Value that indicates whether the identity provider is active.
       |mms| returns ``ACTIVE`` if the identity provider is active
       and ``INACTIVE`` if the identity provider is inactive.
