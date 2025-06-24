.. used in the /reference/resource-documents subsections

For a user-defined role scoped for a non-``admin`` database, the
resource specification for its privileges must specify the same
database as the role. User-defined roles scoped for the
``admin`` database can specify other databases.

.. admin-resources

For user-defined roles, only roles scoped for the ``admin`` database
can have this resource specification for their privileges.
