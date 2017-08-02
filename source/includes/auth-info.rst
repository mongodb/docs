.. _client-authentication:

Authentication
---------------

.. versionadded:: 2.2

   The |bi| now offers MySQL authentication plugins allowing you to
   connect with authentication but without TLS/SSL.

There are two options for authenticating your connection:

#. Use an authentication plugin with either the ``SCRAM-SHA-1`` or
   ``PLAIN`` authentication mechanism. 

   .. important::

      The use of TLS/SSL is recommended as:

      - The ``SCRAM-SHA-1`` mechanism hashes the passwords in the
        client plugin. However, all other data is in cleartext.

      - The ``PLAIN`` mechanism sends the password in cleartext.

      See :doc:`/reference/auth-plugin-c` or :ref:`Install the JDBC
      Authentication Plugin <install-jdbc-plugin>` for more information
      on the plugins.

#. Provide cleartext credentials for simple username/password
   authentication against a MongoDB database. This method uses
   MySQL's built-in ``mysql_clear_password`` plugin.

   .. note::

       Authentication with ``mysql_clear_password`` requires the use of
       TLS/SSL. See :ref:`Connect from MySQL with Authentication and
       TLS/SSL <connect-with-tls-ssl>` for more information.

The |bi| requires authentication when running with :option:`--auth`.
When the |bi| receives a connection with authentication credentials
from a client, it passes those credentials through to the underlying
MongoDB instance.

You can specify the following authentication options after your
username as URI-style query parameters:

.. list-table::
   :header-rows: 1
   :widths: 25 75

   * - Connection Option
     - Description

   * - .. urioption:: source

     - Specify the name of the database which stores the user's
       credentials. If you do not specify this option, the |bi| will
       default to the current database associated with the MySQL
       connection.

       For authentication mechanisms such as ``PLAIN`` (LDAP) that
       delegate credential storage to other services, set the
       :urioption:`source` value to ``$external``.

   * - .. urioption:: mechanism

     - Specify the mechanism that the |bi| should use to
       authenticate the connection. Accepted values include:

       - :ref:`SCRAM-SHA-1 <authentication-scram-sha-1>`
       - :ref:`PLAIN <security-auth-ldap>` (LDAP SASL)

       The ``PLAIN`` (LDAP) mechanism requires MongoDB Enterprise, and
       requires that :urioption:`source` be ``$external``.

       .. note:: 
          Neither Kerberos (``GSSAPI``) nor x.509 are supported.

.. example::
   To authenticate as the user ``grace`` with authentication
   mechanism ``PLAIN`` and using an external source, you would use the
   following username:

   .. code::

      grace?mechanism=PLAIN&source=$external
