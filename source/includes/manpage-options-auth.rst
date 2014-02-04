.. use |binary-name| to refer to the tool

.. option:: --authenticationDatabase <dbname>

   .. versionadded:: 2.4

   Specifies the database that holds the user's (e.g
   :option:`--username <|binary-name| --username>`) credentials.

   .. build system replaces this with
      /includes/fact-authentication-source-mongo on the mongo shell
      man page.

   .. include:: /includes/fact-authentication-source-tool.rst

   See :doc:`/core/access-control` for more information on
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
