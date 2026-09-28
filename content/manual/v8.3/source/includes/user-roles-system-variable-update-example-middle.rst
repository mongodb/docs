The previous example uses :expression:`$setIntersection` to return
documents where the intersection between the ``"Provider"`` string and
the user roles from ``$$USER_ROLES.role`` is not empty. ``Michelle`` has
the ``Provider`` role, so the update is performed.

Next, log in as as ``James``, who does not have the ``Provider`` role,
and attempt to perform the same update:
