.. list-table::
   :header-rows: 1
   :widths: 20 40

   * - Value

     - Description

   * - :ref:`SCRAM-SHA-1 <authentication-scram-sha-1>`

     - `RFC 5802 <https://tools.ietf.org/html/rfc5802>`_ standard
       Salted Challenge Response Authentication Mechanism using the SHA-1
       hash function.

   * - :ref:`SCRAM-SHA-256 <authentication-scram-sha-256>`

     - `RFC 7677 <https://tools.ietf.org/html/rfc7677>`_ standard
       Salted Challenge Response Authentication Mechanism using the SHA-256
       hash function.

       Requires featureCompatibilityVersion set to ``4.0``.

       .. versionadded:: 4.0

   * - :ref:`MONGODB-X509 <security-auth-x509>`

     - MongoDB TLS/SSL certificate authentication.

   * - :ref:`GSSAPI <security-auth-kerberos>` (Kerberos)

     - External authentication using Kerberos. This mechanism is
       available only in `MongoDB Enterprise
       <http://www.mongodb.com/products/mongodb-enterprise-advanced?tck=docs_server>`_.

   * - :ref:`PLAIN <security-auth-ldap>` (LDAP SASL)

     - External authentication using LDAP. You can also use ``PLAIN``
       for authenticating in-database users. ``PLAIN`` transmits
       passwords in plain text. This mechanism is available only in
       `MongoDB Enterprise
       <http://www.mongodb.com/products/mongodb-enterprise-advanced?tck=docs_server>`_.
