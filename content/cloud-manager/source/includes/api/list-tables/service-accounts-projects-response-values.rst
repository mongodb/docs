* - ``clientId``
  - string
  - Unique identifier for the service account.

* - ``createdAt``
  - timestamp
  - Service account creation time.

* - ``name``
  - string
  - Name of the service account.

* - ``description``
  - string
  - Description of the service account.

* - ``roles``
  - string array
  - List of roles that the service account has in the project. 

    Project roles include:

    .. include:: /includes/api/lists/project-roles-simple.rst

* - ``secrets``
  - object array
  - List of service account secrets.

* - ``secrets.id``
  - string
  - Unique 24-hexadecimal character string that identifies the secret.

* - ``secrets.createdAt``
  - timestamp
  - Timestamp representing secret creation time.

* - ``secrets.expiresAt``
  - timestamp
  - Timestamp representing secret expiration time.