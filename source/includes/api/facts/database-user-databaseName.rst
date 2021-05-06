- Set this value to ``admin`` if your database user request:

  - Omits ``ldapAuthType``, ``x509Type``, and ``"x509Type"``.
  - Includes
    - ``"ldapAuthType"  : "NONE"``
    - ``"ldapAuthType"  : "GROUP"``
    - ``"x509Type"  : "NONE"``
    - ``"awsIAMType"  : "NONE"``

- Set this value to ``$external`` if your database user request:

  - ``"ldapAuthType"  : "USER"``
  - ``"x509Type"  : "CUSTOMER"``
  - ``"x509Type"  : "MANAGED"``
  - ``"awsIAMType"  : "USER"``
  - ``"awsIAMType"  : "ROLE"``
