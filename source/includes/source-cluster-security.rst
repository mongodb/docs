Various built-in roles provide sufficient privileges. For example:

.. include:: /includes/mongomirror-required-roles.rst

Specify the user name and password to |service| when prompted by
the Live Migration procedure.

|service| only supports :ref:`SCRAM <authentication-scram>` for
connecting to source clusters that enforce authentication.