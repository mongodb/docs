.. list-table::
   :header-rows: 1
   :widths: 25 25 70

   * - Name
     - Type
     - Description

   * - ``clientId``
     - string
     - Unique identifier for the service account.

   * - ``description``
     - string
     - Description of the service account. Accepted characters are ``A-Z``, ``a-z``, 
       ``0-9``, space, period ``.``, apostrophe ``'``, comma ``,``, underscore ``_``, 
       and dash ``-``.

   * - ``name``
     - string
     - Name of the service account. Accepted characters are ``A-Z``, ``a-z``, 
       ``0-9``, space, period ``.``, apostrophe ``'``, comma ``,``, underscore ``_``, 
       and dash ``-``.

   * - ``createdAt``
     - timestamp
     - Service account creation time.

   * - ``secrets``
     - object array
     - List of service account secrets.

   * - ``secrets.id``
     - string
     - Unique 24-hexadecimal character string that identifies the secret.
    
   * - ``secrets.secret``
     - string
     - Service account secret, available only at creation.

   * - ``secrets.maskedSecretValue``
     - string
     - Masked secret that only displays the prefix and last four characters.
  
   * - ``secrets.createdAt``
     - timestamp
     - Timestamp representing secret creation time.

   * - ``secrets.lastUsedAt``
     - timestamp
     - Timestamp representing last secret usage.

   * - ``secrets.expiresAt``
     - timestamp
     - Timestamp representing secret expiration time.
    
   * - ``roles``
     - object array
     - Roles that the service account has in the organization.

       Organization roles include:

       .. include:: /includes/api/lists/org-roles-simple.rst
