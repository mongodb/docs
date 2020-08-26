.. option:: --defaultAuthSource <authSource>

   *Default*: admin

   Specifies the default MongoDB authentication source.
   Set this value to specify a default source that :program:`mongosqld`
   uses when authenticating with a MongoDB database. The
   authentication mechanisms
   ``GSSAPI`` and ``PLAIN`` use the ``$external`` source, while
   ``SCRAM-SHA-1`` and ``SCRAM-SHA-256`` use a MongoDB database as its
   source.
   
   If no value is given for this option it defaults to the the
   MongoDB ``admin`` database.
   
   The ``$external`` authentication source stores a reference
   to system users in a MongoDB database called ``$external``,
   but the credentials are stored in an external,
   non-MongoDB system, such as an LDAP server.
   
   Any connection which uses the default value can omit the
   ``source`` parameter from its :ref:`MySQL <connect-mysql-auth>`
   or :ref:`Tableau <connect-tableau-auth>` username.

