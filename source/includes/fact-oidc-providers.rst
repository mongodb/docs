.. list-table::
  :header-rows: 1
  :widths: 20 18 42 20

  * - Field

    - Necessity

    - Description

    - Type

  * - ``issuer``
    
    - Required

    - The issuer URI of the IDP that the server should accept tokens from. This 
      must match the ``iss`` field in any JWT used for authentication.

      If you specify an unreachable issuer URI, MongoDB:
      
      1. Logs a warning.
      #. Continues server startup, which allows you to update the issuer
         URI.
      #. Reattempts issuer contact. If MongoDB reaches the issuer URI
         and validates the access token, authentication succeeds. If
         the issuer URI remains unreachable, authentication fails.
    
    - string

  * - ``authNamePrefix``

    - Required

    - Unique prefix applied to each generated ``UserName`` and ``RoleName`` used 
      in authorization. ``authNamePrefix`` can only contain the
      following characters:

      - alphanumeric characters (combination of ``a`` to ``z`` and ``0`` to ``9``)
      - hyphens (``-``)
      - underscores (``_``) 

    - string



  * - ``matchPattern``

    - Conditional

    - Required when more than one IDP is defined.

      Regex pattern used to determine which IDP should be used. ``matchPattern`` 
      matches against usernames. Array order determines the priority and the 
      first IDP is always selected. 

      This is not a security mechanism. ``matchPattern`` serves only as an advisory 
      to clients. MongoDB accepts tokens issued by the IDP whose principal 
      names do not match this pattern.

    - string

  * - ``clientId``

    - Required 
     
    - ID provided by the IDP to identify the client that receives the access tokens.
    
    - string 

  * - ``audience``

    - Required

    - Specifies the application or service that the access token is intended for.
    
    - string 

  * - ``requestScopes``

    - Optional
     
    - Permissions and access levels that MongoDB requests from the IDP.

    - array[ string ] 
    
  * - ``principalName``
    
    - Optional 

    - The claim to be extracted from the access token containing MongoDB user 
      identifiers. 

      The default value is ``sub`` (stands for ``subject``). 

    - string 

  * - ``useAuthorizationClaim`` 

    - Optional

    - Determines if the ``authorizationClaim`` is required. The default value is 
      ``true``.
    
      If the ``useAuthorizationClaim`` field is set to ``true``, the server requires 
      an ``authorizationClaim`` for the identity provider's config. This is the 
      default behavior.
      
      If the ``useAuthorizationClaim`` field is set to ``false``, the 
      ``authorizationClaim`` field is optional (and ignored if provided). 
      Instead, the server does the following:

      - Searches the token for a claim whose name is listed in the 
        ``principalNameClaim`` field. This is typically named ``sub``. For 
        example:

        ``sub: "spencer.jackson@example.com"``

      - Constructs the internal username by concatenating the ``authNamePrefix``, 
        a forward slash (``/``), and the contents of the claim identified by 
        ``principalNameClaim`` within the access token. For example, with a 
        ``authNamePrefix`` field value of "mdbinc", the internal username is:

        ``mdbinc/spencer.jackson@example.com``

      - Looks for the user with this username and authorizes the client with the 
        roles: 

        .. code-block:: javascript
        
            { user: "mdbinc/spencer.jackson@example.com", 
              db: "$external" }
        
      .. versionadded:: 7.2

    - boolean

  * - ``authorizationClaim`` 

    - Conditional 

    - Required, unless ``useAuthorizationClaim`` is set to ``false``.
    
      Claim extracted from access token that contains MongoDB role names.

    - string  

  * - ``logClaims``

    - Optional

    - List of access token claims to include in log and audit messages upon 
      authentication completion.

    - array[ string ]

  * - ``JWKSPollSecs``

    - Optional

    - Frequency, in seconds, to request an updated JSON Web Key Set (JWKS) from the IDP. 
      A setting of 0 disables polling.

    - integer
