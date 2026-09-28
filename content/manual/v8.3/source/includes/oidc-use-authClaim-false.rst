When you set ``useAuthorizationClaim`` to ``false``, users who
authenticate with the ``MONGODB-OIDC`` mechanism obtain their
authorization rights from a user document in ``$external``. The
server searches for a user document with an ``_id`` matching the
value of the ``authNamePrefix/principalName`` claim for every OIDC
based authentication attempt for a user of your |idp|.
