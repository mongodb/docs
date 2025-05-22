The previous example returns the documents from the ``budget``
collection that match at least one of the roles that the user who runs
the example has. To do that, the example uses
:expression:`$setIntersection` to return documents where the
intersection between the ``budget`` document ``allowedRoles`` field and
the set of user roles from ``$$USER_ROLES`` is not empty.
