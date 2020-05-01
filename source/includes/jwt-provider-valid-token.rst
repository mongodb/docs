|charts-short| considers tokens from |jwt| providers valid if they:

- Contain an expiration time claim with a time and date in the future. 

  .. note::

      Your application must handle refreshing tokens before they expire.

- Contain an issued at time claim with a time and date in the past.

- Have a token lifetime of less than or equal to one hour. The token 
  lifetime is the difference between the issued at time claim and the 
  expiration time claim.

  .. example::

      |charts-short| rejects a token containing the following claims 
      because the token lifetime of one year is too long:

      .. code-block:: json
        :copyable: false

        {
          "iat": "1587497399",
          "exp": "1617305399"
        }

      |charts-short| can accept a token containing the following claims 
      because the token lifetime of one hour is acceptable:

      .. code-block:: json
        :copyable: false

        {
          "iat": "1585769399",
          "exp": "1585772999"
        }

- Are signed using either the ``HS256`` or ``RS256`` signing 
  algorithm.

- Are signed with a key that can be verified by the secret you provide
  when you configure the custom |jwt| authentication provider.

- Contain an audience claim that matches the one you specified when 
  you configure the provider, if applicable.