|oidc| authentication settings for this store. The ``oidc`` object
contains the following fields:

- ``enabled``: boolean. Indicates whether |oidc| authentication is
  enabled for this store.
- ``method``: string. One of ``callback``, ``azure``, ``gcp``, or
  ``k8s``.
- ``tokenUri``: string. The |idp| token endpoint. Present only when
  ``method`` is ``callback``.
- ``clientId``: string. The client ID registered with the |idp|.
- ``clientSecret``: string. |onprem| redacts this value in the
  response and does not return the raw client secret.
- ``scope``: string. The OAuth2 scope requested from the |idp|.
  Present only when ``method`` is ``callback``.
- ``tokenResource``: string. The audience or resource identifier for
  the workload identity token. Present only when ``method`` is
  ``azure`` or ``gcp``.
