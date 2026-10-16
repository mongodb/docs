The migration user needs the following built-in roles, plus a custom role that includes the write-blocking actions:

.. include:: /includes/c2c-required-roles.rst

Specify the username and password to |service| when prompted by
the walk-through screen of the live migration procedure.

|service| only supports :ref:`SCRAM <authentication-scram>` for
connecting to source {+clusters+} that enforce authentication.
