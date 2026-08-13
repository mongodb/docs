*Optional.* |oidc| authentication settings for this store. The
``oidc`` object accepts the following fields:

- ``enabled``: boolean. Enables |oidc| authentication for this
  store.
- ``method``: string. One of ``callback``, ``azure``, ``gcp``, or
  ``k8s``.
- ``tokenUri``: string. The |idp| token endpoint. Required when
  ``method`` is ``callback``.
- ``clientId``: string. The client ID registered with the |idp|.
  Required when ``method`` is ``callback``; optional when ``method``
  is ``azure``.
- ``clientSecret``: string. The client secret registered with the
  |idp|. Required when ``method`` is ``callback``. If you edit an
  existing store and omit this field or submit the redacted value
  returned by a previous ``GET`` request, |onprem| preserves the
  existing secret.
- ``scope``: string. The OAuth2 scope requested from the |idp|.
  Used only when ``method`` is ``callback``.
- ``tokenResource``: string. The audience or resource identifier for
  the workload identity token. Required when ``method`` is
  ``azure`` or ``gcp``. This value must match the ``audience``
  configured for this |idp| in the target MongoDB deployment's
  ``oidcIdentityProviders`` setting.

The ``callback``, ``azure``, ``gcp``, and ``k8s`` methods do not all
require the same fields. The ``azure``, ``gcp``, and ``k8s`` methods
do not require ``clientSecret``.

When ``oidc.enabled`` is ``true``, provide only hosts and connection
options in the store's ``uri`` field. |onprem| ignores any username
or password embedded in the URI.

To switch a store from |oidc| to another authentication mechanism,
submit ``oidc: {enabled: false}`` in the request instead of omitting
the ``oidc`` object.
