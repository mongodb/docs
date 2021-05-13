|service| only supports :ref:`SCRAM <authentication-scram>` for
connecting to source clusters enforcing authentication.

If the source cluster enforces authentication, create a user with the
following privileges:

- Read all databases and collections. The :authrole:`readAnyDatabase`
  role on the ``admin`` database covers this requirement.
- Read the oplog.

Various built-in roles provide sufficient privileges.  For example:

.. include:: /includes/mongomirror-required-roles.rst

Specify the user name and password to |service| when prompted by
the Live Migration procedure.
