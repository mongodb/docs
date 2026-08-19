If you update this store and omit the ``oidc`` object from the
request, |onprem| removes the existing |oidc| configuration. To
preserve the existing configuration, include the current ``oidc``
object in every update request.

``clientSecret`` is the one exception. If you omit ``clientSecret``
from the ``oidc`` object, or submit the redacted value returned by a
previous ``GET`` request, |onprem| preserves the existing secret. To
change the secret, submit the new plaintext value.
