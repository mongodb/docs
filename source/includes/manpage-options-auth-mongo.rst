.. use |binary-name| to refer to the tool

.. option:: --authenticationDatabase <dbname>

   .. versionadded:: 2.4

   Specifies the database that holds the user's (e.g
   :option:`--username <|binary-name| --username>`) credentials.

   By default, |binary-name| assumes that the database name specified
   in the :ref:`db address <mongo-db-address>` is the database that
   defines the user, unless you specify :option:`--authenticationDatabase`.

   See :doc:`/core/authentication` for more information on
   authentication in MongoDB.

.. option:: --authenticationMechanism <name>

   .. versionadded:: 2.4

   Specifies the authentication mechanism. By default, the
   authentication mechanism is ``MONGODB-CR``, which is the MongoDB
   challenge/response authentication mechanism. In |ent-build|,
   |binary-name| also includes support for ``GSSAPI`` to handle
   Kerberos authentication.

   See :doc:`/tutorial/control-access-to-mongodb-with-kerberos-authentication`
   for more information about Kerberos authentication.
