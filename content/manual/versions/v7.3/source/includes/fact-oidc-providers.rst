.. list-table::
  :header-rows: 1
  :widths: 20 18 42 20

  * - Field

    - Necessity

    - Type

    - Description


  * - ``issuer``
    
    - Required

    - string

    - The issuer URI of the IDP that the server should accept tokens from. This 
      must match the ``iss`` field in any JWT used for authentication.

      .. include:: /includes/fact-oidc-multiple-config-for-same-issuer.rst

      If you specify an unreachable issuer URI, MongoDB:
      
      1. Logs a warning.
      #. Continues server startup, which allows you to update the issuer
         URI.
      #. Reattempts issuer contact. If MongoDB reaches the issuer URI
         and validates the access token, authentication succeeds. If
         the issuer URI remains unreachable, authentication fails.
    

  * - ``authNamePrefix``

    - Required

    - string

    - Unique prefix applied to each generated ``UserName`` and ``RoleName`` used 
      in authorization. ``authNamePrefix`` can only contain the
      following characters:

      - alphanumeric characters (combination of ``a`` to ``z`` and ``0`` to ``9``)
      - hyphens (``-``)
      - underscores (``_``) 


  * - ``matchPattern``

    - Conditional

    - string

    - Regex pattern used to determine which IDP should be used. ``matchPattern`` 
      matches against usernames. Array order determines the priority and the 
      first IDP is always selected. 

      ``matchPattern`` is required in some configurations, depending on 
      how the user sets ``supportsHumanFlows``:

      - When only one IdP has ``supportsHumanFlows`` set to ``true``
        (the default), ``matchPatterns`` is optional.

      - When multiple IdP's have ``supportsHumanFlows`` set to ``true``
        (the default), each of these requires ``matchPatterns``.

      - ``matchPatterns`` is optional for any IdP where ``supportsHumanFlows``
        is set to ``false``.

      This is not a security mechanism. ``matchPattern`` serves only as an advisory 
      to clients. MongoDB accepts tokens issued by the IDP whose principal 
      names do not match this pattern.


  * - ``clientId``

    - Conditional
     
    - string 

    - ID provided by the IDP to identify the client that receives the access tokens.

      Required when ``supportsHumanFlows`` is set to ``true`` (the default).
    

  * - ``audience``

    - Required

    - string 

    - Specifies the application or service that the access token is intended for.
    
      .. include:: /includes/fact-7-0-oidc-audience.rst

      When more than one IDP is defined, this must be a unique value for 
      each configuration that shares an ``issuer``. 

  * - ``requestScopes``

    - Optional
     
    - array[ string ] 

    - Permissions and access levels that MongoDB requests from the IDP.


  * - ``principalName``
    
    - Optional 

    - string 

    - The claim to be extracted from the access token containing MongoDB user 
      identifiers. 

      The default value is ``sub`` (stands for ``subject``). 


  * - ``useAuthorizationClaim`` 

    - Optional

    - boolean

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
        
      .. versionadded:: 7.2 (Also available in 7.0.5).

  * - ``authorizationClaim`` 

    - Conditional 

    - string

    - Required, unless ``useAuthorizationClaim`` is set to ``false``.
    
      Claim extracted from access token that contains MongoDB role names.


  * - ``logClaims``

    - Optional

    - array[ string ]

    - List of access token claims to include in log and audit messages upon 
      authentication completion.


  * - ``JWKSPollSecs``

    - Optional

    - integer

    - Frequency, in seconds, to request an updated JSON Web Key Set (JWKS) from the IDP. 
      A setting of 0 disables polling.

      When more than one IDP is defined, this must be the same value for 
      each configuration that shares an ``issuer``.  
    

  * - ``supportsHumanFlows``

    - Optional

    - bool

    - Whether the OIDC provider supports human or machine workflows.  This
      affects the ``clientId`` and ``matchPattern`` fields.

      You may find it useful to set this field to ``false`` with machine workload
      IdP's to allow them to omit the ``clientId`` when it's unneeded.

      Default: ``true``.

      .. versionadded:: 7.2

